# Introduction

Changers City SDK allows partners to build their own interactive UI widgets which can be embedded inside 
Changers City app. 

These widgets are built using [Web Components](https://www.webcomponents.org/introduction). Web Components are a set of native Javascript APIs in browsers.

Web components allows you to build your own custom html element. These html elements are loaded inside Changers City app on demand, at one of the many pre-defined "slots". We also provide a set of javascript APIs for commincation between widgets and the app. 

In this repository, we will provide some example widgets, document the API interfaces, and define the workflow you can use to test & publish your widgets inside Changers City app. 

# Building Webcompoments 

Web components can be build using either valila javascript or using one of open source frameworks available. 
Currently we are recomending building webcomponents using https://lit.dev/

`examples` directory contains some example widgets built using LitElement library.

# Bundling Webcompoments
We require a single javascript file, which contains web compoment class. The JS file should register the given component.
For example using valila javascript: 
```
class HelloWorld extends HTMLElement {
    // your code here
}

window.customElements.define('hello-world', HelloWorld);
```

or using LitElement

```
import { LitElement } from 'lit';

class HelloWorld extends LitElement
    // your code here
}

window.customElements.define('hello-world', HelloWorld);
```

If there are any dependencies, they should be bundled together with the custom element in the javascript file, preferably using webpack.

# Testing

To test 
