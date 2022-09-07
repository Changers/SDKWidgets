"use strict";
exports.__esModule = true;
var WRAPPER_CLASS = 'open-widgets';
var OpenWidgets = /** @class */ (function () {
    function OpenWidgets() {
        this.initialized = false;
        this.coreWidgets = [
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
                title: 'Tree planting'
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
                title: "Your contribution ".concat(new Date().getFullYear())
            },
        ];
    }
    OpenWidgets.prototype.init = function (_a) {
        var root = _a.root, widgets = _a.widgets;
        if (this.initialized) {
            // tslint:disable-next-line:no-console
            console.warn('Open widgets already initialized');
            return;
        }
        this.root = root;
        this.initialized = true;
        this.setupCoreWidgets();
        this.setupCustomWidgets({ widgets: widgets });
    };
    OpenWidgets.prototype.setupCustomWidgets = function (_a) {
        var _this = this;
        var widgets = _a.widgets;
        widgets.forEach(function (widget) {
            _this.renderCustomWidget({ widget: widget });
        });
    };
    OpenWidgets.prototype.renderCustomWidget = function (_a) {
        var widget = _a.widget;
        var positionId = widget.position.replace('after-', '');
        var positionWidget = this.coreWidgets.find(function (coreWidget) { return coreWidget.id === positionId; });
        if (!positionWidget) {
            // tslint:disable-next-line:no-console
            console.warn("Invalid widget position: ".concat(widget.position));
            return;
        }
        try {
            var customWidget = this.getWidgetCard({});
            var CustomElement = customElements.get(widget.name);
            // @ts-ignore
            var customElement = new CustomElement();
            this.setupCustomElement({ customElement: customElement, customWidget: customWidget });
            customWidget.contentEl.appendChild(customElement);
            positionWidget.el.after(customWidget.el);
        }
        catch (e) {
            // tslint:disable-next-line:no-console
            console.warn("Invalid widget", widget);
            // tslint:disable-next-line:no-console
            console.error(e);
        }
    };
    OpenWidgets.prototype.setupCustomElement = function (_a) {
        var customElement = _a.customElement, customWidget = _a.customWidget;
        customElement.user = {
            id: Math.floor(Math.random() * (1000 - 1) + 1),
            coins: Math.floor(Math.random() * (1000 - 1) + 1),
            account_type: 1,
            email: 'user@email.com',
            firstname: 'First',
            lastname: 'Last'
        };
        customElement.api = {
            getUser: function () {
                return customElement.user;
            },
            openFullScreen: function () {
                customWidget.openFullScreen();
            },
            closeFullScreen: function () {
                customWidget.closeFullScreen();
            },
            getCurrentLocation: function () {
                return new Promise(function (resolve) {
                    return resolve({
                        longitude: parseFloat((Math.random() * (180 - 1) + 1).toFixed(2)),
                        latitude: parseFloat((Math.random() * (90 - 1) + 1).toFixed(2))
                    });
                });
            },
            scanQRCode: function () {
                return new Promise(function (resolve) { return resolve('https://changers.com'); });
            }
        };
    };
    OpenWidgets.prototype.setupCoreWidgets = function () {
        var _this = this;
        var openWidgetsEl = document.createElement('div');
        openWidgetsEl.className = WRAPPER_CLASS;
        this.container = document.createElement('div');
        this.container.className = this.getClassname('container');
        this.coreWidgets.forEach(function (widget) {
            var _a = _this.getWidgetCard(widget), el = _a.el, contentEl = _a.contentEl;
            widget.el = el;
            widget.contentEl = contentEl;
            _this.container.appendChild(widget.el);
        });
        openWidgetsEl.appendChild(this.container);
        this.root.appendChild(openWidgetsEl);
    };
    OpenWidgets.prototype.getWidgetCard = function (_a) {
        var _this = this;
        var title = _a.title, id = _a.id;
        var cardEl = document.createElement('div');
        cardEl.className = this.getClassname('card');
        if (id) {
            cardEl.setAttribute('id', "open-widgets__".concat(id));
        }
        if (title) {
            var titleEl = document.createElement('div');
            titleEl.className = this.getClassname('title');
            titleEl.textContent = title;
            cardEl.appendChild(titleEl);
        }
        var contentEl = document.createElement('div');
        contentEl.className = this.getClassname('content');
        cardEl.appendChild(contentEl);
        var fullScreenClass = this.getClassname("card--full-screen");
        var openFullScreen = function () {
            cardEl.classList.add(fullScreenClass);
            _this.container.style.overflow = 'hidden';
        };
        var closeFullScreen = function () {
            cardEl.classList.remove(fullScreenClass);
            _this.container.style.overflowY = 'scroll';
        };
        return {
            el: cardEl,
            contentEl: contentEl,
            openFullScreen: openFullScreen,
            closeFullScreen: closeFullScreen
        };
    };
    OpenWidgets.prototype.getClassname = function (classname) {
        return "".concat(WRAPPER_CLASS, "__").concat(classname);
    };
    return OpenWidgets;
}());
var openWidgets = new OpenWidgets();
window.openWidgets = openWidgets;
// export default openWidgets;
// export * from './types';
