webpackJsonp([2],{0:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var i=n(536),r=_interopRequireDefault(i);Object.defineProperty(window,"NeosCKEditorApi",{value:r.default,enumerable:!1,writable:!1,configurable:!0})},111:function(e,t){(function(t){function debounce(e,t,i){function invokeFunc(t){var n=r,i=o;return r=o=void 0,d=t,a=e.apply(i,n)}function leadingEdge(e){return d=e,c=setTimeout(timerExpired,t),l?invokeFunc(e):a}function remainingWait(e){var n=e-f,i=e-d,r=t-n;return s?p(r,u-i):r}function shouldInvoke(e){var n=e-f,i=e-d;return void 0===f||n>=t||n<0||s&&i>=u}function timerExpired(){var e=g();return shouldInvoke(e)?trailingEdge(e):void(c=setTimeout(timerExpired,remainingWait(e)))}function trailingEdge(e){return c=void 0,m&&r?invokeFunc(e):(r=o=void 0,a)}function cancel(){void 0!==c&&clearTimeout(c),d=0,r=f=o=c=void 0}function flush(){return void 0===c?a:trailingEdge(g())}function debounced(){var e=g(),n=shouldInvoke(e);if(r=arguments,o=this,f=e,n){if(void 0===c)return leadingEdge(f);if(s)return c=setTimeout(timerExpired,t),invokeFunc(f)}return void 0===c&&(c=setTimeout(timerExpired,t)),a}var r,o,u,a,c,f,d=0,l=!1,s=!1,m=!0;if("function"!=typeof e)throw new TypeError(n);return t=toNumber(t)||0,isObject(i)&&(l=!!i.leading,s="maxWait"in i,u=s?b(toNumber(i.maxWait)||0,t):u,m="trailing"in i?!!i.trailing:m),debounced.cancel=cancel,debounced.flush=flush,debounced}function isObject(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function isObjectLike(e){return!!e&&"object"==typeof e}function isSymbol(e){return"symbol"==typeof e||isObjectLike(e)&&v.call(e)==r}function toNumber(e){if("number"==typeof e)return e;if(isSymbol(e))return i;if(isObject(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=isObject(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=a.test(e);return n||c.test(e)?f(e.slice(2),n?2:8):u.test(e)?i:+e}var n="Expected a function",i=NaN,r="[object Symbol]",o=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,s=d||l||Function("return this")(),m=Object.prototype,v=m.toString,b=Math.max,p=Math.min,g=function(){return s.Date.now()};e.exports=debounce}).call(t,function(){return this}())},536:function(e,t,n){"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1007),r=_interopRequireDefault(i),o=n(111),u=_interopRequireDefault(o),a={initialize:function initialize(){},toggleFormat:function toggleFormat(){},createEditor:function createEditor(){}},c="",f=function createCKEditorAPI(e){if(!e)return console.error("CKEditor not found!"),a;var t=null,n=null,i=function handleUserInteractionCallbackFactory(n){return function(){var i={};Object.keys(t.formattingRules).forEach(function(r){var o=t.formattingRules[r];if(void 0!==o.command)return n.getCommand(o.command)?void(i[r]=n.getCommand(o.command).state):void(i[r]=!1);if(void 0!==o.style){if(!n.elementPath())return void(i[r]=!1);var u=new e.style(o.style);return void(i[r]=u.checkActive(n.elementPath(),n))}if(o.extractCurrentFormatFn)return void(i[r]=o.extractCurrentFormatFn(n,e));throw new Error('\n                An error occured while checking a format in CK Editor.\n                The description parameter needs to either have a key "command",\n                a key "style", or a style "extractCurrentFormatFn" - none of which could be found.\n            ')});var r=JSON.stringify(i);r!==c&&(t.setFormattingUnderCursor(i),c=r)}};return e.disableAutoInline=!0,Object.assign(e.dtd.$editable,{b:!0,big:!0,i:!0,small:!0,tt:!0,abbr:!0,acronym:!0,cite:!0,code:!0,dfn:!0,em:!0,kbd:!0,strong:!0,samp:!0,var:!0,a:!0,bdo:!0,img:!0,q:!0,span:!0,sub:!0,sup:!0,button:!0,label:!0}),{initialize:function initialize(e){t=e},toggleFormat:function toggleFormat(r){var o=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},u=t.formattingRules[r];if(!u)return void console.warn("Formatting instruction "+r+" not found.");if(!n)return void console.warn("Current editor not found!");if(void 0!==u.command)return n.getCommand(u.command)?(n.execCommand(u.command),n.fire("change"),void i(n)()):void console.warn("Command "+n+" not found.");if(void 0!==u.style){if(!n.elementPath())return;var a=new e.style(u.style),c=a.checkActive(n.elementPath(),n)?"removeStyle":"applyStyle";return n[c](a),n.fire("change"),void i(n)()}if(u.applyStyleFn)return u.applyStyleFn(o,n,e),n.fire("change"),void i(n)();throw new Error('\n                An error occured while applying a format in CK Editor.\n                The description parameter needs to either have a key "command",\n                "style", or "applyFn" - none of which could be found.\n            ')},createEditor:function createEditor(o,a,c,f){o.contentEditable="true";var d=e.inline(o,a);d.on("loaded",function(){d.config.buttons&&d.config.buttons.forEach(function(e){var t=d.ui.create(e);d.addFeature(t)})});var l=i(d);d.once("contentDom",function(){d.on("focus",function(){n=d,t.setCurrentlyEditedPropertyName(c),l()}),d.on("selectionChange",function(){l()}),d.on("change",(0,u.default)((0,r.default)(function(){return f(d.getData())},1500),150))})}}};t.default=f(window.CKEDITOR)},1007:function(e,t){(function(t){function debounce(e,t,i){function invokeFunc(t){var n=r,i=o;return r=o=void 0,d=t,a=e.apply(i,n)}function leadingEdge(e){return d=e,c=setTimeout(timerExpired,t),l?invokeFunc(e):a}function remainingWait(e){var n=e-f,i=e-d,r=t-n;return s?p(r,u-i):r}function shouldInvoke(e){var n=e-f,i=e-d;return void 0===f||n>=t||n<0||s&&i>=u}function timerExpired(){var e=g();return shouldInvoke(e)?trailingEdge(e):void(c=setTimeout(timerExpired,remainingWait(e)))}function trailingEdge(e){return c=void 0,m&&r?invokeFunc(e):(r=o=void 0,a)}function cancel(){void 0!==c&&clearTimeout(c),d=0,r=f=o=c=void 0}function flush(){return void 0===c?a:trailingEdge(g())}function debounced(){var e=g(),n=shouldInvoke(e);if(r=arguments,o=this,f=e,n){if(void 0===c)return leadingEdge(f);if(s)return c=setTimeout(timerExpired,t),invokeFunc(f)}return void 0===c&&(c=setTimeout(timerExpired,t)),a}var r,o,u,a,c,f,d=0,l=!1,s=!1,m=!0;if("function"!=typeof e)throw new TypeError(n);return t=toNumber(t)||0,isObject(i)&&(l=!!i.leading,s="maxWait"in i,u=s?b(toNumber(i.maxWait)||0,t):u,m="trailing"in i?!!i.trailing:m),debounced.cancel=cancel,debounced.flush=flush,debounced}function throttle(e,t,i){var r=!0,o=!0;if("function"!=typeof e)throw new TypeError(n);return isObject(i)&&(r="leading"in i?!!i.leading:r,o="trailing"in i?!!i.trailing:o),debounce(e,t,{leading:r,maxWait:t,trailing:o})}function isObject(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function isObjectLike(e){return!!e&&"object"==typeof e}function isSymbol(e){return"symbol"==typeof e||isObjectLike(e)&&v.call(e)==r}function toNumber(e){if("number"==typeof e)return e;if(isSymbol(e))return i;if(isObject(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=isObject(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(o,"");var n=a.test(e);return n||c.test(e)?f(e.slice(2),n?2:8):u.test(e)?i:+e}var n="Expected a function",i=NaN,r="[object Symbol]",o=/^\s+|\s+$/g,u=/^[-+]0x[0-9a-f]+$/i,a=/^0b[01]+$/i,c=/^0o[0-7]+$/i,f=parseInt,d="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,s=d||l||Function("return this")(),m=Object.prototype,v=m.toString,b=Math.max,p=Math.min,g=function(){return s.Date.now()};e.exports=throttle}).call(t,function(){return this}())}});
//# sourceMappingURL=Guest.js.map