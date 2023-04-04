import axios, {AxiosRequestHeaders} from 'axios';
import {
  GetUserAuth,
  UserProfile,
  Env,
  GetUserProfile,
  UserAuth,
  OpenWidgetUser,
} from '../types';

const domains: Record<Env, string> = {
  local: 'changersdev.test',
  development: 'changersdev.de',
  stage: 'maroshi.de',
  production: 'changers.com',
};

export const getUserProfile: GetUserProfile = async ({
  app,
  clientId,
  clientSecret,
  env,
  uuid,
}) => {
  const userAuth = await getUserAuth({
    app,
    clientId,
    clientSecret,
    env,
    uuid,
  });

  if (!userAuth) {
    return;
  }

  const client = getAuthClient({
    env,
    headers: {
      Authorization: `Bearer ${userAuth.userToken}`,
      'x-agent': '(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK',
      'x-app': app,
    },
  });

  const response = await client.get('/user/me');
  return response?.data?.data as UserProfile;
};

export const getUserAuth: GetUserAuth = async ({
  app,
  clientId,
  clientSecret,
  env,
  uuid,
  saveAuth = saveOauthInfo,
}) => {
  // tslint:disable-next-line:no-console
  console.info('Obtaining oauth client token..');
  const tokenResponse = await getClientToken({clientId, clientSecret, env});
  // tslint:disable-next-line:no-console
  console.info('Got oauth client token');

  if (!tokenResponse?.data?.access_token) {
    return;
  }

  const clientToken = tokenResponse.data.access_token as string;
  if (uuid) {
    // tslint:disable-next-line:no-console
    console.info(`Logging in with existing user ${uuid}`);
    const loginUserReponse = await loginUser({app, clientToken, uuid, env});
    if (!loginUserReponse?.data?.data) {
      return;
    }

    const userToken = loginUserReponse?.data?.data?.token;
    // tslint:disable-next-line:no-console
    console.info(`Logged in with user ${uuid}`);

    saveAuth({
      userToken,
      uuid,
      app,
      clientId,
      clientSecret,
      clientToken,
    });

    return {userToken, uuid, app, clientId, clientSecret, clientToken};
  } else {
    // tslint:disable-next-line:no-console
    console.info(`Creating new user..`);
    const createUserResponse = await createUser({app, clientToken, env});
    if (!createUserResponse?.data?.data) {
      return;
    }

    // tslint:disable-next-line
    const {uuid, token: userToken} = createUserResponse.data.data;

    // tslint:disable-next-line:no-console
    console.info(`User created ${uuid}`);

    saveAuth({
      userToken,
      uuid,
      app,
      clientId,
      clientSecret,
      clientToken,
    });

    return {userToken, uuid, app, clientId, clientSecret, clientToken};
  }
};

export const userProfileToOpenWidgetUser = ({
  userProfile,
}: {
  userProfile: UserProfile;
}): OpenWidgetUser => ({
  id: userProfile.user.id,
  coins: userProfile.user.recoins,
  account_type: userProfile.user.account_type,
  email: userProfile.user.email,
  firstname: userProfile.user.firstname,
  lastname: userProfile.user.lastname,
  auth: userProfile.user.open_widgets?.auth,
});

interface GetClientToken {
  clientId: number;
  clientSecret: string;
  env: Env;
}

const getClientToken = async ({
  clientId,
  clientSecret,
  env,
}: GetClientToken) => {
  const client = getAuthClient({env});

  return client.post('oauth/token', {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: '*',
  });
};

interface CreateUser {
  app: string;
  clientToken: string;
  env: Env;
}

export const createUser = async ({app, clientToken, env}: CreateUser) => {
  const client = getAuthClient({
    env,
    headers: {
      Authorization: `Bearer ${clientToken}`,
      'x-agent': '(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK',
      'x-app': app,
    },
  });

  return client.post('user', {});
};

interface LoginUser {
  app: string;
  clientToken: string;
  uuid: string;
  env: Env;
}

export const loginUser = async ({app, clientToken, uuid, env}: LoginUser) => {
  const client = getAuthClient({
    env,
    headers: {
      Authorization: `Bearer ${clientToken}`,
      'x-agent': '(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK',
      'x-app': app,
    },
  });

  return client.post('login', {uuid});
};

const saveOauthInfo = (data: UserAuth) => {
  if (typeof localStorage === 'undefined') {
    return;
  }

  const existingAuth = localStorage.getItem('oauthClientAuth');

  let parsedAuth = {};

  if (existingAuth) {
    try {
      parsedAuth = JSON.parse(existingAuth);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }

  const newData = {
    ...parsedAuth,
    ...data,
  };

  localStorage.setItem('oauthClientAuth', JSON.stringify(newData));
};

const getAuthClient = ({
  env,
  headers = {},
}: {
  env: Env;
  headers?: AxiosRequestHeaders;
}) =>
  axios.create({
    baseURL: `https://sst.${domains[env]}/api/`,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  });
