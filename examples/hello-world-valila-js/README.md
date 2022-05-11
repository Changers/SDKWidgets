# Setup
* `git clone https://github.com/Changers/SDKWidgets`
* `cd examples/hello-world-valila-js`
* `npm install`
* `npm install http-server -g`
* `http-server -p 8082 ./`

# Test
* Open `https://sdk.changers.com` in browser
* Open devtools, switch to mobile view and enter this in console: 
```
window.initWidgets(app, clientId, clientSecret)

registerWidget('hello-world', 'http://127.0.0.1:8082/hello-world.js', 'after-token')
```
