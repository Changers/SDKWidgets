import {HelloWorld} from './src/HelloWorld.js';

class HelloWorldNew extends HelloWorld {
  widgetTitle = 'Hello world new';
  newWidgetName = 'hello-world';

  constructor() {
    super();
  }
}

window.customElements.define('hello-world', HelloWorld);
window.customElements.define('hello-world-new', HelloWorldNew);
