const WRAPPER_CLASS = 'open-widgets'

class OpenWidgets {
  root;
  initialized = false;
  coreWidgets = [
    {
      id: 'token',
      title: 'Your Climate-Coins'
    },
    {
      id: 'invite-friends',
      title: 'Invite friends'
    },
    {
      id: 'tree-planting',
      title: 'Invite friends'
    },
    {
      id: 'badges',
      title: 'Your badges'
    },
    {
      id: 'custom-activities',
      title: 'Save the climate!'
    },
    {
      id: 'compensations',
      title: 'Let there be light!'
    },
    {
      id: 'co2-savings',
      title: `Your contribution ${ new Date().getFullYear() }`
    },
  ]
  customWidgets = []

  constructor() {
  }

  init({ root, widgets }) {
    if (this.initialized) {
      console.warn('Open widgets already initialized')
      return;
    }

    this.root = root;
    this.initialized = true;
    this.setupCoreWidgets()
    this.setupCustomWidgets(widgets)
  }

  setupCustomWidgets(widgets) {
    widgets.forEach((widget) => {
      this.renderCustomWidget(widget);
    })
  }

  renderCustomWidget(widget) {
    const positionId = widget.position.replace('after-', '')
    const positionWidget = this.coreWidgets.find((coreWidget) => coreWidget.id === positionId)
    if (!positionWidget) {
      console.warn(`Invalid widget position: ${ widget.position }`)
      return;
    }


    try {
      const customWidget = this.getWidgetCard(widget);
      const CustomElement = customElements.get(widget.name)
      const customElement = new CustomElement()
      this.setupCustomElement({ customElement, customWidget })

      customWidget.contentEl.appendChild(customElement)

      positionWidget.el.after(customWidget.el)
    } catch (e) {
      console.warn(`Invalid widget`, widget)
      console.error(e)
    }
  }

  setupCustomElement({ customElement, customWidget }) {
    customElement.user = {
      id: Math.floor(Math.random() * (1000 - 1) + 1),
      coins: 40,
      account_type: 'user',
      email: 'user@email.com',
      firstname: 'First',
      lastname: 'Last'
    };

    customElement.api = {
      getUser() {
        return customElement.user;
      },

      openFullScreen() {
        customWidget.openFullScreen()
      },

      closeFullScreen() {
        customWidget.closeFullScreen();
      },
    }
  }

  setupCoreWidgets() {
    const openWidgetsEl = document.createElement('div');
    openWidgetsEl.className = WRAPPER_CLASS;

    this.container = document.createElement('div');
    this.container.className = this.getClassname('container')

    this.coreWidgets.forEach((widget) => {
      const { el, contentEl } = this.getWidgetCard(widget);
      widget.el = el;
      widget.contentEl = contentEl;

      this.container.appendChild(widget.el)
    })

    openWidgetsEl.appendChild(this.container)
    this.root.appendChild(openWidgetsEl);
  }

  getWidgetCard({ title, id }) {
    const cardEl = document.createElement('div');
    cardEl.className = this.getClassname('card')

    if (id) {
      cardEl.setAttribute('id', `open-widgets__${ id }`)
    }

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = this.getClassname('title')
      titleEl.textContent = title;

      cardEl.appendChild(titleEl)
    }
    const contentEl = document.createElement('div');
    contentEl.className = this.getClassname('content');
    cardEl.appendChild(contentEl);

    const fullScreenClass = this.getClassname(`card--full-screen`)
    const openFullScreen = () => {
      cardEl.classList.add(fullScreenClass);
      this.container.style.overflow = 'hidden';
    }
    const closeFullScreen = () => {
      cardEl.classList.remove(fullScreenClass)
      this.container.style.overflowY = 'scroll';
    }

    return {
      el: cardEl,
      contentEl,
      openFullScreen,
      closeFullScreen
    };
  }

  getClassname(classname) {
    return `${ WRAPPER_CLASS }__${ classname }`
  }
}

window.openWidgets = new OpenWidgets()
