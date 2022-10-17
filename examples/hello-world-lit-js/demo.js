import openWidgets from 'sdkwidgets';
import 'sdkwidgets/dist/open-widgets.css';

openWidgets.init({
  root: document.getElementById('root'),
  widgets: [
    {
      name: 'hello-world',
      position: 'after-token',
    },
  ],
  authData: {
    app: process.env.APP,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    env: process.env.ENV,
    uuid: process.env.UUID,
  },
});
