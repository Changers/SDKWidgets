(()=>{var e={669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),s=n(327),a=n(97),c=n(109),u=n(985),l=n(874),f=n(648),d=n(644),p=n(205);e.exports=function(e){return new Promise((function(t,n){var h,v=e.data,m=e.headers,g=e.responseType;function y(){e.cancelToken&&e.cancelToken.unsubscribe(h),e.signal&&e.signal.removeEventListener("abort",h)}r.isFormData(v)&&r.isStandardBrowserEnv()&&delete m["Content-Type"];var b=new XMLHttpRequest;if(e.auth){var w=e.auth.username||"",E=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(w+":"+E)}var x=a(e.baseURL,e.url);function O(){if(b){var r="getAllResponseHeaders"in b?c(b.getAllResponseHeaders()):null,i={data:g&&"text"!==g&&"json"!==g?b.response:b.responseText,status:b.status,statusText:b.statusText,headers:r,config:e,request:b};o((function(e){t(e),y()}),(function(e){n(e),y()}),i),b=null}}if(b.open(e.method.toUpperCase(),s(x,e.params,e.paramsSerializer),!0),b.timeout=e.timeout,"onloadend"in b?b.onloadend=O:b.onreadystatechange=function(){b&&4===b.readyState&&(0!==b.status||b.responseURL&&0===b.responseURL.indexOf("file:"))&&setTimeout(O)},b.onabort=function(){b&&(n(new f("Request aborted",f.ECONNABORTED,e,b)),b=null)},b.onerror=function(){n(new f("Network Error",f.ERR_NETWORK,e,b,b)),b=null},b.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||l;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(new f(t,r.clarifyTimeoutError?f.ETIMEDOUT:f.ECONNABORTED,e,b)),b=null},r.isStandardBrowserEnv()){var C=(e.withCredentials||u(x))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;C&&(m[e.xsrfHeaderName]=C)}"setRequestHeader"in b&&r.forEach(m,(function(e,t){void 0===v&&"content-type"===t.toLowerCase()?delete m[t]:b.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(b.withCredentials=!!e.withCredentials),g&&"json"!==g&&(b.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&b.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&b.upload&&b.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(h=function(e){b&&(n(!e||e&&e.type?new d:e),b.abort(),b=null)},e.cancelToken&&e.cancelToken.subscribe(h),e.signal&&(e.signal.aborted?h():e.signal.addEventListener("abort",h))),v||(v=null);var S=p(x);S&&-1===["http","https","file"].indexOf(S)?n(new f("Unsupported protocol "+S+":",f.ERR_BAD_REQUEST,e)):b.send(v)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),s=n(185),a=function e(t){var n=new i(t),a=o(i.prototype.request,n);return r.extend(a,i.prototype,n),r.extend(a,n),a.create=function(n){return e(s(t,n))},a}(n(546));a.Axios=i,a.CanceledError=n(644),a.CancelToken=n(972),a.isCancel=n(502),a.VERSION=n(288).version,a.toFormData=n(675),a.AxiosError=n(648),a.Cancel=a.CanceledError,a.all=function(e){return Promise.all(e)},a.spread=n(713),a.isAxiosError=n(268),e.exports=a,e.exports.default=a},972:(e,t,n)=>{"use strict";var r=n(644);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},644:(e,t,n)=>{"use strict";var r=n(648);function o(e){r.call(this,null==e?"canceled":e,r.ERR_CANCELED),this.name="CanceledError"}n(867).inherits(o,r,{__CANCEL__:!0}),e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),s=n(572),a=n(185),c=n(97),u=n(875),l=u.validators;function f(e){this.defaults=e,this.interceptors={request:new i,response:new i}}f.prototype.request=function(e,t){"string"==typeof e?(t=t||{}).url=e:t=e||{},(t=a(this.defaults,t)).method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var n=t.transitional;void 0!==n&&u.assertOptions(n,{silentJSONParsing:l.transitional(l.boolean),forcedJSONParsing:l.transitional(l.boolean),clarifyTimeoutError:l.transitional(l.boolean)},!1);var r=[],o=!0;this.interceptors.request.forEach((function(e){"function"==typeof e.runWhen&&!1===e.runWhen(t)||(o=o&&e.synchronous,r.unshift(e.fulfilled,e.rejected))}));var i,c=[];if(this.interceptors.response.forEach((function(e){c.push(e.fulfilled,e.rejected)})),!o){var f=[s,void 0];for(Array.prototype.unshift.apply(f,r),f=f.concat(c),i=Promise.resolve(t);f.length;)i=i.then(f.shift(),f.shift());return i}for(var d=t;r.length;){var p=r.shift(),h=r.shift();try{d=p(d)}catch(e){h(e);break}}try{i=s(d)}catch(e){return Promise.reject(e)}for(;c.length;)i=i.then(c.shift(),c.shift());return i},f.prototype.getUri=function(e){e=a(this.defaults,e);var t=c(e.baseURL,e.url);return o(t,e.params,e.paramsSerializer)},r.forEach(["delete","get","head","options"],(function(e){f.prototype[e]=function(t,n){return this.request(a(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){function t(t){return function(n,r,o){return this.request(a(o||{},{method:e,headers:t?{"Content-Type":"multipart/form-data"}:{},url:n,data:r}))}}f.prototype[e]=t(),f.prototype[e+"Form"]=t(!0)})),e.exports=f},648:(e,t,n)=>{"use strict";var r=n(867);function o(e,t,n,r,o){Error.call(this),this.message=e,this.name="AxiosError",t&&(this.code=t),n&&(this.config=n),r&&(this.request=r),o&&(this.response=o)}r.inherits(o,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var i=o.prototype,s={};["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach((function(e){s[e]={value:e}})),Object.defineProperties(o,s),Object.defineProperty(i,"isAxiosError",{value:!0}),o.from=function(e,t,n,s,a,c){var u=Object.create(i);return r.toFlatObject(e,u,(function(e){return e!==Error.prototype})),o.call(u,e.message,t,n,s,a),u.name=e.name,c&&Object.assign(u,c),u},e.exports=o},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),s=n(546),a=n(644);function c(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new a}e.exports=function(e){return c(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||s.adapter)(e).then((function(t){return c(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={};function o(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(e[n],t[n])}function s(e){if(!r.isUndefined(t[e]))return o(void 0,t[e])}function a(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(void 0,t[n])}function c(n){return n in t?o(e[n],t[n]):n in e?o(void 0,e[n]):void 0}var u={url:s,method:s,data:s,baseURL:a,transformRequest:a,transformResponse:a,paramsSerializer:a,timeout:a,timeoutMessage:a,withCredentials:a,adapter:a,responseType:a,xsrfCookieName:a,xsrfHeaderName:a,onUploadProgress:a,onDownloadProgress:a,decompress:a,maxContentLength:a,maxBodyLength:a,beforeRedirect:a,transport:a,httpAgent:a,httpsAgent:a,cancelToken:a,socketPath:a,responseEncoding:a,validateStatus:c};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=u[e]||i,o=t(e);r.isUndefined(o)&&t!==c||(n[e]=o)})),n}},26:(e,t,n)=>{"use strict";var r=n(648);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(new r("Request failed with status code "+n.status,[r.ERR_BAD_REQUEST,r.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867),o=n(546);e.exports=function(e,t,n){var i=this||o;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},546:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i=n(648),s=n(874),a=n(675),c={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var l,f={transitional:s,adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(l=n(448)),l),transformRequest:[function(e,t){if(o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e))return e;if(r.isArrayBufferView(e))return e.buffer;if(r.isURLSearchParams(e))return u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString();var n,i=r.isObject(e),s=t&&t["Content-Type"];if((n=r.isFileList(e))||i&&"multipart/form-data"===s){var c=this.env&&this.env.FormData;return a(n?{"files[]":e}:e,c&&new c)}return i||"application/json"===s?(u(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(0,JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(0,JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||f.transitional,n=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,s=!n&&"json"===this.responseType;if(s||o&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(s){if("SyntaxError"===e.name)throw i.from(e,i.ERR_BAD_RESPONSE,this,null,this.response);throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:n(623)},validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){f.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){f.headers[e]=r.merge(c)})),e.exports=f},874:e=>{"use strict";e.exports={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1}},288:e=>{e.exports={version:"0.27.2"}},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var s=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),s.push(o(t)+"="+o(e))})))})),i=s.join("&")}if(i){var a=e.indexOf("#");-1!==a&&(e=e.slice(0,a)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,s){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===s&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(e)}},268:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e){return r.isObject(e)&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},623:e=>{e.exports=null},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,s={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(s[t]&&o.indexOf(t)>=0)return;s[t]="set-cookie"===t?(s[t]?s[t]:[]).concat([n]):s[t]?s[t]+", "+n:n}})),s):s}},205:e=>{"use strict";e.exports=function(e){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(e);return t&&t[1]||""}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},675:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||new FormData;var n=[];function o(e){return null===e?"":r.isDate(e)?e.toISOString():r.isArrayBuffer(e)||r.isTypedArray(e)?"function"==typeof Blob?new Blob([e]):Buffer.from(e):e}return function e(i,s){if(r.isPlainObject(i)||r.isArray(i)){if(-1!==n.indexOf(i))throw Error("Circular reference detected in "+s);n.push(i),r.forEach(i,(function(n,i){if(!r.isUndefined(n)){var a,c=s?s+"."+i:i;if(n&&!s&&"object"==typeof n)if(r.endsWith(i,"{}"))n=JSON.stringify(n);else if(r.endsWith(i,"[]")&&(a=r.toArray(n)))return void a.forEach((function(e){!r.isUndefined(e)&&t.append(c,o(e))}));e(n,c)}})),n.pop()}else t.append(s,o(i))}(e),t}},875:(e,t,n)=>{"use strict";var r=n(288).version,o=n(648),i={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){i[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var s={};i.transitional=function(e,t,n){function i(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,a){if(!1===e)throw new o(i(r," has been removed"+(t?" in "+t:"")),o.ERR_DEPRECATED);return t&&!s[r]&&(s[r]=!0,console.warn(i(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,a)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new o("options must be an object",o.ERR_BAD_OPTION_VALUE);for(var r=Object.keys(e),i=r.length;i-- >0;){var s=r[i],a=t[s];if(a){var c=e[s],u=void 0===c||a(c,s,e);if(!0!==u)throw new o("option "+s+" must be "+u,o.ERR_BAD_OPTION_VALUE)}else if(!0!==n)throw new o("Unknown option "+s,o.ERR_BAD_OPTION)}},validators:i}},867:(e,t,n)=>{"use strict";var r,o=n(849),i=Object.prototype.toString,s=(r=Object.create(null),function(e){var t=i.call(e);return r[t]||(r[t]=t.slice(8,-1).toLowerCase())});function a(e){return e=e.toLowerCase(),function(t){return s(t)===e}}function c(e){return Array.isArray(e)}function u(e){return void 0===e}var l=a("ArrayBuffer");function f(e){return null!==e&&"object"==typeof e}function d(e){if("object"!==s(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}var p=a("Date"),h=a("File"),v=a("Blob"),m=a("FileList");function g(e){return"[object Function]"===i.call(e)}var y=a("URLSearchParams");function b(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),c(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}var w,E=(w="undefined"!=typeof Uint8Array&&Object.getPrototypeOf(Uint8Array),function(e){return w&&e instanceof w});e.exports={isArray:c,isArrayBuffer:l,isBuffer:function(e){return null!==e&&!u(e)&&null!==e.constructor&&!u(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){var t="[object FormData]";return e&&("function"==typeof FormData&&e instanceof FormData||i.call(e)===t||g(e.toString)&&e.toString()===t)},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&l(e.buffer)},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:f,isPlainObject:d,isUndefined:u,isDate:p,isFile:h,isBlob:v,isFunction:g,isStream:function(e){return f(e)&&g(e.pipe)},isURLSearchParams:y,isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:b,merge:function e(){var t={};function n(n,r){d(t[r])&&d(n)?t[r]=e(t[r],n):d(n)?t[r]=e({},n):c(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)b(arguments[r],n);return t},extend:function(e,t,n){return b(t,(function(t,r){e[r]=n&&"function"==typeof t?o(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e},inherits:function(e,t,n,r){e.prototype=Object.create(t.prototype,r),e.prototype.constructor=e,n&&Object.assign(e.prototype,n)},toFlatObject:function(e,t,n){var r,o,i,s={};t=t||{};do{for(o=(r=Object.getOwnPropertyNames(e)).length;o-- >0;)s[i=r[o]]||(t[i]=e[i],s[i]=!0);e=Object.getPrototypeOf(e)}while(e&&(!n||n(e,t))&&e!==Object.prototype);return t},kindOf:s,kindOfTest:a,endsWith:function(e,t,n){e=String(e),(void 0===n||n>e.length)&&(n=e.length),n-=t.length;var r=e.indexOf(t,n);return-1!==r&&r===n},toArray:function(e){if(!e)return null;var t=e.length;if(u(t))return null;for(var n=new Array(t);t-- >0;)n[t]=e[t];return n},isTypedArray:E,isFileList:m}},607:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)},i=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0});var a=n(999),c="open-widgets",u=new(function(){function e(){this.initialized=!1,this.coreWidgets=[{id:"token",title:"Your Climate-Coins"},{id:"invite-friends",title:"Invite friends"},{id:"tree-planting",title:"Tree planting"},{id:"badges",title:"Your badges"},{id:"custom-activities",title:"Save the climate!"},{id:"compensations",title:"Let there be light!"},{id:"co2-savings",title:"Your contribution ".concat((new Date).getFullYear())}]}return e.prototype.init=function(e){var t=e.root,n=e.widgets,r=e.authData;return i(this,void 0,void 0,(function(){var e;return s(this,(function(o){switch(o.label){case 0:if(this.initialized)return console.warn("Open widgets already initialized"),[2];o.label=1;case 1:return o.trys.push([1,3,,4]),[4,(0,a.getUserProfile)(r)];case 2:return(e=o.sent())?(this.userProfile=e,this.root=t,this.initialized=!0,this.setupCoreWidgets(),this.setupCustomWidgets({widgets:n}),[3,4]):[2];case 3:return o.sent(),[3,4];case 4:return[2]}}))}))},e.prototype.setupCustomWidgets=function(e){var t=this;e.widgets.forEach((function(e){t.renderCustomWidget({widget:e})}))},e.prototype.renderCustomWidget=function(e){var t=e.widget,n=t.position.replace("after-",""),r=this.coreWidgets.find((function(e){return e.id===n}));if(r)try{var o=this.getWidgetCard({}),i=new(customElements.get(t.name));this.setupCustomElement({customElement:i,customWidget:o}),o.contentEl.appendChild(i),r.el.after(o.el)}catch(e){console.warn("Invalid widget",t),console.error(e)}else console.warn("Invalid widget position: ".concat(t.position))},e.prototype.setupCustomElement=function(e){var t=e.customElement,n=e.customWidget;t.user={id:this.userProfile.user.id,coins:this.userProfile.user.recoins,account_type:this.userProfile.user.account_type,email:this.userProfile.user.email,firstname:this.userProfile.user.firstname,lastname:this.userProfile.user.lastname},t.theme=this.getTheme(),t.api={getUser:function(){return t.user},openFullScreen:function(e){var t=e.title;n.openFullScreen({title:t})},closeFullScreen:function(){n.closeFullScreen()},getCurrentLocation:function(){return new Promise((function(e){return e({longitude:parseFloat((179*Math.random()+1).toFixed(2)),latitude:parseFloat((89*Math.random()+1).toFixed(2))})}))},scanQRCode:function(){return new Promise((function(e){return e("https://changers.com")}))}}},e.prototype.setupCoreWidgets=function(){var e=this,t=document.createElement("div");t.className=c,this.container=document.createElement("div"),this.container.className=this.getClassname("container"),this.coreWidgets.forEach((function(t){var n=e.getWidgetCard(t),r=n.el,o=n.contentEl;t.el=r,t.contentEl=o,e.container.appendChild(t.el)})),t.appendChild(this.container),this.root.appendChild(t)},e.prototype.getWidgetCard=function(e){var t=this,n=e.title,r=e.id,o=document.createElement("div");if(o.className=this.getClassname("card"),r&&o.setAttribute("id","open-widgets__".concat(r)),n){var i=document.createElement("div");i.className=this.getClassname("title"),i.textContent=n,o.appendChild(i)}var s=document.createElement("div");s.className=this.getClassname("fs-content");var a=document.createElement("div");a.className=this.getClassname("fs-title");var c=document.createElement("div");c.className=this.getClassname("fs-close"),c.textContent="✕",c.addEventListener("click",(function(){f()})),s.appendChild(a),s.appendChild(c),o.appendChild(s);var u=document.createElement("div");u.className=this.getClassname("content"),o.appendChild(u);var l=this.getClassname("card--full-screen"),f=function(){o.classList.remove(l),t.container.style.overflowY="scroll"};return{el:o,contentEl:u,openFullScreen:function(e){var n=e.title;o.classList.add(l),t.container.style.overflow="hidden",a.textContent=n||""},closeFullScreen:f}},e.prototype.getClassname=function(e){return"".concat(c,"__").concat(e)},e.prototype.getTheme=function(){return{styles:{font:{primary:"Roboto",secondary:"Adobe Sketchnote"},colors:{primary:"#007D8A",secondary:"#C0E4E8"},components:{app:{textColor:"#000000",bgColor:"#C0E4E8",headerBgColor:"#007D8A",fontFamily:"Roboto",fontSize:"18px",fontWeight:"400"},widget:{title:{textColor:"#FFFFFF",bgColor:"#30454A",fontFamily:"Adobe Sketchnote",fontSize:"26px",fontWeight:"500"},body:{textColor:"#000000",bgColor:"#FFFFFF",fontFamily:"Roboto",fontSize:"18px",fontWeight:"400"}}}}}},e}());window.openWidgets=u,t.default=u,o(n(699),t),o(n(999),t)},287:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.loginUser=t.createUser=t.getUserAuth=t.getUserProfile=void 0;var s=n(669),a={development:"changersdev.de",stage:"maroshi.de",production:"changers.com"};t.getUserProfile=function(e){var n=e.app,r=e.clientId,s=e.clientSecret,a=e.env,c=e.uuid;return o(void 0,void 0,void 0,(function(){var e,o,u;return i(this,(function(i){switch(i.label){case 0:return[4,(0,t.getUserAuth)({app:n,clientId:r,clientSecret:s,env:a,uuid:c})];case 1:return(e=i.sent())?[4,l({env:a,headers:{Authorization:"Bearer ".concat(e.userToken),"x-agent":"(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK","x-app":n}}).get("/user/me")]:[2];case 2:return o=i.sent(),[2,null===(u=null==o?void 0:o.data)||void 0===u?void 0:u.data]}}))}))},t.getUserAuth=function(e){var n=e.app,r=e.clientId,s=e.clientSecret,a=e.env,l=e.uuid,f=e.saveAuth,d=void 0===f?u:f;return o(void 0,void 0,void 0,(function(){var e,o,u,f,p,h,v,m,g,y,b,w,E,x,O;return i(this,(function(i){switch(i.label){case 0:return console.info("Obtaining oauth client token.."),[4,c({clientId:r,clientSecret:s,env:a})];case 1:return e=i.sent(),console.info("Got oauth client token"),(null===(v=null==e?void 0:e.data)||void 0===v?void 0:v.access_token)?(o=e.data.access_token,l?(console.info("Logging in with existing user ".concat(l)),[4,(0,t.loginUser)({app:n,clientToken:o,uuid:l,env:a})]):[3,3]):[2];case 2:return u=i.sent(),(null===(m=null==u?void 0:u.data)||void 0===m?void 0:m.data)?(h=null===(y=null===(g=null==u?void 0:u.data)||void 0===g?void 0:g.data)||void 0===y?void 0:y.token,console.info("Logged in with user ".concat(l)),d({userToken:h,uuid:l,app:n,clientId:r,clientSecret:s,clientToken:o}),[2,{userToken:h,uuid:l,app:n,clientId:r,clientSecret:s,clientToken:o}]):[2];case 3:return console.info("Creating new user.."),[4,(0,t.createUser)({app:n,clientToken:o,env:a})];case 4:return f=i.sent(),(null===(b=null==f?void 0:f.data)||void 0===b?void 0:b.data)?(p=null===(E=null===(w=null==f?void 0:f.data)||void 0===w?void 0:w.data)||void 0===E?void 0:E.uuid,h=null===(O=null===(x=null==f?void 0:f.data)||void 0===x?void 0:x.data)||void 0===O?void 0:O.token,console.info("User created ".concat(p)),d({userToken:h,uuid:p,app:n,clientId:r,clientSecret:s,clientToken:o}),[2,{userToken:h,uuid:p,app:n,clientId:r,clientSecret:s,clientToken:o}]):[2]}}))}))};var c=function(e){var t=e.clientId,n=e.clientSecret,r=e.env;return o(void 0,void 0,void 0,(function(){return i(this,(function(e){return[2,l({env:r}).post("oauth/token",{grant_type:"client_credentials",client_id:t,client_secret:n,scope:"*"})]}))}))};t.createUser=function(e){var t=e.app,n=e.clientToken,r=e.env;return o(void 0,void 0,void 0,(function(){return i(this,(function(e){return[2,l({env:r,headers:{Authorization:"Bearer ".concat(n),"x-agent":"(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK","x-app":t}}).post("user",{})]}))}))},t.loginUser=function(e){var t=e.app,n=e.clientToken,r=e.uuid,s=e.env;return o(void 0,void 0,void 0,(function(){return i(this,(function(e){return[2,l({env:s,headers:{Authorization:"Bearer ".concat(n),"x-agent":"(ChangersAuto/1.0.0) (com.blacksquared.changers-sdk) SDK","x-app":t}}).post("login",{uuid:r})]}))}))};var u=function(e){if("undefined"!=typeof localStorage){var t=localStorage.getItem("oauthClientAuth"),n={};if(t)try{n=JSON.parse(t)}catch(e){console.error(e)}var o=r(r({},n),e);localStorage.setItem("oauthClientAuth",JSON.stringify(o))}},l=function(e){var t=e.env,n=e.headers,o=void 0===n?{}:n;return s.default.create({baseURL:"https://sst.".concat(a[t],"/api/"),headers:r({Accept:"application/json","Content-Type":"application/json"},o)})}},999:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var o=Object.getOwnPropertyDescriptor(t,n);o&&!("get"in o?!t.__esModule:o.writable||o.configurable)||(o={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,o)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),o(n(287),t)},699:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0})}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(607)})();
