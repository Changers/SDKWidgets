# Setup
* `git clone https://github.com/Changers/SDKWidgets`
* `cd examples/hello-world-lit-js`
* `npm install`
* `npm run build`
* `npm run start`

# Test
* Open `https://sdk.changers.com` in browser
* Open devtools, switch to mobile view and enter this in console: 
```
window.initWidgets(app, clientId, clientSecret);

registerWidget('hello-world', 'http://localhost:8000/dist/bundle.js', 'after-token');
```