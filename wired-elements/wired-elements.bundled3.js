var WiredElements=function(t){"use strict";const e=new WeakMap,i=t=>"function"==typeof t&&e.has(t),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,o=(t,e,i=null)=>{for(;e!==i;){const i=e.nextSibling;t.removeChild(e),e=i}},n={},r={},a=`{{lit-${String(Math.random()).slice(2)}}}`,d=`\x3c!--${a}--\x3e`,l=new RegExp(`${a}|${d}`),h="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;const i=[],s=[],o=document.createTreeWalker(e.content,133,null,!1);let n=0,r=-1,d=0;const{strings:c,values:{length:u}}=t;for(;d<u;){const t=o.nextNode();if(null!==t){if(r++,1===t.nodeType){if(t.hasAttributes()){const e=t.attributes,{length:i}=e;let s=0;for(let t=0;t<i;t++)p(e[t].name,h)&&s++;for(;s-- >0;){const e=c[d],i=g.exec(e)[2],s=i.toLowerCase()+h,o=t.getAttribute(s);t.removeAttribute(s);const n=o.split(l);this.parts.push({type:"attribute",index:r,name:i,strings:n}),d+=n.length-1}}"TEMPLATE"===t.tagName&&(s.push(t),o.currentNode=t.content)}else if(3===t.nodeType){const e=t.data;if(e.indexOf(a)>=0){const s=t.parentNode,o=e.split(l),n=o.length-1;for(let e=0;e<n;e++){let i,n=o[e];if(""===n)i=f();else{const t=g.exec(n);null!==t&&p(t[2],h)&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-h.length)+t[3]),i=document.createTextNode(n)}s.insertBefore(i,t),this.parts.push({type:"node",index:++r})}""===o[n]?(s.insertBefore(f(),t),i.push(t)):t.data=o[n],d+=n}}else if(8===t.nodeType)if(t.data===a){const e=t.parentNode;null!==t.previousSibling&&r!==n||(r++,e.insertBefore(f(),t)),n=r,this.parts.push({type:"node",index:r}),null===t.nextSibling?t.data="":(i.push(t),r--),d++}else{let e=-1;for(;-1!==(e=t.data.indexOf(a,e+1));)this.parts.push({type:"node",index:-1}),d++}}else o.currentNode=s.pop()}for(const t of i)t.parentNode.removeChild(t)}}const p=(t,e)=>{const i=t.length-e.length;return i>=0&&t.slice(i)===e},u=t=>-1!==t.index,f=()=>document.createComment(""),g=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class y{constructor(t,e,i){this.__parts=[],this.template=t,this.processor=e,this.options=i}update(t){let e=0;for(const i of this.__parts)void 0!==i&&i.setValue(t[e]),e++;for(const t of this.__parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=[],i=this.template.parts,o=document.createTreeWalker(t,133,null,!1);let n,r=0,a=0,d=o.nextNode();for(;r<i.length;)if(n=i[r],u(n)){for(;a<n.index;)a++,"TEMPLATE"===d.nodeName&&(e.push(d),o.currentNode=d.content),null===(d=o.nextNode())&&(o.currentNode=e.pop(),d=o.nextNode());if("node"===n.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(d.previousSibling),this.__parts.push(t)}else this.__parts.push(...this.processor.handleAttributeExpressions(d,n.name,n.strings,this.options));r++}else this.__parts.push(void 0),r++;return s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class b{constructor(t,e,i,s){this.strings=t,this.values=e,this.type=i,this.processor=s}getHTML(){const t=this.strings.length-1;let e="",i=!1;for(let s=0;s<t;s++){const t=this.strings[s],o=t.lastIndexOf("\x3c!--");i=(o>-1||i)&&-1===t.indexOf("--\x3e",o+1);const n=g.exec(t);e+=null===n?t+(i?a:d):t.substr(0,n.index)+n[1]+n[2]+h+n[3]+a}return e+=this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const m=t=>null===t||!("object"==typeof t||"function"==typeof t),v=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class w{constructor(t,e,i){this.dirty=!0,this.element=t,this.name=e,this.strings=i,this.parts=[];for(let t=0;t<i.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1;let i="";for(let s=0;s<e;s++){i+=t[s];const e=this.parts[s];if(void 0!==e){const t=e.value;if(m(t)||!v(t))i+="string"==typeof t?t:String(t);else for(const e of t)i+="string"==typeof e?e:String(e)}}return i+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||m(t)&&t===this.value||(this.value=t,i(t)||(this.committer.dirty=!0))}commit(){for(;i(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this.__pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(f()),this.endNode=t.appendChild(f())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.__insert(this.startNode=f()),t.__insert(this.endNode=f())}insertAfterPart(t){t.__insert(this.startNode=f()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}const t=this.__pendingValue;t!==n&&(m(t)?t!==this.value&&this.__commitText(t):t instanceof b?this.__commitTemplateResult(t):t instanceof Node?this.__commitNode(t):v(t)?this.__commitIterable(t):t===r?(this.value=r,this.clear()):this.__commitText(t))}__insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}__commitNode(t){this.value!==t&&(this.clear(),this.__insert(t),this.value=t)}__commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this.__commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}__commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===e)this.value.update(t.values);else{const i=new y(e,t.processor,this.options),s=i._clone();i.update(t.values),this.__commitNode(s),this.value=i}}__commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let i,s=0;for(const o of t)void 0===(i=e[s])&&(i=new k(this.options),e.push(i),0===s?i.appendIntoPart(this):i.insertAfterPart(e[s-1])),i.setValue(o),i.commit(),s++;s<e.length&&(e.length=s,this.clear(i&&i.endNode))}clear(t=this.startNode){o(this.startNode.parentNode,t.nextSibling,this.endNode)}}class S{constructor(t,e,i){if(this.value=void 0,this.__pendingValue=void 0,2!==i.length||""!==i[0]||""!==i[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=i}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=!!this.__pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.__pendingValue=n}}class C extends w{constructor(t,e,i){super(t,e,i),this.single=2===i.length&&""===i[0]&&""===i[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends x{}let R=!1;try{const t={get capture(){return R=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class M{constructor(t,e,i){this.value=void 0,this.__pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=i,this.__boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this.__pendingValue=t}commit(){for(;i(this.__pendingValue);){const t=this.__pendingValue;this.__pendingValue=n,t(this)}if(this.__pendingValue===n)return;const t=this.__pendingValue,e=this.value,s=null==t||null!=e&&(t.capture!==e.capture||t.once!==e.once||t.passive!==e.passive),o=null!=t&&(null==e||s);s&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),o&&(this.__options=N(t),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=t,this.__pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const N=t=>t&&(R?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const E=new class{handleAttributeExpressions(t,e,i,s){const o=e[0];return"."===o?new C(t,e.slice(1),i).parts:"@"===o?[new M(t,e.slice(1),s.eventContext)]:"?"===o?[new S(t,e.slice(1),i)]:new w(t,e,i).parts}handleTextExpression(t){return new k(t)}};function O(t){let e=P.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},P.set(t.type,e));let i=e.stringsArray.get(t.strings);if(void 0!==i)return i;const s=t.strings.join(a);return void 0===(i=e.keyString.get(s))&&(i=new c(t,t.getTemplateElement()),e.keyString.set(s,i)),e.stringsArray.set(t.strings,i),i}const P=new Map,A=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const W=(t,...e)=>new b(t,e,"html",E),T=133;function D(t,e){const{element:{content:i},parts:s}=t,o=document.createTreeWalker(i,T,null,!1);let n=$(s),r=s[n],a=-1,d=0;const l=[];let h=null;for(;o.nextNode();){a++;const t=o.currentNode;for(t.previousSibling===h&&(h=null),e.has(t)&&(l.push(t),null===h&&(h=t)),null!==h&&d++;void 0!==r&&r.index===a;)r.index=null!==h?-1:r.index-d,r=s[n=$(s,n)]}l.forEach(t=>t.parentNode.removeChild(t))}const j=t=>{let e=11===t.nodeType?0:1;const i=document.createTreeWalker(t,T,null,!1);for(;i.nextNode();)e++;return e},$=(t,e=-1)=>{for(let i=e+1;i<t.length;i++){const e=t[i];if(u(e))return i}return-1};const L=(t,e)=>`${t}--${e}`;let I=!0;void 0===window.ShadyCSS?I=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),I=!1);const z=t=>e=>{const i=L(e.type,t);let s=P.get(i);void 0===s&&(s={stringsArray:new WeakMap,keyString:new Map},P.set(i,s));let o=s.stringsArray.get(e.strings);if(void 0!==o)return o;const n=e.strings.join(a);if(void 0===(o=s.keyString.get(n))){const i=e.getTemplateElement();I&&window.ShadyCSS.prepareTemplateDom(i,t),o=new c(e,i),s.keyString.set(n,o)}return s.stringsArray.set(e.strings,o),o},B=["html","svg"],V=new Set,U=(t,e,i)=>{V.add(i);const s=t.querySelectorAll("style"),{length:o}=s;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(e.element,i);const n=document.createElement("style");for(let t=0;t<o;t++){const e=s[t];e.parentNode.removeChild(e),n.textContent+=e.textContent}(t=>{B.forEach(e=>{const i=P.get(L(e,t));void 0!==i&&i.keyString.forEach(t=>{const{element:{content:e}}=t,i=new Set;Array.from(e.querySelectorAll("style")).forEach(t=>{i.add(t)}),D(t,i)})})})(i);const r=e.element.content;!function(t,e,i=null){const{element:{content:s},parts:o}=t;if(null==i)return void s.appendChild(e);const n=document.createTreeWalker(s,T,null,!1);let r=$(o),a=0,d=-1;for(;n.nextNode();)for(d++,n.currentNode===i&&(a=j(e),i.parentNode.insertBefore(e,i));-1!==r&&o[r].index===d;){if(a>0){for(;-1!==r;)o[r].index+=a,r=$(o,r);return}r=$(o,r)}}(e,n,r.firstChild),window.ShadyCSS.prepareTemplateStyles(e.element,i);const a=r.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==a)t.insertBefore(a.cloneNode(!0),t.firstChild);else{r.insertBefore(n,r.firstChild);const t=new Set;t.add(n),D(e,t)}};window.JSCompiler_renameProperty=((t,e)=>t);const H={toAttribute(t,e){switch(e){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){switch(e){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},q=(t,e)=>e!==t&&(e==e||t==t),F={attribute:!0,type:String,converter:H,reflect:!1,hasChanged:q},X=Promise.resolve(!0),Y=1,G=4,J=8,K=16,Z=32;class Q extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=X,this._hasConnectedResolver=void 0,this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((e,i)=>{const s=this._attributeNameForProperty(i,e);void 0!==s&&(this._attributeToPropertyMap.set(s,i),t.push(s))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,e)=>this._classProperties.set(e,t))}}static createProperty(t,e=F){if(this._ensureClassProperties(),this._classProperties.set(t,e),e.noAccessor||this.prototype.hasOwnProperty(t))return;const i="symbol"==typeof t?Symbol():`__${t}`;Object.defineProperty(this.prototype,t,{get(){return this[i]},set(e){const s=this[t];this[i]=e,this._requestUpdate(t,s)},configurable:!0,enumerable:!0})}static finalize(){if(this.hasOwnProperty(JSCompiler_renameProperty("finalized",this))&&this.finalized)return;const t=Object.getPrototypeOf(this);if("function"==typeof t.finalize&&t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,e=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const i of e)this.createProperty(i,t[i])}}static _attributeNameForProperty(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,e,i=q){return i(t,e)}static _propertyValueFromAttribute(t,e){const i=e.type,s=e.converter||H,o="function"==typeof s?s:s.fromAttribute;return o?o(t,i):t}static _propertyValueToAttribute(t,e){if(void 0===e.reflect)return;const i=e.type,s=e.converter;return(s&&s.toAttribute||H.toAttribute)(t,i)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,e)=>{if(this.hasOwnProperty(e)){const t=this[e];delete this[e],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(e,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,e)=>this[e]=t),this._instanceProperties=void 0}connectedCallback(){this._updateState=this._updateState|Z,this._hasConnectedResolver&&(this._hasConnectedResolver(),this._hasConnectedResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,e,i){e!==i&&this._attributeToProperty(t,i)}_propertyToAttribute(t,e,i=F){const s=this.constructor,o=s._attributeNameForProperty(t,i);if(void 0!==o){const t=s._propertyValueToAttribute(e,i);if(void 0===t)return;this._updateState=this._updateState|J,null==t?this.removeAttribute(o):this.setAttribute(o,t),this._updateState=this._updateState&~J}}_attributeToProperty(t,e){if(this._updateState&J)return;const i=this.constructor,s=i._attributeToPropertyMap.get(t);if(void 0!==s){const t=i._classProperties.get(s)||F;this._updateState=this._updateState|K,this[s]=i._propertyValueFromAttribute(e,t),this._updateState=this._updateState&~K}}_requestUpdate(t,e){let i=!0;if(void 0!==t){const s=this.constructor,o=s._classProperties.get(t)||F;s._valueHasChanged(this[t],e,o.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,e),!0!==o.reflect||this._updateState&K||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,o))):i=!1}!this._hasRequestedUpdate&&i&&this._enqueueUpdate()}requestUpdate(t,e){return this._requestUpdate(t,e),this.updateComplete}async _enqueueUpdate(){let t,e;this._updateState=this._updateState|G;const i=this._updatePromise;this._updatePromise=new Promise((i,s)=>{t=i,e=s});try{await i}catch(t){}this._hasConnected||await new Promise(t=>this._hasConnectedResolver=t);try{const t=this.performUpdate();null!=t&&await t}catch(t){e(t)}t(!this._hasRequestedUpdate)}get _hasConnected(){return this._updateState&Z}get _hasRequestedUpdate(){return this._updateState&G}get hasUpdated(){return this._updateState&Y}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const e=this._changedProperties;try{(t=this.shouldUpdate(e))&&this.update(e)}catch(e){throw t=!1,e}finally{this._markUpdated()}t&&(this._updateState&Y||(this._updateState=this._updateState|Y,this.firstUpdated(e)),this.updated(e))}_markUpdated(){this._changedProperties=new Map,this._updateState=this._updateState&~G}get updateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,e)=>this._propertyToAttribute(e,this[e],t)),this._reflectingProperties=void 0)}updated(t){}firstUpdated(t){}}Q.finalized=!0;const tt=t=>e=>"function"==typeof e?((t,e)=>(window.customElements.define(t,e),e))(t,e):((t,e)=>{const{kind:i,elements:s}=e;return{kind:i,elements:s,finisher(e){window.customElements.define(t,e)}}})(t,e),et=(t,e)=>"method"!==e.kind||!e.descriptor||"value"in e.descriptor?{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}}:Object.assign({},e,{finisher(i){i.createProperty(e.key,t)}}),it=(t,e,i)=>{e.constructor.createProperty(i,t)};function st(t){return(e,i)=>void 0!==i?it(t,e,i):et(t,e)}function ot(t){return(e,i)=>{const s={get(){return this.renderRoot.querySelector(t)},enumerable:!0,configurable:!0};return void 0!==i?nt(s,e,i):rt(s,e)}}const nt=(t,e,i)=>{Object.defineProperty(e,i,t)},rt=(t,e)=>({kind:"method",placement:"prototype",key:e.key,descriptor:t}),at="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dt=Symbol();class lt{constructor(t,e){if(e!==dt)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(at?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}const ht=(t,...e)=>{const i=e.reduce((e,i,s)=>e+(t=>{if(t instanceof lt)return t.cssText;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(i)+t[s+1],t[0]);return new lt(i,dt)};(window.litElementVersions||(window.litElementVersions=[])).push("2.0.1");const ct=t=>t.flat?t.flat(1/0):function t(e,i=[]){for(let s=0,o=e.length;s<o;s++){const o=e[s];Array.isArray(o)?t(o,i):i.push(o)}return i}(t);class pt extends Q{static finalize(){super.finalize(),this._styles=this.hasOwnProperty(JSCompiler_renameProperty("styles",this))?this._getUniqueStyles():this._styles||[]}static _getUniqueStyles(){const t=this.styles,e=[];if(Array.isArray(t)){ct(t).reduceRight((t,e)=>(t.add(e),t),new Set).forEach(t=>e.unshift(t))}else t&&e.push(t);return e}initialize(){super.initialize(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?at?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){super.update(t);const e=this.render();e instanceof b&&this.constructor.render(e,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const e=document.createElement("style");e.textContent=t.cssText,this.renderRoot.appendChild(e)}))}render(){}}pt.finalized=!0,pt.render=((t,e,i)=>{const s=i.scopeName,n=A.has(e),r=I&&11===e.nodeType&&!!e.host&&t instanceof b,a=r&&!V.has(s),d=a?document.createDocumentFragment():e;if(((t,e,i)=>{let s=A.get(e);void 0===s&&(o(e,e.firstChild),A.set(e,s=new k(Object.assign({templateFactory:O},i))),s.appendInto(e)),s.setValue(t),s.commit()})(t,d,Object.assign({templateFactory:z(s)},i)),a){const t=A.get(d);A.delete(d),t.value instanceof y&&U(d,t.value.template,s),o(e,e.firstChild),e.appendChild(d),A.set(e,t)}!n&&r&&window.ShadyCSS.styleElement(e.host)});class ut extends pt{fireEvent(t,e,i=!0,s=!0){if(t){const o={bubbles:"boolean"!=typeof i||i,composed:"boolean"!=typeof s||s};e&&(o.detail=e);const n=window.SlickCustomEvent||CustomEvent;this.dispatchEvent(new n(t,o))}}}class ft{constructor(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}isUndefined(){return this._undefined}intersects(t){if(this.isUndefined()||t.isUndefined())return!1;let e=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,o=0;const n=this.a,r=this.b,a=this.c;return Math.abs(r)>1e-5&&(e=-n/r,s=-a/r),Math.abs(t.b)>1e-5&&(i=-t.a/t.b,o=-t.c/t.b),e===Number.MAX_VALUE?i===Number.MAX_VALUE?-a/n==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+o,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+s,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(n)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===i?s===o&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(o-s)/(e-i),this.yi=e*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))}}class gt{constructor(t,e,i,s,o,n,r,a){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=i,this.right=s,this.gap=o,this.sinAngle=n,this.tanAngle=a,Math.abs(n)<1e-4?this.pos=i+o:Math.abs(n)>.9999?this.pos=t+o:(this.deltaX=(e-t)*Math.abs(a),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(o/r),this.sLeft=new ft([i,e],[i,t]),this.sRight=new ft([s,e],[s,t]))}nextLine(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){const t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){const t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{let t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,i=this.bottom,s=this.top;if(this.pos<this.right+this.deltaX){for(;t<this.left&&e<this.left||t>this.right&&e>this.right;)if(this.pos+=this.hGap,t=this.pos-this.deltaX/2,e=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;const o=new ft([t,i],[e,s]);this.sLeft&&o.intersects(this.sLeft)&&(t=o.xi,i=o.yi),this.sRight&&o.intersects(this.sRight)&&(e=o.xi,s=o.yi),this.tanAngle>0&&(t=this.right-(t-this.left),e=this.right-(e-this.left));const n=[t,i,e,s];return this.pos+=this.hGap,n}}return null}}function yt(t,e){const i=[],s=new ft([t[0],t[1]],[t[2],t[3]]);for(let t=0;t<e.length;t++){const o=new ft(e[t],e[(t+1)%e.length]);s.intersects(o)&&i.push([s.xi,s.yi])}return i}function bt(t,e,i,s,o,n,r){return[-i*n-s*o+i+n*t+o*e,r*(i*o-s*n)+s+-r*o*t+r*n*e]}const mt=2,vt=1,wt=.85,xt=0,kt=9;class St{constructor(){this.p=""}get value(){return this.p.trim()}moveTo(t,e){this.p=`${this.p}M ${t} ${e} `}bcurveTo(t,e,i,s,o,n){this.p=`${this.p}C ${t} ${e}, ${i} ${s}, ${o} ${n} `}}function Ct(t,e){const i=document.createElementNS("http://www.w3.org/2000/svg",t);if(e)for(const t in e)i.setAttributeNS(null,t,e[t]);return i}function _t(t,e){return vt*(Math.random()*(e-t)+t)}function Rt(t,e,i,s,o){const n=Math.pow(t-i,2)+Math.pow(e-s,2);let r=mt;r*r*100>n&&(r=Math.sqrt(n)/10);const a=r/2,d=.2+.2*Math.random();let l=wt*mt*(s-e)/200,h=wt*mt*(t-i)/200;l=_t(-l,l),h=_t(-h,h);const c=o||new St;return c.moveTo(t+_t(-r,r),e+_t(-r,r)),c.bcurveTo(l+t+(i-t)*d+_t(-r,r),h+e+(s-e)*d+_t(-r,r),l+t+2*(i-t)*d+_t(-r,r),h+e+2*(s-e)*d+_t(-r,r),i+_t(-r,r),s+_t(-r,r)),c.moveTo(t+_t(-a,a),e+_t(-a,a)),c.bcurveTo(l+t+(i-t)*d+_t(-a,a),h+e+(s-e)*d+_t(-a,a),l+t+2*(i-t)*d+_t(-a,a),h+e+2*(s-e)*d+_t(-a,a),i+_t(-a,a),s+_t(-a,a)),c}function Mt(t,e,i,s,o=!1,n=!1,r){r=r||new St;const a=Math.pow(t-i,2)+Math.pow(e-s,2);let d=mt;d*d*100>a&&(d=Math.sqrt(a)/10);const l=d/2,h=.2+.2*Math.random();let c=wt*mt*(s-e)/200,p=wt*mt*(t-i)/200;return c=_t(-c,c),p=_t(-p,p),o&&r.moveTo(t+_t(-d,d),e+_t(-d,d)),n?r.bcurveTo(c+t+(i-t)*h+_t(-l,l),p+e+(s-e)*h+_t(-l,l),c+t+2*(i-t)*h+_t(-l,l),p+e+2*(s-e)*h+_t(-l,l),i+_t(-l,l),s+_t(-l,l)):r.bcurveTo(c+t+(i-t)*h+_t(-d,d),p+e+(s-e)*h+_t(-d,d),c+t+2*(i-t)*h+_t(-d,d),p+e+2*(s-e)*h+_t(-d,d),i+_t(-d,d),s+_t(-d,d)),r}function Nt(t,e,i,s,o,n,r,a){const d=_t(-.5,.5)-Math.PI/2,l=[];l.push([_t(-n,n)+e+.9*s*Math.cos(d-t),_t(-n,n)+i+.9*o*Math.sin(d-t)]);for(let r=d;r<2*Math.PI+d-.01;r+=t)l.push([_t(-n,n)+e+s*Math.cos(r),_t(-n,n)+i+o*Math.sin(r)]);return l.push([_t(-n,n)+e+s*Math.cos(d+2*Math.PI+.5*r),_t(-n,n)+i+o*Math.sin(d+2*Math.PI+.5*r)]),l.push([_t(-n,n)+e+.98*s*Math.cos(d+r),_t(-n,n)+i+.98*o*Math.sin(d+r)]),l.push([_t(-n,n)+e+.9*s*Math.cos(d+.5*r),_t(-n,n)+i+.9*o*Math.sin(d+.5*r)]),function(t,e){const i=t.length;let s=e||new St;if(i>3){const e=[],o=1-xt;s.moveTo(t[1][0],t[1][1]);for(let n=1;n+2<i;n++){const i=t[n];e[0]=[i[0],i[1]],e[1]=[i[0]+(o*t[n+1][0]-o*t[n-1][0])/6,i[1]+(o*t[n+1][1]-o*t[n-1][1])/6],e[2]=[t[n+1][0]+(o*t[n][0]-o*t[n+2][0])/6,t[n+1][1]+(o*t[n][1]-o*t[n+2][1])/6],e[3]=[t[n+1][0],t[n+1][1]],s.bcurveTo(e[1][0],e[1][1],e[2][0],e[2][1],e[3][0],e[3][1])}}else 3===i?(s.moveTo(t[0][0],t[0][1]),s.bcurveTo(t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1])):2===i&&(s=Rt(t[0][0],t[0][1],t[1][0],t[1][1],s));return s}(l,a)}function Et(t,e,i,s,o){const n=Ct("path",{d:Rt(e,i,s,o).value});return t.appendChild(n),n}function Ot(t,e,i,s,o){o-=4;let n=Rt(e+=2,i+=2,e+(s-=4),i);n=Rt(e+s,i,e+s,i+o,n),n=Rt(e+s,i+o,e,i+o,n);const r=Ct("path",{d:(n=Rt(e,i+o,e,i,n)).value});return t.appendChild(r),r}function Pt(t,e){let i;const s=e.length;if(s>2)for(let t=0;t<2;t++){let o=!0;for(let t=1;t<s;t++)i=Mt(e[t-1][0],e[t-1][1],e[t][0],e[t][1],o,t>0,i),o=!1;i=Mt(e[s-1][0],e[s-1][1],e[0][0],e[0][1],o,t>0,i)}else i=2===s?Rt(e[0][0],e[0][1],e[1][0],e[1][1]):new St;const o=Ct("path",{d:i.value});return t.appendChild(o),o}function At(t,e,i,s,o){s=Math.max(s>10?s-4:s-1,1),o=Math.max(o>10?o-4:o-1,1);const n=2*Math.PI/kt;let r=Math.abs(s/2),a=Math.abs(o/2),d=Nt(n,e,i,r+=_t(.05*-r,.05*r),a+=_t(.05*-a,.05*a),1,n*_t(.1,_t(.4,1)));const l=Ct("path",{d:(d=Nt(n,e,i,r,a,1.5,0,d)).value});return t.appendChild(l),l}function Wt(t){const e=Ct("g");let i=null;return t.forEach(t=>{Et(e,t[0][0],t[0][1],t[1][0],t[1][1]),i&&Et(e,i[0],i[1],t[0][0],t[0][1]),i=t[1]}),e}const Tt={bowing:wt,curveStepCount:kt,curveTightness:xt,dashGap:0,dashOffset:0,fill:"#000",fillStyle:"hachure",fillWeight:1,hachureAngle:-41,hachureGap:5,maxRandomnessOffset:mt,roughness:vt,simplification:1,stroke:"#000",strokeWidth:2,zigzagOffset:0};function Dt(t){return Wt(function(t,e){const i=[];if(t&&t.length){let s=t[0][0],o=t[0][0],n=t[0][1],r=t[0][1];for(let e=1;e<t.length;e++)s=Math.min(s,t[e][0]),o=Math.max(o,t[e][0]),n=Math.min(n,t[e][1]),r=Math.max(r,t[e][1]);const a=e.hachureAngle;let d=e.hachureGap;d<0&&(d=4*e.strokeWidth),d=Math.max(d,.1);const l=a%180*(Math.PI/180),h=Math.cos(l),c=Math.sin(l),p=Math.tan(l),u=new gt(n-1,r+1,s-1,o+1,d,c,h,p);let f;for(;null!=(f=u.nextLine());){const e=yt(f,t);for(let t=0;t<e.length;t++)if(t<e.length-1){const s=e[t],o=e[t+1];i.push([s,o])}}}return i}(t,Tt))}function jt(t,e,i,s){return Wt(function(t,e,i,s,o,n){const r=[];let a=Math.abs(s/2),d=Math.abs(o/2);a+=t.randOffset(.05*a,n),d+=t.randOffset(.05*d,n);const l=n.hachureAngle;let h=n.hachureGap;h<=0&&(h=4*n.strokeWidth);let c=n.fillWeight;c<0&&(c=n.strokeWidth/2);const p=l%180*(Math.PI/180),u=Math.tan(p),f=d/a,g=Math.sqrt(f*u*f*u+1),y=f*u/g,b=1/g,m=h/(a*d/Math.sqrt(d*b*(d*b)+a*y*(a*y))/a);let v=Math.sqrt(a*a-(e-a+m)*(e-a+m));for(let t=e-a+m;t<e+a;t+=m){const s=bt(t,i-(v=Math.sqrt(a*a-(e-t)*(e-t))),e,i,y,b,f),o=bt(t,i+v,e,i,y,b,f);r.push([s,o])}return r}({randOffset:(t,e)=>_t(-t,t)},t,e,i,s,Tt))}var $t=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Lt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredButton=class extends ut{constructor(){super(...arguments),this.elevation=1,this.disabled=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      font-family: inherit;
      cursor: pointer;
      padding: 8px 10px;
      position: relative;
      text-align: center;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      display: inline-flex;
      outline: none;
      letter-spacing: 1.25px;
      font-size: 14px;
      text-transform: uppercase;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:active) path {
      transform: scale(0.97) translate(1.5%, 1.5%);
    }

    :host(.wired-disabled) {
      opacity: 0.6 !important;
      background: rgba(0, 0, 0, 0.07);
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
      transition: transform 0.05s ease;
    }
    `}render(){return W`
    <slot></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(Math.max(1,this.elevation),5),o=i.width+2*(s-1),n=i.height+2*(s-1);e.setAttribute("width",`${o}`),e.setAttribute("height",`${n}`),Ot(e,0,0,i.width,i.height);for(let t=1;t<s;t++)Et(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Et(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`,Et(e,2*t,i.height+2*t,i.width+2*t,i.height+2*t).style.opacity=`${(75-10*t)/100}`,Et(e,i.width+2*t,i.height+2*t,i.width+2*t,2*t).style.opacity=`${(75-10*t)/100}`;this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},$t([st({type:Number}),Lt("design:type",Object)],t.WiredButton.prototype,"elevation",void 0),$t([st({type:Boolean,reflect:!0}),Lt("design:type",Object)],t.WiredButton.prototype,"disabled",void 0),t.WiredButton=$t([tt("wired-button")],t.WiredButton);var It=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},zt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCard=class extends ut{constructor(){super(...arguments),this.elevation=1}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      padding: 10px;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
    `}render(){return W`
    <div>
      <slot @slotchange="${()=>this.requestUpdate()}"></slot>
    </div>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.updated.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}debounce(t,e,i,s){let o=0;return()=>{const n=arguments,r=i&&!o;clearTimeout(o),o=window.setTimeout(()=>{o=0,i||t.apply(s,n)},e),r&&t.apply(s,n)}}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect(),i=Math.min(Math.max(1,this.elevation),5),s=e.width+2*(i-1),o=e.height+2*(i-1);t.setAttribute("width",`${s}`),t.setAttribute("height",`${o}`),Ot(t,2,2,e.width-4,e.height-4);for(let s=1;s<i;s++)Et(t,2*s,e.height-4+2*s,e.width-4+2*s,e.height-4+2*s).style.opacity=`${(85-10*s)/100}`,Et(t,e.width-4+2*s,e.height-4+2*s,e.width-4+2*s,2*s).style.opacity=`${(85-10*s)/100}`,Et(t,2*s,e.height-4+2*s,e.width-4+2*s,e.height-4+2*s).style.opacity=`${(85-10*s)/100}`,Et(t,e.width-4+2*s,e.height-4+2*s,e.width-4+2*s,2*s).style.opacity=`${(85-10*s)/100}`;this.classList.add("wired-rendered")}},It([st({type:Number}),zt("design:type",Object)],t.WiredCard.prototype,"elevation",void 0),t.WiredCard=It([tt("wired-card")],t.WiredCard);var Bt=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Vt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCheckbox=class extends ut{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return ht`
    :host {
      display: block;
      font-family: inherit;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-checkbox-icon-color, currentColor);
      stroke-width: 0.7;
    }
    `}render(){return W`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=24,s=24;e.setAttribute("width",`${i}`),e.setAttribute("height",`${s}`),Ot(e,0,0,i,s);const o=[];o.push(Et(e,.3*i,.4*s,.5*i,.7*s)),o.push(Et(e,.5*i,.7*s,i+5,-5)),o.forEach(t=>{t.style.strokeWidth="2.5"}),this.checked?o.forEach(t=>{t.style.display=""}):o.forEach(t=>{t.style.display="none"}),this.classList.add("wired-rendered")}},Bt([st({type:Boolean}),Vt("design:type",Object)],t.WiredCheckbox.prototype,"checked",void 0),Bt([st({type:Boolean,reflect:!0}),Vt("design:type",Object)],t.WiredCheckbox.prototype,"disabled",void 0),t.WiredCheckbox=Bt([tt("wired-checkbox")],t.WiredCheckbox);var Ut=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Ht=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredItem=class extends ut{constructor(){super(...arguments),this.value="",this.name="",this.selected=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      font-size: 14px;
      text-align: left;
    }
    button {
      cursor: pointer;
      outline: none;
      overflow: hidden;
      color: inherit;
      user-select: none;
      position: relative;
      font-family: inherit;
      text-align: inherit;
      font-size: inherit;
      letter-spacing: 1.25px;
      padding: 1px 10px;
      min-height: 36px;
      text-transform: inherit;
      background: none;
      border: none;
      transition: background-color 0.3s ease, color 0.3s ease;
      width: 100%;
      box-sizing: border-box;
      white-space: nowrap;
    }
    button.selected {
      color: var(--wired-item-selected-color, #fff);
    }
    button::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: currentColor;
      opacity: 0;
    }
    button span {
      display: inline-block;
      transition: transform 0.2s ease;
      position: relative;
    }
    button:active span {
      transform: scale(1.02);
    }
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      display: none;
    }
    button.selected .overlay {
      display: block;
    }
    svg {
      display: block;
    }
    path {
      stroke: var(--wired-item-selected-bg, #000);
      stroke-width: 2.75;
      fill: transparent;
      transition: transform 0.05s ease;
    }
    @media (hover: hover) {
      button:hover::before {
        opacity: 0.05;
      }
    }
    `}render(){return W`
    <button class="${this.selected?"selected":""}">
      <div class="overlay">
        <svg></svg>
      </div>
      <span>
        <slot></slot>
      </span>
    </button>`}firstUpdated(){this.selected&&setTimeout(()=>this.requestUpdate())}updated(){if(this.svg){for(;this.svg.hasChildNodes();)this.svg.removeChild(this.svg.lastChild);const t=this.getBoundingClientRect();this.svg.setAttribute("width",`${t.width}`),this.svg.setAttribute("height",`${t.height}`);const e=Dt([[0,0],[t.width,0],[t.width,t.height],[0,t.height]]);this.svg.appendChild(e)}}},Ut([st(),Ht("design:type",Object)],t.WiredItem.prototype,"value",void 0),Ut([st(),Ht("design:type",Object)],t.WiredItem.prototype,"name",void 0),Ut([st({type:Boolean}),Ht("design:type",Object)],t.WiredItem.prototype,"selected",void 0),Ut([ot("svg"),Ht("design:type",SVGSVGElement)],t.WiredItem.prototype,"svg",void 0),t.WiredItem=Ut([tt("wired-item")],t.WiredItem);var qt=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Ft=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredCombo=class extends ut{constructor(){super(...arguments),this.disabled=!1,this.cardShowing=!1,this.itemNodes=[]}static get styles(){return ht`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }
  
    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }
    
    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      white-space: nowrap;
      position: relative;
    }
  
    .inline {
      display: inline-block;
      vertical-align: top
    }
  
    #textPanel {
      min-width: 90px;
      min-height: 18px;
      padding: 8px;
    }
  
    #dropPanel {
      width: 34px;
      cursor: pointer;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    #card {
      position: absolute;
      background: var(--wired-combo-popup-bg, white);
      z-index: 1;
      box-shadow: 1px 5px 15px -6px rgba(0, 0, 0, 0.8);
    }

    ::slotted(wired-item) {
      display: block;
    }
    `}render(){return W`
    <div id="container" @click="${this.onCombo}">
      <div id="textPanel" class="inline">
        <span>${this.value&&this.value.text}</span>
      </div>
      <div id="dropPanel" class="inline"></div>
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
    </div>
    <wired-card id="card" tabindex="-1" role="listbox" @mousedown="${this.onItemClick}" @touchstart="${this.onItemClick}"
      style="display: none;">
      <slot id="slot"></slot>
    </wired-card>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){this.setAttribute("role","combobox"),this.setAttribute("aria-haspopup","listbox"),this.refreshSelection(),this.addEventListener("blur",()=>{this.cardShowing&&this.setCardShowing(!1)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext();break;case 27:t.preventDefault(),this.cardShowing&&this.setCardShowing(!1);break;case 13:t.preventDefault(),this.setCardShowing(!this.cardShowing);break;case 32:t.preventDefault(),this.cardShowing||this.setCardShowing(!0)}})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.shadowRoot.getElementById("container").getBoundingClientRect();e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`);const s=this.shadowRoot.getElementById("textPanel").getBoundingClientRect();this.shadowRoot.getElementById("dropPanel").style.minHeight=s.height+"px",Ot(e,0,0,s.width,s.height);const o=s.width-4;Ot(e,o,0,34,s.height);const n=Math.max(0,Math.abs((s.height-24)/2)),r=Pt(e,[[o+8,5+n],[o+26,5+n],[o+17,n+Math.min(s.height,18)]]);if(r.style.fill="currentColor",r.style.pointerEvents=this.disabled?"none":"auto",r.style.cursor="pointer",this.classList.add("wired-rendered"),this.setAttribute("aria-expanded",`${this.cardShowing}`),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}setCardShowing(t){this.cardShowing=t;const e=this.shadowRoot.getElementById("card");e.style.display=t?"":"none",t&&setTimeout(()=>{e.requestUpdate(),this.shadowRoot.getElementById("slot").assignedNodes().filter(t=>t.nodeType===Node.ELEMENT_NODE).forEach(t=>{const e=t;e.requestUpdate&&e.requestUpdate()})},10),this.setAttribute("aria-expanded",`${this.cardShowing}`)}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected(),setTimeout(()=>{this.setCardShowing(!1)})}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}onCombo(t){t.stopPropagation(),this.setCardShowing(!this.cardShowing)}},qt([st({type:Object}),Ft("design:type",Object)],t.WiredCombo.prototype,"value",void 0),qt([st({type:String}),Ft("design:type",String)],t.WiredCombo.prototype,"selected",void 0),qt([st({type:Boolean,reflect:!0}),Ft("design:type",Object)],t.WiredCombo.prototype,"disabled",void 0),t.WiredCombo=qt([tt("wired-combo")],t.WiredCombo);const Xt=ht`:host{font-family:var(--mdc-icon-font, "Material Icons");font-weight:normal;font-style:normal;font-size:var(--mdc-icon-size, 24px);line-height:1;letter-spacing:normal;text-transform:none;display:inline-block;white-space:nowrap;word-wrap:normal;direction:ltr;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased}`,Yt=document.createElement("link");Yt.rel="stylesheet",Yt.href="https://fonts.googleapis.com/icon?family=Material+Icons",document.head.appendChild(Yt);var Gt=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r};let Jt=class extends pt{render(){return W`<slot></slot>`}};Jt.styles=Xt,Jt=Gt([tt("mwc-icon")],Jt);var Kt=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Zt=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredIconButton=class extends ut{constructor(){super(...arguments),this.disabled=!1}static get styles(){return ht`
    :host {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      padding: 8px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box !important;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      pointer-events: none;
    }
  
    :host(:active) path {
      transform: scale(0.96) translate(2%, 2%);
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: var(--wired-icon-bg-color, transparent);
      transition: transform 0.05s ease;
    }
  
    mwc-icon {
      position: relative;
      font-size: var(--wired-icon-size, 24px);
    }
    `}render(){return W`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`),At(e,s/2,s/2,s,s),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},Kt([st({type:Boolean,reflect:!0}),Zt("design:type",Object)],t.WiredIconButton.prototype,"disabled",void 0),t.WiredIconButton=Kt([tt("wired-icon-button")],t.WiredIconButton);var Qt=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},te=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredInput=class extends ut{constructor(){super(...arguments),this.placeholder="",this.type="text",this.autocomplete="",this.autocapitalize="",this.autocorrect="",this.disabled=!1,this.required=!1,this.autofocus=!1,this.readonly=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      padding: 5px;
      font-family: sans-serif;
      width: 150px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      outline: none;
      border: none;
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      color: inherit;
      padding: 6px;
    }
    `}render(){return W`
    <input id="txt" name="${this.name}" type="${this.type}" placeholder="${this.placeholder}" ?disabled="${this.disabled}"
      ?required="${this.required}" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" minlength="${this.minlength}"
      maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" ?readonly="${this.readonly}"
      size="${this.size}" autocapitalize="${this.autocapitalize}" autocorrect="${this.autocorrect}" @change="${this.onChange}">
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get input(){return this.shadowRoot?this.shadowRoot.getElementById("txt"):null}get value(){const t=this.input;return t&&t.value||""}set value(t){if(this.shadowRoot){const e=this.input;e&&(e.value=t)}else this.pendingValue=t}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect();e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Ot(e,0,0,i.width,i.height),void 0!==this.pendingValue&&(this.input.value=this.pendingValue,delete this.pendingValue),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}onChange(t){t.stopPropagation(),this.fireEvent(t.type,{sourceEvent:t})}},Qt([st({type:String}),te("design:type",Object)],t.WiredInput.prototype,"placeholder",void 0),Qt([st({type:String}),te("design:type",String)],t.WiredInput.prototype,"name",void 0),Qt([st({type:String}),te("design:type",String)],t.WiredInput.prototype,"min",void 0),Qt([st({type:String}),te("design:type",String)],t.WiredInput.prototype,"max",void 0),Qt([st({type:String}),te("design:type",String)],t.WiredInput.prototype,"step",void 0),Qt([st({type:String}),te("design:type",Object)],t.WiredInput.prototype,"type",void 0),Qt([st({type:String}),te("design:type",Object)],t.WiredInput.prototype,"autocomplete",void 0),Qt([st({type:String}),te("design:type",Object)],t.WiredInput.prototype,"autocapitalize",void 0),Qt([st({type:String}),te("design:type",Object)],t.WiredInput.prototype,"autocorrect",void 0),Qt([st({type:Boolean,reflect:!0}),te("design:type",Object)],t.WiredInput.prototype,"disabled",void 0),Qt([st({type:Boolean}),te("design:type",Object)],t.WiredInput.prototype,"required",void 0),Qt([st({type:Boolean}),te("design:type",Object)],t.WiredInput.prototype,"autofocus",void 0),Qt([st({type:Boolean}),te("design:type",Object)],t.WiredInput.prototype,"readonly",void 0),Qt([st({type:Number}),te("design:type",Number)],t.WiredInput.prototype,"minlength",void 0),Qt([st({type:Number}),te("design:type",Number)],t.WiredInput.prototype,"maxlength",void 0),Qt([st({type:Number}),te("design:type",Number)],t.WiredInput.prototype,"size",void 0),t.WiredInput=Qt([tt("wired-input")],t.WiredInput);var ee=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},ie=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredListbox=class extends ut{constructor(){super(...arguments),this.horizontal=!1,this.itemNodes=[],this.itemClickHandler=this.onItemClick.bind(this)}static get styles(){return ht`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      padding: 5px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }

    ::slotted(wired-item) {
      display: block;
    }

    :host(.wired-horizontal) ::slotted(wired-item) {
      display: inline-block;
    }
    `}render(){return W`
    <slot id="slot" @slotchange="${()=>this.requestUpdate()}"></slot>
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}firstUpdated(){this.setAttribute("role","listbox"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.refreshSelection(),this.addEventListener("click",this.itemClickHandler),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();if(t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),Ot(t,0,0,e.width,e.height),this.classList.add("wired-rendered"),this.horizontal?this.classList.add("wired-horizontal"):this.classList.remove("wired-horizontal"),!this.itemNodes.length){this.itemNodes=[];const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];"WIRED-ITEM"===i.tagName&&(i.setAttribute("role","option"),this.itemNodes.push(i))}}}onItemClick(t){t.stopPropagation(),this.selected=t.target.value,this.refreshSelection(),this.fireSelected()}refreshSelection(){this.lastSelectedItem&&(this.lastSelectedItem.selected=!1,this.lastSelectedItem.removeAttribute("aria-selected"));const t=this.shadowRoot.getElementById("slot").assignedNodes();if(t){let e=null;for(let i=0;i<t.length;i++){const s=t[i];if("WIRED-ITEM"===s.tagName){const t=s.value||"";if(this.selected&&t===this.selected){e=s;break}}}this.lastSelectedItem=e||void 0,this.lastSelectedItem&&(this.lastSelectedItem.selected=!0,this.lastSelectedItem.setAttribute("aria-selected","true")),this.value=e?{value:e.value||"",text:e.textContent||""}:void 0}}fireSelected(){this.fireEvent("selected",{selected:this.selected})}selectPrevious(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}selectNext(){const t=this.itemNodes;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.lastSelectedItem){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].value||"",this.refreshSelection(),this.fireSelected()}}},ee([st({type:Object}),ie("design:type",Object)],t.WiredListbox.prototype,"value",void 0),ee([st({type:String}),ie("design:type",String)],t.WiredListbox.prototype,"selected",void 0),ee([st({type:Boolean}),ie("design:type",Object)],t.WiredListbox.prototype,"horizontal",void 0),t.WiredListbox=ee([tt("wired-listbox")],t.WiredListbox);var se=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},oe=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredProgress=class extends ut{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.percentage=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      width: 400px;
      height: 42px;
      font-family: sans-serif;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    .labelContainer {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  
    .progressLabel {
      color: var(--wired-progress-label-color, #000);
      font-size: var(--wired-progress-font-size, 14px);
      background: var(--wired-progress-label-background, rgba(255,255,255,0.9));
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 1.25px;
    }
  
    .progbox path {
      stroke: var(--wired-progress-color, rgba(0, 0, 200, 0.8));
      stroke-width: 2.75;
      fill: none;
    }
    `}render(){return W`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <div class="overlay labelContainer">
      <div class="progressLabel">${this.getProgressLabel()}</div>
    </div>
    `}getProgressLabel(){if(this.percentage){if(this.max===this.min)return"%";return Math.floor((this.value-this.min)/(this.max-this.min)*100)+"%"}return""+this.value}updated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`),this.box?t.appendChild(this.box):this.box=Ot(t,0,0,e.width,e.height);let i=0;if(this.max>this.min){i=(this.value-this.min)/(this.max-this.min);const s=e.width*Math.max(0,Math.min(i,100)),o=Dt([[0,0],[s,0],[s,e.height],[0,e.height]]);t.appendChild(o),o.classList.add("progbox")}this.classList.add("wired-rendered")}},se([st({type:Number}),oe("design:type",Object)],t.WiredProgress.prototype,"value",void 0),se([st({type:Number}),oe("design:type",Object)],t.WiredProgress.prototype,"min",void 0),se([st({type:Number}),oe("design:type",Object)],t.WiredProgress.prototype,"max",void 0),se([st({type:Boolean}),oe("design:type",Object)],t.WiredProgress.prototype,"percentage",void 0),t.WiredProgress=se([tt("wired-progress")],t.WiredProgress);var ne=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},re=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadio=class extends ut{constructor(){super(...arguments),this.checked=!1,this.disabled=!1,this.iconsize=24}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      padding: 5px;
      font-family: inherit;
      width: 150px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }
  
    #container {
      display: inline-block;
      white-space: nowrap;
    }
  
    .inline {
      display: inline-block;
      vertical-align: middle;
      -moz-user-select: none;
      user-select: none;
    }
  
    #checkPanel {
      cursor: pointer;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-radio-icon-color, currentColor);
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .filledPath {
      fill: var(--wired-radio-icon-color, currentColor);
    }
    `}render(){return W`
    <div id="container" @click="${this.toggleCheck}">
      <div id="checkPanel" class="inline">
        <svg id="svg" width="0" height="0"></svg>
      </div>
      <div class="inline">
        <slot></slot>
      </div>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","checkbox"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())})}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);this.dot=void 0;const i={width:this.iconsize||24,height:this.iconsize||24};e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),At(e,i.width/2,i.height/2,i.width,i.height);const s=Math.max(.6*i.width,5),o=Math.max(.6*i.height,5);this.dot=At(e,i.width/2,i.height/2,s,o),this.dot.classList.add("filledPath"),this.dot.style.display=this.checked?"":"none",this.classList.add("wired-rendered")}},ne([st({type:Boolean}),re("design:type",Object)],t.WiredRadio.prototype,"checked",void 0),ne([st({type:Boolean,reflect:!0}),re("design:type",Object)],t.WiredRadio.prototype,"disabled",void 0),ne([st({type:String}),re("design:type",String)],t.WiredRadio.prototype,"name",void 0),ne([st({type:Number}),re("design:type",Object)],t.WiredRadio.prototype,"iconsize",void 0),t.WiredRadio=ne([tt("wired-radio")],t.WiredRadio);var ae=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},de=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredRadioGroup=class extends ut{constructor(){super(...arguments),this.radioNodes=[],this.checkListener=this.handleChecked.bind(this)}static get styles(){return ht`
    :host {
      display: inline-block;
    }
  
    :host ::slotted(*) {
      padding: var(--wired-radio-group-item-padding, 5px);
    }
    `}render(){return W`
    <slot id="slot" @slotchange="${this.slotChange}"></slot>
    `}connectedCallback(){super.connectedCallback(),this.addEventListener("change",this.checkListener)}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.removeEventListener("checked",this.checkListener)}handleChecked(t){const e=t.detail.checked,i=t.target,s=i.name||"";e?(this.selected=e&&s||"",this.fireSelected()):i.checked=!0}fireSelected(){this.fireEvent("selected",{selected:this.selected})}slotChange(){this.requestUpdate()}firstUpdated(){this.setAttribute("role","radiogroup"),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.shadowRoot.getElementById("slot").assignedNodes();if(this.radioNodes=[],t&&t.length)for(let e=0;e<t.length;e++){const i=t[e];if("WIRED-RADIO"===i.tagName){this.radioNodes.push(i);const t=i.name||"";this.selected&&t===this.selected?i.checked=!0:i.checked=!1}}}selectPrevious(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(--i<0&&(i=t.length-1),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}selectNext(){const t=this.radioNodes;if(t.length){let e=null,i=-1;if(this.selected){for(let e=0;e<t.length;e++){if(t[e].name===this.selected){i=e;break}}i<0?e=t[0]:(++i>=t.length&&(i=0),e=t[i])}else e=t[0];e&&(e.focus(),this.selected=e.name,this.fireSelected())}}},ae([st({type:String}),de("design:type",String)],t.WiredRadioGroup.prototype,"selected",void 0),t.WiredRadioGroup=ae([tt("wired-radio-group")],t.WiredRadioGroup),window.JSCompiler_renameProperty=function(t,e){return t};let le=0,he=0,ce=[],pe=0,ue=document.createTextNode("");new window.MutationObserver(function(){const t=ce.length;for(let e=0;e<t;e++){let t=ce[e];if(t)try{t()}catch(t){setTimeout(()=>{throw t})}}ce.splice(0,t),he+=t}).observe(ue,{characterData:!0});const fe={after:t=>({run:e=>window.setTimeout(e,t),cancel(t){window.clearTimeout(t)}}),run:(t,e)=>window.setTimeout(t,e),cancel(t){window.clearTimeout(t)}},ge={run:t=>(ue.textContent=pe++,ce.push(t),le++),cancel(t){const e=t-he;if(e>=0){if(!ce[e])throw new Error("invalid async handle: "+t);ce[e]=null}}};class ye{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,be.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),be.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return null!=this._timer}static debounce(t,e,i){return t instanceof ye?t._cancelAsync():t=new ye,t.setConfig(e,i),t}}let be=new Set;window.ShadyDOM,Boolean(!window.ShadyCSS||window.ShadyCSS.nativeCss),window.customElements.polyfillWrapFlushCallback;(me=document.baseURI||window.location.href).substring(0,me.lastIndexOf("/")+1);var me;window.Polymer&&window.Polymer.sanitizeDOMValue;let ve=!1;const we=window.ShadyDOM&&window.ShadyDOM.noPatch&&window.ShadyDOM.wrap?window.ShadyDOM.wrap:t=>t;let xe="string"==typeof document.head.style.touchAction,ke="__polymerGestures",Se="__polymerGesturesHandled",Ce="__polymerGesturesTouchAction",_e=25,Re=5,Me=2500,Ne=["mousedown","mousemove","mouseup","click"],Ee=[0,1,4,2],Oe=function(){try{return 1===new MouseEvent("test",{buttons:1}).buttons}catch(t){return!1}}();function Pe(t){return Ne.indexOf(t)>-1}let Ae=!1;function We(t){if(!Pe(t)&&"touchend"!==t)return xe&&Ae&&ve?{passive:!0}:void 0}!function(){try{let t=Object.defineProperty({},"passive",{get(){Ae=!0}});window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch(t){}}();let Te=navigator.userAgent.match(/iP(?:[oa]d|hone)|Android/);const De=[],je={button:!0,input:!0,keygen:!0,meter:!0,output:!0,textarea:!0,progress:!0,select:!0},$e={button:!0,command:!0,fieldset:!0,input:!0,keygen:!0,optgroup:!0,option:!0,select:!0,textarea:!0};function Le(t){let e=Array.prototype.slice.call(t.labels||[]);if(!e.length){e=[];let i=t.getRootNode();if(t.id){let s=i.querySelectorAll(`label[for = ${t.id}]`);for(let t=0;t<s.length;t++)e.push(s[t])}}return e}let Ie=function(t){let e=t.sourceCapabilities;var i;if((!e||e.firesTouchEvents)&&(t[Se]={skip:!0},"click"===t.type)){let e=!1,s=qe(t);for(let t=0;t<s.length;t++){if(s[t].nodeType===Node.ELEMENT_NODE)if("label"===s[t].localName)De.push(s[t]);else if(i=s[t],je[i.localName]){let i=Le(s[t]);for(let t=0;t<i.length;t++)e=e||De.indexOf(i[t])>-1}if(s[t]===Ve.mouse.target)return}if(e)return;t.preventDefault(),t.stopPropagation()}};function ze(t){let e=Te?["click"]:Ne;for(let i,s=0;s<e.length;s++)i=e[s],t?(De.length=0,document.addEventListener(i,Ie,!0)):document.removeEventListener(i,Ie,!0)}function Be(t){let e=t.type;if(!Pe(e))return!1;if("mousemove"===e){let e=void 0===t.buttons?1:t.buttons;return t instanceof window.MouseEvent&&!Oe&&(e=Ee[t.which]||0),Boolean(1&e)}return 0===(void 0===t.button?0:t.button)}let Ve={mouse:{target:null,mouseIgnoreJob:null},touch:{x:0,y:0,id:-1,scrollDecided:!1}};function Ue(t,e,i){t.movefn=e,t.upfn=i,document.addEventListener("mousemove",e),document.addEventListener("mouseup",i)}function He(t){document.removeEventListener("mousemove",t.movefn),document.removeEventListener("mouseup",t.upfn),t.movefn=null,t.upfn=null}document.addEventListener("touchend",function(t){Ve.mouse.mouseIgnoreJob||ze(!0),Ve.mouse.target=qe(t)[0],Ve.mouse.mouseIgnoreJob=ye.debounce(Ve.mouse.mouseIgnoreJob,fe.after(Me),function(){ze(),Ve.mouse.target=null,Ve.mouse.mouseIgnoreJob=null})},!!Ae&&{passive:!0});const qe=window.ShadyDOM&&window.ShadyDOM.noPatch?window.ShadyDOM.composedPath:t=>t.composedPath&&t.composedPath()||[],Fe={},Xe=[];function Ye(t){const e=qe(t);return e.length>0?e[0]:t.target}function Ge(t){let e,i=t.type,s=t.currentTarget[ke];if(!s)return;let o=s[i];if(o){if(!t[Se]&&(t[Se]={},"touch"===i.slice(0,5))){let e=(t=t).changedTouches[0];if("touchstart"===i&&1===t.touches.length&&(Ve.touch.id=e.identifier),Ve.touch.id!==e.identifier)return;xe||"touchstart"!==i&&"touchmove"!==i||function(t){let e=t.changedTouches[0],i=t.type;if("touchstart"===i)Ve.touch.x=e.clientX,Ve.touch.y=e.clientY,Ve.touch.scrollDecided=!1;else if("touchmove"===i){if(Ve.touch.scrollDecided)return;Ve.touch.scrollDecided=!0;let i=function(t){let e="auto",i=qe(t);for(let t,s=0;s<i.length;s++)if((t=i[s])[Ce]){e=t[Ce];break}return e}(t),s=!1,o=Math.abs(Ve.touch.x-e.clientX),n=Math.abs(Ve.touch.y-e.clientY);t.cancelable&&("none"===i?s=!0:"pan-x"===i?s=n>o:"pan-y"===i&&(s=o>n)),s?t.preventDefault():Qe("track")}}(t)}if(!(e=t[Se]).skip){for(let i,s=0;s<Xe.length;s++)o[(i=Xe[s]).name]&&!e[i.name]&&i.flow&&i.flow.start.indexOf(t.type)>-1&&i.reset&&i.reset();for(let s,n=0;n<Xe.length;n++)o[(s=Xe[n]).name]&&!e[s.name]&&(e[s.name]=!0,s[i](t))}}}function Je(t,e,i){return!!Fe[e]&&(function(t,e,i){let s=Fe[e],o=s.deps,n=s.name,r=t[ke];r||(t[ke]=r={});for(let e,i,s=0;s<o.length;s++)e=o[s],Te&&Pe(e)&&"click"!==e||((i=r[e])||(r[e]=i={_count:0}),0===i._count&&t.addEventListener(e,Ge,We(e)),i[n]=(i[n]||0)+1,i._count=(i._count||0)+1);t.addEventListener(e,i),s.touchAction&&function(t,e){xe&&t instanceof HTMLElement&&ge.run(()=>{t.style.touchAction=e});t[Ce]=e}(t,s.touchAction)}(t,e,i),!0)}function Ke(t){Xe.push(t);for(let e=0;e<t.emits.length;e++)Fe[t.emits[e]]=t}function Ze(t,e,i){let s=new Event(e,{bubbles:!0,cancelable:!0,composed:!0});if(s.detail=i,we(t).dispatchEvent(s),s.defaultPrevented){let t=i.preventer||i.sourceEvent;t&&t.preventDefault&&t.preventDefault()}}function Qe(t){let e=function(t){for(let e,i=0;i<Xe.length;i++){e=Xe[i];for(let i,s=0;s<e.emits.length;s++)if((i=e.emits[s])===t)return e}return null}(t);e.info&&(e.info.prevent=!0)}function ti(t,e,i,s){e&&Ze(e,t,{x:i.clientX,y:i.clientY,sourceEvent:i,preventer:s,prevent:function(t){return Qe(t)}})}function ei(t,e,i){if(t.prevent)return!1;if(t.started)return!0;let s=Math.abs(t.x-e),o=Math.abs(t.y-i);return s>=Re||o>=Re}function ii(t,e,i){if(!e)return;let s,o=t.moves[t.moves.length-2],n=t.moves[t.moves.length-1],r=n.x-t.x,a=n.y-t.y,d=0;o&&(s=n.x-o.x,d=n.y-o.y),Ze(e,"track",{state:t.state,x:i.clientX,y:i.clientY,dx:r,dy:a,ddx:s,ddy:d,sourceEvent:i,hover:function(){return function(t,e){let i=document.elementFromPoint(t,e),s=i;for(;s&&s.shadowRoot&&!window.ShadyDOM&&s!==(s=s.shadowRoot.elementFromPoint(t,e));)s&&(i=s);return i}(i.clientX,i.clientY)}})}function si(t,e,i){let s=Math.abs(e.clientX-t.x),o=Math.abs(e.clientY-t.y),n=Ye(i||e);!n||$e[n.localName]&&n.hasAttribute("disabled")||(isNaN(s)||isNaN(o)||s<=_e&&o<=_e||function(t){if("click"===t.type){if(0===t.detail)return!0;let e=Ye(t);if(!e.nodeType||e.nodeType!==Node.ELEMENT_NODE)return!0;let i=e.getBoundingClientRect(),s=t.pageX,o=t.pageY;return!(s>=i.left&&s<=i.right&&o>=i.top&&o<=i.bottom)}return!1}(e))&&(t.prevent||Ze(n,"tap",{x:e.clientX,y:e.clientY,sourceEvent:e,preventer:i}))}Ke({name:"downup",deps:["mousedown","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["down","up"],info:{movefn:null,upfn:null},reset:function(){He(this.info)},mousedown:function(t){if(!Be(t))return;let e=Ye(t),i=this;Ue(this.info,function(t){Be(t)||(ti("up",e,t),He(i.info))},function(t){Be(t)&&ti("up",e,t),He(i.info)}),ti("down",e,t)},touchstart:function(t){ti("down",Ye(t),t.changedTouches[0],t)},touchend:function(t){ti("up",Ye(t),t.changedTouches[0],t)}}),Ke({name:"track",touchAction:"none",deps:["mousedown","touchstart","touchmove","touchend"],flow:{start:["mousedown","touchstart"],end:["mouseup","touchend"]},emits:["track"],info:{x:0,y:0,state:"start",started:!1,moves:[],addMove:function(t){this.moves.length>2&&this.moves.shift(),this.moves.push(t)},movefn:null,upfn:null,prevent:!1},reset:function(){this.info.state="start",this.info.started=!1,this.info.moves=[],this.info.x=0,this.info.y=0,this.info.prevent=!1,He(this.info)},mousedown:function(t){if(!Be(t))return;let e=Ye(t),i=this,s=function(t){let s=t.clientX,o=t.clientY;ei(i.info,s,o)&&(i.info.state=i.info.started?"mouseup"===t.type?"end":"track":"start","start"===i.info.state&&Qe("tap"),i.info.addMove({x:s,y:o}),Be(t)||(i.info.state="end",He(i.info)),e&&ii(i.info,e,t),i.info.started=!0)};Ue(this.info,s,function(t){i.info.started&&s(t),He(i.info)}),this.info.x=t.clientX,this.info.y=t.clientY},touchstart:function(t){let e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchmove:function(t){let e=Ye(t),i=t.changedTouches[0],s=i.clientX,o=i.clientY;ei(this.info,s,o)&&("start"===this.info.state&&Qe("tap"),this.info.addMove({x:s,y:o}),ii(this.info,e,i),this.info.state="track",this.info.started=!0)},touchend:function(t){let e=Ye(t),i=t.changedTouches[0];this.info.started&&(this.info.state="end",this.info.addMove({x:i.clientX,y:i.clientY}),ii(this.info,e,i))}}),Ke({name:"tap",deps:["mousedown","click","touchstart","touchend"],flow:{start:["mousedown","touchstart"],end:["click","touchend"]},emits:["tap"],info:{x:NaN,y:NaN,prevent:!1},reset:function(){this.info.x=NaN,this.info.y=NaN,this.info.prevent=!1},mousedown:function(t){Be(t)&&(this.info.x=t.clientX,this.info.y=t.clientY)},click:function(t){Be(t)&&si(this.info,t)},touchstart:function(t){const e=t.changedTouches[0];this.info.x=e.clientX,this.info.y=e.clientY},touchend:function(t){si(this.info,t.changedTouches[0],t)}});var oi=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},ni=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSlider=class extends ut{constructor(){super(...arguments),this._value=0,this.min=0,this.max=100,this.knobradius=10,this.disabled=!1,this.step=1,this.barWidth=0,this.intermediateValue=this.min,this.pct=0,this.startx=0,this.dragging=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      width: 300px;
      height: 40px;
      outline: none;
      box-sizing: border-box;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 5px;
    }
  
    :host(.wired-disabled) .knob {
      pointer-events: none !important;
    }
  
    :host(:focus) .knob {
      cursor: move;
      stroke: var(--wired-slider-knob-outline-color, #000);
      fill-opacity: 0.8;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .knob {
      pointer-events: auto;
      fill: var(--wired-slider-knob-zero-color, gray);
      stroke: var(--wired-slider-knob-zero-color, gray);
      transition: transform 0.15s ease;
      cursor: pointer;
    }
  
    .hasValue {
      fill: var(--wired-slider-knob-color, rgb(51, 103, 214));
      stroke: var(--wired-slider-knob-color, rgb(51, 103, 214));
    }
  
    .bar {
      stroke: var(--wired-slider-bar-color, rgb(0, 0, 0));
    }
    `}render(){return W`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    `}get value(){return this._value}set value(t){this.setValue(t,!0)}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}firstUpdated(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();t.setAttribute("width",`${e.width}`),t.setAttribute("height",`${e.height}`);const i=this.knobradius||10;this.barWidth=e.width-2*i,this.bar=Et(t,i,e.height/2,e.width-i,e.height/2),this.bar.classList.add("bar"),this.knobGroup=Ct("g"),t.appendChild(this.knobGroup),this.knob=At(this.knobGroup,i,e.height/2,2*i,2*i),this.knob.classList.add("knob"),this.onValueChange(),this.classList.add("wired-rendered"),this.setAttribute("role","slider"),this.setAttribute("aria-valuemax",`${this.max}`),this.setAttribute("aria-valuemin",`${this.min}`),this.setAriaValue(),Je(this.knob,"down",t=>{this.disabled||this.knobdown(t)}),Je(this.knob,"up",()=>{this.disabled||this.resetKnob()}),Je(this.knob,"track",t=>{this.disabled||this.onTrack(t)}),this.addEventListener("keydown",t=>{switch(t.keyCode){case 38:case 39:this.incremenent();break;case 37:case 40:this.decrement();break;case 36:this.setValue(this.min);break;case 35:this.setValue(this.max)}})}updated(t){t.has("disabled")&&this.refreshDisabledState()}setAriaValue(){this.setAttribute("aria-valuenow",`${this.value}`)}setValue(t,e=!1){this._value=t,this.setAriaValue(),this.onValueChange(),e||this.fireEvent("change",{value:this.intermediateValue})}incremenent(){const t=Math.min(this.max,Math.round(this.value+this.step));t!==this.value&&this.setValue(t)}decrement(){const t=Math.max(this.min,Math.round(this.value-this.step));t!==this.value&&this.setValue(t)}onValueChange(){if(!this.knob)return;let t=0;this.max>this.min&&(t=Math.min(1,Math.max((this.value-this.min)/(this.max-this.min),0))),this.pct=t,t?this.knob.classList.add("hasValue"):this.knob.classList.remove("hasValue");const e=t*this.barWidth;this.knobGroup.style.transform=`translateX(${Math.round(e)}px)`}knobdown(t){this.knobExpand(!0),t.preventDefault(),this.focus()}resetKnob(){this.knobExpand(!1)}knobExpand(t){this.knob&&(t?this.knob.classList.add("expanded"):this.knob.classList.remove("expanded"))}onTrack(t){switch(t.stopPropagation(),t.detail.state){case"start":this.trackStart();break;case"track":this.trackX(t);break;case"end":this.trackEnd()}}trackStart(){this.intermediateValue=this.value,this.startx=this.pct*this.barWidth,this.dragging=!0}trackX(t){this.dragging||this.trackStart();const e=t.detail.dx||0,i=Math.max(Math.min(this.startx+e,this.barWidth),0);this.knobGroup.style.transform=`translateX(${Math.round(i)}px)`;const s=i/this.barWidth;this.intermediateValue=this.min+s*(this.max-this.min)}trackEnd(){this.dragging=!1,this.resetKnob(),this.setValue(this.intermediateValue),this.pct=(this.value-this.min)/(this.max-this.min)}},oi([st({type:Number}),ni("design:type",Object)],t.WiredSlider.prototype,"_value",void 0),oi([st({type:Number}),ni("design:type",Object)],t.WiredSlider.prototype,"min",void 0),oi([st({type:Number}),ni("design:type",Object)],t.WiredSlider.prototype,"max",void 0),oi([st({type:Number}),ni("design:type",Object)],t.WiredSlider.prototype,"knobradius",void 0),oi([st({type:Boolean,reflect:!0}),ni("design:type",Object)],t.WiredSlider.prototype,"disabled",void 0),t.WiredSlider=oi([tt("wired-slider")],t.WiredSlider);var ri=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},ai=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTextarea=class extends ut{constructor(){super(...arguments),this.rows=1,this.maxrows=0,this.autocomplete="",this.autofocus=!1,this.disabled=!1,this.inputmode="",this.placeholder="",this.required=!1,this.readonly=!1,this.tokens=[],this.prevHeight=0}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      font-family: sans-serif;
      width: 400px;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.6 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }
  
    .fit {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  
    .overlay {
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }
  
    .mirror-text {
      visibility: hidden;
      word-wrap: break-word;
    }

    #mirror {
      padding: 10px;
    }
  
    textarea {
      position: relative;
      outline: none;
      border: none;
      resize: none;
      background: inherit;
      color: inherit;
      width: 100%;
      height: 100%;
      font-size: inherit;
      font-family: inherit;
      line-height: inherit;
      text-align: inherit;
      padding: 10px;
      box-sizing: border-box;
    }
    `}render(){return W`
    <div id="mirror" class="mirror-text">&#160;</div>
    <div class="fit">
      <textarea id="textarea" autocomplete="${this.autocomplete}" ?autofocus="${this.autofocus}" inputmode="${this.inputmode}"
        placeholder="${this.placeholder}" ?readonly="${this.readonly}" ?required="${this.required}" ?disabled="${this.disabled}"
        rows="${this.rows}" minlength="${this.minlength}" maxlength="${this.maxlength}" @input="${this.onInput}"></textarea>
    </div>
    <div class="fit overlay">
      <svg id="svg"></svg>
    </div>
    `}createRenderRoot(){return this.attachShadow({mode:"open",delegatesFocus:!0})}get textarea(){return this.shadowRoot?this.shadowRoot.getElementById("textarea"):null}get mirror(){return this.shadowRoot.getElementById("mirror")}get value(){const t=this.textarea;return t&&t.value||""}set value(t){const e=this.textarea;e&&(e.value!==t&&(e.value=t||""),this.mirror.innerHTML=this.valueForMirror(),this.requestUpdate())}valueForMirror(){const t=this.textarea;return t?(this.tokens=t&&t.value?t.value.replace(/&/gm,"&amp;").replace(/"/gm,"&quot;").replace(/'/gm,"&#39;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;").split("\n"):[""],this.constrain(this.tokens)):""}constrain(t){let e;for(t=t||[""],e=this.maxrows>0&&t.length>this.maxrows?t.slice(0,this.maxrows):t.slice(0);this.rows>0&&e.length<this.rows;)e.push("");return e.join("<br/>")+"&#160;"}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled")}firstUpdated(){this.value=this.value||this.getAttribute("value")||""}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg"),i=this.getBoundingClientRect();if(this.prevHeight!==i.height){for(;e.hasChildNodes();)e.removeChild(e.lastChild);e.setAttribute("width",`${i.width}`),e.setAttribute("height",`${i.height}`),Ot(e,2,2,i.width-2,i.height-2),this.prevHeight=i.height,this.classList.add("wired-rendered"),this.updateCached()}}updateCached(){this.mirror.innerHTML=this.constrain(this.tokens)}onInput(){this.value=this.textarea.value}},ri([st({type:Number}),ai("design:type",Object)],t.WiredTextarea.prototype,"rows",void 0),ri([st({type:Number}),ai("design:type",Object)],t.WiredTextarea.prototype,"maxrows",void 0),ri([st({type:String}),ai("design:type",Object)],t.WiredTextarea.prototype,"autocomplete",void 0),ri([st({type:Boolean}),ai("design:type",Object)],t.WiredTextarea.prototype,"autofocus",void 0),ri([st({type:Boolean,reflect:!0}),ai("design:type",Object)],t.WiredTextarea.prototype,"disabled",void 0),ri([st({type:String}),ai("design:type",Object)],t.WiredTextarea.prototype,"inputmode",void 0),ri([st({type:String}),ai("design:type",Object)],t.WiredTextarea.prototype,"placeholder",void 0),ri([st({type:Boolean}),ai("design:type",Object)],t.WiredTextarea.prototype,"required",void 0),ri([st({type:Boolean}),ai("design:type",Object)],t.WiredTextarea.prototype,"readonly",void 0),ri([st({type:Number}),ai("design:type",Number)],t.WiredTextarea.prototype,"minlength",void 0),ri([st({type:Number}),ai("design:type",Number)],t.WiredTextarea.prototype,"maxlength",void 0),t.WiredTextarea=ri([tt("wired-textarea")],t.WiredTextarea);var di=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},li=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredToggle=class extends ut{constructor(){super(...arguments),this.checked=!1,this.disabled=!1}static get styles(){return ht`
    :host {
      display: inline-block;
      cursor: pointer;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.4 !important;
      cursor: default;
      pointer-events: none;
    }
  
    :host(.wired-disabled) svg {
      background: rgba(0, 0, 0, 0.07);
    }

    :host(:focus) path {
      stroke-width: 1.2;
    }

    svg {
      display: block;
    }
  
    path {
      stroke: currentColor;
      stroke-width: 0.7;
      fill: transparent;
    }

    .knob {
      transition: transform 0.3s ease;
    }
    .knob path {
      stroke-width: 0.7;
    }
    .knob.checked {
      transform: translateX(48px);
    }
    .knobfill path {
      stroke-width: 3 !important;
      fill: transparent;
    }
    .knob.unchecked .knobfill path {
      stroke: var(--wired-toggle-off-color, gray);
    }
    .knob.checked .knobfill path {
      stroke: var(--wired-toggle-on-color, rgb(63, 81, 181));
    }
    `}render(){return W`
    <div @click="${this.toggleCheck}">
      <svg id="svg"></svg>
    </div>
    `}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}toggleCheck(){this.checked=!this.checked,this.fireEvent("change",{checked:this.checked})}firstUpdated(){this.setAttribute("role","switch"),this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.toggleCheck())});const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=80,i=34;t.setAttribute("width",`${e}`),t.setAttribute("height",`${i}`),Ot(t,16,8,e-32,18),this.knob=Ct("g"),this.knob.classList.add("knob"),t.appendChild(this.knob);const s=jt(16,16,32,32);s.classList.add("knobfill"),this.knob.appendChild(s),At(this.knob,16,16,32,32),this.classList.add("wired-rendered")}updated(t){if(t.has("disabled")&&this.refreshDisabledState(),this.knob){const t=this.knob.classList;this.checked?(t.remove("unchecked"),t.add("checked")):(t.remove("checked"),t.add("unchecked"))}this.setAttribute("aria-checked",`${this.checked}`)}},di([st({type:Boolean}),li("design:type",Object)],t.WiredToggle.prototype,"checked",void 0),di([st({type:Boolean,reflect:!0}),li("design:type",Object)],t.WiredToggle.prototype,"disabled",void 0),t.WiredToggle=di([tt("wired-toggle")],t.WiredToggle);var hi=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},ci=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTooltip=class extends ut{constructor(){super(...arguments),this.offset=14,this.position="bottom",this.dirty=!1,this.showing=!1,this._target=null,this.showHandler=this.show.bind(this),this.hideHandler=this.hide.bind(this)}static get styles(){return ht`
    :host {
      display: block;
      position: absolute;
      outline: none;
      z-index: 1002;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
      font-family: inherit;
      font-size: 9pt;
      line-height: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke-width: 0.7;
      stroke: var(--wired-tooltip-border-color, currentColor);
      fill: var(--wired-tooltip-background, rgba(255, 255, 255, 0.9));
    }
  
    #container {
      position: relative;
      padding: 8px;
    }
    `}render(){return W`
    <div id="container" style="display: none;">
      <div class="overlay">
        <svg id="svg"></svg>
      </div>
      <span style="position: relative;">${this.text}</span>
    </div>
    `}get target(){if(this._target)return this._target;const t=this.parentNode,e=(this.getRootNode?this.getRootNode():null)||document;let i=null;return this.for?i=e.querySelector("#"+this.for):t&&(i=t.nodeType===Node.DOCUMENT_FRAGMENT_NODE?e.host:t),i}detachListeners(){this._target&&(this._target.removeEventListener("mouseenter",this.showHandler),this._target.removeEventListener("focus",this.showHandler),this._target.removeEventListener("mouseleave",this.hideHandler),this._target.removeEventListener("blur",this.hideHandler),this._target.removeEventListener("click",this.hideHandler)),this.removeEventListener("mouseenter",this.hideHandler)}attachListeners(){this._target&&(this._target.addEventListener("mouseenter",this.showHandler),this._target.addEventListener("focus",this.showHandler),this._target.addEventListener("mouseleave",this.hideHandler),this._target.addEventListener("blur",this.hideHandler),this._target.addEventListener("click",this.hideHandler)),this.addEventListener("mouseenter",this.hideHandler)}refreshTarget(){this.detachListeners(),this._target=null,this._target=this.target,this.attachListeners(),this.dirty=!0}layout(){const t=this.shadowRoot.getElementById("svg");for(;t.hasChildNodes();)t.removeChild(t.lastChild);const e=this.getBoundingClientRect();let i=e.width,s=e.height;switch(this.position){case"left":case"right":i+=this.offset;break;default:s+=this.offset}t.setAttribute("width",`${i}`),t.setAttribute("height",`${s}`);let o=[];switch(this.position){case"top":o=[[2,2],[i-2,2],[i-2,s-this.offset],[i/2+8,s-this.offset],[i/2,s-this.offset+8],[i/2-8,s-this.offset],[0,s-this.offset]];break;case"left":o=[[2,2],[i-this.offset,2],[i-this.offset,s/2-8],[i-this.offset+8,s/2],[i-this.offset,s/2+8],[i-this.offset,s],[2,s-2]];break;case"right":o=[[this.offset,2],[i-2,2],[i-2,s-2],[this.offset,s-2],[this.offset,s/2+8],[this.offset-8,s/2],[this.offset,s/2-8]],t.style.transform=`translateX(${-this.offset}px)`;break;default:o=[[2,this.offset],[0,s-2],[i-2,s-2],[i-2,this.offset],[i/2+8,this.offset],[i/2,this.offset-8],[i/2-8,this.offset]],t.style.transform=`translateY(${-this.offset}px)`}Pt(t,o),this.dirty=!1}firstUpdated(){this.layout()}updated(t){(t.has("position")||t.has("text"))&&(this.dirty=!0),this._target&&!t.has("for")||this.refreshTarget(),this.dirty&&this.layout()}show(){this.showing||(this.showing=!0,this.shadowRoot.getElementById("container").style.display="",this.updatePosition(),setTimeout(()=>{this.layout()},1))}hide(){this.showing&&(this.showing=!1,this.shadowRoot.getElementById("container").style.display="none")}updatePosition(){if(!this._target||!this.offsetParent)return;const t=this.offset,e=this.offsetParent.getBoundingClientRect(),i=this._target.getBoundingClientRect(),s=this.getBoundingClientRect(),o=(i.width-s.width)/2,n=(i.height-s.height)/2,r=i.left-e.left,a=i.top-e.top;let d,l;switch(this.position){case"top":d=r+o,l=a-s.height-t;break;case"bottom":d=r+o,l=a+i.height+t;break;case"left":d=r-s.width-t,l=a+n;break;case"right":d=r+i.width+t,l=a+n}this.style.left=d+"px",this.style.top=l+"px"}},hi([st({type:String}),ci("design:type",String)],t.WiredTooltip.prototype,"for",void 0),hi([st({type:String}),ci("design:type",String)],t.WiredTooltip.prototype,"text",void 0),hi([st({type:Number}),ci("design:type",Object)],t.WiredTooltip.prototype,"offset",void 0),hi([st({type:String}),ci("design:type",String)],t.WiredTooltip.prototype,"position",void 0),t.WiredTooltip=hi([tt("wired-tooltip")],t.WiredTooltip);const pi=(t,e)=>{const i=t.startNode.parentNode,s=void 0===e?t.endNode:e.startNode,o=i.insertBefore(f(),s);i.insertBefore(f(),s);const n=new k(t.options);return n.insertAfterNode(o),n},ui=(t,e)=>(t.setValue(e),t.commit(),t),fi=(t,e,i)=>{const s=t.startNode.parentNode,o=i?i.startNode:t.endNode,n=e.endNode.nextSibling;n!==o&&((t,e,i=null,s=null)=>{for(;e!==i;){const i=e.nextSibling;t.insertBefore(e,s),e=i}})(s,e.startNode,n,o)},gi=t=>{o(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},yi=(t,e,i)=>{const s=new Map;for(let o=e;o<=i;o++)s.set(t[o],o);return s},bi=new WeakMap,mi=new WeakMap,vi=(t=>(...i)=>{const s=t(...i);return e.set(s,!0),s})((t,e,i)=>{let s;return void 0===i?i=e:void 0!==e&&(s=e),e=>{if(!(e instanceof k))throw new Error("repeat can only be used in text bindings");const o=bi.get(e)||[],n=mi.get(e)||[],r=[],a=[],d=[];let l,h,c=0;for(const e of t)d[c]=s?s(e,c):c,a[c]=i(e,c),c++;let p=0,u=o.length-1,f=0,g=a.length-1;for(;p<=u&&f<=g;)if(null===o[p])p++;else if(null===o[u])u--;else if(n[p]===d[f])r[f]=ui(o[p],a[f]),p++,f++;else if(n[u]===d[g])r[g]=ui(o[u],a[g]),u--,g--;else if(n[p]===d[g])r[g]=ui(o[p],a[g]),fi(e,o[p],r[g+1]),p++,g--;else if(n[u]===d[f])r[f]=ui(o[u],a[f]),fi(e,o[u],o[p]),u--,f++;else if(void 0===l&&(l=yi(d,f,g),h=yi(n,p,u)),l.has(n[p]))if(l.has(n[u])){const t=h.get(d[f]),i=void 0!==t?o[t]:null;if(null===i){const t=pi(e,o[p]);ui(t,a[f]),r[f]=t}else r[f]=ui(i,a[f]),fi(e,i,o[p]),o[t]=null;f++}else gi(o[u]),u--;else gi(o[p]),p++;for(;f<=g;){const t=pi(e,r[g+1]);ui(t,a[f]),r[f++]=t}for(;p<=u;){const t=o[p++];null!==t&&gi(t)}bi.set(e,r),mi.set(e,d)}});var wi=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},xi=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredTab=class extends ut{constructor(){super(...arguments),this.name="",this.label=""}static get styles(){return ht`
    :host {
      display: block;
    }
    wired-card {
      display: block;
    }
    `}render(){return W`
    <wired-card>
      <slot></slot>
    </wired-card>
    `}relayout(){setTimeout(()=>{this.card&&this.card.requestUpdate()})}},wi([st({type:String}),xi("design:type",Object)],t.WiredTab.prototype,"name",void 0),wi([st({type:String}),xi("design:type",Object)],t.WiredTab.prototype,"label",void 0),wi([ot("wired-card"),xi("design:type",t.WiredCard)],t.WiredTab.prototype,"card",void 0),t.WiredTab=wi([tt("wired-tab")],t.WiredTab),t.WizardTabs=class extends ut{constructor(){super(...arguments),this.pages=[],this.pageMap=new Map}static get styles(){return ht`
    :host {
      display: block;
    }

    .hidden {
      display: none !important;
    }
  
    ::slotted(.hidden) {
      display: none !important;
    }

    :host ::slotted(.hidden) {
      display: none !important;
    }

    #bar {
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      -ms-flex-direction: row;
      -webkit-flex-direction: row;
      flex-direction: row;
    }
    `}render(){return W`
    <div id="bar">
      ${vi(this.pages,t=>t.name,t=>W`
      <wired-item role="tab" .value="${t.name}" .selected="${t.name===this.selected}" ?aria-selected="${t.name===this.selected}"
        @click="${()=>this.selected=t.name}">${t.label||t.name}</wired-item>
      `)}
    </div>
    <div>
      <slot id="slot" @slotchange="${this.mapPages}"></slot>
    </div>
    `}mapPages(){if(this.pages=[],this.pageMap.clear(),this.slotElement){const t=this.slotElement.assignedNodes();if(t&&t.length){for(let e=0;e<t.length;e++){const i=t[e];if(i.nodeType===Node.ELEMENT_NODE&&"wired-tab"===i.tagName.toLowerCase()){const t=i;this.pages.push(t);const e=t.getAttribute("name")||"";e&&e.trim().split(" ").forEach(e=>{e&&this.pageMap.set(e,t)})}}this.selected||this.pages.length&&(this.selected=this.pages[0].name),this.requestUpdate()}}}firstUpdated(){this.mapPages(),this.tabIndex=+(this.getAttribute("tabindex")||0),this.addEventListener("keydown",t=>{switch(t.keyCode){case 37:case 38:t.preventDefault(),this.selectPrevious();break;case 39:case 40:t.preventDefault(),this.selectNext()}})}updated(){const t=this.getElement();for(let e=0;e<this.pages.length;e++){const i=this.pages[e];i===t?i.classList.remove("hidden"):i.classList.add("hidden")}this.current=t||void 0,this.current&&this.current.relayout()}getElement(){let t=void 0;return this.selected&&(t=this.pageMap.get(this.selected)),t||(t=this.pages[0]),t||null}selectPrevious(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:0===e?e=t.length-1:e--,this.selected=t[e].name||""}}selectNext(){const t=this.pages;if(t.length){let e=-1;for(let i=0;i<t.length;i++)if(t[i]===this.current){e=i;break}e<0?e=0:e>=t.length-1?e=0:e++,this.selected=t[e].name||""}}},wi([st({type:String}),xi("design:type",String)],t.WizardTabs.prototype,"selected",void 0),wi([ot("slot"),xi("design:type",HTMLSlotElement)],t.WizardTabs.prototype,"slotElement",void 0),t.WizardTabs=wi([tt("wired-tabs")],t.WizardTabs);var ki=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Si=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredFab=class extends ut{constructor(){super(...arguments),this.disabled=!1}static get styles(){return ht`
    :host {
      display: -ms-inline-flexbox;
      display: -webkit-inline-flex;
      display: inline-flex;
      -ms-flex-align: center;
      -webkit-align-items: center;
      align-items: center;
      -ms-flex-pack: center;
      -webkit-justify-content: center;
      justify-content: center;
      position: relative;
      vertical-align: middle;
      padding: 16px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      cursor: pointer;
      z-index: 0;
      line-height: 1;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      -webkit-tap-highlight-color: transparent;
      box-sizing: border-box !important;
      outline: none;
      color: #fff;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }
  
    :host(.wired-disabled) {
      opacity: 0.45 !important;
      cursor: default;
      background: rgba(0, 0, 0, 0.07);
      border-radius: 50%;
      pointer-events: none;
    }
  
    :host(:active) mwc-icon {
      opacity: 1;
      transform: scale(1.15);
    }

    :host(:focus) mwc-icon {
      opacity: 1;
    }
  
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }
  
    svg {
      display: block;
    }
  
    path {
      stroke: var(--wired-fab-bg-color, #018786);
      stroke-width: 3;
      fill: transparent;
    }
  
    mwc-icon {
      position: relative;
      font-size: var(--wired-icon-size, 24px);
      transition: transform 0.2s ease, opacity 0.2s ease;
      opacity: 0.85;
    }
    `}render(){return W`
    <div class="overlay">
      <svg id="svg"></svg>
    </div>
    <mwc-icon>
      <slot></slot>
    </mwc-icon>
    `}firstUpdated(){this.addEventListener("keydown",t=>{13!==t.keyCode&&32!==t.keyCode||(t.preventDefault(),this.click())}),this.setAttribute("role","button"),this.setAttribute("aria-label",this.textContent||this.innerText),setTimeout(()=>this.requestUpdate())}updated(t){t.has("disabled")&&this.refreshDisabledState();const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getBoundingClientRect(),s=Math.min(i.width,i.height);e.setAttribute("width",`${s}`),e.setAttribute("height",`${s}`);const o=jt(s/2,s/2,s,s);e.appendChild(o),this.classList.add("wired-rendered")}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}},ki([st({type:Boolean,reflect:!0}),Si("design:type",Object)],t.WiredFab.prototype,"disabled",void 0),t.WiredFab=ki([tt("wired-fab")],t.WiredFab);var Ci=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},_i=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};t.WiredSpinner=class extends ut{constructor(){super(...arguments),this.spinning=!1,this.duration=1500,this.value=0,this.timerstart=0,this.frame=0}static get styles(){return ht`
    :host {
      display: inline-block;
      position: relative;
      opacity: 0;
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    #svg {
      display: block;
      width: 76px;
      height: 76px;
    }

    path {
      stroke: currentColor;
      stroke-opacity: 0.5;
      stroke-width: 1.5;
      fill: none;
    }
    .knob path {
      stroke-width: 2.8 !important;
      stroke-opacity: 1;
    }
    `}render(){return W`
    <svg id="svg"></svg>
    `}firstUpdated(){this.svg&&(At(this.svg,38,38,60,60),this.knob=jt(0,0,20,20),this.knob.classList.add("knob"),this.svg.appendChild(this.knob)),this.updateCursor(),this.classList.add("wired-rendered")}updated(){this.spinning?this.startSpinner():this.stopSpinner()}startSpinner(){this.stopSpinner(),this.value=0,this.timerstart=0,this.nextTick()}stopSpinner(){this.frame&&(window.cancelAnimationFrame(this.frame),this.frame=0)}nextTick(){this.frame=window.requestAnimationFrame(t=>this.tick(t))}tick(t){this.spinning?(this.timerstart||(this.timerstart=t),this.value=Math.min(1,(t-this.timerstart)/this.duration),this.updateCursor(),this.value>=1&&(this.value=0,this.timerstart=0),this.nextTick()):this.frame=0}updateCursor(){if(this.knob){const t=[Math.round(38+25*Math.cos(this.value*Math.PI*2)),Math.round(38+25*Math.sin(this.value*Math.PI*2))];this.knob.style.transform=`translate3d(${t[0]}px, ${t[1]}px, 0) rotateZ(${Math.round(360*this.value*2)}deg)`}}},Ci([st({type:Boolean}),_i("design:type",Object)],t.WiredSpinner.prototype,"spinning",void 0),Ci([st({type:Number}),_i("design:type",Object)],t.WiredSpinner.prototype,"duration",void 0),Ci([ot("svg"),_i("design:type",SVGSVGElement)],t.WiredSpinner.prototype,"svg",void 0),t.WiredSpinner=Ci([tt("wired-spinner")],t.WiredSpinner);var Ri=function(t,e,i,s){var o,n=arguments.length,r=n<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(n<3?o(r):n>3?o(e,i,r):o(e,i))||r);return n>3&&r&&Object.defineProperty(e,i,r),r},Mi=function(t,e){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(t,e)};const Ni=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],Ei=["January","February","March","April","May","June","July","August","September","October","November","December"],Oi=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];return t.WiredCalendar=class extends ut{constructor(){super(),this.elevation=3,this.disabled=!1,this.initials=!1,this.format=(t=>Oi[t.getMonth()]+" "+t.getDate()+", "+t.getFullYear()),this.firstOfMonthDate=new Date,this.fDate=void 0,this.lDate=void 0,this.tblColWidth=0,this.tblRowHeight=0,this.tblHeadHeight=0,this.monthYear="",this.weeks=[[]],this.calendarRefSize=this.getCalendarSize()}connectedCallback(){super.connectedCallback(),this.resizeHandler||(this.resizeHandler=this.debounce(this.resized.bind(this),200,!1,this),window.addEventListener("resize",this.resizeHandler)),setTimeout(()=>this.updated())}disconnectedCallback(){super.disconnectedCallback&&super.disconnectedCallback(),this.resizeHandler&&(window.removeEventListener("resize",this.resizeHandler),delete this.resizeHandler)}static get styles(){return ht`
    :host {
      display: inline-block;
      font-family: inherit;
      position: relative;
      outline: none;
      opacity: 0;
    }

    :host(.wired-disabled) {
      opacity: 0.5 !important;
      cursor: default;
      pointer-events: none;
      background: rgba(0, 0, 0, 0.02);
    }

    :host(.wired-rendered) {
      opacity: 1;
    }

    :host(:focus) path {
      stroke-width: 1.5;
    }

    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
    }

    svg {
      display: block;
    }

    .calendar path {
      stroke: var(--wired-calendar-color, black);
      stroke-width: 0.7;
      fill: transparent;
    }

    .selected path {
      stroke: var(--wired-calendar-selected-color, red);
      stroke-width: 2.5;
      fill: transparent;
      transition: transform 0.05s ease;
    }

    table {
      position: relative;
      background: var(--wired-calendar-bg, white);
      border-collapse: collapse;
      font-size: inherit;
      line-height: unset;
    }

    table:focus {
      outline: none !important;
    }

    td,
    th {
        border-radius: 4px;
        text-align: center;
    }

    td.disabled {
        color: var(--wired-calendar-disabled-color, lightgray);
    }

    td.dimmed {
      color: var(--wired-calendar-dimmed-color, gray);
    }

    td.selected {
        position: absolute;
    }

    td:not(.disabled):not(.selected):hover {
        background-color: #d0d0d0;
    }

    .pointer {
      cursor: pointer;
    }

    `}render(){return W`
    <table role="dialog"
            style="width:${this.calendarRefSize.width}px;height:${this.calendarRefSize.height}px;border:${8}px solid transparent"
            @mousedown="${this.onItemClick}"
            @touchstart="${this.onItemClick}">
      ${""}
      <tr class="top-header" style="height:${this.tblHeadHeight}px;">
        <th id="prevCal" @click="${this.onPrevClick}"><<</th>
        <th colSpan="5">${this.monthYear}</th>
        <th id="nextCal" @click="${this.onNextClick}">>></th>
      </tr>
      ${""}
      <tr class="header" style="height:${this.tblHeadHeight}px;">
        ${Ni.map(t=>W`<th style="width: ${this.tblColWidth};">${this.initials?t[0]:t}</th>
            `)}
      </tr>
      ${""}
      ${this.weeks.map(t=>W`<tr style="height:${this.tblRowHeight}px;">
              ${""}
              ${t.map(t=>W`${t.selected?W`
                            <td class="selected" value="${t.value}">
                            <div style="width: ${this.tblColWidth};line-height:${this.tblRowHeight}px">${t.text}</div>
                            <div class="overlay">
                              <svg id="svgTD" class="selected"></svg>
                            </div></td>
                        `:W`
                            <td class="${t.disabled?"disabled":t.dimmed?" dimmed":" "}"
                                value="${t.disabled?" ":t.value}">${t.text}</td>
                        `}
                    `)}${""}
            </tr>`)}${""}
    </table>
    <div class="overlay">
      <svg id="svg" class="calendar"></svg>
    </div>
    `}firstUpdated(){let t;this.setAttribute("role","dialog"),this.selected?(t=new Date(this.selected),this.value={date:new Date(this.selected),text:this.selected}):t=new Date,this.firstOfMonthDate=new Date(t.getFullYear(),t.getMonth(),1),this.firstdate&&(this.fDate=new Date(this.firstdate)),this.lastdate&&(this.lDate=new Date(this.lastdate)),this.computeCalendar(),this.refreshSelection()}updated(t){t&&t instanceof Map&&(t.has("disabled")&&this.refreshDisabledState(),t.has("selected")&&this.refreshSelection());const e=this.shadowRoot.getElementById("svg");for(;e.hasChildNodes();)e.removeChild(e.lastChild);const i=this.getCalendarSize(),s=Math.min(Math.max(1,this.elevation),5),o=i.width+2*(s-1),n=i.height+2*(s-1);e.setAttribute("width",`${o}`),e.setAttribute("height",`${n}`),Ot(e,2,2,i.width-4,i.height-4);for(let t=1;t<s;t++)Et(e,2*t,i.height-4+2*t,i.width-4+2*t,i.height-4+2*t).style.opacity=`${(85-10*t)/100}`,Et(e,i.width-4+2*t,i.height-4+2*t,i.width-4+2*t,2*t).style.opacity=`${(85-10*t)/100}`,Et(e,2*t,i.height-4+2*t,i.width-4+2*t,i.height-4+2*t).style.opacity=`${(85-10*t)/100}`,Et(e,i.width-4+2*t,i.height-4+2*t,i.width-4+2*t,2*t).style.opacity=`${(85-10*t)/100}`;const r=this.shadowRoot.getElementById("svgTD");if(r){for(;r.hasChildNodes();)r.removeChild(r.lastChild);const t=Math.max(1*this.tblColWidth,20),e=Math.max(.9*this.tblRowHeight,18),i=At(r,this.tblColWidth/2,this.tblRowHeight/2,t,e);r.appendChild(i)}this.classList.add("wired-rendered")}setSelectedDate(t){if(this.selected=t,this.selected){const t=new Date(this.selected);this.firstOfMonthDate=new Date(t.getFullYear(),t.getMonth(),1),this.computeCalendar(),this.requestUpdate(),this.fireSelected()}}refreshSelection(){this.weeks.forEach(t=>t.forEach(t=>{t.selected=this.selected&&t.value===this.selected||!1})),this.requestUpdate()}resized(){this.calendarRefSize=this.getCalendarSize(),this.computeCalendar(),this.refreshSelection()}getCalendarSize(){const t=this.getBoundingClientRect();return{width:t.width>180?t.width:320,height:t.height>180?t.height:320}}computeCellsizes(t,e){this.tblColWidth=t.width/7-2,this.tblHeadHeight=.25*t.height/2-2,this.tblRowHeight=.75*t.height/e-2}refreshDisabledState(){this.disabled?this.classList.add("wired-disabled"):this.classList.remove("wired-disabled"),this.tabIndex=this.disabled?-1:+(this.getAttribute("tabindex")||0)}onItemClick(t){t.stopPropagation();let e=t.target;e&&e.hasAttribute("value")&&(this.selected=e.getAttribute("value")||void 0,this.refreshSelection(),this.fireSelected())}fireSelected(){this.selected&&(this.value={date:new Date(this.selected),text:this.selected},this.fireEvent("selected",{selected:this.selected}))}computeCalendar(){this.monthYear=Ei[this.firstOfMonthDate.getMonth()]+" "+this.firstOfMonthDate.getFullYear();const t=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth(),1);let e=0-t.getDay();const i=Math.ceil((new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,0).getDate()-e)/7);this.weeks=[];for(let s=0;s<i;s++){this.weeks[s]=[];for(let i=0;i<7;i++){const o=new Date(t.getTime()+864e5*e);let n=this.format(o);this.weeks[s][i]={value:n,text:o.getDate().toString(),selected:n===this.selected,dimmed:o.getMonth()!=t.getMonth(),disabled:this.isDateOutOfRange(o)},e++}}this.computeCellsizes(this.calendarRefSize,i)}onPrevClick(){null!=this.fDate&&new Date(this.fDate.getFullYear(),this.fDate.getMonth()-1,1).getMonth()==new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()-1,1),this.computeCalendar(),this.refreshSelection())}onNextClick(){null!=this.lDate&&new Date(this.lDate.getFullYear(),this.lDate.getMonth()+1,1).getMonth()==new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1).getMonth()||(this.firstOfMonthDate=new Date(this.firstOfMonthDate.getFullYear(),this.firstOfMonthDate.getMonth()+1,1),this.computeCalendar(),this.refreshSelection())}isDateOutOfRange(t){return this.fDate&&this.lDate?t<this.fDate||this.lDate<t:this.fDate?t<this.fDate:!!this.lDate&&this.lDate<t}debounce(t,e,i,s){let o=0;return()=>{const n=arguments,r=i&&!o;clearTimeout(o),o=window.setTimeout(()=>{o=0,i||t.apply(s,n)},e),r&&t.apply(s,n)}}},Ri([st({type:Number}),Mi("design:type",Object)],t.WiredCalendar.prototype,"elevation",void 0),Ri([st({type:String}),Mi("design:type",String)],t.WiredCalendar.prototype,"selected",void 0),Ri([st({type:String}),Mi("design:type",String)],t.WiredCalendar.prototype,"firstdate",void 0),Ri([st({type:String}),Mi("design:type",String)],t.WiredCalendar.prototype,"lastdate",void 0),Ri([st({type:Boolean,reflect:!0}),Mi("design:type",Object)],t.WiredCalendar.prototype,"disabled",void 0),Ri([st({type:Boolean,reflect:!0}),Mi("design:type",Object)],t.WiredCalendar.prototype,"initials",void 0),Ri([st({type:Object}),Mi("design:type",Object)],t.WiredCalendar.prototype,"value",void 0),Ri([st({type:Function}),Mi("design:type",Function)],t.WiredCalendar.prototype,"format",void 0),t.WiredCalendar=Ri([tt("wired-calendar"),Mi("design:paramtypes",[])],t.WiredCalendar),t}({});
