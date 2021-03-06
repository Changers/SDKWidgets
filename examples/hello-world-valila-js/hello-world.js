'use strict';

(function() {
  class HelloWorld extends HTMLElement {
    constructor() {
      // establish prototype chain
      super();

      // attaches shadow tree and returns shadow root reference
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
      const shadow = this.attachShadow({ mode: 'open' });

      this._user = {};
      this._api = {};
      this._counter = 0;

      // creating a container for the editable-list component
      const container = document.createElement('div');

      // creating the inner HTML of the editable list element
      container.innerHTML = `
        <h2>Hello, User #<span class="user-id">${this.userId}</span>!</h2>
        <h5>Balance: <span class="balance">${this.balance}</span></h5>
        <h5>Counter: <span class="counter">${this.counter}</span></h5>
        <button class="increment">increment</button>
      `;

      // appending the container to the shadow DOM
      shadow.appendChild(container);
    }

    // fires after the element has been attached to the DOM
    connectedCallback() {
      console.log("connectedCallback", this.shadowRoot, this, this.user)

      const incrementButton = this.shadowRoot.querySelector('.increment');

      let self = this;

      incrementButton.addEventListener('click', function(e) {
        console.log("addEventListener", self.shadowRoot, self, self.user)

        self._counter ++;

        self.update()
      }, false);
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
