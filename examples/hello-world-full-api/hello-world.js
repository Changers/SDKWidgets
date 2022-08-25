'use strict';

(function () {
  class HelloWorld extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({mode: 'open'});

      this._user = {};
      this._api = {};
      this._theme = {};
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
      `;

      // appending the container to the shadow DOM
      shadow.appendChild(container);
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      console.log(
        'connectedCallback',
        this.shadowRoot,
        this,
        this.user,
        this.theme,
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

      const openFullScreenButton = this.shadowRoot.querySelector(
        '.open-full-screen',
      );
      openFullScreenButton.addEventListener('click', () =>
        self.api.openFullScreen({title: 'Full screen title'}),
      );

      const closeFullScreenButton = this.shadowRoot.querySelector(
        '.close-full-screen',
      );
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

  // let the browser know about the custom element
  customElements.define('hello-world', HelloWorld);
})();
