(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{1874:()=>{},29342:()=>{},34010:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=34010,e.exports=t},37376:(e,t,n)=>{Promise.resolve().then(n.bind(n,45546))},43966:()=>{},45546:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>tX});var r,a,s,i,o,l,c,m,u=n(73365);n(48608);var d=n(1521),p=n(66977),h=n(25357),f=n(98082),g=function(){function e(){}return e.retrieveParsedSpec=function(e){if(e){if((0,p.Mr)(e))return e;if((0,p.n6)(e)){var t=e.json();return(0,p.BS)(t)}if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return}return(0,f.isStringifiedDocument)(e)?(0,h.rS)(e):(0,p.BS)(e)}},e.containTags=function(e,t){var n="function"==typeof e.tags?e.tags():void 0;if(void 0===n||!Array.isArray(n))return!1;var r=Array.isArray(t)?t:[t];return n.some(function(e){return r.some(function(t){return t.name()===e.name()})})},e.operationsTags=function(e){var t=new Map;return Object.entries(e.operations().all()).forEach(function(e){var n=e[1];(null==n?void 0:n.tags().length)>0&&n.tags().all().forEach(function(e){return t.set(e.name(),e)})}),Array.from(t.values())},e.serversTags=function(e){var t={};return Object.entries(e.servers()).forEach(function(e){var n=e[0],r=e[1];r.tags().length>0&&r.tags().all().forEach(function(e){t[e.name()]?t[e.name()].push(n):t[e.name()]=[n]})}),t},e}(),v="https://www.iana.org/assignments/media-types",y="External Docs",x="SEND",E="RECEIVE",b="REQUEST",N="REPLY",w="Error",k="plugin:ready",S="plugin:error",C="specLoaded",O=[k,S],I={schemaID:"",show:{sidebar:!1,info:!0,servers:!0,operations:!0,messages:!0,messageExamples:!1,schemas:!0,errors:!0},expand:{messageExamples:!1},sidebar:{showServers:"byDefault",showOperations:"byDefault"},publishLabel:"PUB",subscribeLabel:"SUB",sendLabel:x,receiveLabel:E,requestLabel:b,replyLabel:N,extensions:{"x-x":function(e){var t=e.propertyValue;return d.createElement("a",{title:"https://x.com/".concat(t),style:{display:"inline-block"},href:"https://x.com/".concat(t),rel:"noopener noreferrer",target:"_blank"},d.createElement("svg",{style:{cursor:"pointer"},width:"15px",height:"15px",viewBox:"0 0 1200 1227",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z",fill:"black"})))}}},A=n(49663),P=function(){return(P=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},j=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)0>t.indexOf(r[a])&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n},T=function(e){return void 0===e&&(e={}),d.createElement("svg",P({stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 20 20",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},e),d.createElement("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"}))},R=function(e){var t,n,r=e.chevronProps,a=e.expanded,s=e.children,i=j(e,["chevronProps","expanded","children"]);return d.createElement("button",P({},i,{className:"focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ".concat(null!=(t=i.className)?t:""),type:"button"}),d.createElement("div",{className:"inline-block"},s),d.createElement(T,P({},r,{className:"inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ".concat(void 0!==a&&a?"-rotate-90":""," ").concat(null!=(n=null==r?void 0:r.className)?n:"")})))},L=d.createContext(null);function D(){return(0,d.useContext)(L)}var M=(0,d.createContext)({});function F(){return(0,d.useContext)(M)}(r=l||(l={})).SEND="send",r.RECEIVE="receive",r.REQUEST="request",r.REPLY="reply",(a=c||(c={})).OPERATION="operation",a.INFO="info";var q=function(){function e(){}return e.getIdentifier=function(e,t){var n=null==t?void 0:t.schemaID;return n?"".concat(n,"-").concat(e):e},e.getOperationType=function(e){if(e.isSend())if(void 0!==e.reply())return l.REQUEST;else return l.SEND;return e.isReceive()&&void 0!==e.reply()?l.REPLY:l.RECEIVE},e.getOperationIdentifier=function(t){var n=t.operation,r=t.config;if(n.isSend())if(void 0!==n.reply())return e.getIdentifier("operation-".concat(l.REQUEST,"-").concat(n.id()),r);else return e.getIdentifier("operation-".concat(l.SEND,"-").concat(n.id()),r);return n.isReceive()&&void 0!==n.reply()?e.getIdentifier("operation-".concat(l.REPLY,"-").concat(n.id()),r):e.getIdentifier("operation-".concat(l.RECEIVE,"-").concat(n.id()),r)},e.getOperationDesignInformation=function(e){var t,n,r,a,s,i,o=e.type,c=e.config,m=e.isAsyncAPIv2;return o===l.RECEIVE?{borderColor:"border-green-600 text-green-600",backgroundColor:"bg-green-600",typeLabel:m?null!=(n=c.publishLabel)?n:"PUB":null!=(t=c.receiveLabel)?t:E}:o===l.REPLY?{borderColor:"border-orange-600 text-orange-600",backgroundColor:"bg-orange-600",typeLabel:null!=(r=c.replyLabel)?r:N}:o===l.REQUEST?{borderColor:"border-red-600 text-red-600",backgroundColor:"bg-red-600",typeLabel:null!=(a=c.requestLabel)?a:b}:{borderColor:"border-blue-600 text-blue-500",backgroundColor:"bg-blue-600",typeLabel:m?null!=(i=c.subscribeLabel)?i:"SUB":null!=(s=c.sendLabel)?s:x}},e}();function U(e,t){var n=new Set,r=new Map;e.forEach(function(e){var a=[];t.forEach(function(t){var r;(null!=(r=t.tags.all())?r:[]).map(function(e){return e.name()}).includes(e)&&(a.push(t),n.add(t))}),a.length>0&&r.set(e,a)});var a=[];return t.forEach(function(e){n.has(e)||a.push(e)}),{tagged:r,untagged:a}}var _=function(){return(_=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},z=d.createContext({setShowSidebar:function(e){return e}}),H=function(){var e,t,n,r=(0,d.useState)(!1),a=r[0],s=r[1],i=D(),o=F(),l=i.info(),c=null==(e=l.extensions().get("x-logo"))?void 0:e.value(),m=i.components(),u=null==m?void 0:m.messages().all(),p=null==m?void 0:m.schemas().all(),h=i.operations().length>0,f=null==(t=o.show)?void 0:t.messages,g=null==(n=o.show)?void 0:n.schemas,v=(null==u?void 0:u.length)>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#messages",onClick:function(){return s(!1)}},"Messages"),d.createElement("ul",{className:"text-sm mt-2"},u.map(function(e,t){var n,r;return d.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.name())?n:t)},d.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#message-".concat(null!=(r=e.name())?r:e.id()),onClick:function(){return s(!1)}},d.createElement("div",{className:"break-all inline-block"},e.id())))}))),y=(null==p?void 0:p.length)>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#schemas",onClick:function(){return s(!1)}},"Schemas"),d.createElement("ul",{className:"text-sm mt-2"},p.map(function(e,t){var n;return d.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.id())?n:t)},d.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#schema-".concat(e.id()),onClick:function(){return s(!1)}},d.createElement("div",{className:"break-all inline-block"},e.id())))}))),x=h&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#operations",onClick:function(){return s(!1)}},"Operations"),d.createElement(W,null));return d.createElement(z.Provider,{value:{setShowSidebar:s}},d.createElement("div",{className:"burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500",onClick:function(){return s(function(e){return!e})},"data-lol":a},d.createElement("svg",{viewBox:"0 0 100 70",width:"40",height:"30",className:"fill-current text-gray-200"},d.createElement("rect",{width:"100",height:"10"}),d.createElement("rect",{y:"30",width:"100",height:"10"}),d.createElement("rect",{y:"60",width:"100",height:"10"}))),d.createElement("div",{className:"".concat(a?"block fixed w-full":"hidden"," sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20")},d.createElement("div",{className:"".concat(a?"sidebar--wrapper":""," block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200")},d.createElement("div",{className:"sidebar--content"},d.createElement("div",null,c?d.createElement("img",{src:c,alt:"".concat(l.title()," logo, ").concat(l.version()," version")}):d.createElement("h1",{className:"text-2xl font-light"},l.title()," ",l.version())),d.createElement("ul",{className:"text-sm mt-10 relative"},d.createElement("li",{className:"mb-3"},d.createElement("a",{className:"text-gray-700 no-underline hover:text-gray-900",href:"#introduction",onClick:function(){return s(!1)}},"Introduction")),i.servers().length>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#servers",onClick:function(){return s(!1)}},"Servers"),d.createElement($,null)),x,f&&v,g&&y)))))},$=function(){var e,t,n,r=F().sidebar,a=D(),s=a.servers().all(),i=null!=(e=null==r?void 0:r.showServers)?e:"byDefault";if("byDefault"===i)return d.createElement("ul",{className:"text-sm mt-2"},s.map(function(e){return d.createElement(K,{serverName:e.id(),key:e.id()})}));if("bySpecTags"===i)n=(null!=(t=a.info().tags().all())?t:[]).map(function(e){return e.name()});else{var o=new Set;s.forEach(function(e){e.tags().forEach(function(e){return o.add(e.name())})}),n=Array.from(o)}var l=U(n,s.map(function(e){return{name:e.id(),tags:e.tags(),data:{}}})),c=l.tagged,m=l.untagged;return d.createElement("ul",{className:"text-sm mt-2"},Array.from(c.entries()).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{key:t},d.createElement(Y,{tagName:t},n.map(function(e){var t=e.name;return d.createElement(K,{serverName:t,key:t})})))}),m.length>0?d.createElement("li",null,d.createElement(Y,{tagName:"Untagged"},m.map(function(e){var t=e.name;return d.createElement(K,{serverName:t,key:t})}))):null)},W=function(){var e,t,n,r=F(),a=r.sidebar,s=D(),i=s.operations().all(),o=null!=(e=null==a?void 0:a.showOperations)?e:"byDefault",l=i.map(function(e){var t,n,i,o=e.channels(),l=q.getOperationIdentifier({operation:e,config:r}),c=q.getOperationType(e),m=s.version().localeCompare("2.6.0",void 0,{numeric:!0}),u="";if(0===m||(null==a?void 0:a.useChannelAddressAsIdentifier)){var d=null!=(n=null==(t=o.all()[0])?void 0:t.address())?n:"",p=e.summary();u=null!=p?p:d}else u=null!=(i=e.id())?i:"";return{name:"".concat(c,"-").concat(e.id()),tags:e.tags(),data:{label:u,type:c,operationHrefId:l}}});if("byDefault"===o)return d.createElement("ul",{className:"text-sm mt-2"},l.map(function(e){var t=e.name,n=e.data;return d.createElement(V,_({key:t},n))}));if("bySpecTags"===o)n=(null!=(t=s.info().tags().all())?t:[]).map(function(e){return e.name()});else{var c=new Set;i.forEach(function(e){e.tags().all().forEach(function(e){return c.add(e.name())})}),n=Array.from(c)}var m=U(n,l),u=m.tagged,p=m.untagged;return d.createElement("ul",{className:"text-sm mt-2"},Array.from(u.entries()).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{key:t},d.createElement(Y,{tagName:t},n.map(function(e){var t=e.name,n=e.data;return d.createElement(V,_({key:t},n))})))}),p.length>0?d.createElement("li",null,d.createElement(Y,{tagName:"Untagged"},p.map(function(e){var t=e.name,n=e.data;return d.createElement(V,_({key:t},n))}))):null)},V=function(e){var t=e.type,n=e.operationHrefId,r=e.label,a=F(),s=(0,d.useContext)(z).setShowSidebar,i=D().version().localeCompare("2.6.0",void 0,{numeric:!0}),o=q.getOperationDesignInformation({type:t,config:a,isAsyncAPIv2:0===i}),l=o.typeLabel,c=o.backgroundColor;return d.createElement("li",{key:"menu-operation-list-".concat(n)},d.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#".concat(n),onClick:function(){return s(!1)}},d.createElement("strong",{className:"h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs ".concat(["bg-red-600","bg-orange-600","bg-green-600","bg-blue-600"].includes(c)&&c),title:l},l),d.createElement("span",{className:"break-all inline-block"},r)))},K=function(e){var t=e.serverName,n=(0,d.useContext)(z).setShowSidebar;return d.createElement("li",null,d.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#server-".concat(t),onClick:function(){return n(!1)}},d.createElement("span",{className:"break-all inline-block"},t)))},Y=function(e){var t=e.tagName,n=e.children,r=(0,d.useState)(!1),a=r[0],s=r[1];return d.createElement("div",null,d.createElement(R,{onClick:function(){return s(function(e){return!e})},chevronProps:{className:a?"-rotate-180":"-rotate-90"}},d.createElement("span",{className:"text-sm inline-block mt-1 font-extralight"},t)),d.createElement("ul",{className:"".concat(a?"block":"hidden"," text-sm mt-2 font-light")},n))},B=function(e){var t=e.href,n=e.title,r=e.className,a=e.children;return d.createElement("a",{href:t,title:n?"".concat(n," (Opens in new window)"):"Opens in new window",className:r,target:"_blank",rel:"nofollow noopener noreferrer"},a)},G=n(76941),Q=n(66661),X=n(93466),J=n.n(X),Z=n(45715),ee=n.n(Z),et=n(4402),en=n.n(et),er=n(72447),ea=n.n(er);J().registerLanguage("json",ee()),J().registerLanguage("yaml",en()),J().registerLanguage("bash",ea());var es={langPrefix:"hljs language-",highlight:function(e,t){if(!J().getLanguage(t))return e;try{return J().highlight(e,{language:t}).value}catch(t){return e}}},ei=function(e){var t=e.children;return t?"string"!=typeof t?d.createElement(d.Fragment,null,t):d.createElement("div",{className:"prose max-w-none text-sm",dangerouslySetInnerHTML:{__html:(0,G.sanitize)((0,Q.xI)(t,es))}}):null},eo=function(e){var t,n=e.tag,r="#".concat(n.name()),a=null!=(t=n.description())?t:"",s=n.externalDocs(),i=d.createElement("div",{title:a,className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1"},d.createElement("span",{className:s?"underline":""},r));return s?d.createElement(B,{href:s.url(),title:a},i):i},el=function(e){var t=e.tags;return(null==t?void 0:t.length)?d.createElement("ul",{className:"flex flex-wrap leading-normal"},t.all().map(function(e){return d.createElement("li",{className:"inline-block mt-2 mr-2",key:e.name()},d.createElement(eo,{tag:e}))})):null},ec=n(18951),em=function(){return(em=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};(s=m||(m={})).ANY="any",s.RESTRICTED_ANY="restricted any",s.NEVER="never",s.UNKNOWN="unknown";var eu=["string","number","integer","boolean","array","object","null"],ed=["maxLength","minLength","pattern","contentMediaType","contentEncoding","multipleOf","maximum","exclusiveMaximum","minimum","exclusiveMinimum","items","maxItems","minItems","uniqueItems","contains","additionalItems","maxProperties","minProperties","required","properties","patternProperties","propertyNames","dependencies","additionalProperties"],ep=function(){function e(){}return e.toSchemaType=function(e){var t=this;if(!e||"function"!=typeof e.json)return m.UNKNOWN;if(e.isBooleanSchema())if(!0===e.json())return m.ANY;else return m.NEVER;if(0===Object.keys(e.json()).length)return m.ANY;var n=e.not();if(n&&this.inferType(n)===m.ANY)return m.NEVER;var r=this.inferType(e);if(Array.isArray(r))return r.map(function(n){return t.toType(n,e)}).join(" | ");r=this.toType(r,e);var a=this.toCombinedType(e);return r&&a?"".concat(r," ").concat(a):a||("object"===r&&e.title()&&(r+=" ["+e.title()+"]"),r)},e.applicatorSchemaName=function(e,t,n,r){var a=r?" ".concat(r,":"):":";return(a.startsWith(" <anonymous-schema-")&&(a=" Anonymous Schema"),0===e)?"".concat(t).concat(a):"".concat(n).concat(a)},e.prettifyValue=function(e,t){void 0===t&&(t=!0);var n=typeof e;return"string"===n?t?'"'.concat(e,'"'):e:"number"===n||"bigint"===n||"boolean"===n?"".concat(e):Array.isArray(e)?"[".concat(e.toString(),"]"):JSON.stringify(e)},e.humanizeConstraints=function(e){var t=[],n=this.humanizeNumberRangeConstraint(e.minimum(),e.exclusiveMinimum(),e.maximum(),e.exclusiveMaximum());void 0!==n&&t.push(n);var r=this.humanizeMultipleOfConstraint(e.multipleOf());void 0!==r&&t.push(r);var a=this.humanizeRangeConstraint("characters",e.minLength(),e.maxLength());void 0!==a&&t.push(a);var s=e.uniqueItems(),i=this.humanizeRangeConstraint(s?"unique items":"items",e.minItems(),e.maxItems());void 0!==i&&t.push(i);var o=this.humanizeRangeConstraint("properties",e.minProperties(),e.maxProperties());return void 0!==o&&t.push(o),t},e.isExpandable=function(e){var t,n,r,a,s,i,o,l,c=this.inferType(e);if((c=Array.isArray(c)?c:[c]).includes("object")||c.includes("array")||(null!=(l=(null!=(r=null!=(n=null!=(t=e.oneOf())?t:e.anyOf())?n:e.allOf())?r:Object.keys(null!=(a=e.properties())?a:{}).length>0)||(null!=(o=null!=(i=null!=(s=e.items())?s:e.not())?i:e.if())?o:e.then()))?l:e.else()))return!0;var m=this.getCustomExtensions(e);return!!(m&&Object.keys(m).length)},e.serverVariablesToSchema=function(e){if(e&&0!==e.length){var t,n={};e.all().forEach(function(e){n[e.id()]=em({},e.json()||{}),n[e.id()].type="string"});var r=((t={type:"object",properties:n,required:Object.keys(n)})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(r)}},e.parametersToSchema=function(e){var t,n=this;if(!(!e||e.isEmpty())){var r={};e.all().forEach(function(e){var t,a=e.schema();r[e.id()]=em({},null!=(t=null==a?void 0:a.json())?t:{}),r[e.id()].description=e.hasDescription()?e.description():void 0,r[e.id()][n.extParameterLocation]=e.hasLocation()?e.location():void 0});var a=((t={type:"object",properties:r,required:Object.keys(r)})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(a)}},e.jsonToSchema=function(e){var t=this.jsonFieldToSchema(e);return new ec.S(t)},e.getCustomExtensions=function(e){if(e&&"function"==typeof e.extensions){for(var t=e.extensions(),n={},r=0,a=t.all();r<a.length;r++){var s=a[r];s.id().startsWith("x-parser-")||s.id().startsWith("x-schema-private-")||(n[s.id()]=s.value())}return n}},e.getDependentRequired=function(e,t){var n=[],r=t.dependencies();if(r){for(var a=0,s=Object.entries(r);a<s.length;a++){var i=s[a],o=i[0],l=i[1];Array.isArray(l)&&l.includes(e)&&n.push(o)}return n.length?n:void 0}},e.getDependentSchemas=function(e){var t,n=e.dependencies();if(n){for(var r={},a=0,s=Object.entries(n);a<s.length;a++){var i=s[a],o=i[0],l=i[1];"object"!=typeof l||Array.isArray(l)||(r[o]=l)}if(Object.keys(r).length){var c=((t={type:"object",properties:Object.entries(r).reduce(function(e,t){var n=t[0],r=t[1];return e[n]=em({},r.json()),e},{})})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(c)}}},e.toType=function(e,t){if(t.isCircular())return e;if("array"===e){var n=t.items();return Array.isArray(n)?this.toItemsType(n,t):n?"array<".concat(this.toSchemaType(n)||m.UNKNOWN,">"):"array<".concat(m.ANY,">")}return e},e.toItemsType=function(e,t){var n=this,r=e.map(function(e){return n.toSchemaType(e)}).join(", "),a=t.additionalItems();if(void 0!==a&&!1!==a){var s=!0===a?m.ANY:this.toSchemaType(a);return"tuple<".concat(r||m.UNKNOWN,", ...optional<").concat(s,">>")}return"tuple<".concat(r||m.UNKNOWN,">")},e.toCombinedType=function(e){return e.oneOf()?"oneOf":e.anyOf()?"anyOf":e.allOf()?"allOf":void 0},e.inferType=function(e){var t=e.type();if(void 0!==t)return Array.isArray(t)?(t.includes("integer")&&t.includes("number")&&(t=t.filter(function(e){return"integer"!==e})),1===t.length?t[0]:t):t;var n=e.const();if(void 0!==n)return typeof n;var r=e.enum();if(Array.isArray(r)&&r.length){var a=Array.from(new Set(r.map(function(e){return typeof e})));return 1===a.length?a[0]:a}var s=Object.keys(e.json()||{})||[];return!0===ed.some(function(e){return s.includes(e)})?m.RESTRICTED_ANY:this.toCombinedType(e)?"":m.ANY},e.humanizeNumberRangeConstraint=function(e,t,n,r){var a,s=void 0!==t,i=void 0!==e||s,o=void 0!==r,l=void 0!==n||o;return i&&l?a=""+(s?t:e)+(s?" < ":" <= ")+"value"+(o?" < ":" <= ")+(o?r:n):i?a=""+(s?t:e)+(s?" < ":" <= ")+"value":l&&(a="value"+(o?" < ":" <= ")+(o?r:n)),a},e.humanizeMultipleOfConstraint=function(e){if(void 0!==e){var t=e.toString(10);return/^0\.0*1$/.test(t)?"decimal places <= ".concat(t.split(".")[1].length):"multiple of ".concat(t)}},e.humanizeRangeConstraint=function(e,t,n){var r;return void 0!==t&&void 0!==n?r=t===n?"".concat(t," ").concat(e):"[ ".concat(t," .. ").concat(n," ] ").concat(e):void 0!==n?r="<= ".concat(n," ").concat(e):void 0!==t&&(r=1===t?"non-empty":">= ".concat(t," ").concat(e)),r},e.jsonFieldToSchema=function(e,t){var n,r,a,s,i=this;if(void 0===t&&(t=new Set),null==e)return(n={type:"string",const:""})[this.extRawValue]=!0,n;if("object"!=typeof e)return(r={type:"string",const:"function"==typeof e.toString?e.toString():e})[this.extRawValue]=!0,r;if(t.has(e))throw Error("too much recursion. Please check document for recursion.");t.add(e);try{if(this.isJSONSchema(e))return e;if(Array.isArray(e))return(a={type:"array",items:e.map(function(e){return i.jsonFieldToSchema(e,t)})})[this.extRenderAdditionalInfo]=!1,a;return(s={type:"object",properties:Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return e[r]=i.jsonFieldToSchema(a,t),e},{})})[this.extRenderAdditionalInfo]=!1,s}finally{t.delete(e)}},e.isJSONSchema=function(e){return!!(e&&"object"==typeof e&&(eu.includes(e.type)||Array.isArray(e.type)&&e.type.some(function(e){return!eu.includes(e)})))},e.hasRules=function(e,t){return!!(e.format()||e.pattern()||t.length>0||e.contentEncoding()||e.enum()||void 0!==e.default()||void 0!==e.const())},e.hasConditions=function(e){var t,n,r,a=this.getDependentSchemas(e);return!!((null==(t=e.oneOf())?void 0:t.length)||(null==(n=e.anyOf())?void 0:n.length)||(null==(r=e.allOf())?void 0:r.length)||e.not()||e.propertyNames()||e.contains()||e.if()||e.then()||e.else()||a)},e.extRenderAdditionalInfo="x-schema-private-render-additional-info",e.extRawValue="x-schema-private-raw-value",e.extParameterLocation="x-schema-private-parameter-location",e}(),eh=function(e){var t,n=e.schema;if(!n)return null;var r=n.type();if(!(null==r?void 0:r.includes("array")))return null;var a=n.items();return a&&!Array.isArray(a)&&Object.keys(null!=(t=a.properties())?t:{}).length?d.createElement(eN,{schema:a,isArray:!0}):Array.isArray(a)?d.createElement(d.Fragment,null,a.map(function(e,t){return d.createElement(eN,{schema:e,isArray:!0,schemaName:"".concat(t+1," item:"),key:t})})):d.createElement(eN,{schema:a,isArray:!0,schemaName:"Items:"})},ef=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(ep.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("array"))||!Array.isArray(n.items()))return null;var a=n.additionalItems();return!0===a||void 0===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are allowed."):!1===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are ",d.createElement("strong",null,"NOT")," allowed."):d.createElement(eN,{schemaName:"Additional items:",schema:a})},eg=function(e){var t,n,r,a=e.schema;if(!a)return null;var s=Object.entries(null!=(t=a.properties())?t:{}),i=Object.entries(null!=(n=a.patternProperties())?n:{});if(!s.length&&!i.length)return null;var o=null!=(r=a.required())?r:[];return d.createElement(d.Fragment,null,s.map(function(e){var t=e[0],n=e[1];return d.createElement(eN,{key:t,schema:n,schemaName:t,required:o.includes(t),isProperty:!0,isCircular:n.isCircular(),dependentRequired:ep.getDependentRequired(t,a)})}),i.map(function(e){var t=e[0],n=e[1];return d.createElement(eN,{key:t,schema:n,schemaName:t,isPatternProperty:!0,isProperty:!0,isCircular:n.isCircular()})}))},ev=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(ep.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("object")))return null;var a=n.additionalProperties();return!0===a||void 0===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are allowed."):!1===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are ",d.createElement("strong",null,"NOT")," allowed."):d.createElement(eN,{schemaName:"Additional properties:",schema:a})},ey=function(e){var t,n,r,a,s,i,o=e.schema,l=e.dependentSchemas;return d.createElement("div",{className:"space-y-2 bg-blue-100 border rounded rounded-tl-none p-4"},(null==(t=o.oneOf())?void 0:t.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",d.createElement("strong",null,"One Of")," the following:"),null==(n=o.oneOf())?void 0:n.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(r=o.anyOf())?void 0:r.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",d.createElement("strong",null,"Any Of")," the following:"),null==(a=o.anyOf())?void 0:a.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(s=o.allOf())?void 0:s.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Must consist ",d.createElement("strong",null,"All Of")," the following:"),null==(i=o.allOf())?void 0:i.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),o.not()&&d.createElement(eN,{schema:o.not(),schemaName:"Can NOT adhere to:"}),o.propertyNames()&&d.createElement(eN,{schema:o.propertyNames(),schemaName:"Property names must adhere to:"}),o.contains()&&d.createElement(eN,{schema:o.contains(),schemaName:"Array must contain at least one of:"}),o.if()&&d.createElement("div",{className:""},d.createElement(eN,{schema:o.if(),schemaName:"If schema adheres to:"}),o.then()&&d.createElement(eN,{schema:o.then(),schemaName:"Then must adhere to:"}),o.else()&&d.createElement(eN,{schema:o.else(),schemaName:"Otherwise:"})),l&&d.createElement(eN,{schema:l,schemaName:"Dependent schemas:"}))},ex=function(e){var t,n=e.schema,r=e.constraints;return d.createElement("div",{className:"flex flex-col space-y-2 bg-blue-100 p-4 rounded rounded-tl-none border"},n.format()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"format:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.format())),n.pattern()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"must match:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.pattern())),void 0!==n.contentEncoding()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"encoding:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.contentEncoding())),r.map(function(e){return d.createElement("strong",{key:e,className:"text-purple-700 p-1 rounded-md text-sm"},e)}),void 0!==n.default()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Default value:"),d.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(n.default()))),void 0!==n.const()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Constant value: "),d.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(n.const()))),n.enum()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Allowed values: "),null==(t=n.enum())?void 0:t.map(function(e,t){return d.createElement("span",{key:t,className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(e))})))},eE=function(e){var t,n,r,a=e.schema,s=e.required,i=void 0!==s&&s,o=e.isPatternProperty,l=e.dependentRequired;if(!a)return null;var c=null!=i&&i,m=null!=(t=a.deprecated())&&t,u=null!=(n=a.writeOnly())&&n,p=null!=(r=a.readOnly())&&r,h=null!=o&&o;return d.createElement(d.Fragment,null,(c||m||u||p||h)&&d.createElement("div",{className:"flex items-center space-x-2"},c&&d.createElement("span",{className:"text-red-600 text-xs rounded"},"required"),l&&d.createElement(d.Fragment,null,d.createElement("div",{className:"text-gray-500 text-xs"},"required when defined:"),d.createElement("div",{className:"text-red-600 text-xs"},l.join(", "))),m&&d.createElement("span",{className:"text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded"},"deprecated"),o&&d.createElement("div",{className:"text-gray-500 text-xs italic"},"(pattern property)"),u&&d.createElement("span",{className:"text-gray-600 text-xs rounded"},"write-only"),p&&d.createElement("span",{className:"text-gray-500 text-xs rounded"},"read-only")))},eb=d.createContext({reverse:!1,deepExpanded:!1}),eN=function(e){var t,n,r=e.schemaName,a=e.schema,s=e.required,i=e.isPatternProperty,o=e.isProperty,l=void 0!==o&&o,c=e.isCircular,m=void 0!==c&&c,u=e.dependentRequired,p=e.expanded,h=e.isArray,f=void 0!==h&&h,g=(0,d.useContext)(eb),v=g.reverse,y=g.deepExpanded,x=(0,d.useState)(void 0!==p&&p||f),E=x[0],b=x[1],N=(0,d.useState)(!1),w=N[0],k=N[1],S=(0,d.useState)("RULES"),C=S[0],O=S[1],I=a?ep.humanizeConstraints(a):[],A=!!a&&ep.hasRules(a,I),P=!!a&&ep.hasConditions(a);(0,d.useEffect)(function(){A||O("CONDITIONS")},[A]),(0,d.useEffect)(function(){f||k(y)},[f,y,k]),(0,d.useEffect)(function(){f||b(w)},[f,w]);var j=(0,d.useMemo)(function(){return{reverse:!v,deepExpanded:w}},[v,w]);if(!a||"string"==typeof r&&((null==r?void 0:r.startsWith("x-parser-"))||(null==r?void 0:r.startsWith("x-schema-private-"))))return null;var T=ep.getDependentSchemas(a),L=a.externalDocs(),D=a.extensions().get(ep.extParameterLocation),M=(null==D?void 0:D.value())===!0,F=ep.toSchemaType(a);m=m||a.isCircular()||!1;var q=a.$id(),U="string"==typeof r?d.createElement("span",{className:"break-anywhere text-sm w-full ".concat(l?"italic":"")},r):r,_=ep.isExpandable(a)||A||P;return d.createElement(eb.Provider,{value:j},d.createElement("div",{className:"flex mb-4 gap-2"},d.createElement("div",{className:"border rounded overflow-visible w-full"},d.createElement("div",{className:"flex flex-col justify-center p-4 bg-gray-100 border-b"},d.createElement("div",{className:"flex justify-between items-start"},d.createElement("div",{className:"flex items-center gap-2 w-full"},!_||m||f?d.createElement("span",{className:"text-sm ".concat(l?"italic":"")},r):d.createElement("div",{className:"flex items-center gap-2"},d.createElement(R,{onClick:function(){return b(function(e){return!e})},expanded:E},U)),d.createElement("span",{className:"capitalize text-sm text-teal-500 font-bold"},m?"".concat(F," [CIRCULAR]"):F),void 0!==a.contentMediaType()&&d.createElement("strong",{className:"bg-yellow-600 no-underline text-white rounded lowercase mr-2 p-1 text-xs"},"media type: ",a.contentMediaType()),q&&!q.startsWith("<anonymous-")&&d.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},"uid: ",q),d.createElement(eE,{schema:a,isPatternProperty:void 0!==i&&i,required:void 0!==s&&s,dependentRequired:u}),d.createElement("div",{className:"ml-auto flex gap-4"},_&&!m&&!f&&d.createElement("button",{type:"button",onClick:function(){var e=!E;k(e),f||b(e)},className:"text-sm text-gray-500 hover:text-gray-700"},E?"Collapse all":"Expand all")))),a.description()&&d.createElement("div",{className:"mt-2 text-sm text-gray-600"},d.createElement(ei,null,a.description())),a.examples()&&d.createElement("ul",{className:"text-xs"},"Examples values:"," ",null==(t=a.examples())?void 0:t.map(function(e,t){return d.createElement("li",{key:t,className:"inline-block bg-gray-600 text-white rounded ml-1 py-0 px-2 break-all"},d.createElement("span",null,ep.prettifyValue(e)))})),M&&d.createElement("div",{className:"text-xs"},"Parameter location:"," ",d.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},M)),L&&d.createElement("strong",{className:"w-min border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-2 py-0 mt-2"},d.createElement(B,{href:L.url(),title:null!=(n=L.description())?n:""},"Documentation"))),d.createElement("div",{className:"flex "},!m&&_&&E&&d.createElement("div",{className:"p-4 bg-white relative w-full"},d.createElement(eg,{schema:a}),d.createElement(eh,{schema:a}),d.createElement("div",{className:""},d.createElement("div",{className:"flex gap-1"},A&&d.createElement("button",{className:"text-sm font-semibold text-gray-900 ".concat("RULES"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return O("RULES")},role:"tab","aria-selected":"RULES"===C,"aria-controls":"rules-panel"},"Rules"),P&&d.createElement("button",{className:"text-sm font-semibold text-gray-900 ".concat("CONDITIONS"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return O("CONDITIONS")},role:"tab","aria-selected":"CONDITIONS"===C,"aria-controls":"conditions-panel"},"Conditions")),P&&"CONDITIONS"==C&&d.createElement("div",{className:"mb-4 w-full"},d.createElement(ey,{schema:a,dependentSchemas:T})),A&&"RULES"==C&&d.createElement("div",{className:"z-10 w-full"},d.createElement(ex,{schema:a,constraints:I}))),d.createElement("div",{className:"mt-4"},d.createElement(ev,{schema:a}),d.createElement(ef,{schema:a})),d.createElement(ew,{item:a}))))))},ew=function(e){var t=e.name,n=void 0===t?"Extensions":t,r=e.item,a=(0,d.useState)(!1),s=a[0],i=a[1],o=F(),l=D(),c=ep.getCustomExtensions(r);if(!c||!Object.keys(c).length)return null;if(!o.extensions||!Object.keys(o.extensions).length){var m=ep.jsonToSchema(c);return m&&d.createElement("div",{className:"mt-2"},d.createElement(eN,{schemaName:n,schema:m}))}return d.createElement("div",null,d.createElement("div",{className:"flex py-2"},d.createElement("div",{className:"min-w-1/4"},d.createElement(d.Fragment,null,d.createElement(R,{onClick:function(){return i(function(e){return!e})},expanded:s},d.createElement("span",{className:"break-anywhere text-sm ".concat(n)},n))))),d.createElement("div",{className:"rounded p-4 py-2 border bg-gray-100 ".concat(s?"block":"hidden")},Object.keys(c).sort(function(e,t){return e.localeCompare(t)}).map(function(e){if(null==(t=o.extensions)?void 0:t[e]){var t,n=o.extensions[e];return d.createElement(n,{key:e,propertyName:e,propertyValue:c[e],document:l,parent:r})}var a=ep.jsonToSchema(c[e]);return d.createElement("div",{key:e,className:"mt-2"},d.createElement(eN,{schemaName:e,schema:a}))})))},ek=function(e){var t=e.slot,n=e.context,r=e.pluginManager;if(!r)return null;var a=r.getComponentsForSlot(t);return a&&0!==a.length?d.createElement("div",{className:"asyncapi-react-plugin-slot-".concat(t),"data-slot":t},a.map(function(e,r){return d.createElement(d.Suspense,{key:"".concat(t,"-").concat(r),fallback:d.createElement("div",null,"Loading plugin...")},d.createElement(e,{context:n}))})):null},eS=(0,d.createContext)(void 0);function eC(){return(0,d.useContext)(eS)}var eO=function(){var e,t,n,r,a,s,i,o,l,m=D(),u=eC(),p=m.info();if(!p)return null;var h=m.info().id(),f=m.info().externalDocs(),g=p.license(),x=p.termsOfService(),E=m.defaultContentType(),b=p.contact(),N=p.extensions(),w=null!=(n=null!=(t=null!=(e=null!=g?g:x)?e:E)?t:b)?n:f;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8 text-left",id:"introduction"},d.createElement("div",{className:"text-4xl"},p.title(),"\xa0",p.version()),w&&d.createElement("ul",{className:"flex flex-wrap mt-2 leading-normal"},g&&d.createElement("li",{className:"inline-block mt-2 mr-2"},g.url()?d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(r=g.url())?r:""},d.createElement("span",null,g.name())):d.createElement("strong",{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-3 py-1"},g.name())),x&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:x},d.createElement("span",null,"Terms of service"))),E&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(v,"/").concat(E)},d.createElement("span",null,E))),f&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:f.url(),title:null!=(a=f.description())?a:void 0},d.createElement("span",null,y))),b&&d.createElement(d.Fragment,null,b.url()&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(s=b.url())?s:""},d.createElement("span",null,null!=(i=b.name())?i:"Support"))),b.email()&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"mailto:".concat(b.email())},d.createElement("span",null,b.email())))),h&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement("strong",{className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 no-underline text-xs uppercase rounded px-3 py-1"},"ID: ",h))),p.hasDescription()&&d.createElement("div",{className:"mt-4"},d.createElement(ei,null,p.description())),m.info().tags().length>0&&d.createElement("div",{className:"mt-4"},d.createElement(el,{tags:m.info().tags()})),N.length>0&&d.createElement("div",{className:"mt-4"},d.createElement(ew,{name:"Info Extensions",item:p})),(null!=(l=null==(o=null==u?void 0:u.getComponentsForSlot(c.INFO))?void 0:o.length)?l:0)>0&&d.createElement(ek,{slot:c.INFO,context:{schema:p},pluginManager:u})),d.createElement("div",{className:"panel-item--right"}))},eI=function(){function e(){}return e.securityType=function(e){switch(e){case"apiKey":default:return"API key";case"oauth2":return"OAuth2";case"openIdConnect":return"Open ID";case"http":return"HTTP";case"userPassword":return"User/Password";case"X509":return"X509:";case"symmetricEncryption":return"Symmetric Encription";case"asymmetricEncryption":return"Asymmetric Encription";case"httpApiKey":return"HTTP API key";case"scramSha256":return"ScramSha256";case"scramSha512":return"ScramSha512";case"gssapi":return"GSSAPI"}},e.flowName=function(e){switch(e){case"implicit":default:return"Implicit";case"password":return"Password";case"clientCredentials":return"Client credentials";case"authorizationCode":return"Authorization Code"}},e.getKafkaSecurity=function(e,t){var n,r;if(n="kafka"===e?t?"SASL_PLAINTEXT":"PLAINTEXT":t?"SASL_SSL":"SSL",t)switch(t.type()){case"plain":r="PLAIN";break;case"scramSha256":r="SCRAM-SHA-256";break;case"scramSha512":r="SCRAM-SHA-512";break;case"oauth2":r="OAUTHBEARER";break;case"gssapi":r="GSSAPI";break;case"X509":n="SSL"}return{securityProtocol:n,saslMechanism:r}},e}(),eA=function(e){var t,n=e.security,r=void 0===n?[]:n,a=e.protocol,s=void 0===a?"":a,i=e.header;if(null==r?void 0:r.length){var o=Object.values(r).map(function(e){return e.all()}).flat().map(function(e){var t=e.scheme(),n=e.scopes();return t?d.createElement(eP,{protocol:s,securitySchema:t,requiredScopes:n,key:t.type()}):null}).filter(Boolean);t=d.createElement("ul",null,o.map(function(e,t){return d.createElement("li",{className:"mt-2",key:t},e)}))}else("kafka"===s||"kafka-secure"===s)&&(t=d.createElement(eP,{protocol:s,securitySchema:null}));return t?d.createElement("div",{className:"text-sm mt-4"},d.createElement("h5",{className:"text-gray-800"},void 0===i?"Security":i,":"),t):null},eP=function(e){var t,n,r,a=e.securitySchema,s=e.protocol,i=(void 0===(t=e.requiredScopes)&&(t=[]),n=[],a&&(a.name()&&n.push(d.createElement("span",null,"Name: ",a.name())),a.in()&&n.push(d.createElement("span",null,"In: ",a.in())),a.scheme()&&n.push(d.createElement("span",null,"Scheme: ",a.scheme())),a.bearerFormat()&&n.push(d.createElement("span",null,"Bearer format: ",a.bearerFormat())),a.openIdConnectUrl()&&n.push(d.createElement(B,{href:a.openIdConnectUrl(),className:"underline"},"Connect URL")),t.length&&n.push(d.createElement("span",null,"Required scopes: ",t.join(", ")))),n);if(["kafka","kafka-secure"].includes(s)){var o=eI.getKafkaSecurity(s,a),l=o.securityProtocol,c=o.saslMechanism;r=d.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded"},l&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"security.protocol:"),d.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},l)),c&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"sasl.mechanism:"),d.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},c)))}var m=null==a?void 0:a.flows(),u={};(null==m?void 0:m.hasImplicit())&&(u.implicit=m.implicit()),(null==m?void 0:m.hasAuthorizationCode())&&(u.authorizationCode=m.authorizationCode()),(null==m?void 0:m.hasClientCredentials())&&(u.clientCredentials=m.clientCredentials()),(null==m?void 0:m.hasPassword())&&(u.password=m.password());var p=Object.entries(u).map(function(e){var t=e[0],n=e[1],r=n.authorizationUrl(),a=n.tokenUrl(),s=n.refreshUrl(),i=n.scopes();return d.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded",key:t},d.createElement("div",null,d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Flow:"),d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},eI.flowName(t))),r&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Auth URL:"),d.createElement(B,{href:r,className:"underline"},r)),a&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Token URL:"),d.createElement(B,{href:a,className:"underline"},a)),s&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Refresh URL:"),d.createElement(B,{href:s,className:"underline"},s)),i&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Scopes:"),d.createElement("ul",{className:"inline-block"},i&&Object.entries(i).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{className:"inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1",title:n,key:t},t)}))))});return d.createElement("div",null,a&&i&&d.createElement("div",null,d.createElement("span",null,eI.securityType(a.type()),i.length>0&&d.createElement("ul",{className:"inline-block ml-2"},i.map(function(e,t){return d.createElement("li",{className:"inline-block font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded px-2 py-0 ml-1",key:t},e)})))),(null==a?void 0:a.hasDescription())&&d.createElement("div",null,d.createElement(ei,null,a.description())),p&&p.length>0&&d.createElement("ul",{className:"my-2"},d.createElement("li",null,p)),r&&d.createElement("div",null,r))},ej=function(e){var t=e.name,n=void 0===t?"Binding specific information":t,r=e.bindings;if(!r||r.isEmpty())return null;var a=r.all().map(function(e){var t=e.value(),r=ep.jsonToSchema(t),a=e.protocol(),s=d.createElement("div",{className:"inline-block text-sm"},d.createElement("span",null,n),d.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs"},a));return void 0!==r&&d.createElement(eN,{schemaName:s,schema:r,key:a})});return d.createElement(d.Fragment,null,a)},eT=function(e){var t=e.serverName,n=e.server,r=F();if(!n)return null;var a=ep.serverVariablesToSchema(n.variables()),s=n.protocolVersion(),i=n.security();return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border bg-gray-100"},d.createElement("div",null,d.createElement("span",{className:"font-mono text-base"},n.url()),d.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm"},s?"".concat(n.protocol()," ").concat(s):n.protocol()),d.createElement("strong",{className:"bg-blue-500 no-underline text-white uppercase rounded px-2 py-1 text-sm"},t)),n.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,n.description())),a&&d.createElement("div",{className:"mt-2",id:"".concat(q.getIdentifier("server-".concat(t,"-url-variables"),r))},d.createElement(eN,{schemaName:"URL Variables",schema:a,expanded:!0})),d.createElement("div",{id:"".concat(q.getIdentifier("server-".concat(t,"-security"),r))},d.createElement(eA,{protocol:n.protocol(),security:i})),n.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Server specific information",bindings:n.bindings()})),d.createElement(ew,{name:"Server Extensions",item:n}),n.tags().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(el,{tags:n.tags()})))),d.createElement("div",{className:"panel-item--right"}))},eR=function(){var e=D().servers().all(),t=F();return e.length?d.createElement("section",{id:"".concat(q.getIdentifier("servers",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Servers"),d.createElement("ul",null,e.map(function(e){var n=e.id();return d.createElement("li",{className:"mb-4",key:n,id:"".concat(q.getIdentifier("server-".concat(n),t))},d.createElement(eT,{serverName:n,server:e,key:n}))}))):null},eL=function(e){var t=e.snippet;return"object"==typeof t&&(t="```json\n"+JSON.stringify(t,void 0,2)+"\n```"),d.createElement(ei,null,t)},eD=n(43284),eM=function(){function e(){}return e.generateExample=function(e,t){void 0===t&&(t={});try{return this.sanitizeExample((0,eD.XM)(e,t))||""}catch(e){return""}},e.sanitizeExample=function(e){var t=this;return"object"==typeof e&&e&&!Array.isArray(e)?Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return r.startsWith("x-parser-")||r.startsWith("x-schema-private-")||(e[r]=t.sanitizeExample(a)),e},{}):e},e.getPayloadExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasPayload()})){var r=n.flatMap(function(e){if(e.payload())return{name:e.name(),summary:e.summary(),example:e.payload()}}).filter(Boolean);if(r.length>0)return r}var a=e.payload();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e.getHeadersExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasHeaders()})){var r=n.flatMap(function(e){if(e.hasHeaders())return{name:e.name(),summary:e.summary(),example:e.headers()}}).filter(Boolean);if(r.length>0)return r}var a=e.headers();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e}(),eF=function(e){var t=e.message;if(!t)return null;var n=t.payload(),r=t.headers();return d.createElement("div",{className:"bg-gray-800 px-8 py-4 mt-4 -mx-8 2xl:mx-0 2xl:px-4 2xl:rounded examples"},d.createElement("h4",{className:"text-white text-lg"},"Examples"),n&&d.createElement(eq,{type:"Payload",schema:n,examples:eM.getPayloadExamples(t)}),r&&d.createElement(eq,{type:"Headers",schema:r,examples:eM.getHeadersExamples(t)}))},eq=function(e){var t,n,r=e.type,a=e.schema,s=e.examples,i=void 0===s?[]:s,o=F(),l=(0,d.useState)(null!=(n=null==(t=null==o?void 0:o.expand)?void 0:t.messageExamples)&&n),c=l[0],m=l[1];return(0,d.useEffect)(function(){var e,t;m(null!=(t=null==(e=null==o?void 0:o.expand)?void 0:e.messageExamples)&&t)},[o.expand]),d.createElement("div",{className:"mt-4"},d.createElement("div",null,d.createElement(R,{onClick:function(){return m(function(e){return!e})},expanded:c,chevronProps:{className:"fill-current text-gray-200"}},d.createElement("span",{className:"inline-block w-20 py-0.5 mr-1 text-gray-200 text-sm border text-center rounded focus:outline-none"},void 0===r?"Payload":r))),d.createElement("div",{className:c?"block":"hidden"},i&&i.length>0?d.createElement("ul",null,i.map(function(e,t){return d.createElement("li",{className:"mt-4",key:t},d.createElement("h5",{className:"text-xs font-bold text-gray-500"},e.name?"#".concat(t+1," Example - ").concat(e.name):"#".concat(t+1," Example")),e.summary&&d.createElement("p",{className:"text-xs font-bold text-gray-500"},e.summary),d.createElement("div",{className:"mt-1"},d.createElement(eL,{snippet:eM.sanitizeExample(e.example)})))})):d.createElement("div",{className:"mt-4"},d.createElement(eL,{snippet:eM.generateExample(a.json())}),d.createElement("h6",{className:"text-xs font-bold text-gray-600 italic mt-2"},"This example has been generated automatically."))))},eU=function(e){var t=e.message,n=e.messageName,r=e.index,a=e.showExamples,s=F();if(!t)return null;var i="function"==typeof t.id&&t.id(),o=t.title(),l=t.summary(),c=t.payload(),m=t.headers(),u=t.correlationId(),p=t.contentType(),h=t.externalDocs(),f=null!=p?p:h;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border"},d.createElement("div",null,void 0!==r&&d.createElement("strong",{className:"text-gray-700 mr-2"},"#",r),o&&d.createElement("span",{className:"text-gray-700 mr-2"},o)),l&&d.createElement("p",{className:"text-gray-600 text-sm"},l),f&&d.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},p&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(v,"/").concat(p)},d.createElement("span",null,p))),h&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:h.url()},d.createElement("span",null,y)))),i&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Message ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},i))),u&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Correlation ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},u.location())),u.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,u.description()))),t.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,t.description())),c&&d.createElement("div",{className:"mt-2",id:n?q.getIdentifier("message-".concat(n,"-payload"),s):void 0},d.createElement(eN,{schemaName:"Payload",schema:c})),m&&d.createElement("div",{className:"mt-2",id:n?q.getIdentifier("message-".concat(n,"-headers"),s):void 0},d.createElement(eN,{schemaName:"Headers",schema:m})),t.bindings().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Message specific information",bindings:t.bindings()})),d.createElement(ew,{item:t}),t.tags().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(el,{tags:t.tags()})))),void 0!==a&&a&&d.createElement("div",{className:"panel-item--right px-8"},d.createElement(eF,{message:t})))},e_=function(e){var t=e.servers,n=e.config,r=e.relativePathname;return t&&0!==t.length?d.createElement("div",{className:"mt-2 text-sm"},d.createElement("p",null,"Available only on servers:"),d.createElement("ul",{className:"flex flex-wrap leading-normal"},t.map(function(e){return d.createElement("li",{className:"inline-block mt-2 mr-2",key:e.id()},d.createElement("a",{href:"".concat(r,"#").concat(q.getIdentifier("server-"+e.id(),n)),className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"},d.createElement("span",{className:"underline"},e.id())))}))):null},ez=function(){return(ez=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},eH=globalThis.location,e$=eH?"".concat(eH.pathname).concat(eH.search):"",eW=function(e){var t=e.type,n=void 0===t?l.SEND:t,r=e.operation,a=e.channelName,s=e.channel,i=F();if(!r||!s)return null;var o="function"==typeof s.servers&&s.servers().all(),c="function"==typeof r.security&&r.security(),m=void 0!==s.parameters()?ep.parametersToSchema(s.parameters()):void 0;return d.createElement("div",null,d.createElement("div",{className:"panel-item--center px-8"},d.createElement(eV,ez({},e)),d.createElement(e_,{servers:o||[],config:i,relativePathname:e$}),m&&d.createElement("div",{className:"mt-2",id:q.getIdentifier("operation-".concat(n,"-").concat(a,"-parameters"),i)},d.createElement(eN,{schemaName:"Parameters",schema:m,expanded:!0})),c&&d.createElement("div",{className:"mt-2",id:q.getIdentifier("operation-".concat(n,"-").concat(a,"-security"),i)},d.createElement(eA,{security:c,header:"Additional security requirements"})),s.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Channel specific information",bindings:s.bindings()})),d.createElement(ew,{name:"Channel Extensions",item:s}),r.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Operation specific information",bindings:r.bindings()})),d.createElement(ew,{name:"Operation Extensions",item:r}),r.tags()&&d.createElement("div",{className:"mt-2"},d.createElement(el,{tags:r.tags()}))),d.createElement("div",{className:"w-full mt-4",id:q.getIdentifier("operation-".concat(n,"-").concat(a,"-message"),i)},r.messages().length>1?d.createElement("div",{className:"mt-2"},d.createElement("p",{className:"px-8"},"Accepts ",d.createElement("strong",null,"one of")," the following messages:"),d.createElement("ul",null,r.messages().all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eU,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("p",{className:"px-8"},"Accepts the following message:"),d.createElement("div",{className:"mt-2"},d.createElement(eU,{message:r.messages().all()[0],showExamples:!0})))),d.createElement(eK,ez({},e)))},eV=function(e){var t,n,r=e.type,a=void 0===r?l.SEND:r,s=e.operation,i=e.channelName,o=e.channel,m=F(),u=eC(),p=s.summary(),h=s.externalDocs(),f=s.id(),g=D().version().localeCompare("2.6.0",void 0,{numeric:!0}),v=q.getOperationDesignInformation({type:a,config:m,isAsyncAPIv2:0===g}),x=v.backgroundColor,E=v.typeLabel;return d.createElement(d.Fragment,null,d.createElement("div",{className:"mb-4"},d.createElement("h3",null,d.createElement("span",{className:"font-mono text-white uppercase p-1 rounded mr-2 ".concat(x),title:a},E)," ",d.createElement("span",{className:"font-mono text-base"},i))),o.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,o.description())),p&&d.createElement("p",{className:"text-gray-600 text-sm mt-2"},p),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),h&&d.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},h&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:h.url()},d.createElement("span",null,y)))),f&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Operation ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},f))),(null!=(n=null==(t=null==u?void 0:u.getComponentsForSlot(c.OPERATION))?void 0:t.length)?n:0)>0&&d.createElement(ek,{slot:c.OPERATION,context:{schema:e},pluginManager:u}))},eK=function(e){var t,n=e.type,r=void 0===n?l.SEND:n,a=e.operation,s=(0,d.useState)(!1),i=s[0],o=s[1],c=(0,d.useState)(!1),m=c[0],u=c[1];if(r!==l.REPLY&&r!==l.REQUEST)return d.createElement(d.Fragment,null);var p=a.reply();if(void 0===p)return d.createElement(d.Fragment,null);var h=p.messages(),f=p.channel(),g=null==(t=p.address())?void 0:t.location();return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center"},d.createElement("div",{className:"font-mono px-8 py-4"},d.createElement("div",{className:"border rounded"},d.createElement("div",{className:"w-full ".concat(r===l.REPLY?"bg-green-600 border-green-600":"bg-blue-600 border-blue-600"," text-sm rounded-t h-8 px-4 border text-white flex items-center")},d.createElement("strong",null,"REPLY INFORMATION")),d.createElement("div",{className:"flex"},d.createElement("div",{className:"w-1 h-11 ".concat(r===l.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),d.createElement("div",{className:"p-4"},d.createElement("h3",{className:"text-xs"},d.createElement("span",{className:"mr-2",title:r},"REPLY CHANNEL INFORMATION")),(null==f?void 0:f.address())?d.createElement("div",{className:"text-xs text-gray-700"},"Reply will be provided via this designated address:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},f.address()," ")):null!=g&&d.createElement("div",{className:"text-xs text-gray-700"},"Reply will be directed to the address specified at this location:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},g)),d.createElement("div",{className:"mt-2"},f&&d.createElement(R,{onClick:function(){return u(function(e){return!e})},expanded:m},d.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"View channel details")),f&&d.createElement("div",{className:"w-full mt-4 ".concat(m?"block":"hidden")},d.createElement(eY,ez({},e))," ")))),d.createElement(eB,ez({},e)),!1===h.isEmpty()&&d.createElement("div",{className:"p-4"},d.createElement(R,{onClick:function(){return o(function(e){return!e})},expanded:i},d.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"Expected Reply"," ",h.length>1?"Messages":"Message")),d.createElement("div",{className:"w-full mt-4 ".concat(i?"block":"hidden")},h.length>1?d.createElement("div",{className:"mt-2"},d.createElement("ul",null,h.all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eU,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("div",{className:"mt-2"},d.createElement(eU,{message:h.all()[0],showExamples:!0}))))))),d.createElement(ew,{name:"Operation Reply Extensions",item:p})))},eY=function(e){var t,n=e.type,r=void 0===n?l.SEND:n,a=e.operation.reply(),s=null==a?void 0:a.channel(),i=null!=(t=null==s?void 0:s.address())?t:"",o=F(),c="function"==typeof(null==s?void 0:s.servers)&&s.servers().all(),m=(null==s?void 0:s.parameters())!==void 0?ep.parametersToSchema(s.parameters()):void 0;return s?d.createElement("div",null,s.address()&&d.createElement("div",{className:"mt-2 text-xs text-gray-700"},"Address:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs py-0 px-2"},s.address())),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),d.createElement(e_,{servers:c||[],config:o,relativePathname:e$}),s.messages().all().length>1?d.createElement("div",{className:"mt-2"},d.createElement("span",{className:"text-xs text-gray-700"},"Messages:"),d.createElement("ul",null,s.messages().all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eU,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("span",{className:"text-xs text-gray-700"},"Message:"),d.createElement("div",{className:"mt-2"},d.createElement(eU,{message:s.messages().all()[0],showExamples:!0}))),m&&d.createElement("div",{className:"mt-2",id:q.getIdentifier("operation-".concat(r,"-").concat(i,"-parameters"),o)},d.createElement(eN,{schemaName:"Parameters",schema:m,expanded:!0})),s.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Bindings",bindings:s.bindings()}))):d.createElement(d.Fragment,null)},eB=function(e){var t=e.type,n=void 0===t?l.SEND:t,r=e.operation;if(n!==l.REPLY&&n!==l.REQUEST)return d.createElement(d.Fragment,null);var a=r.reply();if(!(null==a?void 0:a.address))return d.createElement(d.Fragment,null);var s=a.address();if(!s)return d.createElement(d.Fragment,null);var i=s.location();return d.createElement("div",{className:"flex"},d.createElement("div",{className:"w-1 h-11 ".concat(n===l.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),d.createElement("div",{className:"p-4"},d.createElement("h3",{className:"text-xs"},d.createElement("span",{className:"mr-2 uppercase",title:n},"REPLY address information")),i&&d.createElement("div",{className:"text-xs text-gray-700"},"REPLY will be sent to the address provided in:",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},i)),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),d.createElement(ew,{name:"Operation Reply Address Extensions",item:a})))},eG=function(){var e=D().operations().all(),t=F();if(!Object.keys(e).length)return null;var n=e.map(function(e){var n,r=e.channels().all()[0],a=null!=(n=null==r?void 0:r.address())?n:"",s=q.getOperationIdentifier({operation:e,config:t}),i=q.getOperationType(e);return d.createElement("li",{className:"mb-12",key:"".concat(i,"-").concat(e.id()),id:s},d.createElement(eW,{type:i,operation:e,channelName:a,channel:r}))});return d.createElement("section",{id:"".concat(q.getIdentifier("operations",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Operations"),d.createElement("ul",null,n))},eQ=function(){var e=D(),t=F(),n=!e.components().isEmpty()&&e.components().messages().all();return n&&0!==n.length?d.createElement("section",{id:"".concat(q.getIdentifier("messages",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Messages"),d.createElement("ul",null,n.map(function(e,n){var r,a;return d.createElement("li",{className:"mb-4",key:e.id(),id:q.getIdentifier("message-".concat(e.id()),t)},d.createElement(eU,{messageName:e.id(),message:e,index:n+1,key:e.id(),showExamples:null!=(a=null==(r=null==t?void 0:t.show)?void 0:r.messageExamples)&&a}))}))):null},eX=function(e){var t=e.schemaName,n=e.schema;return n?d.createElement("div",null,d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded px-4 py-2 border bg-gray-200"},d.createElement(eN,{schemaName:t,schema:n}))),d.createElement("div",{className:"w-full mt-4"})):null},eJ=function(){var e=D(),t=F(),n=!e.components().isEmpty()&&e.components().schemas().all();return n&&0!==n.length?d.createElement("section",{id:"".concat(q.getIdentifier("schemas",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Schemas"),d.createElement("ul",null,n.map(function(e){return d.createElement("li",{className:"mb-4",key:e.id(),id:q.getIdentifier("schema-".concat(e.id()),t)},d.createElement(eX,{schemaName:e.id(),schema:e}))}))):null},eZ=n(14266),e0=function(e){var t=e.error;if(!t)return null;var n=t.title,r=t.validationErrors;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center p-8"},d.createElement("section",{className:"shadow rounded bg-gray-200 border-red-500 border-l-8"},d.createElement("h2",{className:"p-2"},n?"".concat(w,": ").concat(n):w),(null==r?void 0:r.length)?d.createElement("div",{className:"bg-gray-800 text-white text-xs p-2"},d.createElement("pre",null,r?r.map(function(e,t){var n,r,a,s,i;return(null==e?void 0:e.title)?d.createElement("div",{key:t,className:"flex gap-2"},(null!=(r=null==(n=null==e?void 0:e.location)?void 0:n.startLine)?r:null==(a=null==e?void 0:e.location)?void 0:a.startOffset)&&d.createElement("span",null,"line ".concat((null==(s=null==e?void 0:e.location)?void 0:s.startLine)+(null==(i=null==e?void 0:e.location)?void 0:i.startOffset),":")),d.createElement("code",{className:"whitespace-pre-wrap break-all ml-2"},e.title)):null}).filter(Boolean):null)):null)),d.createElement("div",{className:"panel-item--right"}))};function e1(e){var t=e.error,n={title:"Something went wrong",type:"application-error",validationErrors:[{title:null==t?void 0:t.message}]};return d.createElement(e0,{error:n})}let e2=function(e){var t=e.children,n=(0,d.useState)(0),r=n[0],a=n[1];return(0,d.useEffect)(function(){a(function(e){return e+1})},[t]),d.createElement(eZ.tH,{key:r,fallbackRender:e1},t)},e3=function(e){var t,n,r=e.asyncapi,a=e.config,s=e.pluginManager,i=(0,d.useState)("container:xl"),o=i[0],l=i[1],c=(0,A.A)({onResize:function(e){var t=e.width;requestAnimationFrame(function(){if(void 0!==t){var e=t<=1536?"container:xl":"container:base";e!==o&&l(e)}})}}).ref,m=null!=(t=a.show)?t:{};return d.createElement(M.Provider,{value:a},d.createElement(L.Provider,{value:r},d.createElement(eS.Provider,{value:s},d.createElement("section",{className:"aui-root"},d.createElement(e2,null,d.createElement("div",{className:"".concat(o," relative md:flex bg-white leading-normal"),id:null!=(n=a.schemaID)?n:void 0,ref:c},m.sidebar&&d.createElement(H,null),d.createElement("div",{className:"panel--center relative py-8 flex-1"},d.createElement("div",{className:"relative z-10"},m.info&&d.createElement(eO,null),m.servers&&d.createElement(eR,null),m.operations&&d.createElement(eG,null),m.messages&&d.createElement(eQ,null),m.schemas&&d.createElement(eJ,null)),d.createElement("div",{className:"panel--right absolute top-0 right-0 h-full bg-gray-800"}))))))))};var e6=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},e4=function(){function e(e){this.plugins=new Map,this.pendingInstalls=new Set,this.cancelledInstalls=new Set,this.slotComponents=new Map,this.eventListeners=new Map,this.context=e}return e.prototype.register=function(e){var t,n,r,a;return t=this,n=void 0,r=void 0,a=function(){var t,n;return e6(this,function(r){switch(r.label){case 0:if(this.plugins.has(e.name)||this.pendingInstalls.has(e.name))return console.warn("Plugin ".concat(e.name," is already registered")),[2,!1];this.pendingInstalls.add(e.name),t=this.createPluginAPI(e),r.label=1;case 1:return r.trys.push([1,3,4,5]),[4,e.install(t)];case 2:return r.sent(),[3,5];case 3:return n=r.sent(),console.error("Failed to register plugin ".concat(e.name,":"),n),this.removePluginComponents(e.name),this.emit(S,{pluginName:e.name,message:n instanceof Error?n.message:String(n),timestamp:new Date().toISOString()}),[2,!1];case 4:return this.pendingInstalls.delete(e.name),[7];case 5:if(this.cancelledInstalls.has(e.name))return this.cancelledInstalls.delete(e.name),this.removePluginComponents(e.name),[2,!1];return this.plugins.set(e.name,e),this.emit(k,{pluginName:e.name,message:"Plugin registered successfully",timestamp:new Date().toISOString()}),[2,!0]}})},new(r||(r=Promise))(function(e,s){function i(e){try{l(a.next(e))}catch(e){s(e)}}function o(e){try{l(a.throw(e))}catch(e){s(e)}}function l(t){var n;t.done?e(t.value):((n=t.value)instanceof r?n:new r(function(e){e(n)})).then(i,o)}l((a=a.apply(t,n||[])).next())})},e.prototype.unregister=function(e){this.plugins.get(e)||this.pendingInstalls.has(e)?(this.pendingInstalls.has(e)&&this.cancelledInstalls.add(e),this.plugins.delete(e),this.removePluginComponents(e)):console.warn('Plugin "'.concat(e,'" not found'))},e.prototype.removePluginComponents=function(e){this.slotComponents.forEach(function(t){for(var n=t.length;n--;)t[n].pluginName===e&&t.splice(n,1)})},e.prototype.createPluginAPI=function(e){var t=this;return{registerComponent:function(n,r,a){void 0===a&&(a={}),t.slotComponents.has(n)||t.slotComponents.set(n,[]);var s,i=null!=(s=a.priority)?s:100;t.slotComponents.get(n).push({component:r,priority:i,label:a.label,pluginName:null==e?void 0:e.name}),t.slotComponents.get(n).sort(function(e,t){return t.priority-e.priority})},onSpecLoaded:function(e){t.on(C,e),void 0!==t.context.schema&&e(t.context.schema)},getContext:function(){return t.context},on:function(e,n){t.on(e,n)},off:function(e,n){t.off(e,n)},emit:function(e,n){t.emit(e,n)}}},e.prototype.on=function(e,t){this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t)},e.prototype.off=function(e,t){var n=this.eventListeners.get(e);n&&(n.delete(t),0===n.size&&this.eventListeners.delete(e))},e.prototype.emit=function(e,t){var n=this.eventListeners.get(e);n&&Array.from(n).forEach(function(n){try{n(t)}catch(t){console.error('Plugin event listener failed for "'.concat(e,'":'),t)}})},e.prototype.listeners=function(e){var t=this.eventListeners.get(e);return t?Array.from(t):[]},e.prototype.eventNames=function(){return Array.from(this.eventListeners.keys())},e.prototype.getComponentsForSlot=function(e){var t;return(null!=(t=this.slotComponents.get(e))?t:[]).map(function(e){return e.component})},e.prototype.updateContext=function(e){this.context=e,void 0!==e.schema&&this.emit(C,e.schema)},e.prototype.getPlugin=function(e){return this.plugins.get(e)},e.prototype.listPlugins=function(){return Array.from(this.plugins.values()).map(function(e){return{name:e.name,version:e.version}})},e}(),e5=(i=function(e,t){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),e7=function(){return(e7=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},e8=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},e9=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},te=function(e){function t(t){var n=e.call(this,t)||this;n.registeredPlugins=new Set,n.propsPlugins=new Set,n.pluginEventHandlers=new Map,n.hasMounted=!1,n.state={asyncapi:void 0,error:void 0,pm:new e4({})};var r=g.retrieveParsedSpec(t.schema);return r&&(n.state=e7(e7({},n.state),{asyncapi:r})),n}return e5(t,e),t.prototype.componentDidMount=function(){var e;this.hasMounted=!0,this.state.asyncapi?null==(e=this.state.pm)||e.updateContext({schema:this.state.asyncapi}):this.updateState(this.props.schema),this.props.onPluginManagerReady&&this.props.onPluginManagerReady(this.state.pm),this.setupEventListeners(),this.registerPlugins()},t.prototype.componentDidUpdate=function(e){var t=this.props,n=t.schema,r=t.plugins,a=t.onPluginEvent;e.schema!==n&&this.updateState(n),a!==e.onPluginEvent&&(this.cleanupEventListeners(),this.setupEventListeners()),r!==e.plugins&&this.updatePlugins(e.plugins,r)},t.prototype.componentWillUnmount=function(){this.hasMounted=!1,this.cleanupEventListeners()},t.prototype.render=function(){var e,t=this.props,n=t.config,r=t.error,a=this.state,s=a.asyncapi,i=a.error,o=a.pm,l=null!=r?r:i,c=e7(e7(e7({},I),n),{show:e7(e7({},I.show),!!n&&n.show),expand:e7(e7({},I.expand),!!n&&n.expand),sidebar:e7(e7({},I.sidebar),!!n&&n.sidebar),extensions:e7(e7({},I.extensions),!!n&&n.extensions)});return s?d.createElement(e3,{asyncapi:s,config:c,pluginManager:o}):l?(null==(e=c.show)?void 0:e.errors)&&d.createElement("section",{className:"aui-root"},d.createElement(e0,{error:l})):null},t.prototype.getOrCreateHandler=function(e){var t=this;return this.pluginEventHandlers.has(e)||this.pluginEventHandlers.set(e,function(n){var r,a;null==(a=(r=t.props).onPluginEvent)||a.call(r,e,n)}),this.pluginEventHandlers.get(e)},t.prototype.setupEventListeners=function(){var e=this,t=this.props.onPluginEvent,n=this.state.pm;t&&O.forEach(function(t){null==n||n.on(t,e.getOrCreateHandler(t))})},t.prototype.cleanupEventListeners=function(){var e=this,t=this.state.pm;O.forEach(function(n){null==t||t.off(n,e.getOrCreateHandler(n))})},t.prototype.registerPlugins=function(){return e8(this,void 0,void 0,function(){var e,t,n,r,a;return e9(this,function(s){switch(s.label){case 0:e=this.props.plugins,t=this.state.pm,n=0,r=null!=e?e:[],s.label=1;case 1:if(!(n<r.length))return[3,4];return a=r[n],[4,null==t?void 0:t.register(a)];case 2:s.sent()&&(this.registeredPlugins.add(a.name),this.propsPlugins.add(a.name)),s.label=3;case 3:return n++,[3,1];case 4:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.updatePlugins=function(e,t){var n;return e8(this,void 0,void 0,function(){var r,a,s,i,o,l,c,m,u,d,p,h=this;return e9(this,function(f){switch(f.label){case 0:r=this.state.pm,a=new Map((null!=e?e:[]).map(function(e){return[e.name,e]})),s=new Map((null!=t?t:[]).map(function(e){return[e.name,e]})),a.forEach(function(e,t){if(!s.has(t)&&h.propsPlugins.has(t))try{null==r||r.unregister(t),h.registeredPlugins.delete(t),h.propsPlugins.delete(t)}catch(e){console.error("Failed to unregister plugin ".concat(t,":"),e)}}),i=Array.from(s.entries()).filter(function(e){var t=e[0];return!a.has(t)}),o=function(e,t){var a,s;return e9(this,function(i){switch(i.label){case 0:return[4,null==r?void 0:r.register(t)];case 1:return a=i.sent(),s=(null!=(n=l.props.plugins)?n:[]).some(function(t){return t.name===e}),a&&s&&(l.registeredPlugins.add(e),l.propsPlugins.add(e)),[2]}})},l=this,c=0,m=i,f.label=1;case 1:if(!(c<m.length))return[3,4];return d=(u=m[c])[0],p=u[1],[5,o(d,p)];case 2:f.sent(),f.label=3;case 3:return c++,[3,1];case 4:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.updateState=function(e){var t,n=g.retrieveParsedSpec(e);n?(this.setState({asyncapi:n}),null==(t=this.state.pm)||t.updateContext({schema:n})):this.setState({asyncapi:void 0})},t}(d.Component),tt=n(42762),tn=n(21420),tr=n(90470),ta=n(2639),ts=n(5159),ti=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},to=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},tl=new tt.i;tl.registerSchemaParser((0,tr.z)()),tl.registerSchemaParser((0,ts.dk)()),tl.registerSchemaParser((0,ta.y)());var tc=function(){function e(){}return e.parse=function(e,t){return ti(this,void 0,void 0,function(){var n,r,a,s;return to(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,tl.parse(e,t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0===r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.parseFromUrl=function(e,t){return ti(this,void 0,void 0,function(){var n,r,a,s;return to(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,(0,tn.o)(tl,e.url,e.requestOptions).parse(t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0==r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r,error:void 0}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.convertDiagnosticToErrorObject=function(e,t){var n={title:"There are errors in your Asyncapi document",type:"VALIDATION_ERRORS_TYPE",validationErrors:[]};return e.forEach(function(e){var r;if(t.includes(e.severity)){var a={title:e.message,location:{jsonPointer:"/"+e.path.join("/"),startLine:e.range.start.line,startColumn:e.range.start.character,startOffset:1,endLine:e.range.end.line,endColumn:e.range.end.character,endOffset:0}};null==(r=n.validationErrors)||r.push(a)}}),n},e.handleError=function(e){return e.type,{error:e}},e}(),tm=(o=function(e,t){return(o=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}o(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),tu=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},td=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},tp=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={asyncapi:void 0,error:void 0},t}return tm(t,e),t.prototype.componentDidMount=function(){return tu(this,void 0,void 0,function(){var e,t,n;return td(this,function(r){switch(r.label){case 0:if(!this.props.schema)return[3,2];return t=(e=this.props).schema,n=e.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.componentDidUpdate=function(e){return tu(this,void 0,void 0,function(){var t,n;return td(this,function(r){switch(r.label){case 0:if(e.schema===(t=this.props.schema))return[3,2];return n=this.props.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.render=function(){var e=this.props,t=e.schema,n=e.config,r=e.plugins,a=e.onPluginEvent,s=e.onPluginManagerReady,i=this.state,o=i.asyncapi,l=i.error;return d.createElement(te,{schema:null!=o?o:t,config:n,error:l,plugins:r,onPluginEvent:a,onPluginManagerReady:s})},t.prototype.parseSchema=function(e,t){return tu(this,void 0,void 0,function(){var n,r,a;return td(this,function(s){switch(s.label){case 0:if(n=g.retrieveParsedSpec(e))return this.setState({asyncapi:n}),[2];if(void 0===e.url)return[3,2];return[4,tc.parseFromUrl(e,t)];case 1:return r=s.sent(),this.setState({asyncapi:r.asyncapi,error:r.error}),[2];case 2:return[4,tc.parse(e,t)];case 3:return a=s.sent(),this.setState({asyncapi:a.asyncapi,error:a.error}),[2]}})})},t}(d.Component),th=n(27925);let tf=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-0"})([""]),tg=th.Ay.nav.withConfig({componentId:"sc-2c3b2ddd-1"})(["display:flex;flex-direction:row;flex-wrap:nowrap;width:100%;line-height:48px;padding:0;background-color:#263238;border-bottom:#607d8b 2px solid;"]),tv=th.Ay.header.withConfig({componentId:"sc-2c3b2ddd-2"})(["margin-left:16px;display:inline-block;"]),ty=th.Ay.h1.withConfig({componentId:"sc-2c3b2ddd-3"})(["color:#fff;margin:0;font-weight:bold;font-size:20px;line-height:48px;"]),tx=th.Ay.img.withConfig({componentId:"sc-2c3b2ddd-4"})(["height:34px;max-height:34px;margin-top:7px;float:left;"]),tE=th.Ay.span.withConfig({componentId:"sc-2c3b2ddd-5"})(["font-weight:bold;margin-left:12px;"]),tb=th.Ay.span.withConfig({componentId:"sc-2c3b2ddd-6"})(["font-style:italic;margin-left:6px;"]);th.Ay.a.withConfig({componentId:"sc-2c3b2ddd-7"})([""]);let tN=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-8"})(["background:rgb(38,50,56);"]),tw=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-9"})(["height:calc(100vh - 50px);min-height:calc(100vh - 50px);overflow:auto;> .asyncapi{padding:24px;}> .asyncapi__error{margin:24px;}"]),tk=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-10"})(["box-sizing:border-box;width:100%;height:100%;margin:0;font-family:sans-serif;font-weight:normal;"]),tS=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-11"})(["> .react-codemirror2 > .CodeMirror{height:100%;min-height:100%;}"]),tC=th.Ay.ul.withConfig({componentId:"sc-2c3b2ddd-12"})(["list-style:none;padding:0;margin:0 5px 15px;display:flex;justify-items:flex-start;flex-flow:row nowrap;"]),tO=th.Ay.li.withConfig({componentId:"sc-2c3b2ddd-13"})(["margin:0 0 0 auto;position:relative;display:inline-block;padding:19px 15px;"]),tI=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-14"})(["font-family:sans-serif;font-weight:700;color:#f77669;transition:0.2s all linear;opacity:",";animation-name:spin;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}"],e=>e.$show?"1":"0"),tA=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-15"})(["margin:0;padding:0 20px;font-size:14px;color:#515559;line-height:1.57;overflow:auto;height:calc(100vh - 117px);min-height:calc(100vh - 117px);"]),tP=th.Ay.li.withConfig({componentId:"sc-2c3b2ddd-16"})([""]),tj=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-17"})(["display:flex;align-items:center;margin:0 15px;padding:19px 0 15px;border:none;position:relative;color:",";font-size:14px;outline:none;transition:0.2s color linear;text-transform:uppercase;cursor:pointer;&:first-letter{text-transform:uppercase;}&:after{content:'';bottom:0;display:block;position:absolute;height:",";width:100%;border-radius:2px;background-color:#c3e88d;}&:hover{color:#c3e88d;&:after{content:'';bottom:0;display:block;position:absolute;height:3px;width:100%;border-radius:2px;background-color:#c3e88d;}}"],e=>e.$active?"#c3e88d":"#f77669",e=>e.$active?"3px":"0px"),tT=th.Ay.div.withConfig({componentId:"sc-2c3b2ddd-18"})(["display:flex;box-sizing:border-box;position:relative;margin-bottom:20px;"]),tR=th.Ay.input.withConfig({componentId:"sc-2c3b2ddd-19"})(["width:100%;padding:6px 12px;box-sizing:border-box;outline:none;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;transition:0.2s border,color linear;font-size:14px;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tL=th.Ay.button.withConfig({componentId:"sc-2c3b2ddd-20"})(["width:auto;padding:6px 12px;display:inline-block;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;font-size:14px;margin-left:12px;white-space:nowrap;transition:0.2s border,color linear;cursor:pointer;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tD=()=>(0,u.jsx)(tg,{children:(0,u.jsx)(tv,{children:(0,u.jsxs)(ty,{children:[(0,u.jsx)(tx,{src:"https://avatars0.githubusercontent.com/u/16401334?v=4&s=200",alt:"AsyncAPI logo"}),(0,u.jsx)(tE,{children:"AsyncAPI React"}),(0,u.jsx)(tb,{children:"editor"})]})})});var tM=n(28824),tF=n(58772),tq=n(19540);class tU extends d.Component{componentDidUpdate(e){let{externalResource:t}=this.props;t&&e.externalResource!==t&&this.setState({code:t})}render(){let{state:{code:e}}=this;return(0,u.jsx)(tS,{children:(0,u.jsx)(tM.Ay,{value:e,basicSetup:{lineNumbers:!0,tabSize:2},theme:tq.El,extensions:[(0,tF.o)()],onChange:e=>{this.props.parentCallback(e)}})})}constructor(...e){super(...e),this.state={code:this.props.code}}}let t_=async e=>fetch(e,{method:"GET"}).then(tz);function tz(e){return e.text().then(e=>e)}function tH(e,t,n,r){let a;return(...s)=>{a&&clearTimeout(a),n(),a=setTimeout(()=>{a=void 0,e(...s),r()},t||1e3)}}class t$ extends d.Component{render(){let{link:e}=this.state;return(0,u.jsxs)(tT,{children:[(0,u.jsx)(tR,{value:e,placeholder:"Link for external schema",onChange:e=>this.setState({link:e.target.value})}),(0,u.jsx)(tL,{type:"button",onClick:this.fetchSchemaFromExternalResources,children:"Fetch schema"})]})}constructor(...e){super(...e),this.state={link:""},this.fetchSchemaFromExternalResources=async()=>{try{new URL(this.state.link)}catch(e){return}let{props:{parentCallback:e},state:{link:t}}=this;e(await t_(t))}}}var tW=n(98208);let tV=e=>(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(tW.A,{style:{width:"100%",height:"calc(100vh - 50px)",minHeight:"calc(100vh - 50px)",display:"flex",background:"#f3f4f5"},gutter:()=>{let e=document.createElement("div");return e.onmouseover=()=>e.style.cursor="ew-resize",e},gutterStyle:()=>({backgroundColor:"gray",width:"7px"}),minSize:250,children:e.children})});class tK extends d.Component{constructor(e){super(e),this.handleTabClick=e=>{this.setState({activeTabIndex:e})},this.renderHeader=e=>d.Children.map(e,(e,t)=>d.cloneElement(e,{title:e.props.title,parentCallback:this.handleTabClick,tabIndex:t,isActive:t===this.state.activeTabIndex})),this.renderActiveTab=e=>e[this.state.activeTabIndex]?e[this.state.activeTabIndex].props.children:null,this.state={activeTabIndex:this.props.defaultActiveTabIndex?this.props.defaultActiveTabIndex:0}}render(){let{additionalHeaderContent:e}=this.props,t=[].concat(...this.props.children).filter(e=>null!=e);return(0,u.jsxs)(tk,{children:[(0,u.jsxs)(tC,{children:[this.renderHeader(t),(0,u.jsx)(tO,{children:e})]}),(0,u.jsx)(tA,{children:this.renderActiveTab(t)})]})}}class tY extends d.Component{render(){let{title:e,tabIndex:t,isActive:n,parentCallback:r}=this.props;return(0,u.jsx)(tP,{children:(0,u.jsx)(tj,{onClick:e=>{e.preventDefault(),r&&void 0!=t&&r(t)},$active:n,children:e})},t)}}let tB=`{
  "show": {
    "sidebar": false,
    "info": true,
    "operations": true,
    "servers": true,
    "messages": true,
    "schemas": true,
    "errors": true
  },
  "expand":{
    "messageExamples": false
  },
  "sidebar": {
    "showServers": "byDefault",
    "showOperations": "byDefault"
  }
}`,tG=`asyncapi: '2.6.0'
id: 'urn:com:smartylighting:streetlights:server'
info:
  x-x: AsyncAPISpec
  title: Streetlights API
  version: '1.0.0'
  description: |
    The Smartylighting Streetlights API allows you to remotely manage the city lights.

    ### Check out its awesome features:

    * Turn a specific streetlight on/off 🌃
    * Dim a specific streetlight 😎
    * Receive real-time information about environmental lighting conditions 📈

  termsOfService: http://asyncapi.org/terms/
  contact:
    name: API Support
    url: http://www.asyncapi.org/support
    email: support@asyncapi.org
  license:
    name: Apache 2.0
    url: http://www.apache.org/licenses/LICENSE-2.0.html
tags:
  - name: root-tag1
    externalDocs:
      description: External docs description 1
      url: https://www.asyncapi.com/
  - name: root-tag2
    description: Description 2
    externalDocs:
      url: "https://www.asyncapi.com/"
  - name: root-tag3
  - name: root-tag4
    description: Description 4
  - name: root-tag5
    externalDocs:
      url: "https://www.asyncapi.com/"
externalDocs:
  description: Find more info here
  url: https://example.com
defaultContentType: application/json

servers:
  production:
    url: api.streetlights.smartylighting.com:{port}
    protocol: mqtt
    description: |
      Private server that requires authorization.
      Once the socket is open you can subscribe to private-data channels by sending an authenticated subscribe request message.

      The API client must request an authentication "token" via the following REST API endpoint "GetWebSocketsToken" to connect to WebSockets Private endpoints. For more details read https://support.kraken.com/hc/en-us/articles/360034437672-How-to-retrieve-a-WebSocket-authentication-token-Example-code-in-Python-3

      The resulting token must be provided in the "token" field of any new private WebSocket feed subscription: 
      \`\`\`json
      {
        "event": "subscribe",
        "subscription":
        {
          "name": "ownTrades",
          "token": "WW91ciBhdXRoZW50aWNhdGlvbiB0b2tlbiBnb2VzIGhlcmUu"
        }
      }
      \`\`\`

      \`\`\`elixir
      defmodule Hello do
        def world do
          IO.puts("hello")
        end
      end
      \`\`\`
    variables:
      port:
        description: Secure connection (TLS) is available through port 8883.
        default: '1883'
        enum:
          - '1883'
          - '8883'
    tags:
      - name: 'env:production'
    security:
      - apiKey: []
      - supportedOauthFlows:
        - streetlights:on
        - streetlights:off
        - streetlights:dim
      - openIdConnectWellKnown: []
  dummy-mqtt:
    url: mqtt://localhost
    protocol: mqtt
    description: |
      Private server

      \`\`\`csharp
      using System;

      namespace HelloWorld
      {
        class Program
        {
          static void Main(string[] args)
          {
            Console.WriteLine("Hello World!");    
          }
        }
      }
      \`\`\`
    bindings:
      mqtt:
        clientId: guest        
        cleanSession: false
        keepAlive: 60
        bindingVersion: 0.1.0
        lastWill:
          topic: smartylighting/streetlights/1/0/lastwill
          qos: 1
          message: so long and thanks for all the fish
          retain: false
  dummy-amqp:
    url: amqp://localhost:{port}
    protocol: amqp
    description: dummy AMQP broker
    protocolVersion: "0.9.1"
    variables:
      port:
        enum:
          - '15672'
          - '5672'
  dommy-kafka:
    url: http://localhost:{port}
    protocol: kafka
    description: dummy Kafka broker
    variables:
      port:
        default: '9092'

channels:
  smartylighting/streetlights/1/0/event/{streetlightId}/lighting/measured:
    x-security:
      $ref: '#/components/securitySchemes/supportedOauthFlows/flows/clientCredentials'
    description: The topic on which measured values may be produced and consumed.
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dommy-kafka
    subscribe:
      summary: Receive information about environmental lighting conditions of a particular streetlight.
      operationId: receiveLightMeasurement
      externalDocs:
        description: Find more info here
        url: https://example.com
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/lightMeasured'
      bindings:
        mqtt:
          qos: 1
          bindingVersion: 0.1.0
        http:
          type: request
          method: GET
          query:
            type: object
            required:
            - companyId
            properties:
              companyId:
                type: number
                minimum: 1
                description: The Id of the company.
            additionalProperties: false

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/on:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dummy-amqp
    publish:
      operationId: turnOn
      security:
        - supportedOauthFlows:
          - streetlights:on
      externalDocs:
        description: Find more info here
        url: https://example.com
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/turn/off:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    publish:
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/turnOnOff'

  smartylighting/streetlights/1/0/action/{streetlightId}/dim:
    parameters:
      streetlightId:
        $ref: '#/components/parameters/streetlightId'
    servers:
      - production
      - dummy-amqp
    publish:
      operationId: dimLight
      traits:
        - $ref: '#/components/operationTraits/kafka'
      message:
        $ref: '#/components/messages/dimLight'

components:
  messages:
    lightMeasured:
      messageId: lightMeasured Message ID
      name: lightMeasured
      title: Light measured
      summary: Inform about environmental lighting conditions for a particular streetlight.
      contentType: application/json
      correlationId:
        $ref: "#/components/correlationIds/sentAtCorrelator"
      externalDocs:
        url: "https://www.asyncapi.com/"
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/lightMeasuredPayload"
      bindings:
        mqtt:
          bindingVersion: 0.1.0
      examples:
        - headers:
            my-app-header: 12
          payload:
            lumens: 1
            sentAt: "2020-01-31T13:24:53Z"
        - headers:
            my-app-header: 13
        - payload:
            lumens: 3
            sentAt: "2020-10-31T13:24:53Z"
      x-schema-extensions-as-object:
        type: object
        properties:
          prop1:
            type: string
          prop2:
            type: integer
            minimum: 0
      x-schema-extensions-as-primitive: dummy
      x-schema-extensions-as-array: 
        - "item1"
        - "item2"
    LwM2mOjbects:
      payload:
        type: object
        properties:
          objectLinks:
            type: string
        example:
          objectLinks: "lwm2m=1.1, </0/0>, </1/1>;ssid=1, </2>, </3/0>"
    turnOnOff:
      name: turnOnOff
      title: Turn on/off
      summary: Command a particular streetlight to turn the lights on or off.
      payload:
        $ref: "#/components/schemas/turnOnOffPayload"
      headers: 
        type: object
        properties:
          $ref: '#/components/schemas/streamHeaders'
    dimLight:
      name: dimLight
      title: Dim light
      summary: Command a particular streetlight to dim the lights.
      correlationId:
        $ref: "#/components/correlationIds/sentAtCorrelator"
      externalDocs:
        url: "https://www.asyncapi.com/"
      tags:
        - name: operation-tag1
          externalDocs:
            description: External docs description 1
            url: https://www.asyncapi.com/
        - name: operation-tag2
          description: Description 2
          externalDocs:
            url: "https://www.asyncapi.com/"
        - name: operation-tag3
        - name: operation-tag4
          description: Description 4
        - name: operation-tag5
          externalDocs:
            url: "https://www.asyncapi.com/"
      traits:
        - $ref: '#/components/messageTraits/commonHeaders'
      payload:
        $ref: "#/components/schemas/dimLightPayload"

  schemas:
    lightMeasuredPayload:
      type: object
      properties:
        lumens:
          type: integer
          description: Light intensity measured in lumens.
          writeOnly: true
          oneOf: 
            - minimum: 0
              maximum: 5
            - minimum: 10
              maximum: 20
          externalDocs:
            url: "https://www.asyncapi.com/"
        sentAt:
          $ref: "#/components/schemas/sentAt"
        ifElseThen:
          type: integer
          minimum: 1
          maximum: 1000
          if:
            minimum: 100
          then: 
            multipleOf: 100
          else:
            if: 
              minimum: 10
            then: 
              multipleOf: 10
        dependencies:
          $ref: "#/components/schemas/dependenciesObject"
        anySchema: true
        cannotBeDefined: false
        restrictedAny: 
          minimum: 1
          maximum: 1000
      required:
        - lumens
      x-schema-extensions-as-object:
        type: object
        properties:
          prop1:
            type: string
          prop2:
            type: integer
            minimum: 0
      x-schema-extensions-as-primitive: dummy
      x-schema-extensions-as-array: 
        - "item1"
        - "item2"
    turnOnOffPayload:
      type: object
      properties:
        command:
          type: string
          enum:
            - on
            - off
          description: Whether to turn on or off the light.
        sentAt:
          $ref: "#/components/schemas/sentAt"
        arrayRank:
          $ref: '#/components/schemas/arrayRank'
      additionalProperties:
        type: string

    dimLightPayload:
      type: object
      properties:
        percentage:
          type: integer
          description: Percentage to which the light should be dimmed to.
          minimum: 0
          maximum: 100
          readOnly: true
        sentAt:
          $ref: "#/components/schemas/sentAt"
        key:
          type: integer
          not:
            minimum: 3
      patternProperties:
        ^S_:
          type: string
        ^I_:
          type: integer
      additionalProperties: false
    sentAt:
      type: string
      format: date-time
      description: Date and time when the message was sent.
    union:
      type: [string, number]
    objectWithKey:
      title: objectWithKey
      type: object
      propertyNames:
        format: email
      properties:
        key:
          type: string
    objectWithKey2:
      type: object
      properties:
        key2:
          type: string
          format: time
    oneOfSchema:
      oneOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    anyOfSchema:
      anyOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    allOfSchema:
      allOf:
        - $ref: "#/components/schemas/objectWithKey"
        - $ref: "#/components/schemas/objectWithKey2"
    arrayContains: 
      type: array
      contains:
        type: integer
    dependenciesObject:
      type: object
      properties:
        name:
          type: string
        credit_card:
          type: integer
        billing_address:
          type: string
        schema_dependency:
          type: string
      required:
        - name
      dependencies:
        credit_card:
          properties:
            billing_address:
              type: string
            billing_address2:
              type: string
          required:
          - billing_address
          dependencies:
            billing_address2:
              properties:
                billing_address3:
                  type: string
              required:
              - billing_address3    

    subscriptionStatus:
      type: object
      oneOf:
        - properties:
            channelID:
              type: integer
              description: ChannelID on successful subscription, applicable to public messages only.
            channelName:
              type: string
              description: Channel Name on successful subscription. For payloads 'ohlc' and 'book', respective interval or depth will be added as suffix.
        - properties:
            errorMessage:
              type: string
      properties:
        event:
          type: string
          const: subscriptionStatus
        subscription:
          type: object
          properties:
            depth:
              type: string
            interval:
              type: string
          required:
            - name
      required:
        - event

    arrayRank:
      type: object
      properties:
        valueRank: 
          $ref: '#/components/schemas/arrayValueRank'
        arrayDimensions: 
          $ref: '#/components/schemas/arrayArrayDimensions'

    arrayValueRank:
      description: >
        This Attribute indicates whether the val Attribute of the datapoint is an
        array and how many dimensions the array has.
      type: integer
      default: -1
      examples:
        - 2
      oneOf:
        - const: -1
          description: 'Scalar: The value is not an array.'
        - const: 0
          description: 'OneOrMoreDimensions: The value is an array with one or more dimensions.'
        - const: 1
          description: 'OneDimension: The value is an array with one dimension.'
        - const: 2
          description: 'The value is an array with two dimensions.'

    arrayArrayDimensions:
      type: array
      items:
        type: integer
        minimum: 0
      examples:
        - [3, 5]

    streamHeaders:
      Etag:
        type: string
        description: |
          The RFC7232 ETag header field in a response provides the current entity-
          tag for the selected resource. An entity-tag is an opaque identifier for
          different versions of a resource over time, regardless whether multiple
          versions are valid at the same time. An entity-tag consists of an opaque
          quoted string, possibly prefixed by a weakness indicator.
        example: 411a
      Cache-Control:
        description: The Cache-Control HTTP header holds directives (instructions) for caching in request.
        type: string
        example: no-cache, no-store, must-revalidate

  securitySchemes:
    apiKey:
      type: apiKey
      in: user
      description: Provide your API key as the user and leave the password empty.
    supportedOauthFlows:
      type: oauth2
      description: Flows to support OAuth 2.0
      flows:
        implicit:
          authorizationUrl: 'https://authserver.example/auth'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        password:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        clientCredentials:
          tokenUrl: 'https://authserver.example/token'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
        authorizationCode:
          authorizationUrl: 'https://authserver.example/auth'
          tokenUrl: 'https://authserver.example/token'
          refreshUrl: 'https://authserver.example/refresh'
          scopes:
            'streetlights:on': Ability to switch lights on
            'streetlights:off': Ability to switch lights off
            'streetlights:dim': Ability to dim the lights
    openIdConnectWellKnown:
      type: openIdConnect
      openIdConnectUrl: 'https://authserver.example/.well-known'

  parameters:
    streetlightId:
      description: The ID of the streetlight.
      schema:
        type: string
      location: "$message.payload#/user/id"

  correlationIds:
    sentAtCorrelator:
      description: Data from message payload used as correlation ID
      location: $message.payload#/sentAt

  messageTraits:
    commonHeaders:
      headers:
        type: object
        properties:
          my-app-header:
            type: integer
            minimum: 0
            maximum: 100
        required:
          - my-app-header
  
  operationTraits:
    kafka:
      bindings:
        kafka:
          clientId: my-app-id
`;class tQ extends d.Component{constructor(e){super(e),this.state={schema:tG,config:tB,schemaFromExternalResource:"",refreshing:!1},this.updateSchema=e=>{this.setState({schema:e})},this.updateSchemaFromExternalResource=e=>{this.setState({schemaFromExternalResource:e})},this.updateConfig=e=>{this.setState({config:e})},this.startRefreshing=()=>{setTimeout(()=>{this.setState({refreshing:!0})},500)},this.stopRefreshing=()=>{this.setState({refreshing:!1})},this.updateSchemaFn=tH(this.updateSchema,750,this.startRefreshing,this.stopRefreshing),this.updateConfigFn=tH(this.updateConfig,750,this.startRefreshing,this.stopRefreshing)}render(){let{schema:e,config:t,schemaFromExternalResource:n}=this.state,r=(e=>{if(!e)return{};try{return JSON.parse(e)}catch(e){return{}}})(t||tB);return(0,u.jsxs)(tf,{children:[(0,u.jsx)(tD,{}),(0,u.jsxs)(tV,{children:[(0,u.jsx)(tN,{children:(0,u.jsxs)(tK,{additionalHeaderContent:(0,u.jsx)(tI,{$show:this.state.refreshing,children:""}),children:[(0,u.jsx)(tY,{title:"Schema",children:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t$,{parentCallback:this.updateSchemaFromExternalResource}),(0,u.jsx)(tU,{code:e,externalResource:n,parentCallback:this.updateSchemaFn},"Schema")]})},"Schema"),(0,u.jsx)(tY,{title:"Configuration",children:(0,u.jsx)(tU,{code:t,parentCallback:this.updateConfigFn},"Configuration")},"Configuration")]})}),(0,u.jsx)(tw,{children:(0,u.jsx)(tp,{schema:e,config:r})})]})]})}}let tX=tQ},48608:()=>{},87899:()=>{},96172:()=>{},99154:()=>{}},e=>{e.O(0,[61,929,163,248,450,391,965,93,347,158,358],()=>e(e.s=37376)),_N_E=e.O()}]);