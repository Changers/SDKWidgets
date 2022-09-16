import {html, css, LitElement} from 'lit';

export class HelloWorld extends LitElement {
  widgetTitle = 'Hello world';
  newWidgetName = 'hello-world-new';

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
      counter: {type: Number},
      user: {type: Object},
      api: {type: Object},
      theme: {type: Object},
      data: {type: Object},
    };
  }

  constructor() {
    super();
    this.counter = 5;
    this.user = {};
    this.theme = {};
    this.api = {};
    this.data = {};
  }

  __increment() {
    this.counter += 1;

    console.log('increment', this.api, this.user, this.counter);

    console.log('api', this.api);

    console.log('theme', this.theme);

    console.log('data', this.data);
  }

  __fullScreen() {
    this.api.openFullScreen({title: 'Full screen title'});
  }

  __closeFullScreen() {
    this.api.closeFullScreen();
  }

  async __getLocation() {
    console.log('Getting location ....');
    const currentLocation = await this.api.getCurrentLocation();
    console.log('Current location: ', currentLocation);
  }

  async __getQrCode() {
    console.log('Scanning QR code ...');
    const qrCode = await this.api.scanQRCode();
    console.log('QR Code: ', qrCode);
  }

  async __openNewWidget() {
    const opened = this.api.openNewWidget({
      name: this.newWidgetName,
      data: {
        some: 'data',
      },
    });
    console.log('Opened new widget: ', opened);
  }

  async __title() {
    this.api.setTitle({title: this.widgetTitle});
  }

  render() {
    if (!this.user || !this.user.id) return html` <div>Empty User</div>`;

    return html`
      <h2>Hello, User #${this.user.id}!</h2>
      <h5>Balance: ${this.user.coins}!</h5>
      <h5>Counter: ${this.counter}!</h5>
      <button @click="${this.__increment}">Increment</button>
      <button @click="${this.__fullScreen}">Full Screen</button>
      <button @click="${this.__closeFullScreen}">Close Full Screen</button>
      <button @click="${this.__getLocation}">Get Location</button>
      <button @click="${this.__getQrCode}">Get QR Code</button>
      <button @click="${this.__openNewWidget}">Open new widget</button>
      <button @click="${this.__title}">Set widget title</button>
    `;
  }
}
