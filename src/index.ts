import {
  CustomWidget,
  GetUser,
  OpenWidgetApi,
  OpenWidgetProps,
  OpenWidgetTheme,
  UserProfile,
} from './types';
import {getUserProfile, userProfileToOpenWidgetUser} from './services';

const WRAPPER_CLASS = 'open-widgets';

type CoreWidget = {
  id: string;
  title: string;
  el?: HTMLElement;
  contentEl?: HTMLElement;
};

type WidgetCard = {
  el: HTMLElement;
  contentEl: HTMLElement;
  openFullScreen: (data: {title: string}) => void;
  closeFullScreen: () => void;
  openNewWidget: ({widget}: {widget: LoadedCustomWidget}) => void;
  removeSelf: () => void;
};

type CustomElement = HTMLElement & OpenWidgetProps;

type LoadedCustomWidget = CustomWidget & {
  widgetCard: WidgetCard;
  customElement: CustomElement;
};

class OpenWidgets {
  root!: HTMLElement;
  container!: HTMLElement;
  userProfile!: UserProfile;
  initialized = false;
  coreWidgets: CoreWidget[] = [
    {
      id: 'token',
      title: 'Your Climate-Coins',
    },
    {
      id: 'invite-friends',
      title: 'Invite friends',
    },
    {
      id: 'tree-planting',
      title: 'Tree planting',
    },
    {
      id: 'badges',
      title: 'Your badges',
    },
    {
      id: 'custom-activities',
      title: 'Save the climate!',
    },
    {
      id: 'compensations',
      title: 'Let there be light!',
    },
    {
      id: 'co2-savings',
      title: `Your contribution ${new Date().getFullYear()}`,
    },
  ];
  customWidgets: LoadedCustomWidget[] = [];

  async init({
    root,
    widgets,
    authData,
  }: {
    root: HTMLElement;
    widgets: CustomWidget[];
    authData: GetUser;
  }) {
    if (this.initialized) {
      // tslint:disable-next-line:no-console
      console.warn('Open widgets already initialized');
      return;
    }

    try {
      const userProfile = await getUserProfile(authData);
      if (!userProfile) {
        return;
      }

      this.userProfile = userProfile;

      this.root = root;
      this.initialized = true;
      this.setupCoreWidgets();
      this.setupCustomWidgets({widgets});
      // tslint:disable-next-line:no-empty
    } catch (e) {}
  }

  setupCustomWidgets({widgets}: {widgets: CustomWidget[]}) {
    this.customWidgets = widgets
      .map((widget) => {
        return this.renderCustomWidget({widget});
      })
      .filter((widget): widget is LoadedCustomWidget => !!widget);
  }

  renderCustomWidget({
    widget,
    fullScreenMode,
    data,
  }: {
    widget: CustomWidget;
    fullScreenMode?: boolean;
    data?: object;
  }): LoadedCustomWidget | undefined {
    const positionId = widget.position
      ? widget.position.replace('after-', '')
      : 'none';
    const positionWidget = this.coreWidgets.find(
      (coreWidget) => coreWidget.id === positionId,
    );
    if (widget.position && !positionWidget) {
      // tslint:disable-next-line:no-console
      console.warn(`Invalid widget position: ${widget.position}`);
    }

    try {
      const widgetCard = this.getWidgetCard({fullScreenMode});
      const CustomElement = customElements.get(widget.name);
      // @ts-ignore
      const customElement = new CustomElement() as CustomElement;
      this.setupCustomElement({
        customElement,
        widgetCard,
        fullScreenMode,
        data,
      });

      widgetCard.contentEl.appendChild(customElement);

      if (positionWidget) {
        positionWidget.el!.after(widgetCard.el);
      }

      return {
        name: widget.name,
        position: widget.position,
        widgetCard,
        customElement,
      };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.warn(`Invalid widget`, widget);
      // tslint:disable-next-line:no-console
      console.error(e);
    }
  }

  setupCustomElement({
    customElement,
    widgetCard,
    fullScreenMode,
    data,
  }: {
    customElement: CustomElement;
    widgetCard: WidgetCard;
    fullScreenMode?: boolean;
    data?: object;
  }) {
    const parent = this;
    let isFullScreen = false;
    let appTitle = '';

    customElement.user = userProfileToOpenWidgetUser({
      userProfile: this.userProfile,
    });

    customElement.theme = this.getTheme();

    customElement.api = {
      getUser() {
        return customElement.user;
      },

      openFullScreen({title}) {
        isFullScreen = true;
        widgetCard.openFullScreen({title: appTitle || title});
      },

      closeFullScreen() {
        widgetCard.closeFullScreen();

        if (fullScreenMode) {
          widgetCard.removeSelf();
        }
      },

      setTitle({title}: {title: string}) {
        appTitle = title;

        if (isFullScreen) {
          this.openFullScreen({title});
        }
      },

      openNewWidget({name, data}) {
        const newWidget = parent.renderCustomWidget({
          widget: {
            name,
          },
          fullScreenMode: true,
          data,
        });
        if (!newWidget) {
          return false;
        }

        widgetCard.openNewWidget({
          widget: newWidget,
        });

        return true;
      },

      getCurrentLocation() {
        return new Promise((resolve) =>
          resolve({
            longitude: parseFloat((Math.random() * (180 - 1) + 1).toFixed(2)),
            latitude: parseFloat((Math.random() * (90 - 1) + 1).toFixed(2)),
          }),
        );
      },

      scanQRCode() {
        return new Promise((resolve) => resolve('https://changers.com'));
      },
    } as OpenWidgetApi;

    if (data) {
      customElement.data = data;
    }

    if (fullScreenMode) {
      customElement.api.openFullScreen({title: ''});
    }
  }

  setupCoreWidgets() {
    const openWidgetsEl = document.createElement('div');
    openWidgetsEl.className = WRAPPER_CLASS;

    this.container = document.createElement('div');
    this.container.className = this.getClassname('container');

    this.coreWidgets.forEach((widget) => {
      const {el, contentEl} = this.getWidgetCard(widget);
      widget.el = el;
      widget.contentEl = contentEl;

      this.container.appendChild(widget.el);
    });

    openWidgetsEl.appendChild(this.container);
    this.root.appendChild(openWidgetsEl);
  }

  getWidgetCard({
    title,
    id,
    fullScreenMode,
  }: {
    id?: string;
    title?: string;
    fullScreenMode?: boolean;
  }): WidgetCard {
    let openedWidget: LoadedCustomWidget;

    const cardEl = document.createElement('div');
    cardEl.className = this.getClassname('card');

    if (id) {
      cardEl.setAttribute('id', `open-widgets__${id}`);
    }

    if (title) {
      const titleEl = document.createElement('div');
      titleEl.className = this.getClassname('title');
      titleEl.textContent = title;

      cardEl.appendChild(titleEl);
    }

    // fs = full screen
    const fsContentEl = document.createElement('div');
    fsContentEl.className = this.getClassname('fs-content');
    const fsTitleEl = document.createElement('div');
    fsTitleEl.className = this.getClassname('fs-title');

    const closeEl = document.createElement('div');
    closeEl.className = this.getClassname('fs-close');
    closeEl.textContent = '✕';
    closeEl.addEventListener('click', () => {
      closeFullScreen();
    });

    fsContentEl.appendChild(fsTitleEl);
    fsContentEl.appendChild(closeEl);
    cardEl.appendChild(fsContentEl);

    const contentEl = document.createElement('div');
    contentEl.className = this.getClassname('content');
    cardEl.appendChild(contentEl);

    const fullScreenClass = this.getClassname(`card--full-screen`);

    const openFullScreen = ({title: fsTitle}: {title: string}) => {
      cardEl.classList.add(fullScreenClass);
      this.container.style.overflow = 'hidden';

      fsTitleEl.textContent = fsTitle || '';
    };

    const closeFullScreen = () => {
      cardEl.classList.remove(fullScreenClass);
      this.container.style.overflowY = 'scroll';

      if (fullScreenMode) {
        cardEl.remove();
      }
    };

    const removeSelf = () => {
      cardEl.remove();
    };

    const openNewWidget = ({widget}: {widget: LoadedCustomWidget}) => {
      if (openedWidget) {
        openedWidget.widgetCard.el.remove();
      }

      openedWidget = widget;
      cardEl.parentNode?.insertBefore(widget.widgetCard.el, cardEl.nextSibling);
    };

    return {
      el: cardEl,
      contentEl,
      openFullScreen,
      closeFullScreen,
      openNewWidget,
      removeSelf,
    };
  }

  getClassname(classname: string) {
    return `${WRAPPER_CLASS}__${classname}`;
  }

  getTheme(): OpenWidgetTheme {
    return {
      styles: {
        font: {
          primary: 'Open Sans',
          secondary: 'Open Sans',
        },
        colors: {
          primary: '#C0D9C2',
          secondary: '#E0ECE1',
        },
        components: {
          app: {
            textColor: '#000000',
            bgColor: '#E0ECE1',
            navBgColor: '#C0D9C2',
            fontFamily: 'Open Sans',
            fontSize: '18px',
            fontWeight: '400',
          },
          widget: {
            title: {
              textColor: '#FFFFFF',
              bgColor: '#000000',
              fontFamily: 'Open Sans',
              fontSize: '24px',
              fontWeight: '600',
            },
            body: {
              textColor: '#000000',
              bgColor: '#FFFFFF',
              fontFamily: 'Open Sans',
              fontSize: '18px',
              fontWeight: '400',
            },
          },
        },
      },
    };
  }
}

export const openWidgets = new OpenWidgets();

declare global {
  interface Window {
    openWidgets: typeof openWidgets;
  }
}

window.openWidgets = openWidgets;

export default openWidgets;

export * from './types';
export * from './services';
