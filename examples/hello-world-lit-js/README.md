# Prerequisites 
* NodeJs 14+
* NPM 8+

# Local development
* `git clone https://github.com/Changers/SDKWidgets`
* `cd SDKWidgets/examples/hello-world-lit-js`
* `cp .env.example .env`
* `vim .env` 
* `npm install`
* `npm run build`
* `npm run start`
* Open http://localhost:9001/
* Open console and wait a few seconds for it to load

# Testing inside app
* Open `https://sdk.maroshi.de/` in browser
* Open devtools, switch to mobile view and enter this in console: 
```
window.initWidgets(app, clientId, clientSecret);

registerWidget('hello-world', 'http://localhost:9001/bundle.js', 'after-token');
```
