console.log('demo');

import openWidgets from 'sdkwidgets';
import 'sdkwidgets/dist/open-widgets.css';

console.log(openWidgets);

openWidgets.init({
  root: document.getElementById('root'),
  widgets: [
    {
      name: 'hello-world',
      position: 'after-tree-planting',
    },
    {
      name: 'hello-world',
      position: 'after-token',
    },
  ],
  authData: {
    app: 'sample',
    clientId: 0,
    clientSecret: '',
    env: 'stage',
  },
});
