'use strict';

(function () {
  class HelloWorld extends HTMLElement {
    widgetTitle = 'Hello world';
    newWidgetName = 'hello-world-new';

    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({mode: 'open'});

      this._user = {};
      this._api = {};
      this._theme = {};
      this._data = {};
      this._counter = 0;

      // creating a container for the editable-list component
      const container = document.createElement('div');

      // creating the inner HTML of the editable list element
      container.innerHTML = `
        <h2>Hello, User #<span class='user-id'>${this.userId}</span>!</h2>
        <h5>Balance: <span class='balance'>${this.balance}</span></h5>
        <h5>Counter: <span class='counter'>${this.counter}</span></h5>
        <button class='increment'>increment</button>
        <button class='open-full-screen'>Open full screen</button>
        <button class='close-full-screen'>Close full screen</button>
        <br/>
        <button class='location'>Get current location</button>
        <button class='qr-code'>Scan QR code</button>
        <button class='open-new-widget'>Open new widget</button>
        <button class='set-title'>Set widget title</button>
      `;

      // appending the container to the shadow DOM
      shadow.appendChild(container);
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      console.log(
        'connectedCallback',
        '\nshadowRoot:',
        this.shadowRoot,
        '\nthis:',
        this,
        '\nuser:',
        this.user,
        '\ntheme:',
        this.theme,
        '\ndata:',
        this.data,
      );

      const incrementButton = this.shadowRoot.querySelector('.increment');

      let self = this;

      incrementButton.addEventListener(
        'click',
        function (e) {
          self._counter++;
          self.update();
        },
        false,
      );

      const openFullScreenButton =
        this.shadowRoot.querySelector('.open-full-screen');
      openFullScreenButton.addEventListener('click', () =>
        self.api.openFullScreen({title: 'Full screen title'}),
      );

      const closeFullScreenButton =
        this.shadowRoot.querySelector('.close-full-screen');
      closeFullScreenButton.addEventListener('click', () =>
        self.api.closeFullScreen(),
      );

      const locationButton = this.shadowRoot.querySelector('.location');
      locationButton.addEventListener('click', async () => {
        console.log('Getting location ....');
        const currentLocation = await self.api.getCurrentLocation();
        console.log('Current location: ', currentLocation);
      });

      const qrCodeButton = this.shadowRoot.querySelector('.qr-code');
      qrCodeButton.addEventListener('click', async () => {
        console.log('Scanning QR code ...');
        const qrCode = await self.api.scanQRCode();
        console.log('QR Code: ', qrCode);
      });

      const openWidgetButton =
        this.shadowRoot.querySelector('.open-new-widget');
      openWidgetButton.addEventListener('click', () => {
        const opened = self.api.openNewWidget({
          name: this.newWidgetName,
          data: {
            some: 'data',
          },
        });
        console.log('Opened new widget: ', opened);
      });

      const setTitleButton = this.shadowRoot.querySelector('.set-title');
      setTitleButton.addEventListener('click', () => {
        self.api.setTitle({
          title: this.widgetTitle,
        });
      });
    }

    update() {
      var counterElement = this.shadowRoot.querySelector('.counter');
      counterElement.innerHTML = this.counter;

      var userIdElement = this.shadowRoot.querySelector('.user-id');
      userIdElement.innerHTML = this.userId;

      var balanceElement = this.shadowRoot.querySelector('.balance');
      balanceElement.innerHTML = this.balance;
    }

    set user(value) {
      this._user = value;
      this.update();
    }

    get user() {
      return this._user;
    }

    set theme(value) {
      this._theme = value;
      this.update();
    }

    get theme() {
      return this._theme;
    }

    set data(value) {
      this._data = value;
      this.update();
    }

    get data() {
      return this._data;
    }

    set api(value) {
      this._api = value;
      this.update();
    }

    get api() {
      return this._api;
    }

    get userId() {
      return this._user.id;
    }

    get balance() {
      return this._user.coins;
    }

    get counter() {
      return this._counter;
    }
  }

  class HelloWorldNew extends HelloWorld {
    widgetTitle = 'Hello world new';
    newWidgetName = 'hello-world';

    constructor() {
      super();
    }
  }

  // let the browser know about the custom element
  customElements.define('hello-world', HelloWorld);
  customElements.define('hello-world-new', HelloWorldNew);
})();
