import { html, css, LitElement } from 'lit';

export class HelloWorld extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--hello-world-text-color, #000);
      }
    `;
  }

  static get properties() {
    return {
      counter: { type: Number },
      user: {type: Object },
      api: {type: Object}
    };
  }

  constructor() {
    super();
    this.counter = 5;
    this.user = {}
    this.api = {}
  }

  __increment() {
    this.counter += 1;

    console.log("increment", this.api, this.user, this.counter)

    console.log("api", this.api)
  }

  render() {
    if (!this.user || !this.user.id)
      return html`<div>Empty User</div>`;

    return html`
      <h2>Hello, User #${this.user.id}!</h2>
      <h5>Balance: ${this.user.coins}!</h5>
      <h5>Counter: ${this.counter}!</h5>
      <button @click=${this.__increment}>increment</button>
    `;
  }
}

