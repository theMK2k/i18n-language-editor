(function(e){function t(t){for(var r,o,s=t[0],l=t[1],c=t[2],f=0,d=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,s=1;s<n.length;s++){var l=n[s];0!==a[l]&&(r=!1)}r&&(i.splice(t--,1),e=o(o.s=n[0]))}return e}var r={},a={app:0},i=[];function o(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=r,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)o.d(n,r,function(t){return e[t]}.bind(null,r));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/i18n-language-editor/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var c=0;c<s.length;c++)t(s[c]);var u=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"363a":function(e,t,n){},"54d2":function(e,t,n){"use strict";n("f123")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-app",[n("v-app-bar",{attrs:{app:"",color:"primary",dark:""}},[n("div",{staticClass:"d-flex align-center"},[e._v("i18n Language Editor")]),n("v-spacer"),n("v-btn",{attrs:{color:"primary"},on:{click:e.onReset}},[e._v("RESET ")])],1),n("v-main",[n("language-editor",{ref:"languageEditor"})],1)],1)},i=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[e.workflow===e.enmWorkflow.LOADLANGUAGEFILE||e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("div",{staticStyle:{"padding-top":"16px"}},[n("v-row",[e.workflow===e.enmWorkflow.LOADLANGUAGEFILE?n("h1",[e._v(" Step 1 of 3: Load the language file to be edited ")]):e._e(),e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("h1",[e._v(" Step 2 of 3: Load a reference language file if available ")]):e._e()]),e.workflow===e.enmWorkflow.LOADREFERENCEFILE?n("p",[e._v(" The reference language file is optional. ")]):e._e(),e.workflow!==e.enmWorkflow.LOADREFERENCEFILE||e.isReferenceFileAvailable?e._e():n("div",[n("v-row",[n("v-btn",{staticClass:"bigbutton",attrs:{color:"success"},on:{click:function(t){e.isReferenceFileAvailable=!0}}},[e._v("LOAD (I have a reference file)")]),n("v-spacer"),n("v-btn",{staticClass:"bigbutton",attrs:{color:"primary"},on:{click:e.onNext}},[e._v("SKIP (I don't have a reference file)")])],1)],1),e.workflow===e.enmWorkflow.LOADLANGUAGEFILE||e.isReferenceFileAvailable?n("file-drop",{ref:"fileDrop",attrs:{accept:".json",disableLabel:!0},on:{update:e.onUpdateFile}}):e._e(),n("v-row",[n("v-spacer"),e.workflow!==e.enmWorkflow.LOADREFERENCEFILE||e.isReferenceFileAvailable?n("v-btn",{attrs:{color:"primary",disabled:e.disableNext},on:{click:e.onNext}},[e._v("NEXT")]):e._e()],1)],1):e._e(),e.workflow===e.enmWorkflow.EDITLANGUAGE?n("div",{staticStyle:{"margin-top":"16px"}},[n("v-row",[n("h1",[e._v("Step 3 of 3: Edit the language file")]),n("v-spacer"),n("v-btn",{attrs:{color:"primary"},on:{click:function(t){return e.onGenerateResult(!1)}}},[e._v("DONE, GENERATE AND DOWNLOAD RESULT")])],1),n("v-switch",{attrs:{label:"Only show necessary translations"},model:{value:e.onlyShowNecessaryTranslations,callback:function(t){e.onlyShowNecessaryTranslations=t},expression:"onlyShowNecessaryTranslations"}}),e.editorData?n("div",{staticStyle:{"margin-top":"16px"}},e._l(Object.keys(e.editorData),(function(t){return n("v-row",{key:t,staticStyle:{margin:"0px"}},[e._l(e.countDots(t),(function(e){return n("div",{key:e,staticStyle:{width:"16px"}})})),"category"!==e.editorData[t]._type_||e.onlyShowNecessaryTranslations&&!e.editorData[t]._isNecessary_?e._e():n("div",{staticStyle:{"margin-bottom":"8px"}},[n("h3",[e._v(e._s(e.editorData[t]._value_))])]),"entry"!==e.editorData[t]._type_||e.onlyShowNecessaryTranslations&&!e.editorData[t]._isNecessary_?e._e():n("v-row",{staticStyle:{margin:"0px"}},[n("div",{ref:"entry_"+t,refInFor:!0,staticStyle:{width:"100%"}},[n("pre",[e._v(e._s(e.editorData[t]._reference_))]),n("v-textarea",{staticStyle:{"margin-top":"-12px","margin-bottom":"16px"},attrs:{value:e.editorData[t]._value_,"auto-grow":"",rows:"1","error-messages":e.editorData[t]._statusmessages_},on:{change:function(n){return e.onTextareaChange(e.editorData[t],n)}}})],1)])],2)})),1):e._e()],1):e._e(),n("v-dialog",{attrs:{persistent:"","max-width":"600"},model:{value:e.showDialog,callback:function(t){e.showDialog=t},expression:"showDialog"}},[n("v-card",[n("v-card-title",{staticClass:"text-h5"},[e._v(" Problems detected ")]),n("v-card-text",[e._v("One or more translations have incorrect values, please check them before saving the result.")]),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(t){return e.onGenerateResult(!0)}}},[e._v(" Ignore the warnings and proceed ")]),n("v-btn",{attrs:{color:"primary darken-1",text:""},on:{click:function(t){e.showDialog=!1}}},[e._v(" Cancel ")])],1)],1)],1)],1)},s=[],l=n("1da1"),c=(n("ac1f"),n("466d"),n("b64b"),n("e9c4"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),n("9861"),n("1276"),n("b0c0"),n("96cf"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"dropzone",staticClass:"dropzone",on:{dragover:function(e){e.preventDefault()},dragleave:e.dragleave,dragenter:e.dragenter,drop:e.drop}},[e.disableLabel?e._e():e._t("default",(function(){return[n("h1",[e._v(e._s(e.label||"Upload Box"))])]})),n("v-btn",{on:{click:function(t){return e.$refs.filebtn.click()}}},[n("v-icon",{attrs:{left:"",dark:""}},[e._v("mdi-cloud-upload")]),e._v(" Load ")],1),e.disableHint?e._e():n("p",[e._v("* you can also drag and drop files here")]),n("div",{staticClass:"input-container"},e._l(e.files,(function(t){return n("v-input",{key:t.name,attrs:{"append-icon":"mdi-close","prepend-icon":"mdi-insert-drive-file"},on:{"click:append":function(n){return e.remove(t)}}},[e._v(" "+e._s(t.name)+" ")])})),1),n("input",{ref:"filebtn",staticClass:"filebtn",attrs:{type:"file",multiple:e.multiple,accept:e.validatedAccept&&e.validatedAccept.extensions.concat(e.validatedAccept.mimetypes).join(",")},on:{input:e.upload}})],2)}),u=[],f=(n("a434"),n("d81d"),n("5319"),n("4d63"),n("c607"),n("2c3e"),n("25f0"),n("4de4"),n("159b"),{data:function(){return{hoverCounter:0,hoveringContent:null,matchAnything:/.*/,files:[]}},props:["label","accept","multiple","disableLabel","disableHint"],watch:{multiple:function(e){e||this.files.splice(0,this.files.length-1)},hoveringContent:function(e){var t=this;if(e)if(this.accept&&this.accept.length&&0===this.validTypes.extensions.length){for(var n=!1,r=function(r){if(t.validTypes.mimetypes.reduce((function(t,n){return t||!!e[r].type.match(n)}),!1))return n=!0,"break"},a=0;a<e.length;a++){var i=r(a);if("break"===i)break}n&&(this.$refs.dropzone.style.backgroundColor="rgba(0, 0, 0, 0.25)")}else{for(var o=!1,s=0;s<e.length;s++)if("file"===e[s].kind){o=!0;break}o&&(this.$refs.dropzone.style.backgroundColor="rgba(0, 0, 0, 0.25)")}else this.$refs.dropzone.style.backgroundColor=""},hoverCounter:function(e){0===e&&(this.hoveringContent=null)}},computed:{validTypes:function(){return this.validatedAccept?{extensions:this.validatedAccept.extensions.map((function(e){return e.replace(/(\W)/g,"\\$1")})).map((function(e){return new RegExp("".concat(e,"$"),"i")})),mimetypes:this.validatedAccept.mimetypes.map((function(e){return e.replace(/([-+/])/g,"\\$1")})).map((function(e){return e.replace(/\*/g,"(?:[A-Za-z0-9\\-\\+]*)*")})).map((function(e){return new RegExp("^".concat(e,"$"))}))}:{extensions:[this.matchAnything],mimetypes:[this.matchAnything]}},validatedAccept:function(){return this.accept?{extensions:this.accept.split(",").filter((function(e){return e.match(/^\.(?!.*\/)/)})),mimetypes:this.accept.split(",").filter((function(e){return e.match(/^(?:(?:[A-Za-z0-9\-+]*)|\*)\/(?:(?:[A-Za-z0-9\-+]*)|\*)$/)}))}:null}},methods:{reset:function(){this.files=[],this.$refs.filebtn.value=""},upload:function(){for(var e=this,t=this.$refs.filebtn,n=t.files||{},r=function(t){e.multiple||e.files.splice(0,e.files.length);var r=e.validTypes.extensions.reduce((function(e,r){return e||!!n[t].name.match(r)}),!1)||e.validTypes.mimetypes.reduce((function(e,r){return e||!!n[t].type.match(r)}),!1);r&&e.files.push(n[t])},a=0;a<n.length;a++)r(a);this.$refs.filebtn.value="",this.$emit("update",this.files)},dragenter:function(e){this.hoveringContent=(e.dataTransfer||{}).items,this.hoverCounter++},dragleave:function(){this.hoverCounter--},drop:function(e){var t=this;e.preventDefault(),this.hoverCounter=0;var n=(e.dataTransfer||{}).items||[];if(n){for(var r=[],a=0;a<n.length;a++)if("file"===n[a].kind){var i=function(){if(n[a].webkitGetAsEntry){var e=n[a].webkitGetAsEntry();if(e.isDirectory)return r.push(e.name),"continue"}var i=n[a].getAsFile();if(!i)return"continue";var o=t.validTypes.extensions.reduce((function(e,t){return e||!!i.name.match(t)}),!1)||t.validTypes.mimetypes.reduce((function(e,t){return e||!!i.type.match(t)}),!1);if(!o)return r.push(i),"continue";t.multiple?t.files.filter((function(e){return e.name===i.name})).forEach((function(e){return t.files.splice(t.files.indexOf(e),1)})):t.files.splice(0,t.files.length),t.files.push(i)}();if("continue"===i)continue}r.length&&this.$emit("rejectedFiles",r)}this.$emit("update",this.files)},remove:function(e){var t=this.files;t.splice(t.indexOf(e),1),this.$emit("update",null)}}}),d=f,p=(n("9fc3"),n("2877")),v=Object(p["a"])(d,c,u,!1,null,"6409f62f",null),h=v.exports,g=n("53ca"),m=n("b85c");n("99af"),n("caad"),n("2532"),n("d9e2"),n("7db0");function b(e){return new Promise((function(t,n){var r=new FileReader;r.onload=function(){t(r.result)},r.onerror=n,r.readAsText(e)}))}function _(e){return e.replace(/_/g,".")}function y(e){for(var t={},n=0,r=Object.keys(e);n<r.length;n++){var a=r[n],i=e[a];if("entry"===i._type_){var o,s=a.split("."),l="",c=t,u=Object(m["a"])(s);try{for(u.s();!(o=u.n()).done;){var f=o.value;l="".concat(l).concat(l?".":"").concat(f),l===a?c[f]=i._value_:(c[f]||(c[f]={}),c=c[f])}}catch(d){u.e(d)}finally{u.f()}}}return t}function w(e,t,n,r){console.group("generateEditorData");var a={containsNecessaryEntries:!1,editorData:null};n||(n={});var i,o=Object(m["a"])(t?Object.keys(t):Object.keys(e));try{for(o.s();!(i=o.n()).done;){var s=i.value;if(s.includes("."))throw new Error("The key '".concat(s,"' contains dots, which is not allowed!"));var l=t?t[s]:null,c=e[s];if(t?"string"===typeof l:"string"===typeof c){var u=!c;u&&(a.containsNecessaryEntries=!0);var f={_type_:"entry",_value_:c,_reference_:l||_(s),_isNecessary_:u};n["".concat(r?r+".":"").concat(s)]=f,f._isNecessary_}else{if(t?"object"!==Object(g["a"])(l):"object"!==Object(g["a"])(c))throw new Error("type not allowed:",t?Object(g["a"])(l):Object(g["a"])(c));var d={_type_:"category",_value_:s,_isNecessary_:!0};n["".concat(r?r+".":"").concat(s)]=d;var p=w(c,l,n,"".concat(r?r+".":"").concat(s));d._isNecessary_=p.containsNecessaryEntries,d._isNecessary_&&(a.containsNecessaryEntries=!0)}}}catch(v){o.e(v)}finally{o.f()}return console.groupEnd(),a.editorData=n,a}function E(e){if(e._statusmessages_=[],"entry"===e._type_)if(e._value_){var t=e._reference_.match(/\{.*?\}/g);if(t){var n,r=Object(m["a"])(t);try{for(r.s();!(n=r.n()).done;){var a=n.value;e._value_.includes(a)||e._statusmessages_.push('WARNING: Missing variable "'.concat(a,'" in translation'))}}catch(c){r.e(c)}finally{r.f()}}var i=e._value_.match(/\{.*?\}/g);if(i){var o,s=Object(m["a"])(i);try{var l=function(){var n=o.value;t&&t.find((function(e){return e==n}))||e._statusmessages_.push('WARNING: Variable "'.concat(n,'" not found in reference text (please do not introduce new variables)'))};for(s.s();!(o=s.n()).done;)l()}catch(c){s.e(c)}finally{s.f()}}}else e._statusmessages_.push("ERROR: Empty translation")}function k(e){for(var t=!1,n=0,r=Object.keys(e);n<r.length;n++){var a=r[n],i=e[a];E(i),i._statusmessages_&&i._statusmessages_.length>0&&(t=!0)}return{hasProblems:t}}var A={LOADLANGUAGEFILE:1,LOADREFERENCEFILE:2,EDITLANGUAGE:3},L={name:"LanguageEditor",components:{FileDrop:h},data:function(){return{workflow:A.LOADLANGUAGEFILE,onlyShowNecessaryTranslations:!1,languageFile:null,isReferenceFileAvailable:!1,referenceFile:null,editorData:null,showDialog:!1}},computed:{enmWorkflow:function(){return A},disableNext:function(){return this.workflow===A.LOADLANGUAGEFILE&&!this.languageFile}},methods:{reset:function(){this.workflow=A.LOADLANGUAGEFILE,this.languageFile=null,this.isReferenceFileAvailable=!1,this.referenceFile=null,this.showDialog=!1},onNext:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.workflow!==A.LOADLANGUAGEFILE){t.next=5;break}e.$refs.fileDrop.reset(),e.workflow=A.LOADREFERENCEFILE,t.next=8;break;case 5:if(e.workflow!==A.LOADREFERENCEFILE){t.next=8;break}return t.next=8,e.readFilesAndProvideEditor();case 8:case"end":return t.stop()}}),t)})))()},onUpdateFile:function(e){this.workflow===A.LOADLANGUAGEFILE&&(this.languageFile=e[0]),this.workflow===A.LOADREFERENCEFILE&&(this.referenceFile=e[0])},readFiles:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){var n,r,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b(e.languageFile);case 2:if(n=t.sent,!e.referenceFile){t.next=9;break}return t.next=6,b(e.referenceFile);case 6:t.t0=t.sent,t.next=10;break;case 9:t.t0=null;case 10:r=t.t0,a=w(JSON.parse(n),JSON.parse(r)),e.editorData=a.editorData;case 13:case"end":return t.stop()}}),t)})))()},countDots:function(e){return(e.match(/\./g)||[]).length},readFilesAndProvideEditor:function(){var e=this;return Object(l["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.readFiles();case 2:e.workflow=A.EDITLANGUAGE;case 3:case"end":return t.stop()}}),t)})))()},onTextareaChange:function(e,t){e._value_=t,E(e)},onGenerateResult:function(e){this.showDialog=!1;var t=k(this.editorData);if(e||!t.hasProblems){var n=y(this.editorData),r=new Blob([JSON.stringify(n,null,2)],{type:"application/json"}),a=URL.createObjectURL(r),i=document.createElement("a");i.href=a,i.download="".concat((this.languageFile.name||"download").split(".")[0],"_edited.json");var o=function e(){setTimeout((function(){URL.revokeObjectURL(a),i.removeEventListener("click",e)}),150)};return i.addEventListener("click",o,!1),i.click(),i}for(var s=null,l=0,c=Object.keys(this.editorData);l<c.length;l++){var u=c[l],f=this.editorData[u];if(f._statusmessages_&&f._statusmessages_.length>0){s=u;break}}if(s){var d=this.$refs["entry_".concat(s)][0];console.log("htmlElement:",d),d&&(d.scrollIntoView({block:"center",behavior:"smooth"}),d.focus())}this.showDialog=!0}}},D=L,O=(n("54d2"),Object(p["a"])(D,o,s,!1,null,"c325648a",null)),x=O.exports,F={name:"App",components:{LanguageEditor:x},data:function(){return{}},methods:{onReset:function(){this.$refs.languageEditor.reset()}}},N=F,R=Object(p["a"])(N,a,i,!1,null,null,null),j=R.exports,G=n("ce5b"),C=n.n(G);n("bf40");r["default"].use(C.a);var T=new C.a({});n("e792"),n("d5e8"),n("5363");r["default"].config.productionTip=!1,new r["default"]({vuetify:T,render:function(e){return e(j)}}).$mount("#app")},"9fc3":function(e,t,n){"use strict";n("363a")},f123:function(e,t,n){}});
//# sourceMappingURL=app.bdfec579.js.map