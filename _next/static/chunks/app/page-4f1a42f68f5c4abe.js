(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{9257:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>tZ});var r,a,s,i,o=n(73365);n(48608);var l=n(1521),c=n(66977),m=n(25357),u=n(98082),d=function(){function e(){}return e.retrieveParsedSpec=function(e){if(e){if((0,c.Mr)(e))return e;if((0,c.n6)(e)){var t=e.json();return(0,c.BS)(t)}if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return}return(0,u.isStringifiedDocument)(e)?(0,m.rS)(e):(0,c.BS)(e)}},e.containTags=function(e,t){var n="function"==typeof e.tags?e.tags():void 0;if(void 0===n||!Array.isArray(n))return!1;var r=Array.isArray(t)?t:[t];return n.some(function(e){return r.some(function(t){return t.name()===e.name()})})},e.operationsTags=function(e){var t=new Map;return Object.entries(e.operations().all()).forEach(function(e){var n=e[1];(null==n?void 0:n.tags().length)>0&&n.tags().all().forEach(function(e){return t.set(e.name(),e)})}),Array.from(t.values())},e.serversTags=function(e){var t={};return Object.entries(e.servers()).forEach(function(e){var n=e[0],r=e[1];r.tags().length>0&&r.tags().all().forEach(function(e){t[e.name()]?t[e.name()].push(n):t[e.name()]=[n]})}),t},e}(),p="https://www.iana.org/assignments/media-types",h="External Docs",f="SEND",g="RECEIVE",v="REQUEST",y="REPLY",b="Error",x="plugin:ready",E="plugin:error",N="specLoaded",w=[x,E],k={schemaID:"",show:{sidebar:!1,info:!0,servers:!0,operations:!0,messages:!0,messageExamples:!1,schemas:!0,errors:!0},expand:{messageExamples:!1},sidebar:{showServers:"byDefault",showOperations:"byDefault"},publishLabel:"PUB",subscribeLabel:"SUB",sendLabel:f,receiveLabel:g,requestLabel:v,replyLabel:y,extensions:{"x-x":function(e){var t=e.propertyValue;return l.createElement("a",{title:"https://x.com/".concat(t),style:{display:"inline-block"},href:"https://x.com/".concat(t),rel:"noopener noreferrer",target:"_blank"},l.createElement("svg",{style:{cursor:"pointer"},width:"15px",height:"15px",viewBox:"0 0 1200 1227",fill:"none",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{d:"M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z",fill:"black"})))}}},S=n(8789),C=function(){return(C=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},I=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)0>t.indexOf(r[a])&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n},O=function(e){return void 0===e&&(e={}),l.createElement("svg",C({stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 20 20",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},e),l.createElement("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"}))},P=function(e){var t,n,r=e.chevronProps,a=e.expanded,s=e.children,i=I(e,["chevronProps","expanded","children"]);return l.createElement("button",C({},i,{className:"focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ".concat(null!=(t=i.className)?t:""),type:"button"}),l.createElement("div",{className:"inline-block"},s),l.createElement(O,C({},r,{className:"inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ".concat(void 0!==a&&a?"-rotate-90":""," ").concat(null!=(n=null==r?void 0:r.className)?n:"")})))},A=l.createContext(null);function j(){return(0,l.useContext)(A)}var T=(0,l.createContext)({});function L(){return(0,l.useContext)(T)}var R=n(86031),D=function(){function e(){}return e.getIdentifier=function(e,t){var n=null==t?void 0:t.schemaID;return n?"".concat(n,"-").concat(e):e},e.getOperationType=function(e){if(e.isSend())if(void 0!==e.reply())return R.d2.REQUEST;else return R.d2.SEND;return e.isReceive()&&void 0!==e.reply()?R.d2.REPLY:R.d2.RECEIVE},e.getOperationIdentifier=function(t){var n=t.operation,r=t.config;if(n.isSend())if(void 0!==n.reply())return e.getIdentifier("operation-".concat(R.d2.REQUEST,"-").concat(n.id()),r);else return e.getIdentifier("operation-".concat(R.d2.SEND,"-").concat(n.id()),r);return n.isReceive()&&void 0!==n.reply()?e.getIdentifier("operation-".concat(R.d2.REPLY,"-").concat(n.id()),r):e.getIdentifier("operation-".concat(R.d2.RECEIVE,"-").concat(n.id()),r)},e.getOperationDesignInformation=function(e){var t,n,r,a,s,i,o=e.type,l=e.config,c=e.isAsyncAPIv2;return o===R.d2.RECEIVE?{borderColor:"border-green-600 text-green-600",backgroundColor:"bg-green-600",typeLabel:c?null!=(n=l.publishLabel)?n:"PUB":null!=(t=l.receiveLabel)?t:g}:o===R.d2.REPLY?{borderColor:"border-orange-600 text-orange-600",backgroundColor:"bg-orange-600",typeLabel:null!=(r=l.replyLabel)?r:y}:o===R.d2.REQUEST?{borderColor:"border-red-600 text-red-600",backgroundColor:"bg-red-600",typeLabel:null!=(a=l.requestLabel)?a:v}:{borderColor:"border-blue-600 text-blue-500",backgroundColor:"bg-blue-600",typeLabel:c?null!=(i=l.subscribeLabel)?i:"SUB":null!=(s=l.sendLabel)?s:f}},e}();function M(e,t){var n=new Set,r=new Map;e.forEach(function(e){var a=[];t.forEach(function(t){var r;(null!=(r=t.tags.all())?r:[]).map(function(e){return e.name()}).includes(e)&&(a.push(t),n.add(t))}),a.length>0&&r.set(e,a)});var a=[];return t.forEach(function(e){n.has(e)||a.push(e)}),{tagged:r,untagged:a}}var q=function(){return(q=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},U=l.createContext({setShowSidebar:function(e){return e}}),F=function(){var e,t,n,r=(0,l.useState)(!1),a=r[0],s=r[1],i=j(),o=L(),c=i.info(),m=null==(e=c.extensions().get("x-logo"))?void 0:e.value(),u=i.components(),d=null==u?void 0:u.messages().all(),p=null==u?void 0:u.schemas().all(),h=i.operations().length>0,f=null==(t=o.show)?void 0:t.messages,g=null==(n=o.show)?void 0:n.schemas,v=(null==d?void 0:d.length)>0&&l.createElement("li",{className:"mb-3 mt-9"},l.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#messages",onClick:function(){return s(!1)}},"Messages"),l.createElement("ul",{className:"text-sm mt-2"},d.map(function(e,t){var n,r;return l.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.name())?n:t)},l.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#message-".concat(null!=(r=e.name())?r:e.id()),onClick:function(){return s(!1)}},l.createElement("div",{className:"break-all inline-block"},e.id())))}))),y=(null==p?void 0:p.length)>0&&l.createElement("li",{className:"mb-3 mt-9"},l.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#schemas",onClick:function(){return s(!1)}},"Schemas"),l.createElement("ul",{className:"text-sm mt-2"},p.map(function(e,t){var n;return l.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.id())?n:t)},l.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#schema-".concat(e.id()),onClick:function(){return s(!1)}},l.createElement("div",{className:"break-all inline-block"},e.id())))}))),b=h&&l.createElement("li",{className:"mb-3 mt-9"},l.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#operations",onClick:function(){return s(!1)}},"Operations"),l.createElement(z,null));return l.createElement(U.Provider,{value:{setShowSidebar:s}},l.createElement("div",{className:"burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500",onClick:function(){return s(function(e){return!e})},"data-lol":a},l.createElement("svg",{viewBox:"0 0 100 70",width:"40",height:"30",className:"fill-current text-gray-200"},l.createElement("rect",{width:"100",height:"10"}),l.createElement("rect",{y:"30",width:"100",height:"10"}),l.createElement("rect",{y:"60",width:"100",height:"10"}))),l.createElement("div",{className:"".concat(a?"block fixed w-full":"hidden"," sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20")},l.createElement("div",{className:"".concat(a?"sidebar--wrapper":""," block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200")},l.createElement("div",{className:"sidebar--content"},l.createElement("div",null,m?l.createElement("img",{src:m,alt:"".concat(c.title()," logo, ").concat(c.version()," version")}):l.createElement("h1",{className:"text-2xl font-light"},c.title()," ",c.version())),l.createElement("ul",{className:"text-sm mt-10 relative"},l.createElement("li",{className:"mb-3"},l.createElement("a",{className:"text-gray-700 no-underline hover:text-gray-900",href:"#introduction",onClick:function(){return s(!1)}},"Introduction")),i.servers().length>0&&l.createElement("li",{className:"mb-3 mt-9"},l.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#servers",onClick:function(){return s(!1)}},"Servers"),l.createElement(_,null)),b,f&&v,g&&y)))))},_=function(){var e,t,n,r=L().sidebar,a=j(),s=a.servers().all(),i=null!=(e=null==r?void 0:r.showServers)?e:"byDefault";if("byDefault"===i)return l.createElement("ul",{className:"text-sm mt-2"},s.map(function(e){return l.createElement(W,{serverName:e.id(),key:e.id()})}));if("bySpecTags"===i)n=(null!=(t=a.info().tags().all())?t:[]).map(function(e){return e.name()});else{var o=new Set;s.forEach(function(e){e.tags().forEach(function(e){return o.add(e.name())})}),n=Array.from(o)}var c=M(n,s.map(function(e){return{name:e.id(),tags:e.tags(),data:{}}})),m=c.tagged,u=c.untagged;return l.createElement("ul",{className:"text-sm mt-2"},Array.from(m.entries()).map(function(e){var t=e[0],n=e[1];return l.createElement("li",{key:t},l.createElement(H,{tagName:t},n.map(function(e){var t=e.name;return l.createElement(W,{serverName:t,key:t})})))}),u.length>0?l.createElement("li",null,l.createElement(H,{tagName:"Untagged"},u.map(function(e){var t=e.name;return l.createElement(W,{serverName:t,key:t})}))):null)},z=function(){var e,t,n,r=L(),a=r.sidebar,s=j(),i=s.operations().all(),o=null!=(e=null==a?void 0:a.showOperations)?e:"byDefault",c=i.map(function(e){var t,n,i,o=e.channels(),l=D.getOperationIdentifier({operation:e,config:r}),c=D.getOperationType(e),m=s.version().localeCompare("2.6.0",void 0,{numeric:!0}),u="";if(0===m||(null==a?void 0:a.useChannelAddressAsIdentifier)){var d=null!=(n=null==(t=o.all()[0])?void 0:t.address())?n:"",p=e.summary();u=null!=p?p:d}else u=null!=(i=e.id())?i:"";return{name:"".concat(c,"-").concat(e.id()),tags:e.tags(),data:{label:u,type:c,operationHrefId:l}}});if("byDefault"===o)return l.createElement("ul",{className:"text-sm mt-2"},c.map(function(e){var t=e.name,n=e.data;return l.createElement($,q({key:t},n))}));if("bySpecTags"===o)n=(null!=(t=s.info().tags().all())?t:[]).map(function(e){return e.name()});else{var m=new Set;i.forEach(function(e){e.tags().all().forEach(function(e){return m.add(e.name())})}),n=Array.from(m)}var u=M(n,c),d=u.tagged,p=u.untagged;return l.createElement("ul",{className:"text-sm mt-2"},Array.from(d.entries()).map(function(e){var t=e[0],n=e[1];return l.createElement("li",{key:t},l.createElement(H,{tagName:t},n.map(function(e){var t=e.name,n=e.data;return l.createElement($,q({key:t},n))})))}),p.length>0?l.createElement("li",null,l.createElement(H,{tagName:"Untagged"},p.map(function(e){var t=e.name,n=e.data;return l.createElement($,q({key:t},n))}))):null)},$=function(e){var t=e.type,n=e.operationHrefId,r=e.label,a=L(),s=(0,l.useContext)(U).setShowSidebar,i=j().version().localeCompare("2.6.0",void 0,{numeric:!0}),o=D.getOperationDesignInformation({type:t,config:a,isAsyncAPIv2:0===i}),c=o.typeLabel,m=o.backgroundColor;return l.createElement("li",{key:"menu-operation-list-".concat(n)},l.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#".concat(n),onClick:function(){return s(!1)}},l.createElement("strong",{className:"h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs ".concat(["bg-red-600","bg-orange-600","bg-green-600","bg-blue-600"].includes(m)&&m),title:c},c),l.createElement("span",{className:"break-all inline-block"},r)))},W=function(e){var t=e.serverName,n=(0,l.useContext)(U).setShowSidebar;return l.createElement("li",null,l.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#server-".concat(t),onClick:function(){return n(!1)}},l.createElement("span",{className:"break-all inline-block"},t)))},H=function(e){var t=e.tagName,n=e.children,r=(0,l.useState)(!1),a=r[0],s=r[1];return l.createElement("div",null,l.createElement(P,{onClick:function(){return s(function(e){return!e})},chevronProps:{className:a?"-rotate-180":"-rotate-90"}},l.createElement("span",{className:"text-sm inline-block mt-1 font-extralight"},t)),l.createElement("ul",{className:"".concat(a?"block":"hidden"," text-sm mt-2 font-light")},n))},V=function(e){var t=e.href,n=e.title,r=e.className,a=e.children;return l.createElement("a",{href:t,title:n?"".concat(n," (Opens in new window)"):"Opens in new window",className:r,target:"_blank",rel:"nofollow noopener noreferrer"},a)},Y=n(76941),K=n(66661),B=n(93466),G=n.n(B),Q=n(45715),J=n.n(Q),X=n(4402),Z=n.n(X),ee=n(72447),et=n.n(ee);G().registerLanguage("json",J()),G().registerLanguage("yaml",Z()),G().registerLanguage("bash",et());var en={langPrefix:"hljs language-",highlight:function(e,t){if(!G().getLanguage(t))return e;try{return G().highlight(e,{language:t}).value}catch(t){return e}}},er=function(e){var t=e.children;return t?"string"!=typeof t?l.createElement(l.Fragment,null,t):l.createElement("div",{className:"prose max-w-none text-sm",dangerouslySetInnerHTML:{__html:(0,Y.sanitize)((0,K.xI)(t,en))}}):null},ea=function(e){var t,n=e.tag,r="#".concat(n.name()),a=null!=(t=n.description())?t:"",s=n.externalDocs(),i=l.createElement("div",{title:a,className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1"},l.createElement("span",{className:s?"underline":""},r));return s?l.createElement(V,{href:s.url(),title:a},i):i},es=function(e){var t=e.tags;return(null==t?void 0:t.length)?l.createElement("ul",{className:"flex flex-wrap leading-normal"},t.all().map(function(e){return l.createElement("li",{className:"inline-block mt-2 mr-2",key:e.name()},l.createElement(ea,{tag:e}))})):null},ei=n(18951),eo=function(){return(eo=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};(r=i||(i={})).ANY="any",r.RESTRICTED_ANY="restricted any",r.NEVER="never",r.UNKNOWN="unknown";var el=["string","number","integer","boolean","array","object","null"],ec=["maxLength","minLength","pattern","contentMediaType","contentEncoding","multipleOf","maximum","exclusiveMaximum","minimum","exclusiveMinimum","items","maxItems","minItems","uniqueItems","contains","additionalItems","maxProperties","minProperties","required","properties","patternProperties","propertyNames","dependencies","additionalProperties"],em=function(){function e(){}return e.toSchemaType=function(e){var t=this;if(!e||"function"!=typeof e.json)return i.UNKNOWN;if(e.isBooleanSchema())if(!0===e.json())return i.ANY;else return i.NEVER;if(0===Object.keys(e.json()).length)return i.ANY;var n=e.not();if(n&&this.inferType(n)===i.ANY)return i.NEVER;var r=this.inferType(e);if(Array.isArray(r))return r.map(function(n){return t.toType(n,e)}).join(" | ");r=this.toType(r,e);var a=this.toCombinedType(e);return r&&a?"".concat(r," ").concat(a):a||("object"===r&&e.title()&&(r+=" ["+e.title()+"]"),r)},e.applicatorSchemaName=function(e,t,n,r){var a=r?" ".concat(r,":"):":";return(a.startsWith(" <anonymous-schema-")&&(a=" Anonymous Schema"),0===e)?"".concat(t).concat(a):"".concat(n).concat(a)},e.prettifyValue=function(e,t){void 0===t&&(t=!0);var n=typeof e;return"string"===n?t?'"'.concat(e,'"'):e:"number"===n||"bigint"===n||"boolean"===n?"".concat(e):Array.isArray(e)?"[".concat(e.toString(),"]"):JSON.stringify(e)},e.humanizeConstraints=function(e){var t=[],n=this.humanizeNumberRangeConstraint(e.minimum(),e.exclusiveMinimum(),e.maximum(),e.exclusiveMaximum());void 0!==n&&t.push(n);var r=this.humanizeMultipleOfConstraint(e.multipleOf());void 0!==r&&t.push(r);var a=this.humanizeRangeConstraint("characters",e.minLength(),e.maxLength());void 0!==a&&t.push(a);var s=e.uniqueItems(),i=this.humanizeRangeConstraint(s?"unique items":"items",e.minItems(),e.maxItems());void 0!==i&&t.push(i);var o=this.humanizeRangeConstraint("properties",e.minProperties(),e.maxProperties());return void 0!==o&&t.push(o),t},e.isExpandable=function(e){var t,n,r,a,s,i,o,l,c=this.inferType(e);if((c=Array.isArray(c)?c:[c]).includes("object")||c.includes("array")||(null!=(l=(null!=(r=null!=(n=null!=(t=e.oneOf())?t:e.anyOf())?n:e.allOf())?r:Object.keys(null!=(a=e.properties())?a:{}).length>0)||(null!=(o=null!=(i=null!=(s=e.items())?s:e.not())?i:e.if())?o:e.then()))?l:e.else()))return!0;var m=this.getCustomExtensions(e);return!!(m&&Object.keys(m).length)},e.serverVariablesToSchema=function(e){if(e&&0!==e.length){var t,n={};e.all().forEach(function(e){n[e.id()]=eo({},e.json()||{}),n[e.id()].type="string"});var r=((t={type:"object",properties:n,required:Object.keys(n)})[this.extRenderAdditionalInfo]=!1,t);return new ei.S(r)}},e.parametersToSchema=function(e){var t,n=this;if(!(!e||e.isEmpty())){var r={};e.all().forEach(function(e){var t,a=e.schema();r[e.id()]=eo({},null!=(t=null==a?void 0:a.json())?t:{}),r[e.id()].description=e.hasDescription()?e.description():void 0,r[e.id()][n.extParameterLocation]=e.hasLocation()?e.location():void 0});var a=((t={type:"object",properties:r,required:Object.keys(r)})[this.extRenderAdditionalInfo]=!1,t);return new ei.S(a)}},e.jsonToSchema=function(e){var t=this.jsonFieldToSchema(e);return new ei.S(t)},e.getCustomExtensions=function(e){if(e&&"function"==typeof e.extensions){for(var t=e.extensions(),n={},r=0,a=t.all();r<a.length;r++){var s=a[r];s.id().startsWith("x-parser-")||s.id().startsWith("x-schema-private-")||(n[s.id()]=s.value())}return n}},e.getDependentRequired=function(e,t){var n=[],r=t.dependencies();if(r){for(var a=0,s=Object.entries(r);a<s.length;a++){var i=s[a],o=i[0],l=i[1];Array.isArray(l)&&l.includes(e)&&n.push(o)}return n.length?n:void 0}},e.getDependentSchemas=function(e){var t,n=e.dependencies();if(n){for(var r={},a=0,s=Object.entries(n);a<s.length;a++){var i=s[a],o=i[0],l=i[1];"object"!=typeof l||Array.isArray(l)||(r[o]=l)}if(Object.keys(r).length){var c=((t={type:"object",properties:Object.entries(r).reduce(function(e,t){var n=t[0],r=t[1];return e[n]=eo({},r.json()),e},{})})[this.extRenderAdditionalInfo]=!1,t);return new ei.S(c)}}},e.toType=function(e,t){if(t.isCircular())return e;if("array"===e){var n=t.items();return Array.isArray(n)?this.toItemsType(n,t):n?"array<".concat(this.toSchemaType(n)||i.UNKNOWN,">"):"array<".concat(i.ANY,">")}return e},e.toItemsType=function(e,t){var n=this,r=e.map(function(e){return n.toSchemaType(e)}).join(", "),a=t.additionalItems();if(void 0!==a&&!1!==a){var s=!0===a?i.ANY:this.toSchemaType(a);return"tuple<".concat(r||i.UNKNOWN,", ...optional<").concat(s,">>")}return"tuple<".concat(r||i.UNKNOWN,">")},e.toCombinedType=function(e){return e.oneOf()?"oneOf":e.anyOf()?"anyOf":e.allOf()?"allOf":void 0},e.inferType=function(e){var t=e.type();if(void 0!==t)return Array.isArray(t)?(t.includes("integer")&&t.includes("number")&&(t=t.filter(function(e){return"integer"!==e})),1===t.length?t[0]:t):t;var n=e.const();if(void 0!==n)return typeof n;var r=e.enum();if(Array.isArray(r)&&r.length){var a=Array.from(new Set(r.map(function(e){return typeof e})));return 1===a.length?a[0]:a}var s=Object.keys(e.json()||{})||[];return!0===ec.some(function(e){return s.includes(e)})?i.RESTRICTED_ANY:this.toCombinedType(e)?"":i.ANY},e.humanizeNumberRangeConstraint=function(e,t,n,r){var a,s=void 0!==t,i=void 0!==e||s,o=void 0!==r,l=void 0!==n||o;return i&&l?a=""+(s?t:e)+(s?" < ":" <= ")+"value"+(o?" < ":" <= ")+(o?r:n):i?a=""+(s?t:e)+(s?" < ":" <= ")+"value":l&&(a="value"+(o?" < ":" <= ")+(o?r:n)),a},e.humanizeMultipleOfConstraint=function(e){if(void 0!==e){var t=e.toString(10);return/^0\.0*1$/.test(t)?"decimal places <= ".concat(t.split(".")[1].length):"multiple of ".concat(t)}},e.humanizeRangeConstraint=function(e,t,n){var r;return void 0!==t&&void 0!==n?r=t===n?"".concat(t," ").concat(e):"[ ".concat(t," .. ").concat(n," ] ").concat(e):void 0!==n?r="<= ".concat(n," ").concat(e):void 0!==t&&(r=1===t?"non-empty":">= ".concat(t," ").concat(e)),r},e.jsonFieldToSchema=function(e,t){var n,r,a,s,i=this;if(void 0===t&&(t=new Set),null==e)return(n={type:"string",const:""})[this.extRawValue]=!0,n;if("object"!=typeof e)return(r={type:"string",const:"function"==typeof e.toString?e.toString():e})[this.extRawValue]=!0,r;if(t.has(e))throw Error("too much recursion. Please check document for recursion.");t.add(e);try{if(this.isJSONSchema(e))return e;if(Array.isArray(e))return(a={type:"array",items:e.map(function(e){return i.jsonFieldToSchema(e,t)})})[this.extRenderAdditionalInfo]=!1,a;return(s={type:"object",properties:Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return e[r]=i.jsonFieldToSchema(a,t),e},{})})[this.extRenderAdditionalInfo]=!1,s}finally{t.delete(e)}},e.isJSONSchema=function(e){return!!(e&&"object"==typeof e&&(el.includes(e.type)||Array.isArray(e.type)&&e.type.some(function(e){return!el.includes(e)})))},e.hasRules=function(e,t){return!!(e.format()||e.pattern()||t.length>0||e.contentEncoding()||e.enum()||void 0!==e.default()||void 0!==e.const())},e.hasConditions=function(e){var t,n,r,a=this.getDependentSchemas(e);return!!((null==(t=e.oneOf())?void 0:t.length)||(null==(n=e.anyOf())?void 0:n.length)||(null==(r=e.allOf())?void 0:r.length)||e.not()||e.propertyNames()||e.contains()||e.if()||e.then()||e.else()||a)},e.extRenderAdditionalInfo="x-schema-private-render-additional-info",e.extRawValue="x-schema-private-raw-value",e.extParameterLocation="x-schema-private-parameter-location",e}(),eu=function(e){var t,n=e.schema;if(!n)return null;var r=n.type();if(!(null==r?void 0:r.includes("array")))return null;var a=n.items();return a&&!Array.isArray(a)&&Object.keys(null!=(t=a.properties())?t:{}).length?l.createElement(eb,{schema:a,isArray:!0}):Array.isArray(a)?l.createElement(l.Fragment,null,a.map(function(e,t){return l.createElement(eb,{schema:e,isArray:!0,schemaName:"".concat(t+1," item:"),key:t})})):l.createElement(eb,{schema:a,isArray:!0,schemaName:"Items:"})},ed=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(em.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("array"))||!Array.isArray(n.items()))return null;var a=n.additionalItems();return!0===a||void 0===a?l.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are allowed."):!1===a?l.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are ",l.createElement("strong",null,"NOT")," allowed."):l.createElement(eb,{schemaName:"Additional items:",schema:a})},ep=function(e){var t,n,r,a=e.schema;if(!a)return null;var s=Object.entries(null!=(t=a.properties())?t:{}),i=Object.entries(null!=(n=a.patternProperties())?n:{});if(!s.length&&!i.length)return null;var o=null!=(r=a.required())?r:[];return l.createElement(l.Fragment,null,s.map(function(e){var t=e[0],n=e[1];return l.createElement(eb,{key:t,schema:n,schemaName:t,required:o.includes(t),isProperty:!0,isCircular:n.isCircular(),dependentRequired:em.getDependentRequired(t,a)})}),i.map(function(e){var t=e[0],n=e[1];return l.createElement(eb,{key:t,schema:n,schemaName:t,isPatternProperty:!0,isProperty:!0,isCircular:n.isCircular()})}))},eh=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(em.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("object")))return null;var a=n.additionalProperties();return!0===a||void 0===a?l.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are allowed."):!1===a?l.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are ",l.createElement("strong",null,"NOT")," allowed."):l.createElement(eb,{schemaName:"Additional properties:",schema:a})},ef=function(e){var t,n,r,a,s,i,o=e.schema,c=e.dependentSchemas;return l.createElement("div",{className:"space-y-2 bg-blue-100 border rounded rounded-tl-none p-4"},(null==(t=o.oneOf())?void 0:t.length)&&l.createElement("div",{className:""},l.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",l.createElement("strong",null,"One Of")," the following:"),null==(n=o.oneOf())?void 0:n.map(function(e,t){var n;return l.createElement(eb,{key:t,schema:e,schemaName:em.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(r=o.anyOf())?void 0:r.length)&&l.createElement("div",{className:""},l.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",l.createElement("strong",null,"Any Of")," the following:"),null==(a=o.anyOf())?void 0:a.map(function(e,t){var n;return l.createElement(eb,{key:t,schema:e,schemaName:em.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(s=o.allOf())?void 0:s.length)&&l.createElement("div",{className:""},l.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Must consist ",l.createElement("strong",null,"All Of")," the following:"),null==(i=o.allOf())?void 0:i.map(function(e,t){var n;return l.createElement(eb,{key:t,schema:e,schemaName:em.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),o.not()&&l.createElement(eb,{schema:o.not(),schemaName:"Can NOT adhere to:"}),o.propertyNames()&&l.createElement(eb,{schema:o.propertyNames(),schemaName:"Property names must adhere to:"}),o.contains()&&l.createElement(eb,{schema:o.contains(),schemaName:"Array must contain at least one of:"}),o.if()&&l.createElement("div",{className:""},l.createElement(eb,{schema:o.if(),schemaName:"If schema adheres to:"}),o.then()&&l.createElement(eb,{schema:o.then(),schemaName:"Then must adhere to:"}),o.else()&&l.createElement(eb,{schema:o.else(),schemaName:"Otherwise:"})),c&&l.createElement(eb,{schema:c,schemaName:"Dependent schemas:"}))},eg=function(e){var t,n=e.schema,r=e.constraints;return l.createElement("div",{className:"flex flex-col space-y-2 bg-blue-100 p-4 rounded rounded-tl-none border"},n.format()&&l.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"format:"," ",l.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.format())),n.pattern()&&l.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"must match:"," ",l.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.pattern())),void 0!==n.contentEncoding()&&l.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"encoding:"," ",l.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.contentEncoding())),r.map(function(e){return l.createElement("strong",{key:e,className:"text-purple-700 p-1 rounded-md text-sm"},e)}),void 0!==n.default()&&l.createElement("div",{className:"text-sm"},l.createElement("span",{className:""},"Default value:"),l.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},em.prettifyValue(n.default()))),void 0!==n.const()&&l.createElement("div",{className:"text-sm"},l.createElement("span",{className:""},"Constant value: "),l.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},em.prettifyValue(n.const()))),n.enum()&&l.createElement("div",{className:"text-sm"},l.createElement("span",{className:""},"Allowed values: "),null==(t=n.enum())?void 0:t.map(function(e,t){return l.createElement("span",{key:t,className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},em.prettifyValue(e))})))},ev=function(e){var t,n,r,a=e.schema,s=e.required,i=void 0!==s&&s,o=e.isPatternProperty,c=e.dependentRequired;if(!a)return null;var m=null!=i&&i,u=null!=(t=a.deprecated())&&t,d=null!=(n=a.writeOnly())&&n,p=null!=(r=a.readOnly())&&r,h=null!=o&&o;return l.createElement(l.Fragment,null,(m||u||d||p||h)&&l.createElement("div",{className:"flex items-center space-x-2"},m&&l.createElement("span",{className:"text-red-600 text-xs rounded"},"required"),c&&l.createElement(l.Fragment,null,l.createElement("div",{className:"text-gray-500 text-xs"},"required when defined:"),l.createElement("div",{className:"text-red-600 text-xs"},c.join(", "))),u&&l.createElement("span",{className:"text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded"},"deprecated"),o&&l.createElement("div",{className:"text-gray-500 text-xs italic"},"(pattern property)"),d&&l.createElement("span",{className:"text-gray-600 text-xs rounded"},"write-only"),p&&l.createElement("span",{className:"text-gray-500 text-xs rounded"},"read-only")))},ey=l.createContext({reverse:!1,deepExpanded:!1}),eb=function(e){var t,n,r=e.schemaName,a=e.schema,s=e.required,i=e.isPatternProperty,o=e.isProperty,c=void 0!==o&&o,m=e.isCircular,u=void 0!==m&&m,d=e.dependentRequired,p=e.expanded,h=e.isArray,f=void 0!==h&&h,g=(0,l.useContext)(ey),v=g.reverse,y=g.deepExpanded,b=(0,l.useState)(void 0!==p&&p||f),x=b[0],E=b[1],N=(0,l.useState)(!1),w=N[0],k=N[1],S=(0,l.useState)("RULES"),C=S[0],I=S[1],O=a?em.humanizeConstraints(a):[],A=!!a&&em.hasRules(a,O),j=!!a&&em.hasConditions(a);(0,l.useEffect)(function(){A||I("CONDITIONS")},[A]),(0,l.useEffect)(function(){f||k(y)},[f,y,k]),(0,l.useEffect)(function(){f||E(w)},[f,w]);var T=(0,l.useMemo)(function(){return{reverse:!v,deepExpanded:w}},[v,w]);if(!a||"string"==typeof r&&((null==r?void 0:r.startsWith("x-parser-"))||(null==r?void 0:r.startsWith("x-schema-private-"))))return null;var L=em.getDependentSchemas(a),R=a.externalDocs(),D=a.extensions().get(em.extParameterLocation),M=(null==D?void 0:D.value())===!0,q=em.toSchemaType(a);u=u||a.isCircular()||!1;var U=a.$id(),F="string"==typeof r?l.createElement("span",{className:"break-anywhere text-sm w-full ".concat(c?"italic":"")},r):r,_=em.isExpandable(a)||A||j;return l.createElement(ey.Provider,{value:T},l.createElement("div",{className:"flex mb-4 gap-2"},l.createElement("div",{className:"border rounded overflow-visible w-full"},l.createElement("div",{className:"flex flex-col justify-center p-4 bg-gray-100 border-b"},l.createElement("div",{className:"flex justify-between items-start"},l.createElement("div",{className:"flex items-center gap-2 w-full"},!_||u||f?l.createElement("span",{className:"text-sm ".concat(c?"italic":"")},r):l.createElement("div",{className:"flex items-center gap-2"},l.createElement(P,{onClick:function(){return E(function(e){return!e})},expanded:x},F)),l.createElement("span",{className:"capitalize text-sm text-teal-500 font-bold"},u?"".concat(q," [CIRCULAR]"):q),void 0!==a.contentMediaType()&&l.createElement("strong",{className:"bg-yellow-600 no-underline text-white rounded lowercase mr-2 p-1 text-xs"},"media type: ",a.contentMediaType()),U&&!U.startsWith("<anonymous-")&&l.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},"uid: ",U),l.createElement(ev,{schema:a,isPatternProperty:void 0!==i&&i,required:void 0!==s&&s,dependentRequired:d}),l.createElement("div",{className:"ml-auto flex gap-4"},_&&!u&&!f&&l.createElement("button",{type:"button",onClick:function(){var e=!x;k(e),f||E(e)},className:"text-sm text-gray-500 hover:text-gray-700"},x?"Collapse all":"Expand all")))),a.description()&&l.createElement("div",{className:"mt-2 text-sm text-gray-600"},l.createElement(er,null,a.description())),a.examples()&&l.createElement("ul",{className:"text-xs"},"Examples values:"," ",null==(t=a.examples())?void 0:t.map(function(e,t){return l.createElement("li",{key:t,className:"inline-block bg-gray-600 text-white rounded ml-1 py-0 px-2 break-all"},l.createElement("span",null,em.prettifyValue(e)))})),M&&l.createElement("div",{className:"text-xs"},"Parameter location:"," ",l.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},M)),R&&l.createElement("strong",{className:"w-min border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-2 py-0 mt-2"},l.createElement(V,{href:R.url(),title:null!=(n=R.description())?n:""},"Documentation"))),l.createElement("div",{className:"flex "},!u&&_&&x&&l.createElement("div",{className:"p-4 bg-white relative w-full"},l.createElement(ep,{schema:a}),l.createElement(eu,{schema:a}),l.createElement("div",{className:""},l.createElement("div",{className:"flex gap-1"},A&&l.createElement("button",{type:"button",className:"text-sm font-semibold text-gray-900 ".concat("RULES"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return I("RULES")},role:"tab","aria-selected":"RULES"===C,"aria-controls":"rules-panel"},"Rules"),j&&l.createElement("button",{type:"button",className:"text-sm font-semibold text-gray-900 ".concat("CONDITIONS"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return I("CONDITIONS")},role:"tab","aria-selected":"CONDITIONS"===C,"aria-controls":"conditions-panel"},"Conditions")),j&&"CONDITIONS"==C&&l.createElement("div",{className:"mb-4 w-full"},l.createElement(ef,{schema:a,dependentSchemas:L})),A&&"RULES"==C&&l.createElement("div",{className:"z-10 w-full"},l.createElement(eg,{schema:a,constraints:O}))),l.createElement("div",{className:"mt-4"},l.createElement(eh,{schema:a}),l.createElement(ed,{schema:a})),l.createElement(ex,{item:a}))))))},ex=function(e){var t=e.name,n=void 0===t?"Extensions":t,r=e.item,a=(0,l.useState)(!1),s=a[0],i=a[1],o=L(),c=j(),m=em.getCustomExtensions(r);if(!m||!Object.keys(m).length)return null;if(!o.extensions||!Object.keys(o.extensions).length){var u=em.jsonToSchema(m);return u&&l.createElement("div",{className:"mt-2"},l.createElement(eb,{schemaName:n,schema:u}))}return l.createElement("div",null,l.createElement("div",{className:"flex py-2"},l.createElement("div",{className:"min-w-1/4"},l.createElement(P,{onClick:function(){return i(function(e){return!e})},expanded:s},l.createElement("span",{className:"break-anywhere text-sm ".concat(n)},n)))),l.createElement("div",{className:"rounded p-4 py-2 border bg-gray-100 ".concat(s?"block":"hidden")},Object.keys(m).sort(function(e,t){return e.localeCompare(t)}).map(function(e){if(null==(t=o.extensions)?void 0:t[e]){var t,n=o.extensions[e];return l.createElement(n,{key:e,propertyName:e,propertyValue:m[e],document:c,parent:r})}var a=em.jsonToSchema(m[e]);return l.createElement("div",{key:e,className:"mt-2"},l.createElement(eb,{schemaName:e,schema:a}))})))},eE=function(e){var t=e.context,n=e.pluginManager;if(!n)return null;var r=t.slot,a=n.getComponentsForSlot(r);return a&&0!==a.length?l.createElement("div",{className:"asyncapi-react-plugin-slot-".concat(r),"data-slot":r},a.map(function(e,n){return l.createElement(l.Suspense,{key:"".concat(r,"-").concat(n),fallback:l.createElement("div",null,"Loading plugin...")},l.createElement(e,{context:t}))})):null},eN=(0,l.createContext)(void 0);function ew(){return(0,l.useContext)(eN)}var ek=function(){var e,t,n,r,a,s,i,o,c,m=j(),u=ew(),d=m.info();if(!d)return null;var f=m.info().id(),g=m.info().externalDocs(),v=d.license(),y=d.termsOfService(),b=m.defaultContentType(),x=d.contact(),E=d.extensions(),N=null!=(n=null!=(t=null!=(e=null!=v?v:y)?e:b)?t:x)?n:g;return l.createElement("div",{className:"panel-item"},l.createElement("div",{className:"panel-item--center px-8 text-left",id:"introduction"},l.createElement("div",{className:"text-4xl"},d.title(),"\xa0",d.version()),N&&l.createElement("ul",{className:"flex flex-wrap mt-2 leading-normal"},v&&l.createElement("li",{className:"inline-block mt-2 mr-2"},v.url()?l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(r=v.url())?r:""},l.createElement("span",null,v.name())):l.createElement("strong",{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-3 py-1"},v.name())),y&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:y},l.createElement("span",null,"Terms of service"))),b&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(p,"/").concat(b)},l.createElement("span",null,b))),g&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:g.url(),title:null!=(a=g.description())?a:void 0},l.createElement("span",null,h))),x&&l.createElement(l.Fragment,null,x.url()&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement(V,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(s=x.url())?s:""},l.createElement("span",null,null!=(i=x.name())?i:"Support"))),x.email()&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement(V,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"mailto:".concat(x.email())},l.createElement("span",null,x.email())))),f&&l.createElement("li",{className:"inline-block mt-2 mr-2"},l.createElement("strong",{className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 no-underline text-xs uppercase rounded px-3 py-1"},"ID: ",f))),d.hasDescription()&&l.createElement("div",{className:"mt-4"},l.createElement(er,null,d.description())),m.info().tags().length>0&&l.createElement("div",{className:"mt-4"},l.createElement(es,{tags:m.info().tags()})),E.length>0&&l.createElement("div",{className:"mt-4"},l.createElement(ex,{name:"Info Extensions",item:d})),(null!=(c=null==(o=null==u?void 0:u.getComponentsForSlot(R.WN.INFO))?void 0:o.length)?c:0)>0&&l.createElement(eE,{context:{slot:R.WN.INFO,document:m,info:d,schema:d},pluginManager:u})),l.createElement("div",{className:"panel-item--right"}))},eS=function(){function e(){}return e.securityType=function(e){switch(e){case"apiKey":default:return"API key";case"oauth2":return"OAuth2";case"openIdConnect":return"Open ID";case"http":return"HTTP";case"userPassword":return"User/Password";case"X509":return"X509:";case"symmetricEncryption":return"Symmetric Encription";case"asymmetricEncryption":return"Asymmetric Encription";case"httpApiKey":return"HTTP API key";case"scramSha256":return"ScramSha256";case"scramSha512":return"ScramSha512";case"gssapi":return"GSSAPI"}},e.flowName=function(e){switch(e){case"implicit":default:return"Implicit";case"password":return"Password";case"clientCredentials":return"Client credentials";case"authorizationCode":return"Authorization Code"}},e.getKafkaSecurity=function(e,t){var n,r;if(n="kafka"===e?t?"SASL_PLAINTEXT":"PLAINTEXT":t?"SASL_SSL":"SSL",t)switch(t.type()){case"plain":r="PLAIN";break;case"scramSha256":r="SCRAM-SHA-256";break;case"scramSha512":r="SCRAM-SHA-512";break;case"oauth2":r="OAUTHBEARER";break;case"gssapi":r="GSSAPI";break;case"X509":n="SSL"}return{securityProtocol:n,saslMechanism:r}},e}(),eC=function(e){var t,n=e.security,r=void 0===n?[]:n,a=e.protocol,s=void 0===a?"":a,i=e.header;if(null==r?void 0:r.length){var o=Object.values(r).map(function(e){return e.all()}).flat().map(function(e){var t=e.scheme(),n=e.scopes();return t?l.createElement(eI,{protocol:s,securitySchema:t,requiredScopes:n,key:t.type()}):null}).filter(Boolean);t=l.createElement("ul",null,o.map(function(e,t){return l.createElement("li",{className:"mt-2",key:t},e)}))}else("kafka"===s||"kafka-secure"===s)&&(t=l.createElement(eI,{protocol:s,securitySchema:null}));return t?l.createElement("div",{className:"text-sm mt-4"},l.createElement("h5",{className:"text-gray-800"},void 0===i?"Security":i,":"),t):null},eI=function(e){var t,n,r,a=e.securitySchema,s=e.protocol,i=(void 0===(t=e.requiredScopes)&&(t=[]),n=[],a&&(a.name()&&n.push(l.createElement("span",null,"Name: ",a.name())),a.in()&&n.push(l.createElement("span",null,"In: ",a.in())),a.scheme()&&n.push(l.createElement("span",null,"Scheme: ",a.scheme())),a.bearerFormat()&&n.push(l.createElement("span",null,"Bearer format: ",a.bearerFormat())),a.openIdConnectUrl()&&n.push(l.createElement(V,{href:a.openIdConnectUrl(),className:"underline"},"Connect URL")),t.length&&n.push(l.createElement("span",null,"Required scopes: ",t.join(", ")))),n);if(["kafka","kafka-secure"].includes(s)){var o=eS.getKafkaSecurity(s,a),c=o.securityProtocol,m=o.saslMechanism;r=l.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded"},c&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"security.protocol:"),l.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},c)),m&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"sasl.mechanism:"),l.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},m)))}var u=null==a?void 0:a.flows(),d={};(null==u?void 0:u.hasImplicit())&&(d.implicit=u.implicit()),(null==u?void 0:u.hasAuthorizationCode())&&(d.authorizationCode=u.authorizationCode()),(null==u?void 0:u.hasClientCredentials())&&(d.clientCredentials=u.clientCredentials()),(null==u?void 0:u.hasPassword())&&(d.password=u.password());var p=Object.entries(d).map(function(e){var t=e[0],n=e[1],r=n.authorizationUrl(),a=n.tokenUrl(),s=n.refreshUrl(),i=n.scopes();return l.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded",key:t},l.createElement("div",null,l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Flow:"),l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},eS.flowName(t))),r&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Auth URL:"),l.createElement(V,{href:r,className:"underline"},r)),a&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Token URL:"),l.createElement(V,{href:a,className:"underline"},a)),s&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Refresh URL:"),l.createElement(V,{href:s,className:"underline"},s)),i&&l.createElement("div",{className:"mt-1"},l.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Scopes:"),l.createElement("ul",{className:"inline-block"},i&&Object.entries(i).map(function(e){var t=e[0],n=e[1];return l.createElement("li",{className:"inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1",title:n,key:t},t)}))))});return l.createElement("div",null,a&&i&&l.createElement("div",null,l.createElement("span",null,eS.securityType(a.type()),i.length>0&&l.createElement("ul",{className:"inline-block ml-2"},i.map(function(e,t){return l.createElement("li",{className:"inline-block font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded px-2 py-0 ml-1",key:t},e)})))),(null==a?void 0:a.hasDescription())&&l.createElement("div",null,l.createElement(er,null,a.description())),p&&p.length>0&&l.createElement("ul",{className:"my-2"},l.createElement("li",null,p)),r&&l.createElement("div",null,r))},eO=function(e){var t=e.name,n=void 0===t?"Binding specific information":t,r=e.bindings;if(!r||r.isEmpty())return null;var a=r.all().map(function(e){var t=e.value(),r=em.jsonToSchema(t),a=e.protocol(),s=l.createElement("div",{className:"inline-block text-sm"},l.createElement("span",null,n),l.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs"},a));return void 0!==r&&l.createElement(eb,{schemaName:s,schema:r,key:a})});return l.createElement(l.Fragment,null,a)},eP=function(e){var t=e.serverName,n=e.server,r=L();if(!n)return null;var a=em.serverVariablesToSchema(n.variables()),s=n.protocolVersion(),i=n.security();return l.createElement("div",{className:"panel-item"},l.createElement("div",{className:"panel-item--center px-8"},l.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border bg-gray-100"},l.createElement("div",null,l.createElement("span",{className:"font-mono text-base"},n.url()),l.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm"},s?"".concat(n.protocol()," ").concat(s):n.protocol()),l.createElement("strong",{className:"bg-blue-500 no-underline text-white uppercase rounded px-2 py-1 text-sm"},t)),n.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,n.description())),a&&l.createElement("div",{className:"mt-2",id:"".concat(D.getIdentifier("server-".concat(t,"-url-variables"),r))},l.createElement(eb,{schemaName:"URL Variables",schema:a,expanded:!0})),l.createElement("div",{id:"".concat(D.getIdentifier("server-".concat(t,"-security"),r))},l.createElement(eC,{protocol:n.protocol(),security:i})),n.bindings()&&l.createElement("div",{className:"mt-2"},l.createElement(eO,{name:"Server specific information",bindings:n.bindings()})),l.createElement(ex,{name:"Server Extensions",item:n}),n.tags().length>0&&l.createElement("div",{className:"mt-2"},l.createElement(es,{tags:n.tags()})))),l.createElement("div",{className:"panel-item--right"}))},eA=function(){var e=j().servers().all(),t=L();return e.length?l.createElement("section",{id:"".concat(D.getIdentifier("servers",t)),className:"mt-16"},l.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Servers"),l.createElement("ul",null,e.map(function(e){var n=e.id();return l.createElement("li",{className:"mb-4",key:n,id:"".concat(D.getIdentifier("server-".concat(n),t))},l.createElement(eP,{serverName:n,server:e,key:n}))}))):null},ej=function(e){var t=e.snippet;return"object"==typeof t&&(t="```json\n"+JSON.stringify(t,void 0,2)+"\n```"),l.createElement(er,null,t)},eT=n(43284),eL=function(){function e(){}return e.generateExample=function(e,t){void 0===t&&(t={});try{return this.sanitizeExample((0,eT.XM)(e,t))||""}catch(e){return""}},e.sanitizeExample=function(e){var t=this;return"object"==typeof e&&e&&!Array.isArray(e)?Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return r.startsWith("x-parser-")||r.startsWith("x-schema-private-")||(e[r]=t.sanitizeExample(a)),e},{}):e},e.getPayloadExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasPayload()})){var r=n.flatMap(function(e){if(e.payload())return{name:e.name(),summary:e.summary(),example:e.payload()}}).filter(Boolean);if(r.length>0)return r}var a=e.payload();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e.getHeadersExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasHeaders()})){var r=n.flatMap(function(e){if(e.hasHeaders())return{name:e.name(),summary:e.summary(),example:e.headers()}}).filter(Boolean);if(r.length>0)return r}var a=e.headers();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e}(),eR=function(e){var t=e.message;if(!t)return null;var n=t.payload(),r=t.headers();return l.createElement("div",{className:"bg-gray-800 px-8 py-4 mt-4 -mx-8 2xl:mx-0 2xl:px-4 2xl:rounded examples"},l.createElement("h4",{className:"text-white text-lg"},"Examples"),n&&l.createElement(eD,{type:"Payload",schema:n,examples:eL.getPayloadExamples(t)}),r&&l.createElement(eD,{type:"Headers",schema:r,examples:eL.getHeadersExamples(t)}))},eD=function(e){var t,n,r=e.type,a=e.schema,s=e.examples,i=void 0===s?[]:s,o=L(),c=(0,l.useState)(null!=(n=null==(t=null==o?void 0:o.expand)?void 0:t.messageExamples)&&n),m=c[0],u=c[1];return(0,l.useEffect)(function(){var e,t;u(null!=(t=null==(e=null==o?void 0:o.expand)?void 0:e.messageExamples)&&t)},[o.expand]),l.createElement("div",{className:"mt-4"},l.createElement("div",null,l.createElement(P,{onClick:function(){return u(function(e){return!e})},expanded:m,chevronProps:{className:"fill-current text-gray-200"}},l.createElement("span",{className:"inline-block w-20 py-0.5 mr-1 text-gray-200 text-sm border text-center rounded focus:outline-none"},void 0===r?"Payload":r))),l.createElement("div",{className:m?"block":"hidden"},i&&i.length>0?l.createElement("ul",null,i.map(function(e,t){return l.createElement("li",{className:"mt-4",key:t},l.createElement("h5",{className:"text-xs font-bold text-gray-500"},e.name?"#".concat(t+1," Example - ").concat(e.name):"#".concat(t+1," Example")),e.summary&&l.createElement("p",{className:"text-xs font-bold text-gray-500"},e.summary),l.createElement("div",{className:"mt-1"},l.createElement(ej,{snippet:eL.sanitizeExample(e.example)})))})):l.createElement("div",{className:"mt-4"},l.createElement(ej,{snippet:eL.generateExample(a.json())}),l.createElement("h6",{className:"text-xs font-bold text-gray-600 italic mt-2"},"This example has been generated automatically."))))},eM=function(e){var t=e.message,n=e.messageName,r=e.index,a=e.showExamples,s=L();if(!t)return null;var i="function"==typeof t.id&&t.id(),o=t.title(),c=t.summary(),m=t.payload(),u=t.headers(),d=t.correlationId(),f=t.contentType(),g=t.externalDocs(),v=null!=f?f:g;return l.createElement("div",{className:"panel-item"},l.createElement("div",{className:"panel-item--center px-8"},l.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border"},l.createElement("div",null,void 0!==r&&l.createElement("strong",{className:"text-gray-700 mr-2"},"#",r),o&&l.createElement("span",{className:"text-gray-700 mr-2"},o)),c&&l.createElement("p",{className:"text-gray-600 text-sm"},c),v&&l.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},f&&l.createElement("li",{className:"inline-block"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(p,"/").concat(f)},l.createElement("span",null,f))),g&&l.createElement("li",{className:"inline-block"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:g.url()},l.createElement("span",null,h)))),i&&l.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},l.createElement("div",{className:"text-sm text-gray-700"},"Message ID",l.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},i))),d&&l.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},l.createElement("div",{className:"text-sm text-gray-700"},"Correlation ID",l.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},d.location())),d.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,d.description()))),t.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,t.description())),m&&l.createElement("div",{className:"mt-2",id:n?D.getIdentifier("message-".concat(n,"-payload"),s):void 0},l.createElement(eb,{schemaName:"Payload",schema:m})),u&&l.createElement("div",{className:"mt-2",id:n?D.getIdentifier("message-".concat(n,"-headers"),s):void 0},l.createElement(eb,{schemaName:"Headers",schema:u})),t.bindings().length>0&&l.createElement("div",{className:"mt-2"},l.createElement(eO,{name:"Message specific information",bindings:t.bindings()})),l.createElement(ex,{item:t}),t.tags().length>0&&l.createElement("div",{className:"mt-2"},l.createElement(es,{tags:t.tags()})))),void 0!==a&&a&&l.createElement("div",{className:"panel-item--right px-8"},l.createElement(eR,{message:t})))},eq=function(e){var t=e.servers,n=e.config,r=e.relativePathname;return t&&0!==t.length?l.createElement("div",{className:"mt-2 text-sm"},l.createElement("p",null,"Available only on servers:"),l.createElement("ul",{className:"flex flex-wrap leading-normal"},t.map(function(e){return l.createElement("li",{className:"inline-block mt-2 mr-2",key:e.id()},l.createElement("a",{href:"".concat(r,"#").concat(D.getIdentifier("server-"+e.id(),n)),className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"},l.createElement("span",{className:"underline"},e.id())))}))):null},eU=function(){return(eU=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},eF=globalThis.location,e_=eF?"".concat(eF.pathname).concat(eF.search):"",ez=function(e){var t=e.type,n=void 0===t?R.d2.SEND:t,r=e.operation,a=e.channelName,s=e.channel,i=L();if(!r||!s)return null;var o="function"==typeof s.servers&&s.servers().all(),c="function"==typeof r.security&&r.security(),m=void 0!==s.parameters()?em.parametersToSchema(s.parameters()):void 0;return l.createElement("div",null,l.createElement("div",{className:"panel-item--center px-8"},l.createElement(e$,eU({},e)),l.createElement(eq,{servers:o||[],config:i,relativePathname:e_}),m&&l.createElement("div",{className:"mt-2",id:D.getIdentifier("operation-".concat(n,"-").concat(a,"-parameters"),i)},l.createElement(eb,{schemaName:"Parameters",schema:m,expanded:!0})),c&&l.createElement("div",{className:"mt-2",id:D.getIdentifier("operation-".concat(n,"-").concat(a,"-security"),i)},l.createElement(eC,{security:c,header:"Additional security requirements"})),s.bindings()&&l.createElement("div",{className:"mt-2"},l.createElement(eO,{name:"Channel specific information",bindings:s.bindings()})),l.createElement(ex,{name:"Channel Extensions",item:s}),r.bindings()&&l.createElement("div",{className:"mt-2"},l.createElement(eO,{name:"Operation specific information",bindings:r.bindings()})),l.createElement(ex,{name:"Operation Extensions",item:r}),r.tags()&&l.createElement("div",{className:"mt-2"},l.createElement(es,{tags:r.tags()}))),l.createElement("div",{className:"w-full mt-4",id:D.getIdentifier("operation-".concat(n,"-").concat(a,"-message"),i)},r.messages().length>1?l.createElement("div",{className:"mt-2"},l.createElement("p",{className:"px-8"},"Accepts ",l.createElement("strong",null,"one of")," the following messages:"),l.createElement("ul",null,r.messages().all().map(function(e,t){return l.createElement("li",{className:"mt-4",key:e.id()},l.createElement(eM,{message:e,index:t,showExamples:!0}))}))):l.createElement("div",{className:"mt-2"},l.createElement("p",{className:"px-8"},"Accepts the following message:"),l.createElement("div",{className:"mt-2"},l.createElement(eM,{message:r.messages().all()[0],showExamples:!0})))),l.createElement(eW,eU({},e)))},e$=function(e){var t,n,r=e.type,a=void 0===r?R.d2.SEND:r,s=e.operation,i=e.channelName,o=e.channel,c=L(),m=ew(),u=s.summary(),d=s.externalDocs(),p=s.id(),f=j(),g=f.version().localeCompare("2.6.0",void 0,{numeric:!0}),v=D.getOperationDesignInformation({type:a,config:c,isAsyncAPIv2:0===g}),y=v.backgroundColor,b=v.typeLabel;return l.createElement(l.Fragment,null,l.createElement("div",{className:"mb-4"},l.createElement("h3",null,l.createElement("span",{className:"font-mono text-white uppercase p-1 rounded mr-2 ".concat(y),title:a},b)," ",l.createElement("span",{className:"font-mono text-base"},i))),o.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,o.description())),u&&l.createElement("p",{className:"text-gray-600 text-sm mt-2"},u),s.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,s.description())),d&&l.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},d&&l.createElement("li",{className:"inline-block"},l.createElement(V,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:d.url()},l.createElement("span",null,h)))),p&&l.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},l.createElement("div",{className:"text-sm text-gray-700"},"Operation ID",l.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},p))),(null!=(n=null==(t=null==m?void 0:m.getComponentsForSlot(R.WN.OPERATION))?void 0:t.length)?n:0)>0&&l.createElement(eE,{context:{slot:R.WN.OPERATION,document:f,operation:s,channel:o,channelName:i,type:a,schema:e},pluginManager:m}))},eW=function(e){var t,n=e.type,r=void 0===n?R.d2.SEND:n,a=e.operation,s=(0,l.useState)(!1),i=s[0],o=s[1],c=(0,l.useState)(!1),m=c[0],u=c[1];if(r!==R.d2.REPLY&&r!==R.d2.REQUEST)return l.createElement(l.Fragment,null);var d=a.reply();if(void 0===d)return l.createElement(l.Fragment,null);var p=d.messages(),h=d.channel(),f=null==(t=d.address())?void 0:t.location();return l.createElement("div",{className:"panel-item"},l.createElement("div",{className:"panel-item--center"},l.createElement("div",{className:"font-mono px-8 py-4"},l.createElement("div",{className:"border rounded"},l.createElement("div",{className:"w-full ".concat(r===R.d2.REPLY?"bg-green-600 border-green-600":"bg-blue-600 border-blue-600"," text-sm rounded-t h-8 px-4 border text-white flex items-center")},l.createElement("strong",null,"REPLY INFORMATION")),l.createElement("div",{className:"flex"},l.createElement("div",{className:"w-1 h-11 ".concat(r===R.d2.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),l.createElement("div",{className:"p-4"},l.createElement("h3",{className:"text-xs"},l.createElement("span",{className:"mr-2",title:r},"REPLY CHANNEL INFORMATION")),(null==h?void 0:h.address())?l.createElement("div",{className:"text-xs text-gray-700"},"Reply will be provided via this designated address:"," ",l.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},h.address()," ")):null!=f&&l.createElement("div",{className:"text-xs text-gray-700"},"Reply will be directed to the address specified at this location:"," ",l.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},f)),l.createElement("div",{className:"mt-2"},h&&l.createElement(P,{onClick:function(){return u(function(e){return!e})},expanded:m},l.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"View channel details")),h&&l.createElement("div",{className:"w-full mt-4 ".concat(m?"block":"hidden")},l.createElement(eH,eU({},e))," ")))),l.createElement(eV,eU({},e)),!1===p.isEmpty()&&l.createElement("div",{className:"p-4"},l.createElement(P,{onClick:function(){return o(function(e){return!e})},expanded:i},l.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"Expected Reply"," ",p.length>1?"Messages":"Message")),l.createElement("div",{className:"w-full mt-4 ".concat(i?"block":"hidden")},p.length>1?l.createElement("div",{className:"mt-2"},l.createElement("ul",null,p.all().map(function(e,t){return l.createElement("li",{className:"mt-4",key:e.id()},l.createElement(eM,{message:e,index:t,showExamples:!0}))}))):l.createElement("div",{className:"mt-2"},l.createElement("div",{className:"mt-2"},l.createElement(eM,{message:p.all()[0],showExamples:!0}))))))),l.createElement(ex,{name:"Operation Reply Extensions",item:d})))},eH=function(e){var t,n=e.type,r=void 0===n?R.d2.SEND:n,a=e.operation.reply(),s=null==a?void 0:a.channel(),i=null!=(t=null==s?void 0:s.address())?t:"",o=L(),c="function"==typeof(null==s?void 0:s.servers)&&s.servers().all(),m=(null==s?void 0:s.parameters())!==void 0?em.parametersToSchema(s.parameters()):void 0;return s?l.createElement("div",null,s.address()&&l.createElement("div",{className:"mt-2 text-xs text-gray-700"},"Address:"," ",l.createElement("span",{className:"border text-orange-600 rounded text-xs py-0 px-2"},s.address())),s.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,s.description())),l.createElement(eq,{servers:c||[],config:o,relativePathname:e_}),s.messages().all().length>1?l.createElement("div",{className:"mt-2"},l.createElement("span",{className:"text-xs text-gray-700"},"Messages:"),l.createElement("ul",null,s.messages().all().map(function(e,t){return l.createElement("li",{className:"mt-4",key:e.id()},l.createElement(eM,{message:e,index:t,showExamples:!0}))}))):l.createElement("div",{className:"mt-2"},l.createElement("span",{className:"text-xs text-gray-700"},"Message:"),l.createElement("div",{className:"mt-2"},l.createElement(eM,{message:s.messages().all()[0],showExamples:!0}))),m&&l.createElement("div",{className:"mt-2",id:D.getIdentifier("operation-".concat(r,"-").concat(i,"-parameters"),o)},l.createElement(eb,{schemaName:"Parameters",schema:m,expanded:!0})),s.bindings()&&l.createElement("div",{className:"mt-2"},l.createElement(eO,{name:"Bindings",bindings:s.bindings()}))):l.createElement(l.Fragment,null)},eV=function(e){var t=e.type,n=void 0===t?R.d2.SEND:t,r=e.operation;if(n!==R.d2.REPLY&&n!==R.d2.REQUEST)return l.createElement(l.Fragment,null);var a=r.reply();if(!(null==a?void 0:a.address))return l.createElement(l.Fragment,null);var s=a.address();if(!s)return l.createElement(l.Fragment,null);var i=s.location();return l.createElement("div",{className:"flex"},l.createElement("div",{className:"w-1 h-11 ".concat(n===R.d2.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),l.createElement("div",{className:"p-4"},l.createElement("h3",{className:"text-xs"},l.createElement("span",{className:"mr-2 uppercase",title:n},"REPLY address information")),i&&l.createElement("div",{className:"text-xs text-gray-700"},"REPLY will be sent to the address provided in:",l.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},i)),s.hasDescription()&&l.createElement("div",{className:"mt-2"},l.createElement(er,null,s.description())),l.createElement(ex,{name:"Operation Reply Address Extensions",item:a})))},eY=function(){var e=j().operations().all(),t=L();if(!Object.keys(e).length)return null;var n=e.map(function(e){var n,r=e.channels().all()[0],a=null!=(n=null==r?void 0:r.address())?n:"",s=D.getOperationIdentifier({operation:e,config:t}),i=D.getOperationType(e);return l.createElement("li",{className:"mb-12",key:"".concat(i,"-").concat(e.id()),id:s},l.createElement(ez,{type:i,operation:e,channelName:a,channel:r}))});return l.createElement("section",{id:"".concat(D.getIdentifier("operations",t)),className:"mt-16"},l.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Operations"),l.createElement("ul",null,n))},eK=function(){var e=j(),t=L(),n=!e.components().isEmpty()&&e.components().messages().all();return n&&0!==n.length?l.createElement("section",{id:"".concat(D.getIdentifier("messages",t)),className:"mt-16"},l.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Messages"),l.createElement("ul",null,n.map(function(e,n){var r,a;return l.createElement("li",{className:"mb-4",key:e.id(),id:D.getIdentifier("message-".concat(e.id()),t)},l.createElement(eM,{messageName:e.id(),message:e,index:n+1,key:e.id(),showExamples:null!=(a=null==(r=null==t?void 0:t.show)?void 0:r.messageExamples)&&a}))}))):null},eB=function(e){var t=e.schemaName,n=e.schema;return n?l.createElement("div",null,l.createElement("div",{className:"panel-item--center px-8"},l.createElement("div",{className:"shadow rounded px-4 py-2 border bg-gray-200"},l.createElement(eb,{schemaName:t,schema:n}))),l.createElement("div",{className:"w-full mt-4"})):null},eG=function(){var e=j(),t=L(),n=!e.components().isEmpty()&&e.components().schemas().all();return n&&0!==n.length?l.createElement("section",{id:"".concat(D.getIdentifier("schemas",t)),className:"mt-16"},l.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Schemas"),l.createElement("ul",null,n.map(function(e){return l.createElement("li",{className:"mb-4",key:e.id(),id:D.getIdentifier("schema-".concat(e.id()),t)},l.createElement(eB,{schemaName:e.id(),schema:e}))}))):null},eQ=n(14266),eJ=function(e){var t=e.error;if(!t)return null;var n=t.title,r=t.validationErrors;return l.createElement("div",{className:"panel-item"},l.createElement("div",{className:"panel-item--center p-8"},l.createElement("section",{className:"shadow rounded bg-gray-200 border-red-500 border-l-8"},l.createElement("h2",{className:"p-2"},n?"".concat(b,": ").concat(n):b),(null==r?void 0:r.length)?l.createElement("div",{className:"bg-gray-800 text-white text-xs p-2"},l.createElement("pre",null,r?r.map(function(e,t){var n,r,a,s,i;return(null==e?void 0:e.title)?l.createElement("div",{key:t,className:"flex gap-2"},(null!=(r=null==(n=null==e?void 0:e.location)?void 0:n.startLine)?r:null==(a=null==e?void 0:e.location)?void 0:a.startOffset)&&l.createElement("span",null,"line ".concat((null==(s=null==e?void 0:e.location)?void 0:s.startLine)+(null==(i=null==e?void 0:e.location)?void 0:i.startOffset),":")),l.createElement("code",{className:"whitespace-pre-wrap break-all ml-2"},e.title)):null}).filter(Boolean):null)):null)),l.createElement("div",{className:"panel-item--right"}))};function eX(e){var t=e.error,n={title:"Something went wrong",type:"application-error",validationErrors:[{title:null==t?void 0:t.message}]};return l.createElement(eJ,{error:n})}let eZ=function(e){var t=e.children,n=(0,l.useState)(0),r=n[0],a=n[1];return(0,l.useEffect)(function(){a(function(e){return e+1})},[t]),l.createElement(eQ.tH,{key:r,fallbackRender:eX},t)},e0=function(e){var t,n,r=e.asyncapi,a=e.config,s=e.pluginManager,i=(0,l.useState)("container:xl"),o=i[0],c=i[1],m=(0,S.w)({onResize:function(e){var t=e.width;requestAnimationFrame(function(){if(void 0!==t){var e=t<=1536?"container:xl":"container:base";e!==o&&c(e)}})}}).ref,u=null!=(t=a.show)?t:{};return l.createElement(T.Provider,{value:a},l.createElement(A.Provider,{value:r},l.createElement(eN.Provider,{value:s},l.createElement("section",{className:"aui-root"},l.createElement(eZ,null,l.createElement("div",{className:"".concat(o," relative md:flex bg-white leading-normal"),id:null!=(n=a.schemaID)?n:void 0,ref:m},u.sidebar&&l.createElement(F,null),l.createElement("div",{className:"panel--center relative py-8 flex-1"},l.createElement("div",{className:"relative z-10"},u.info&&l.createElement(ek,null),u.servers&&l.createElement(eA,null),u.operations&&l.createElement(eY,null),u.messages&&l.createElement(eK,null),u.schemas&&l.createElement(eG,null)),l.createElement("div",{className:"panel--right absolute top-0 right-0 h-full bg-gray-800"}))))))))};var e1=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},e2=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},e3=function(){function e(e){this.plugins=new Map,this.pendingInstalls=new Map,this.cancelledInstalls=new Set,this.pendingUninstalls=new Map,this.destroyed=!1,this.slotComponents=new Map,this.eventListeners=new Map,this.context=e}return e.prototype.register=function(e){return e1(this,void 0,void 0,function(){var t,n,r,a,s,i,o,l,c,m;return e2(this,function(u){switch(u.label){case 0:if(!(t=this.pendingUninstalls.get(e.name)))return[3,2];return[4,t];case 1:u.sent(),u.label=2;case 2:if(this.destroyed)return console.warn("Plugin manager has been destroyed"),[2,!1];if(this.plugins.has(e.name)||this.pendingInstalls.has(e.name))return console.warn("Plugin ".concat(e.name," is already registered")),[2,!1];n=[],r={active:!0},a=new AbortController,i=new Promise(function(e){s=e}),o=this.createPluginAPI(e,n,function(){return r.active},a.signal),l={plugin:e,api:o,listeners:n,state:r,controller:a,completion:i,resolveCompletion:s},this.pendingInstalls.set(e.name,l),u.label=3;case 3:return u.trys.push([3,5,8,9]),[4,e.install(o)];case 4:return u.sent(),[3,9];case 5:if(c=u.sent(),m=this.cancelledInstalls.delete(e.name),l.state.active=!1,l.controller.abort(),this.removePluginComponents(e.name),this.removePluginListeners(l),!m)return[3,7];return[4,this.trackUninstall(l)];case 6:case 10:return u.sent(),l.resolveCompletion(),[2,!1];case 7:return console.error("Failed to register plugin ".concat(e.name,":"),c),this.emit(E,{pluginName:e.name,message:c instanceof Error?c.message:String(c),timestamp:new Date().toISOString()}),l.resolveCompletion(),[2,!1];case 8:return this.pendingInstalls.delete(e.name),[7];case 9:if(!this.cancelledInstalls.has(e.name))return[3,11];return this.cancelledInstalls.delete(e.name),this.removePluginComponents(e.name),this.removePluginListeners(l),[4,this.trackUninstall(l)];case 11:return this.plugins.set(e.name,l),this.emit(x,{pluginName:e.name,message:"Plugin registered successfully",timestamp:new Date().toISOString()}),l.resolveCompletion(),[2,!0]}})})},e.prototype.unregister=function(e){var t=this.plugins.get(e),n=this.pendingInstalls.get(e);if(!t&&!n){var r=this.pendingUninstalls.get(e);return r||(console.warn('Plugin "'.concat(e,'" not found')),Promise.resolve())}return(n&&(n.state.active=!1,n.controller.abort(),this.removePluginListeners(n),this.cancelledInstalls.add(e)),t&&(t.state.active=!1,t.controller.abort()),this.plugins.delete(e),this.removePluginComponents(e),t)?(this.removePluginListeners(t),this.trackUninstall(t)):n.completion},e.prototype.destroy=function(){return e1(this,void 0,void 0,function(){var e,t=this;return e2(this,function(n){switch(n.label){case 0:return this.destroyed=!0,this.pendingInstalls.forEach(function(e,n){e.state.active=!1,e.controller.abort(),t.cancelledInstalls.add(n)}),e=new Set(Array.from(this.pendingInstalls.values(),function(e){return e.completion})),Array.from(this.plugins.keys()).forEach(function(n){e.add(t.unregister(n))}),this.pendingUninstalls.forEach(function(t){return e.add(t)}),this.slotComponents.clear(),[4,Promise.all(Array.from(e))];case 1:return n.sent(),this.eventListeners.clear(),[2]}})})},e.prototype.runUninstall=function(e){return e1(this,void 0,void 0,function(){var t,n,r;return e2(this,function(a){switch(a.label){case 0:if(t=e.plugin,n=e.api,e.state.active=!1,e.controller.abort(),!t.uninstall)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,t.uninstall(n)];case 2:return a.sent(),[3,4];case 3:return r=a.sent(),console.error("Failed to uninstall plugin ".concat(t.name,":"),r),this.emit(E,{pluginName:t.name,message:r instanceof Error?r.message:String(r),timestamp:new Date().toISOString()}),[3,4];case 4:return[2]}})})},e.prototype.trackUninstall=function(e){var t=this,n=e.plugin.name,r=this.runUninstall(e);return this.pendingUninstalls.set(n,r),r.finally(function(){t.pendingUninstalls.get(n)===r&&t.pendingUninstalls.delete(n)}),r},e.prototype.removePluginListeners=function(e){var t=this;e.listeners.forEach(function(e){var n=e.eventName,r=e.callback;t.off(n,r)}),e.listeners.length=0},e.prototype.removePluginComponents=function(e){this.slotComponents.forEach(function(t){for(var n=t.length;n--;)t[n].pluginName===e&&t.splice(n,1)})},e.prototype.createPluginAPI=function(e,t,n,r){var a=this;return{signal:r,registerComponent:function(t,r,s){if(void 0===s&&(s={}),n()){a.slotComponents.has(t)||a.slotComponents.set(t,[]);var i,o=null!=(i=s.priority)?i:100;a.slotComponents.get(t).push({component:r,priority:o,label:s.label,pluginName:null==e?void 0:e.name}),a.slotComponents.get(t).sort(function(e,t){return t.priority-e.priority})}},onSpecLoaded:function(e){n()&&(a.on(N,e),t.push({eventName:N,callback:e}),void 0!==a.context.schema&&e(a.context.schema))},getContext:function(){return a.context},on:function(e,r){n()&&(a.on(e,r),t.push({eventName:e,callback:r}))},off:function(e,n){a.off(e,n);var r=t.findIndex(function(t){return t.eventName===e&&t.callback===n});-1!==r&&t.splice(r,1)},emit:function(e,t){a.emit(e,t)}}},e.prototype.on=function(e,t){this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t)},e.prototype.off=function(e,t){var n=this.eventListeners.get(e);n&&(n.delete(t),0===n.size&&this.eventListeners.delete(e))},e.prototype.emit=function(e,t){var n=this.eventListeners.get(e);n&&Array.from(n).forEach(function(n){try{n(t)}catch(t){console.error('Plugin event listener failed for "'.concat(e,'":'),t)}})},e.prototype.listeners=function(e){var t=this.eventListeners.get(e);return t?Array.from(t):[]},e.prototype.eventNames=function(){return Array.from(this.eventListeners.keys())},e.prototype.getComponentsForSlot=function(e){var t;return(null!=(t=this.slotComponents.get(e))?t:[]).map(function(e){return e.component})},e.prototype.updateContext=function(e){this.context=e,void 0!==e.schema&&this.emit(N,e.schema)},e.prototype.getPlugin=function(e){var t;return null==(t=this.plugins.get(e))?void 0:t.plugin},e.prototype.listPlugins=function(){return Array.from(this.plugins.values()).map(function(e){var t=e.plugin;return{name:t.name,version:t.version}})},e}(),e6=(a=function(e,t){return(a=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}a(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),e4=function(){return(e4=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},e5=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},e7=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},e8=function(e){function t(t){var n=e.call(this,t)||this;n.registeredPlugins=new Set,n.propsPlugins=new Set,n.pendingPropsPlugins=new Set,n.pluginEventHandlers=new Map,n.hasMounted=!1,n.pluginManagerDestroyed=!1,n.mountGeneration=0,n.pluginUpdates=Promise.resolve(),n.state={asyncapi:void 0,error:void 0,pm:new e3({})};var r=d.retrieveParsedSpec(t.schema);return r&&(n.state=e4(e4({},n.state),{asyncapi:r})),n}return e6(t,e),t.prototype.componentDidMount=function(){var e=this;this.hasMounted=!0;var t=++this.mountGeneration,n=this.state.pm;(!n||this.pluginManagerDestroyed)&&(n=new e3({}),this.pluginManagerDestroyed=!1,this.registeredPlugins.clear(),this.propsPlugins.clear(),this.pendingPropsPlugins.clear(),this.setState({pm:n})),this.state.asyncapi?n.updateContext({schema:this.state.asyncapi}):this.updateState(this.props.schema,n);var r=function(){var r,a;e.hasMounted&&t===e.mountGeneration&&(null==(a=(r=e.props).onPluginManagerReady)||a.call(r,n),e.setupEventListeners(n),e.registerPlugins(n))};this.pluginManagerTeardown?this.pluginManagerTeardown.then(r):r()},t.prototype.componentDidUpdate=function(e){var t=this,n=this.props,r=n.schema,a=n.plugins,s=n.onPluginEvent;e.schema!==r&&this.updateState(r),s!==e.onPluginEvent&&(this.cleanupEventListeners(),this.setupEventListeners()),a!==e.plugins&&(this.pluginUpdates=this.pluginUpdates.then(function(){return t.updatePlugins(e.plugins,a)}))},t.prototype.componentWillUnmount=function(){this.hasMounted=!1,this.mountGeneration+=1,this.cleanupEventListeners(),this.pluginManagerDestroyed=!0;var e,t,n=null!=(t=null==(e=this.state.pm)?void 0:e.destroy())?t:Promise.resolve(),r=this.pluginManagerTeardown;this.pluginManagerTeardown=r?Promise.all([r,n]).then(function(){}):n},t.prototype.render=function(){var e,t=this.props,n=t.config,r=t.error,a=this.state,s=a.asyncapi,i=a.error,o=a.pm,c=null!=r?r:i,m=e4(e4(e4({},k),n),{show:e4(e4({},k.show),!!n&&n.show),expand:e4(e4({},k.expand),!!n&&n.expand),sidebar:e4(e4({},k.sidebar),!!n&&n.sidebar),extensions:e4(e4({},k.extensions),!!n&&n.extensions)});return s?l.createElement(e0,{asyncapi:s,config:m,pluginManager:o}):c?(null==(e=m.show)?void 0:e.errors)&&l.createElement("section",{className:"aui-root"},l.createElement(eJ,{error:c})):null},t.prototype.getOrCreateHandler=function(e){var t=this;return this.pluginEventHandlers.has(e)||this.pluginEventHandlers.set(e,function(n){var r,a;null==(a=(r=t.props).onPluginEvent)||a.call(r,e,n)}),this.pluginEventHandlers.get(e)},t.prototype.setupEventListeners=function(e){var t=this;void 0===e&&(e=this.state.pm),this.props.onPluginEvent&&w.forEach(function(n){null==e||e.on(n,t.getOrCreateHandler(n))})},t.prototype.cleanupEventListeners=function(e){var t=this;void 0===e&&(e=this.state.pm),w.forEach(function(n){null==e||e.off(n,t.getOrCreateHandler(n))})},t.prototype.registerPlugins=function(){return e5(this,arguments,void 0,function(e){var t,n,r,a,s,i,o;return void 0===e&&(e=this.state.pm),e7(this,function(l){switch(l.label){case 0:t=this.props.plugins,n=function(t){var n,a;return e7(this,function(s){switch(s.label){case 0:return r.pendingPropsPlugins.add(t.name),[4,null==e?void 0:e.register(t)];case 1:if(n=s.sent(),r.pendingPropsPlugins.delete(t.name),a=(null!=(o=r.props.plugins)?o:[]).some(function(e){return e===t}),!(n&&a&&r.hasMounted))return[3,2];return r.registeredPlugins.add(t.name),r.propsPlugins.add(t.name),[3,4];case 2:if(!n)return[3,4];return[4,null==e?void 0:e.unregister(t.name)];case 3:s.sent(),s.label=4;case 4:return[2]}})},r=this,a=0,s=null!=t?t:[],l.label=1;case 1:if(!(a<s.length))return[3,4];return i=s[a],[5,n(i)];case 2:l.sent(),l.label=3;case 3:return a++,[3,1];case 4:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.updatePlugins=function(e,t){return e5(this,void 0,void 0,function(){var n,r,a,s,i,o,l,c,m,u,d,p,h,f,g,v=this;return e7(this,function(y){switch(y.label){case 0:return n=this.state.pm,r=this.mountGeneration,a=new Map((null!=e?e:[]).map(function(e){return[e.name,e]})),s=new Map((null!=t?t:[]).map(function(e){return[e.name,e]})),i=Array.from(a.entries()).filter(function(e){var t=e[0],n=e[1];return s.get(t)!==n&&(v.propsPlugins.has(t)||v.pendingPropsPlugins.has(t))}),[4,this.unregisterPlugins(n,i.map(function(e){return e[0]}))];case 1:if(y.sent(),o=Array.from(s.entries()).filter(function(e){var t=e[0],n=e[1];return a.get(t)!==n}),!this.pluginManagerTeardown)return[3,3];return[4,this.pluginManagerTeardown];case 2:y.sent(),y.label=3;case 3:if(!this.hasMounted||r!==this.mountGeneration)return[2];l=function(e,t){var r,a;return e7(this,function(s){switch(s.label){case 0:if(!(null!=(f=c.props.plugins)?f:[]).some(function(e){return e===t}))return[2,"continue"];return c.pendingPropsPlugins.add(e),[4,null==n?void 0:n.register(t)];case 1:if(r=s.sent(),c.pendingPropsPlugins.delete(e),a=(null!=(g=c.props.plugins)?g:[]).some(function(e){return e===t}),!(r&&a))return[3,2];return c.registeredPlugins.add(e),c.propsPlugins.add(e),[3,4];case 2:if(!r)return[3,4];return[4,null==n?void 0:n.unregister(e)];case 3:s.sent(),s.label=4;case 4:return[2]}})},c=this,m=0,u=o,y.label=4;case 4:if(!(m<u.length))return[3,7];return p=(d=u[m])[0],h=d[1],[5,l(p,h)];case 5:y.sent(),y.label=6;case 6:return m++,[3,4];case 7:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.unregisterPlugins=function(e,t){return e5(this,void 0,void 0,function(){var n,r,a,s;return e7(this,function(i){switch(i.label){case 0:n=0,r=t,i.label=1;case 1:if(!(n<r.length))return[3,6];a=r[n],i.label=2;case 2:return i.trys.push([2,4,,5]),[4,null==e?void 0:e.unregister(a)];case 3:return i.sent(),this.registeredPlugins.delete(a),this.propsPlugins.delete(a),this.pendingPropsPlugins.delete(a),[3,5];case 4:return s=i.sent(),console.error("Failed to unregister plugin ".concat(a,":"),s),[3,5];case 5:return n++,[3,1];case 6:return[2]}})})},t.prototype.updateState=function(e,t){void 0===t&&(t=this.state.pm);var n=d.retrieveParsedSpec(e);n?(this.setState({asyncapi:n}),null==t||t.updateContext({schema:n})):this.setState({asyncapi:void 0})},t}(l.Component),e9=n(48877),te=n(21420),tt=n(90470),tn=n(2639),tr=n(5159),ta=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},ts=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},ti=new e9.i;ti.registerSchemaParser((0,tt.z)()),ti.registerSchemaParser((0,tr.dk)()),ti.registerSchemaParser((0,tn.y)());var to=function(){function e(){}return e.parse=function(e,t){return ta(this,void 0,void 0,function(){var n,r,a,s;return ts(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,ti.parse(e,t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0===r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.parseFromUrl=function(e,t){return ta(this,void 0,void 0,function(){var n,r,a,s;return ts(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,(0,te.o)(ti,e.url,e.requestOptions).parse(t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0==r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r,error:void 0}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.convertDiagnosticToErrorObject=function(e,t){var n={title:"There are errors in your Asyncapi document",type:"VALIDATION_ERRORS_TYPE",validationErrors:[]};return e.forEach(function(e){var r;if(t.includes(e.severity)){var a={title:e.message,location:{jsonPointer:"/"+e.path.join("/"),startLine:e.range.start.line,startColumn:e.range.start.character,startOffset:1,endLine:e.range.end.line,endColumn:e.range.end.character,endOffset:0}};null==(r=n.validationErrors)||r.push(a)}}),n},e.handleError=function(e){return e.type,{error:e}},e}(),tl=(s=function(e,t){return(s=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}s(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),tc=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{l(r.next(e))}catch(e){s(e)}}function o(e){try{l(r.throw(e))}catch(e){s(e)}}function l(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,o)}l((r=r.apply(e,t||[])).next())})},tm=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(o){return function(l){var c=[o,l];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},tu=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={asyncapi:void 0,error:void 0},t}return tl(t,e),t.prototype.componentDidMount=function(){return tc(this,void 0,void 0,function(){var e,t,n;return tm(this,function(r){switch(r.label){case 0:if(!this.props.schema)return[3,2];return t=(e=this.props).schema,n=e.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.componentDidUpdate=function(e){return tc(this,void 0,void 0,function(){var t,n;return tm(this,function(r){switch(r.label){case 0:if(e.schema===(t=this.props.schema))return[3,2];return n=this.props.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.render=function(){var e=this.props,t=e.schema,n=e.config,r=e.plugins,a=e.onPluginEvent,s=e.onPluginManagerReady,i=this.state,o=i.asyncapi,c=i.error;return l.createElement(e8,{schema:null!=o?o:t,config:n,error:c,plugins:r,onPluginEvent:a,onPluginManagerReady:s})},t.prototype.parseSchema=function(e,t){return tc(this,void 0,void 0,function(){var n,r,a;return tm(this,function(s){switch(s.label){case 0:if(n=d.retrieveParsedSpec(e))return this.setState({asyncapi:n}),[2];if(!(0,R.Ll)(e))return[3,2];return[4,to.parseFromUrl(e,t)];case 1:return r=s.sent(),this.setState({asyncapi:r.asyncapi,error:r.error}),[2];case 2:return[4,to.parse(e,t)];case 3:return a=s.sent(),this.setState({asyncapi:a.asyncapi,error:a.error}),[2]}})})},t}(l.Component),td=n(81535);let tp=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-0"})([""]),th=td.Ay.nav.withConfig({componentId:"sc-2c3b2ddd-1"})(["display:flex;flex-direction:row;flex-wrap:nowrap;width:100%;line-height:48px;padding:0;background-color:#263238;border-bottom:#607d8b 2px solid;"]),tf=td.Ay.header.withConfig({componentId:"sc-2c3b2ddd-2"})(["margin-left:16px;display:inline-block;"]),tg=td.Ay.h1.withConfig({componentId:"sc-2c3b2ddd-3"})(["color:#fff;margin:0;font-weight:bold;font-size:20px;line-height:48px;"]),tv=td.Ay.img.withConfig({componentId:"sc-2c3b2ddd-4"})(["height:34px;max-height:34px;margin-top:7px;float:left;"]),ty=td.Ay.span.withConfig({componentId:"sc-2c3b2ddd-5"})(["font-weight:bold;margin-left:12px;"]),tb=td.Ay.span.withConfig({componentId:"sc-2c3b2ddd-6"})(["font-style:italic;margin-left:6px;"]);td.Ay.a.withConfig({componentId:"sc-2c3b2ddd-7"})([""]);let tx=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-8"})(["background:rgb(38,50,56);"]),tE=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-9"})(["height:calc(100vh - 50px);min-height:calc(100vh - 50px);overflow:auto;> .asyncapi{padding:24px;}> .asyncapi__error{margin:24px;}"]),tN=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-10"})(["box-sizing:border-box;width:100%;height:100%;margin:0;font-family:sans-serif;font-weight:normal;"]),tw=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-11"})(["> .react-codemirror2 > .CodeMirror{height:100%;min-height:100%;}"]),tk=td.Ay.ul.withConfig({componentId:"sc-2c3b2ddd-12"})(["list-style:none;padding:0;margin:0 5px 15px;display:flex;justify-items:flex-start;flex-flow:row nowrap;"]),tS=td.Ay.li.withConfig({componentId:"sc-2c3b2ddd-13"})(["margin:0 0 0 auto;position:relative;display:inline-block;padding:19px 15px;"]),tC=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-14"})(["font-family:sans-serif;font-weight:700;color:#f77669;transition:0.2s all linear;opacity:",";animation-name:spin;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}"],e=>e.$show?"1":"0"),tI=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-15"})(["margin:0;padding:0 20px;font-size:14px;color:#515559;line-height:1.57;overflow:auto;height:calc(100vh - 117px);min-height:calc(100vh - 117px);"]),tO=td.Ay.li.withConfig({componentId:"sc-2c3b2ddd-16"})([""]),tP=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-17"})(["display:flex;align-items:center;margin:0 15px;padding:19px 0 15px;border:none;position:relative;color:",";font-size:14px;outline:none;transition:0.2s color linear;text-transform:uppercase;cursor:pointer;&:first-letter{text-transform:uppercase;}&:after{content:'';bottom:0;display:block;position:absolute;height:",";width:100%;border-radius:2px;background-color:#c3e88d;}&:hover{color:#c3e88d;&:after{content:'';bottom:0;display:block;position:absolute;height:3px;width:100%;border-radius:2px;background-color:#c3e88d;}}"],e=>e.$active?"#c3e88d":"#f77669",e=>e.$active?"3px":"0px"),tA=td.Ay.div.withConfig({componentId:"sc-2c3b2ddd-18"})(["display:flex;box-sizing:border-box;position:relative;margin-bottom:20px;"]),tj=td.Ay.input.withConfig({componentId:"sc-2c3b2ddd-19"})(["width:100%;padding:6px 12px;box-sizing:border-box;outline:none;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;transition:0.2s border,color linear;font-size:14px;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tT=td.Ay.button.withConfig({componentId:"sc-2c3b2ddd-20"})(["width:auto;padding:6px 12px;display:inline-block;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;font-size:14px;margin-left:12px;white-space:nowrap;transition:0.2s border,color linear;cursor:pointer;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tL=()=>(0,o.jsx)(th,{children:(0,o.jsx)(tf,{children:(0,o.jsxs)(tg,{children:[(0,o.jsx)(tv,{src:"https://avatars0.githubusercontent.com/u/16401334?v=4&s=200",alt:"AsyncAPI logo"}),(0,o.jsx)(ty,{children:"AsyncAPI React"}),(0,o.jsx)(tb,{children:"editor"})]})})});var tR=n(28824),tD=n(58772),tM=n(19540);class tq extends l.Component{componentDidUpdate(e){let{externalResource:t}=this.props;t&&e.externalResource!==t&&this.setState({code:t})}render(){let{state:{code:e}}=this;return(0,o.jsx)(tw,{children:(0,o.jsx)(tR.Ay,{value:e,basicSetup:{lineNumbers:!0,tabSize:2},theme:tM.El,extensions:[(0,tD.o)()],onChange:e=>{this.props.parentCallback(e)}})})}constructor(...e){super(...e),this.state={code:this.props.code}}}var tU=n(11716);let tF=e=>Array.isArray(e)?e.map(tF):e&&"object"==typeof e?Object.fromEntries(Object.entries(e).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>[e,tF(t)])):e,t_=async e=>fetch(e,{method:"GET"}).then(tz);function tz(e){return e.text().then(e=>e)}function t$(e,t,n,r){let a;return(...s)=>{a&&clearTimeout(a),n(),a=setTimeout(()=>{a=void 0,e(...s),r()},t||1e3)}}let tW=`{
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
}`;class tH extends l.Component{render(){let{link:e}=this.state;return(0,o.jsxs)(tA,{children:[(0,o.jsx)(tj,{value:e,placeholder:"Link for external schema",onChange:e=>this.setState({link:e.target.value})}),(0,o.jsx)(tT,{type:"button",onClick:this.fetchSchemaFromExternalResources,children:"Fetch schema"})]})}constructor(...e){super(...e),this.state={link:""},this.fetchSchemaFromExternalResources=async()=>{try{new URL(this.state.link)}catch(e){return}let{props:{parentCallback:e},state:{link:t}}=this;e(await t_(t))}}}var tV=n(98208);let tY=e=>(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(tV.A,{style:{width:"100%",height:"calc(100vh - 50px)",minHeight:"calc(100vh - 50px)",display:"flex",background:"#f3f4f5"},gutter:()=>{let e=document.createElement("div");return e.onmouseover=()=>e.style.cursor="ew-resize",e},gutterStyle:()=>({backgroundColor:"gray",width:"7px"}),minSize:250,children:e.children})});class tK extends l.Component{constructor(e){super(e),this.handleTabClick=e=>{this.setState({activeTabIndex:e})},this.renderHeader=e=>l.Children.map(e,(e,t)=>l.cloneElement(e,{title:e.props.title,parentCallback:this.handleTabClick,tabIndex:t,isActive:t===this.state.activeTabIndex})),this.renderActiveTab=e=>e[this.state.activeTabIndex]?e[this.state.activeTabIndex].props.children:null,this.state={activeTabIndex:this.props.defaultActiveTabIndex?this.props.defaultActiveTabIndex:0}}render(){let{additionalHeaderContent:e}=this.props,t=[].concat(...this.props.children).filter(e=>null!=e);return(0,o.jsxs)(tN,{children:[(0,o.jsxs)(tk,{children:[this.renderHeader(t),(0,o.jsx)(tS,{children:e})]}),(0,o.jsx)(tI,{children:this.renderActiveTab(t)})]})}}class tB extends l.Component{render(){let{title:e,tabIndex:t,isActive:n,parentCallback:r}=this.props;return(0,o.jsx)(tO,{children:(0,o.jsx)(tP,{onClick:e=>{e.preventDefault(),r&&void 0!=t&&r(t)},$active:n,children:e})},t)}}var tG=n(51736);let tQ=`asyncapi: '2.6.0'
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
`,tJ=`{
  "asyncapi": "3.0.0",
  "info": {
    "title": "Gemini Market Data Websocket API",
    "version": "1.0.0",
    "description": "Market data is a public API that streams all the market data on a given symbol.\\n\\nYou can quickly play with the API using [websocat](https://github.com/vi/websocat#installation) like this:\\n\`\`\`bash\\nwebsocat wss://api.gemini.com/v1/marketdata/btcusd?heartbeat=true -S\\n\`\`\`\\n",
    "contact": {
      "name": "Gemini",
      "url": "https://www.gemini.com/"
    },
    "externalDocs": {
      "url": "https://docs.sandbox.gemini.com/websocket-api/#market-data"
    }
  },
  "servers": {
    "public": {
      "host": "api.gemini.com",
      "protocol": "wss"
    }
  },
  "channels": {
    "/v1/marketdata/{symbol}": {
      "address": "/v1/marketdata/{symbol}",
      "messages": {
        "subscribe.message": {
          "$ref": "#/components/messages/marketData"
        }
      },
      "parameters": {
        "symbol": {
          "enum": [
            "btcusd",
            "ethbtc",
            "ethusd",
            "zecusd",
            "zecbtc",
            "zeceth",
            "zecbch",
            "zecltc",
            "bchusd",
            "bchbtc",
            "bcheth",
            "ltcusd",
            "ltcbtc",
            "ltceth",
            "ltcbch",
            "batusd",
            "daiusd",
            "linkusd",
            "oxtusd",
            "batbtc",
            "linkbtc",
            "oxtbtc",
            "bateth",
            "linketh",
            "oxteth",
            "ampusd",
            "compusd",
            "paxgusd",
            "mkrusd",
            "zrxusd",
            "kncusd",
            "manausd",
            "storjusd",
            "snxusd",
            "crvusd",
            "balusd",
            "uniusd",
            "renusd",
            "umausd",
            "yfiusd",
            "btcdai",
            "ethdai",
            "aaveusd",
            "filusd",
            "btceur",
            "btcgbp",
            "etheur",
            "ethgbp",
            "btcsgd",
            "ethsgd",
            "sklusd",
            "grtusd",
            "bntusd",
            "1inchusd",
            "enjusd",
            "lrcusd",
            "sandusd",
            "cubeusd",
            "lptusd",
            "bondusd",
            "maticusd",
            "injusd",
            "sushiusd"
          ],
          "description": "Symbols are formatted as CCY1CCY2 where prices are in CCY2 and quantities are in CCY1. To read more click [here](https://docs.sandbox.gemini.com/websocket-api/#symbols-and-minimums).\\n"
        }
      },
      "bindings": {
        "ws": {
          "bindingVersion": "0.1.0",
          "query": {
            "type": "object",
            "description": "The semantics of entry type filtering is:\\n\\nIf any entry type is specified as true or false, all of them must be explicitly flagged true to show up in the response\\nIf no entry types filtering parameters are included in the url, then all entry types will appear in the response\\n\\nNOTE: top_of_book has no meaning and initial book events are empty when only trades is specified\\n",
            "properties": {
              "heartbeat": {
                "type": "boolean",
                "default": false,
                "description": "Optionally add this parameter and set to true to receive a heartbeat every 5 seconds"
              },
              "top_of_book": {
                "type": "boolean",
                "default": false,
                "description": "If absent or false, receive full order book depth; if present and true, receive top of book only. Only applies to bids and offers."
              },
              "bids": {
                "type": "boolean",
                "default": true,
                "description": "Include bids in change events"
              },
              "offers": {
                "type": "boolean",
                "default": true,
                "description": "Include asks in change events"
              },
              "trades": {
                "type": "boolean",
                "default": true,
                "description": "Include trade events"
              },
              "auctions": {
                "type": "boolean",
                "default": true,
                "description": "Include auction events"
              }
            }
          }
        }
      }
    }
  },
  "operations": {
    "/v1/marketdata/{symbol}.subscribe": {
      "action": "send",
      "channel": {
        "$ref": "#/channels/~1v1~1marketdata~1{symbol}"
      },
      "summary": "Receive market updates on a given symbol",
      "messages": [
        {
          "$ref": "#/components/messages/marketData"
        }
      ]
    }
  },
  "components": {
    "messages": {
      "marketData": {
        "summary": "Message with marked data information.",
        "description": "The initial response message will show the existing state of the order book. Subsequent messages will show all executed trades, as well as all other changes to the order book from orders placed or canceled.\\n",
        "payload": {
          "$ref": "#/components/schemas/market"
        },
        "examples": [
          {
            "name": "updateMessage",
            "summary": "Example of an update message that contains a change in price information.",
            "payload": {
              "type": "update",
              "eventId": 36902233362,
              "timestamp": 1619769673,
              "timestampms": 1619769673527,
              "socket_sequence": 661,
              "events": [
                {
                  "type": "change",
                  "side": "bid",
                  "price": "54350.40",
                  "remaining": "0.002",
                  "delta": "0.002",
                  "reason": "place"
                }
              ]
            }
          },
          {
            "name": "heartbeatMessage",
            "summary": "Example of additional heartbeat message when you enable them.",
            "payload": {
              "type": "heartbeat",
              "socket_sequence": 1656
            }
          }
        ]
      }
    },
    "schemas": {
      "market": {
        "type": "object",
        "oneOf": [
          {
            "$ref": "#/components/schemas/heartbeat"
          },
          {
            "$ref": "#/components/schemas/update"
          }
        ]
      },
      "heartbeat": {
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "const": "heartbeat"
              }
            },
            "required": [
              "type"
            ]
          },
          {
            "$ref": "#/components/schemas/default"
          }
        ]
      },
      "update": {
        "allOf": [
          {
            "properties": {
              "type": {
                "type": "string",
                "const": "update"
              },
              "eventId": {
                "type": "integer",
                "description": "A monotonically increasing sequence number indicating when this change occurred. These numbers are persistent and consistent between market data connections."
              },
              "events": {
                "$ref": "#/components/schemas/events"
              },
              "timestamp": {
                "type": "integer",
                "description": "The timestamp in seconds for this group of events (included for compatibility reasons). We recommend using the timestampms field instead."
              },
              "timestampms": {
                "type": "integer",
                "description": "The timestamp in milliseconds for this group of events."
              }
            },
            "required": [
              "type",
              "eventId",
              "events",
              "timestamp",
              "timestampms"
            ]
          },
          {
            "$ref": "#/components/schemas/default"
          }
        ]
      },
      "default": {
        "type": "object",
        "description": "This object is always part of the payload. In case of type=heartbeat, these are the only fields.",
        "required": [
          "type",
          "socket_sequence"
        ],
        "properties": {
          "socket_sequence": {
            "type": "integer",
            "description": "zero-indexed monotonic increasing sequence number attached to each message sent - if there is a gap in this sequence, you have missed a message. If you choose to enable heartbeats, then heartbeat and update messages will share a single increasing sequence. See [Sequence Numbers](https://docs.sandbox.gemini.com/websocket-api/#sequence-numbers) for more information."
          }
        }
      },
      "events": {
        "type": "array",
        "description": "Either a change to the order book, or the indication that a trade has occurred.",
        "items": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "type": {
              "type": "string",
              "enum": [
                "trade",
                "change",
                "auction, block_trade"
              ]
            },
            "price": {
              "type": "string",
              "description": "The price of this order book entry."
            },
            "side": {
              "type": "string",
              "enum": [
                "bid",
                "side"
              ]
            },
            "reason": {
              "type": "string",
              "enum": [
                "place",
                "trade",
                "cancel",
                "initial"
              ],
              "description": "Indicates why the change has occurred. initial is for the initial response message, which will show the entire existing state of the order book."
            },
            "remaining": {
              "type": "string",
              "description": "The quantity remaining at that price level after this change occurred. May be zero if all orders at this price level have been filled or canceled."
            },
            "delta": {
              "type": "string",
              "description": "The quantity changed. May be negative, if an order is filled or canceled. For initial messages, delta will equal remaining."
            }
          }
        }
      }
    }
  }
}`;class tX extends l.Component{constructor(e){super(e),this.state={schema:tQ,config:tW,schemaFromExternalResource:"",refreshing:!1},this.updateSchema=e=>{this.setState({schema:e})},this.updateSchemaFromExternalResource=e=>{this.setState({schemaFromExternalResource:e})},this.updateConfig=e=>{this.setState({config:e})},this.startRefreshing=()=>{setTimeout(()=>{this.setState({refreshing:!0})},500)},this.stopRefreshing=()=>{this.setState({refreshing:!1})},this.updateSchemaFn=t$(this.updateSchema,750,this.startRefreshing,this.stopRefreshing),this.updateConfigFn=t$(this.updateConfig,750,this.startRefreshing,this.stopRefreshing)}componentDidMount(){"websocket"===new URLSearchParams(window.location.search).get("spec")&&this.setState({schema:tJ})}render(){let{schema:e,config:t,schemaFromExternalResource:n}=this.state,r=(e=>{if(!e)return{};try{return JSON.parse(e)}catch(e){return{}}})(t||tW),a=this.getWebSocketPlugins(e);return(0,o.jsxs)(tp,{children:[(0,o.jsx)(tL,{}),(0,o.jsxs)(tY,{children:[(0,o.jsx)(tx,{children:(0,o.jsxs)(tK,{additionalHeaderContent:(0,o.jsx)(tC,{$show:this.state.refreshing,children:""}),children:[(0,o.jsx)(tB,{title:"Schema",children:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(tH,{parentCallback:this.updateSchemaFromExternalResource}),(0,o.jsx)(tq,{code:e,externalResource:n,parentCallback:this.updateSchemaFn},"Schema")]})},"Schema"),(0,o.jsx)(tB,{title:"Configuration",children:(0,o.jsx)(tq,{code:t,parentCallback:this.updateConfigFn},"Configuration")},"Configuration")]})}),(0,o.jsx)(tE,{children:(0,o.jsx)(tu,{schema:e,config:r,plugins:a,onPluginEvent:(e,t)=>console.info("[plugin]",e,t)})})]})]})}getWebSocketPlugins(e){let t=(e=>{if(e)try{let t=(0,tU.qg)(e),n=t?.servers??{};if(!Object.values(n).some(e=>{let t;return t=e?.protocol,"ws"===t||"wss"===t}))return;return JSON.stringify(Object.entries(n).map(([e,t])=>[e,tF(t)]))}catch{return}})(e);if(!t){this.websocketServerFingerprint=void 0,this.websocketPlugins=void 0;return}return t!==this.websocketServerFingerprint&&(this.websocketServerFingerprint=t,this.websocketPlugins=[(0,tG.Ww)()]),this.websocketPlugins}}let tZ=tX},29342:()=>{},37376:(e,t,n)=>{Promise.resolve().then(n.bind(n,9257))},43966:()=>{},48608:()=>{},86031:(e,t,n)=>{"use strict";var r,a,s,i;function o(e){return void 0!==e.url}n.d(t,{Ll:()=>o,WN:()=>a,d2:()=>r}),(s=r||(r={})).SEND="send",s.RECEIVE="receive",s.REQUEST="request",s.REPLY="reply",(i=a||(a={})).OPERATION="operation",i.INFO="info"},87899:()=>{},96172:()=>{},99154:()=>{}},e=>{e.O(0,[61,929,163,248,450,391,965,968,347,158,358],()=>e(e.s=37376)),_N_E=e.O()}]);