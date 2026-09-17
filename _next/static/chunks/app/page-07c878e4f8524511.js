(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{29342:()=>{},37376:(e,t,n)=>{Promise.resolve().then(n.bind(n,45546))},43966:()=>{},45546:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>tJ});var r,a,s,i,l,o,c,m,u=n(73365);n(48608);var d=n(1521),p=n(66977),h=n(25357),f=n(98082),g=function(){function e(){}return e.retrieveParsedSpec=function(e){if(e){if((0,p.Mr)(e))return e;if((0,p.n6)(e)){var t=e.json();return(0,p.BS)(t)}if("string"==typeof e)try{e=JSON.parse(e)}catch(e){return}return(0,f.isStringifiedDocument)(e)?(0,h.rS)(e):(0,p.BS)(e)}},e.containTags=function(e,t){var n="function"==typeof e.tags?e.tags():void 0;if(void 0===n||!Array.isArray(n))return!1;var r=Array.isArray(t)?t:[t];return n.some(function(e){return r.some(function(t){return t.name()===e.name()})})},e.operationsTags=function(e){var t=new Map;return Object.entries(e.operations().all()).forEach(function(e){var n=e[1];(null==n?void 0:n.tags().length)>0&&n.tags().all().forEach(function(e){return t.set(e.name(),e)})}),Array.from(t.values())},e.serversTags=function(e){var t={};return Object.entries(e.servers()).forEach(function(e){var n=e[0],r=e[1];r.tags().length>0&&r.tags().all().forEach(function(e){t[e.name()]?t[e.name()].push(n):t[e.name()]=[n]})}),t},e}(),v="https://www.iana.org/assignments/media-types",y="External Docs",x="SEND",b="RECEIVE",E="REQUEST",N="REPLY",w="Error",k="plugin:ready",S="plugin:error",C="specLoaded",I=[k,S],O={schemaID:"",show:{sidebar:!1,info:!0,servers:!0,operations:!0,messages:!0,messageExamples:!1,schemas:!0,errors:!0},expand:{messageExamples:!1},sidebar:{showServers:"byDefault",showOperations:"byDefault"},publishLabel:"PUB",subscribeLabel:"SUB",sendLabel:x,receiveLabel:b,requestLabel:E,replyLabel:N,extensions:{"x-x":function(e){var t=e.propertyValue;return d.createElement("a",{title:"https://x.com/".concat(t),style:{display:"inline-block"},href:"https://x.com/".concat(t),rel:"noopener noreferrer",target:"_blank"},d.createElement("svg",{style:{cursor:"pointer"},width:"15px",height:"15px",viewBox:"0 0 1200 1227",fill:"none",xmlns:"http://www.w3.org/2000/svg"},d.createElement("path",{d:"M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z",fill:"black"})))}}},A=n(8789),P=function(){return(P=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},j=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&0>t.indexOf(r)&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols)for(var a=0,r=Object.getOwnPropertySymbols(e);a<r.length;a++)0>t.indexOf(r[a])&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]]);return n},T=function(e){return void 0===e&&(e={}),d.createElement("svg",P({stroke:"currentColor",fill:"currentColor",strokeWidth:"0",viewBox:"0 0 20 20",height:"1em",width:"1em",xmlns:"http://www.w3.org/2000/svg"},e),d.createElement("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"}))},R=function(e){var t,n,r=e.chevronProps,a=e.expanded,s=e.children,i=j(e,["chevronProps","expanded","children"]);return d.createElement("button",P({},i,{className:"focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ".concat(null!=(t=i.className)?t:""),type:"button"}),d.createElement("div",{className:"inline-block"},s),d.createElement(T,P({},r,{className:"inline-block align-baseline cursor-pointer ml-0.5 -mb-1 w-5 h-5 transform transition-transform duration-150 ease-linear ".concat(void 0!==a&&a?"-rotate-90":""," ").concat(null!=(n=null==r?void 0:r.className)?n:"")})))},L=d.createContext(null);function D(){return(0,d.useContext)(L)}var M=(0,d.createContext)({});function U(){return(0,d.useContext)(M)}(r=o||(o={})).SEND="send",r.RECEIVE="receive",r.REQUEST="request",r.REPLY="reply",(a=c||(c={})).OPERATION="operation",a.INFO="info";var F=function(){function e(){}return e.getIdentifier=function(e,t){var n=null==t?void 0:t.schemaID;return n?"".concat(n,"-").concat(e):e},e.getOperationType=function(e){if(e.isSend())if(void 0!==e.reply())return o.REQUEST;else return o.SEND;return e.isReceive()&&void 0!==e.reply()?o.REPLY:o.RECEIVE},e.getOperationIdentifier=function(t){var n=t.operation,r=t.config;if(n.isSend())if(void 0!==n.reply())return e.getIdentifier("operation-".concat(o.REQUEST,"-").concat(n.id()),r);else return e.getIdentifier("operation-".concat(o.SEND,"-").concat(n.id()),r);return n.isReceive()&&void 0!==n.reply()?e.getIdentifier("operation-".concat(o.REPLY,"-").concat(n.id()),r):e.getIdentifier("operation-".concat(o.RECEIVE,"-").concat(n.id()),r)},e.getOperationDesignInformation=function(e){var t,n,r,a,s,i,l=e.type,c=e.config,m=e.isAsyncAPIv2;return l===o.RECEIVE?{borderColor:"border-green-600 text-green-600",backgroundColor:"bg-green-600",typeLabel:m?null!=(n=c.publishLabel)?n:"PUB":null!=(t=c.receiveLabel)?t:b}:l===o.REPLY?{borderColor:"border-orange-600 text-orange-600",backgroundColor:"bg-orange-600",typeLabel:null!=(r=c.replyLabel)?r:N}:l===o.REQUEST?{borderColor:"border-red-600 text-red-600",backgroundColor:"bg-red-600",typeLabel:null!=(a=c.requestLabel)?a:E}:{borderColor:"border-blue-600 text-blue-500",backgroundColor:"bg-blue-600",typeLabel:m?null!=(i=c.subscribeLabel)?i:"SUB":null!=(s=c.sendLabel)?s:x}},e}();function q(e,t){var n=new Set,r=new Map;e.forEach(function(e){var a=[];t.forEach(function(t){var r;(null!=(r=t.tags.all())?r:[]).map(function(e){return e.name()}).includes(e)&&(a.push(t),n.add(t))}),a.length>0&&r.set(e,a)});var a=[];return t.forEach(function(e){n.has(e)||a.push(e)}),{tagged:r,untagged:a}}var z=function(){return(z=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},_=d.createContext({setShowSidebar:function(e){return e}}),H=function(){var e,t,n,r=(0,d.useState)(!1),a=r[0],s=r[1],i=D(),l=U(),o=i.info(),c=null==(e=o.extensions().get("x-logo"))?void 0:e.value(),m=i.components(),u=null==m?void 0:m.messages().all(),p=null==m?void 0:m.schemas().all(),h=i.operations().length>0,f=null==(t=l.show)?void 0:t.messages,g=null==(n=l.show)?void 0:n.schemas,v=(null==u?void 0:u.length)>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#messages",onClick:function(){return s(!1)}},"Messages"),d.createElement("ul",{className:"text-sm mt-2"},u.map(function(e,t){var n,r;return d.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.name())?n:t)},d.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#message-".concat(null!=(r=e.name())?r:e.id()),onClick:function(){return s(!1)}},d.createElement("div",{className:"break-all inline-block"},e.id())))}))),y=(null==p?void 0:p.length)>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#schemas",onClick:function(){return s(!1)}},"Schemas"),d.createElement("ul",{className:"text-sm mt-2"},p.map(function(e,t){var n;return d.createElement("li",{key:"menu-message-list-".concat(null!=(n=e.id())?n:t)},d.createElement("a",{className:"flex break-words no-underline text-gray-700 mt-2 hover:text-gray-900",href:"#schema-".concat(e.id()),onClick:function(){return s(!1)}},d.createElement("div",{className:"break-all inline-block"},e.id())))}))),x=h&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#operations",onClick:function(){return s(!1)}},"Operations"),d.createElement(W,null));return d.createElement(_.Provider,{value:{setShowSidebar:s}},d.createElement("div",{className:"burger-menu rounded-full h-16 w-16 bg-white fixed bottom-16 right-8 flex items-center justify-center z-30 cursor-pointer shadow-md bg-teal-500",onClick:function(){return s(function(e){return!e})},"data-lol":a},d.createElement("svg",{viewBox:"0 0 100 70",width:"40",height:"30",className:"fill-current text-gray-200"},d.createElement("rect",{width:"100",height:"10"}),d.createElement("rect",{y:"30",width:"100",height:"10"}),d.createElement("rect",{y:"60",width:"100",height:"10"}))),d.createElement("div",{className:"".concat(a?"block fixed w-full":"hidden"," sidebar relative w-64 max-h-screen h-full bg-gray-200 shadow z-20")},d.createElement("div",{className:"".concat(a?"sidebar--wrapper":""," block fixed max-h-screen h-full font-sans px-4 pt-8 pb-16 overflow-y-auto bg-gray-200")},d.createElement("div",{className:"sidebar--content"},d.createElement("div",null,c?d.createElement("img",{src:c,alt:"".concat(o.title()," logo, ").concat(o.version()," version")}):d.createElement("h1",{className:"text-2xl font-light"},o.title()," ",o.version())),d.createElement("ul",{className:"text-sm mt-10 relative"},d.createElement("li",{className:"mb-3"},d.createElement("a",{className:"text-gray-700 no-underline hover:text-gray-900",href:"#introduction",onClick:function(){return s(!1)}},"Introduction")),i.servers().length>0&&d.createElement("li",{className:"mb-3 mt-9"},d.createElement("a",{className:"text-xs uppercase text-gray-700 mt-10 mb-4 font-thin hover:text-gray-900",href:"#servers",onClick:function(){return s(!1)}},"Servers"),d.createElement($,null)),x,f&&v,g&&y)))))},$=function(){var e,t,n,r=U().sidebar,a=D(),s=a.servers().all(),i=null!=(e=null==r?void 0:r.showServers)?e:"byDefault";if("byDefault"===i)return d.createElement("ul",{className:"text-sm mt-2"},s.map(function(e){return d.createElement(K,{serverName:e.id(),key:e.id()})}));if("bySpecTags"===i)n=(null!=(t=a.info().tags().all())?t:[]).map(function(e){return e.name()});else{var l=new Set;s.forEach(function(e){e.tags().forEach(function(e){return l.add(e.name())})}),n=Array.from(l)}var o=q(n,s.map(function(e){return{name:e.id(),tags:e.tags(),data:{}}})),c=o.tagged,m=o.untagged;return d.createElement("ul",{className:"text-sm mt-2"},Array.from(c.entries()).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{key:t},d.createElement(Y,{tagName:t},n.map(function(e){var t=e.name;return d.createElement(K,{serverName:t,key:t})})))}),m.length>0?d.createElement("li",null,d.createElement(Y,{tagName:"Untagged"},m.map(function(e){var t=e.name;return d.createElement(K,{serverName:t,key:t})}))):null)},W=function(){var e,t,n,r=U(),a=r.sidebar,s=D(),i=s.operations().all(),l=null!=(e=null==a?void 0:a.showOperations)?e:"byDefault",o=i.map(function(e){var t,n,i,l=e.channels(),o=F.getOperationIdentifier({operation:e,config:r}),c=F.getOperationType(e),m=s.version().localeCompare("2.6.0",void 0,{numeric:!0}),u="";if(0===m||(null==a?void 0:a.useChannelAddressAsIdentifier)){var d=null!=(n=null==(t=l.all()[0])?void 0:t.address())?n:"",p=e.summary();u=null!=p?p:d}else u=null!=(i=e.id())?i:"";return{name:"".concat(c,"-").concat(e.id()),tags:e.tags(),data:{label:u,type:c,operationHrefId:o}}});if("byDefault"===l)return d.createElement("ul",{className:"text-sm mt-2"},o.map(function(e){var t=e.name,n=e.data;return d.createElement(V,z({key:t},n))}));if("bySpecTags"===l)n=(null!=(t=s.info().tags().all())?t:[]).map(function(e){return e.name()});else{var c=new Set;i.forEach(function(e){e.tags().all().forEach(function(e){return c.add(e.name())})}),n=Array.from(c)}var m=q(n,o),u=m.tagged,p=m.untagged;return d.createElement("ul",{className:"text-sm mt-2"},Array.from(u.entries()).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{key:t},d.createElement(Y,{tagName:t},n.map(function(e){var t=e.name,n=e.data;return d.createElement(V,z({key:t},n))})))}),p.length>0?d.createElement("li",null,d.createElement(Y,{tagName:"Untagged"},p.map(function(e){var t=e.name,n=e.data;return d.createElement(V,z({key:t},n))}))):null)},V=function(e){var t=e.type,n=e.operationHrefId,r=e.label,a=U(),s=(0,d.useContext)(_).setShowSidebar,i=D().version().localeCompare("2.6.0",void 0,{numeric:!0}),l=F.getOperationDesignInformation({type:t,config:a,isAsyncAPIv2:0===i}),o=l.typeLabel,c=l.backgroundColor;return d.createElement("li",{key:"menu-operation-list-".concat(n)},d.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#".concat(n),onClick:function(){return s(!1)}},d.createElement("strong",{className:"h-6 no-underline text-white uppercase p-1 mr-2 rounded text-xs ".concat(["bg-red-600","bg-orange-600","bg-green-600","bg-blue-600"].includes(c)&&c),title:o},o),d.createElement("span",{className:"break-all inline-block"},r)))},K=function(e){var t=e.serverName,n=(0,d.useContext)(_).setShowSidebar;return d.createElement("li",null,d.createElement("a",{className:"flex no-underline text-gray-700 mb-2 hover:text-gray-900",href:"#server-".concat(t),onClick:function(){return n(!1)}},d.createElement("span",{className:"break-all inline-block"},t)))},Y=function(e){var t=e.tagName,n=e.children,r=(0,d.useState)(!1),a=r[0],s=r[1];return d.createElement("div",null,d.createElement(R,{onClick:function(){return s(function(e){return!e})},chevronProps:{className:a?"-rotate-180":"-rotate-90"}},d.createElement("span",{className:"text-sm inline-block mt-1 font-extralight"},t)),d.createElement("ul",{className:"".concat(a?"block":"hidden"," text-sm mt-2 font-light")},n))},B=function(e){var t=e.href,n=e.title,r=e.className,a=e.children;return d.createElement("a",{href:t,title:n?"".concat(n," (Opens in new window)"):"Opens in new window",className:r,target:"_blank",rel:"nofollow noopener noreferrer"},a)},G=n(76941),Q=n(66661),X=n(93466),J=n.n(X),Z=n(45715),ee=n.n(Z),et=n(4402),en=n.n(et),er=n(72447),ea=n.n(er);J().registerLanguage("json",ee()),J().registerLanguage("yaml",en()),J().registerLanguage("bash",ea());var es={langPrefix:"hljs language-",highlight:function(e,t){if(!J().getLanguage(t))return e;try{return J().highlight(e,{language:t}).value}catch(t){return e}}},ei=function(e){var t=e.children;return t?"string"!=typeof t?d.createElement(d.Fragment,null,t):d.createElement("div",{className:"prose max-w-none text-sm",dangerouslySetInnerHTML:{__html:(0,G.sanitize)((0,Q.xI)(t,es))}}):null},el=function(e){var t,n=e.tag,r="#".concat(n.name()),a=null!=(t=n.description())?t:"",s=n.externalDocs(),i=d.createElement("div",{title:a,className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1"},d.createElement("span",{className:s?"underline":""},r));return s?d.createElement(B,{href:s.url(),title:a},i):i},eo=function(e){var t=e.tags;return(null==t?void 0:t.length)?d.createElement("ul",{className:"flex flex-wrap leading-normal"},t.all().map(function(e){return d.createElement("li",{className:"inline-block mt-2 mr-2",key:e.name()},d.createElement(el,{tag:e}))})):null},ec=n(18951),em=function(){return(em=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)};(s=m||(m={})).ANY="any",s.RESTRICTED_ANY="restricted any",s.NEVER="never",s.UNKNOWN="unknown";var eu=["string","number","integer","boolean","array","object","null"],ed=["maxLength","minLength","pattern","contentMediaType","contentEncoding","multipleOf","maximum","exclusiveMaximum","minimum","exclusiveMinimum","items","maxItems","minItems","uniqueItems","contains","additionalItems","maxProperties","minProperties","required","properties","patternProperties","propertyNames","dependencies","additionalProperties"],ep=function(){function e(){}return e.toSchemaType=function(e){var t=this;if(!e||"function"!=typeof e.json)return m.UNKNOWN;if(e.isBooleanSchema())if(!0===e.json())return m.ANY;else return m.NEVER;if(0===Object.keys(e.json()).length)return m.ANY;var n=e.not();if(n&&this.inferType(n)===m.ANY)return m.NEVER;var r=this.inferType(e);if(Array.isArray(r))return r.map(function(n){return t.toType(n,e)}).join(" | ");r=this.toType(r,e);var a=this.toCombinedType(e);return r&&a?"".concat(r," ").concat(a):a||("object"===r&&e.title()&&(r+=" ["+e.title()+"]"),r)},e.applicatorSchemaName=function(e,t,n,r){var a=r?" ".concat(r,":"):":";return(a.startsWith(" <anonymous-schema-")&&(a=" Anonymous Schema"),0===e)?"".concat(t).concat(a):"".concat(n).concat(a)},e.prettifyValue=function(e,t){void 0===t&&(t=!0);var n=typeof e;return"string"===n?t?'"'.concat(e,'"'):e:"number"===n||"bigint"===n||"boolean"===n?"".concat(e):Array.isArray(e)?"[".concat(e.toString(),"]"):JSON.stringify(e)},e.humanizeConstraints=function(e){var t=[],n=this.humanizeNumberRangeConstraint(e.minimum(),e.exclusiveMinimum(),e.maximum(),e.exclusiveMaximum());void 0!==n&&t.push(n);var r=this.humanizeMultipleOfConstraint(e.multipleOf());void 0!==r&&t.push(r);var a=this.humanizeRangeConstraint("characters",e.minLength(),e.maxLength());void 0!==a&&t.push(a);var s=e.uniqueItems(),i=this.humanizeRangeConstraint(s?"unique items":"items",e.minItems(),e.maxItems());void 0!==i&&t.push(i);var l=this.humanizeRangeConstraint("properties",e.minProperties(),e.maxProperties());return void 0!==l&&t.push(l),t},e.isExpandable=function(e){var t,n,r,a,s,i,l,o,c=this.inferType(e);if((c=Array.isArray(c)?c:[c]).includes("object")||c.includes("array")||(null!=(o=(null!=(r=null!=(n=null!=(t=e.oneOf())?t:e.anyOf())?n:e.allOf())?r:Object.keys(null!=(a=e.properties())?a:{}).length>0)||(null!=(l=null!=(i=null!=(s=e.items())?s:e.not())?i:e.if())?l:e.then()))?o:e.else()))return!0;var m=this.getCustomExtensions(e);return!!(m&&Object.keys(m).length)},e.serverVariablesToSchema=function(e){if(e&&0!==e.length){var t,n={};e.all().forEach(function(e){n[e.id()]=em({},e.json()||{}),n[e.id()].type="string"});var r=((t={type:"object",properties:n,required:Object.keys(n)})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(r)}},e.parametersToSchema=function(e){var t,n=this;if(!(!e||e.isEmpty())){var r={};e.all().forEach(function(e){var t,a=e.schema();r[e.id()]=em({},null!=(t=null==a?void 0:a.json())?t:{}),r[e.id()].description=e.hasDescription()?e.description():void 0,r[e.id()][n.extParameterLocation]=e.hasLocation()?e.location():void 0});var a=((t={type:"object",properties:r,required:Object.keys(r)})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(a)}},e.jsonToSchema=function(e){var t=this.jsonFieldToSchema(e);return new ec.S(t)},e.getCustomExtensions=function(e){if(e&&"function"==typeof e.extensions){for(var t=e.extensions(),n={},r=0,a=t.all();r<a.length;r++){var s=a[r];s.id().startsWith("x-parser-")||s.id().startsWith("x-schema-private-")||(n[s.id()]=s.value())}return n}},e.getDependentRequired=function(e,t){var n=[],r=t.dependencies();if(r){for(var a=0,s=Object.entries(r);a<s.length;a++){var i=s[a],l=i[0],o=i[1];Array.isArray(o)&&o.includes(e)&&n.push(l)}return n.length?n:void 0}},e.getDependentSchemas=function(e){var t,n=e.dependencies();if(n){for(var r={},a=0,s=Object.entries(n);a<s.length;a++){var i=s[a],l=i[0],o=i[1];"object"!=typeof o||Array.isArray(o)||(r[l]=o)}if(Object.keys(r).length){var c=((t={type:"object",properties:Object.entries(r).reduce(function(e,t){var n=t[0],r=t[1];return e[n]=em({},r.json()),e},{})})[this.extRenderAdditionalInfo]=!1,t);return new ec.S(c)}}},e.toType=function(e,t){if(t.isCircular())return e;if("array"===e){var n=t.items();return Array.isArray(n)?this.toItemsType(n,t):n?"array<".concat(this.toSchemaType(n)||m.UNKNOWN,">"):"array<".concat(m.ANY,">")}return e},e.toItemsType=function(e,t){var n=this,r=e.map(function(e){return n.toSchemaType(e)}).join(", "),a=t.additionalItems();if(void 0!==a&&!1!==a){var s=!0===a?m.ANY:this.toSchemaType(a);return"tuple<".concat(r||m.UNKNOWN,", ...optional<").concat(s,">>")}return"tuple<".concat(r||m.UNKNOWN,">")},e.toCombinedType=function(e){return e.oneOf()?"oneOf":e.anyOf()?"anyOf":e.allOf()?"allOf":void 0},e.inferType=function(e){var t=e.type();if(void 0!==t)return Array.isArray(t)?(t.includes("integer")&&t.includes("number")&&(t=t.filter(function(e){return"integer"!==e})),1===t.length?t[0]:t):t;var n=e.const();if(void 0!==n)return typeof n;var r=e.enum();if(Array.isArray(r)&&r.length){var a=Array.from(new Set(r.map(function(e){return typeof e})));return 1===a.length?a[0]:a}var s=Object.keys(e.json()||{})||[];return!0===ed.some(function(e){return s.includes(e)})?m.RESTRICTED_ANY:this.toCombinedType(e)?"":m.ANY},e.humanizeNumberRangeConstraint=function(e,t,n,r){var a,s=void 0!==t,i=void 0!==e||s,l=void 0!==r,o=void 0!==n||l;return i&&o?a=""+(s?t:e)+(s?" < ":" <= ")+"value"+(l?" < ":" <= ")+(l?r:n):i?a=""+(s?t:e)+(s?" < ":" <= ")+"value":o&&(a="value"+(l?" < ":" <= ")+(l?r:n)),a},e.humanizeMultipleOfConstraint=function(e){if(void 0!==e){var t=e.toString(10);return/^0\.0*1$/.test(t)?"decimal places <= ".concat(t.split(".")[1].length):"multiple of ".concat(t)}},e.humanizeRangeConstraint=function(e,t,n){var r;return void 0!==t&&void 0!==n?r=t===n?"".concat(t," ").concat(e):"[ ".concat(t," .. ").concat(n," ] ").concat(e):void 0!==n?r="<= ".concat(n," ").concat(e):void 0!==t&&(r=1===t?"non-empty":">= ".concat(t," ").concat(e)),r},e.jsonFieldToSchema=function(e,t){var n,r,a,s,i=this;if(void 0===t&&(t=new Set),null==e)return(n={type:"string",const:""})[this.extRawValue]=!0,n;if("object"!=typeof e)return(r={type:"string",const:"function"==typeof e.toString?e.toString():e})[this.extRawValue]=!0,r;if(t.has(e))throw Error("too much recursion. Please check document for recursion.");t.add(e);try{if(this.isJSONSchema(e))return e;if(Array.isArray(e))return(a={type:"array",items:e.map(function(e){return i.jsonFieldToSchema(e,t)})})[this.extRenderAdditionalInfo]=!1,a;return(s={type:"object",properties:Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return e[r]=i.jsonFieldToSchema(a,t),e},{})})[this.extRenderAdditionalInfo]=!1,s}finally{t.delete(e)}},e.isJSONSchema=function(e){return!!(e&&"object"==typeof e&&(eu.includes(e.type)||Array.isArray(e.type)&&e.type.some(function(e){return!eu.includes(e)})))},e.hasRules=function(e,t){return!!(e.format()||e.pattern()||t.length>0||e.contentEncoding()||e.enum()||void 0!==e.default()||void 0!==e.const())},e.hasConditions=function(e){var t,n,r,a=this.getDependentSchemas(e);return!!((null==(t=e.oneOf())?void 0:t.length)||(null==(n=e.anyOf())?void 0:n.length)||(null==(r=e.allOf())?void 0:r.length)||e.not()||e.propertyNames()||e.contains()||e.if()||e.then()||e.else()||a)},e.extRenderAdditionalInfo="x-schema-private-render-additional-info",e.extRawValue="x-schema-private-raw-value",e.extParameterLocation="x-schema-private-parameter-location",e}(),eh=function(e){var t,n=e.schema;if(!n)return null;var r=n.type();if(!(null==r?void 0:r.includes("array")))return null;var a=n.items();return a&&!Array.isArray(a)&&Object.keys(null!=(t=a.properties())?t:{}).length?d.createElement(eN,{schema:a,isArray:!0}):Array.isArray(a)?d.createElement(d.Fragment,null,a.map(function(e,t){return d.createElement(eN,{schema:e,isArray:!0,schemaName:"".concat(t+1," item:"),key:t})})):d.createElement(eN,{schema:a,isArray:!0,schemaName:"Items:"})},ef=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(ep.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("array"))||!Array.isArray(n.items()))return null;var a=n.additionalItems();return!0===a||void 0===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are allowed."):!1===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional items are ",d.createElement("strong",null,"NOT")," allowed."):d.createElement(eN,{schemaName:"Additional items:",schema:a})},eg=function(e){var t,n,r,a=e.schema;if(!a)return null;var s=Object.entries(null!=(t=a.properties())?t:{}),i=Object.entries(null!=(n=a.patternProperties())?n:{});if(!s.length&&!i.length)return null;var l=null!=(r=a.required())?r:[];return d.createElement(d.Fragment,null,s.map(function(e){var t=e[0],n=e[1];return d.createElement(eN,{key:t,schema:n,schemaName:t,required:l.includes(t),isProperty:!0,isCircular:n.isCircular(),dependentRequired:ep.getDependentRequired(t,a)})}),i.map(function(e){var t=e[0],n=e[1];return d.createElement(eN,{key:t,schema:n,schemaName:t,isPatternProperty:!0,isProperty:!0,isCircular:n.isCircular()})}))},ev=function(e){var t,n=e.schema;if(!n||(null==(t=n.extensions().get(ep.extRenderAdditionalInfo))?void 0:t.value())===!1)return null;var r=n.type();if(!(null==r?void 0:r.includes("object")))return null;var a=n.additionalProperties();return!0===a||void 0===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are allowed."):!1===a?d.createElement("p",{className:"mt-2 text-xs text-gray-700"},"Additional properties are ",d.createElement("strong",null,"NOT")," allowed."):d.createElement(eN,{schemaName:"Additional properties:",schema:a})},ey=function(e){var t,n,r,a,s,i,l=e.schema,o=e.dependentSchemas;return d.createElement("div",{className:"space-y-2 bg-blue-100 border rounded rounded-tl-none p-4"},(null==(t=l.oneOf())?void 0:t.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",d.createElement("strong",null,"One Of")," the following:"),null==(n=l.oneOf())?void 0:n.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(r=l.anyOf())?void 0:r.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Can be ",d.createElement("strong",null,"Any Of")," the following:"),null==(a=l.anyOf())?void 0:a.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),(null==(s=l.allOf())?void 0:s.length)&&d.createElement("div",{className:""},d.createElement("h5",{className:"text-sm font-semibold text-gray-700 mb-2"},"Must consist ",d.createElement("strong",null,"All Of")," the following:"),null==(i=l.allOf())?void 0:i.map(function(e,t){var n;return d.createElement(eN,{key:t,schema:e,schemaName:ep.applicatorSchemaName(t,"","",null!=(n=e.title())?n:e.id())})})),l.not()&&d.createElement(eN,{schema:l.not(),schemaName:"Can NOT adhere to:"}),l.propertyNames()&&d.createElement(eN,{schema:l.propertyNames(),schemaName:"Property names must adhere to:"}),l.contains()&&d.createElement(eN,{schema:l.contains(),schemaName:"Array must contain at least one of:"}),l.if()&&d.createElement("div",{className:""},d.createElement(eN,{schema:l.if(),schemaName:"If schema adheres to:"}),l.then()&&d.createElement(eN,{schema:l.then(),schemaName:"Then must adhere to:"}),l.else()&&d.createElement(eN,{schema:l.else(),schemaName:"Otherwise:"})),o&&d.createElement(eN,{schema:o,schemaName:"Dependent schemas:"}))},ex=function(e){var t,n=e.schema,r=e.constraints;return d.createElement("div",{className:"flex flex-col space-y-2 bg-blue-100 p-4 rounded rounded-tl-none border"},n.format()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"format:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.format())),n.pattern()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"must match:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.pattern())),void 0!==n.contentEncoding()&&d.createElement("span",{className:"no-underline rounded lowercase p-1 text-sm"},"encoding:"," ",d.createElement("span",{className:"rounded font-bold p-1 text-sm"},n.contentEncoding())),r.map(function(e){return d.createElement("strong",{key:e,className:"text-purple-700 p-1 rounded-md text-sm"},e)}),void 0!==n.default()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Default value:"),d.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(n.default()))),void 0!==n.const()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Constant value: "),d.createElement("span",{className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(n.const()))),n.enum()&&d.createElement("div",{className:"text-sm"},d.createElement("span",{className:""},"Allowed values: "),null==(t=n.enum())?void 0:t.map(function(e,t){return d.createElement("span",{key:t,className:"bg-orange-50 text-orange-700 font-bold px-2 py-1 rounded"},ep.prettifyValue(e))})))},eb=function(e){var t,n,r,a=e.schema,s=e.required,i=void 0!==s&&s,l=e.isPatternProperty,o=e.dependentRequired;if(!a)return null;var c=null!=i&&i,m=null!=(t=a.deprecated())&&t,u=null!=(n=a.writeOnly())&&n,p=null!=(r=a.readOnly())&&r,h=null!=l&&l;return d.createElement(d.Fragment,null,(c||m||u||p||h)&&d.createElement("div",{className:"flex items-center space-x-2"},c&&d.createElement("span",{className:"text-red-600 text-xs rounded"},"required"),o&&d.createElement(d.Fragment,null,d.createElement("div",{className:"text-gray-500 text-xs"},"required when defined:"),d.createElement("div",{className:"text-red-600 text-xs"},o.join(", "))),m&&d.createElement("span",{className:"text-red-700 text-xs px-2 py-1 bg-red-200 border border-red-700 rounded"},"deprecated"),l&&d.createElement("div",{className:"text-gray-500 text-xs italic"},"(pattern property)"),u&&d.createElement("span",{className:"text-gray-600 text-xs rounded"},"write-only"),p&&d.createElement("span",{className:"text-gray-500 text-xs rounded"},"read-only")))},eE=d.createContext({reverse:!1,deepExpanded:!1}),eN=function(e){var t,n,r=e.schemaName,a=e.schema,s=e.required,i=e.isPatternProperty,l=e.isProperty,o=void 0!==l&&l,c=e.isCircular,m=void 0!==c&&c,u=e.dependentRequired,p=e.expanded,h=e.isArray,f=void 0!==h&&h,g=(0,d.useContext)(eE),v=g.reverse,y=g.deepExpanded,x=(0,d.useState)(void 0!==p&&p||f),b=x[0],E=x[1],N=(0,d.useState)(!1),w=N[0],k=N[1],S=(0,d.useState)("RULES"),C=S[0],I=S[1],O=a?ep.humanizeConstraints(a):[],A=!!a&&ep.hasRules(a,O),P=!!a&&ep.hasConditions(a);(0,d.useEffect)(function(){A||I("CONDITIONS")},[A]),(0,d.useEffect)(function(){f||k(y)},[f,y,k]),(0,d.useEffect)(function(){f||E(w)},[f,w]);var j=(0,d.useMemo)(function(){return{reverse:!v,deepExpanded:w}},[v,w]);if(!a||"string"==typeof r&&((null==r?void 0:r.startsWith("x-parser-"))||(null==r?void 0:r.startsWith("x-schema-private-"))))return null;var T=ep.getDependentSchemas(a),L=a.externalDocs(),D=a.extensions().get(ep.extParameterLocation),M=(null==D?void 0:D.value())===!0,U=ep.toSchemaType(a);m=m||a.isCircular()||!1;var F=a.$id(),q="string"==typeof r?d.createElement("span",{className:"break-anywhere text-sm w-full ".concat(o?"italic":"")},r):r,z=ep.isExpandable(a)||A||P;return d.createElement(eE.Provider,{value:j},d.createElement("div",{className:"flex mb-4 gap-2"},d.createElement("div",{className:"border rounded overflow-visible w-full"},d.createElement("div",{className:"flex flex-col justify-center p-4 bg-gray-100 border-b"},d.createElement("div",{className:"flex justify-between items-start"},d.createElement("div",{className:"flex items-center gap-2 w-full"},!z||m||f?d.createElement("span",{className:"text-sm ".concat(o?"italic":"")},r):d.createElement("div",{className:"flex items-center gap-2"},d.createElement(R,{onClick:function(){return E(function(e){return!e})},expanded:b},q)),d.createElement("span",{className:"capitalize text-sm text-teal-500 font-bold"},m?"".concat(U," [CIRCULAR]"):U),void 0!==a.contentMediaType()&&d.createElement("strong",{className:"bg-yellow-600 no-underline text-white rounded lowercase mr-2 p-1 text-xs"},"media type: ",a.contentMediaType()),F&&!F.startsWith("<anonymous-")&&d.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},"uid: ",F),d.createElement(eb,{schema:a,isPatternProperty:void 0!==i&&i,required:void 0!==s&&s,dependentRequired:u}),d.createElement("div",{className:"ml-auto flex gap-4"},z&&!m&&!f&&d.createElement("button",{type:"button",onClick:function(){var e=!b;k(e),f||E(e)},className:"text-sm text-gray-500 hover:text-gray-700"},b?"Collapse all":"Expand all")))),a.description()&&d.createElement("div",{className:"mt-2 text-sm text-gray-600"},d.createElement(ei,null,a.description())),a.examples()&&d.createElement("ul",{className:"text-xs"},"Examples values:"," ",null==(t=a.examples())?void 0:t.map(function(e,t){return d.createElement("li",{key:t,className:"inline-block bg-gray-600 text-white rounded ml-1 py-0 px-2 break-all"},d.createElement("span",null,ep.prettifyValue(e)))})),M&&d.createElement("div",{className:"text-xs"},"Parameter location:"," ",d.createElement("span",{className:"border text-orange-600 rounded mr-2 p-1 text-xs"},M)),L&&d.createElement("strong",{className:"w-min border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-2 py-0 mt-2"},d.createElement(B,{href:L.url(),title:null!=(n=L.description())?n:""},"Documentation"))),d.createElement("div",{className:"flex "},!m&&z&&b&&d.createElement("div",{className:"p-4 bg-white relative w-full"},d.createElement(eg,{schema:a}),d.createElement(eh,{schema:a}),d.createElement("div",{className:""},d.createElement("div",{className:"flex gap-1"},A&&d.createElement("button",{type:"button",className:"text-sm font-semibold text-gray-900 ".concat("RULES"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return I("RULES")},role:"tab","aria-selected":"RULES"===C,"aria-controls":"rules-panel"},"Rules"),P&&d.createElement("button",{type:"button",className:"text-sm font-semibold text-gray-900 ".concat("CONDITIONS"==C?"bg-gray-400":"bg-gray-200"," p-2 rounded-t cursor-pointer"),onClick:function(){return I("CONDITIONS")},role:"tab","aria-selected":"CONDITIONS"===C,"aria-controls":"conditions-panel"},"Conditions")),P&&"CONDITIONS"==C&&d.createElement("div",{className:"mb-4 w-full"},d.createElement(ey,{schema:a,dependentSchemas:T})),A&&"RULES"==C&&d.createElement("div",{className:"z-10 w-full"},d.createElement(ex,{schema:a,constraints:O}))),d.createElement("div",{className:"mt-4"},d.createElement(ev,{schema:a}),d.createElement(ef,{schema:a})),d.createElement(ew,{item:a}))))))},ew=function(e){var t=e.name,n=void 0===t?"Extensions":t,r=e.item,a=(0,d.useState)(!1),s=a[0],i=a[1],l=U(),o=D(),c=ep.getCustomExtensions(r);if(!c||!Object.keys(c).length)return null;if(!l.extensions||!Object.keys(l.extensions).length){var m=ep.jsonToSchema(c);return m&&d.createElement("div",{className:"mt-2"},d.createElement(eN,{schemaName:n,schema:m}))}return d.createElement("div",null,d.createElement("div",{className:"flex py-2"},d.createElement("div",{className:"min-w-1/4"},d.createElement(R,{onClick:function(){return i(function(e){return!e})},expanded:s},d.createElement("span",{className:"break-anywhere text-sm ".concat(n)},n)))),d.createElement("div",{className:"rounded p-4 py-2 border bg-gray-100 ".concat(s?"block":"hidden")},Object.keys(c).sort(function(e,t){return e.localeCompare(t)}).map(function(e){if(null==(t=l.extensions)?void 0:t[e]){var t,n=l.extensions[e];return d.createElement(n,{key:e,propertyName:e,propertyValue:c[e],document:o,parent:r})}var a=ep.jsonToSchema(c[e]);return d.createElement("div",{key:e,className:"mt-2"},d.createElement(eN,{schemaName:e,schema:a}))})))},ek=function(e){var t=e.context,n=e.pluginManager;if(!n)return null;var r=t.slot,a=n.getComponentsForSlot(r);return a&&0!==a.length?d.createElement("div",{className:"asyncapi-react-plugin-slot-".concat(r),"data-slot":r},a.map(function(e,n){return d.createElement(d.Suspense,{key:"".concat(r,"-").concat(n),fallback:d.createElement("div",null,"Loading plugin...")},d.createElement(e,{context:t}))})):null},eS=(0,d.createContext)(void 0);function eC(){return(0,d.useContext)(eS)}var eI=function(){var e,t,n,r,a,s,i,l,o,m=D(),u=eC(),p=m.info();if(!p)return null;var h=m.info().id(),f=m.info().externalDocs(),g=p.license(),x=p.termsOfService(),b=m.defaultContentType(),E=p.contact(),N=p.extensions(),w=null!=(n=null!=(t=null!=(e=null!=g?g:x)?e:b)?t:E)?n:f;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8 text-left",id:"introduction"},d.createElement("div",{className:"text-4xl"},p.title(),"\xa0",p.version()),w&&d.createElement("ul",{className:"flex flex-wrap mt-2 leading-normal"},g&&d.createElement("li",{className:"inline-block mt-2 mr-2"},g.url()?d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(r=g.url())?r:""},d.createElement("span",null,g.name())):d.createElement("strong",{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 no-underline text-xs uppercase rounded px-3 py-1"},g.name())),x&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:x},d.createElement("span",null,"Terms of service"))),b&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(v,"/").concat(b)},d.createElement("span",null,b))),f&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:f.url(),title:null!=(a=f.description())?a:void 0},d.createElement("span",null,y))),E&&d.createElement(d.Fragment,null,E.url()&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:null!=(s=E.url())?s:""},d.createElement("span",null,null!=(i=E.name())?i:"Support"))),E.email()&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement(B,{className:"border border-solid border-purple-300 hover:bg-purple-300 hover:text-purple-600 text-purple-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"mailto:".concat(E.email())},d.createElement("span",null,E.email())))),h&&d.createElement("li",{className:"inline-block mt-2 mr-2"},d.createElement("strong",{className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 no-underline text-xs uppercase rounded px-3 py-1"},"ID: ",h))),p.hasDescription()&&d.createElement("div",{className:"mt-4"},d.createElement(ei,null,p.description())),m.info().tags().length>0&&d.createElement("div",{className:"mt-4"},d.createElement(eo,{tags:m.info().tags()})),N.length>0&&d.createElement("div",{className:"mt-4"},d.createElement(ew,{name:"Info Extensions",item:p})),(null!=(o=null==(l=null==u?void 0:u.getComponentsForSlot(c.INFO))?void 0:l.length)?o:0)>0&&d.createElement(ek,{context:{slot:c.INFO,document:m,info:p,schema:p},pluginManager:u})),d.createElement("div",{className:"panel-item--right"}))},eO=function(){function e(){}return e.securityType=function(e){switch(e){case"apiKey":default:return"API key";case"oauth2":return"OAuth2";case"openIdConnect":return"Open ID";case"http":return"HTTP";case"userPassword":return"User/Password";case"X509":return"X509:";case"symmetricEncryption":return"Symmetric Encription";case"asymmetricEncryption":return"Asymmetric Encription";case"httpApiKey":return"HTTP API key";case"scramSha256":return"ScramSha256";case"scramSha512":return"ScramSha512";case"gssapi":return"GSSAPI"}},e.flowName=function(e){switch(e){case"implicit":default:return"Implicit";case"password":return"Password";case"clientCredentials":return"Client credentials";case"authorizationCode":return"Authorization Code"}},e.getKafkaSecurity=function(e,t){var n,r;if(n="kafka"===e?t?"SASL_PLAINTEXT":"PLAINTEXT":t?"SASL_SSL":"SSL",t)switch(t.type()){case"plain":r="PLAIN";break;case"scramSha256":r="SCRAM-SHA-256";break;case"scramSha512":r="SCRAM-SHA-512";break;case"oauth2":r="OAUTHBEARER";break;case"gssapi":r="GSSAPI";break;case"X509":n="SSL"}return{securityProtocol:n,saslMechanism:r}},e}(),eA=function(e){var t,n=e.security,r=void 0===n?[]:n,a=e.protocol,s=void 0===a?"":a,i=e.header;if(null==r?void 0:r.length){var l=Object.values(r).map(function(e){return e.all()}).flat().map(function(e){var t=e.scheme(),n=e.scopes();return t?d.createElement(eP,{protocol:s,securitySchema:t,requiredScopes:n,key:t.type()}):null}).filter(Boolean);t=d.createElement("ul",null,l.map(function(e,t){return d.createElement("li",{className:"mt-2",key:t},e)}))}else("kafka"===s||"kafka-secure"===s)&&(t=d.createElement(eP,{protocol:s,securitySchema:null}));return t?d.createElement("div",{className:"text-sm mt-4"},d.createElement("h5",{className:"text-gray-800"},void 0===i?"Security":i,":"),t):null},eP=function(e){var t,n,r,a=e.securitySchema,s=e.protocol,i=(void 0===(t=e.requiredScopes)&&(t=[]),n=[],a&&(a.name()&&n.push(d.createElement("span",null,"Name: ",a.name())),a.in()&&n.push(d.createElement("span",null,"In: ",a.in())),a.scheme()&&n.push(d.createElement("span",null,"Scheme: ",a.scheme())),a.bearerFormat()&&n.push(d.createElement("span",null,"Bearer format: ",a.bearerFormat())),a.openIdConnectUrl()&&n.push(d.createElement(B,{href:a.openIdConnectUrl(),className:"underline"},"Connect URL")),t.length&&n.push(d.createElement("span",null,"Required scopes: ",t.join(", ")))),n);if(["kafka","kafka-secure"].includes(s)){var l=eO.getKafkaSecurity(s,a),o=l.securityProtocol,c=l.saslMechanism;r=d.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded"},o&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"security.protocol:"),d.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},o)),c&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"sasl.mechanism:"),d.createElement("strong",{className:"inline-block no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1"},c)))}var m=null==a?void 0:a.flows(),u={};(null==m?void 0:m.hasImplicit())&&(u.implicit=m.implicit()),(null==m?void 0:m.hasAuthorizationCode())&&(u.authorizationCode=m.authorizationCode()),(null==m?void 0:m.hasClientCredentials())&&(u.clientCredentials=m.clientCredentials()),(null==m?void 0:m.hasPassword())&&(u.password=m.password());var p=Object.entries(u).map(function(e){var t=e[0],n=e[1],r=n.authorizationUrl(),a=n.tokenUrl(),s=n.refreshUrl(),i=n.scopes();return d.createElement("div",{className:"px-4 py-2 ml-2 mb-2 border border-gray-400 bg-gray-100 rounded",key:t},d.createElement("div",null,d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Flow:"),d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},eO.flowName(t))),r&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Auth URL:"),d.createElement(B,{href:r,className:"underline"},r)),a&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Token URL:"),d.createElement(B,{href:a,className:"underline"},a)),s&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Refresh URL:"),d.createElement(B,{href:s,className:"underline"},s)),i&&d.createElement("div",{className:"mt-1"},d.createElement("strong",{className:"text-xs text-gray-600 mt-1 mr-1 uppercase"},"Scopes:"),d.createElement("ul",{className:"inline-block"},i&&Object.entries(i).map(function(e){var t=e[0],n=e[1];return d.createElement("li",{className:"inline-block font-bold no-underline bg-indigo-400 text-white text-xs rounded py-0 px-1 ml-1",title:n,key:t},t)}))))});return d.createElement("div",null,a&&i&&d.createElement("div",null,d.createElement("span",null,eO.securityType(a.type()),i.length>0&&d.createElement("ul",{className:"inline-block ml-2"},i.map(function(e,t){return d.createElement("li",{className:"inline-block font-bold no-underline bg-blue-400 text-white text-xs uppercase rounded px-2 py-0 ml-1",key:t},e)})))),(null==a?void 0:a.hasDescription())&&d.createElement("div",null,d.createElement(ei,null,a.description())),p&&p.length>0&&d.createElement("ul",{className:"my-2"},d.createElement("li",null,p)),r&&d.createElement("div",null,r))},ej=function(e){var t=e.name,n=void 0===t?"Binding specific information":t,r=e.bindings;if(!r||r.isEmpty())return null;var a=r.all().map(function(e){var t=e.value(),r=ep.jsonToSchema(t),a=e.protocol(),s=d.createElement("div",{className:"inline-block text-sm"},d.createElement("span",null,n),d.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-xs"},a));return void 0!==r&&d.createElement(eN,{schemaName:s,schema:r,key:a})});return d.createElement(d.Fragment,null,a)},eT=function(e){var t=e.serverName,n=e.server,r=U();if(!n)return null;var a=ep.serverVariablesToSchema(n.variables()),s=n.protocolVersion(),i=n.security();return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border bg-gray-100"},d.createElement("div",null,d.createElement("span",{className:"font-mono text-base"},n.url()),d.createElement("strong",{className:"bg-teal-500 no-underline text-white uppercase rounded mx-2 px-2 py-1 text-sm"},s?"".concat(n.protocol()," ").concat(s):n.protocol()),d.createElement("strong",{className:"bg-blue-500 no-underline text-white uppercase rounded px-2 py-1 text-sm"},t)),n.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,n.description())),a&&d.createElement("div",{className:"mt-2",id:"".concat(F.getIdentifier("server-".concat(t,"-url-variables"),r))},d.createElement(eN,{schemaName:"URL Variables",schema:a,expanded:!0})),d.createElement("div",{id:"".concat(F.getIdentifier("server-".concat(t,"-security"),r))},d.createElement(eA,{protocol:n.protocol(),security:i})),n.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Server specific information",bindings:n.bindings()})),d.createElement(ew,{name:"Server Extensions",item:n}),n.tags().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(eo,{tags:n.tags()})))),d.createElement("div",{className:"panel-item--right"}))},eR=function(){var e=D().servers().all(),t=U();return e.length?d.createElement("section",{id:"".concat(F.getIdentifier("servers",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Servers"),d.createElement("ul",null,e.map(function(e){var n=e.id();return d.createElement("li",{className:"mb-4",key:n,id:"".concat(F.getIdentifier("server-".concat(n),t))},d.createElement(eT,{serverName:n,server:e,key:n}))}))):null},eL=function(e){var t=e.snippet;return"object"==typeof t&&(t="```json\n"+JSON.stringify(t,void 0,2)+"\n```"),d.createElement(ei,null,t)},eD=n(43284),eM=function(){function e(){}return e.generateExample=function(e,t){void 0===t&&(t={});try{return this.sanitizeExample((0,eD.XM)(e,t))||""}catch(e){return""}},e.sanitizeExample=function(e){var t=this;return"object"==typeof e&&e&&!Array.isArray(e)?Object.entries(e).reduce(function(e,n){var r=n[0],a=n[1];return r.startsWith("x-parser-")||r.startsWith("x-schema-private-")||(e[r]=t.sanitizeExample(a)),e},{}):e},e.getPayloadExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasPayload()})){var r=n.flatMap(function(e){if(e.payload())return{name:e.name(),summary:e.summary(),example:e.payload()}}).filter(Boolean);if(r.length>0)return r}var a=e.payload();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e.getHeadersExamples=function(e){var t,n=e.examples().all();if(n.some(function(e){return e.hasHeaders()})){var r=n.flatMap(function(e){if(e.hasHeaders())return{name:e.name(),summary:e.summary(),example:e.headers()}}).filter(Boolean);if(r.length>0)return r}var a=e.headers();if(null==a?void 0:a.examples())return null==(t=a.examples())?void 0:t.map(function(e){return{example:e}})},e}(),eU=function(e){var t=e.message;if(!t)return null;var n=t.payload(),r=t.headers();return d.createElement("div",{className:"bg-gray-800 px-8 py-4 mt-4 -mx-8 2xl:mx-0 2xl:px-4 2xl:rounded examples"},d.createElement("h4",{className:"text-white text-lg"},"Examples"),n&&d.createElement(eF,{type:"Payload",schema:n,examples:eM.getPayloadExamples(t)}),r&&d.createElement(eF,{type:"Headers",schema:r,examples:eM.getHeadersExamples(t)}))},eF=function(e){var t,n,r=e.type,a=e.schema,s=e.examples,i=void 0===s?[]:s,l=U(),o=(0,d.useState)(null!=(n=null==(t=null==l?void 0:l.expand)?void 0:t.messageExamples)&&n),c=o[0],m=o[1];return(0,d.useEffect)(function(){var e,t;m(null!=(t=null==(e=null==l?void 0:l.expand)?void 0:e.messageExamples)&&t)},[l.expand]),d.createElement("div",{className:"mt-4"},d.createElement("div",null,d.createElement(R,{onClick:function(){return m(function(e){return!e})},expanded:c,chevronProps:{className:"fill-current text-gray-200"}},d.createElement("span",{className:"inline-block w-20 py-0.5 mr-1 text-gray-200 text-sm border text-center rounded focus:outline-none"},void 0===r?"Payload":r))),d.createElement("div",{className:c?"block":"hidden"},i&&i.length>0?d.createElement("ul",null,i.map(function(e,t){return d.createElement("li",{className:"mt-4",key:t},d.createElement("h5",{className:"text-xs font-bold text-gray-500"},e.name?"#".concat(t+1," Example - ").concat(e.name):"#".concat(t+1," Example")),e.summary&&d.createElement("p",{className:"text-xs font-bold text-gray-500"},e.summary),d.createElement("div",{className:"mt-1"},d.createElement(eL,{snippet:eM.sanitizeExample(e.example)})))})):d.createElement("div",{className:"mt-4"},d.createElement(eL,{snippet:eM.generateExample(a.json())}),d.createElement("h6",{className:"text-xs font-bold text-gray-600 italic mt-2"},"This example has been generated automatically."))))},eq=function(e){var t=e.message,n=e.messageName,r=e.index,a=e.showExamples,s=U();if(!t)return null;var i="function"==typeof t.id&&t.id(),l=t.title(),o=t.summary(),c=t.payload(),m=t.headers(),u=t.correlationId(),p=t.contentType(),h=t.externalDocs(),f=null!=p?p:h;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded bg-gray-200 p-4 border"},d.createElement("div",null,void 0!==r&&d.createElement("strong",{className:"text-gray-700 mr-2"},"#",r),l&&d.createElement("span",{className:"text-gray-700 mr-2"},l)),o&&d.createElement("p",{className:"text-gray-600 text-sm"},o),f&&d.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},p&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:"".concat(v,"/").concat(p)},d.createElement("span",null,p))),h&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:h.url()},d.createElement("span",null,y)))),i&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Message ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},i))),u&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Correlation ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},u.location())),u.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,u.description()))),t.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,t.description())),c&&d.createElement("div",{className:"mt-2",id:n?F.getIdentifier("message-".concat(n,"-payload"),s):void 0},d.createElement(eN,{schemaName:"Payload",schema:c})),m&&d.createElement("div",{className:"mt-2",id:n?F.getIdentifier("message-".concat(n,"-headers"),s):void 0},d.createElement(eN,{schemaName:"Headers",schema:m})),t.bindings().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Message specific information",bindings:t.bindings()})),d.createElement(ew,{item:t}),t.tags().length>0&&d.createElement("div",{className:"mt-2"},d.createElement(eo,{tags:t.tags()})))),void 0!==a&&a&&d.createElement("div",{className:"panel-item--right px-8"},d.createElement(eU,{message:t})))},ez=function(e){var t=e.servers,n=e.config,r=e.relativePathname;return t&&0!==t.length?d.createElement("div",{className:"mt-2 text-sm"},d.createElement("p",null,"Available only on servers:"),d.createElement("ul",{className:"flex flex-wrap leading-normal"},t.map(function(e){return d.createElement("li",{className:"inline-block mt-2 mr-2",key:e.id()},d.createElement("a",{href:"".concat(r,"#").concat(F.getIdentifier("server-"+e.id(),n)),className:"border border-solid border-blue-300 hover:bg-blue-300 hover:text-blue-600 text-blue-500 font-bold no-underline text-xs rounded px-3 py-1 cursor-pointer"},d.createElement("span",{className:"underline"},e.id())))}))):null},e_=function(){return(e_=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},eH=globalThis.location,e$=eH?"".concat(eH.pathname).concat(eH.search):"",eW=function(e){var t=e.type,n=void 0===t?o.SEND:t,r=e.operation,a=e.channelName,s=e.channel,i=U();if(!r||!s)return null;var l="function"==typeof s.servers&&s.servers().all(),c="function"==typeof r.security&&r.security(),m=void 0!==s.parameters()?ep.parametersToSchema(s.parameters()):void 0;return d.createElement("div",null,d.createElement("div",{className:"panel-item--center px-8"},d.createElement(eV,e_({},e)),d.createElement(ez,{servers:l||[],config:i,relativePathname:e$}),m&&d.createElement("div",{className:"mt-2",id:F.getIdentifier("operation-".concat(n,"-").concat(a,"-parameters"),i)},d.createElement(eN,{schemaName:"Parameters",schema:m,expanded:!0})),c&&d.createElement("div",{className:"mt-2",id:F.getIdentifier("operation-".concat(n,"-").concat(a,"-security"),i)},d.createElement(eA,{security:c,header:"Additional security requirements"})),s.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Channel specific information",bindings:s.bindings()})),d.createElement(ew,{name:"Channel Extensions",item:s}),r.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Operation specific information",bindings:r.bindings()})),d.createElement(ew,{name:"Operation Extensions",item:r}),r.tags()&&d.createElement("div",{className:"mt-2"},d.createElement(eo,{tags:r.tags()}))),d.createElement("div",{className:"w-full mt-4",id:F.getIdentifier("operation-".concat(n,"-").concat(a,"-message"),i)},r.messages().length>1?d.createElement("div",{className:"mt-2"},d.createElement("p",{className:"px-8"},"Accepts ",d.createElement("strong",null,"one of")," the following messages:"),d.createElement("ul",null,r.messages().all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eq,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("p",{className:"px-8"},"Accepts the following message:"),d.createElement("div",{className:"mt-2"},d.createElement(eq,{message:r.messages().all()[0],showExamples:!0})))),d.createElement(eK,e_({},e)))},eV=function(e){var t,n,r=e.type,a=void 0===r?o.SEND:r,s=e.operation,i=e.channelName,l=e.channel,m=U(),u=eC(),p=s.summary(),h=s.externalDocs(),f=s.id(),g=D(),v=g.version().localeCompare("2.6.0",void 0,{numeric:!0}),x=F.getOperationDesignInformation({type:a,config:m,isAsyncAPIv2:0===v}),b=x.backgroundColor,E=x.typeLabel;return d.createElement(d.Fragment,null,d.createElement("div",{className:"mb-4"},d.createElement("h3",null,d.createElement("span",{className:"font-mono text-white uppercase p-1 rounded mr-2 ".concat(b),title:a},E)," ",d.createElement("span",{className:"font-mono text-base"},i))),l.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,l.description())),p&&d.createElement("p",{className:"text-gray-600 text-sm mt-2"},p),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),h&&d.createElement("ul",{className:"leading-normal mt-2 mb-4 space-x-2 space-y-2"},h&&d.createElement("li",{className:"inline-block"},d.createElement(B,{className:"border border-solid border-orange-300 hover:bg-orange-300 hover:text-orange-600 text-orange-500 font-bold no-underline text-xs uppercase rounded px-3 py-1",href:h.url()},d.createElement("span",null,y)))),f&&d.createElement("div",{className:"border bg-gray-100 rounded px-4 py-2 mt-2"},d.createElement("div",{className:"text-sm text-gray-700"},"Operation ID",d.createElement("span",{className:"bg-orange-600 text-white rounded text-xs ml-2 py-0 px-2"},f))),(null!=(n=null==(t=null==u?void 0:u.getComponentsForSlot(c.OPERATION))?void 0:t.length)?n:0)>0&&d.createElement(ek,{context:{slot:c.OPERATION,document:g,operation:s,channel:l,channelName:i,type:a,schema:e},pluginManager:u}))},eK=function(e){var t,n=e.type,r=void 0===n?o.SEND:n,a=e.operation,s=(0,d.useState)(!1),i=s[0],l=s[1],c=(0,d.useState)(!1),m=c[0],u=c[1];if(r!==o.REPLY&&r!==o.REQUEST)return d.createElement(d.Fragment,null);var p=a.reply();if(void 0===p)return d.createElement(d.Fragment,null);var h=p.messages(),f=p.channel(),g=null==(t=p.address())?void 0:t.location();return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center"},d.createElement("div",{className:"font-mono px-8 py-4"},d.createElement("div",{className:"border rounded"},d.createElement("div",{className:"w-full ".concat(r===o.REPLY?"bg-green-600 border-green-600":"bg-blue-600 border-blue-600"," text-sm rounded-t h-8 px-4 border text-white flex items-center")},d.createElement("strong",null,"REPLY INFORMATION")),d.createElement("div",{className:"flex"},d.createElement("div",{className:"w-1 h-11 ".concat(r===o.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),d.createElement("div",{className:"p-4"},d.createElement("h3",{className:"text-xs"},d.createElement("span",{className:"mr-2",title:r},"REPLY CHANNEL INFORMATION")),(null==f?void 0:f.address())?d.createElement("div",{className:"text-xs text-gray-700"},"Reply will be provided via this designated address:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},f.address()," ")):null!=g&&d.createElement("div",{className:"text-xs text-gray-700"},"Reply will be directed to the address specified at this location:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},g)),d.createElement("div",{className:"mt-2"},f&&d.createElement(R,{onClick:function(){return u(function(e){return!e})},expanded:m},d.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"View channel details")),f&&d.createElement("div",{className:"w-full mt-4 ".concat(m?"block":"hidden")},d.createElement(eY,e_({},e))," ")))),d.createElement(eB,e_({},e)),!1===h.isEmpty()&&d.createElement("div",{className:"p-4"},d.createElement(R,{onClick:function(){return l(function(e){return!e})},expanded:i},d.createElement("span",{className:"inline-block py-0.5 mr-1 text-gray-500 text-xs text-center rounded focus:outline-none"},"Expected Reply"," ",h.length>1?"Messages":"Message")),d.createElement("div",{className:"w-full mt-4 ".concat(i?"block":"hidden")},h.length>1?d.createElement("div",{className:"mt-2"},d.createElement("ul",null,h.all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eq,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("div",{className:"mt-2"},d.createElement(eq,{message:h.all()[0],showExamples:!0}))))))),d.createElement(ew,{name:"Operation Reply Extensions",item:p})))},eY=function(e){var t,n=e.type,r=void 0===n?o.SEND:n,a=e.operation.reply(),s=null==a?void 0:a.channel(),i=null!=(t=null==s?void 0:s.address())?t:"",l=U(),c="function"==typeof(null==s?void 0:s.servers)&&s.servers().all(),m=(null==s?void 0:s.parameters())!==void 0?ep.parametersToSchema(s.parameters()):void 0;return s?d.createElement("div",null,s.address()&&d.createElement("div",{className:"mt-2 text-xs text-gray-700"},"Address:"," ",d.createElement("span",{className:"border text-orange-600 rounded text-xs py-0 px-2"},s.address())),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),d.createElement(ez,{servers:c||[],config:l,relativePathname:e$}),s.messages().all().length>1?d.createElement("div",{className:"mt-2"},d.createElement("span",{className:"text-xs text-gray-700"},"Messages:"),d.createElement("ul",null,s.messages().all().map(function(e,t){return d.createElement("li",{className:"mt-4",key:e.id()},d.createElement(eq,{message:e,index:t,showExamples:!0}))}))):d.createElement("div",{className:"mt-2"},d.createElement("span",{className:"text-xs text-gray-700"},"Message:"),d.createElement("div",{className:"mt-2"},d.createElement(eq,{message:s.messages().all()[0],showExamples:!0}))),m&&d.createElement("div",{className:"mt-2",id:F.getIdentifier("operation-".concat(r,"-").concat(i,"-parameters"),l)},d.createElement(eN,{schemaName:"Parameters",schema:m,expanded:!0})),s.bindings()&&d.createElement("div",{className:"mt-2"},d.createElement(ej,{name:"Bindings",bindings:s.bindings()}))):d.createElement(d.Fragment,null)},eB=function(e){var t=e.type,n=void 0===t?o.SEND:t,r=e.operation;if(n!==o.REPLY&&n!==o.REQUEST)return d.createElement(d.Fragment,null);var a=r.reply();if(!(null==a?void 0:a.address))return d.createElement(d.Fragment,null);var s=a.address();if(!s)return d.createElement(d.Fragment,null);var i=s.location();return d.createElement("div",{className:"flex"},d.createElement("div",{className:"w-1 h-11 ".concat(n===o.REPLY?"bg-green-600":"bg-blue-600"," mt-4")}),d.createElement("div",{className:"p-4"},d.createElement("h3",{className:"text-xs"},d.createElement("span",{className:"mr-2 uppercase",title:n},"REPLY address information")),i&&d.createElement("div",{className:"text-xs text-gray-700"},"REPLY will be sent to the address provided in:",d.createElement("span",{className:"border text-orange-600 rounded text-xs ml-2 py-0 px-2"},i)),s.hasDescription()&&d.createElement("div",{className:"mt-2"},d.createElement(ei,null,s.description())),d.createElement(ew,{name:"Operation Reply Address Extensions",item:a})))},eG=function(){var e=D().operations().all(),t=U();if(!Object.keys(e).length)return null;var n=e.map(function(e){var n,r=e.channels().all()[0],a=null!=(n=null==r?void 0:r.address())?n:"",s=F.getOperationIdentifier({operation:e,config:t}),i=F.getOperationType(e);return d.createElement("li",{className:"mb-12",key:"".concat(i,"-").concat(e.id()),id:s},d.createElement(eW,{type:i,operation:e,channelName:a,channel:r}))});return d.createElement("section",{id:"".concat(F.getIdentifier("operations",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Operations"),d.createElement("ul",null,n))},eQ=function(){var e=D(),t=U(),n=!e.components().isEmpty()&&e.components().messages().all();return n&&0!==n.length?d.createElement("section",{id:"".concat(F.getIdentifier("messages",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Messages"),d.createElement("ul",null,n.map(function(e,n){var r,a;return d.createElement("li",{className:"mb-4",key:e.id(),id:F.getIdentifier("message-".concat(e.id()),t)},d.createElement(eq,{messageName:e.id(),message:e,index:n+1,key:e.id(),showExamples:null!=(a=null==(r=null==t?void 0:t.show)?void 0:r.messageExamples)&&a}))}))):null},eX=function(e){var t=e.schemaName,n=e.schema;return n?d.createElement("div",null,d.createElement("div",{className:"panel-item--center px-8"},d.createElement("div",{className:"shadow rounded px-4 py-2 border bg-gray-200"},d.createElement(eN,{schemaName:t,schema:n}))),d.createElement("div",{className:"w-full mt-4"})):null},eJ=function(){var e=D(),t=U(),n=!e.components().isEmpty()&&e.components().schemas().all();return n&&0!==n.length?d.createElement("section",{id:"".concat(F.getIdentifier("schemas",t)),className:"mt-16"},d.createElement("h2",{className:"2xl:w-7/12 text-3xl font-light mb-4 px-8"},"Schemas"),d.createElement("ul",null,n.map(function(e){return d.createElement("li",{className:"mb-4",key:e.id(),id:F.getIdentifier("schema-".concat(e.id()),t)},d.createElement(eX,{schemaName:e.id(),schema:e}))}))):null},eZ=n(14266),e0=function(e){var t=e.error;if(!t)return null;var n=t.title,r=t.validationErrors;return d.createElement("div",{className:"panel-item"},d.createElement("div",{className:"panel-item--center p-8"},d.createElement("section",{className:"shadow rounded bg-gray-200 border-red-500 border-l-8"},d.createElement("h2",{className:"p-2"},n?"".concat(w,": ").concat(n):w),(null==r?void 0:r.length)?d.createElement("div",{className:"bg-gray-800 text-white text-xs p-2"},d.createElement("pre",null,r?r.map(function(e,t){var n,r,a,s,i;return(null==e?void 0:e.title)?d.createElement("div",{key:t,className:"flex gap-2"},(null!=(r=null==(n=null==e?void 0:e.location)?void 0:n.startLine)?r:null==(a=null==e?void 0:e.location)?void 0:a.startOffset)&&d.createElement("span",null,"line ".concat((null==(s=null==e?void 0:e.location)?void 0:s.startLine)+(null==(i=null==e?void 0:e.location)?void 0:i.startOffset),":")),d.createElement("code",{className:"whitespace-pre-wrap break-all ml-2"},e.title)):null}).filter(Boolean):null)):null)),d.createElement("div",{className:"panel-item--right"}))};function e1(e){var t=e.error,n={title:"Something went wrong",type:"application-error",validationErrors:[{title:null==t?void 0:t.message}]};return d.createElement(e0,{error:n})}let e2=function(e){var t=e.children,n=(0,d.useState)(0),r=n[0],a=n[1];return(0,d.useEffect)(function(){a(function(e){return e+1})},[t]),d.createElement(eZ.tH,{key:r,fallbackRender:e1},t)},e3=function(e){var t,n,r=e.asyncapi,a=e.config,s=e.pluginManager,i=(0,d.useState)("container:xl"),l=i[0],o=i[1],c=(0,A.w)({onResize:function(e){var t=e.width;requestAnimationFrame(function(){if(void 0!==t){var e=t<=1536?"container:xl":"container:base";e!==l&&o(e)}})}}).ref,m=null!=(t=a.show)?t:{};return d.createElement(M.Provider,{value:a},d.createElement(L.Provider,{value:r},d.createElement(eS.Provider,{value:s},d.createElement("section",{className:"aui-root"},d.createElement(e2,null,d.createElement("div",{className:"".concat(l," relative md:flex bg-white leading-normal"),id:null!=(n=a.schemaID)?n:void 0,ref:c},m.sidebar&&d.createElement(H,null),d.createElement("div",{className:"panel--center relative py-8 flex-1"},d.createElement("div",{className:"relative z-10"},m.info&&d.createElement(eI,null),m.servers&&d.createElement(eR,null),m.operations&&d.createElement(eG,null),m.messages&&d.createElement(eQ,null),m.schemas&&d.createElement(eJ,null)),d.createElement("div",{className:"panel--right absolute top-0 right-0 h-full bg-gray-800"}))))))))};var e4=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{o(r.next(e))}catch(e){s(e)}}function l(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,l)}o((r=r.apply(e,t||[])).next())})},e6=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(l){return function(o){var c=[l,o];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},e5=function(){function e(e){this.plugins=new Map,this.pendingInstalls=new Map,this.cancelledInstalls=new Set,this.pendingUninstalls=new Map,this.destroyed=!1,this.slotComponents=new Map,this.eventListeners=new Map,this.context=e}return e.prototype.register=function(e){return e4(this,void 0,void 0,function(){var t,n,r,a,s,i,l,o,c,m;return e6(this,function(u){switch(u.label){case 0:if(!(t=this.pendingUninstalls.get(e.name)))return[3,2];return[4,t];case 1:u.sent(),u.label=2;case 2:if(this.destroyed)return console.warn("Plugin manager has been destroyed"),[2,!1];if(this.plugins.has(e.name)||this.pendingInstalls.has(e.name))return console.warn("Plugin ".concat(e.name," is already registered")),[2,!1];n=[],r={active:!0},a=new AbortController,i=new Promise(function(e){s=e}),l=this.createPluginAPI(e,n,function(){return r.active},a.signal),o={plugin:e,api:l,listeners:n,state:r,controller:a,completion:i,resolveCompletion:s},this.pendingInstalls.set(e.name,o),u.label=3;case 3:return u.trys.push([3,5,8,9]),[4,e.install(l)];case 4:return u.sent(),[3,9];case 5:if(c=u.sent(),m=this.cancelledInstalls.delete(e.name),o.state.active=!1,o.controller.abort(),this.removePluginComponents(e.name),this.removePluginListeners(o),!m)return[3,7];return[4,this.trackUninstall(o)];case 6:case 10:return u.sent(),o.resolveCompletion(),[2,!1];case 7:return console.error("Failed to register plugin ".concat(e.name,":"),c),this.emit(S,{pluginName:e.name,message:c instanceof Error?c.message:String(c),timestamp:new Date().toISOString()}),o.resolveCompletion(),[2,!1];case 8:return this.pendingInstalls.delete(e.name),[7];case 9:if(!this.cancelledInstalls.has(e.name))return[3,11];return this.cancelledInstalls.delete(e.name),this.removePluginComponents(e.name),this.removePluginListeners(o),[4,this.trackUninstall(o)];case 11:return this.plugins.set(e.name,o),this.emit(k,{pluginName:e.name,message:"Plugin registered successfully",timestamp:new Date().toISOString()}),o.resolveCompletion(),[2,!0]}})})},e.prototype.unregister=function(e){var t=this.plugins.get(e),n=this.pendingInstalls.get(e);if(!t&&!n){var r=this.pendingUninstalls.get(e);return r||(console.warn('Plugin "'.concat(e,'" not found')),Promise.resolve())}return(n&&(n.state.active=!1,n.controller.abort(),this.removePluginListeners(n),this.cancelledInstalls.add(e)),t&&(t.state.active=!1,t.controller.abort()),this.plugins.delete(e),this.removePluginComponents(e),t)?(this.removePluginListeners(t),this.trackUninstall(t)):n.completion},e.prototype.destroy=function(){return e4(this,void 0,void 0,function(){var e,t=this;return e6(this,function(n){switch(n.label){case 0:return this.destroyed=!0,this.pendingInstalls.forEach(function(e,n){e.state.active=!1,e.controller.abort(),t.cancelledInstalls.add(n)}),e=new Set(Array.from(this.pendingInstalls.values(),function(e){return e.completion})),Array.from(this.plugins.keys()).forEach(function(n){e.add(t.unregister(n))}),this.pendingUninstalls.forEach(function(t){return e.add(t)}),this.slotComponents.clear(),[4,Promise.all(Array.from(e))];case 1:return n.sent(),this.eventListeners.clear(),[2]}})})},e.prototype.runUninstall=function(e){return e4(this,void 0,void 0,function(){var t,n,r;return e6(this,function(a){switch(a.label){case 0:if(t=e.plugin,n=e.api,e.state.active=!1,e.controller.abort(),!t.uninstall)return[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,t.uninstall(n)];case 2:return a.sent(),[3,4];case 3:return r=a.sent(),console.error("Failed to uninstall plugin ".concat(t.name,":"),r),this.emit(S,{pluginName:t.name,message:r instanceof Error?r.message:String(r),timestamp:new Date().toISOString()}),[3,4];case 4:return[2]}})})},e.prototype.trackUninstall=function(e){var t=this,n=e.plugin.name,r=this.runUninstall(e);return this.pendingUninstalls.set(n,r),r.finally(function(){t.pendingUninstalls.get(n)===r&&t.pendingUninstalls.delete(n)}),r},e.prototype.removePluginListeners=function(e){var t=this;e.listeners.forEach(function(e){var n=e.eventName,r=e.callback;t.off(n,r)}),e.listeners.length=0},e.prototype.removePluginComponents=function(e){this.slotComponents.forEach(function(t){for(var n=t.length;n--;)t[n].pluginName===e&&t.splice(n,1)})},e.prototype.createPluginAPI=function(e,t,n,r){var a=this;return{signal:r,registerComponent:function(t,r,s){if(void 0===s&&(s={}),n()){a.slotComponents.has(t)||a.slotComponents.set(t,[]);var i,l=null!=(i=s.priority)?i:100;a.slotComponents.get(t).push({component:r,priority:l,label:s.label,pluginName:null==e?void 0:e.name}),a.slotComponents.get(t).sort(function(e,t){return t.priority-e.priority})}},onSpecLoaded:function(e){n()&&(a.on(C,e),t.push({eventName:C,callback:e}),void 0!==a.context.schema&&e(a.context.schema))},getContext:function(){return a.context},on:function(e,r){n()&&(a.on(e,r),t.push({eventName:e,callback:r}))},off:function(e,n){a.off(e,n);var r=t.findIndex(function(t){return t.eventName===e&&t.callback===n});-1!==r&&t.splice(r,1)},emit:function(e,t){a.emit(e,t)}}},e.prototype.on=function(e,t){this.eventListeners.has(e)||this.eventListeners.set(e,new Set),this.eventListeners.get(e).add(t)},e.prototype.off=function(e,t){var n=this.eventListeners.get(e);n&&(n.delete(t),0===n.size&&this.eventListeners.delete(e))},e.prototype.emit=function(e,t){var n=this.eventListeners.get(e);n&&Array.from(n).forEach(function(n){try{n(t)}catch(t){console.error('Plugin event listener failed for "'.concat(e,'":'),t)}})},e.prototype.listeners=function(e){var t=this.eventListeners.get(e);return t?Array.from(t):[]},e.prototype.eventNames=function(){return Array.from(this.eventListeners.keys())},e.prototype.getComponentsForSlot=function(e){var t;return(null!=(t=this.slotComponents.get(e))?t:[]).map(function(e){return e.component})},e.prototype.updateContext=function(e){this.context=e,void 0!==e.schema&&this.emit(C,e.schema)},e.prototype.getPlugin=function(e){var t;return null==(t=this.plugins.get(e))?void 0:t.plugin},e.prototype.listPlugins=function(){return Array.from(this.plugins.values()).map(function(e){var t=e.plugin;return{name:t.name,version:t.version}})},e}(),e7=(i=function(e,t){return(i=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),e8=function(){return(e8=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},e9=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{o(r.next(e))}catch(e){s(e)}}function l(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,l)}o((r=r.apply(e,t||[])).next())})},te=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(l){return function(o){var c=[l,o];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},tt=function(e){function t(t){var n=e.call(this,t)||this;n.registeredPlugins=new Set,n.propsPlugins=new Set,n.pluginEventHandlers=new Map,n.hasMounted=!1,n.state={asyncapi:void 0,error:void 0,pm:new e5({})};var r=g.retrieveParsedSpec(t.schema);return r&&(n.state=e8(e8({},n.state),{asyncapi:r})),n}return e7(t,e),t.prototype.componentDidMount=function(){var e;this.hasMounted=!0,this.state.asyncapi?null==(e=this.state.pm)||e.updateContext({schema:this.state.asyncapi}):this.updateState(this.props.schema),this.props.onPluginManagerReady&&this.props.onPluginManagerReady(this.state.pm),this.setupEventListeners(),this.registerPlugins()},t.prototype.componentDidUpdate=function(e){var t=this.props,n=t.schema,r=t.plugins,a=t.onPluginEvent;e.schema!==n&&this.updateState(n),a!==e.onPluginEvent&&(this.cleanupEventListeners(),this.setupEventListeners()),r!==e.plugins&&this.updatePlugins(e.plugins,r)},t.prototype.componentWillUnmount=function(){var e;this.hasMounted=!1,this.cleanupEventListeners(),null==(e=this.state.pm)||e.destroy()},t.prototype.render=function(){var e,t=this.props,n=t.config,r=t.error,a=this.state,s=a.asyncapi,i=a.error,l=a.pm,o=null!=r?r:i,c=e8(e8(e8({},O),n),{show:e8(e8({},O.show),!!n&&n.show),expand:e8(e8({},O.expand),!!n&&n.expand),sidebar:e8(e8({},O.sidebar),!!n&&n.sidebar),extensions:e8(e8({},O.extensions),!!n&&n.extensions)});return s?d.createElement(e3,{asyncapi:s,config:c,pluginManager:l}):o?(null==(e=c.show)?void 0:e.errors)&&d.createElement("section",{className:"aui-root"},d.createElement(e0,{error:o})):null},t.prototype.getOrCreateHandler=function(e){var t=this;return this.pluginEventHandlers.has(e)||this.pluginEventHandlers.set(e,function(n){var r,a;null==(a=(r=t.props).onPluginEvent)||a.call(r,e,n)}),this.pluginEventHandlers.get(e)},t.prototype.setupEventListeners=function(){var e=this,t=this.props.onPluginEvent,n=this.state.pm;t&&I.forEach(function(t){null==n||n.on(t,e.getOrCreateHandler(t))})},t.prototype.cleanupEventListeners=function(){var e=this,t=this.state.pm;I.forEach(function(n){null==t||t.off(n,e.getOrCreateHandler(n))})},t.prototype.registerPlugins=function(){return e9(this,void 0,void 0,function(){var e,t,n,r,a,s,i,l;return te(this,function(o){switch(o.label){case 0:e=this.props.plugins,t=this.state.pm,n=function(e){var n,a;return te(this,function(s){switch(s.label){case 0:return[4,null==t?void 0:t.register(e)];case 1:if(n=s.sent(),a=(null!=(l=r.props.plugins)?l:[]).some(function(t){return t.name===e.name}),!(n&&a&&r.hasMounted))return[3,2];return r.registeredPlugins.add(e.name),r.propsPlugins.add(e.name),[3,4];case 2:if(!n)return[3,4];return[4,null==t?void 0:t.unregister(e.name)];case 3:s.sent(),s.label=4;case 4:return[2]}})},r=this,a=0,s=null!=e?e:[],o.label=1;case 1:if(!(a<s.length))return[3,4];return i=s[a],[5,n(i)];case 2:o.sent(),o.label=3;case 3:return a++,[3,1];case 4:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.updatePlugins=function(e,t){return e9(this,void 0,void 0,function(){var n,r,a,s,i,l,o,c,m,u,d,p,h,f,g,v,y,x=this;return te(this,function(b){switch(b.label){case 0:n=this.state.pm,r=new Map((null!=e?e:[]).map(function(e){return[e.name,e]})),a=new Map((null!=t?t:[]).map(function(e){return[e.name,e]})),s=Array.from(r.keys()).filter(function(e){return!a.has(e)&&x.propsPlugins.has(e)}),i=0,l=s,b.label=1;case 1:if(!(i<l.length))return[3,6];o=l[i],b.label=2;case 2:return b.trys.push([2,4,,5]),[4,null==n?void 0:n.unregister(o)];case 3:return b.sent(),this.registeredPlugins.delete(o),this.propsPlugins.delete(o),[3,5];case 4:return c=b.sent(),console.error("Failed to unregister plugin ".concat(o,":"),c),[3,5];case 5:return i++,[3,1];case 6:m=Array.from(a.entries()).filter(function(e){var t=e[0];return!r.has(t)}),u=function(e,t){var r,a;return te(this,function(s){switch(s.label){case 0:return[4,null==n?void 0:n.register(t)];case 1:if(r=s.sent(),a=(null!=(y=d.props.plugins)?y:[]).some(function(t){return t.name===e}),!(r&&a))return[3,2];return d.registeredPlugins.add(e),d.propsPlugins.add(e),[3,4];case 2:if(!r)return[3,4];return[4,null==n?void 0:n.unregister(e)];case 3:s.sent(),s.label=4;case 4:return[2]}})},d=this,p=0,h=m,b.label=7;case 7:if(!(p<h.length))return[3,10];return g=(f=h[p])[0],v=f[1],[5,u(g,v)];case 8:b.sent(),b.label=9;case 9:return p++,[3,7];case 10:return this.hasMounted&&this.setState({}),[2]}})})},t.prototype.updateState=function(e){var t,n=g.retrieveParsedSpec(e);n?(this.setState({asyncapi:n}),null==(t=this.state.pm)||t.updateContext({schema:n})):this.setState({asyncapi:void 0})},t}(d.Component),tn=n(48877),tr=n(21420),ta=n(90470),ts=n(2639),ti=n(5159),tl=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{o(r.next(e))}catch(e){s(e)}}function l(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,l)}o((r=r.apply(e,t||[])).next())})},to=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(l){return function(o){var c=[l,o];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},tc=new tn.i;tc.registerSchemaParser((0,ta.z)()),tc.registerSchemaParser((0,ti.dk)()),tc.registerSchemaParser((0,ts.y)());var tm=function(){function e(){}return e.parse=function(e,t){return tl(this,void 0,void 0,function(){var n,r,a,s;return to(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,tc.parse(e,t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0===r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.parseFromUrl=function(e,t){return tl(this,void 0,void 0,function(){var n,r,a,s;return to(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,(0,tr.o)(tc,e.url,e.requestOptions).parse(t)];case 1:if(r=(n=i.sent()).document,a=n.diagnostics,void 0==r)throw this.convertDiagnosticToErrorObject(a,[0]);return[2,{asyncapi:r,error:void 0}];case 2:return s=i.sent(),[2,this.handleError(s)];case 3:return[2]}})})},e.convertDiagnosticToErrorObject=function(e,t){var n={title:"There are errors in your Asyncapi document",type:"VALIDATION_ERRORS_TYPE",validationErrors:[]};return e.forEach(function(e){var r;if(t.includes(e.severity)){var a={title:e.message,location:{jsonPointer:"/"+e.path.join("/"),startLine:e.range.start.line,startColumn:e.range.start.character,startOffset:1,endLine:e.range.end.line,endColumn:e.range.end.character,endOffset:0}};null==(r=n.validationErrors)||r.push(a)}}),n},e.handleError=function(e){return e.type,{error:e}},e}(),tu=(l=function(e,t){return(l=Object.setPrototypeOf||({__proto__:[]})instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}l(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),td=function(e,t,n,r){return new(n||(n=Promise))(function(a,s){function i(e){try{o(r.next(e))}catch(e){s(e)}}function l(e){try{o(r.throw(e))}catch(e){s(e)}}function o(e){var t;e.done?a(e.value):((t=e.value)instanceof n?t:new n(function(e){e(t)})).then(i,l)}o((r=r.apply(e,t||[])).next())})},tp=function(e,t){var n,r,a,s,i={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function l(l){return function(o){var c=[l,o];if(n)throw TypeError("Generator is already executing.");for(;s&&(s=0,c[0]&&(i=0)),i;)try{if(n=1,r&&(a=2&c[0]?r.return:c[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,c[1])).done)return a;switch(r=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return i.label++,{value:c[1],done:!1};case 5:i.label++,r=c[1],c=[0];continue;case 7:c=i.ops.pop(),i.trys.pop();continue;default:if(!(a=(a=i.trys).length>0&&a[a.length-1])&&(6===c[0]||2===c[0])){i=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){i.label=c[1];break}if(6===c[0]&&i.label<a[1]){i.label=a[1],a=c;break}if(a&&i.label<a[2]){i.label=a[2],i.ops.push(c);break}a[2]&&i.ops.pop(),i.trys.pop();continue}c=t.call(e,i)}catch(e){c=[6,e],r=0}finally{n=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}}},th=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.state={asyncapi:void 0,error:void 0},t}return tu(t,e),t.prototype.componentDidMount=function(){return td(this,void 0,void 0,function(){var e,t,n;return tp(this,function(r){switch(r.label){case 0:if(!this.props.schema)return[3,2];return t=(e=this.props).schema,n=e.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.componentDidUpdate=function(e){return td(this,void 0,void 0,function(){var t,n;return tp(this,function(r){switch(r.label){case 0:if(e.schema===(t=this.props.schema))return[3,2];return n=this.props.config,[4,this.parseSchema(t,null==n?void 0:n.parserOptions)];case 1:r.sent(),r.label=2;case 2:return[2]}})})},t.prototype.render=function(){var e=this.props,t=e.schema,n=e.config,r=e.plugins,a=e.onPluginEvent,s=e.onPluginManagerReady,i=this.state,l=i.asyncapi,o=i.error;return d.createElement(tt,{schema:null!=l?l:t,config:n,error:o,plugins:r,onPluginEvent:a,onPluginManagerReady:s})},t.prototype.parseSchema=function(e,t){return td(this,void 0,void 0,function(){var n,r,a;return tp(this,function(s){switch(s.label){case 0:if(n=g.retrieveParsedSpec(e))return this.setState({asyncapi:n}),[2];if(void 0===e.url)return[3,2];return[4,tm.parseFromUrl(e,t)];case 1:return r=s.sent(),this.setState({asyncapi:r.asyncapi,error:r.error}),[2];case 2:return[4,tm.parse(e,t)];case 3:return a=s.sent(),this.setState({asyncapi:a.asyncapi,error:a.error}),[2]}})})},t}(d.Component),tf=n(81535);let tg=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-0"})([""]),tv=tf.Ay.nav.withConfig({componentId:"sc-2c3b2ddd-1"})(["display:flex;flex-direction:row;flex-wrap:nowrap;width:100%;line-height:48px;padding:0;background-color:#263238;border-bottom:#607d8b 2px solid;"]),ty=tf.Ay.header.withConfig({componentId:"sc-2c3b2ddd-2"})(["margin-left:16px;display:inline-block;"]),tx=tf.Ay.h1.withConfig({componentId:"sc-2c3b2ddd-3"})(["color:#fff;margin:0;font-weight:bold;font-size:20px;line-height:48px;"]),tb=tf.Ay.img.withConfig({componentId:"sc-2c3b2ddd-4"})(["height:34px;max-height:34px;margin-top:7px;float:left;"]),tE=tf.Ay.span.withConfig({componentId:"sc-2c3b2ddd-5"})(["font-weight:bold;margin-left:12px;"]),tN=tf.Ay.span.withConfig({componentId:"sc-2c3b2ddd-6"})(["font-style:italic;margin-left:6px;"]);tf.Ay.a.withConfig({componentId:"sc-2c3b2ddd-7"})([""]);let tw=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-8"})(["background:rgb(38,50,56);"]),tk=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-9"})(["height:calc(100vh - 50px);min-height:calc(100vh - 50px);overflow:auto;> .asyncapi{padding:24px;}> .asyncapi__error{margin:24px;}"]),tS=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-10"})(["box-sizing:border-box;width:100%;height:100%;margin:0;font-family:sans-serif;font-weight:normal;"]),tC=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-11"})(["> .react-codemirror2 > .CodeMirror{height:100%;min-height:100%;}"]),tI=tf.Ay.ul.withConfig({componentId:"sc-2c3b2ddd-12"})(["list-style:none;padding:0;margin:0 5px 15px;display:flex;justify-items:flex-start;flex-flow:row nowrap;"]),tO=tf.Ay.li.withConfig({componentId:"sc-2c3b2ddd-13"})(["margin:0 0 0 auto;position:relative;display:inline-block;padding:19px 15px;"]),tA=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-14"})(["font-family:sans-serif;font-weight:700;color:#f77669;transition:0.2s all linear;opacity:",";animation-name:spin;animation-duration:1.5s;animation-iteration-count:infinite;animation-timing-function:linear;@keyframes spin{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}"],e=>e.$show?"1":"0"),tP=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-15"})(["margin:0;padding:0 20px;font-size:14px;color:#515559;line-height:1.57;overflow:auto;height:calc(100vh - 117px);min-height:calc(100vh - 117px);"]),tj=tf.Ay.li.withConfig({componentId:"sc-2c3b2ddd-16"})([""]),tT=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-17"})(["display:flex;align-items:center;margin:0 15px;padding:19px 0 15px;border:none;position:relative;color:",";font-size:14px;outline:none;transition:0.2s color linear;text-transform:uppercase;cursor:pointer;&:first-letter{text-transform:uppercase;}&:after{content:'';bottom:0;display:block;position:absolute;height:",";width:100%;border-radius:2px;background-color:#c3e88d;}&:hover{color:#c3e88d;&:after{content:'';bottom:0;display:block;position:absolute;height:3px;width:100%;border-radius:2px;background-color:#c3e88d;}}"],e=>e.$active?"#c3e88d":"#f77669",e=>e.$active?"3px":"0px"),tR=tf.Ay.div.withConfig({componentId:"sc-2c3b2ddd-18"})(["display:flex;box-sizing:border-box;position:relative;margin-bottom:20px;"]),tL=tf.Ay.input.withConfig({componentId:"sc-2c3b2ddd-19"})(["width:100%;padding:6px 12px;box-sizing:border-box;outline:none;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;transition:0.2s border,color linear;font-size:14px;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tD=tf.Ay.button.withConfig({componentId:"sc-2c3b2ddd-20"})(["width:auto;padding:6px 12px;display:inline-block;background:inherit;border:3px solid #f77669;color:#f77669;border-radius:6px;font-size:14px;margin-left:12px;white-space:nowrap;transition:0.2s border,color linear;cursor:pointer;&:hover{color:#c3e88d;border-color:#c3e88d;}"]),tM=()=>(0,u.jsx)(tv,{children:(0,u.jsx)(ty,{children:(0,u.jsxs)(tx,{children:[(0,u.jsx)(tb,{src:"https://avatars0.githubusercontent.com/u/16401334?v=4&s=200",alt:"AsyncAPI logo"}),(0,u.jsx)(tE,{children:"AsyncAPI React"}),(0,u.jsx)(tN,{children:"editor"})]})})});var tU=n(28824),tF=n(58772),tq=n(19540);class tz extends d.Component{componentDidUpdate(e){let{externalResource:t}=this.props;t&&e.externalResource!==t&&this.setState({code:t})}render(){let{state:{code:e}}=this;return(0,u.jsx)(tC,{children:(0,u.jsx)(tU.Ay,{value:e,basicSetup:{lineNumbers:!0,tabSize:2},theme:tq.El,extensions:[(0,tF.o)()],onChange:e=>{this.props.parentCallback(e)}})})}constructor(...e){super(...e),this.state={code:this.props.code}}}let t_=async e=>fetch(e,{method:"GET"}).then(tH);function tH(e){return e.text().then(e=>e)}function t$(e,t,n,r){let a;return(...s)=>{a&&clearTimeout(a),n(),a=setTimeout(()=>{a=void 0,e(...s),r()},t||1e3)}}class tW extends d.Component{render(){let{link:e}=this.state;return(0,u.jsxs)(tR,{children:[(0,u.jsx)(tL,{value:e,placeholder:"Link for external schema",onChange:e=>this.setState({link:e.target.value})}),(0,u.jsx)(tD,{type:"button",onClick:this.fetchSchemaFromExternalResources,children:"Fetch schema"})]})}constructor(...e){super(...e),this.state={link:""},this.fetchSchemaFromExternalResources=async()=>{try{new URL(this.state.link)}catch(e){return}let{props:{parentCallback:e},state:{link:t}}=this;e(await t_(t))}}}var tV=n(98208);let tK=e=>(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(tV.A,{style:{width:"100%",height:"calc(100vh - 50px)",minHeight:"calc(100vh - 50px)",display:"flex",background:"#f3f4f5"},gutter:()=>{let e=document.createElement("div");return e.onmouseover=()=>e.style.cursor="ew-resize",e},gutterStyle:()=>({backgroundColor:"gray",width:"7px"}),minSize:250,children:e.children})});class tY extends d.Component{constructor(e){super(e),this.handleTabClick=e=>{this.setState({activeTabIndex:e})},this.renderHeader=e=>d.Children.map(e,(e,t)=>d.cloneElement(e,{title:e.props.title,parentCallback:this.handleTabClick,tabIndex:t,isActive:t===this.state.activeTabIndex})),this.renderActiveTab=e=>e[this.state.activeTabIndex]?e[this.state.activeTabIndex].props.children:null,this.state={activeTabIndex:this.props.defaultActiveTabIndex?this.props.defaultActiveTabIndex:0}}render(){let{additionalHeaderContent:e}=this.props,t=[].concat(...this.props.children).filter(e=>null!=e);return(0,u.jsxs)(tS,{children:[(0,u.jsxs)(tI,{children:[this.renderHeader(t),(0,u.jsx)(tO,{children:e})]}),(0,u.jsx)(tP,{children:this.renderActiveTab(t)})]})}}class tB extends d.Component{render(){let{title:e,tabIndex:t,isActive:n,parentCallback:r}=this.props;return(0,u.jsx)(tj,{children:(0,u.jsx)(tT,{onClick:e=>{e.preventDefault(),r&&void 0!=t&&r(t)},$active:n,children:e})},t)}}let tG=`{
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
}`,tQ=`asyncapi: '2.6.0'
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
`;class tX extends d.Component{constructor(e){super(e),this.state={schema:tQ,config:tG,schemaFromExternalResource:"",refreshing:!1},this.updateSchema=e=>{this.setState({schema:e})},this.updateSchemaFromExternalResource=e=>{this.setState({schemaFromExternalResource:e})},this.updateConfig=e=>{this.setState({config:e})},this.startRefreshing=()=>{setTimeout(()=>{this.setState({refreshing:!0})},500)},this.stopRefreshing=()=>{this.setState({refreshing:!1})},this.updateSchemaFn=t$(this.updateSchema,750,this.startRefreshing,this.stopRefreshing),this.updateConfigFn=t$(this.updateConfig,750,this.startRefreshing,this.stopRefreshing)}render(){let{schema:e,config:t,schemaFromExternalResource:n}=this.state,r=(e=>{if(!e)return{};try{return JSON.parse(e)}catch(e){return{}}})(t||tG);return(0,u.jsxs)(tg,{children:[(0,u.jsx)(tM,{}),(0,u.jsxs)(tK,{children:[(0,u.jsx)(tw,{children:(0,u.jsxs)(tY,{additionalHeaderContent:(0,u.jsx)(tA,{$show:this.state.refreshing,children:""}),children:[(0,u.jsx)(tB,{title:"Schema",children:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(tW,{parentCallback:this.updateSchemaFromExternalResource}),(0,u.jsx)(tz,{code:e,externalResource:n,parentCallback:this.updateSchemaFn},"Schema")]})},"Schema"),(0,u.jsx)(tB,{title:"Configuration",children:(0,u.jsx)(tz,{code:t,parentCallback:this.updateConfigFn},"Configuration")},"Configuration")]})}),(0,u.jsx)(tk,{children:(0,u.jsx)(th,{schema:e,config:r})})]})]})}}let tJ=tX},48608:()=>{},87899:()=>{},96172:()=>{},99154:()=>{}},e=>{e.O(0,[61,929,163,248,450,391,965,38,347,158,358],()=>e(e.s=37376)),_N_E=e.O()}]);