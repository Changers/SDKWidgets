console.log("demo");

import openWidgets from "sdkwidgets";

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
      app: 'sintra',
      clientId: 18,
      clientSecret: 'Kzi4g7FcXc4y8J8l3gbiFQI3KTM1hKsGgwwvPtEZ',
      env: 'stage'
    },
});