
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module.exports) {
    module.exports = {};
    module.client = module.component = true;
    module.call(this, module.exports, require.relative(resolved), module);
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);
  var index = path + '/index.js';

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (require.modules.hasOwnProperty(path)) return path;
  }

  if (require.aliases.hasOwnProperty(index)) {
    return require.aliases[index];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("components-polymer/polymer.min.js", function(exports, require, module){
function PointerGestureEvent(e,t){var n=t||{},r=document.createEvent("Event"),i={bubbles:!0,cancelable:!0};return Object.keys(i).forEach(function(e){e in n&&(i[e]=n[e])}),r.initEvent(e,i.bubbles,i.cancelable),Object.keys(n).forEach(function(e){r[e]=t[e]}),r.preventTap=this.preventTap,r}if(window.Platform=window.Platform||{},window.logFlags=window.logFlags||{},function(e){var t=e.flags||{};location.search.slice(1).split("&").forEach(function(e){e=e.split("="),e[0]&&(t[e[0]]=e[1]||!0)}),t.shadow=(t.shadowdom||t.shadow||t.polyfill||!HTMLElement.prototype.webkitCreateShadowRoot)&&"polyfill",e.flags=t}(Platform),"polyfill"===Platform.flags.shadow){var SideTable;"undefined"!=typeof WeakMap&&0>navigator.userAgent.indexOf("Firefox/")?SideTable=WeakMap:function(){var e=Object.defineProperty,t=Object.hasOwnProperty,n=(new Date).getTime()%1e9;SideTable=function(){this.name="__st"+(1e9*Math.random()>>>0)+(n++ +"__")},SideTable.prototype={set:function(t,n){e(t,this.name,{value:n,writable:!0})},get:function(e){return t.call(e,this.name)?e[this.name]:void 0},"delete":function(e){this.set(e,void 0)}}}();var ShadowDOMPolyfill={};(function(e){"use strict";function t(e){if(!e)throw Error("Assertion failed")}function n(e,t){return Object.getOwnPropertyNames(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function r(e,t){return Object.getOwnPropertyNames(t).forEach(function(n){switch(n){case"arguments":case"caller":case"length":case"name":case"prototype":case"toString":return}Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}),e}function i(e){var t=e.__proto__||Object.getPrototypeOf(e),n=S.get(t);if(n)return n;var r=i(t),o=h(r);return u(t,o,e),o}function o(e,t){s(e,t,!0)}function a(e,t){s(t,e,!1)}function s(e,t,n){Object.getOwnPropertyNames(e).forEach(function(r){if(!(r in t)){O&&e.__lookupGetter__(r);var i;try{i=Object.getOwnPropertyDescriptor(e,r)}catch(o){i=C}var a,s;if(n&&"function"==typeof i.value)return t[r]=function(){return this.impl[r].apply(this.impl,arguments)},void 0;a=function(){return this.impl[r]},(i.writable||i.set)&&(s=function(e){this.impl[r]=e}),Object.defineProperty(t,r,{get:a,set:s,configurable:i.configurable,enumerable:i.enumerable})}})}function l(e,t,n){var i=e.prototype;u(i,t,n),r(t,e)}function u(e,n,r){var i=n.prototype;t(void 0===S.get(e)),S.set(e,n),o(e,i),r&&a(i,r)}function c(e,t){return S.get(t.prototype)===e}function d(e){var t=Object.getPrototypeOf(e),n=i(t),r=h(n);return u(t,r,e),r}function h(e){function t(t){e.call(this,t)}return t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t}function p(e){return e instanceof P.EventTarget||e instanceof P.Event||e instanceof P.DOMImplementation}function f(e){return e instanceof N||e instanceof _||e instanceof D||e instanceof L}function v(e){if(null===e)return null;t(f(e));var n=M.get(e);if(!n){var r=i(e);n=new r(e),M.set(e,n)}return n}function m(e){return null===e?null:(t(p(e)),e.impl)}function g(e){return e&&p(e)?m(e):e}function b(e){return e&&!p(e)?v(e):e}function y(e,n){null!==n&&(t(f(e)),t(void 0===n||p(n)),M.set(e,n))}function w(e,t,n){Object.defineProperty(e.prototype,t,{get:n,configurable:!0,enumerable:!0})}function E(e,t){w(e,t,function(){return v(this.impl[t])})}function T(e,t){e.forEach(function(e){t.forEach(function(t){e.prototype[t]=function(){var e=v(this);return e[t].apply(e,arguments)}})})}var M=new SideTable,S=new SideTable,P=Object.create(null);Object.getOwnPropertyNames(window);var O=/Firefox/.test(navigator.userAgent),C={get:function(){},set:function(){},configurable:!0,enumerable:!0},L=DOMImplementation,_=Event,N=Node,D=Window;e.assert=t,e.defineGetter=w,e.defineWrapGetter=E,e.forwardMethodsToWrapper=T,e.isWrapperFor=c,e.mixin=n,e.registerObject=d,e.registerWrapper=l,e.rewrap=y,e.unwrap=m,e.unwrapIfNeeded=g,e.wrap=v,e.wrapIfNeeded=b,e.wrappers=P})(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){return e instanceof k.ShadowRoot}function n(e){var t=e.localName;return"content"===t||"shadow"===t}function r(e){return!!e.shadowRoot}function i(e){var t;return e.parentNode||(t=e.defaultView)&&H(t)||null}function o(o,a,s){if(s.length)return s.shift();if(t(o))return o.insertionParent||e.getHostForShadowRoot(o);var l=e.eventParentsTable.get(o);if(l){for(var u=1;l.length>u;u++)s[u-1]=l[u];return l[0]}if(a&&n(o)){var c=o.parentNode;if(c&&r(c))for(var d=e.getShadowTrees(c),h=a.insertionParent,u=0;d.length>u;u++)if(d[u].contains(h))return h}return i(o)}function a(e){for(var r=[],i=e,a=[],l=[];i;){var u=null;if(n(i)){u=s(r);var c=r[r.length-1]||i;r.push(c)}else r.length||r.push(i);var d=r[r.length-1];a.push({target:d,currentTarget:i}),t(i)&&r.pop(),i=o(i,u,l)}return a}function s(e){for(var t=e.length-1;t>=0;t--)if(!n(e[t]))return e[t];return null}function l(r,i){for(var a=[];r;){for(var l=[],c=i,h=void 0;c;){var p=null;if(l.length){if(n(c)&&(p=s(l),u(h))){var f=l[l.length-1];l.push(f)}}else l.push(c);if(d(c,r))return l[l.length-1];t(c)&&l.pop(),h=c,c=o(c,p,a)}r=t(r)?e.getHostForShadowRoot(r):r.parentNode}}function u(e){return e.insertionParent}function c(e){for(var t;t=e.parentNode;)e=t;return e}function d(e,t){return c(e)===c(t)}function h(e){switch(e){case"DOMAttrModified":case"DOMAttributeNameChanged":case"DOMCharacterDataModified":case"DOMElementNameChanged":case"DOMNodeInserted":case"DOMNodeInsertedIntoDocument":case"DOMNodeRemoved":case"DOMNodeRemovedFromDocument":case"DOMSubtreeModified":return!0}return!1}function p(t){if(!I.get(t)){I.set(t,!0),h(t.type)||e.renderAllPending();var n=H(t.target),r=H(t);return f(r,n)}}function f(e,t){var n=a(t);return"load"===e.type&&2===n.length&&n[0].target instanceof k.Document&&n.shift(),v(e,n)&&m(e,n)&&g(e,n),B.set(e,w.NONE),F.set(e,null),e.defaultPrevented}function v(e,t){for(var n,r=t.length-1;r>0;r--){var i=t[r].target,o=t[r].currentTarget;if(i!==o&&(n=w.CAPTURING_PHASE,!b(t[r],e,n)))return!1}return!0}function m(e,t){var n=w.AT_TARGET;return b(t[0],e,n)}function g(e,t){for(var n,r=e.bubbles,i=1;t.length>i;i++){var o=t[i].target,a=t[i].currentTarget;if(o===a)n=w.AT_TARGET;else{if(!r||Y.get(e))continue;n=w.BUBBLING_PHASE}if(!b(t[i],e,n))return}}function b(e,t,n){var r=e.target,i=e.currentTarget,o=R.get(i);if(!o)return!0;if("relatedTarget"in t){var a=x(t),s=H(a.relatedTarget),u=l(i,s);if(u===r)return!0;U.set(t,u)}B.set(t,n);var c=t.type,d=!1;j.set(t,r),F.set(t,i);for(var h=0;o.length>h;h++){var p=o[h];if(p.removed)d=!0;else if(!(p.type!==c||!p.capture&&n===w.CAPTURING_PHASE||p.capture&&n===w.BUBBLING_PHASE))try{if("function"==typeof p.handler?p.handler.call(i,t):p.handler.handleEvent(t),Y.get(t))return!1}catch(f){window.onerror?window.onerror(f.message):console.error(f)}}if(d){var v=o.slice();o.length=0;for(var h=0;v.length>h;h++)v[h].removed||o.push(v[h])}return!q.get(t)}function y(e,t,n){this.type=e,this.handler=t,this.capture=Boolean(n)}function w(e,t){return e instanceof W?(this.impl=e,void 0):H(S(W,"Event",e,t))}function E(e){return e&&e.relatedTarget?Object.create(e,{relatedTarget:{value:x(e.relatedTarget)}}):e}function T(e,t,n){var r=window[e],i=function(t,n){return t instanceof r?(this.impl=t,void 0):H(S(r,e,t,n))};return i.prototype=Object.create(t.prototype),n&&D(i.prototype,n),r&&A(r,i,document.createEvent(e)),i}function M(e,t){return function(){arguments[t]=x(arguments[t]);var n=x(this);n[e].apply(n,arguments)}}function S(e,t,n,r){if(et)return new e(n,E(r));var i=x(document.createEvent(t)),o=Z[t],a=[n];return Object.keys(o).forEach(function(e){var t=null!=r&&e in r?r[e]:o[e];"relatedTarget"===e&&(t=x(t)),a.push(t)}),i["init"+t].apply(i,a),i}function P(e){return"function"==typeof e?!0:e&&e.handleEvent}function O(e){this.impl=e}function C(t){return t instanceof k.ShadowRoot&&(t=e.getHostForShadowRoot(t)),x(t)}function L(e){N(e,rt)}function _(t,n,r,i){e.renderAllPending();for(var o=H(it.call(n.impl,r,i)),s=a(o,this),l=0;s.length>l;l++){var u=s[l];if(u.currentTarget===t)return u.target}return null}var N=e.forwardMethodsToWrapper,D=e.mixin,A=e.registerWrapper,x=e.unwrap,H=e.wrap,k=e.wrappers;new SideTable;var R=new SideTable,I=new SideTable,j=new SideTable,F=new SideTable,U=new SideTable,B=new SideTable,q=new SideTable,Y=new SideTable;y.prototype={equals:function(e){return this.handler===e.handler&&this.type===e.type&&this.capture===e.capture},get removed(){return null===this.handler},remove:function(){this.handler=null}};var W=window.Event;w.prototype={get target(){return j.get(this)},get currentTarget(){return F.get(this)},get eventPhase(){return B.get(this)},stopPropagation:function(){q.set(this,!0)},stopImmediatePropagation:function(){q.set(this,!0),Y.set(this,!0)}},A(W,w,document.createEvent("Event"));var V=T("UIEvent",w),G=T("CustomEvent",w),X={get relatedTarget(){return U.get(this)||H(x(this).relatedTarget)}},z=D({initMouseEvent:M("initMouseEvent",14)},X),K=D({initFocusEvent:M("initFocusEvent",5)},X),Q=T("MouseEvent",V,z),$=T("FocusEvent",V,K),J=T("MutationEvent",w,{initMutationEvent:M("initMutationEvent",3),get relatedNode(){return H(this.impl.relatedNode)}}),Z=Object.create(null),et=function(){try{new window.MouseEvent("click")}catch(e){return!1}return!0}();if(!et){var tt=function(e,t,n){if(n){var r=Z[n];t=D(D({},r),t)}Z[e]=t};tt("Event",{bubbles:!1,cancelable:!1}),tt("CustomEvent",{detail:null},"Event"),tt("UIEvent",{view:null,detail:0},"Event"),tt("MouseEvent",{screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null},"UIEvent"),tt("FocusEvent",{relatedTarget:null},"UIEvent")}var nt=window.EventTarget,rt=["addEventListener","removeEventListener","dispatchEvent"];[Element,Window,Document].forEach(function(e){var t=e.prototype;rt.forEach(function(e){Object.defineProperty(t,e+"_",{value:t[e]})})}),O.prototype={addEventListener:function(e,t,n){if(P(t)){var r=new y(e,t,n),i=R.get(this);if(i){for(var o=0;i.length>o;o++)if(r.equals(i[o]))return}else i=[],R.set(this,i);i.push(r);var a=C(this);a.addEventListener_(e,p,!0)}},removeEventListener:function(e,t,n){n=Boolean(n);var r=R.get(this);if(r){for(var i=0,o=!1,a=0;r.length>a;a++)r[a].type===e&&r[a].capture===n&&(i++,r[a].handler===t&&(o=!0,r[a].remove()));if(o&&1===i){var s=C(this);s.removeEventListener_(e,p,!0)}}},dispatchEvent:function(e){var t=C(this);return t.dispatchEvent_(x(e))}},nt&&A(nt,O);var it=document.elementFromPoint;e.adjustRelatedTarget=l,e.elementFromPoint=_,e.wrapEventTargetMethods=L,e.wrappers.CustomEvent=G,e.wrappers.Event=w,e.wrappers.EventTarget=O,e.wrappers.FocusEvent=$,e.wrappers.MouseEvent=Q,e.wrappers.MutationEvent=J,e.wrappers.UIEvent=V}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e,t){Object.defineProperty(e,t,{enumerable:!1})}function n(){this.length=0,t(this,"length")}function r(e){if(null==e)return e;for(var t=new n,r=0,i=e.length;i>r;r++)t[r]=o(e[r]);return t.length=i,t}function i(e,t){e.prototype[t]=function(){return r(this.impl[t].apply(this.impl,arguments))}}var o=e.wrap;n.prototype={item:function(e){return this[e]}},t(n.prototype,"item"),e.wrappers.NodeList=n,e.addWrapNodeListMethod=i,e.wrapNodeList=r}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){u(e instanceof o)}function n(e,t,n,r){if(e.nodeType!==o.DOCUMENT_FRAGMENT_NODE)return e.parentNode&&e.parentNode.removeChild(e),e.parentNode_=t,e.previousSibling_=n,e.nextSibling_=r,n&&(n.nextSibling_=e),r&&(r.previousSibling_=e),[e];for(var i,a=[];i=e.firstChild;)e.removeChild(i),a.push(i),i.parentNode_=t;for(var s=0;a.length>s;s++)a[s].previousSibling_=a[s-1]||n,a[s].nextSibling_=a[s+1]||r;return n&&(n.nextSibling_=a[0]),r&&(r.previousSibling_=a[a.length-1]),a}function r(e){if(1===e.length)return h(e[0]);for(var t=h(document.createDocumentFragment()),n=0;e.length>n;n++)t.appendChild(h(e[n]));return t}function i(e){for(var t=e.firstChild;t;){u(t.parentNode===e);var n=t.nextSibling,r=h(t),i=r.parentNode;i&&b.call(i,r),t.previousSibling_=t.nextSibling_=t.parentNode_=null,t=n}e.firstChild_=e.lastChild_=null}function o(e){u(e instanceof f),a.call(this,e),this.parentNode_=void 0,this.firstChild_=void 0,this.lastChild_=void 0,this.nextSibling_=void 0,this.previousSibling_=void 0}var a=e.wrappers.EventTarget,s=e.wrappers.NodeList,l=e.defineWrapGetter,u=e.assert,c=e.mixin,d=e.registerWrapper,h=e.unwrap,p=e.wrap,f=window.Node,v=f.prototype.appendChild,m=f.prototype.insertBefore,g=f.prototype.replaceChild,b=f.prototype.removeChild,y=f.prototype.compareDocumentPosition;o.prototype=Object.create(a.prototype),c(o.prototype,{appendChild:function(e){t(e),this.invalidateShadowRenderer();var i=this.lastChild,o=null,a=n(e,this,i,o);return this.lastChild_=a[a.length-1],i||(this.firstChild_=a[0]),v.call(this.impl,r(a)),e},insertBefore:function(e,i){if(!i)return this.appendChild(e);t(e),t(i),u(i.parentNode===this),this.invalidateShadowRenderer();var o=i.previousSibling,a=i,s=n(e,this,o,a);this.firstChild===i&&(this.firstChild_=s[0]);var l=h(i),c=l.parentNode;return c&&m.call(c,r(s),l),e},removeChild:function(e){if(t(e),e.parentNode!==this)throw Error("NotFoundError");this.invalidateShadowRenderer();var n=this.firstChild,r=this.lastChild,i=e.nextSibling,o=e.previousSibling,a=h(e),s=a.parentNode;return s&&b.call(s,a),n===e&&(this.firstChild_=i),r===e&&(this.lastChild_=o),o&&(o.nextSibling_=i),i&&(i.previousSibling_=o),e.previousSibling_=e.nextSibling_=e.parentNode_=null,e},replaceChild:function(e,i){if(t(e),t(i),i.parentNode!==this)throw Error("NotFoundError");this.invalidateShadowRenderer();var o=i.previousSibling,a=i.nextSibling;a===e&&(a=e.nextSibling);var s=n(e,this,o,a);this.firstChild===i&&(this.firstChild_=s[0]),this.lastChild===i&&(this.lastChild_=s[s.length-1]),i.previousSibling_=null,i.nextSibling_=null,i.parentNode_=null;var l=h(i);return l.parentNode&&g.call(l.parentNode,r(s),l),i},hasChildNodes:function(){return null===this.firstChild},get parentNode(){return void 0!==this.parentNode_?this.parentNode_:p(this.impl.parentNode)},get firstChild(){return void 0!==this.firstChild_?this.firstChild_:p(this.impl.firstChild)},get lastChild(){return void 0!==this.lastChild_?this.lastChild_:p(this.impl.lastChild)},get nextSibling(){return void 0!==this.nextSibling_?this.nextSibling_:p(this.impl.nextSibling)},get previousSibling(){return void 0!==this.previousSibling_?this.previousSibling_:p(this.impl.previousSibling)},get parentElement(){for(var e=this.parentNode;e&&e.nodeType!==o.ELEMENT_NODE;)e=e.parentNode;return e},get textContent(){for(var e="",t=this.firstChild;t;t=t.nextSibling)e+=t.textContent;return e},set textContent(e){if(i(this),this.invalidateShadowRenderer(),""!==e){var t=this.impl.ownerDocument.createTextNode(e);this.appendChild(t)}},get childNodes(){for(var e=new s,t=0,n=this.firstChild;n;n=n.nextSibling)e[t++]=n;return e.length=t,e},cloneNode:function(e){if(!this.invalidateShadowRenderer())return p(this.impl.cloneNode(e));var t=p(this.impl.cloneNode(!1));if(e)for(var n=this.firstChild;n;n=n.nextSibling)t.appendChild(n.cloneNode(!0));return t},contains:function(e){if(!e)return!1;if(e===this)return!0;var t=e.parentNode;return t?this.contains(t):!1},compareDocumentPosition:function(e){return y.call(this.impl,h(e))}}),l(o,"ownerDocument"),d(f,o,document.createDocumentFragment()),delete o.prototype.querySelector,delete o.prototype.querySelectorAll,o.prototype=c(Object.create(a.prototype),o.prototype),e.wrappers.Node=o}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e,n){for(var r,i=e.firstElementChild;i;){if(i.matches(n))return i;if(r=t(i,n))return r;i=i.nextElementSibling}return null}function n(e,t,r){for(var i=e.firstElementChild;i;)i.matches(t)&&(r[r.length++]=i),n(i,t,r),i=i.nextElementSibling;return r}var r={querySelector:function(e){return t(this,e)},querySelectorAll:function(e){return n(this,e,new NodeList)}},i={getElementsByTagName:function(e){return this.querySelectorAll(e)},getElementsByClassName:function(e){return this.querySelectorAll("."+e)},getElementsByTagNameNS:function(e,t){if("*"===e)return this.getElementsByTagName(t);for(var n=new NodeList,r=this.getElementsByTagName(t),i=0,o=0;r.length>i;i++)r[i].namespaceURI===e&&(n[o++]=r[i]);return n.length=o,n}};e.GetElementsByInterface=i,e.SelectorsInterface=r}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){for(;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.nextSibling;return e}function n(e){for(;e&&e.nodeType!==Node.ELEMENT_NODE;)e=e.previousSibling;return e}var r=e.wrappers.NodeList,i={get firstElementChild(){return t(this.firstChild)},get lastElementChild(){return n(this.lastChild)},get childElementCount(){for(var e=0,t=this.firstElementChild;t;t=t.nextElementSibling)e++;return e},get children(){for(var e=new r,t=0,n=this.firstElementChild;n;n=n.nextElementSibling)e[t++]=n;return e.length=t,e}},o={get nextElementSibling(){return t(this.nextSibling)},get previousElementSibling(){return n(this.nextSibling)}};e.ChildNodeInterface=o,e.ParentNodeInterface=i}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){r.call(this,e)}var n=e.ChildNodeInterface,r=e.wrappers.Node,i=e.mixin,o=e.registerWrapper,a=window.CharacterData;t.prototype=Object.create(r.prototype),i(t.prototype,{get textContent(){return this.data},set textContent(e){this.data=e}}),i(t.prototype,n),o(a,t,document.createTextNode("")),e.wrappers.CharacterData=t}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){i.call(this,e)}var n=e.ChildNodeInterface,r=e.GetElementsByInterface,i=e.wrappers.Node,o=e.ParentNodeInterface,a=e.SelectorsInterface;e.addWrapNodeListMethod;var s=e.mixin,l=e.registerWrapper,u=e.wrappers,c=new SideTable,d=window.Element,h=d.prototype.matches||d.prototype.mozMatchesSelector||d.prototype.msMatchesSelector||d.prototype.webkitMatchesSelector;t.prototype=Object.create(i.prototype),s(t.prototype,{createShadowRoot:function(){var t=new u.ShadowRoot(this);return c.set(this,t),e.getRendererForHost(this),this.invalidateShadowRenderer(!0),t},get shadowRoot(){return c.get(this)||null},setAttribute:function(e,t){this.impl.setAttribute(e,t),this.invalidateShadowRenderer()},matches:function(e){return h.call(this.impl,e)}}),s(t.prototype,n),s(t.prototype,r),s(t.prototype,o),s(t.prototype,a),l(d,t),e.wrappers.Element=t}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){switch(e){case"&":return"&amp;";case"<":return"&lt;";case'"':return"&quot;"}}function n(e){return e.replace(v,t)}function r(e){switch(e.nodeType){case Node.ELEMENT_NODE:for(var t,r=e.tagName.toLowerCase(),o="<"+r,a=e.attributes,s=0;t=a[s];s++)o+=" "+t.name+'="'+n(t.value)+'"';return o+=">",m[r]?o:o+i(e)+"</"+r+">";case Node.TEXT_NODE:return n(e.nodeValue);case Node.COMMENT_NODE:return"<!--"+n(e.nodeValue)+"-->";default:throw console.error(e),Error("not implemented")}}function i(e){for(var t="",n=e.firstChild;n;n=n.nextSibling)t+=r(n);return t}function o(e,t,n){var r=n||"div";e.textContent="";var i=p(e.ownerDocument.createElement(r));i.innerHTML=t;for(var o;o=i.firstChild;)e.appendChild(f(o))}function a(e){u.call(this,e)}function s(t){c(a,t,function(){return e.renderAllPending(),this.impl[t]})}function l(t){Object.defineProperty(a.prototype,t,{value:function(){return e.renderAllPending(),this.impl[t].apply(this.impl,arguments)},configurable:!0,enumerable:!0})}var u=e.wrappers.Element,c=e.defineGetter,d=e.mixin,h=e.registerWrapper,p=e.unwrap,f=e.wrap,v=/&|<|"/g,m={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0},g=window.HTMLElement;a.prototype=Object.create(u.prototype),d(a.prototype,{get innerHTML(){return i(this)},set innerHTML(e){o(this,e,this.tagName)},get outerHTML(){return r(this)},set outerHTML(e){if(this.invalidateShadowRenderer())throw Error("not implemented");this.impl.outerHTML=e}}),["clientHeight","clientLeft","clientTop","clientWidth","offsetHeight","offsetLeft","offsetTop","offsetWidth","scrollHeight","scrollLeft","scrollTop","scrollWidth"].forEach(s),["getBoundingClientRect","getClientRects","scrollIntoView"].forEach(l),h(g,a,document.createElement("b")),e.wrappers.HTMLElement=a,e.getInnerHTML=i,e.setInnerHTML=o}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){n.call(this,e)}var n=e.wrappers.HTMLElement,r=e.mixin,i=e.registerWrapper,o=window.HTMLContentElement;t.prototype=Object.create(n.prototype),r(t.prototype,{get select(){return this.getAttribute("select")},set select(e){this.setAttribute("select",e)},setAttribute:function(e,t){n.prototype.setAttribute.call(this,e,t),"select"===(e+"").toLowerCase()&&this.invalidateShadowRenderer(!0)}}),o&&i(o,t),e.wrappers.HTMLContentElement=t}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){n.call(this,e),this.olderShadowRoot_=null}var n=e.wrappers.HTMLElement,r=e.mixin,i=e.registerWrapper,o=window.HTMLShadowElement;t.prototype=Object.create(n.prototype),r(t.prototype,{get olderShadowRoot(){return this.olderShadowRoot_},invalidateShadowRenderer:function(){n.prototype.invalidateShadowRenderer.call(this,!0)}}),o&&i(o,t),e.wrappers.HTMLShadowElement=t}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){if(!e.defaultView)return e;var t=d.get(e);if(!t){for(t=e.implementation.createHTMLDocument("");t.lastChild;)t.removeChild(t.lastChild);d.set(e,t)}return t}function n(e){for(var n,r=t(e.ownerDocument),i=r.createDocumentFragment();n=e.firstChild;)i.appendChild(n);return i}function r(e){i.call(this,e)}var i=e.wrappers.HTMLElement,o=e.getInnerHTML,a=e.mixin,s=e.registerWrapper,l=e.setInnerHTML,u=e.wrap,c=new SideTable,d=new SideTable,h=window.HTMLTemplateElement;r.prototype=Object.create(i.prototype),a(r.prototype,{get content(){if(h)return u(this.impl.content);var e=c.get(this);return e||(e=n(this),c.set(this,e)),e},get innerHTML(){return o(this.content)},set innerHTML(e){l(this.content,e),this.invalidateShadowRenderer()}}),h&&s(h,r),e.wrappers.HTMLTemplateElement=r}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){switch(e.localName){case"content":return new n(e);case"shadow":return new i(e);case"template":return new o(e)}r.call(this,e)}var n=e.wrappers.HTMLContentElement,r=e.wrappers.HTMLElement,i=e.wrappers.HTMLShadowElement,o=e.wrappers.HTMLTemplateElement;e.mixin;var a=e.registerWrapper,s=window.HTMLUnknownElement;t.prototype=Object.create(r.prototype),a(s,t),e.wrappers.HTMLUnknownElement=t}(this.ShadowDOMPolyfill),function(e){"use strict";var t=e.GetElementsByInterface,n=e.ParentNodeInterface,r=e.SelectorsInterface,i=e.mixin,o=e.registerObject,a=o(document.createDocumentFragment());i(a.prototype,n),i(a.prototype,r),i(a.prototype,t);var s=o(document.createTextNode("")),l=o(document.createComment(""));e.wrappers.Comment=l,e.wrappers.DocumentFragment=a,e.wrappers.Text=s}(this.ShadowDOMPolyfill),function(e){"use strict";function t(t){var r=l(t.impl.ownerDocument.createDocumentFragment());n.call(this,r),a(r,this);var i=t.shadowRoot;e.nextOlderShadowTreeTable.set(this,i),u.set(this,t)}var n=e.wrappers.DocumentFragment,r=e.elementFromPoint,i=e.getInnerHTML,o=e.mixin,a=e.rewrap,s=e.setInnerHTML,l=e.unwrap,u=new SideTable;t.prototype=Object.create(n.prototype),o(t.prototype,{get innerHTML(){return i(this)},set innerHTML(e){s(this,e),this.invalidateShadowRenderer()},invalidateShadowRenderer:function(){return u.get(this).invalidateShadowRenderer()},elementFromPoint:function(e,t){return r(this,this.ownerDocument,e,t)},getElementById:function(e){return this.querySelector("#"+e)}}),e.wrappers.ShadowRoot=t,e.getHostForShadowRoot=function(e){return u.get(e)}}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){e.previousSibling_=e.previousSibling,e.nextSibling_=e.nextSibling,e.parentNode_=e.parentNode}function n(e){e.firstChild_=e.firstChild,e.lastChild_=e.lastChild}function r(e){D(e instanceof N);for(var r=e.firstChild;r;r=r.nextSibling)t(r);n(e)}function i(e){var t=x(e);r(e),t.textContent=""}function o(e,n){var i=x(e),o=x(n);o.nodeType===N.DOCUMENT_FRAGMENT_NODE?r(n):(s(n),t(n)),e.lastChild_=e.lastChild,e.lastChild===e.firstChild&&(e.firstChild_=e.firstChild);var a=H(i.lastChild);a&&(a.nextSibling_=a.nextSibling),i.appendChild(o)}function a(e,n){var r=x(e),i=x(n);t(n),n.previousSibling&&(n.previousSibling.nextSibling_=n),n.nextSibling&&(n.nextSibling.previousSibling_=n),e.lastChild===n&&(e.lastChild_=n),e.firstChild===n&&(e.firstChild_=n),r.removeChild(i)}function s(e){var t=x(e),n=t.parentNode;n&&a(H(n),e)}function l(e,t){c(t).push(e),I.set(e,t);var n=R.get(e);n||R.set(e,n=[]),n.push(t)}function u(e){k.set(e,[])}function c(e){return k.get(e)}function d(e){for(var t=[],n=0,r=e.firstChild;r;r=r.nextSibling)t[n++]=r;return t}function h(e,t,n){for(var r=d(e),i=0;r.length>i;i++){var o=r[i];if(t(o)){if(n(o)===!1)return}else h(o,t,n)}}function p(e,t){var n=!1;return h(e,w,function(e){u(e);for(var r=0;t.length>r;r++){var i=t[r];void 0!==i&&v(i,e)&&(l(i,e),t[r]=void 0,n=!0)}}),n?t.filter(function(e){return void 0!==e}):t}function f(e,t){for(var n=0;t.length>n;n++)if(t[n]in e)return t[n]}function v(e,t){var n=t.getAttribute("select");if(!n)return!0;if(n=n.trim(),!n)return!0;if(e.nodeType!==N.ELEMENT_NODE)return!1;if(!B.test(n))return!1;if(":"===n[0]&&!q.test(n))return!1;try{return e.matches(n)}catch(r){return!1}}function m(){L=null,W.forEach(function(e){e.render()}),W=[]}function g(e){this.host=e,this.dirty=!1,this.associateNode(e)}function b(e){var t=F.get(e);return t||(t=new g(e),F.set(e,t)),t}function y(e){return"content"===e.localName}function w(e){return"content"===e.localName}function E(e){return"shadow"===e.localName}function T(e){return"shadow"===e.localName}function M(e){return!!e.shadowRoot}function S(e){return j.get(e)}function P(e){for(var t=[],n=e.shadowRoot;n;n=j.get(n))t.push(n);return t}function O(e,t){I.set(e,t)}function C(e){new g(e).render()}var L,_=e.wrappers.HTMLContentElement,N=e.wrappers.Node,D=e.assert,A=e.mixin,x=e.unwrap,H=e.wrap,k=new SideTable,R=new SideTable,I=new SideTable,j=new SideTable,F=new SideTable,U=new SideTable,B=/^[*.:#[a-zA-Z_|]/,q=RegExp("^:("+["link","visited","target","enabled","disabled","checked","indeterminate","nth-child","nth-last-child","nth-of-type","nth-last-of-type","first-child","last-child","first-of-type","last-of-type","only-of-type"].join("|")+")"),Y=f(window,["requestAnimationFrame","mozRequestAnimationFrame","webkitRequestAnimationFrame","setTimeout"]),W=[];g.prototype={render:function(){if(this.dirty){var e=this.host;this.treeComposition();var t=e.shadowRoot;if(t){this.removeAllChildNodes(this.host);var n=d(t);n.forEach(function(n){this.renderNode(e,t,n,!1)},this),this.dirty=!1}}},invalidate:function(){if(!this.dirty){if(this.dirty=!0,W.push(this),L)return;L=window[Y](m,0)}},renderNode:function(e,t,n,r){if(M(n)){this.appendChild(e,n);var i=b(n);i.dirty=!0,i.render()}else y(n)?this.renderInsertionPoint(e,t,n,r):E(n)?this.renderShadowInsertionPoint(e,t,n):this.renderAsAnyDomTree(e,t,n,r)},renderAsAnyDomTree:function(e,t,n,r){if(this.appendChild(e,n),M(n))C(n);else{var i=n,o=d(i);o.forEach(function(e){this.renderNode(i,t,e,r)},this)}},renderInsertionPoint:function(e,t,n,r){var i=c(n);i.length?(this.removeAllChildNodes(n),i.forEach(function(n){y(n)&&r?this.renderInsertionPoint(e,t,n,r):this.renderAsAnyDomTree(e,t,n,r)},this)):this.renderFallbackContent(e,n),this.remove(n)},renderShadowInsertionPoint:function(e,t,n){var r=S(t);if(r){I.set(r,n),n.olderShadowRoot_=r,this.remove(n);var i=d(r);i.forEach(function(t){this.renderNode(e,r,t,!0)},this)}else this.renderFallbackContent(e,n)},renderFallbackContent:function(e,t){var n=d(t);n.forEach(function(t){this.appendChild(e,t)},this)},treeComposition:function(){var e=this.host,t=e.shadowRoot,n=[],r=d(e);r.forEach(function(e){if(y(e)){var t=c(e);t&&t.length||(t=d(e)),n.push.apply(n,t)}else n.push(e)});for(var i,o;t;){if(i=void 0,h(t,T,function(e){return i=e,!1}),o=i,n=p(t,n),o){var a=S(t);if(a){t=a,O(t,o);continue}break}break}},appendChild:function(e,t){o(e,t),this.associateNode(t)},remove:function(e){s(e),this.associateNode(e)},removeAllChildNodes:function(e){i(e)},associateNode:function(e){U.set(e,this)}},N.prototype.invalidateShadowRenderer=function(e){var t=U.get(this);if(!t)return!1;var n;return(e||this.shadowRoot||(n=this.parentNode)&&(n.shadowRoot||n instanceof ShadowRoot))&&t.invalidate(),!0},_.prototype.getDistributedNodes=function(){return m(),c(this)},A(N.prototype,{get insertionParent(){return I.get(this)||null}}),e.eventParentsTable=R,e.getRendererForHost=b,e.getShadowTrees=P,e.nextOlderShadowTreeTable=j,e.renderAllPending=m,e.visual={removeAllChildNodes:i,appendChild:o,removeChild:a}}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){s.call(this,e)}function n(e){var n=document[e];t.prototype[e]=function(){return m(n.apply(this.impl,arguments))}}function r(e){this.impl=e}function i(e,t){var n=document.implementation[t];e.prototype[t]=function(){return m(n.apply(this.impl,arguments))}}function o(e,t){var n=document.implementation[t];e.prototype[t]=function(){return n.apply(this.impl,arguments)}}var a=e.GetElementsByInterface,s=e.wrappers.Node,l=e.ParentNodeInterface,u=e.SelectorsInterface,c=e.defineWrapGetter,d=e.elementFromPoint,h=e.forwardMethodsToWrapper,p=e.mixin,f=e.registerWrapper,v=e.unwrap,m=e.wrap,g=e.wrapEventTargetMethods;e.wrapNodeList;var b=new SideTable;t.prototype=Object.create(s.prototype),c(t,"documentElement"),c(t,"body"),c(t,"head"),["getElementById","createElement","createElementNS","createTextNode","createDocumentFragment","createEvent","createEventNS"].forEach(n);var y=document.adoptNode,w=document.write;p(t.prototype,{adoptNode:function(e){return y.call(this.impl,v(e)),e},elementFromPoint:function(e,t){return d(this,this,e,t)},write:function(e){for(var t=this.querySelectorAll("*"),n=t[t.length-1];n.nextSibling;)n=n.nextSibling;var r=n.parentNode;r.lastChild_=void 0,n.nextSibling_=void 0,w.call(this.impl,e)}}),h([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement],["appendChild","compareDocumentPosition","getElementsByClassName","getElementsByTagName","getElementsByTagNameNS","insertBefore","querySelector","querySelectorAll","removeChild","replaceChild"]),h([window.HTMLDocument||window.Document],["adoptNode","createDocumentFragment","createElement","createElementNS","createEvent","createEventNS","createTextNode","elementFromPoint","getElementById","write"]),p(t.prototype,a),p(t.prototype,l),p(t.prototype,u),p(t.prototype,{get implementation(){var e=b.get(this);return e?e:(e=new r(v(this).implementation),b.set(this,e),e)}}),f(window.Document,t,document.implementation.createHTMLDocument("")),window.HTMLDocument&&f(window.HTMLDocument,t),g([window.HTMLBodyElement,window.HTMLDocument||window.Document,window.HTMLHeadElement]),i(r,"createDocumentType"),i(r,"createDocument"),i(r,"createHTMLDocument"),o(r,"hasFeature"),f(window.DOMImplementation,r),h([window.DOMImplementation],["createDocumentType","createDocument","createHTMLDocument","hasFeature"]),e.wrappers.Document=t,e.wrappers.DOMImplementation=r}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){n.call(this,e)}var n=e.wrappers.EventTarget,r=e.mixin,i=e.registerWrapper,o=e.unwrap,a=e.unwrapIfNeeded,s=e.wrap,l=window.Window;t.prototype=Object.create(n.prototype);var u=window.getComputedStyle;l.prototype.getComputedStyle=function(e,t){return u.call(this||window,a(e),t)},["addEventListener","removeEventListener","dispatchEvent"].forEach(function(e){l.prototype[e]=function(){var t=s(this||window);return t[e].apply(t,arguments)}}),r(t.prototype,{getComputedStyle:function(e,t){return u.call(o(this),a(e),t)}}),i(l,t),e.wrappers.Window=t}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){this.impl=e}function n(e){return new t(e)}function r(e){return e.map(n)}function i(e){var t=this;this.impl=new c(function(n){e.call(t,r(n),t)})}var o=e.defineGetter,a=e.defineWrapGetter,s=e.registerWrapper,l=e.unwrapIfNeeded,u=e.wrapNodeList;e.wrappers;var c=window.MutationObserver||window.WebKitMutationObserver;if(c){var d=window.MutationRecord;t.prototype={get addedNodes(){return u(this.impl.addedNodes)},get removedNodes(){return u(this.impl.removedNodes)
}},["target","previousSibling","nextSibling"].forEach(function(e){a(t,e)}),["type","attributeName","attributeNamespace","oldValue"].forEach(function(e){o(t,e,function(){return this.impl[e]})}),d&&s(d,t),window.Node,i.prototype={observe:function(e,t){this.impl.observe(l(e),t)},disconnect:function(){this.impl.disconnect()},takeRecords:function(){return r(this.impl.takeRecords())}},e.wrappers.MutationObserver=i,e.wrappers.MutationRecord=t}}(this.ShadowDOMPolyfill),function(e){"use strict";function t(e){var t=n[e],r=window[t];if(r){var i=document.createElement(e),o=i.constructor;window[t]=o}}e.isWrapperFor;var n={a:"HTMLAnchorElement",applet:"HTMLAppletElement",area:"HTMLAreaElement",audio:"HTMLAudioElement",br:"HTMLBRElement",base:"HTMLBaseElement",body:"HTMLBodyElement",button:"HTMLButtonElement",canvas:"HTMLCanvasElement",dl:"HTMLDListElement",datalist:"HTMLDataListElement",dir:"HTMLDirectoryElement",div:"HTMLDivElement",embed:"HTMLEmbedElement",fieldset:"HTMLFieldSetElement",font:"HTMLFontElement",form:"HTMLFormElement",frame:"HTMLFrameElement",frameset:"HTMLFrameSetElement",hr:"HTMLHRElement",head:"HTMLHeadElement",h1:"HTMLHeadingElement",html:"HTMLHtmlElement",iframe:"HTMLIFrameElement",input:"HTMLInputElement",li:"HTMLLIElement",label:"HTMLLabelElement",legend:"HTMLLegendElement",link:"HTMLLinkElement",map:"HTMLMapElement",menu:"HTMLMenuElement",menuitem:"HTMLMenuItemElement",meta:"HTMLMetaElement",meter:"HTMLMeterElement",del:"HTMLModElement",ol:"HTMLOListElement",object:"HTMLObjectElement",optgroup:"HTMLOptGroupElement",option:"HTMLOptionElement",output:"HTMLOutputElement",p:"HTMLParagraphElement",param:"HTMLParamElement",pre:"HTMLPreElement",progress:"HTMLProgressElement",q:"HTMLQuoteElement",script:"HTMLScriptElement",select:"HTMLSelectElement",source:"HTMLSourceElement",span:"HTMLSpanElement",style:"HTMLStyleElement",caption:"HTMLTableCaptionElement",col:"HTMLTableColElement",table:"HTMLTableElement",tr:"HTMLTableRowElement",thead:"HTMLTableSectionElement",tbody:"HTMLTableSectionElement",textarea:"HTMLTextAreaElement",title:"HTMLTitleElement",ul:"HTMLUListElement",video:"HTMLVideoElement"};Object.keys(n).forEach(t),Object.getOwnPropertyNames(e.wrappers).forEach(function(t){window[t]=e.wrappers[t]}),e.knownElements=n}(this.ShadowDOMPolyfill),function(){window.wrap=function(e){return e.impl?e:ShadowDOMPolyfill.wrap(e)},window.unwrap=function(e){return e.impl?ShadowDOMPolyfill.unwrap(e):e};var e=window.getComputedStyle;window.getComputedStyle=function(t,n){return e.call(window,wrap(t),n)},Object.defineProperties(HTMLElement.prototype,{webkitShadowRoot:{get:function(){return this.shadowRoot}}}),HTMLElement.prototype.webkitCreateShadowRoot=HTMLElement.prototype.createShadowRoot}()}else{var SideTable;"undefined"!=typeof WeakMap&&0>navigator.userAgent.indexOf("Firefox/")?SideTable=WeakMap:function(){var e=Object.defineProperty,t=Object.hasOwnProperty,n=(new Date).getTime()%1e9;SideTable=function(){this.name="__st"+(1e9*Math.random()>>>0)+(n++ +"__")},SideTable.prototype={set:function(t,n){e(t,this.name,{value:n,writable:!0})},get:function(e){return t.call(e,this.name)?e[this.name]:void 0},"delete":function(e){this.set(e,void 0)}}}(),function(){window.templateContent=window.templateContent||function(e){return e.content},window.wrap=window.unwrap=function(e){return e},window.createShadowRoot=function(e){return e.webkitCreateShadowRoot()},window.templateContent=function(e){if(window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(e),!e.content&&!e._content){for(var t=document.createDocumentFragment();e.firstChild;)t.appendChild(e.firstChild);e._content=t}return e.content||e._content}}()}if(function(e){Function.prototype.bind||(Function.prototype.bind=function(e){var t=this,n=Array.prototype.slice.call(arguments,1);return function(){var r=n.slice();return r.push.apply(r,arguments),t.apply(e,r)}}),e.mixin=window.mixin}(window.Platform),function(e){"use strict";function t(e,t,n){var r="string"==typeof e?document.createElement(e):e.cloneNode(!0);if(r.innerHTML=t,n)for(var i in n)r.setAttribute(i,n[i]);return r}var n=DOMTokenList.prototype.add,r=DOMTokenList.prototype.remove;if(DOMTokenList.prototype.add=function(){for(var e=0;arguments.length>e;e++)n.call(this,arguments[e])},DOMTokenList.prototype.remove=function(){for(var e=0;arguments.length>e;e++)r.call(this,arguments[e])},DOMTokenList.prototype.toggle=function(e,t){1==arguments.length&&(t=!this.contains(e)),t?this.add(e):this.remove(e)},DOMTokenList.prototype.switch=function(e,t){e&&this.remove(e),t&&this.add(t)},NodeList.prototype.forEach=function(e,t){Array.prototype.slice.call(this).forEach(e,t)},HTMLCollection.prototype.forEach=function(e,t){Array.prototype.slice.call(this).forEach(e,t)},!window.performance){var i=Date.now();window.performance={now:function(){return Date.now()-i}}}window.requestAnimationFrame||(window.requestAnimationFrame=function(){var e=window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;return e?function(t){return e(function(){t(performance.now())})}:function(e){return window.setTimeout(e,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||function(e){clearTimeout(e)}}()),e.createDOM=t}(window.Platform),window.templateContent=window.templateContent||function(e){return e.content},function(e){e=e||(window.Inspector={});var t;window.sinspect=function(e,r){t||(t=window.open("","ShadowDOM Inspector",null,!0),t.document.write(n),t.api={shadowize:shadowize}),o(e||wrap(document.body),r)};var n=["<!DOCTYPE html>","<html>","  <head>","    <title>ShadowDOM Inspector</title>","    <style>","      body {","      }","      pre {",'        font: 9pt "Courier New", monospace;',"        line-height: 1.5em;","      }","      tag {","        color: purple;","      }","      ul {","         margin: 0;","         padding: 0;","         list-style: none;","      }","      li {","         display: inline-block;","         background-color: #f1f1f1;","         padding: 4px 6px;","         border-radius: 4px;","         margin-right: 4px;","      }","    </style>","  </head>","  <body>",'    <ul id="crumbs">',"    </ul>",'    <div id="tree"></div>',"  </body>","</html>"].join("\n"),r=[],i=function(){var e=t.document,n=e.querySelector("#crumbs");n.textContent="";for(var i,a=0;i=r[a];a++){var s=e.createElement("a");s.href="#",s.textContent=i.localName,s.idx=a,s.onclick=function(e){for(var t;r.length>this.idx;)t=r.pop();o(t.shadow||t,t),e.preventDefault()},n.appendChild(e.createElement("li")).appendChild(s)}},o=function(e,n){var o=t.document;c=[];var a=n||e;r.push(a),i(),o.body.querySelector("#tree").innerHTML="<pre>"+u(e,e.childNodes)+"</pre>"},a=Array.prototype.forEach.call.bind(Array.prototype.forEach),s={STYLE:1,SCRIPT:1,"#comment":1,TEMPLATE:1},l=function(e){return s[e.nodeName]},u=function(e,t,n){if(l(e))return"";var r=n||"";if(e.localName||11==e.nodeType){var i=e.localName||"shadow-root",o=r+d(e);"content"==i&&(t=e.getDistributedNodes()),o+="<br/>";var s=r+"&nbsp;&nbsp;";a(t,function(e){o+=u(e,e.childNodes,s)}),o+=r,{br:1}[i]||(o+="<tag>&lt;/"+i+"&gt;</tag>",o+="<br/>")}else{var c=e.textContent.trim();o=c?r+'"'+c+'"'+"<br/>":""}return o},c=[],d=function(e){var t="<tag>&lt;",n=e.localName||"shadow-root";return e.webkitShadowRoot||e.shadowRoot?(t+=' <button idx="'+c.length+'" onclick="api.shadowize.call(this)">'+n+"</button>",c.push(e)):t+=n||"shadow-root",e.attributes&&a(e.attributes,function(e){t+=" "+e.name+(e.value?'="'+e.value+'"':"")}),t+="&gt;</tag>"};shadowize=function(){var e=Number(this.attributes.idx.value),t=c[e];t?o(t.webkitShadowRoot||t.shadowRoot,t):(console.log("bad shadowize node"),console.dir(this))},e.output=u}(window.Inspector),function(e){"use strict";function t(e){return+e===e>>>0}function n(e){return+e}function r(e){return e===Object(e)}function i(e,t){return e===t?0!==e||1/e===1/t:R(e)&&R(t)?!0:e!==e&&t!==t}function o(e){return"string"!=typeof e?!1:(e=e.replace(/\s/g,""),""==e?!0:"."==e[0]?!1:U.test(e))}function a(e){return""==e.trim()?this:t(e)?(this.push(e+""),this):(e.split(/\./).filter(function(e){return e}).forEach(function(e){this.push(e)},this),void 0)}function s(e){for(var t=0;B>t&&e.check();)e.report(),t++}function l(e){for(var t in e)return!1;return!0}function u(e){return l(e.added)&&l(e.removed)&&l(e.changed)}function c(e,t){var n={},r={},i={};for(var o in t){var a=e[o];(void 0===a||a!==t[o])&&(o in e?a!==t[o]&&(i[o]=a):r[o]=void 0)}for(var o in e)o in t||(n[o]=e[o]);return Array.isArray(e)&&e.length!==t.length&&(i.length=e.length),{added:n,removed:r,changed:i}}function d(e,t){var n=t||(Array.isArray(e)?[]:{});for(var r in e)n[r]=e[r];return Array.isArray(e)&&(n.length=e.length),n}function h(e){this.callback=e,this.reporting=!0,A&&(this.boundInternalCallback=this.internalCallback.bind(this)),this.valid=!0,p(this),this.connect(),this.sync(!0)}function p(e){Y&&q.push(e)}function f(e){if(Y)for(var t=0;q.length>t;t++)if(q[t]===e){q[t]=void 0;break}}function v(e,t){this.object=e,h.call(this,t)}function m(e,t){if(!Array.isArray(e))throw Error("Provided object is not an Array");this.object=e,h.call(this,t)}function g(e,t){var n;return t.walkPropertiesFrom(e,function(e,r,i){i===t.length&&(n=r)}),n}function b(e,t,n){var i=!1;return t.walkPropertiesFrom(e,function(e,o,a){r(o)&&a==t.length-1&&(i=!0,o[e]=n)}),i}function y(e){var t="",n="obj",r=e.length;t+="if (obj";for(var i=0;r-1>i;i++){var o='["'+e[i]+'"]';n+=o,t+=" && "+n}return t+=") ",n+='["'+e[r-1]+'"]',t+="return "+n+"; else return undefined;",Function("obj",t)}function w(e,t){var n=""+t;return V[n]||(V[n]=y(t)),V[n](e)}function E(t,n,i,o,a){var s=void 0;return n.walkPropertiesFrom(t,function(t,l,u){if(u===n.length)return s=l,void 0;var c=i[u];if(!c||l!==c[0]){if(c)for(var d=0;c.length>d;d++){var h=c[d],p=o.get(h);1==p?(o.delete(h),e.unobserveCount++,Object.unobserve(h,a)):o.set(h,p-1)}if(c=l,r(c)){for(var c=[];r(l);){c.push(l);var p=o.get(l);p?o.set(l,p+1):(o.set(l,1),e.observeCount++,Object.observe(l,a)),l=Object.getPrototypeOf(l)}i[u]=c}}},this),s}function T(e,t,n){if(this.value=void 0,o(t)){var i=new a(t);return i.length?(r(e)&&(this.object=e,this.path=i,A?(this.observed=Array(i.length),this.observedMap=new Map,this.getPathValue=E):this.getPathValue=x?y(this.path):g,h.call(this,n)),void 0):(this.value=e,void 0)}}function M(e,t){if("function"==typeof Object.observe){var n=Object.getNotifier(e);return function(r,i){var o={object:e,type:r,name:t};2===arguments.length&&(o.oldValue=i),n.notify(o)}}}function S(e,t,n){for(var r={},i={},o=0;t.length>o;o++){var a=t[o];G[a.type]?(a.name in n||(n[a.name]=a.oldValue),"updated"!=a.type&&("new"!=a.type?a.name in r?(delete r[a.name],delete n[a.name]):i[a.name]=!0:a.name in i?delete i[a.name]:r[a.name]=!0)):(console.error("Unknown changeRecord type: "+a.type),console.error(a))}for(var s in r)r[s]=e[s];for(var s in i)i[s]=void 0;var l={};for(var s in n)if(!(s in r||s in i)){var u=e[s];n[s]!==u&&(l[s]=u)}return{added:r,removed:i,changed:l}}function P(e,t,n,r,i,o){for(var a=o-i+1,s=n-t+1,l=Array(a),u=0;a>u;u++)l[u]=Array(s),l[u][0]=u;for(var c=0;s>c;c++)l[0][c]=c;for(var u=1;a>u;u++)for(var c=1;s>c;c++)if(r[i+u-1]===e[t+c-1])l[u][c]=l[u-1][c-1];else{var d=l[u-1][c]+1,h=l[u][c-1]+1;l[u][c]=h>d?d:h}return l}function O(e){for(var t=e.length-1,n=e[0].length-1,r=e[t][n],i=[];t>0||n>0;)if(0!=t)if(0!=n){var o,a=e[t-1][n-1],s=e[t-1][n],l=e[t][n-1];o=l>s?a>s?s:a:a>l?l:a,o==a?(a==r?i.push(X):(i.push(z),r=a),t--,n--):o==s?(i.push(Q),t--,r=s):(i.push(K),n--,r=l)}else i.push(Q),t--;else i.push(K),n--;return i.reverse(),i}function C(e,t,n){for(var r=0;n>r;r++)if(e[r]!==t[r])return r;return n}function L(e,t,n){for(var r=e.length,i=t.length,o=0;n>o&&e[--r]===t[--i];)o++;return o}function _(e,t,n,r,i,o){function a(e,t,n){return{index:e,removed:t,addedCount:n}}var s=0,l=0,u=Math.min(n-t,o-i);if(0==t&&0==i&&(s=C(e,r,u)),n==e.length&&o==r.length&&(l=L(e,r,u-s)),t+=s,i+=s,n-=l,o-=l,0==n-t&&0==o-i)return[];if(t==n){for(var c=a(t,[],0);o>i;)c.removed.push(r[i++]);return[c]}if(i==o)return[a(t,[],n-t)];for(var d=O(P(e,t,n,r,i,o)),c=void 0,h=[],p=t,f=i,v=0;d.length>v;v++)switch(d[v]){case X:c&&(h.push(c),c=void 0),p++,f++;break;case z:c||(c=a(p,[],0)),c.addedCount++,p++,c.removed.push(r[f]),f++;break;case K:c||(c=a(p,[],0)),c.addedCount++,p++;break;case Q:c||(c=a(p,[],0)),c.removed.push(r[f]),f++}return c&&h.push(c),h}function N(e,t,r){function i(t,r){Object.keys(t).forEach(function(t){var i=n(t);if(!(I(i)||0>i||i>=a)){var l=r[i];e.length>i?s[i]=l:o.removed[i-e.length]=r[i]}})}var o,a="length"in r?n(r.length):e.length;e.length>a?o={index:a,removed:[],addedCount:e.length-a}:a>e.length&&(o={index:e.length,removed:Array(a-e.length),addedCount:0});var s=[];i(t.added,r),i(t.removed,r),i(t.changed,r);var l,u=[];for(var c in s){if(c=n(c),l){if(l.index+l.removed.length==c){l.removed.push(s[c]);continue}l.addedCount=Math.min(e.length,l.index+l.removed.length)-l.index,u.push(l),l=void 0}l={index:c,removed:[s[c]]}}return l?(l.addedCount=Math.min(e.length,l.index+l.removed.length)-l.index,o?l.index+l.removed.length==o.index?(l.addedCount=l.addedCount+o.addedCount,l.removed=l.removed.concat(o.removed),u.push(l)):(u.push(l),u.push(o)):u.push(l)):o&&u.push(o),u}function D(e,t,n){var r=[];return N(e,t,n).forEach(function(t){r=r.concat(_(e,t.index,t.index+t.addedCount,t.removed,0,t.removed.length))}),r}var A="function"==typeof Object.observe,x=!1;try{var H=Function("","return true;");x=H()}catch(k){}var R=e.Number.isNaN||function I(t){return"number"==typeof t&&e.isNaN(t)},j="__proto__"in{}?function(e){return e}:function(e){var t=e.__proto__;if(!t)return e;var n=Object.create(t);return Object.getOwnPropertyNames(e).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}),n},F="[$a-z0-9_]+[$a-z0-9_\\d]*",U=RegExp("^(?:#?"+F+")?"+"(?:"+"(?:\\."+F+")"+")*"+"$","i");a.prototype=j({__proto__:[],toString:function(){return this.join(".")},walkPropertiesFrom:function(e,t,n){for(var r,i=0;this.length+1>i;i++)r=this[i],t.call(n,r,e,i),e=i==this.length||null===e||void 0===e?void 0:e[r]}});var B=1e3;h.prototype={valid:!1,internalCallback:function(e){this.valid&&this.reporting&&this.check(e)&&(this.report(),this.testingResults&&(this.testingResults.anyChanged=!0))},close:function(){this.valid&&(this.disconnect(),this.valid=!1,f(this))},deliver:function(e){this.valid&&(A?(this.testingResults=e,Object.deliverChangeRecords(this.boundInternalCallback),this.testingResults=void 0):s(this))},report:function(){if(this.reporting){this.sync(!1);try{this.callback.apply(void 0,this.reportArgs)}catch(e){h._errorThrownDuringCallback=!0,console.error("Exception caught during observer callback: "+e)}this.reportArgs=void 0}},reset:function(){this.valid&&(A&&(this.reporting=!1,Object.deliverChangeRecords(this.boundInternalCallback),this.reporting=!0),this.sync(!0))}};var q,Y=!A||e.forceCollectObservers;Y&&(q=[]);var W=!1;e.Platform=e.Platform||{},e.Platform.performMicrotaskCheckpoint=function(){if(Y&&!W){W=!0;var e=0,t={};do{e++;var n=q;q=[],t.anyChanged=!1;for(var r=0;n.length>r;r++){var i=n[r];i&&i.valid&&(A?i.deliver(t):i.check()&&(t.anyChanged=!0,i.report()),q.push(i))}}while(B>e&&t.anyChanged);W=!1}},Y&&(e.Platform.clearObservers=function(){q=[]}),v.prototype=j({__proto__:h.prototype,connect:function(){A&&Object.observe(this.object,this.boundInternalCallback)},sync:function(){A||(this.oldObject=d(this.object))},check:function(e){var t,n;if(A){if(!e)return!1;n={},t=S(this.object,e,n)}else n=this.oldObject,t=c(this.object,this.oldObject);return u(t)?!1:(this.reportArgs=[t.added||{},t.removed||{},t.changed||{}],this.reportArgs.push(function(e){return n[e]}),!0)},disconnect:function(){A?this.object&&Object.unobserve(this.object,this.boundInternalCallback):this.oldObject=void 0,this.object=void 0}}),m.prototype=j({__proto__:v.prototype,sync:function(){A||(this.oldObject=this.object.slice())},check:function(e){var t;if(A){if(!e)return!1;var n={},r=S(this.object,e,n);t=D(this.object,r,n)}else t=_(this.object,0,this.object.length,this.oldObject,0,this.oldObject.length);return t&&t.length?(this.reportArgs=[t],!0):!1}}),m.applySplices=function(e,t,n){n.forEach(function(n){for(var r=[n.index,n.removed.length],i=n.index;n.index+n.addedCount>i;)r.push(t[i]),i++;Array.prototype.splice.apply(e,r)})};var V={};T.prototype=j({__proto__:h.prototype,connect:function(){},disconnect:function(){this.object=void 0,this.value=void 0,this.sync(!0)},check:function(){return this.value=this.getPathValue(this.object,this.path,this.observed,this.observedMap,this.boundInternalCallback),i(this.value,this.oldValue)?!1:(this.reportArgs=[this.value,this.oldValue],!0)},sync:function(e){e&&(this.value=this.getPathValue(this.object,this.path,this.observed,this.observedMap,this.boundInternalCallback)),this.oldValue=this.value}}),T.getValueAtPath=function(e,t){if(!o(t))return void 0;var n=new a(t);return n.length?r(e)?x?w(e,n):g(e,n):void 0:e},T.setValueAtPath=function(e,t,n){if(o(t)){var i=new a(t);i.length&&r(e)&&b(e,i,n)}};var G={"new":!0,updated:!0,deleted:!0};T.defineProperty=function(e,t,n){var r=M(e,t),i=new T(n.object,n.path,function(e,t){r&&r("updated",t)});return Object.defineProperty(e,t,{get:function(){return i.deliver(),i.value},set:function(e){T.setValueAtPath(n.object,n.path,e),i.deliver()},configurable:!0}),{close:function(){r&&i.deliver(),i.close(),delete e[t]}}};var X=0,z=1,K=2,Q=3;e.Observer=h,e.ArrayObserver=m,e.ObjectObserver=v,e.PathObserver=T}(this),function(e){"use strict";function t(e){if(!e)throw Error("Assertion failed")}function n(e){return e.ownerDocument.contains(e)}function r(e,t,n){console.error("Unhandled binding to Node: ",this,e,t,n)}function i(){}function o(){}function a(e,t,n){this.model=e,this.path=t,this.changed=n,this.observer=new PathObserver(this.model,this.path,this.changed),this.changed(this.observer.value)}function s(e){return function(t){e.data=void 0==t?"":t+""}}function l(e,t,n){if("textContent"!==e)return Node.prototype.bind.call(this,e,t,n);this.unbind("textContent");var r=new a(t,n,s(this));J.set(this,r)}function u(e){if("textContent"!=e)return Node.prototype.unbind.call(this,e);var t=J.get(this);t&&(t.dispose(),J.delete(this))}function c(){this.unbind("textContent"),Node.prototype.unbindAll.call(this)}function d(e,t,n){return n?function(n){n?e.setAttribute(t,""):e.removeAttribute(t)}:function(n){e.setAttribute(t,(void 0===n?"":n)+"")}}function h(){this.bindingMap=Object.create(null)}function p(e,t,n){var r=Z.get(this);r||(r=new h,Z.set(this,r)),r.add(this,e,t,n)}function f(e){var t=Z.get(this);t&&t.remove(e)}function v(){var e=Z.get(this);e&&(Z.delete(this),e.removeAll(),Node.prototype.unbindAll.call(this))}function m(e){switch(e.type){case"checkbox":return et;case"radio":case"select-multiple":case"select-one":return"change";default:return"input"}}function g(e,t,n,r){this.element=e,this.valueProperty=t,this.boundValueChanged=this.valueChanged.bind(this),this.boundUpdateBinding=this.updateBinding.bind(this),this.binding=new a(n,r,this.boundValueChanged),this.element.addEventListener(m(this.element),this.boundUpdateBinding,!0)}function b(e,t,n){g.call(this,e,"value",t,n)}function y(e){if(!n(e))return[];if(e.form)return K(e.form.elements,function(t){return t!=e&&"INPUT"==t.tagName&&"radio"==t.type&&t.name==e.name});var t=e.ownerDocument.querySelectorAll('input[type="radio"][name="'+e.name+'"]');return K(t,function(t){return t!=e&&!t.form})}function w(e,t,n){g.call(this,e,"checked",t,n)}function E(e,t,n){switch(e){case"value":this.unbind("value"),this.removeAttribute("value"),tt.set(this,new b(this,t,n));break;case"checked":this.unbind("checked"),this.removeAttribute("checked"),nt.set(this,new w(this,t,n));break;default:return Element.prototype.bind.call(this,e,t,n)}}function T(e){switch(e){case"value":var t=tt.get(this);t&&(t.unbind(),tt.delete(this));break;case"checked":var n=nt.get(this);n&&(n.unbind(),nt.delete(this));break;default:return Element.prototype.unbind.call(this,e)}}function M(){this.unbind("value"),this.unbind("checked"),Element.prototype.unbindAll.call(this)}function S(e){return ct[e.tagName]&&e.hasAttribute("template")}function P(e){return"TEMPLATE"==e.tagName||S(e)}function O(e){return dt&&"TEMPLATE"==e.tagName}function C(e,t){var n=e.querySelectorAll(ht);P(e)&&t(e),z(n,t)}function L(e){function t(e){HTMLTemplateElement.decorate(e)||L(e.content)}C(e,t)}function _(e,t){Object.getOwnPropertyNames(t).forEach(function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))})}function N(e){if(!e.defaultView)return e;var t=mt.get(e);if(!t){for(t=e.implementation.createHTMLDocument("");t.lastChild;)t.removeChild(t.lastChild);mt.set(e,t)}return t}function D(e){var t=e.ownerDocument.createElement("template");e.parentNode.insertBefore(t,e);for(var n=e.attributes,r=n.length;r-->0;){var i=n[r];ut[i.name]&&("template"!==i.name&&t.setAttribute(i.name,i.value),e.removeAttribute(i.name))}return t}function A(e,t,n){var r=e.content;if(n)return r.appendChild(t),void 0;for(var i;i=t.firstChild;)r.appendChild(i)}function x(e){"TEMPLATE"===e.tagName?dt||(ft?e.__proto__=HTMLTemplateElement.prototype:_(e,HTMLTemplateElement.prototype)):(_(e,HTMLTemplateElement.prototype),Object.defineProperty(e,"content",yt))}function H(e){var t=e.ref;return t?t.content:e.content}function k(e,t){this.type=e,this.value=t}function R(e){for(var t=[],n=e.length,r=0,i=0;n>i;){if(r=e.indexOf("{{",i),0>r){t.push(new k(Et,e.slice(i)));break}if(r>0&&r>i&&t.push(new k(Et,e.slice(i,r))),i=r+2,r=e.indexOf("}}",i),0>r){var o=e.slice(i-2),a=t[t.length-1];a&&a.type==Et?a.value+=o:t.push(new k(Et,o));break}var s=e.slice(i,r).trim();t.push(new k(Tt,s)),i=r+2}return t}function I(e,t,n,r,i){var o,a=i&&i[st];a&&"function"==typeof a&&(o=a(n,r,t,e),o&&(n=o,r="value")),e.bind(t,n,r)}function j(e,t,n,r,i){var o=R(n);if(o.length&&(1!=o.length||o[0].type!=Et)){if(1==o.length&&o[0].type==Tt)return I(e,t,r,o[0].value,i),void 0;for(var a=new V,s=0;o.length>s;s++){var l=o[s];l.type==Tt&&I(a,s,r,l.value,i)}a.combinator=function(e){for(var t="",n=0;o.length>n;n++){var r=o[n];if(r.type===Et)t+=r.value;else{var i=e[n];void 0!==i&&(t+=i)}}return t},e.bind(t,a,"value")}}function F(e,n,r){t(e);for(var i={},o=0;e.attributes.length>o;o++){var a=e.attributes[o];i[a.name]=a.value}P(e)&&(""===i[rt]&&(i[rt]="{{}}"),""===i[it]&&(i[it]="{{}}")),Object.keys(i).forEach(function(t){j(e,t,i[t],n,r)})}function U(e,n,r){t(e),e.nodeType===Node.ELEMENT_NODE?F(e,n,r):e.nodeType===Node.TEXT_NODE&&j(e,"textContent",e.data,n,r);for(var i=e.firstChild;i;i=i.nextSibling)U(i,n,r)}function B(e){if(Mt.delete(e),P(e)){var t=St.get(e);t&&(t.abandon(),St.delete(e))}e.unbindAll();for(var n=e.firstChild;n;n=n.nextSibling)B(n)}function q(e,t){var n=e.cloneNode(!1);P(n)&&(HTMLTemplateElement.decorate(n,e),t&&!n.hasAttribute(at)&&n.setAttribute(at,t));for(var r=e.firstChild;r;r=r.nextSibling)n.appendChild(q(r,t));return n}function Y(e,t,n){this.firstNode=e,this.lastNode=t,this.model=n}function W(e,t){if(e.firstChild)for(var n=new Y(e.firstChild,e.lastChild,t),r=n.firstNode;r;)Mt.set(r,n),r=r.nextSibling}function V(e){this.bindings={},this.values={},this.value=void 0,this.size=0,this.combinator_=e,this.boundResolve=this.resolve.bind(this),this.disposed=!1}function G(e){this.templateElement_=e,this.terminators=[],this.iteratedValue=void 0,this.arrayObserver=void 0,this.boundHandleSplices=this.handleSplices.bind(this),this.inputs=new V(this.resolveInputs.bind(this)),this.valueBinding=new a(this.inputs,"value",this.valueChanged.bind(this))}var X,z=Array.prototype.forEach.call.bind(Array.prototype.forEach),K=Array.prototype.filter.call.bind(Array.prototype.filter);e.Map&&"function"==typeof e.Map.prototype.forEach?X=e.Map:(X=function(){this.keys=[],this.values=[]},X.prototype={set:function(e,t){var n=this.keys.indexOf(e);0>n?(this.keys.push(e),this.values.push(t)):this.values[n]=t},get:function(e){var t=this.keys.indexOf(e);return 0>t?void 0:this.values[t]},"delete":function(e){var t=this.keys.indexOf(e);return 0>t?!1:(this.keys.splice(t,1),this.values.splice(t,1),!0)},forEach:function(e,t){for(var n=0;this.keys.length>n;n++)e.call(t||this,this.values[n],this.keys[n],this)}});var Q="__proto__"in{}?function(e){return e}:function(e){var t=e.__proto__;if(!t)return e;var n=Object.create(t);return Object.getOwnPropertyNames(e).forEach(function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}),n};"function"!=typeof document.contains&&(Document.prototype.contains=function(e){return e===this||e.parentNode===this?!0:this.documentElement.contains(e)});var $;"undefined"!=typeof WeakMap&&0>navigator.userAgent.indexOf("Firefox/")?$=WeakMap:function(){var e=Object.defineProperty,t=Object.hasOwnProperty,n=(new Date).getTime()%1e9;$=function(){this.name="__st"+(1e9*Math.random()>>>0)+(n++ +"__")},$.prototype={set:function(t,n){e(t,this.name,{value:n,writable:!0})},get:function(e){return t.call(e,this.name)?e[this.name]:void 0},"delete":function(e){this.set(e,void 0)}}}(),Node.prototype.bind=r,Node.prototype.unbind=i,Node.prototype.unbindAll=o;var J=new $("textContentBinding");a.prototype={dispose:function(){this.observer.close()},set value(e){PathObserver.setValueAtPath(this.model,this.path,e)},reset:function(){this.observer.reset()}},Text.prototype.bind=l,Text.prototype.unbind=u,Text.prototype.unbindAll=c;var Z=new $("attributeBindings");h.prototype={add:function(e,t,n,r){e.removeAttribute(t);var i="?"==t[t.length-1];i&&(t=t.slice(0,-1)),this.remove(t);var o=new a(n,r,d(e,t,i));this.bindingMap[t]=o},remove:function(e){var t=this.bindingMap[e];t&&(t.dispose(),delete this.bindingMap[e])},removeAll:function(){Object.keys(this.bindingMap).forEach(function(e){this.remove(e)},this)}},Element.prototype.bind=p,Element.prototype.unbind=f,Element.prototype.unbindAll=v;var et,tt=new $("valueBinding"),nt=new $("checkedBinding");(function(){var e=document.createElement("div"),t=e.appendChild(document.createElement("input"));t.setAttribute("type","checkbox");var n,r=0;t.addEventListener("click",function(){r++,n=n||"click"}),t.addEventListener("change",function(){r++,n=n||"change"});var i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.dispatchEvent(i),et=1==r?"change":n})(),g.prototype={valueChanged:function(e){this.element[this.valueProperty]=this.produceElementValue(e)},updateBinding:function(){this.binding.value=this.element[this.valueProperty],this.binding.reset(),this.postUpdateBinding&&this.postUpdateBinding(),Platform.performMicrotaskCheckpoint()},unbind:function(){this.binding.dispose(),this.element.removeEventListener(m(this.element),this.boundUpdateBinding,!0)}},b.prototype=Q({__proto__:g.prototype,produceElementValue:function(e){return(null==e?"":e)+""}}),w.prototype=Q({__proto__:g.prototype,produceElementValue:function(e){return Boolean(e)},postUpdateBinding:function(){"INPUT"===this.element.tagName&&"radio"===this.element.type&&y(this.element).forEach(function(e){var t=nt.get(e);t&&(t.binding.value=!1)})}}),HTMLInputElement.prototype.bind=E,HTMLInputElement.prototype.unbind=T,HTMLInputElement.prototype.unbindAll=M;var rt="bind",it="repeat",ot="if",at="syntax",st="getBinding",lt="getInstanceModel",ut={template:!0,repeat:!0,bind:!0,ref:!0},ct={THEAD:!0,TBODY:!0,TFOOT:!0,TH:!0,TR:!0,TD:!0,COLGROUP:!0,COL:!0,CAPTION:!0,OPTION:!0},dt="undefined"!=typeof HTMLTemplateElement,ht="template, "+Object.keys(ct).map(function(e){return e.toLowerCase()+"[template]"}).join(", "),pt=function(){function e(e){r.indexOf(e)>=0||n.indexOf(e)>=0||(n.push(e),o==i.value&&(i.value=!i.value))}function t(){for(o=i.value,r=n,n=[];r.length;){var e=r.shift();e()}}var n=[],r=[],i={value:0},o=i.value;return new PathObserver(i,"value",t),e}();document.addEventListener("DOMContentLoaded",function(){L(document),Platform.performMicrotaskCheckpoint()},!1),dt||(e.HTMLTemplateElement=function(){throw TypeError("Illegal constructor")});var ft="__proto__"in{},vt=new $("templateContents"),mt=new $("templateContentsOwner"),gt=new $("templateInstanceRef");HTMLTemplateElement.decorate=function(e,n){if(e.templateIsDecorated_)return!1;var r=e,i=O(r),o=i,a=!i,s=!1;if(!i&&S(r)&&(t(!n),r=D(e),i=O(r),s=!0),r.templateIsDecorated_=!0,!i){x(r);var l=N(r.ownerDocument);vt.set(r,l.createDocumentFragment())}return n?gt.set(r,n):a?A(r,e,s):o&&L(r.content),!0},HTMLTemplateElement.bootstrap=L;var bt=e.HTMLUnknownElement||HTMLElement,yt={get:function(){return vt.get(this)},enumerable:!0,configurable:!0};dt||(HTMLTemplateElement.prototype=Object.create(bt.prototype),Object.defineProperty(HTMLTemplateElement.prototype,"content",yt));var wt=new $("templateModel");_(HTMLTemplateElement.prototype,{bind:function(e,t,n){switch(e){case rt:case it:case ot:var r=St.get(this);r||(r=new G(this),St.set(this,r)),r.inputs.bind(e,t,n||"");break;default:return Element.prototype.bind.call(this,e,t,n)}},unbind:function(e,t,n){switch(e){case rt:case it:case ot:var r=St.get(this);if(!r)break;r.inputs.unbind(e);break;default:return Element.prototype.unbind.call(this,e,t,n)}},unbindAll:function(){this.unbind(rt),this.unbind(it),this.unbind(ot),Element.prototype.unbindAll.call(this)},createInstance:function(){var e=H(this),t=this.getAttribute(at),n=q(e,t);return"function"==typeof HTMLTemplateElement.__instanceCreated&&HTMLTemplateElement.__instanceCreated(n),n},get model(){return wt.get(this)},set model(e){var t=HTMLTemplateElement.syntax[this.getAttribute(at)];wt.set(this,e),U(this,e,t)},get ref(){var e,t=this.getAttribute("ref");return t&&(e=this.ownerDocument.getElementById(t)),e||(e=gt.get(this)),e||null}});var Et=0,Tt=1,Mt=new $("templateInstance");Object.defineProperty(Node.prototype,"templateInstance",{get:function(){var e=Mt.get(this);return e?e:this.parentNode?this.parentNode.templateInstance:void 0}}),V.prototype={set combinator(e){this.combinator_=e,this.scheduleResolve()},bind:function(e,t,n){this.unbind(e),this.size++,this.bindings[e]=new a(t,n,function(t){this.values[e]=t,this.scheduleResolve()}.bind(this))},unbind:function(e,t){this.bindings[e]&&(this.size--,this.bindings[e].dispose(),delete this.bindings[e],delete this.values[e],t||this.scheduleResolve())},scheduleResolve:function(){pt(this.boundResolve)},resolve:function(){if(!this.disposed){if(!this.combinator_)throw Error("CompoundBinding attempted to resolve without a combinator");this.value=this.combinator_(this.values)}},dispose:function(){Object.keys(this.bindings).forEach(function(e){this.unbind(e,!0)},this),this.disposed=!0,this.value=void 0}},G.prototype={resolveInputs:function(e){return ot in e&&!e[ot]?void 0:it in e?e[it]:rt in e?[e[rt]]:void 0},valueChanged:function(e,t){Array.isArray(e)||(e=[]),this.unobserve(),this.iteratedValue=e,this.arrayObserver=new ArrayObserver(this.iteratedValue,this.boundHandleSplices);var n={index:0,addedCount:this.iteratedValue.length,removed:Array.isArray(t)?t:[]};(n.addedCount||n.removed.length)&&this.handleSplices([n])},getTerminatorAt:function(e){if(-1==e)return this.templateElement_;var t=this.terminators[e];if(t.nodeType!==Node.ELEMENT_NODE)return t;var n=St.get(t);return n?n.getTerminatorAt(n.terminators.length-1):t},insertInstanceAt:function(e,t){var n=this.getTerminatorAt(e-1),r=t[t.length-1]||n;this.terminators.splice(e,0,r);for(var i=this.templateElement_.parentNode,o=n.nextSibling,a=0;t.length>a;a++)i.insertBefore(t[a],o)},extractInstanceAt:function(e){var t=[],n=this.getTerminatorAt(e-1),r=this.getTerminatorAt(e);this.terminators.splice(e,1);for(var i=this.templateElement_.parentNode;r!==n;){var o=r;r=o.previousSibling,i.removeChild(o),t.push(o)}return t},getInstanceModel:function(e,t,n){var r=n&&n[lt];return r&&"function"==typeof r?r(e,t):t},getInstanceNodes:function(e,t){var n=[],r=this.templateElement_.createInstance();for(U(r,e,t),W(r,e);r.firstChild;)n.push(r.removeChild(r.firstChild));return n},handleSplices:function(e){var t=this.templateElement_;if(!t.parentNode||!t.ownerDocument.defaultView)return this.abandon(),St.delete(this),void 0;
var n=t.getAttribute(at),r=HTMLTemplateElement.syntax[n],i=new X,o=0;e.forEach(function(e){e.removed.forEach(function(t){var n=this.extractInstanceAt(e.index+o,n);i.set(t,n)},this),o-=e.addedCount},this),e.forEach(function(e){for(var n=e.index;e.index+e.addedCount>n;n++){var o=this.getInstanceModel(t,this.iteratedValue[n],r),a=i.get(o)||this.getInstanceNodes(o,r);this.insertInstanceAt(n,a)}},this),i.forEach(function(e){for(var t=0;e.length>t;t++)B(e[t])})},unobserve:function(){this.arrayObserver&&(this.arrayObserver.close(),this.arrayObserver=void 0)},abandon:function(){this.unobserve(),this.valueBinding.dispose(),this.terminators.length=0,this.inputs.dispose()}};var St=new $("templateIterator");e.CompoundBinding=V,Object.defineProperty(HTMLTemplateElement,at,{value:{},enumerable:!0}),HTMLTemplateElement.forAllTemplatesFrom_=C,HTMLTemplateElement.bindAllMustachesFrom_=U,HTMLTemplateElement.parseAndBind_=j}(this),function(e){function t(){logFlags.data&&console.group("Model.dirtyCheck()"),n(),logFlags.data&&console.groupEnd()}function n(){Platform.performMicrotaskCheckpoint()}document.write("<style>template {display: none;} /* injected by platform.js */</style>"),HTMLTemplateElement.__instanceCreated=function(e){document.adoptNode(e),CustomElements.upgradeAll(e)};var r=125;window.addEventListener("WebComponentsReady",function(){t(),setInterval(n,r)}),e.flush=t,window.dirtyCheck=t}(window.Platform),function(e){function t(e){return r(e,a)}function n(e){return r(e,"stylesheet")}function r(e,t){return"link"===e.localName&&e.getAttribute("rel")===t}function i(e,t){var n=document.implementation.createHTMLDocument(a);n._URL=t;var r=n.createElement("base");return r.setAttribute("href",document.baseURI),n.head.appendChild(r),n.body.innerHTML=e,n}e||(e=window.HTMLImports={flags:{}});var o,a="import",s={documents:{},cache:{},preloadSelectors:["link[rel="+a+"]","script[src]","link[rel=stylesheet]"].join(","),load:function(e,t){o=new l(s.loaded,t),o.cache=s.cache,s.preload(e)},preload:function(e){var n=e.querySelectorAll(s.preloadSelectors);e===document&&(n=Array.prototype.filter.call(n,function(e){return t(e)})),o.addNodes(n)},loaded:function(e,r,o){if(t(r)){var a=s.documents[e];a||(a=i(o,e),u.resolvePathsInHTML(a),s.documents[e]=a,s.preload(a)),r.content=r.__resource=a}else r.__resource=o,n(r)&&u.resolvePathsInStylesheet(r)}},l=function(e,t){this.onload=e,this.oncomplete=t,this.inflight=0,this.pending={},this.cache={}};l.prototype={addNodes:function(e){this.inflight+=e.length,f(e,this.require,this),this.checkDone()},require:function(e){var t=u.nodeUrl(e);e.__nodeUrl=t,this.dedupe(t,e)||this.fetch(t,e)},dedupe:function(e,t){return this.pending[e]?(this.pending[e].push(t),!0):this.cache[e]?(this.onload(e,t,o.cache[e]),this.tail(),!0):(this.pending[e]=[t],!1)},fetch:function(e,t){p.load(e,function(n,r){this.receive(e,t,n,r)}.bind(this))},receive:function(e,t,n,r){n||(o.cache[e]=r),o.pending[e].forEach(function(t){n||this.onload(e,t,r),this.tail()},this),o.pending[e]=null},tail:function(){--this.inflight,this.checkDone()},checkDone:function(){this.inflight||this.oncomplete()}};var u={nodeUrl:function(e){return u.resolveUrl(u.getDocumentUrl(document),u.hrefOrSrc(e))},hrefOrSrc:function(e){return e.getAttribute("href")||e.getAttribute("src")},documentUrlFromNode:function(e){var t=u.getDocumentUrl(e.ownerDocument);return t=t.split("#")[0]},getDocumentUrl:function(e){return e&&(e._URL||e.impl&&e.impl._URL||e.baseURI||e.URL)||""},resolveUrl:function(e,t,n){if(this.isAbsUrl(t))return t;var r=this.compressUrl(this.urlToPath(e)+t);return n&&(r=u.makeRelPath(u.getDocumentUrl(document),r)),r},isAbsUrl:function(e){return/(^data:)|(^http[s]?:)|(^\/)/.test(e)},urlToPath:function(e){var t=e.split("/");return t.pop(),t.push(""),t.join("/")},compressUrl:function(e){for(var t,n=e.split("/"),r=0;n.length>r;r++)t=n[r],".."===t&&(n.splice(r-1,2),r-=2);return n.join("/")},makeRelPath:function(e,t){var n,r;for(n=this.compressUrl(e).split("/"),r=this.compressUrl(t).split("/");n.length&&n[0]===r[0];)n.shift(),r.shift();for(var i=0,o=n.length-1;o>i;i++)r.unshift("..");var a=r.join("/");return a},resolvePathsInHTML:function(e){var t=u.documentUrlFromNode(e.body);window.HTMLTemplateElement&&HTMLTemplateElement.bootstrap&&HTMLTemplateElement.bootstrap(e);var n=e.body;u._resolvePathsInHTML(n,t)},_resolvePathsInHTML:function(e,t){if(u.resolveAttributes(e,t),u.resolveStyleElts(e,t),window.templateContent){var n=e.querySelectorAll("template");n&&f(n,function(e){u._resolvePathsInHTML(templateContent(e),t)})}},resolvePathsInStylesheet:function(e){var t=u.nodeUrl(e);e.__resource=u.resolveCssText(e.__resource,t)},resolveStyleElts:function(e,t){var n=e.querySelectorAll("style");n&&f(n,function(e){e.textContent=u.resolveCssText(e.textContent,t)})},resolveCssText:function(e,t){return e.replace(/url\([^)]*\)/g,function(e){var n=e.replace(/["']/g,"").slice(4,-1);return n=u.resolveUrl(t,n,!0),"url("+n+")"})},resolveAttributes:function(e,t){var n=e&&e.querySelectorAll(d);n&&f(n,function(e){this.resolveNodeAttributes(e,t)},this)},resolveNodeAttributes:function(e,t){c.forEach(function(n){var r=e.attributes[n];if(r&&r.value&&0>r.value.search(h)){var i=u.resolveUrl(t,r.value,!0);r.value=i}})}},c=["href","src","action"],d="["+c.join("],[")+"]",h="{{.*}}",p={async:!0,ok:function(e){return e.status>=200&&300>e.status||304===e.status},load:function(t,n,r){var i=new XMLHttpRequest;(e.flags.debug||e.flags.bust)&&(t+="?"+Math.random()),i.open("GET",t,p.async),i.addEventListener("readystatechange",function(){4===i.readyState&&n.call(r,!p.ok(i)&&i,i.response,t)}),i.send()}},f=Array.prototype.forEach.call.bind(Array.prototype.forEach);e.importer=s,e.getDocumentUrl=u.getDocumentUrl,"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(e){var t=document.createEvent("HTMLEvents");return t.initEvent(e,!0,!0),t}),window.addEventListener("load",function(){s.load(document,function(){var e=window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrap(document):document;HTMLImports.readyTime=(new Date).getTime(),e.body.dispatchEvent(new CustomEvent("HTMLImportsLoaded",{bubbles:!0}))})})}(window.HTMLImports),function(e){function t(e){w.push(e),y||(y=!0,m(r))}function n(e){return window.ShadowDOMPolyfill&&window.ShadowDOMPolyfill.wrapIfNeeded(e)||e}function r(){y=!1;var e=w;w=[],e.sort(function(e,t){return e.uid_-t.uid_});var t=!1;e.forEach(function(e){var n=e.takeRecords();i(e),n.length&&(e.callback_(n,e),t=!0)}),t&&r()}function i(e){e.nodes_.forEach(function(t){var n=v.get(t);n&&n.forEach(function(t){t.observer===e&&t.removeTransientObservers()})})}function o(e,t){for(var n=e;n;n=n.parentNode){var r=v.get(n);if(r)for(var i=0;r.length>i;i++){var o=r[i],a=o.options;if(n===e||a.subtree){var s=t(a);s&&o.enqueue(s)}}}}function a(e){this.callback_=e,this.nodes_=[],this.records_=[],this.uid_=++E}function s(e,t){this.type=e,this.target=t,this.addedNodes=[],this.removedNodes=[],this.previousSibling=null,this.nextSibling=null,this.attributeName=null,this.attributeNamespace=null,this.oldValue=null}function l(e){var t=new s(e.type,e.target);return t.addedNodes=e.addedNodes.slice(),t.removedNodes=e.removedNodes.slice(),t.previousSibling=e.previousSibling,t.nextSibling=e.nextSibling,t.attributeName=e.attributeName,t.attributeNamespace=e.attributeNamespace,t.oldValue=e.oldValue,t}function u(e,t){return T=new s(e,t)}function c(e){return M?M:(M=l(T),M.oldValue=e,M)}function d(){T=M=void 0}function h(e){return e===M||e===T}function p(e,t){return e===t?e:M&&h(e)?M:null}function f(e,t,n){this.observer=e,this.target=t,this.options=n,this.transientObservedNodes=[]}var v=new SideTable,m=window.msSetImmediate;if(!m){var g=[],b=Math.random()+"";window.addEventListener("message",function(e){if(e.data===b){var t=g;g=[],t.forEach(function(e){e()})}}),m=function(e){g.push(e),window.postMessage(b,"*")}}var y=!1,w=[],E=0;a.prototype={observe:function(e,t){if(e=n(e),!t.childList&&!t.attributes&&!t.characterData||t.attributeOldValue&&!t.attributes||t.attributeFilter&&t.attributeFilter.length&&!t.attributes||t.characterDataOldValue&&!t.characterData)throw new SyntaxError;var r=v.get(e);r||v.set(e,r=[]);for(var i,o=0;r.length>o;o++)if(r[o].observer===this){i=r[o],i.removeListeners(),i.options=t;break}i||(i=new f(this,e,t),r.push(i),this.nodes_.push(e)),i.addListeners()},disconnect:function(){this.nodes_.forEach(function(e){for(var t=v.get(e),n=0;t.length>n;n++){var r=t[n];if(r.observer===this){r.removeListeners(),t.splice(n,1);break}}},this),this.records_=[]},takeRecords:function(){var e=this.records_;return this.records_=[],e}};var T,M;f.prototype={enqueue:function(e){var n=this.observer.records_,r=n.length;if(n.length>0){var i=n[r-1],o=p(i,e);if(o)return n[r-1]=o,void 0}else t(this.observer);n[r]=e},addListeners:function(){this.addListeners_(this.target)},addListeners_:function(e){var t=this.options;t.attributes&&e.addEventListener("DOMAttrModified",this,!0),t.characterData&&e.addEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.addEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.addEventListener("DOMNodeRemoved",this,!0)},removeListeners:function(){this.removeListeners_(this.target)},removeListeners_:function(e){var t=this.options;t.attributes&&e.removeEventListener("DOMAttrModified",this,!0),t.characterData&&e.removeEventListener("DOMCharacterDataModified",this,!0),t.childList&&e.removeEventListener("DOMNodeInserted",this,!0),(t.childList||t.subtree)&&e.removeEventListener("DOMNodeRemoved",this,!0)},addTransientObserver:function(e){if(e!==this.target){this.addListeners_(e),this.transientObservedNodes.push(e);var t=v.get(e);t||v.set(e,t=[]),t.push(this)}},removeTransientObservers:function(){var e=this.transientObservedNodes;this.transientObservedNodes=[],e.forEach(function(e){this.removeListeners_(e);for(var t=v.get(e),n=0;t.length>n;n++)if(t[n]===this){t.splice(n,1);break}},this)},handleEvent:function(e){switch(e.stopImmediatePropagation(),e.type){case"DOMAttrModified":var t=e.attrName,n=e.relatedNode.namespaceURI,r=e.target,i=new u("attributes",r);i.attributeName=t,i.attributeNamespace=n;var a=e.attrChange===MutationEvent.ADDITION?null:e.prevValue;o(r,function(e){return!e.attributes||e.attributeFilter&&e.attributeFilter.length&&-1===e.attributeFilter.indexOf(t)&&-1===e.attributeFilter.indexOf(n)?void 0:e.attributeOldValue?c(a):i});break;case"DOMCharacterDataModified":var r=e.target,i=u("characterData",r),a=e.prevValue;o(r,function(e){return e.characterData?e.characterDataOldValue?c(a):i:void 0});break;case"DOMNodeRemoved":this.addTransientObserver(e.target);case"DOMNodeInserted":var s,l,r=e.relatedNode,h=e.target;"DOMNodeInserted"===e.type?(s=[h],l=[]):(s=[],l=[h]);var p=h.previousSibling,f=h.nextSibling,i=u("childList",r);i.addedNodes=s,i.removedNodes=l,i.previousSibling=p,i.nextSibling=f,o(r,function(e){return e.childList?i:void 0})}d()}},e.JsMutationObserver=a}(this),!window.MutationObserver&&(window.MutationObserver=window.WebKitMutationObserver||window.JsMutationObserver,!MutationObserver))throw Error("no mutation observer support");(function(e){function t(t,o){var a=o||{};if(!t)throw Error("Name argument must not be empty");if(a.name=t,!a.prototype)throw Error("Options missing required prototype property");return a.lifecycle=a.lifecycle||{},a.ancestry=n(a.extends),r(a),i(a),a.prototype.setAttribute=c,a.prototype.removeAttribute=d,p(t,a),a.ctor=f(a),a.ctor.prototype=a.prototype,e.ready&&e.upgradeAll(document),a.ctor}function n(e){var t=w[e];return t?n(t.extends).concat([t]):[]}function r(e){for(var t,n=e.extends,r=0;t=e.ancestry[r];r++)n=t.is&&t.tag;e.tag=n||e.name,n&&(e.is=e.name)}function i(e){if(!Object.__proto__)if(e.is)var t=document.createElement(e.tag),n=Object.getPrototypeOf(t);else n=HTMLElement.prototype;e.native=n}function o(e){return a(E(e.tag),e)}function a(t,n){return n.is&&t.setAttribute("is",n.is),s(t,n),t.__upgraded__=!0,e.upgradeSubtree(t),u(t),t}function s(e,t){Object.__proto__?e.__proto__=t.prototype:(l(e,t.prototype,t.native),e.__proto__=t.prototype)}function l(e,t,n){for(var r={},i=t;i!==n&&i!==HTMLUnknownElement.prototype;){for(var o,a=Object.getOwnPropertyNames(i),s=0;o=a[s];s++)r[o]||(Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(i,o)),r[o]=1);i=Object.getPrototypeOf(i)}}function u(e){e.readyCallback&&e.readyCallback()}function c(e,t){h.call(this,e,t,b)}function d(e,t){h.call(this,e,t,y)}function h(e,t,n){var r=this.getAttribute(e);n.apply(this,arguments),this.attributeChangedCallback&&this.getAttribute(e)!==r&&this.attributeChangedCallback(e,r)}function p(e,t){w[e]=t}function f(e){return function(){return o(e)}}function v(e){var t=w[e];return t?new t.ctor:E(e)}function m(e){if(!e.__upgraded__&&e.nodeType===Node.ELEMENT_NODE){var t=e.getAttribute("is")||e.localName,n=w[t];return n&&a(e,n)}}if(e||(e=window.CustomElements={flags:{}}),e.hasNative=(document.webkitRegister||document.register)&&"native"===e.flags.register,e.hasNative){document.register=document.register||document.webkitRegister;var g=function(){};e.registry={},e.upgradeElement=g}else{var b=HTMLElement.prototype.setAttribute,y=HTMLElement.prototype.removeAttribute,w={},E=document.createElement.bind(document);document.register=t,document.createElement=v,e.registry=w,e.upgrade=m}})(window.CustomElements),function(e){function t(e,n,r){var i=e.firstElementChild;if(!i)for(i=e.firstChild;i&&i.nodeType!==Node.ELEMENT_NODE;)i=i.nextSibling;for(;i;)n(i,r)!==!0&&t(i,n,r),i=i.nextElementSibling;return null}function n(e,r){t(e,function(e){return r(e)?!0:(e.webkitShadowRoot&&n(e.webkitShadowRoot,r),void 0)}),e.webkitShadowRoot&&n(e.webkitShadowRoot,r)}function r(e){return a(e)?(s(e),!0):(l(e),void 0)}function i(e){n(e,function(e){return r(e)?!0:void 0})}function o(e){return r(e)||i(e)}function a(t){if(!t.__upgraded__&&t.nodeType===Node.ELEMENT_NODE){var n=t.getAttribute("is")||t.localName,r=e.registry[n];if(r)return logFlags.dom&&console.group("upgrade:",t.localName),e.upgrade(t),logFlags.dom&&console.groupEnd(),!0}}function s(e){l(e),d(e)&&n(e,function(e){l(e)})}function l(e){(e.insertedCallback||e.__upgraded__&&logFlags.dom)&&(logFlags.dom&&console.group("inserted:",e.localName),d(e)&&(e.__inserted=(e.__inserted||0)+1,1>e.__inserted&&(e.__inserted=1),e.__inserted>1?logFlags.dom&&console.warn("inserted:",e.localName,"insert/remove count:",e.__inserted):e.insertedCallback&&(logFlags.dom&&console.log("inserted:",e.localName),e.insertedCallback())),logFlags.dom&&console.groupEnd())}function u(e){c(e),n(e,function(e){c(e)})}function c(e){(e.removedCallback||e.__upgraded__&&logFlags.dom)&&(logFlags.dom&&console.log("removed:",e.localName),d(e)||(e.__inserted=(e.__inserted||0)-1,e.__inserted>0&&(e.__inserted=0),0>e.__inserted?logFlags.dom&&console.warn("removed:",e.localName,"insert/remove count:",e.__inserted):e.removedCallback&&e.removedCallback()))}function d(e){for(var t=e;t;){if(t==e.ownerDocument)return!0;t=t.parentNode||t.host}}function h(e){e.webkitShadowRoot&&!e.webkitShadowRoot.__watched&&(logFlags.dom&&console.log("watching shadow-root for: ",e.localName),g(e.webkitShadowRoot),e.webkitShadowRoot.__watched=!0)}function p(e){h(e),n(e,function(){h(e)})}function f(e){switch(e.localName){case"style":case"script":case"template":case void 0:return!0}}function v(e){if(logFlags.dom){var t=e[0];if(t&&"childList"===t.type&&t.addedNodes&&t.addedNodes){for(var n=t.addedNodes[0];n&&n!==document&&!n.host;)n=n.parentNode;var r=n&&(n.URL||n._URL||n.host&&n.host.localName)||"";r=r.split("/?").shift().split("/").pop()}console.group("mutations (%d) [%s]",e.length,r||"")}e.forEach(function(e){"childList"===e.type&&(E(e.addedNodes,function(e){f(e)||o(e)}),E(e.removedNodes,function(e){f(e)||u(e)}))}),logFlags.dom&&console.groupEnd()}function m(){v(w.takeRecords())}function g(e){w.observe(e,{childList:!0,subtree:!0})}function b(e){g(e)}function y(e){logFlags.dom&&console.group("upgradeDocument: ",(e.URL||e._URL||"").split("/").pop()),o(e),logFlags.dom&&console.groupEnd()}var w=new MutationObserver(v),E=Array.prototype.forEach.call.bind(Array.prototype.forEach);e.watchShadow=h,e.watchAllShadows=p,e.upgradeAll=o,e.upgradeSubtree=i,e.observeDocument=b,e.upgradeDocument=y,e.takeRecords=m}(window.CustomElements),function(){function parseElementElement(e){var t={name:"","extends":null};takeAttributes(e,t);var n=HTMLElement.prototype;if(t.extends){var r=document.createElement(t.extends);n=r.__proto__||Object.getPrototypeOf(r)}t.prototype=Object.create(n),e.options=t;var i=e.querySelector("script,scripts");i&&executeComponentScript(i.textContent,e,t.name);var o=document.register(t.name,t);e.ctor=o;var a=e.getAttribute("constructor");a&&(window[a]=o)}function takeAttributes(e,t){for(var n in t){var r=e.attributes[n];r&&(t[n]=r.value)}}function executeComponentScript(inScript,inContext,inName){context=inContext;var owner=context.ownerDocument,url=owner._URL||owner.URL||owner.impl&&(owner.impl._URL||owner.impl.URL),match=url.match(/.*\/([^.]*)[.]?.*$/);if(match){var name=match[1];url+=name!=inName?":"+inName:""}var code="__componentScript('"+inName+"', function(){"+inScript+"});"+"\n//@ sourceURL="+url+"\n";eval(code)}function mixin(e){for(var t=e||{},n=1;arguments.length>n;n++){var r=arguments[n];try{for(var i in r)copyProperty(i,r,t)}catch(o){}}return t}function copyProperty(e,t,n){var r=getPropertyDescriptor(t,e);Object.defineProperty(n,e,r)}function getPropertyDescriptor(e,t){if(e){var n=Object.getOwnPropertyDescriptor(e,t);return n||getPropertyDescriptor(Object.getPrototypeOf(e),t)}}var HTMLElementElement=function(e){return e.register=HTMLElementElement.prototype.register,parseElementElement(e),e};HTMLElementElement.prototype={register:function(e){e&&(this.options.lifecycle=e.lifecycle,e.prototype&&mixin(this.options.prototype,e.prototype))}};var context;window.__componentScript=function(e,t){t.call(context)},window.HTMLElementElement=HTMLElementElement,window.mixin=mixin}(),function(){function e(e){return e.ownerDocument===document||e.ownerDocument.impl===document}function t(e){return"link"===e.localName&&e.getAttribute("rel")===r}function n(e){return e.parentNode&&"element"===e.parentNode.localName?!0:void 0}var r="import",i={selectors:["link[rel="+r+"]","link[rel=stylesheet]","script[src]","script","style","element"],map:{link:"parseLink",script:"parseScript",element:"parseElement",style:"parseStyle"},parse:function(e){if(!e.__parsed){e.__parsed=!0;var t=e.querySelectorAll(o.selectors);a(t,function(e){o[o.map[e.localName]](e)}),CustomElements.upgradeDocument(e),CustomElements.observeDocument(e)}},parseLink:function(r){t(r)?r.content&&o.parse(r.content):e(r)||!r.parentNode||n(r)||document.head.appendChild(r)},parseScript:function(t){if(!e(t)&&!n(t)){var r=t.__resource||t.textContent;r&&(r+="\n//@ sourceURL="+t.__nodeUrl+"\n",eval.call(window,r))}},parseStyle:function(t){e(t)||n(t)||document.querySelector("head").appendChild(t)},parseElement:function(e){new HTMLElementElement(e)}},o=i,a=Array.prototype.forEach.call.bind(Array.prototype.forEach);CustomElements.parser=i}(),function(){function e(){setTimeout(function(){CustomElements.parser.parse(document),CustomElements.ready=!0,CustomElements.readyTime=(new Date).getTime(),window.HTMLImports&&(CustomElements.elapsed=CustomElements.readyTime-HTMLImports.readyTime),document.body.dispatchEvent(new CustomEvent("WebComponentsReady",{bubbles:!0}))},0)}"function"!=typeof window.CustomEvent&&(window.CustomEvent=function(e){var t=document.createEvent("HTMLEvents");return t.initEvent(e,!0,!0),t}),window.HTMLImports?document.addEventListener("HTMLImportsLoaded",e):window.addEventListener("load",e)}(),function(){function e(){}if(document.write("<style>element {display: none;} /* injected by platform.js */</style>"),window.ShadowDOMPolyfill){CustomElements.watchShadow=e,CustomElements.watchAllShadows=e;var t=["upgradeAll","upgradeSubtree","observeDocument","upgradeDocument"],n={};t.forEach(function(e){n[e]=CustomElements[e]}),t.forEach(function(e){CustomElements[e]=function(t){return n[e](wrap(t))}})}}(),function(e){e=e||{};var t={shadow:function(e){return e?e.shadowRoot||e.webkitShadowRoot:void 0},canTarget:function(e){return e&&Boolean(e.elementFromPoint)},targetingShadow:function(e){var t=this.shadow(e);return this.canTarget(t)?t:void 0},searchRoot:function(e,t,n){if(e){var r,i,o,a=e.elementFromPoint(t,n);for(i=this.targetingShadow(a);i;){if(r=i.elementFromPoint(t,n)){var s=this.targetingShadow(r);return this.searchRoot(s,t,n)||r}o=i.querySelector("shadow"),i=o&&o.olderShadowRoot}return a}},findTarget:function(e){var t=e.clientX,n=e.clientY;return this.searchRoot(document,t,n)}};e.targetFinding=t,e.findTarget=t.findTarget.bind(t),window.PointerEventsPolyfill=e}(window.PointerEventsPolyfill),function(){function e(e){return'[touch-action="'+e+'"]'}function t(e){return"{ -ms-touch-action: "+e+"; touch-action: "+e+"; }"}var n=["none","pan-x","pan-y",{rule:"pan-x pan-y",selectors:["scroll","pan-x pan-y","pan-y pan-x"]}],r="";n.forEach(function(n){r+=n+""===n?e(n)+t(n):n.selectors.map(e)+t(n.rule)});var i=document.createElement("style");i.textContent=r;var o=document.querySelector("head");o.insertBefore(i,o.firstChild)}(),function(e){function t(e,t){var t=t||{},i=t.buttons;if(void 0===i)switch(t.which){case 1:i=1;break;case 2:i=4;break;case 3:i=2;break;default:i=0}var o;if(n)o=new MouseEvent(e,t);else{o=document.createEvent("MouseEvent");var a={bubbles:!1,cancelable:!1,view:null,detail:null,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0,relatedTarget:null};Object.keys(a).forEach(function(e){e in t&&(a[e]=t[e])}),o.initMouseEvent(e,a.bubbles,a.cancelable,a.view,a.detail,a.screenX,a.screenY,a.clientX,a.clientY,a.ctrlKey,a.altKey,a.shiftKey,a.metaKey,a.button,a.relatedTarget)}r||Object.defineProperty(o,"buttons",{get:function(){return i},enumerable:!0});var s=0;return s=t.pressure?t.pressure:i?.5:0,Object.defineProperties(o,{pointerId:{value:t.pointerId||0,enumerable:!0},width:{value:t.width||0,enumerable:!0},height:{value:t.height||0,enumerable:!0},pressure:{value:s,enumerable:!0},tiltX:{value:t.tiltX||0,enumerable:!0},tiltY:{value:t.tiltY||0,enumerable:!0},pointerType:{value:t.pointerType||"",enumerable:!0},hwTimestamp:{value:t.hwTimestamp||0,enumerable:!0},isPrimary:{value:t.isPrimary||!1,enumerable:!0}}),o}var n=!1,r=!1;try{var i=new MouseEvent("click",{buttons:1});n=!0,r=1===i.buttons}catch(o){}e.PointerEvent=t}(window),function(e){function t(){this.ids=[],this.pointers=[]}t.prototype={set:function(e,t){var n=this.ids.indexOf(e);n>-1?this.pointers[n]=t:(this.ids.push(e),this.pointers.push(t))},has:function(e){return this.ids.indexOf(e)>-1},"delete":function(e){var t=this.ids.indexOf(e);t>-1&&(this.ids.splice(t,1),this.pointers.splice(t,1))},get:function(e){var t=this.ids.indexOf(e);return this.pointers[t]},get size(){return this.pointers.length},clear:function(){this.ids.length=0,this.pointers.length=0}},e.PointerMap=t}(window.PointerEventsPolyfill),function(e){var t;if("undefined"!=typeof WeakMap&&0>navigator.userAgent.indexOf("Firefox/"))t=WeakMap;else{var n=Object.defineProperty,r=Object.hasOwnProperty,i=(new Date).getTime()%1e9;t=function(){this.name="__st"+(1e9*Math.random()>>>0)+(i++ +"__")},t.prototype={set:function(e,t){n(e,this.name,{value:t,writable:!0})},get:function(e){return r.call(e,this.name)?e[this.name]:void 0},"delete":function(e){this.set(e,void 0)}}}e.SideTable=t}(window.PointerEventsPolyfill),function(e){var t={targets:new e.SideTable,handledEvents:new e.SideTable,scrollType:new e.SideTable,pointermap:new e.PointerMap,events:[],eventMap:{},eventSources:{},registerSource:function(e,t){var n=t,r=n.events;r&&(this.events=this.events.concat(r),r.forEach(function(e){n[e]&&(this.eventMap[e]=n[e].bind(n))},this),this.eventSources[e]=n)},registerTarget:function(e,t){this.scrollType.set(e,t||"none"),this.listen(this.events,e,this.boundHandler)},unregisterTarget:function(e){this.scrollType.set(e,null),this.unlisten(this.events,e,this.boundHandler)},down:function(e){this.fireEvent("pointerdown",e)},move:function(e){this.fireEvent("pointermove",e)},up:function(e){this.fireEvent("pointerup",e)},enter:function(e){e.bubbles=!1,this.fireEvent("pointerenter",e)},leave:function(e){e.bubbles=!1,this.fireEvent("pointerleave",e)},over:function(e){e.bubbles=!0,this.fireEvent("pointerover",e)},out:function(e){e.bubbles=!0,this.fireEvent("pointerout",e)},cancel:function(e){this.fireEvent("pointercancel",e)},leaveOut:function(e){e.target.contains(e.relatedTarget)||this.leave(e),this.out(e)},enterOver:function(e){e.target.contains(e.relatedTarget)||this.enter(e),this.over(e)},eventHandler:function(e){if(!this.handledEvents.get(e)){var t=e.type,n=this.eventMap&&this.eventMap[t];n&&n(e),this.handledEvents.set(e,!0)}},listen:function(e,t,n){e.forEach(function(e){this.addEvent(e,n,!1,t)},this)},unlisten:function(e,t,n){e.forEach(function(e){this.removeEvent(e,n,!1,t)},this)},addEvent:function(e,t,n,r){r.addEventListener(e,t,n)},removeEvent:function(e,t,n,r){r.removeEventListener(e,t,n)},makeEvent:function(e,t){var n=new PointerEvent(e,t);return this.targets.set(n,this.targets.get(t)||t.target),n},fireEvent:function(e,t){var n=this.makeEvent(e,t);return this.dispatchEvent(n)},cloneEvent:function(e){var t={};for(var n in e)t[n]=e[n];return t},getTarget:function(e){return this.captureInfo&&this.captureInfo.id===e.pointerId?this.captureInfo.target:this.targets.get(e)},setCapture:function(e,t){this.captureInfo&&this.releaseCapture(this.captureInfo.id),this.captureInfo={id:e,target:t};var n=new PointerEvent("gotpointercapture",{bubbles:!0});this.implicitRelease=this.releaseCapture.bind(this,e),document.addEventListener("pointerup",this.implicitRelease),document.addEventListener("pointercancel",this.implicitRelease),this.targets.set(n,t),this.asyncDispatchEvent(n)},releaseCapture:function(e){if(this.captureInfo&&this.captureInfo.id===e){var t=new PointerEvent("lostpointercapture",{bubbles:!0}),n=this.captureInfo.target;this.captureInfo=null,document.removeEventListener("pointerup",this.implicitRelease),document.removeEventListener("pointercancel",this.implicitRelease),this.targets.set(t,n),this.asyncDispatchEvent(t)}},dispatchEvent:function(e){var t=this.getTarget(e);return t?t.dispatchEvent(e):void 0},asyncDispatchEvent:function(e){setTimeout(this.dispatchEvent.bind(this,e),0)}};t.boundHandler=t.eventHandler.bind(t),e.dispatcher=t}(window.PointerEventsPolyfill),function(e){var t=e.dispatcher,n=Array.prototype.forEach.call.bind(Array.prototype.forEach),r=Array.prototype.map.call.bind(Array.prototype.map),i={ATTRIB:"touch-action",SELECTOR:"[touch-action]",EMITTER:"none",XSCROLLER:"pan-x",YSCROLLER:"pan-y",SCROLLER:/^(?:pan-x pan-y)|(?:pan-y pan-x)|scroll$/,OBSERVER_INIT:{subtree:!0,childList:!0,attributes:!0,attributeFilter:["touch-action"]},watchSubtree:function(t){e.targetFinding.canTarget(t)&&s.observe(t,this.OBSERVER_INIT)},enableOnSubtree:function(e){var t=e||document;this.watchSubtree(e),t===document&&"complete"!==document.readyState?this.installOnLoad():this.installNewSubtree(t)},installNewSubtree:function(e){n(this.findElements(e),this.addElement,this)},findElements:function(e){var t=e||document;return t.querySelectorAll?t.querySelectorAll(this.SELECTOR):[]},touchActionToScrollType:function(e){var t=e;return t===this.EMITTER?"none":t===this.XSCROLLER?"X":t===this.YSCROLLER?"Y":this.SCROLLER.exec(t)?"XY":void 0},removeElement:function(n){t.unregisterTarget(n);var r=e.targetFinding.shadow(n);r&&t.unregisterTarget(r)},addElement:function(n){var r=n.getAttribute&&n.getAttribute(this.ATTRIB),i=this.touchActionToScrollType(r);if(i){t.registerTarget(n,i);var o=e.targetFinding.shadow(n);o&&t.registerTarget(o,i)}},elementChanged:function(e){this.removeElement(e),this.addElement(e)},concatLists:function(e,t){for(var n,r=0,i=t.length;i>r&&(n=t[r]);r++)e.push(n);return e},installOnLoad:function(){document.addEventListener("DOMContentLoaded",this.installNewSubtree.bind(this,document))},flattenMutationTree:function(e){var t=r(e,this.findElements,this);return t.push(e),t.reduce(this.concatLists,[])},mutationWatcher:function(e){e.forEach(this.mutationHandler,this)},mutationHandler:function(e){var t=e;if("childList"===t.type){var n=this.flattenMutationTree(t.addedNodes);n.forEach(this.addElement,this);var r=this.flattenMutationTree(t.removedNodes);r.forEach(this.removeElement,this)}else"attributes"===t.type&&this.elementChanged(t.target)}},o=i.mutationWatcher.bind(i);e.installer=i,e.register=i.enableOnSubtree.bind(i),e.setTouchAction=function(e,n){var r=this.touchActionToScrollType(n);r?t.registerTarget(e,r):t.unregisterTarget(e)}.bind(i);var a=window.MutationObserver||window.WebKitMutationObserver;if(a)var s=new a(o);else i.watchSubtree=function(){console.warn("PointerEventsPolyfill: MutationObservers not found, touch-action will not be dynamically detected")}}(window.PointerEventsPolyfill),function(e){var t=e.dispatcher,n=e.installer,r=e.findTarget,i=t.pointermap,o=t.scrollType,a=Array.prototype.map.call.bind(Array.prototype.map),s=2500,l=25,u={events:["touchstart","touchmove","touchend","touchcancel"],POINTER_TYPE:"touch",firstTouch:null,isPrimaryTouch:function(e){return this.firstTouch===e.identifier},setPrimaryTouch:function(e){null===this.firstTouch&&(this.firstTouch=e.identifier,this.firstXY={X:e.clientX,Y:e.clientY},this.scrolling=!1)},removePrimaryTouch:function(e){this.isPrimaryTouch(e)&&(this.firstTouch=null,this.firstXY=null)},touchToPointer:function(e){var n=t.cloneEvent(e);return n.pointerId=e.identifier+2,n.target=r(n),n.bubbles=!0,n.cancelable=!0,n.button=0,n.buttons=1,n.width=e.webkitRadiusX||e.radiusX,n.height=e.webkitRadiusY||e.radiusY,n.pressure=e.webkitForce||e.force,n.isPrimary=this.isPrimaryTouch(e),n.pointerType=this.POINTER_TYPE,n},processTouches:function(e,t){var n=e.changedTouches,r=a(n,this.touchToPointer,this);r.forEach(t,this)},shouldScroll:function(e){if(this.firstXY){var t,n=o.get(e.currentTarget);if("none"===n)t=!1;else if("XY"===n)t=!0;else{var r=e.changedTouches[0],i=n,a="Y"===n?"X":"Y",s=Math.abs(r["client"+i]-this.firstXY[i]),l=Math.abs(r["client"+a]-this.firstXY[a]);t=s>=l}return this.firstXY=null,t}},findTouch:function(e,t){for(var n,r=0,i=e.length;i>r&&(n=e[r]);r++)if(n.identifier===t)return!0},vacuumTouches:function(e){var t=e.touches;if(i.size>=t.length){var n=[];i.ids.forEach(function(e){if(1!==e&&!this.findTouch(t,e-2)){var r=i.get(e).out;n.push(this.touchToPointer(r))}},this),n.forEach(this.cancelOut,this)}},touchstart:function(e){this.vacuumTouches(e),this.setPrimaryTouch(e.changedTouches[0]),this.dedupSynthMouse(e),this.scrolling||this.processTouches(e,this.overDown)},overDown:function(e){i.set(e.pointerId,{target:e.target,out:e,outTarget:e.target}),t.over(e),t.down(e)},touchmove:function(e){this.scrolling||(this.shouldScroll(e)?(this.scrolling=!0,this.touchcancel(e)):(e.preventDefault(),this.processTouches(e,this.moveOverOut)))},moveOverOut:function(e){var n=e,r=i.get(n.pointerId),o=r.out,a=r.outTarget;t.move(n),o&&a!==n.target&&(o.relatedTarget=n.target,n.relatedTarget=a,o.target=a,t.leaveOut(o),t.enterOver(n)),r.out=n,r.outTarget=n.target},touchend:function(e){this.dedupSynthMouse(e),this.processTouches(e,this.upOut)},upOut:function(e){this.scrolling||(t.up(e),t.out(e)),this.cleanUpPointer(e)},touchcancel:function(e){this.processTouches(e,this.cancelOut)},cancelOut:function(e){t.cancel(e),t.out(e),this.cleanUpPointer(e)},cleanUpPointer:function(e){i.delete(e.pointerId),this.removePrimaryTouch(e)},dedupSynthMouse:function(e){var t=c.lastTouches,n=e.changedTouches[0];if(this.isPrimaryTouch(n)){var r={x:n.clientX,y:n.clientY};t.push(r);var i=function(e,t){var n=e.indexOf(t);n>-1&&e.splice(n,1)}.bind(null,t,r);setTimeout(i,s)}}},c={POINTER_ID:1,POINTER_TYPE:"mouse",events:["mousedown","mousemove","mouseup","mouseover","mouseout"],global:["mousedown","mouseup","mouseover","mouseout"],lastTouches:[],mouseHandler:t.eventHandler.bind(t),isEventSimulatedFromTouch:function(e){for(var t,n=this.lastTouches,r=e.clientX,i=e.clientY,o=0,a=n.length;a>o&&(t=n[o]);o++){var s=Math.abs(r-t.x),u=Math.abs(i-t.y);
if(l>=s&&l>=u)return!0}},prepareEvent:function(e){var n=t.cloneEvent(e);return n.pointerId=this.POINTER_ID,n.isPrimary=!0,n.pointerType=this.POINTER_TYPE,n},mousedown:function(e){if(!this.isEventSimulatedFromTouch(e)){var n=i.has(this.POINTER_ID);if(n&&(this.cancel(e),n=!1),!n){var r=this.prepareEvent(e);i.set(this.POINTER_ID,e),t.down(r),t.listen(this.global,document,this.mouseHandler)}}},mousemove:function(e){if(!this.isEventSimulatedFromTouch(e)){var n=this.prepareEvent(e);t.move(n)}},mouseup:function(e){if(!this.isEventSimulatedFromTouch(e)){var n=i.get(this.POINTER_ID);if(n&&n.button===e.button){var r=this.prepareEvent(e);t.up(r),this.cleanupMouse()}}},mouseover:function(e){if(!this.isEventSimulatedFromTouch(e)){var n=this.prepareEvent(e);t.enterOver(n)}},mouseout:function(e){if(!this.isEventSimulatedFromTouch(e)){var n=this.prepareEvent(e);t.leaveOut(n)}},cancel:function(e){var n=this.prepareEvent(e);t.cancel(n),this.cleanupMouse()},cleanupMouse:function(){i.delete(this.POINTER_ID),t.unlisten(this.global,document,this.mouseHandler)}},d={events:["MSPointerDown","MSPointerMove","MSPointerUp","MSPointerOut","MSPointerOver","MSPointerCancel","MSGotPointerCapture","MSLostPointerCapture"],POINTER_TYPES:["","unavailable","touch","pen","mouse"],prepareEvent:function(e){var n=t.cloneEvent(e);return n.pointerType=this.POINTER_TYPES[e.pointerType],n},cleanup:function(e){i.delete(e)},MSPointerDown:function(e){i.set(e.pointerId,e);var n=this.prepareEvent(e);t.down(n)},MSPointerMove:function(e){var n=this.prepareEvent(e);t.move(n)},MSPointerUp:function(e){var n=this.prepareEvent(e);t.up(n),this.cleanup(e.pointerId)},MSPointerOut:function(e){var n=this.prepareEvent(e);t.leaveOut(n)},MSPointerOver:function(e){var n=this.prepareEvent(e);t.enterOver(n)},MSPointerCancel:function(e){var n=this.prepareEvent(e);t.cancel(n),this.cleanup(e.pointerId)},MSLostPointerCapture:function(e){var n=t.makeEvent("lostpointercapture",e);t.dispatchEvent(n)},MSGotPointerCapture:function(e){var n=t.makeEvent("gotpointercapture",e);t.dispatchEvent(n)}};if(void 0===window.navigator.pointerEnabled){if(window.navigator.msPointerEnabled){var h=window.navigator.msMaxTouchPoints;Object.defineProperty(window.navigator,"maxTouchPoints",{value:h,enumerable:!0}),t.registerSource("ms",d),t.registerTarget(document)}else t.registerSource("mouse",c),"ontouchstart"in window&&t.registerSource("touch",u),n.enableOnSubtree(document),t.listen(["mousemove"],document,t.boundHandler);Object.defineProperty(window.navigator,"pointerEnabled",{value:!0,enumerable:!0})}}(window.PointerEventsPolyfill),function(e){function t(e){if(!i.pointermap.has(e))throw Error("InvalidPointerId")}var n,r,i=e.dispatcher,o=window.navigator;o.msPointerEnabled?(n=function(e){t(e),this.msSetPointerCapture(e)},r=function(e){t(e),this.msReleasePointerCapture(e)}):(n=function(e){t(e),i.setCapture(e,this)},r=function(e){t(e),i.releaseCapture(e,this)}),Element.prototype.setPointerCapture||Object.defineProperties(Element.prototype,{setPointerCapture:{value:n},releasePointerCapture:{value:r}})}(window.PointerEventsPolyfill),PointerGestureEvent.prototype.preventTap=function(){this.tapPrevented=!0},function(e){e=e||{},e.utils={LCA:{find:function(e,t){if(e===t)return e;if(e.contains){if(e.contains(t))return e;if(t.contains(e))return t}var n=this.depth(e),r=this.depth(t),i=n-r;for(i>0?e=this.walk(e,i):t=this.walk(t,-i);e&&t&&e!==t;)e=this.walk(e,1),t=this.walk(t,1);return e},walk:function(e,t){for(var n=0;t>n;n++)e=e.parentNode;return e},depth:function(e){for(var t=0;e;)t++,e=e.parentNode;return t}}},e.findLCA=function(t,n){return e.utils.LCA.find(t,n)},window.PointerGestures=e}(window.PointerGestures),function(e){var t;if("undefined"!=typeof WeakMap&&0>navigator.userAgent.indexOf("Firefox/"))t=WeakMap;else{var n=Object.defineProperty,r=Object.hasOwnProperty,i=(new Date).getTime()%1e9;t=function(){this.name="__st"+(1e9*Math.random()>>>0)+(i++ +"__")},t.prototype={set:function(e,t){n(e,this.name,{value:t,writable:!0})},get:function(e){return r.call(e,this.name)?e[this.name]:void 0},"delete":function(e){this.set(e,void 0)}}}e.SideTable=t}(window.PointerGestures),function(e){function t(){this.ids=[],this.pointers=[]}t.prototype={set:function(e,t){var n=this.ids.indexOf(e);n>-1?this.pointers[n]=t:(this.ids.push(e),this.pointers.push(t))},has:function(e){return this.ids.indexOf(e)>-1},"delete":function(e){var t=this.ids.indexOf(e);t>-1&&(this.ids.splice(t,1),this.pointers.splice(t,1))},get:function(e){var t=this.ids.indexOf(e);return this.pointers[t]},get size(){return this.pointers.length},clear:function(){this.ids.length=0,this.pointers.length=0}},window.Map&&(t=window.Map),e.PointerMap=t}(window.PointerGestures),function(e){var t={handledEvents:new e.SideTable,targets:new e.SideTable,handlers:{},recognizers:{},events:["pointerdown","pointermove","pointerup","pointerover","pointerout","pointercancel"],registerRecognizer:function(e,t){var n=t;this.recognizers[e]=n,this.events.forEach(function(e){if(n[e]){var t=n[e].bind(n);this.addHandler(e,t)}},this)},addHandler:function(e,t){var n=e;this.handlers[n]||(this.handlers[n]=[]),this.handlers[n].push(t)},registerTarget:function(e){this.listen(this.events,e)},unregisterTarget:function(e){this.unlisten(this.events,e)},eventHandler:function(e){if(!this.handledEvents.get(e)){var t,n=e.type;(t=this.handlers[n])&&this.makeQueue(t,e),this.handledEvents.set(e,!0)}},makeQueue:function(e,t){var n=this.cloneEvent(t);setTimeout(this.runQueue.bind(this,e,n),0)},runQueue:function(e,t){this.currentPointerId=t.pointerId;for(var n,r=0,i=e.length;i>r&&(n=e[r]);r++)n(t);this.currentPointerId=0},listen:function(e,t){e.forEach(function(e){this.addEvent(e,this.boundHandler,!1,t)},this)},unlisten:function(e){e.forEach(function(e){this.removeEvent(e,this.boundHandler,!1,inTarget)},this)},addEvent:function(e,t,n,r){r.addEventListener(e,t,n)},removeEvent:function(e,t,n,r){r.removeEventListener(e,t,n)},makeEvent:function(e,t){return new PointerGestureEvent(e,t)},cloneEvent:function(e){var t={};for(var n in e)t[n]=e[n];return t},dispatchEvent:function(e,t){var n=t||this.targets.get(e);n&&(n.dispatchEvent(e),e.tapPrevented&&this.preventTap(this.currentPointerId))},asyncDispatchEvent:function(e,t){var n=function(){this.dispatchEvent(e,t)}.bind(this);setTimeout(n,0)},preventTap:function(e){var t=this.recognizers.tap;t&&t.preventTap(e)}};t.boundHandler=t.eventHandler.bind(t),e.dispatcher=t,e.register=function(t){var n=window.PointerEventsPolyfill;n&&n.register(t),e.dispatcher.registerTarget(t)},t.registerTarget(document)}(window.PointerGestures),function(e){var t=e.dispatcher,n={HOLD_DELAY:200,WIGGLE_THRESHOLD:16,events:["pointerdown","pointermove","pointerup","pointercancel"],heldPointer:null,holdJob:null,pulse:function(){var e=Date.now()-this.heldPointer.timeStamp,t=this.held?"holdpulse":"hold";this.fireHold(t,e),this.held=!0},cancel:function(){clearInterval(this.holdJob),this.held&&this.fireHold("release"),this.held=!1,this.heldPointer=null,this.target=null,this.holdJob=null},pointerdown:function(e){e.isPrimary&&!this.heldPointer&&(this.heldPointer=e,this.target=e.target,this.holdJob=setInterval(this.pulse.bind(this),this.HOLD_DELAY))},pointerup:function(e){this.heldPointer&&this.heldPointer.pointerId===e.pointerId&&this.cancel()},pointercancel:function(){this.cancel()},pointermove:function(e){if(this.heldPointer&&this.heldPointer.pointerId===e.pointerId){var t=e.clientX-this.heldPointer.clientX,n=e.clientY-this.heldPointer.clientY;t*t+n*n>this.WIGGLE_THRESHOLD&&this.cancel()}},fireHold:function(e,n){var r={pointerType:this.heldPointer.pointerType};n&&(r.holdTime=n);var i=t.makeEvent(e,r);t.dispatchEvent(i,this.target),i.tapPrevented&&t.preventTap(this.heldPointer.pointerId)}};t.registerRecognizer("hold",n)}(window.PointerGestures),function(e){var t=e.dispatcher,n=new e.PointerMap,r={events:["pointerdown","pointermove","pointerup","pointercancel"],WIGGLE_THRESHOLD:4,clampDir:function(e){return e>0?1:-1},calcPositionDelta:function(e,t){var n=0,r=0;return e&&t&&(n=t.pageX-e.pageX,r=t.pageY-e.pageY),{x:n,y:r}},fireTrack:function(e,n,r){var i=r,o=this.calcPositionDelta(i.downEvent,n),a=this.calcPositionDelta(i.lastMoveEvent,n);a.x&&(i.xDirection=this.clampDir(a.x)),a.y&&(i.yDirection=this.clampDir(a.y));var s={dx:o.x,dy:o.y,ddx:a.x,ddy:a.y,clientX:n.clientX,clientY:n.clientY,pageX:n.pageX,pageY:n.pageY,screenX:n.screenX,screenY:n.screenY,xDirection:i.xDirection,yDirection:i.yDirection,trackInfo:i.trackInfo,pointerType:n.pointerType};"trackend"===e&&(s._releaseTarget=n.target);var l=t.makeEvent(e,s);i.lastMoveEvent=n,t.dispatchEvent(l,i.downTarget)},pointerdown:function(e){if(e.isPrimary&&("mouse"===e.pointerType?1===e.buttons:!0)){var t={downEvent:e,downTarget:e.target,trackInfo:{},lastMoveEvent:null,xDirection:0,yDirection:0,tracking:!1};n.set(e.pointerId,t)}},pointermove:function(e){var t=n.get(e.pointerId);if(t)if(t.tracking)this.fireTrack("track",e,t);else{var r=this.calcPositionDelta(t.downEvent,e),i=r.x*r.x+r.y*r.y;i>this.WIGGLE_THRESHOLD&&(t.tracking=!0,this.fireTrack("trackstart",t.downEvent,t),this.fireTrack("track",e,t))}},pointerup:function(e){var t=n.get(e.pointerId);t&&(t.tracking&&this.fireTrack("trackend",e,t),n.delete(e.pointerId))},pointercancel:function(e){this.pointerup(e)}};t.registerRecognizer("track",r)}(window.PointerGestures),function(e){var t=e.dispatcher,n={MIN_VELOCITY:.5,MAX_QUEUE:4,moveQueue:[],target:null,pointerId:null,events:["pointerdown","pointermove","pointerup","pointercancel"],pointerdown:function(e){e.isPrimary&&!this.pointerId&&(this.pointerId=e.pointerId,this.target=e.target,this.addMove(e))},pointermove:function(e){e.pointerId===this.pointerId&&this.addMove(e)},pointerup:function(e){e.pointerId===this.pointerId&&this.fireFlick(e),this.cleanup()},pointercancel:function(){this.cleanup()},cleanup:function(){this.moveQueue=[],this.target=null,this.pointerId=null},addMove:function(e){this.moveQueue.length>=this.MAX_QUEUE&&this.moveQueue.shift(),this.moveQueue.push(e)},fireFlick:function(e){for(var n,r,i,o,a,s,l,u=e,c=this.moveQueue.length,d=0,h=0,p=0,f=0;c>f&&(l=this.moveQueue[f]);f++)n=u.timeStamp-l.timeStamp,r=u.clientX-l.clientX,i=u.clientY-l.clientY,o=r/n,a=i/n,s=Math.sqrt(o*o+a*a),s>p&&(d=o,h=a,p=s);var v=Math.abs(d)>Math.abs(h)?"x":"y",m=this.calcAngle(d,h);if(Math.abs(p)>=this.MIN_VELOCITY){var g=t.makeEvent("flick",{xVelocity:d,yVelocity:h,velocity:p,angle:m,majorAxis:v,pointerType:e.pointerType});t.dispatchEvent(g,this.target)}},calcAngle:function(e,t){return 180*Math.atan2(t,e)/Math.PI}};t.registerRecognizer("flick",n)}(window.PointerGestures),function(e){var t=e.dispatcher,n=new e.PointerMap,r={events:["pointerdown","pointermove","pointerup","pointercancel"],pointerdown:function(e){e.isPrimary&&!e.tapPrevented&&n.set(e.pointerId,{target:e.target,x:e.clientX,y:e.clientY})},pointermove:function(e){if(e.isPrimary){var t=n.get(e.pointerId);t&&e.tapPrevented&&n.delete(e.pointerId)}},pointerup:function(r){var i=n.get(r.pointerId);if(i&&!r.tapPrevented){var o=e.findLCA(i.target,r.target);if(o){var a=t.makeEvent("tap",{x:r.clientX,y:r.clientY,pointerType:r.pointerType});t.dispatchEvent(a,o)}}n.delete(r.pointerId)},pointercancel:function(e){n.delete(e.pointerId)},preventTap:function(e){n.delete(e)}};t.registerRecognizer("tap",r)}(window.PointerGestures),function(){var e=Array.prototype.forEach.call.bind(Array.prototype.forEach);window.forEach=e}(),function(){function e(e,n){1==arguments.length&&(n=e,e=null),n&&n.hasOwnProperty("constructor")||(n.constructor=function(){this.super()});var r=n.constructor,o=e&&e.prototype||Object.prototype;return r.prototype=t(o,n),"super"in r.prototype||(r.prototype.super=i),r}function t(e,t){return Object.create(e,n(t))}function n(e){var t={};for(var n in e)t[n]=r(e,n);return t}function r(e,t){return e&&Object.getOwnPropertyDescriptor(e,t)||r(Object.getPrototypeOf(e),t)}function i(e){var t=i.caller,n=t._nom;if(!n&&(n=t._nom=s.call(this,t),!n))return console.warn('called super() on a method not in "this"'),void 0;"_super"in t||a(t,n,Object.getPrototypeOf(this));var r=t._super;if(r){var o=r[n];return"_super"in o||a(o,n,r),o.apply(this,e||[])}}function o(e,t,n){for(var r=e;r&&(!r.hasOwnProperty(t)||r[t]==n);)r=Object.getPrototypeOf(r);return r}function a(e,t,n){e._super=o(n,t,e),e._super&&(e._super[t]._nom=t)}function s(e){for(var t in this){var n=r(this,t);if(n.value==e)return t}}window.$class=e,window.extend=t,window.$super=i}(),function(){function e(e,r){if(e!=window){if(!(e&&e instanceof HTMLElement))throw"First argument to Polymer.register must be an HTMLElement";var i=mixin({},Polymer.base,r);i.elementElement=e,Polymer.addResolvePath(i,e),i.installTemplate=function(){this.super(),n.call(this,e)},i.readyCallback=t,Polymer.parseHostEvents(e.attributes,i),Polymer.publishAttributes(e,i),Polymer.installSheets(e),Polymer.shimStyling(e),e.register({prototype:i}),logFlags.comps&&console.log("Polymer: element registered"+e.options.name)}}function t(){this.installTemplate(),i.call(this)}function n(e){var t=e.querySelector("template");if(t){var n=this.webkitCreateShadowRoot();return n.applyAuthorStyles=this.applyAuthorStyles,CustomElements.watchShadow(this),n.host=this,n.appendChild(t.createInstance()),PointerGestures.register(n),PointerEventsPolyfill.setTouchAction(n,this.getAttribute("touch-action")),r.call(this,n),n}}function r(e){CustomElements.takeRecords(),Polymer.bindModel.call(this,e),Polymer.marshalNodeReferences.call(this,e);var t=Polymer.accumulateEvents(e);Polymer.bindAccumulatedLocalEvents.call(this,e,t)}function i(){Polymer.observeProperties.call(this),Polymer.takeAttributes.call(this);var e=Polymer.accumulateHostEvents.call(this);Polymer.bindAccumulatedHostEvents.call(this,e),this.ready&&this.ready()}function o(e,t){for(var n=e;n&&n!=this;){var r=Array.prototype.indexOf.call(t,n);if(r>=0)return r;n=n.parentNode}}window.logFlags||{},window.Polymer={register:e,findDistributedTarget:o,instanceReady:i}}(),function(e){var t=window.logFlags||{},n={"super":$super,isPolymerElement:!0,bind:function(){Polymer.bind.apply(this,arguments)},unbind:function(){Polymer.unbind.apply(this,arguments)},job:function(){return Polymer.job.apply(this,arguments)},asyncMethod:function(e,t,n){var r=t&&t.length?t:[t];return window.setTimeout(function(){(this[e]||e).apply(this,r)}.bind(this),n||0)},dispatch:function(e,t){this[e]&&this[e].apply(this,t)},fire:function(e,n,r){var i=r||this;return t.events&&console.log("[%s]: sending [%s]",i.localName,e),i.dispatchEvent(new CustomEvent(e,{bubbles:!0,detail:n})),n},asend:function(){this.asyncMethod("send",arguments)},classFollows:function(e,t,n){t&&t.classList.remove(n),e&&e.classList.add(n)}};n.send=n.fire,e.base=n}(window.Polymer),function(){function e(e,n,r,i){t.bind&&console.log("[%s]: bindProperties: [%s] to [%s].[%s]",r.localName||"object",i,e.localName,n);var o=PathObserver.getValueAtPath(r,i);(null==o||void 0===o)&&PathObserver.setValueAtPath(r,i,e[n]),Object.defineProperty(e,n,{get:function(){return PathObserver.getValueAtPath(r,i)},set:function(e){PathObserver.setValueAtPath(r,i,e)},configurable:!0,enumerable:!0})}var t=window.logFlags||{};Polymer.bindProperties=e}(),function(){function e(e,t,n){var r=u.get(e);r||u.set(e,r={}),r[t.toLowerCase()]=n}function t(e,t){var n=u.get(e);n&&delete n[t.toLowerCase()]}function n(n){var r=n.prototype,i=r.bind,o=r.unbind;r.bind=function(t,n,r){i.apply(this,arguments),e(this,t,r)},r.unbind=function(e){o.apply(this,arguments),t(this,e)}}function r(e){return e&&u.get(e)||c}function i(e,t){return r(e)[t.toLowerCase()]}function o(e){l.bind&&console.group("[%s] bindModel",this.localName),HTMLTemplateElement.bindAllMustachesFrom_(e,this),l.bind&&console.groupEnd()}function a(t,n,r){var i=Polymer.propertyForAttribute.call(this,t);i?(e(this,i,r),Polymer.bindProperties(this,i,n,r)):HTMLElement.prototype.bind.apply(this,arguments)}function s(e){var n=Polymer.propertyForAttribute.call(this,e);n?(t(this,e),Object.defineProperty(this,e,{value:this[e],enumerable:!0,writable:!0,configurable:!0})):HTMLElement.prototype.unbind.apply(this,arguments)}var l=window.logFlags||{},u=new SideTable;[Node,Element,Text,HTMLInputElement].forEach(n);var c={},d=/\{\{([^{}]*)}}/;Polymer.bind=a,Polymer.unbind=s,Polymer.getBinding=i,Polymer.bindModel=o,Polymer.bindPattern=d}(),function(){function e(){forEach(this.attributes,function(e){var i=t.call(this,e.name);if(i){if(e.value.search(r)>=0)return;var o=this[i],a=n(e.value,o);a!==o&&(this[i]=a)}},this)}function t(e){var t=Object.keys(this[i]);return t[t.map(l).indexOf(e.toLowerCase())]}function n(e,t){var n=typeof t;switch(t instanceof Date&&(n="date"),n){case"string":return e;case"date":return new Date(Date.parse(e)||Date.now());case"boolean":if(""==e)return!0}switch(e){case"true":return!0;case"false":return!1}var r=parseFloat(e);return r+""===e?r:e}var r=Polymer.bindPattern,i="__published",o="attributes",a="publish",s=function(e,t){var n={},r=e.getAttribute(o);if(r){var s=r.split(r.indexOf(",")>=0?",":" ");s.forEach(function(e){e=e.trim(),e&&(n[e]=null)})}var l=e.options.prototype;Object.keys(n).forEach(function(e){e in t||e in l||(t[e]=n[e])});var u=t[a];u&&(Object.keys(u).forEach(function(e){t[e]=u[e]}),n=mixin(n,u)),t[i]=mixin({},l[i],n)},l=String.prototype.toLowerCase.call.bind(String.prototype.toLowerCase);Polymer.takeAttributes=e,Polymer.publishAttributes=s,Polymer.propertyForAttribute=t}(),Polymer.marshalNodeReferences=function(e){var t=this.$=this.$||{};if(e){var n=e.querySelectorAll("[id]");forEach(n,function(e){t[e.id]=e})}},function(){function e(e,t,n){var r=n.bind(this);for(var i in t)l.events&&console.log('[%s] bindAccumulatedEvents: addEventListener("%s", listen)',e.localName||"root",i),e.addEventListener(i,r)}function t(t){e.call(this,this,t,i)}function n(t,n){e.call(this,t,n,r)}function r(e){if(!e.cancelBubble){e.on=u+e.type,l.events&&console.group("[%s]: listenLocal [%s]",this.localName,e.on);for(var t=e.target;t&&t!=this;){var n=w(t);if(n&&a.call(n,t,e))return;t=t.parentNode}l.events&&console.groupEnd()}}function i(e){e.cancelBubble||(l.events&&console.group("[%s]: listenHost [%s]",this.localName,e.type),s.call(this,this,e),l.events&&console.groupEnd())}function o(e){var t=T.get(e);return t||(t=[],T.set(e,t)),t}function a(e,t){if(e.attributes){var n=o(t);if(0>n.indexOf(e)){n.push(e);var r=e.getAttribute(t.on);r&&(l.events&&console.log("[%s] found handler name [%s]",this.localName,r),E(this,r,[t,t.detail,e]))}}return t.cancelBubble}function s(e,t){var n=M.call(e,t.type);return n&&(l.events&&console.log("[%s] found host handler name [%s]",e.localName,n),E(e,n,[t,t.detail,e])),t.cancelBubble}var l=window.logFlags||{},u="on-",c=function(e,t){t.eventDelegates=d(e)},d=function(e){var t={};if(e)for(var n,r=0;n=e[r];r++)n.name.slice(0,u.length)==u&&(t[n.name.slice(u.length)]=n.value);return t},h=function(e,t){var n=t||{};return p(e,n),m(e,n),g(e,n),n},p=function(e,t){var n=e.attributes;if(n)for(var r,i=0;r=n[i];i++)r.name.slice(0,u.length)===u&&v(r.name.slice(u.length),t)},f={webkitanimationstart:"webkitAnimationStart",webkitanimationend:"webkitAnimationEnd",webkittransitionend:"webkitTransitionEnd",domfocusout:"DOMFocusOut",domfocusin:"DOMFocusIn"},v=function(e,t){var n=f[e]||e;t[n]=1},m=function(e,t){for(var n,r=e.childNodes,i=0;n=r[i];i++)h(n,t)},g=function(e,t){if("template"==e.localName){var n=b(e);n&&m(n,t)}},b=function(e){return e.ref?e.ref.content:e.content},y=function(e){for(var t=e||{},n=this.__proto__;n&&n!==HTMLElement.prototype;){if(n.hasOwnProperty("eventDelegates"))for(var r in n.eventDelegates)v(r,t);n=n.__proto__}return t},w=function(e){for(var t=e;t.parentNode&&"shadow-root"!==t.localName;)t=t.parentNode;return t.host},E=function(e,t,n){e&&(l.events&&console.group("[%s] dispatch [%s]",e.localName,t),e.dispatch(t,n),l.events&&console.groupEnd())},T=new SideTable("handledList"),M=function(e){for(var t=this;t;){if(t.hasOwnProperty("eventDelegates")){var n=t.eventDelegates[e]||t.eventDelegates[e.toLowerCase()];if(n)return n}t=t.__proto__}};Polymer.parseHostEvents=c,Polymer.accumulateEvents=h,Polymer.accumulateHostEvents=y,Polymer.bindAccumulatedHostEvents=t,Polymer.bindAccumulatedLocalEvents=n}(),function(){function e(){for(var e in this)t.call(this,e)}function t(e){n.call(this,e)&&(i.observe&&console.log("["+this.localName+"] watching ["+e+"]"),new PathObserver(this,e,function(t,n){i.data&&console.log("[%s#%s] watch: [%s] now [%s] was [%s]",this.localName,this.node.id||"",e,this[e],n),r.call(this,e,n)}.bind(this)))}function n(e){return"_"!=e[0]&&!(e in Object.prototype)&&Boolean(this[e+o])}function r(e,t){var n=e+o;this[n]&&this[n](t)}var i=window.logFlags||{},o="Changed";Polymer.observeProperties=e}(),function(){function e(e){t(e),n(e)}function t(e){var t=e.querySelectorAll("[rel=stylesheet]"),n=e.querySelector("template");if(n)var r=templateContent(n);r&&f(t,function(e){if(!e.hasAttribute(p)){e.parentNode.removeChild(e);var t=o(e);t&&r.insertBefore(t,r.firstChild)}})}function n(e){var t=e.globalStyles||(e.globalStyles=l(e,"global"));a(t,u.head)}function r(e,t){var n=t.controllerStyles||(t.controllerStyles=l(t,"controller"));c.queue(function(){var t=i(e);t&&(Polymer.shimPolyfillDirectives(n,e.localName),a(n,t))})}function i(e){for(var t=e;t.parentNode&&"shadow-root"!=t.localName;)t=t.parentNode;return t==u?u.head:t}function o(e){if(e.__resource){var t=u.createElement("style");return t.textContent=e.__resource,t}console.warn("Could not find content for stylesheet",e)}function a(e,t){e.forEach(function(e){t.appendChild(e.cloneNode(!0))})}function s(e,t){return h?h.call(e,t):void 0}function l(e,t){var n=[],r=e.querySelectorAll("[rel=stylesheet]"),i="["+p+"="+t+"]";Array.prototype.forEach.call(r,function(e){s(e,i)&&(e.parentNode.removeChild(e),n.push(o(e)))});var a=e.querySelectorAll("style");return Array.prototype.forEach.call(a,function(e){s(e,i)&&(e.parentNode.removeChild(e),n.push(e))}),n}window.logFlags||{};var u=window.ShadowDOMPolyfill?ShadowDOMPolyfill.wrap(document):document,c={list:[],queue:function(e){e&&c.list.push(e),c.queueFlush()},queueFlush:function(){c.flushing||(c.flushing=!0,requestAnimationFrame(c.flush))},flush:function(){c.list.forEach(function(e){e()}),c.list=[],c.flushing=!1}},d=HTMLElement.prototype,h=d.matches||d.matchesSelector||d.webkitMatchesSelector||d.mozMatchesSelector,p="polymer-scope",f=Array.prototype.forEach.call.bind(Array.prototype.forEach);Polymer.installSheets=e,Polymer.installControllerStyles=r}(),function(){var e=Array.prototype.forEach.call.bind(Array.prototype.forEach),t=Array.prototype.concat.call.bind(Array.prototype.concat),n=Array.prototype.slice.call.bind(Array.prototype.slice),r={hostRuleRe:/@host[^{]*{(([^}]*?{[^{]*?}[\s\S]*?)+)}/gim,selectorRe:/([^{]*)({[\s\S]*?})/gim,hostFixableRe:/^[.\[:]/,cssCommentRe:/\/\*[^*]*\*+([^/*][^*]*\*+)*\//gim,cssPolyfillCommentRe:/\/\*\s*@polyfill ([^*]*\*+([^/*][^*]*\*+)*\/)([^{]*?){/gim,selectorReSuffix:"([>\\s~+[.,{:][\\s\\S]*)?$",hostRe:/@host/gim,cache:{},shimStyling:function(e){if(window.ShadowDOMPolyfill&&e){var t=e.options.name;r.cacheDefinition(e),r.shimPolyfillDirectives(e.styles,t),r.applyShimming(r.stylesForElement(e),t)}},shimShadowDOMStyling:function(e,t){window.ShadowDOMPolyfill&&(r.shimPolyfillDirectives(e,t),r.applyShimming(e,t))},applyShimming:function(e,t){this.shimAtHost(e,t),this.shimScoping(e,t)},cacheDefinition:function(e){var t=e.options.name,i=e.querySelector("template"),o=i&&templateContent(i),a=o&&o.querySelectorAll("style");e.styles=a?n(a):[],e.templateContent=o,r.cache[t]=e},stylesForElement:function(e){var r=e.styles,i=e.templateContent&&e.templateContent.querySelector("shadow");if(i||null===e.templateContent){var o=this.findExtendee(e.options.name);if(o){var a=this.stylesForElement(o);r=t(n(a),n(r))}}return r},findExtendee:function(e){var t=this.cache[e];return t&&this.cache[t.options.extends]},shimPolyfillDirectives:function(t,n){window.ShadowDOMPolyfill&&t&&e(t,function(e){e.textContent=this.convertPolyfillDirectives(e.textContent,n)},this)},shimAtHost:function(e,t){if(e){var n=this.convertAtHostStyles(e,t);this.addCssToDocument(n)}},shimScoping:function(e,t){e&&this.applyPseudoScoping(e,t)},convertPolyfillDirectives:function(e){for(var t,n="",r=0;t=this.cssPolyfillCommentRe.exec(e);)n+=e.substring(r,t.index),n+=t[1].slice(0,-2)+"{",r=this.cssPolyfillCommentRe.lastIndex;return n+=e.substring(r,e.length)},findAtHostRules:function(e,t){return Array.prototype.filter.call(e,this.isHostRule.bind(this,t))},isHostRule:function(e,t){return t.selectorText&&t.selectorText.match(e)||t.cssRules&&this.findAtHostRules(t.cssRules,e).length||t.type==CSSRule.WEBKIT_KEYFRAMES_RULE},convertAtHostStyles:function(e,t){for(var n,r=this.stylesToCssText(e),i="",o=0;n=this.hostRuleRe.exec(r);)i+=r.substring(o,n.index),i+=this.scopeHostCss(n[1],t),o=this.hostRuleRe.lastIndex;i+=r.substring(o,r.length);var a=RegExp("^"+t+this.selectorReSuffix,"m"),r=this.rulesToCss(this.findAtHostRules(this.cssToRules(i),a));return r},scopeHostCss:function(e,t){for(var n,r="";n=this.selectorRe.exec(e);)r+=this.scopeHostSelector(n[1],t)+" "+n[2]+"\n	";return r},scopeHostSelector:function(e,t){var n=[],r=e.split(",");return r.forEach(function(e){e=e.trim(),e.indexOf("*")>=0?e=e.replace("*",t):e.match(this.hostFixableRe)&&(e=t+e),n.push(e)},this),n.join(", ")},applyPseudoScoping:function(t,n){e(t,function(e){e.parentNode&&e.parentNode.removeChild(e)});var r=this.stylesToCssText(t).replace(this.hostRuleRe,""),i=this.cssToRules(r),r=this.pseudoScopeRules(i,n);this.addCssToDocument(r)},pseudoScopeRules:function(t,n){var r="";return e(t,function(e){e.selectorText&&e.style&&e.style.cssText?(r+=this.pseudoScopeSelector(e.selectorText,n)+" {\n	",r+=e.style.cssText+"\n}\n\n"):e.media?(r+="@media "+e.media.mediaText+" {\n",r+=this.pseudoScopeRules(e.cssRules,n),r+="\n}\n\n"):e.cssText&&(r+=e.cssText+"\n\n")},this),r},pseudoScopeSelector:function(e,t){var n=[],r=e.split(",");return r.forEach(function(e){n.push(t+" "+e.trim())}),n.join(", ")},stylesToCssText:function(t,n){var r="";return e(t,function(e){r+=e.textContent+"\n\n"}),n||(r=this.stripCssComments(r)),r},stripCssComments:function(e){return e.replace(this.cssCommentRe,"")},cssToRules:function(e){var t=document.createElement("style");t.textContent=e,document.head.appendChild(t);var n=t.sheet.cssRules;return t.parentNode.removeChild(t),n},rulesToCss:function(e){for(var t=0,n=[];e.length>t;t++)n.push(e[t].cssText);return n.join("\n\n")},addCssToDocument:function(e){e&&this.getSheet().appendChild(document.createTextNode(e))},getSheet:function(){return this.sheet||(this.sheet=document.createElement("style")),this.sheet},apply:function(){this.addCssToDocument("style { display: none !important; }\n"),document.head.appendChild(this.getSheet())}};document.addEventListener("WebComponentsReady",function(){r.apply()}),Polymer.shimStyling=r.shimStyling,Polymer.shimShadowDOMStyling=r.shimShadowDOMStyling,Polymer.shimPolyfillDirectives=r.shimPolyfillDirectives.bind(r)}(window),function(){function e(e,t){var r=n(t);e.resolvePath=function(e){return r+e}}function t(e){if(e){var t=e.split("/");return t.pop(),t.push(""),t.join("/")}return""}function n(e){return t(HTMLImports.getDocumentUrl(e.ownerDocument))}Polymer.addResolvePath=e}(),function(){function e(e,n,r){var i=e||new t(this);return i.stop(),i.go(n,r),i}var t=function(e){this.context=e};t.prototype={go:function(e,t){this.callback=e,this.handle=setTimeout(function(){this.handle=null,e.call(this.context)}.bind(this),t)},stop:function(){this.handle&&(clearTimeout(this.handle),this.handle=null)},complete:function(){this.handle&&(this.stop(),this.callback.call(this.context))}},Polymer.job=e}(),function(){document.write("<!-- begin Polymer injections -->\n"),document.write("<!-- injected meta tags for mobile -->\n"),document.write('<meta name="apple-mobile-web-app-capable" content="yes">\n'),document.write('<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">\n'),document.write("<!-- injected FOUC prevention -->\n"),document.write("<style>body {opacity: 0;}</style>"),document.write("<!-- end Polymer injections -->\n"),window.addEventListener("WebComponentsReady",function(){document.body.style.webkitTransition="opacity 0.3s",document.body.style.opacity=1})}();
//@ sourceMappingURL=polymer.min.js.map
});
require.register("component-indexof/index.js", function(exports, require, module){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
});
require.register("component-emitter/index.js", function(exports, require, module){

/**
 * Module dependencies.
 */

var index = require('indexof');

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  fn._off = on;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var i = index(callbacks, fn._off || fn);
  if (~i) callbacks.splice(i, 1);
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
require.register("component-underscore/index.js", function(exports, require, module){
//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var push             = ArrayProto.push,
      slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See: https://bugs.webkit.org/show_bug.cgi?id=80797
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = Math.floor(Math.random() * ++index);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = lookupIterator(obj, val);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(obj, val) {
    return _.isFunction(val) ? val : function(obj) { return obj[val]; };
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(obj, val, behavior) {
    var result = {};
    var iterator = lookupIterator(obj, val);
    each(obj, function(value, index) {
      var key = iterator(value, index);
      behavior(result, key, value);
    });
    return result;
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    return group(obj, val, function(result, key, value) {
      (result[key] || (result[key] = [])).push(value);
    });
  };

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = function(obj, val) {
    return group(obj, val, function(result, key, value) {
      result[key] || (result[key] = 0);
      result[key]++;
    });
  };

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var value = iterator(obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    each(input, function(value) {
      if (_.isArray(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    _.reduce(initial, function(memo, value, index) {
      if (isSorted ? (_.last(memo) !== value || !memo.length) : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(flatten(arguments, true, []));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = flatten(slice.call(arguments, 1), true, []);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(args, "" + i);
    }
    return results;
  };

  // Zip together two arrays -- an array of keys and an array of values -- into
  // a single object.
  _.zipObject = function(keys, values) {
    var result = {};
    for (var i = 0, l = keys.length; i < l; i++) {
      result[keys[i]] = values[i];
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        throttling = true;
        result = func.apply(context, args);
      }
      whenDone();
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(flatten(slice.call(arguments, 1), true, []), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // List of HTML entities for escaping.
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  // Regex containing the keys listed immediately above.
  var htmlEscaper = /[&<>"'\/]/g;

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return ('' + string).replace(htmlEscaper, function(match) {
      return htmlEscapes[match];
    });
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\':   '\\',
    "'":    "'",
    r:      '\r',
    n:      '\n',
    t:      '\t',
    u2028:  '\u2028',
    u2029:  '\u2029'
  };

  for (var key in escapes) escapes[escapes[key]] = key;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n((__t=(" + unescape(code) + "))==null?'':_.escape(__t))+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n((__t=(" + unescape(code) + "))==null?'':__t)+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result(obj, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

});
require.register("noflo-fbp/lib/fbp.js", function(exports, require, module){
module.exports = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "start": parse_start,
        "line": parse_line,
        "LineTerminator": parse_LineTerminator,
        "comment": parse_comment,
        "connection": parse_connection,
        "bridge": parse_bridge,
        "leftlet": parse_leftlet,
        "iip": parse_iip,
        "rightlet": parse_rightlet,
        "node": parse_node,
        "component": parse_component,
        "compMeta": parse_compMeta,
        "port": parse_port,
        "anychar": parse_anychar,
        "_": parse__,
        "__": parse___
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_start() {
        var result0, result1;
        var pos0;
        
        pos0 = pos;
        result0 = [];
        result1 = parse_line();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse_line();
        }
        if (result0 !== null) {
          result0 = (function(offset) { return parser.getResult();  })(pos0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_line() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse__();
        if (result0 !== null) {
          if (input.substr(pos, 7) === "EXPORT=") {
            result1 = "EXPORT=";
            pos += 7;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"EXPORT=\"");
            }
          }
          if (result1 !== null) {
            if (/^[A-Z.]/.test(input.charAt(pos))) {
              result3 = input.charAt(pos);
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("[A-Z.]");
              }
            }
            if (result3 !== null) {
              result2 = [];
              while (result3 !== null) {
                result2.push(result3);
                if (/^[A-Z.]/.test(input.charAt(pos))) {
                  result3 = input.charAt(pos);
                  pos++;
                } else {
                  result3 = null;
                  if (reportFailures === 0) {
                    matchFailed("[A-Z.]");
                  }
                }
              }
            } else {
              result2 = null;
            }
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 58) {
                result3 = ":";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\":\"");
                }
              }
              if (result3 !== null) {
                if (/^[A-Z]/.test(input.charAt(pos))) {
                  result5 = input.charAt(pos);
                  pos++;
                } else {
                  result5 = null;
                  if (reportFailures === 0) {
                    matchFailed("[A-Z]");
                  }
                }
                if (result5 !== null) {
                  result4 = [];
                  while (result5 !== null) {
                    result4.push(result5);
                    if (/^[A-Z]/.test(input.charAt(pos))) {
                      result5 = input.charAt(pos);
                      pos++;
                    } else {
                      result5 = null;
                      if (reportFailures === 0) {
                        matchFailed("[A-Z]");
                      }
                    }
                  }
                } else {
                  result4 = null;
                }
                if (result4 !== null) {
                  result5 = parse__();
                  if (result5 !== null) {
                    result6 = parse_LineTerminator();
                    result6 = result6 !== null ? result6 : "";
                    if (result6 !== null) {
                      result0 = [result0, result1, result2, result3, result4, result5, result6];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, priv, pub) {return parser.registerExports(priv.join(""),pub.join(""))})(pos0, result0[2], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          result0 = parse_comment();
          if (result0 !== null) {
            if (/^[\n\r\u2028\u2029]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[\\n\\r\\u2028\\u2029]");
              }
            }
            result1 = result1 !== null ? result1 : "";
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            result0 = parse__();
            if (result0 !== null) {
              if (/^[\n\r\u2028\u2029]/.test(input.charAt(pos))) {
                result1 = input.charAt(pos);
                pos++;
              } else {
                result1 = null;
                if (reportFailures === 0) {
                  matchFailed("[\\n\\r\\u2028\\u2029]");
                }
              }
              if (result1 !== null) {
                result0 = [result0, result1];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              result0 = parse__();
              if (result0 !== null) {
                result1 = parse_connection();
                if (result1 !== null) {
                  result2 = parse__();
                  if (result2 !== null) {
                    result3 = parse_LineTerminator();
                    result3 = result3 !== null ? result3 : "";
                    if (result3 !== null) {
                      result0 = [result0, result1, result2, result3];
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = (function(offset, edges) {return parser.registerEdges(edges);})(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
          }
        }
        return result0;
      }
      
      function parse_LineTerminator() {
        var result0, result1, result2, result3;
        var pos0;
        
        pos0 = pos;
        result0 = parse__();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 44) {
            result1 = ",";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\",\"");
            }
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_comment();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              if (/^[\n\r\u2028\u2029]/.test(input.charAt(pos))) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[\\n\\r\\u2028\\u2029]");
                }
              }
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      
      function parse_comment() {
        var result0, result1, result2, result3;
        var pos0;
        
        pos0 = pos;
        result0 = parse__();
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 35) {
            result1 = "#";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"#\"");
            }
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse_anychar();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse_anychar();
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      
      function parse_connection() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_bridge();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            if (input.substr(pos, 2) === "->") {
              result2 = "->";
              pos += 2;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"->\"");
              }
            }
            if (result2 !== null) {
              result3 = parse__();
              if (result3 !== null) {
                result4 = parse_connection();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, x, y) { return [x,y]; })(pos0, result0[0], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          result0 = parse_bridge();
        }
        return result0;
      }
      
      function parse_bridge() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_port();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_node();
            if (result2 !== null) {
              result3 = parse__();
              if (result3 !== null) {
                result4 = parse_port();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, x, proc, y) { return [{"tgt":{process:proc, port:x}},{"src":{process:proc, port:y}}]; })(pos0, result0[0], result0[2], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          result0 = parse_iip();
          if (result0 === null) {
            result0 = parse_rightlet();
            if (result0 === null) {
              result0 = parse_leftlet();
            }
          }
        }
        return result0;
      }
      
      function parse_leftlet() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_node();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_port();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, proc, port) { return {"src":{process:proc, port:port}} })(pos0, result0[0], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_iip() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 39) {
          result0 = "'";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"'\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse_anychar();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse_anychar();
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 39) {
              result2 = "'";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"'\"");
              }
            }
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, iip) { return {"data":iip.join("")} })(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_rightlet() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_port();
        if (result0 !== null) {
          result1 = parse__();
          if (result1 !== null) {
            result2 = parse_node();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, port, proc) { return {"tgt":{process:proc, port:port}} })(pos0, result0[0], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_node() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (/^[a-zA-Z]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[a-zA-Z]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[a-zA-Z]");
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = parse_component();
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, node, comp) { if(comp){parser.addNode(node.join(""),comp);}; return node.join("")})(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_component() {
        var result0, result1, result2, result3;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 40) {
          result0 = "(";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"(\"");
          }
        }
        if (result0 !== null) {
          if (/^[a-zA-Z\/]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[a-zA-Z\\/]");
            }
          }
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              if (/^[a-zA-Z\/]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("[a-zA-Z\\/]");
                }
              }
            }
          } else {
            result1 = null;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_compMeta();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 41) {
                result3 = ")";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\")\"");
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, comp, meta) { var o = {}; comp ? o.comp = comp.join("") : o.comp = ''; meta ? o.meta = meta.join("").split(',') : null; return o; })(pos0, result0[1], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_compMeta() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 58) {
          result0 = ":";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\":\"");
          }
        }
        if (result0 !== null) {
          if (/^[a-zA-Z\/]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[a-zA-Z\\/]");
            }
          }
          if (result2 !== null) {
            result1 = [];
            while (result2 !== null) {
              result1.push(result2);
              if (/^[a-zA-Z\/]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("[a-zA-Z\\/]");
                }
              }
            }
          } else {
            result1 = null;
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, meta) {return meta})(pos0, result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_port() {
        var result0, result1;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (/^[A-Z.0-9]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[A-Z.0-9]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[A-Z.0-9]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[A-Z.0-9]");
              }
            }
          }
        } else {
          result0 = null;
        }
        if (result0 !== null) {
          result1 = parse___();
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, portname) {return portname.join("").toLowerCase()})(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_anychar() {
        var result0;
        
        if (/^[a-zA-Z0-9 .,:@+?!^=()_\-$*\/\\]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z0-9 .,:@+?!^=()_\\-$*\\/\\\\]");
          }
        }
        return result0;
      }
      
      function parse__() {
        var result0, result1;
        
        result0 = [];
        if (input.charCodeAt(pos) === 32) {
          result1 = " ";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        while (result1 !== null) {
          result0.push(result1);
          if (input.charCodeAt(pos) === 32) {
            result1 = " ";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\" \"");
            }
          }
        }
        result0 = result0 !== null ? result0 : "";
        return result0;
      }
      
      function parse___() {
        var result0, result1;
        
        if (input.charCodeAt(pos) === 32) {
          result1 = " ";
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("\" \"");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (input.charCodeAt(pos) === 32) {
              result1 = " ";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\" \"");
              }
            }
          }
        } else {
          result0 = null;
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
        var parser, edges, nodes; 
      
        parser = this;
      
        edges = parser.edges = [];
        
        parser.exports = []
      
        nodes = {};
      
        parser.addNode = function (nodeName, comp) {
          if (!nodes[nodeName]) {
            nodes[nodeName] = {}
          }
          if (!!comp.comp) {
            nodes[nodeName].component = comp.comp;
          }
          if (!!comp.meta) {
            nodes[nodeName].metadata={routes:comp.meta};
          }
         
        }
      
        parser.getResult = function () {
          return {processes:nodes, connections:parser.processEdges(), exports:parser.exports};
        }  
      
        var flatten = function (array, isShallow) {
          var index = -1,
            length = array ? array.length : 0,
            result = [];
      
          while (++index < length) {
            var value = array[index];
      
            if (value instanceof Array) {
              Array.prototype.push.apply(result, isShallow ? value : flatten(value));
            }
            else {
              result.push(value);
            }
          }
          return result;
        }
        
        parser.registerExports = function (priv, pub) {
          parser.exports.push({private:priv.toLowerCase(), public:pub.toLowerCase()})
        }
      
        parser.registerEdges = function (edges) {
      
          edges.forEach(function (o, i) {
            parser.edges.push(o);
          });
        }  
      
        parser.processEdges = function () {   
          var flats, grouped;
          flats = flatten(parser.edges);
          grouped = [];
          var current = {};
          flats.forEach(function (o, i) {
            if (i % 2 !== 0) { 
              var pair = grouped[grouped.length - 1];
              pair.tgt = o.tgt;
              return;
            }
            grouped.push(o);
          });
          return grouped;
        }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
});
require.register("bergie-noflo/src/lib/Graph.js", function(exports, require, module){
var EventEmitter, Graph, fbp, fs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  fs = require('fs');
  EventEmitter = require('events').EventEmitter;
} else {
  EventEmitter = require('emitter');
}

fbp = require('fbp');

Graph = (function(_super) {
  __extends(Graph, _super);

  Graph.prototype.name = '';

  Graph.prototype.nodes = [];

  Graph.prototype.edges = [];

  Graph.prototype.initializers = [];

  Graph.prototype.exports = [];

  function Graph(name) {
    this.name = name != null ? name : '';
    this.nodes = [];
    this.edges = [];
    this.initializers = [];
    this.exports = [];
  }

  Graph.prototype.addExport = function(privatePort, publicPort) {
    return this.exports.push({
      "private": privatePort.toLowerCase(),
      "public": publicPort.toLowerCase()
    });
  };

  Graph.prototype.addNode = function(id, component, metadata) {
    var node;

    if (!metadata) {
      metadata = {};
    }
    node = {
      id: id,
      component: component,
      metadata: metadata
    };
    if (metadata.display) {
      node.display = metadata.display;
    }
    this.nodes.push(node);
    this.emit('addNode', node);
    return node;
  };

  Graph.prototype.removeNode = function(id) {
    var edge, initializer, node, _i, _j, _len, _len1, _ref, _ref1;

    node = this.getNode(id);
    _ref = this.edges;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      edge = _ref[_i];
      if (edge.from.node === node.id) {
        this.removeEdge(edge.from.node, edge.from.port);
      }
      if (edge.to.node === node.id) {
        this.removeEdge(edge.to.node, edge.to.port);
      }
    }
    _ref1 = this.initializers;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      initializer = _ref1[_j];
      if (initializer.to.node === node.id) {
        this.removeEdge(initializer.to.node, initializer.to.port);
      }
    }
    this.emit('removeNode', node);
    if (-1 !== this.nodes.indexOf(node)) {
      return this.nodes.splice(this.nodes.indexOf(node), 1);
    }
  };

  Graph.prototype.getNode = function(id) {
    var node, _i, _len, _ref;

    _ref = this.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      if (node.id === id) {
        return node;
      }
    }
    return null;
  };

  Graph.prototype.addEdge = function(outNode, outPort, inNode, inPort) {
    var edge;

    edge = {
      from: {
        node: outNode,
        port: outPort
      },
      to: {
        node: inNode,
        port: inPort
      }
    };
    this.edges.push(edge);
    this.emit('addEdge', edge);
    return edge;
  };

  Graph.prototype.removeEdge = function(node, port) {
    var edge, index, _i, _j, _len, _len1, _ref, _ref1, _results;

    _ref = this.edges;
    for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
      edge = _ref[index];
      if (!edge) {
        continue;
      }
      if (edge.from.node === node && edge.from.port === port) {
        this.emit('removeEdge', edge);
        this.edges.splice(index, 1);
      }
      if (edge.to.node === node && edge.to.port === port) {
        this.emit('removeEdge', edge);
        this.edges.splice(index, 1);
      }
    }
    _ref1 = this.initializers;
    _results = [];
    for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
      edge = _ref1[index];
      if (!edge) {
        continue;
      }
      if (edge.to.node === node && edge.to.port === port) {
        this.emit('removeEdge', edge);
        _results.push(this.initializers.splice(index, 1));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  Graph.prototype.addInitial = function(data, node, port, metadata) {
    var initializer;

    initializer = {
      from: {
        data: data
      },
      to: {
        node: node,
        port: port
      },
      metadata: metadata
    };
    this.initializers.push(initializer);
    this.emit('addEdge', initializer);
    return initializer;
  };

  Graph.prototype.toDOT = function() {
    var cleanID, cleanPort, dot, edge, id, initializer, node, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _ref2;

    cleanID = function(id) {
      return id.replace(/\s*/g, "");
    };
    cleanPort = function(port) {
      return port.replace(/\./g, "");
    };
    dot = "digraph {\n";
    _ref = this.nodes;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      node = _ref[_i];
      dot += "    " + (cleanID(node.id)) + " [label=" + node.id + " shape=box]\n";
    }
    _ref1 = this.initializers;
    for (id = _j = 0, _len1 = _ref1.length; _j < _len1; id = ++_j) {
      initializer = _ref1[id];
      dot += "    data" + id + " [label=\"'" + initializer.from.data + "'\" shape=plaintext]\n";
      dot += "    data" + id + " -> " + (cleanID(initializer.to.node)) + "[headlabel=" + (cleanPort(initializer.to.port)) + " labelfontcolor=blue labelfontsize=8.0]\n";
    }
    _ref2 = this.edges;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      edge = _ref2[_k];
      dot += "    " + (cleanID(edge.from.node)) + " -> " + (cleanID(edge.to.node)) + "[taillabel=" + (cleanPort(edge.from.port)) + " headlabel=" + (cleanPort(edge.to.port)) + " labelfontcolor=blue labelfontsize=8.0]\n";
    }
    dot += "}";
    return dot;
  };

  Graph.prototype.toYUML = function() {
    var edge, initializer, yuml, _i, _j, _len, _len1, _ref, _ref1;

    yuml = [];
    _ref = this.initializers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      initializer = _ref[_i];
      yuml.push("(start)[" + initializer.to.port + "]->(" + initializer.to.node + ")");
    }
    _ref1 = this.edges;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      edge = _ref1[_j];
      yuml.push("(" + edge.from.node + ")[" + edge.from.port + "]->(" + edge.to.node + ")");
    }
    return yuml.join(",");
  };

  Graph.prototype.toJSON = function() {
    var edge, exported, initializer, json, node, _i, _j, _k, _l, _len, _len1, _len2, _len3, _ref, _ref1, _ref2, _ref3;

    json = {
      properties: {
        name: this.name
      },
      exports: [],
      processes: {},
      connections: []
    };
    _ref = this.exports;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      exported = _ref[_i];
      json.exports.push({
        "private": exported["private"],
        "public": exported["public"]
      });
    }
    _ref1 = this.nodes;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      node = _ref1[_j];
      json.processes[node.id] = {
        component: node.component
      };
      if (node.display) {
        json.processes[node.id].display = node.display;
      }
    }
    _ref2 = this.edges;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      edge = _ref2[_k];
      json.connections.push({
        src: {
          process: edge.from.node,
          port: edge.from.port
        },
        tgt: {
          process: edge.to.node,
          port: edge.to.port
        }
      });
    }
    _ref3 = this.initializers;
    for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
      initializer = _ref3[_l];
      json.connections.push({
        data: initializer.from.data,
        tgt: {
          process: initializer.to.node,
          port: initializer.to.port
        }
      });
    }
    return json;
  };

  Graph.prototype.save = function(file, success) {
    var json;

    json = JSON.stringify(this.toJSON(), null, 4);
    return fs.writeFile("" + file + ".json", json, "utf-8", function(err, data) {
      if (err) {
        throw err;
      }
      return success(file);
    });
  };

  return Graph;

})(EventEmitter);

exports.Graph = Graph;

exports.createGraph = function(name) {
  return new Graph(name);
};

exports.loadJSON = function(definition, success) {
  var conn, def, exported, graph, id, _i, _j, _len, _len1, _ref, _ref1, _ref2;

  if (!definition.properties) {
    definition.properties = {};
  }
  if (!definition.processes) {
    definition.processes = {};
  }
  if (!definition.connections) {
    definition.connections = [];
  }
  graph = new Graph(definition.properties.name);
  _ref = definition.processes;
  for (id in _ref) {
    def = _ref[id];
    if (def.display) {
      if (!def.metadata) {
        def.metadata = {};
      }
      def.metadata.display = def.display;
    }
    graph.addNode(id, def.component, def.metadata);
  }
  _ref1 = definition.connections;
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    conn = _ref1[_i];
    if (conn.data !== void 0) {
      graph.addInitial(conn.data, conn.tgt.process, conn.tgt.port.toLowerCase());
      continue;
    }
    graph.addEdge(conn.src.process, conn.src.port.toLowerCase(), conn.tgt.process, conn.tgt.port.toLowerCase());
  }
  if (definition.exports) {
    _ref2 = definition.exports;
    for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
      exported = _ref2[_j];
      graph.addExport(exported["private"], exported["public"]);
    }
  }
  return success(graph);
};

exports.loadFile = function(file, success) {
  return fs.readFile(file, "utf-8", function(err, data) {
    var definition;

    if (err) {
      throw err;
    }
    if (file.split('.').pop() === 'fbp') {
      return exports.loadFBP(data, success);
    }
    definition = JSON.parse(data);
    return exports.loadJSON(definition, success);
  });
};

exports.loadFBP = function(fbpData, success) {
  var definition;

  definition = fbp.parse(fbpData);
  return exports.loadJSON(definition, success);
};

});
require.register("bergie-noflo/src/lib/InternalSocket.js", function(exports, require, module){
var EventEmitter, InternalSocket,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  EventEmitter = require('events').EventEmitter;
} else {
  EventEmitter = require('emitter');
}

InternalSocket = (function(_super) {
  __extends(InternalSocket, _super);

  function InternalSocket() {
    this.connected = false;
    this.groups = [];
  }

  InternalSocket.prototype.connect = function() {
    if (this.connected) {
      return;
    }
    this.connected = true;
    return this.emit('connect', this);
  };

  InternalSocket.prototype.disconnect = function() {
    if (!this.connected) {
      return;
    }
    this.connected = false;
    return this.emit('disconnect', this);
  };

  InternalSocket.prototype.isConnected = function() {
    return this.connected;
  };

  InternalSocket.prototype.send = function(data) {
    if (!this.connected) {
      this.connect();
    }
    return this.emit('data', data);
  };

  InternalSocket.prototype.beginGroup = function(group) {
    this.groups.push(group);
    return this.emit('begingroup', group);
  };

  InternalSocket.prototype.endGroup = function() {
    return this.emit('endgroup', this.groups.pop());
  };

  InternalSocket.prototype.getId = function() {
    var fromStr, toStr;

    fromStr = function(from) {
      return "" + from.process.id + "() " + (from.port.toUpperCase());
    };
    toStr = function(to) {
      return "" + (to.port.toUpperCase()) + " " + to.process.id + "()";
    };
    if (!(this.from || this.to)) {
      return "UNDEFINED";
    }
    if (this.from && !this.to) {
      return "" + (fromStr(this.from)) + " -> ANON";
    }
    if (!this.from) {
      return "DATA -> " + (toStr(this.to));
    }
    return "" + (fromStr(this.from)) + " -> " + (toStr(this.to));
  };

  return InternalSocket;

})(EventEmitter);

exports.InternalSocket = InternalSocket;

exports.createSocket = function() {
  return new InternalSocket;
};

});
require.register("bergie-noflo/src/lib/Port.js", function(exports, require, module){
var EventEmitter, Port,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  EventEmitter = require('events').EventEmitter;
} else {
  EventEmitter = require('emitter');
}

Port = (function(_super) {
  __extends(Port, _super);

  function Port(type) {
    this.type = type;
    if (!this.type) {
      this.type = 'all';
    }
    this.socket = null;
    this.from = null;
  }

  Port.prototype.attach = function(socket) {
    if (this.isAttached()) {
      throw new Error("" + this.name + ": Socket already attached " + (this.socket.getId()) + " - " + (socket.getId()));
    }
    this.socket = socket;
    return this.attachSocket(socket);
  };

  Port.prototype.attachSocket = function(socket, localId) {
    var _this = this;

    if (localId == null) {
      localId = null;
    }
    this.emit("attach", socket);
    this.from = socket.from;
    if (socket.setMaxListeners) {
      socket.setMaxListeners(0);
    }
    socket.on("connect", function() {
      return _this.emit("connect", socket, localId);
    });
    socket.on("begingroup", function(group) {
      return _this.emit("begingroup", group, localId);
    });
    socket.on("data", function(data) {
      return _this.emit("data", data, localId);
    });
    socket.on("endgroup", function(group) {
      return _this.emit("endgroup", group, localId);
    });
    return socket.on("disconnect", function() {
      return _this.emit("disconnect", socket, localId);
    });
  };

  Port.prototype.connect = function() {
    if (!this.socket) {
      throw new Error("No connection available");
    }
    return this.socket.connect();
  };

  Port.prototype.beginGroup = function(group) {
    var _this = this;

    if (!this.socket) {
      throw new Error("No connection available");
    }
    if (this.isConnected()) {
      return this.socket.beginGroup(group);
    }
    this.socket.once("connect", function() {
      return _this.socket.beginGroup(group);
    });
    return this.socket.connect();
  };

  Port.prototype.send = function(data) {
    var _this = this;

    if (!this.socket) {
      throw new Error("No connection available");
    }
    if (this.isConnected()) {
      return this.socket.send(data);
    }
    this.socket.once("connect", function() {
      return _this.socket.send(data);
    });
    return this.socket.connect();
  };

  Port.prototype.endGroup = function() {
    if (!this.socket) {
      throw new Error("No connection available");
    }
    return this.socket.endGroup();
  };

  Port.prototype.disconnect = function() {
    if (!this.socket) {
      throw new Error("No connection available");
    }
    return this.socket.disconnect();
  };

  Port.prototype.detach = function(socket) {
    if (!this.isAttached(socket)) {
      return;
    }
    this.emit("detach", this.socket);
    this.from = null;
    return this.socket = null;
  };

  Port.prototype.isConnected = function() {
    if (!this.socket) {
      return false;
    }
    return this.socket.isConnected();
  };

  Port.prototype.isAttached = function() {
    return this.socket !== null;
  };

  return Port;

})(EventEmitter);

exports.Port = Port;

});
require.register("bergie-noflo/src/lib/ArrayPort.js", function(exports, require, module){
var ArrayPort, port,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

port = require("./Port");

ArrayPort = (function(_super) {
  __extends(ArrayPort, _super);

  function ArrayPort(type) {
    this.type = type;
    if (!this.type) {
      this.type = 'all';
    }
    this.sockets = [];
  }

  ArrayPort.prototype.attach = function(socket) {
    this.sockets.push(socket);
    return this.attachSocket(socket, this.sockets.length - 1);
  };

  ArrayPort.prototype.connect = function(socketId) {
    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      if (!this.sockets.length) {
        throw new Error("No sockets available");
      }
      this.sockets.forEach(function(socket) {
        return socket.connect();
      });
      return;
    }
    if (!this.sockets[socketId]) {
      throw new Error("No socket '" + socketId + "' available");
    }
    return this.sockets[socketId].connect();
  };

  ArrayPort.prototype.beginGroup = function(group, socketId) {
    var _this = this;

    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      if (!this.sockets.length) {
        throw new Error("No sockets available");
      }
      this.sockets.forEach(function(socket, index) {
        return _this.beginGroup(group, index);
      });
      return;
    }
    if (!this.sockets[socketId]) {
      throw new Error("No socket '" + socketId + "' available");
    }
    if (this.isConnected(socketId)) {
      return this.sockets[socketId].beginGroup(group);
    }
    this.sockets[socketId].once("connect", function() {
      return _this.sockets[socketId].beginGroup(group);
    });
    return this.sockets[socketId].connect();
  };

  ArrayPort.prototype.send = function(data, socketId) {
    var _this = this;

    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      if (!this.sockets.length) {
        throw new Error("No sockets available");
      }
      this.sockets.forEach(function(socket, index) {
        return _this.send(data, index);
      });
      return;
    }
    if (!this.sockets[socketId]) {
      throw new Error("No socket '" + socketId + "' available");
    }
    if (this.isConnected(socketId)) {
      return this.sockets[socketId].send(data);
    }
    this.sockets[socketId].once("connect", function() {
      return _this.sockets[socketId].send(data);
    });
    return this.sockets[socketId].connect();
  };

  ArrayPort.prototype.endGroup = function(socketId) {
    var _this = this;

    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      if (!this.sockets.length) {
        throw new Error("No sockets available");
      }
      this.sockets.forEach(function(socket, index) {
        return _this.endGroup(index);
      });
      return;
    }
    if (!this.sockets[socketId]) {
      throw new Error("No socket '" + socketId + "' available");
    }
    return this.sockets[socketId].endGroup();
  };

  ArrayPort.prototype.disconnect = function(socketId) {
    var socket, _i, _len, _ref;

    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      if (!this.sockets.length) {
        throw new Error("No sockets available");
      }
      _ref = this.sockets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        socket = _ref[_i];
        socket.disconnect();
      }
      return;
    }
    if (!this.sockets[socketId]) {
      return;
    }
    return this.sockets[socketId].disconnect();
  };

  ArrayPort.prototype.detach = function(socket) {
    if (this.sockets.indexOf(socket) === -1) {
      return;
    }
    this.sockets.splice(this.sockets.indexOf(socket), 1);
    return this.emit("detach", socket);
  };

  ArrayPort.prototype.isConnected = function(socketId) {
    var connected,
      _this = this;

    if (socketId == null) {
      socketId = null;
    }
    if (socketId === null) {
      connected = false;
      this.sockets.forEach(function(socket) {
        if (socket.isConnected()) {
          return connected = true;
        }
      });
      return connected;
    }
    if (!this.sockets[socketId]) {
      return false;
    }
    return this.sockets[socketId].isConnected();
  };

  ArrayPort.prototype.isAttached = function(socketId) {
    if (socketId === void 0) {
      return false;
    }
    if (this.sockets[socketId]) {
      return true;
    }
    return false;
  };

  return ArrayPort;

})(port.Port);

exports.ArrayPort = ArrayPort;

});
require.register("bergie-noflo/src/lib/Component.js", function(exports, require, module){
var Component, EventEmitter, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  EventEmitter = require('events').EventEmitter;
} else {
  EventEmitter = require('emitter');
}

Component = (function(_super) {
  __extends(Component, _super);

  function Component() {
    _ref = Component.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Component.prototype.description = "";

  Component.prototype.getDescription = function() {
    return this.description;
  };

  Component.prototype.isReady = function() {
    return true;
  };

  Component.prototype.isSubgraph = function() {
    return false;
  };

  return Component;

})(EventEmitter);

exports.Component = Component;

});
require.register("bergie-noflo/src/lib/AsyncComponent.js", function(exports, require, module){
var AsyncComponent, component, port,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

port = require("./Port");

component = require("./Component");

AsyncComponent = (function(_super) {
  __extends(AsyncComponent, _super);

  function AsyncComponent(inPortName, outPortName, errPortName) {
    var _this = this;

    this.inPortName = inPortName != null ? inPortName : "in";
    this.outPortName = outPortName != null ? outPortName : "out";
    this.errPortName = errPortName != null ? errPortName : "error";
    if (!this.inPorts[this.inPortName]) {
      throw new Error("no inPort named '" + this.inPortName + "'");
    }
    if (!this.outPorts[this.outPortName]) {
      throw new Error("no outPort named '" + this.outPortName + "'");
    }
    this.load = 0;
    this.q = [];
    this.outPorts.load = new port.Port();
    this.inPorts[this.inPortName].on("begingroup", function(group) {
      if (_this.load > 0) {
        return _this.q.push({
          name: "begingroup",
          data: group
        });
      }
      return _this.outPorts[_this.outPortName].beginGroup(group);
    });
    this.inPorts[this.inPortName].on("endgroup", function() {
      if (_this.load > 0) {
        return _this.q.push({
          name: "endgroup"
        });
      }
      return _this.outPorts[_this.outPortName].endGroup();
    });
    this.inPorts[this.inPortName].on("disconnect", function() {
      if (_this.load > 0) {
        return _this.q.push({
          name: "disconnect"
        });
      }
      _this.outPorts[_this.outPortName].disconnect();
      if (_this.outPorts.load.isAttached()) {
        return _this.outPorts.load.disconnect();
      }
    });
    this.inPorts[this.inPortName].on("data", function(data) {
      if (_this.q.length > 0) {
        return _this.q.push({
          name: "data",
          data: data
        });
      }
      return _this.processData(data);
    });
  }

  AsyncComponent.prototype.processData = function(data) {
    var _this = this;

    this.incrementLoad();
    return this.doAsync(data, function(err) {
      if (err) {
        if (_this.outPorts[_this.errPortName] && _this.outPorts[_this.errPortName].isAttached()) {
          _this.outPorts[_this.errPortName].send(err);
          _this.outPorts[_this.errPortName].disconnect();
        } else {
          throw err;
        }
      }
      return _this.decrementLoad();
    });
  };

  AsyncComponent.prototype.incrementLoad = function() {
    this.load++;
    if (this.outPorts.load.isAttached()) {
      this.outPorts.load.send(this.load);
    }
    if (this.outPorts.load.isAttached()) {
      return this.outPorts.load.disconnect();
    }
  };

  AsyncComponent.prototype.doAsync = function(data, callback) {
    return callback(new Error("AsyncComponents must implement doAsync"));
  };

  AsyncComponent.prototype.decrementLoad = function() {
    var _this = this;

    if (this.load === 0) {
      throw new Error("load cannot be negative");
    }
    this.load--;
    if (this.outPorts.load.isAttached()) {
      this.outPorts.load.send(this.load);
    }
    if (this.outPorts.load.isAttached()) {
      this.outPorts.load.disconnect();
    }
    if (typeof process === 'object' && process.title === 'node') {
      return process.nextTick(function() {
        return _this.processQueue();
      });
    } else {
      return setTimeout(function() {
        return _this.processQueue();
      }, 0);
    }
  };

  AsyncComponent.prototype.processQueue = function() {
    var event, processedData;

    if (this.load > 0) {
      return;
    }
    processedData = false;
    while (this.q.length > 0) {
      event = this.q[0];
      switch (event.name) {
        case "begingroup":
          if (processedData) {
            return;
          }
          this.outPorts[this.outPortName].beginGroup(event.data);
          this.q.shift();
          break;
        case "endgroup":
          if (processedData) {
            return;
          }
          this.outPorts[this.outPortName].endGroup();
          this.q.shift();
          break;
        case "disconnect":
          if (processedData) {
            return;
          }
          this.outPorts[this.outPortName].disconnect();
          if (this.outPorts.load.isAttached()) {
            this.outPorts.load.disconnect();
          }
          this.q.shift();
          break;
        case "data":
          this.processData(event.data);
          this.q.shift();
          processedData = true;
      }
    }
  };

  return AsyncComponent;

})(component.Component);

exports.AsyncComponent = AsyncComponent;

});
require.register("bergie-noflo/src/lib/LoggingComponent.js", function(exports, require, module){
var Component, Port, util,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Component = require("./Component").Component;

Port = require("./Port").Port;

if (typeof process === 'object' && process.title === 'node') {
  util = require("util");
} else {
  util = {
    inspect: function(data) {
      return data;
    }
  };
}

exports.LoggingComponent = (function(_super) {
  __extends(LoggingComponent, _super);

  function LoggingComponent() {
    this.sendLog = __bind(this.sendLog, this);    this.outPorts = {
      log: new Port()
    };
  }

  LoggingComponent.prototype.sendLog = function(message) {
    if (typeof message === "object") {
      message.when = new Date;
      message.source = this.constructor.name;
      if (this.nodeId != null) {
        message.nodeID = this.nodeId;
      }
    }
    if ((this.outPorts.log != null) && this.outPorts.log.isAttached()) {
      return this.outPorts.log.send(message);
    } else {
      return console.log(util.inspect(message, 4, true, true));
    }
  };

  return LoggingComponent;

})(Component);

});
require.register("bergie-noflo/src/lib/ComponentLoader.js", function(exports, require, module){
var ComponentLoader;

ComponentLoader = (function() {
  function ComponentLoader(baseDir) {
    this.baseDir = baseDir;
    this.components = null;
    this.checked = [];
    this.revalidate = false;
  }

  ComponentLoader.prototype.getModulePrefix = function(name) {
    if (!name) {
      return '';
    }
    if (name === 'noflo') {
      return '';
    }
    return name.replace('noflo-', '');
  };

  ComponentLoader.prototype.getModuleComponents = function(moduleName) {
    var cPath, definition, dependency, e, name, prefix, _ref, _results;

    if (this.checked.indexOf(moduleName) !== -1) {
      return;
    }
    this.checked.push(moduleName);
    try {
      definition = require("/" + moduleName + "/component.json");
    } catch (_error) {
      e = _error;
      return;
    }
    for (dependency in definition.dependencies) {
      this.getModuleComponents(dependency.replace('/', '-'));
    }
    if (!definition.noflo) {
      return;
    }
    prefix = this.getModulePrefix(definition.name);
    if (definition.noflo.components) {
      _ref = definition.noflo.components;
      _results = [];
      for (name in _ref) {
        cPath = _ref[name];
        _results.push(this.registerComponent(prefix, name, "/" + moduleName + "/" + cPath));
      }
      return _results;
    }
  };

  ComponentLoader.prototype.listComponents = function(callback) {
    if (this.components !== null) {
      return callback(this.components);
    }
    this.components = {};
    this.getModuleComponents(this.baseDir);
    return callback(this.components);
  };

  ComponentLoader.prototype.load = function(name, callback) {
    var implementation, instance,
      _this = this;

    if (!this.components) {
      this.listComponents(function(components) {
        return _this.load(name, callback);
      });
      return;
    }
    if (!this.components[name]) {
      throw new Error("Component " + name + " not available");
      return;
    }
    if (this.isGraph(this.components[name])) {
      process.nextTick(function() {
        return _this.loadGraph(name, callback);
      });
      return;
    }
    implementation = require(this.components[name]);
    instance = implementation.getComponent();
    if (name === 'Graph') {
      instance.baseDir = this.baseDir;
    }
    return callback(instance);
  };

  ComponentLoader.prototype.isGraph = function(cPath) {
    return false;
  };

  ComponentLoader.prototype.registerComponent = function(packageId, name, cPath, callback) {
    var fullName, prefix;

    prefix = this.getModulePrefix(packageId);
    fullName = "" + prefix + "/" + name;
    if (!packageId) {
      fullName = name;
    }
    this.components[fullName] = cPath;
    if (callback) {
      return callback();
    }
  };

  ComponentLoader.prototype.registerGraph = function(packageId, name, gPath, callback) {
    return this.registerComponent(packageId, name, gPath, callback);
  };

  ComponentLoader.prototype.clear = function() {
    this.components = null;
    this.checked = [];
    return this.revalidate = true;
  };

  return ComponentLoader;

})();

exports.ComponentLoader = ComponentLoader;

});
require.register("bergie-noflo/src/lib/NoFlo.js", function(exports, require, module){
var LoggingComponent, Network, arrayport, asynccomponent, component, componentLoader, graph, internalSocket, port;

internalSocket = require("./InternalSocket");

component = require("./Component");

asynccomponent = require("./AsyncComponent");

port = require("./Port");

arrayport = require("./ArrayPort");

graph = require("./Graph");

Network = require("./Network").Network;

LoggingComponent = require("./LoggingComponent").LoggingComponent;

if (typeof process === 'object' && process.title === 'node') {
  componentLoader = require("./nodejs/ComponentLoader");
} else {
  componentLoader = require('./ComponentLoader');
}

exports.createNetwork = function(graph, callback) {
  var network, networkReady;

  network = new Network(graph);
  networkReady = function(network) {
    if (callback != null) {
      callback(network);
    }
    return network.sendInitials();
  };
  if (graph.nodes.length === 0) {
    setTimeout(function() {
      return networkReady(network);
    }, 0);
    return network;
  }
  network.loader.listComponents(function() {
    return network.connect(function() {
      return networkReady(network);
    });
  });
  return network;
};

exports.loadFile = function(file, callback) {
  return graph.loadFile(file, function(net) {
    return exports.createNetwork(net, callback);
  });
};

exports.saveFile = function(graph, file, callback) {
  return graph.save(file, function() {
    return callback(file);
  });
};

exports.Component = component.Component;

exports.ComponentLoader = componentLoader.ComponentLoader;

exports.AsyncComponent = asynccomponent.AsyncComponent;

exports.LoggingComponent = LoggingComponent;

exports.Port = port.Port;

exports.ArrayPort = arrayport.ArrayPort;

exports.Graph = graph.Graph;

exports.Network = Network;

exports.graph = graph;

exports.internalSocket = internalSocket;

});
require.register("bergie-noflo/src/lib/Network.js", function(exports, require, module){
var EventEmitter, Network, componentLoader, graph, internalSocket, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

_ = require("underscore");

internalSocket = require("./InternalSocket");

graph = require("./Graph");

if (typeof process === 'object' && process.title === 'node') {
  componentLoader = require("./nodejs/ComponentLoader");
  EventEmitter = require('events').EventEmitter;
} else {
  componentLoader = require('./ComponentLoader');
  EventEmitter = require('emitter');
}

Network = (function(_super) {
  __extends(Network, _super);

  Network.prototype.processes = {};

  Network.prototype.connections = [];

  Network.prototype.initials = [];

  Network.prototype.graph = null;

  Network.prototype.startupDate = null;

  Network.prototype.portBuffer = {};

  function Network(graph) {
    var _this = this;

    this.processes = {};
    this.connections = [];
    this.initials = [];
    this.graph = graph;
    if (typeof process === 'object' && process.title === 'node') {
      this.baseDir = graph.baseDir || process.cwd();
    } else {
      this.baseDir = graph.baseDir || '/';
    }
    this.startupDate = new Date();
    this.handleStartEnd();
    this.graph.on('addNode', function(node) {
      return _this.addNode(node);
    });
    this.graph.on('removeNode', function(node) {
      return _this.removeNode(node);
    });
    this.graph.on('addEdge', function(edge) {
      return _this.addEdge(edge);
    });
    this.graph.on('removeEdge', function(edge) {
      return _this.removeEdge(edge);
    });
    this.loader = new componentLoader.ComponentLoader(this.baseDir);
  }

  Network.prototype.uptime = function() {
    return new Date() - this.startupDate;
  };

  Network.prototype.handleStartEnd = function() {
    var connections, ended, started, timeOut,
      _this = this;

    connections = 0;
    started = false;
    ended = false;
    timeOut = null;
    this.on('connect', function(data) {
      if (!data.socket.from) {
        return;
      }
      if (timeOut) {
        clearTimeout(timeOut);
      }
      if (connections === 0 && !started) {
        _this.emit('start', {
          start: _this.startupDate
        });
        started = true;
      }
      return connections++;
    });
    return this.on('disconnect', function(data) {
      if (!data.socket.from) {
        return;
      }
      connections--;
      if (!(connections <= 0)) {
        return;
      }
      return timeOut = setTimeout(function() {
        if (ended) {
          return;
        }
        _this.emit('end', {
          start: _this.startupDate,
          end: new Date,
          uptime: _this.uptime()
        });
        started = false;
        return ended = true;
      }, 10);
    });
  };

  Network.prototype.load = function(component, callback) {
    if (typeof component === 'object') {
      return callback(component);
    }
    return this.loader.load(component, callback);
  };

  Network.prototype.addNode = function(node, callback) {
    var process,
      _this = this;

    if (this.processes[node.id]) {
      return;
    }
    process = {
      id: node.id
    };
    if (!node.component) {
      this.processes[process.id] = process;
      if (callback) {
        callback(process);
      }
      return;
    }
    return this.load(node.component, function(instance) {
      instance.nodeId = node.id;
      process.component = instance;
      if (instance.isSubgraph()) {
        _this.subscribeSubgraph(node.id, instance);
      }
      _this.processes[process.id] = process;
      if (callback) {
        return callback(process);
      }
    });
  };

  Network.prototype.removeNode = function(node) {
    if (!this.processes[node.id]) {
      return;
    }
    return delete this.processes[node.id];
  };

  Network.prototype.getNode = function(id) {
    return this.processes[id];
  };

  Network.prototype.connect = function(done) {
    var edges, initializers, nodes, serialize,
      _this = this;

    if (done == null) {
      done = function() {};
    }
    serialize = function(next, add) {
      return function(type) {
        return _this["add" + type](add, function() {
          return next(type);
        });
      };
    };
    initializers = _.reduceRight(this.graph.initializers, serialize, done);
    edges = _.reduceRight(this.graph.edges, serialize, function() {
      return initializers("Initial");
    });
    nodes = _.reduceRight(this.graph.nodes, serialize, function() {
      return edges("Edge");
    });
    return nodes("Node");
  };

  Network.prototype.connectPort = function(socket, process, port, inbound) {
    if (inbound) {
      socket.to = {
        process: process,
        port: port
      };
      if (!(process.component.inPorts && process.component.inPorts[port])) {
        throw new Error("No inport '" + port + "' defined in process " + process.id + " (" + (socket.getId()) + ")");
        return;
      }
      return process.component.inPorts[port].attach(socket);
    }
    socket.from = {
      process: process,
      port: port
    };
    if (!(process.component.outPorts && process.component.outPorts[port])) {
      throw new Error("No outport '" + port + "' defined in process " + process.id + " (" + (socket.getId()) + ")");
      return;
    }
    return process.component.outPorts[port].attach(socket);
  };

  Network.prototype.subscribeSubgraph = function(nodeName, process) {
    var emitSub,
      _this = this;

    if (!process.isReady()) {
      process.once('ready', function() {
        _this.subscribeSubgraph(nodeName, process);
      });
    }
    if (!process.network) {
      return;
    }
    emitSub = function(type, data) {
      if (!data) {
        data = {};
      }
      if (data.subgraph) {
        data.subgraph = "" + nodeName + ":" + data.subgraph;
      } else {
        data.subgraph = nodeName;
      }
      return _this.emit(type, data);
    };
    process.network.on('connect', function(data) {
      return emitSub('connect', data);
    });
    process.network.on('begingroup', function(data) {
      return emitSub('begingroup', data);
    });
    process.network.on('data', function(data) {
      return emitSub('data', data);
    });
    process.network.on('endgroup', function(data) {
      return emitSub('endgroup', data);
    });
    return process.network.on('disconnect', function(data) {
      return emitSub('disconnect', data);
    });
  };

  Network.prototype.subscribeSocket = function(socket) {
    var _this = this;

    socket.on('connect', function() {
      return _this.emit('connect', {
        id: socket.getId(),
        socket: socket
      });
    });
    socket.on('begingroup', function(group) {
      return _this.emit('begingroup', {
        id: socket.getId(),
        socket: socket,
        group: group
      });
    });
    socket.on('data', function(data) {
      return _this.emit('data', {
        id: socket.getId(),
        socket: socket,
        data: data
      });
    });
    socket.on('endgroup', function(group) {
      return _this.emit('endgroup', {
        id: socket.getId(),
        socket: socket,
        group: group
      });
    });
    return socket.on('disconnect', function() {
      return _this.emit('disconnect', {
        id: socket.getId(),
        socket: socket
      });
    });
  };

  Network.prototype.addEdge = function(edge, callback) {
    var from, socket, to,
      _this = this;

    if (!edge.from.node) {
      return this.addInitial(edge);
    }
    socket = internalSocket.createSocket();
    from = this.getNode(edge.from.node);
    if (!from) {
      throw new Error("No process defined for outbound node " + edge.from.node);
    }
    if (!from.component) {
      throw new Error("No component defined for outbound node " + edge.from.node);
    }
    if (!from.component.isReady()) {
      from.component.once("ready", function() {
        return _this.addEdge(edge, callback);
      });
      return;
    }
    to = this.getNode(edge.to.node);
    if (!to) {
      throw new Error("No process defined for inbound node " + edge.to.node);
    }
    if (!to.component) {
      throw new Error("No component defined for inbound node " + edge.to.node);
    }
    if (!to.component.isReady()) {
      to.component.once("ready", function() {
        return _this.addEdge(edge, callback);
      });
      return;
    }
    this.connectPort(socket, to, edge.to.port, true);
    this.connectPort(socket, from, edge.from.port, false);
    this.subscribeSocket(socket);
    this.connections.push(socket);
    if (callback) {
      return callback();
    }
  };

  Network.prototype.removeEdge = function(edge) {
    var connection, _i, _len, _ref, _results;

    _ref = this.connections;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      connection = _ref[_i];
      if (!connection) {
        continue;
      }
      if (!(edge.to.node === connection.to.process.id && edge.to.port === connection.to.port)) {
        continue;
      }
      connection.to.process.component.inPorts[connection.to.port].detach(connection);
      if (edge.from.node) {
        if (connection.from && edge.from.node === connection.from.process.id && edge.from.port === connection.from.port) {
          connection.from.process.component.outPorts[connection.from.port].detach(connection);
        }
      }
      _results.push(this.connections.splice(this.connections.indexOf(connection), 1));
    }
    return _results;
  };

  Network.prototype.addInitial = function(initializer, callback) {
    var socket, to,
      _this = this;

    socket = internalSocket.createSocket();
    this.subscribeSocket(socket);
    to = this.getNode(initializer.to.node);
    if (!to) {
      throw new Error("No process defined for inbound node " + initializer.to.node);
    }
    if (!(to.component.isReady() || to.component.inPorts[initializer.to.port])) {
      to.component.setMaxListeners(0);
      to.component.once("ready", function() {
        return _this.addInitial(initializer, callback);
      });
      return;
    }
    this.connectPort(socket, to, initializer.to.port, true);
    this.connections.push(socket);
    this.initials.push({
      socket: socket,
      data: initializer.from.data
    });
    if (callback) {
      return callback();
    }
  };

  Network.prototype.sendInitial = function(initial) {
    initial.socket.connect();
    initial.socket.send(initial.data);
    return initial.socket.disconnect();
  };

  Network.prototype.sendInitials = function() {
    var send,
      _this = this;

    send = function() {
      var initial, _i, _len, _ref;

      _ref = _this.initials;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        initial = _ref[_i];
        _this.sendInitial(initial);
      }
      return _this.initials = [];
    };
    if (typeof process === 'object' && process.title === 'node') {
      return process.nextTick(send);
    } else {
      return setTimeout(send, 0);
    }
  };

  return Network;

})(EventEmitter);

exports.Network = Network;

});
require.register("bergie-noflo/src/components/Spring.js", function(exports, require, module){
var Spring, noflo, requestAnimFrame,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
  requestAnimFrame = process.nextTick;
} else {
  noflo = require('../lib/NoFlo');
  requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
    return setTimeout(callback, 1);
  };
}

Spring = (function(_super) {
  __extends(Spring, _super);

  Spring.prototype.description = 'Animates a directional spring';

  function Spring() {
    this.step = __bind(this.step, this);
    var _this = this;

    this.massPosition = 0;
    this.anchorPosition = 0;
    this.stiffness = 120;
    this.mass = 10;
    this.friction = 3;
    this.speed = 0;
    this.inPorts = {
      anchor: new noflo.Port('number'),
      "in": new noflo.Port('number')
    };
    this.outPorts = {
      out: new noflo.Port('number')
    };
    this.inPorts.anchor.on('data', function(anchorPosition) {
      _this.anchorPosition = anchorPosition;
    });
    this.inPorts["in"].on('data', function(massPosition) {
      _this.massPosition = massPosition;
      return _this.step();
    });
  }

  Spring.prototype.step = function() {
    var acceleration, dampingForce, distance, previousPosition, springForce, totalForce;

    distance = this.massPosition - this.anchorPosition;
    dampingForce = -this.friction * this.speed;
    springForce = -this.stiffness * distance;
    totalForce = springForce + dampingForce;
    acceleration = totalForce / this.mass;
    this.speed += acceleration;
    previousPosition = this.massPosition;
    this.massPosition += this.speed / 100;
    if (Math.round(this.massPosition) !== Math.round(previousPosition)) {
      this.outPorts.out.send(Math.round(this.massPosition));
    }
    if (Math.round(this.massPosition) === this.anchorPosition && Math.abs(this.speed) < 0.2) {
      return this.outPorts.out.disconnect();
    } else {
      if (this.massPosition === 0) {
        return;
      }
      return requestAnimFrame(this.step);
    }
  };

  return Spring;

})(noflo.Component);

exports.getComponent = function() {
  return new Spring;
};

});
require.register("bergie-noflo/src/components/Callback.js", function(exports, require, module){
var Callback, noflo, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

_ = require('underscore')._;

Callback = (function(_super) {
  __extends(Callback, _super);

  Callback.prototype.description = 'Call a given function with each IP received';

  function Callback() {
    var _this = this;

    this.callback = null;
    this.inPorts = {
      "in": new noflo.Port('all'),
      callback: new noflo.Port('function')
    };
    this.outPorts = {
      error: new noflo.Port('object')
    };
    this.inPorts.callback.on('data', function(data) {
      if (!_.isFunction(data)) {
        _this.error('The provided callback must be a function');
        return;
      }
      return _this.callback = data;
    });
    this.inPorts["in"].on("data", function(data) {
      if (!_this.callback) {
        _this.error('No callback provided');
        return;
      }
      return _this.callback(data);
    });
  }

  Callback.prototype.error = function(msg) {
    if (this.outPorts.error.isAttached()) {
      this.outPorts.error.send(new Error(msg));
      this.outPorts.error.disconnect();
      return;
    }
    throw new Error(msg);
  };

  return Callback;

})(noflo.Component);

exports.getComponent = function() {
  return new Callback;
};

});
require.register("bergie-noflo/src/components/Kick.js", function(exports, require, module){
var Kick, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

Kick = (function(_super) {
  __extends(Kick, _super);

  Kick.prototype.description = "This component generates a single packet and sends  it to the output port. Mostly usable for debugging, but can also  be useful for starting up networks.";

  function Kick() {
    var _this = this;

    this.data = {
      packet: null,
      group: []
    };
    this.groups = [];
    this.inPorts = {
      "in": new noflo.Port(),
      data: new noflo.Port()
    };
    this.outPorts = {
      out: new noflo.ArrayPort()
    };
    this.inPorts["in"].on('begingroup', function(group) {
      return _this.groups.push(group);
    });
    this.inPorts["in"].on('data', function() {
      return _this.data.group = _this.groups.slice(0);
    });
    this.inPorts["in"].on('endgroup', function(group) {
      return _this.groups.pop();
    });
    this.inPorts["in"].on('disconnect', function() {
      _this.sendKick(_this.data);
      return _this.groups = [];
    });
    this.inPorts.data.on('data', function(data) {
      return _this.data.packet = data;
    });
  }

  Kick.prototype.sendKick = function(kick) {
    var group, _i, _j, _len, _len1, _ref, _ref1;

    _ref = kick.group;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      group = _ref[_i];
      this.outPorts.out.beginGroup(group);
    }
    this.outPorts.out.send(kick.packet);
    _ref1 = kick.group;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      group = _ref1[_j];
      this.outPorts.out.endGroup();
    }
    return this.outPorts.out.disconnect();
  };

  return Kick;

})(noflo.Component);

exports.getComponent = function() {
  return new Kick;
};

});
require.register("bergie-noflo/src/components/Gate.js", function(exports, require, module){
var Gate, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

Gate = (function(_super) {
  __extends(Gate, _super);

  Gate.prototype.description = 'This component forwards received packets when the gate is open';

  function Gate() {
    var _this = this;

    this.open = false;
    this.inPorts = {
      "in": new noflo.Port,
      open: new noflo.Port,
      close: new noflo.Port
    };
    this.outPorts = {
      out: new noflo.Port
    };
    this.inPorts["in"].on('connect', function() {
      if (!_this.open) {
        return;
      }
      return _this.outPorts.out.connect();
    });
    this.inPorts["in"].on('begingroup', function(group) {
      if (!_this.open) {
        return;
      }
      return _this.outPorts.out.beginGroup(group);
    });
    this.inPorts["in"].on('data', function(data) {
      if (!_this.open) {
        return;
      }
      return _this.outPorts.out.send(data);
    });
    this.inPorts["in"].on('endgroup', function() {
      if (!_this.open) {
        return;
      }
      return _this.outPorts.out.endGroup();
    });
    this.inPorts["in"].on('disconnect', function() {
      if (!_this.open) {
        return;
      }
      return _this.outPorts.out.disconnect();
    });
    this.inPorts.open.on('data', function() {
      return _this.open = true;
    });
    this.inPorts.close.on('data', function() {
      return _this.open = false;
    });
  }

  return Gate;

})(noflo.Component);

exports.getComponent = function() {
  return new Gate;
};

});
require.register("bergie-noflo/src/components/Split.js", function(exports, require, module){
var Split, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

Split = (function(_super) {
  __extends(Split, _super);

  Split.prototype.description = "This component receives data on a single input port and sendsthe same data out to all connected output ports";

  function Split() {
    var _this = this;

    this.inPorts = {
      "in": new noflo.Port('all')
    };
    this.outPorts = {
      out: new noflo.ArrayPort('all')
    };
    this.inPorts["in"].on("connect", function() {
      return _this.outPorts.out.connect();
    });
    this.inPorts["in"].on("begingroup", function(group) {
      return _this.outPorts.out.beginGroup(group);
    });
    this.inPorts["in"].on("data", function(data) {
      return _this.outPorts.out.send(data);
    });
    this.inPorts["in"].on("endgroup", function() {
      return _this.outPorts.out.endGroup();
    });
    this.inPorts["in"].on("disconnect", function() {
      return _this.outPorts.out.disconnect();
    });
  }

  return Split;

})(noflo.Component);

exports.getComponent = function() {
  return new Split;
};

});
require.register("bergie-noflo/src/components/Merge.js", function(exports, require, module){
var Merge, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

Merge = (function(_super) {
  __extends(Merge, _super);

  Merge.prototype.description = "This component receives data on multiple input ports  and sends the same data out to the connected output port";

  function Merge() {
    var _this = this;

    this.inPorts = {
      "in": new noflo.ArrayPort()
    };
    this.outPorts = {
      out: new noflo.Port()
    };
    this.inPorts["in"].on("connect", function() {
      return _this.outPorts.out.connect();
    });
    this.inPorts["in"].on("begingroup", function(group) {
      return _this.outPorts.out.beginGroup(group);
    });
    this.inPorts["in"].on("data", function(data) {
      return _this.outPorts.out.send(data);
    });
    this.inPorts["in"].on("endgroup", function() {
      return _this.outPorts.out.endGroup();
    });
    this.inPorts["in"].on("disconnect", function() {
      var socket, _i, _len, _ref;

      _ref = _this.inPorts["in"].sockets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        socket = _ref[_i];
        if (socket.connected) {
          return;
        }
      }
      return _this.outPorts.out.disconnect();
    });
  }

  return Merge;

})(noflo.Component);

exports.getComponent = function() {
  return new Merge;
};

});
require.register("bergie-noflo/src/components/Graph.js", function(exports, require, module){
var Graph, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
} else {
  noflo = require('../lib/NoFlo');
}

Graph = (function(_super) {
  __extends(Graph, _super);

  function Graph() {
    var _this = this;

    this.network = null;
    this.ready = true;
    this.baseDir = null;
    this.inPorts = {
      graph: new noflo.Port()
    };
    this.outPorts = {};
    this.inPorts.graph.on("data", function(data) {
      return _this.setGraph(data);
    });
  }

  Graph.prototype.setGraph = function(graph) {
    var _this = this;

    this.ready = false;
    if (typeof graph === 'object') {
      if (typeof graph.addNode === 'function') {
        return this.createNetwork(graph);
      }
      noflo.graph.loadJSON(graph, function(instance) {
        instance.baseDir = _this.baseDir;
        return _this.createNetwork(instance);
      });
      return;
    }
    if (graph.substr(0, 1) !== "/") {
      graph = "" + (process.cwd()) + "/" + graph;
    }
    return graph = noflo.graph.loadFile(graph, function(instance) {
      instance.baseDir = _this.baseDir;
      return _this.createNetwork(instance);
    });
  };

  Graph.prototype.createNetwork = function(graph) {
    var _this = this;

    return noflo.createNetwork(graph, function(network) {
      var name, notReady, process, _ref;

      _this.network = network;
      notReady = false;
      _ref = _this.network.processes;
      for (name in _ref) {
        process = _ref[name];
        if (!_this.checkComponent(name, process)) {
          notReady = true;
        }
      }
      if (!notReady) {
        return _this.setToReady();
      }
    });
  };

  Graph.prototype.checkComponent = function(name, process) {
    var _this = this;

    if (!process.component.isReady()) {
      process.component.once("ready", function() {
        _this.checkComponent(name, process);
        return _this.setToReady();
      });
      return false;
    }
    this.findEdgePorts(name, process);
    return true;
  };

  Graph.prototype.portName = function(nodeName, portName) {
    return "" + (nodeName.toLowerCase()) + "." + portName;
  };

  Graph.prototype.isExported = function(port, nodeName, portName) {
    var exported, newPort, _i, _len, _ref;

    newPort = this.portName(nodeName, portName);
    if (port.isAttached()) {
      return false;
    }
    if (this.network.graph.exports.length === 0) {
      return newPort;
    }
    _ref = this.network.graph.exports;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      exported = _ref[_i];
      if (exported["private"] === newPort) {
        return exported["public"];
      }
    }
    return false;
  };

  Graph.prototype.setToReady = function() {
    var _this = this;

    if (typeof process === 'object' && process.title === 'node') {
      return process.nextTick(function() {
        _this.ready = true;
        return _this.emit('ready');
      });
    } else {
      return setTimeout(function() {
        _this.ready = true;
        return _this.emit('ready');
      }, 0);
    }
  };

  Graph.prototype.findEdgePorts = function(name, process) {
    var port, portName, targetPortName, _ref, _ref1;

    _ref = process.component.inPorts;
    for (portName in _ref) {
      port = _ref[portName];
      targetPortName = this.isExported(port, name, portName);
      if (targetPortName === false) {
        continue;
      }
      this.inPorts[targetPortName] = port;
    }
    _ref1 = process.component.outPorts;
    for (portName in _ref1) {
      port = _ref1[portName];
      targetPortName = this.isExported(port, name, portName);
      if (targetPortName === false) {
        continue;
      }
      this.outPorts[targetPortName] = port;
    }
    return true;
  };

  Graph.prototype.isReady = function() {
    return this.ready;
  };

  Graph.prototype.isSubgraph = function() {
    return true;
  };

  return Graph;

})(noflo.Component);

exports.getComponent = function() {
  return new Graph;
};

});
require.register("bergie-noflo/src/components/Output.js", function(exports, require, module){
var Output, noflo, util,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

if (typeof process === 'object' && process.title === 'node') {
  noflo = require("../../lib/NoFlo");
  util = require("util");
} else {
  noflo = require('../lib/NoFlo');
  util = {
    inspect: function(data) {
      return data;
    }
  };
}

Output = (function(_super) {
  __extends(Output, _super);

  Output.prototype.description = "This component receives input on a single inport, and    sends the data items directly to console.log";

  function Output() {
    var _this = this;

    this.options = {
      showHidden: false,
      depth: 2,
      colors: false
    };
    this.inPorts = {
      "in": new noflo.ArrayPort,
      options: new noflo.Port
    };
    this.outPorts = {
      out: new noflo.Port
    };
    this.inPorts["in"].on("data", function(data) {
      _this.log(data);
      if (_this.outPorts.out.isAttached()) {
        return _this.outPorts.out.send(data);
      }
    });
    this.inPorts["in"].on("disconnect", function() {
      if (_this.outPorts.out.isAttached()) {
        return _this.outPorts.out.disconnect();
      }
    });
    this.inPorts.options.on("data", function(data) {
      return _this.setOptions(data);
    });
  }

  Output.prototype.setOptions = function(options) {
    var key, value, _results;

    if (typeof options !== "object") {
      throw new Error("Options is not an object");
    }
    _results = [];
    for (key in options) {
      if (!__hasProp.call(options, key)) continue;
      value = options[key];
      _results.push(this.options[key] = value);
    }
    return _results;
  };

  Output.prototype.log = function(data) {
    return console.log(util.inspect(data, this.options.showHidden, this.options.depth, this.options.colors));
  };

  return Output;

})(noflo.Component);

exports.getComponent = function() {
  return new Output();
};

});
require.register("bergie-noflo/component.json", function(exports, require, module){
module.exports = JSON.parse('{"name":"noflo","description":"Flow-Based Programming environment for JavaScript","keywords":["fbp","workflow","flow"],"repo":"bergie/noflo","version":"0.3.3","dependencies":{"component/emitter":"*","component/underscore":"*","noflo/fbp":"*"},"development":{},"license":"MIT","main":"src/lib/NoFlo.js","scripts":["src/lib/Graph.js","src/lib/InternalSocket.js","src/lib/Port.js","src/lib/ArrayPort.js","src/lib/Component.js","src/lib/AsyncComponent.js","src/lib/LoggingComponent.js","src/lib/ComponentLoader.js","src/lib/NoFlo.js","src/lib/Network.js","src/components/Spring.js","src/components/Callback.js","src/components/Kick.js","src/components/Gate.js","src/components/Split.js","src/components/Merge.js","src/components/Graph.js","src/components/Output.js"],"json":["component.json"],"noflo":{"components":{"Spring":"src/components/Spring.js","Callback":"src/components/Callback.js","Kick":"src/components/Kick.js","Gate":"src/components/Gate.js","Split":"src/components/Split.js","Merge":"src/components/Merge.js","Graph":"src/components/Graph.js","Output":"src/components/Output.js"}}}');
});
require.register("bergie-noflo-dom/index.js", function(exports, require, module){
/*
 * This file can be used for general library features that are exposed as CommonJS modules
 * that the components then utilize
 */

});
require.register("bergie-noflo-dom/components/GetElement.js", function(exports, require, module){
var GetElement, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

GetElement = (function(_super) {
  __extends(GetElement, _super);

  GetElement.prototype.description = 'Get a DOM element matching a query';

  function GetElement() {
    var _this = this;

    this.container = null;
    this.inPorts = {
      "in": new noflo.Port('object'),
      selector: new noflo.Port('string')
    };
    this.outPorts = {
      element: new noflo.Port('object'),
      error: new noflo.Port('object')
    };
    this.inPorts["in"].on('data', function(data) {
      if (typeof data.querySelector !== 'function') {
        _this.error('Given container doesn\'t support querySelectors');
        return;
      }
      return _this.container = data;
    });
    this.inPorts.selector.on('data', function(data) {
      return _this.select(data);
    });
  }

  GetElement.prototype.select = function(selector) {
    var el;

    if (this.container) {
      el = this.container.querySelector(selector);
    } else {
      el = document.querySelector(selector);
    }
    if (!el) {
      this.error("No element matching '" + selector + "' found");
      return;
    }
    this.outPorts.element.send(el);
    return this.outPorts.element.disconnect();
  };

  GetElement.prototype.error = function(msg) {
    if (this.outPorts.error.isAttached()) {
      this.outPorts.error.send(new Error(msg));
      this.outPorts.error.disconnect();
      return;
    }
    throw new Error(msg);
  };

  return GetElement;

})(noflo.Component);

exports.getComponent = function() {
  return new GetElement;
};

});
require.register("bergie-noflo-dom/components/ListenDrag.js", function(exports, require, module){
var ListenDrag, noflo,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

ListenDrag = (function(_super) {
  __extends(ListenDrag, _super);

  ListenDrag.prototype.description = 'Listen to drag events on a DOM element';

  function ListenDrag() {
    this.dragend = __bind(this.dragend, this);
    this.dragmove = __bind(this.dragmove, this);
    this.dragstart = __bind(this.dragstart, this);
    var _this = this;

    this.inPorts = {
      element: new noflo.Port('object')
    };
    this.outPorts = {
      start: new noflo.ArrayPort('object'),
      movex: new noflo.ArrayPort('number'),
      movey: new noflo.ArrayPort('number'),
      end: new noflo.ArrayPort('object')
    };
    this.inPorts.element.on('data', function(element) {
      return _this.subscribe(element);
    });
  }

  ListenDrag.prototype.subscribe = function(element) {
    element.addEventListener('dragstart', this.dragstart, false);
    element.addEventListener('drag', this.dragmove, false);
    return element.addEventListener('dragend', this.dragend, false);
  };

  ListenDrag.prototype.dragstart = function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.outPorts.start.send(event);
    return this.outPorts.start.disconnect();
  };

  ListenDrag.prototype.dragmove = function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.outPorts.movex.send(event.clientX);
    return this.outPorts.movey.send(event.clientY);
  };

  ListenDrag.prototype.dragend = function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.outPorts.movex.isConnected()) {
      this.outPorts.movex.disconnect();
    }
    if (this.outPorts.movey.isConnected()) {
      this.outPorts.movey.disconnect();
    }
    this.outPorts.end.send(event);
    return this.outPorts.end.disconnect();
  };

  return ListenDrag;

})(noflo.Component);

exports.getComponent = function() {
  return new ListenDrag;
};

});
require.register("bergie-noflo-dom/components/ListenMouse.js", function(exports, require, module){
var ListenMouse, noflo,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

ListenMouse = (function(_super) {
  __extends(ListenMouse, _super);

  ListenMouse.prototype.description = 'Listen to mouse events on a DOM element';

  function ListenMouse() {
    this.click = __bind(this.click, this);
    var _this = this;

    this.inPorts = {
      element: new noflo.Port('object')
    };
    this.outPorts = {
      click: new noflo.ArrayPort('object')
    };
    this.inPorts.element.on('data', function(element) {
      return _this.subscribe(element);
    });
  }

  ListenMouse.prototype.subscribe = function(element) {
    return element.addEventListener('click', this.click, false);
  };

  ListenMouse.prototype.click = function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.outPorts.click.send(event);
    return this.outPorts.click.disconnect();
  };

  return ListenMouse;

})(noflo.Component);

exports.getComponent = function() {
  return new ListenMouse;
};

});
require.register("bergie-noflo-dom/components/ListenScroll.js", function(exports, require, module){
var ListenScroll, noflo,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

ListenScroll = (function(_super) {
  __extends(ListenScroll, _super);

  ListenScroll.prototype.description = 'Listen to scroll events';

  function ListenScroll() {
    this.scroll = __bind(this.scroll, this);
    var _this = this;

    this.inPorts = {
      start: new noflo.Port
    };
    this.outPorts = {
      top: new noflo.Port('number'),
      bottom: new noflo.Port('number'),
      left: new noflo.Port('number'),
      right: new noflo.Port('number')
    };
    this.inPorts.start.on('data', function() {
      return _this.subscribe();
    });
  }

  ListenScroll.prototype.subscribe = function() {
    return window.addEventListener('scroll', this.scroll, false);
  };

  ListenScroll.prototype.scroll = function(event) {
    var bottom, left, right, top;

    top = window.scrollY;
    left = window.scrollX;
    if (this.outPorts.top.isAttached()) {
      this.outPorts.top.send(top);
      this.outPorts.top.disconnect();
    }
    if (this.outPorts.bottom.isAttached()) {
      bottom = top + window.innerHeight;
      this.outPorts.bottom.send(bottom);
      this.outPorts.bottom.disconnect();
    }
    if (this.outPorts.left.isAttached()) {
      this.outPorts.left.send(left);
      this.outPorts.left.disconnect();
    }
    if (this.outPorts.right.isAttached()) {
      right = left + window.innerWidth;
      this.outPorts.right.send(right);
      return this.outPorts.right.disconnect();
    }
  };

  return ListenScroll;

})(noflo.Component);

exports.getComponent = function() {
  return new ListenScroll;
};

});
require.register("bergie-noflo-dom/components/ListenTouch.js", function(exports, require, module){
var ListenTouch, noflo,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

ListenTouch = (function(_super) {
  __extends(ListenTouch, _super);

  ListenTouch.prototype.description = 'Listen to touch events on a DOM element';

  function ListenTouch() {
    this.touchend = __bind(this.touchend, this);
    this.touchmove = __bind(this.touchmove, this);
    this.touchstart = __bind(this.touchstart, this);
    var _this = this;

    this.inPorts = {
      element: new noflo.Port('object')
    };
    this.outPorts = {
      start: new noflo.ArrayPort('object'),
      movex: new noflo.ArrayPort('number'),
      movey: new noflo.ArrayPort('number'),
      end: new noflo.ArrayPort('object')
    };
    this.inPorts.element.on('data', function(element) {
      return _this.subscribe(element);
    });
  }

  ListenTouch.prototype.subscribe = function(element) {
    element.addEventListener('touchstart', this.touchstart, false);
    element.addEventListener('touchmove', this.touchmove, false);
    return element.addEventListener('touchend', this.touchend, false);
  };

  ListenTouch.prototype.touchstart = function(event) {
    var idx, touch, _i, _len, _ref;

    event.preventDefault();
    event.stopPropagation();
    if (!event.changedTouches) {
      return;
    }
    if (!event.changedTouches.length) {
      return;
    }
    _ref = event.changedTouches;
    for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
      touch = _ref[idx];
      this.outPorts.start.beginGroup(idx);
      this.outPorts.start.send(event);
      this.outPorts.start.endGroup();
    }
    return this.outPorts.start.disconnect();
  };

  ListenTouch.prototype.touchmove = function(event) {
    var idx, touch, _i, _len, _ref, _results;

    event.preventDefault();
    event.stopPropagation();
    if (!event.changedTouches) {
      return;
    }
    if (!event.changedTouches.length) {
      return;
    }
    _ref = event.changedTouches;
    _results = [];
    for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
      touch = _ref[idx];
      this.outPorts.movex.beginGroup(idx);
      this.outPorts.movex.send(touch.pageX);
      this.outPorts.movex.endGroup();
      this.outPorts.movey.beginGroup(idx);
      this.outPorts.movey.send(touch.pageY);
      _results.push(this.outPorts.movey.endGroup());
    }
    return _results;
  };

  ListenTouch.prototype.touchend = function(event) {
    var idx, touch, _i, _len, _ref;

    event.preventDefault();
    event.stopPropagation();
    if (!event.changedTouches) {
      return;
    }
    if (!event.changedTouches.length) {
      return;
    }
    if (this.outPorts.movex.isConnected()) {
      this.outPorts.movex.disconnect();
    }
    if (this.outPorts.movey.isConnected()) {
      this.outPorts.movey.disconnect();
    }
    _ref = event.changedTouches;
    for (idx = _i = 0, _len = _ref.length; _i < _len; idx = ++_i) {
      touch = _ref[idx];
      this.outPorts.end.beginGroup(idx);
      this.outPorts.end.send(event);
      this.outPorts.end.endGroup();
    }
    return this.outPorts.end.disconnect();
  };

  return ListenTouch;

})(noflo.Component);

exports.getComponent = function() {
  return new ListenTouch;
};

});
require.register("bergie-noflo-dom/components/MoveElement.js", function(exports, require, module){
var MoveElement, noflo,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

noflo = require('noflo');

MoveElement = (function(_super) {
  __extends(MoveElement, _super);

  MoveElement.prototype.description = 'Change the coordinates of a DOM element';

  function MoveElement() {
    var _this = this;

    this.element = null;
    this.inPorts = {
      element: new noflo.Port('object'),
      x: new noflo.Port('number'),
      y: new noflo.Port('number'),
      z: new noflo.Port('number')
    };
    this.inPorts.element.on('data', function(element) {
      return _this.element = element;
    });
    this.inPorts.x.on('data', function(x) {
      return _this.setPosition('left', "" + x + "px");
    });
    this.inPorts.y.on('data', function(y) {
      return _this.setPosition('top', "" + y + "px");
    });
    this.inPorts.z.on('data', function(z) {
      return _this.setPosition('zIndex', z);
    });
  }

  MoveElement.prototype.setPosition = function(attr, value) {
    this.element.style.position = 'absolute';
    return this.element.style[attr] = value;
  };

  return MoveElement;

})(noflo.Component);

exports.getComponent = function() {
  return new MoveElement;
};

});
require.register("bergie-noflo-dom/component.json", function(exports, require, module){
module.exports = JSON.parse('{"name":"noflo-dom","description":"Document Object Model components for NoFlo","author":"Henri Bergius <henri.bergius@iki.fi>","repo":"bergie/noflo-dom","version":"0.0.1","keywords":[],"dependencies":{"bergie/noflo":"*"},"scripts":["components/GetElement.js","components/ListenDrag.js","components/ListenMouse.js","components/ListenScroll.js","components/ListenTouch.js","components/MoveElement.js","index.js"],"json":["component.json"],"noflo":{"components":{"GetElement":"components/GetElement.js","ListenDrag":"components/ListenDrag.js","ListenMouse":"components/ListenMouse.js","ListenScroll":"components/ListenScroll.js","ListenTouch":"components/ListenTouch.js","MoveElement":"components/MoveElement.js"}}}');
});
require.alias("components-polymer/polymer.min.js", "polymer-noflo/deps/platform/polymer.min.js");
require.alias("components-polymer/polymer.min.js", "polymer-noflo/deps/platform/index.js");
require.alias("components-polymer/polymer.min.js", "platform/index.js");
require.alias("components-polymer/polymer.min.js", "components-polymer/index.js");

require.alias("bergie-noflo/src/lib/Graph.js", "polymer-noflo/deps/noflo/src/lib/Graph.js");
require.alias("bergie-noflo/src/lib/InternalSocket.js", "polymer-noflo/deps/noflo/src/lib/InternalSocket.js");
require.alias("bergie-noflo/src/lib/Port.js", "polymer-noflo/deps/noflo/src/lib/Port.js");
require.alias("bergie-noflo/src/lib/ArrayPort.js", "polymer-noflo/deps/noflo/src/lib/ArrayPort.js");
require.alias("bergie-noflo/src/lib/Component.js", "polymer-noflo/deps/noflo/src/lib/Component.js");
require.alias("bergie-noflo/src/lib/AsyncComponent.js", "polymer-noflo/deps/noflo/src/lib/AsyncComponent.js");
require.alias("bergie-noflo/src/lib/LoggingComponent.js", "polymer-noflo/deps/noflo/src/lib/LoggingComponent.js");
require.alias("bergie-noflo/src/lib/ComponentLoader.js", "polymer-noflo/deps/noflo/src/lib/ComponentLoader.js");
require.alias("bergie-noflo/src/lib/NoFlo.js", "polymer-noflo/deps/noflo/src/lib/NoFlo.js");
require.alias("bergie-noflo/src/lib/Network.js", "polymer-noflo/deps/noflo/src/lib/Network.js");
require.alias("bergie-noflo/src/components/Spring.js", "polymer-noflo/deps/noflo/src/components/Spring.js");
require.alias("bergie-noflo/src/components/Callback.js", "polymer-noflo/deps/noflo/src/components/Callback.js");
require.alias("bergie-noflo/src/components/Kick.js", "polymer-noflo/deps/noflo/src/components/Kick.js");
require.alias("bergie-noflo/src/components/Gate.js", "polymer-noflo/deps/noflo/src/components/Gate.js");
require.alias("bergie-noflo/src/components/Split.js", "polymer-noflo/deps/noflo/src/components/Split.js");
require.alias("bergie-noflo/src/components/Merge.js", "polymer-noflo/deps/noflo/src/components/Merge.js");
require.alias("bergie-noflo/src/components/Graph.js", "polymer-noflo/deps/noflo/src/components/Graph.js");
require.alias("bergie-noflo/src/components/Output.js", "polymer-noflo/deps/noflo/src/components/Output.js");
require.alias("bergie-noflo/src/lib/NoFlo.js", "polymer-noflo/deps/noflo/index.js");
require.alias("bergie-noflo/src/lib/NoFlo.js", "noflo/index.js");
require.alias("component-emitter/index.js", "bergie-noflo/deps/emitter/index.js");
require.alias("component-indexof/index.js", "component-emitter/deps/indexof/index.js");

require.alias("component-underscore/index.js", "bergie-noflo/deps/underscore/index.js");

require.alias("noflo-fbp/lib/fbp.js", "bergie-noflo/deps/fbp/lib/fbp.js");
require.alias("noflo-fbp/lib/fbp.js", "bergie-noflo/deps/fbp/index.js");
require.alias("noflo-fbp/lib/fbp.js", "noflo-fbp/index.js");

require.alias("bergie-noflo/src/lib/NoFlo.js", "bergie-noflo/index.js");

require.alias("bergie-noflo-dom/components/GetElement.js", "polymer-noflo/deps/noflo-dom/components/GetElement.js");
require.alias("bergie-noflo-dom/components/ListenDrag.js", "polymer-noflo/deps/noflo-dom/components/ListenDrag.js");
require.alias("bergie-noflo-dom/components/ListenMouse.js", "polymer-noflo/deps/noflo-dom/components/ListenMouse.js");
require.alias("bergie-noflo-dom/components/ListenScroll.js", "polymer-noflo/deps/noflo-dom/components/ListenScroll.js");
require.alias("bergie-noflo-dom/components/ListenTouch.js", "polymer-noflo/deps/noflo-dom/components/ListenTouch.js");
require.alias("bergie-noflo-dom/components/MoveElement.js", "polymer-noflo/deps/noflo-dom/components/MoveElement.js");
require.alias("bergie-noflo-dom/index.js", "polymer-noflo/deps/noflo-dom/index.js");
require.alias("bergie-noflo-dom/index.js", "noflo-dom/index.js");
require.alias("bergie-noflo/src/lib/Graph.js", "bergie-noflo-dom/deps/noflo/src/lib/Graph.js");
require.alias("bergie-noflo/src/lib/InternalSocket.js", "bergie-noflo-dom/deps/noflo/src/lib/InternalSocket.js");
require.alias("bergie-noflo/src/lib/Port.js", "bergie-noflo-dom/deps/noflo/src/lib/Port.js");
require.alias("bergie-noflo/src/lib/ArrayPort.js", "bergie-noflo-dom/deps/noflo/src/lib/ArrayPort.js");
require.alias("bergie-noflo/src/lib/Component.js", "bergie-noflo-dom/deps/noflo/src/lib/Component.js");
require.alias("bergie-noflo/src/lib/AsyncComponent.js", "bergie-noflo-dom/deps/noflo/src/lib/AsyncComponent.js");
require.alias("bergie-noflo/src/lib/LoggingComponent.js", "bergie-noflo-dom/deps/noflo/src/lib/LoggingComponent.js");
require.alias("bergie-noflo/src/lib/ComponentLoader.js", "bergie-noflo-dom/deps/noflo/src/lib/ComponentLoader.js");
require.alias("bergie-noflo/src/lib/NoFlo.js", "bergie-noflo-dom/deps/noflo/src/lib/NoFlo.js");
require.alias("bergie-noflo/src/lib/Network.js", "bergie-noflo-dom/deps/noflo/src/lib/Network.js");
require.alias("bergie-noflo/src/components/Spring.js", "bergie-noflo-dom/deps/noflo/src/components/Spring.js");
require.alias("bergie-noflo/src/components/Callback.js", "bergie-noflo-dom/deps/noflo/src/components/Callback.js");
require.alias("bergie-noflo/src/components/Kick.js", "bergie-noflo-dom/deps/noflo/src/components/Kick.js");
require.alias("bergie-noflo/src/components/Gate.js", "bergie-noflo-dom/deps/noflo/src/components/Gate.js");
require.alias("bergie-noflo/src/components/Split.js", "bergie-noflo-dom/deps/noflo/src/components/Split.js");
require.alias("bergie-noflo/src/components/Merge.js", "bergie-noflo-dom/deps/noflo/src/components/Merge.js");
require.alias("bergie-noflo/src/components/Graph.js", "bergie-noflo-dom/deps/noflo/src/components/Graph.js");
require.alias("bergie-noflo/src/components/Output.js", "bergie-noflo-dom/deps/noflo/src/components/Output.js");
require.alias("bergie-noflo/src/lib/NoFlo.js", "bergie-noflo-dom/deps/noflo/index.js");
require.alias("component-emitter/index.js", "bergie-noflo/deps/emitter/index.js");
require.alias("component-indexof/index.js", "component-emitter/deps/indexof/index.js");

require.alias("component-underscore/index.js", "bergie-noflo/deps/underscore/index.js");

require.alias("noflo-fbp/lib/fbp.js", "bergie-noflo/deps/fbp/lib/fbp.js");
require.alias("noflo-fbp/lib/fbp.js", "bergie-noflo/deps/fbp/index.js");
require.alias("noflo-fbp/lib/fbp.js", "noflo-fbp/index.js");

require.alias("bergie-noflo/src/lib/NoFlo.js", "bergie-noflo/index.js");

