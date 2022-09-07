export type OpenWidgetUser = {
  id: number;
  coins: number;
  account_type: number;
  email: string;
  firstname: string;
  lastname: string;
  auth?: {
    token: string;
  };
};

export type OpenWidgetApi = {
  getUser(): OpenWidgetUser | undefined;
  openFullScreen(data: {title: string}): void;
  closeFullScreen(): void;
  getCurrentLocation(): Promise<
    | {
        latitude: number;
        longitude: number;
      }
    | undefined
  >;
  scanQRCode(): Promise<string | undefined>;
};

type BaseComponent = {
  textColor: string;
  bgColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
};

export type OpenWidgetTheme = {
  styles: {
    font: {
      primary: string;
      secondary: string;
    };
    colors: {
      primary: string;
      secondary: string;
    };
    components: {
      app: {navBgColor: string} & BaseComponent;
      widget: {
        title: BaseComponent;
        body: BaseComponent;
      };
    };
  };
};

export type OpenWidgetProps = {
  user: OpenWidgetUser;
  api: OpenWidgetApi;
  theme?: OpenWidgetTheme;
};

export type OpenWidgetPosition =
  | 'after-token'
  | 'after-invite-friends'
  | 'after-tree-planting'
  | 'after-badges'
  | 'after-custom-activities'
  | 'after-compensations'
  | 'after-co2-savings';

export type CustomWidget = {
  name: string;
  position: OpenWidgetPosition;
};

export type UserData = {
  id: number;
  recoins: number;
  account_type: number;
  email: string;
  firstname: string;
  lastname: string;
  open_widgets?: {
    enable: boolean;
    auth?: {
      token: string;
    };
  };
};

export type UserProfile = {
  user: UserData;
  organisation: {
    id: number;
    compensation_description: string;
    saving_water: string;
    water_saving_tips: string;
  };
};

export type RegisterWidget = (
  id: string,
  src: string,
  position: OpenWidgetPosition,
) => void;

export type InitWidgets = (
  app: string,
  clientId: number,
  clientSecret: string,
  uuid?: string,
) => void;

export type Env = 'development' | 'stage' | 'production';

export type GetUser = {
  app: string;
  clientId: number;
  clientSecret: string;
  env: Env;
  uuid?: string;
  saveAuth?: (userAuth: UserAuth) => void;
};

export type UserAuth = {
  userToken: string;
  uuid: string;
  app: string;
  clientId: number;
  clientSecret: string;
  clientToken: string;
};

export type GetUserAuth = (authData: GetUser) => Promise<UserAuth | undefined>;
export type GetUserProfile = (
  authData: GetUser,
) => Promise<UserProfile | undefined>;
