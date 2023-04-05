# Introduction

Changers City SDK allows partners to build their own interactive UI widgets which can be embedded inside 
Changers City app. 

These widgets are built using [Web Components](https://www.webcomponents.org/introduction). Web Components are a set of native Javascript APIs.

Web components allows you to build your own custom html elements. These html elements are loaded inside Changers City app on demand, at one of the many pre-defined "slots". We also provide a set of javascript APIs for commincation between widgets and the app. 

In this repository, we will provide some example widgets, document the API interfaces, and define the workflow you can use to test & publish your widgets inside Changers City app. 

## Building WebComponents

Web components can be build using either pure javascript or using one of the many open source frameworks available. 

In this repository we provide following example widgets:
* [examples/hello-world-lit-js](examples/hello-world-lit-js) - Build with [Lit Elements](https://lit.dev/)

## Communicating with host app

Host app provide these javascript objects as arguments to WebComponent html elements. 

```
type OpenWidgetProps = {
  user: OpenWidgetUser;
  api: OpenWidgetApi;
  theme: OpenWidgetTheme;
  fullscreen: boolean;
};
```

* `user` is a javascript object of type `OpenWidgetUser` which contains basic user details such as user id, coin balance, etc

```
type OpenWidgetUser = {
  id: number;
  coins: number;
  account_type: number;
  email: string;
  firstname: string;
  lastname: string;
  auth?: {
    token: string;
  };
}
```
* `api` is a javascript object of type `OpenWidgetApi` which contains set of functions you can use to communicate with host app.

```
type OpenWidgetApi = {
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
}
```

> :warning: During local development and testing from desktop web-browsers the following function will give dummy data - 
> * getCurrentLocation()
> * scanQRCode()

* `theme` is a javascript object of type `OpenWidgetTheme` which contains css theme variables.

```
type OpenWidgetTheme = {
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

type BaseComponent = {
  textColor: string;
  bgColor: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
};
```

* `fullscreen` is a javascript boolean value 

## Bundling WebComponents
We require a single javascript file, which contains web component class. The JS file should also register the given component. For example using pure javascript: 
```
class HelloWorld extends HTMLElement {
    // your code here
}

window.customElements.define('hello-world', HelloWorld);
```

or using [Lit Elements](https://lit.dev/)

```
import { LitElement } from 'lit';

class HelloWorld extends LitElement
    // your code here
}

window.customElements.define('hello-world', HelloWorld);
```

If there are any dependencies, they should be bundled together with the custom element in the javascript file, preferably using webpack.


## Testing WebComponents

After you have bundled your code in a single javascript file, you can test your widget inside Changers City app using the following steps:
* Obtain app identifier, client id and client secret by contacting Changers
* Upload your bundled javascript file on a http server or create a temporary http server in your local. If you are using npm you can use package similar to `@web/dev-server` or `http-server`
* Open https://sdk.maroshi.de in browser
* Open devtools, switch to mobile view and enter this in console: 
```
window.initWidgets(app, clientId, clientSecret)

registerWidget('hello-world', 'http://127.0.0.1:8082/hello-world.js', 'after-token')
```
* `initWidgets` is a utility function which creates a temporary user for you and loads the app. Its takes 3 arguments, which you can obtain by contacting Changers.
* `registerWidget` loads your widget inside Changers City app. It takes 3 arguments:
    * `elementName` - Name of widget's html element, should be same as supplied in `customElements.define()`
    * `scriptUrl` - URL of javascript file
    * `position` - Defines position where the widget will be loaded inside the app. Possible values are: 
        * `after-token`
        * `after-badges`
        * `after-custom-activities`
        * `after-compensations`
        * `after-tree-planting`
        * `after-co2-savings`
        * `after-team-leaderboards`
        * `after-invite-friends`


## Authenticating Users

App supplies a JWT token inside `user.auth.token` which can be used to verify user. `sub` key payload is user id. 

Example Token - 

```
eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJjaGFuZ2VycyIsImlhdCI6MTY4MDY5MzM0MCwibmJmIjoxNjgwNjkzMzQwLCJzdWIiOiIxIn0.GgBqpXQ2q8J6LGUEt0Wl5r7M0TFtextvQYABJ52rpZVFOzQ-YiAYqWWHEpjpPLlNnuuqkJm9Hs10Vg8PURIvqfqu8kCJNZGn2_C19IaXAqyfWk9_ig1uUlpRqi5w2c_tdtoxUeJ-oWTGF1G6yhWgwnL_xFIrHtdt_K5uBV__dZUFdIVGxEWOnHur6CBLP17az1yucxKtnThoamwnniHjSeuICosYDzdgCXzZQfZnRw1HPkKhh8zoxiY9KcYFKTcNF_c-KFagt6N9L1CEjY9uNQZL3CT8hnhhalv554vwTUPfi0uIBH3tBdQsWSvrgLs9wOiHdJly4Ph33FEqq9_sowTjgNY38xiuHHy18VirIZddBSzWHcXdUMwjnUTnQ7jgxFLsijPubfrhhKoxjONlqv31F6RUKeg3MHVWOrtQEW3GI2pZ3of9YMERbvopwS9I5eZNNNML39XyYigd9Q9tQotIJGuobwq_EbVTxauzRFp8QKbnsGv7awuhPiMHdk3edH-UEZYKurxDnIYnsv7CdJ2BMSD4RBq8p4r_NmWmZKeI7H5TX35YwsTXohcXilAHFeQ-hhWcxyqqBWtaRvDJYnzHD7qp6eXB2Yn3ci0mQuzePguUSu2RZgbizzqokUmM-LhmXMN3wHFJk5ZUNA_dN0Yuv8l78wnIPQXVPebVsuM
```
Header 

```
{
  "typ": "JWT",
  "alg": "RS256"
}
```

Payload

```
{
  "iss": "changers",
  "iat": 1680693340,
  "nbf": 1680693340,
  "sub": "1"
}
```

Public Key

```
-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAvTmBQy9tE/w0hSGbebkS
YsPbwKvpX914uGe9b1ApkqfQHUQXNWKo0xWdm6S1Qw3Mby2FtvtsSB6SGQcSwYnp
0gXEQGmy3WuMXALKrSMgNn+KRPd3s1Geiv9qjakqnKtrNjg76sQHf1jk3AUzuYgX
dawfVpF3bzCqRLK1EjRHSd4AZ1eAXUKNiE4IyfBYlaCyBP1DueZRjZyzG3RTkV4W
Llmwqn8Oz/4evzAkWQQAmh1vJTYRCmCJGjWamtdcLu3MHWEudiSn4c45MQM+4ot1
AbuNktX0LhaD5qbw+jUpImmcKBRKfstXM+4HdsFLIoOFA9G9oSr3eo6j+CjuOcor
372vVe0j0ZapSHgo8RoYmwWrG/SwCrzc8ZCxbjnTkLHBu9WPADwj1SvpYIw7YVXd
LKvLwN+ZbKJSMXQ4lfgrl8wue2OLEN5vv+kKQzejrlaIIbrgh+AZM+el4U+Ud0dy
AtmwEAW99Y+muskXNjdwehJbtz0Uv9iPsqu6+vjicNC9l5hmv7Dv8NPE1HjQoOEZ
PP3QFW1FccJKDQeyMmKXP6QtJUPE3nEusLaMDk8Utrdif0weNTM8C1eQTtX0mHeP
UKgzl3YYdqDn2X7H9UoIsRt5pZes2EEvqlstuRx+j+9lJbfOADO/TJ7aeeYV3aZ+
K2Wvt5dGjbVAvCRubw7fVlECAwEAAQ==
-----END PUBLIC KEY-----
```

