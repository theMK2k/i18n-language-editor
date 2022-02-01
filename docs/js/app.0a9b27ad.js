(function(e){function t(t){for(var r,o,l=t[0],c=t[1],u=t[2],f=0,d=[];f<l.length;f++)o=l[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&d.push(i[o][0]),i[o]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);s&&s(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,l=1;l<n.length;l++){var c=n[l];0!==i[c]&&(r=!1)}r&&(a.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},i={app:0},a=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/i18n-language-editor/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],c=l.push.bind(l);l.push=t,l=l.slice();for(var u=0;u<l.length;u++)t(l[u]);var s=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"363a":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var r={};n.r(r),n.d(r,"readTextFileAsync",(function(){return g}));n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[e._v("i18n Language Editor")]),n("v-spacer"),n("v-btn",{attrs:{color:"primary"},on:{click:e.onReset}},[e._v("RESET ")])],1),n("v-main",[n("language-editor",{ref:"languageEditor"})],1)],1)},o=[],l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[e.workflow===e.enmWorkflow.LOADLANGUAGEFILE||e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("div",[e.workflow===e.enmWorkflow.LOADLANGUAGEFILE?n("h1",[e._v(" Step 1 of 3: Load the language file to be edited ")]):e._e(),e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("h1",[e._v(" Step 2 of 3: Load a reference language file if available ")]):e._e(),e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("p",[e._v(" The reference language file is optional. ")]):e._e(),n("file-drop",{ref:"fileDrop",attrs:{accept:".json",disableLabel:!0},on:{update:e.onUpdateFile}}),n("v-row",[n("v-spacer"),n("v-btn",{attrs:{color:"primary",disabled:e.disableNext},on:{click:e.onNext}},[e._v("NEXT")])],1)],1):e._e(),e.workflow===e.enmWorkflow.EDITLANGUAGE?n("div",[n("h1",[e._v("Step 3 of 3: Edit the language file")]),e.editorData?n("div",{staticStyle:{"margin-top":"16px"}},e._l(Object.keys(e.editorData),(function(t){return n("v-row",{key:t},[e._l(e.countDots(t),(function(e){return n("div",{key:e,staticStyle:{width:"16px"}})})),"category"===e.editorData[t]._type_?n("div",{staticStyle:{"margin-bottom":"8px"}},[n("h3",[e._v(e._s(e.editorData[t]._value_))])]):e._e(),"entry"===e.editorData[t]._type_?n("v-row",[n("v-text-field",{attrs:{label:e.editorData[t]._reference_},model:{value:e.editorData[t]._value_,callback:function(n){e.$set(e.editorData[t],"_value_",n)},expression:"editorData[key]._value_"}})],1):e._e()],2)})),1):e._e()]):e._e()])},c=[],u=n("1da1"),s=(n("ac1f"),n("466d"),n("96cf"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"dropzone",staticClass:"dropzone",on:{dragover:function(e){e.preventDefault()},dragleave:e.dragleave,dragenter:e.dragenter,drop:e.drop}},[e.disableLabel?e._e():e._t("default",(function(){return[n("h1",[e._v(e._s(e.label||"Upload Box"))])]})),n("v-btn",{on:{click:function(t){return e.$refs.filebtn.click()}}},[n("v-icon",{attrs:{left:"",dark:""}},[e._v("mdi-cloud-upload")]),e._v(" Load ")],1),e.disableHint?e._e():n("p",[e._v("* you can also drag and drop files here")]),n("div",{staticClass:"input-container"},e._l(e.files,(function(t){return n("v-input",{key:t.name,attrs:{"append-icon":"mdi-close","prepend-icon":"mdi-insert-drive-file"},on:{"click:append":function(n){return e.remove(t)}}},[e._v(" "+e._s(t.name)+" ")])})),1),n("input",{ref:"filebtn",staticClass:"filebtn",attrs:{type:"file",multiple:e.multiple,accept:e.validatedAccept&&e.validatedAccept.extensions.concat(e.validatedAccept.mimetypes).join(",")},on:{input:e.upload}})],2)}),f=[],d=(n("a434"),n("d3b7"),n("d81d"),n("5319"),n("4d63"),n("c607"),n("2c3e"),n("25f0"),n("4de4"),n("1276"),n("b0c0"),n("159b"),{data:function(){return{hoverCounter:0,hoveringContent:null,matchAnything:/.*/,files:[]}},props:["label","accept","multiple","disableLabel","disableHint"],watch:{multiple:function(e){e||this.files.splice(0,this.files.length-1)},hoveringContent:function(e){var t=this;if(e)if(this.accept&&this.accept.length&&0===this.validTypes.extensions.length){for(var n=!1,r=function(r){if(t.validTypes.mimetypes.reduce((function(t,n){return t||!!e[r].type.match(n)}),!1))return n=!0,"break"},i=0;i<e.length;i++){var a=r(i);if("break"===a)break}n&&(this.$refs.dropzone.style.backgroundColor="rgba(0, 0, 0, 0.25)")}else{for(var o=!1,l=0;l<e.length;l++)if("file"===e[l].kind){o=!0;break}o&&(this.$refs.dropzone.style.backgroundColor="rgba(0, 0, 0, 0.25)")}else this.$refs.dropzone.style.backgroundColor=""},hoverCounter:function(e){0===e&&(this.hoveringContent=null)}},computed:{validTypes:function(){return this.validatedAccept?{extensions:this.validatedAccept.extensions.map((function(e){return e.replace(/(\W)/g,"\\$1")})).map((function(e){return new RegExp("".concat(e,"$"),"i")})),mimetypes:this.validatedAccept.mimetypes.map((function(e){return e.replace(/([-+/])/g,"\\$1")})).map((function(e){return e.replace(/\*/g,"(?:[A-Za-z0-9\\-\\+]*)*")})).map((function(e){return new RegExp("^".concat(e,"$"))}))}:{extensions:[this.matchAnything],mimetypes:[this.matchAnything]}},validatedAccept:function(){return this.accept?{extensions:this.accept.split(",").filter((function(e){return e.match(/^\.(?!.*\/)/)})),mimetypes:this.accept.split(",").filter((function(e){return e.match(/^(?:(?:[A-Za-z0-9\-+]*)|\*)\/(?:(?:[A-Za-z0-9\-+]*)|\*)$/)}))}:null}},methods:{reset:function(){this.files=[],this.$refs.filebtn.value=""},upload:function(){for(var e=this,t=this.$refs.filebtn,n=t.files||{},r=function(t){e.multiple||e.files.splice(0,e.files.length);var r=e.validTypes.extensions.reduce((function(e,r){return e||!!n[t].name.match(r)}),!1)||e.validTypes.mimetypes.reduce((function(e,r){return e||!!n[t].type.match(r)}),!1);r&&e.files.push(n[t])},i=0;i<n.length;i++)r(i);this.$refs.filebtn.value="",this.$emit("update",this.files)},dragenter:function(e){this.hoveringContent=(e.dataTransfer||{}).items,this.hoverCounter++},dragleave:function(){this.hoverCounter--},drop:function(e){var t=this;e.preventDefault(),this.hoverCounter=0;var n=(e.dataTransfer||{}).items||[];if(n){for(var r=[],i=0;i<n.length;i++)if("file"===n[i].kind){var a=function(){if(n[i].webkitGetAsEntry){var e=n[i].webkitGetAsEntry();if(e.isDirectory)return r.push(e.name),"continue"}var a=n[i].getAsFile();if(!a)return"continue";var o=t.validTypes.extensions.reduce((function(e,t){return e||!!a.name.match(t)}),!1)||t.validTypes.mimetypes.reduce((function(e,t){return e||!!a.type.match(t)}),!1);if(!o)return r.push(a),"continue";t.multiple?t.files.filter((function(e){return e.name===a.name})).forEach((function(e){return t.files.splice(t.files.indexOf(e),1)})):t.files.splice(0,t.files.length),t.files.push(a)}();if("continue"===a)continue}r.length&&this.$emit("rejectedFiles",r)}this.$emit("update",this.files)},remove:function(e){var t=this.files;t.splice(t.indexOf(e),1),this.$emit("update",null)}}}),p=d,h=(n("9fc3"),n("2877")),v=Object(h["a"])(p,s,f,!1,null,"6409f62f",null),_=v.exports;function g(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=n,r.readAsText(e)}))}var m={LOADLANGUAGEFILE:1,LOADREFERENCEFILE:2,EDITLANGUAGE:3},y={name:"LanguageEditor",components:{FileDrop:_},data:function(){return{workflow:m.LOADLANGUAGEFILE,languageFile:null,referenceFile:null,editorData:null,mockData:{global:{id:{_value_:"de",_reference_:"en"},lang:{_value_:"Deutsch",_reference_:"English"},idLocale:{_value_:"de-DE",_reference_:"en-EN"},generalHelpTextWithPhoneNumber:{_value_:"Bitte kontaktiere die Service Hotline {serviceHotline}, wenn Du Unterstützung benötigst.",_reference_:"Contact the service hotline at {serviceHotline} if you need assistance."}},authMethod:{pleaseSelectAuthMethod:{_value_:"Wie möchtest Du Dich anmelden?",_reference_:"How do you want to login?"},pin:{name:{_value_:"PIN",_reference_:"PIN"},caption:{_value_:"Anmelden um zu laden",_reference_:"Login to charge"}}}},mockDataFlat:{global:{_type_:"category",_value_:"global"},"global.id":{_type_:"entry",_value_:"de",_reference_:"en"},"global.lang":{_type_:"entry",_value_:"Deutsch",_reference_:"English"},"global.idLocale":{_type_:"entry",_value_:"de-DE",_reference_:"en-EN"},"global.generalHelpTextWithPhoneNumber":{_type_:"entry",_value_:"Bitte kontaktiere die Service Hotline {serviceHotline}, wenn Du Unterstützung benötigst.",_reference_:"Contact the service hotline at {serviceHotline} if you need assistance."},authMethod:{_type_:"category",_value_:"authMethod"},"authMethod.pleaseSelectAuthMethod":{_type_:"entry",_value_:"Wie möchtest Du Dich anmelden?",_reference_:"How do you want to login?"},"authMethod.pin":{_type_:"category",_value_:"pin"},"authMethod.pin.name":{_type_:"entry",_value_:"PIN",_reference_:"PIN"},"authMethod.pin.caption":{_type_:"entry",_value_:"Anmelden um zu laden",_reference_:"Login to charge"}}}},computed:{enmWorkflow:function(){return m},disableNext:function(){return this.workflow===m.LOADLANGUAGEFILE&&!this.languageFile}},methods:{reset:function(){this.workflow=m.LOADLANGUAGEFILE,this.languageFile=null,this.referenceFile=null},onNext:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.workflow!==m.LOADLANGUAGEFILE){t.next=5;break}e.$refs.fileDrop.reset(),e.workflow=m.LOADREFERENCEFILE,t.next=8;break;case 5:if(e.workflow!==m.LOADREFERENCEFILE){t.next=8;break}return t.next=8,e.readFilesAndProvideEditor();case 8:case"end":return t.stop()}}),t)})))()},onUpdateFile:function(e){console.log("onUpdateFile files[0]:",e[0]),this.workflow===m.LOADLANGUAGEFILE&&(this.languageFile=e[0]),this.workflow===m.LOADREFERENCEFILE&&(this.referenceFile=e[0])},readFiles:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){var n,i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("helpers:",r),t.next=3,g(e.languageFile);case 3:if(n=t.sent,!e.referenceFile){t.next=10;break}return t.next=7,g(e.referenceFile);case 7:t.t0=t.sent,t.next=11;break;case 10:t.t0=null;case 11:i=t.t0,console.log("languageContent:",n),console.log("referenceContent:",i);case 14:case"end":return t.stop()}}),t)})))()},countDots:function(e){return(e.match(/\./g)||[]).length},readFilesAndProvideEditor:function(){var e=this;return Object(u["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.readFiles();case 2:e.editorData=e.mockDataFlat,e.workflow=m.EDITLANGUAGE;case 4:case"end":return t.stop()}}),t)})))()}}},b=y,E=Object(h["a"])(b,l,c,!1,null,null,null),w=E.exports,k={name:"App",components:{LanguageEditor:w},data:function(){return{}},methods:{onReset:function(){this.$refs.languageEditor.reset()}}},A=k,L=Object(h["a"])(A,a,o,!1,null,null,null),D=L.exports,x=n("ce5b"),F=n.n(x);n("bf40");i["default"].use(F.a);var O=new F.a({});n("e792"),n("d5e8"),n("5363");i["default"].config.productionTip=!1,new i["default"]({vuetify:O,render:function(e){return e(D)}}).$mount("#app")},"9fc3":function(e,t,n){"use strict";n("363a")}});
//# sourceMappingURL=app.0a9b27ad.js.map