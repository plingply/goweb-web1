(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-186210c6"],{2017:function(t,e,o){"use strict";o("ab10")},6259:function(t,e,o){"use strict";o("b767")},"9ed6":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"login-container"},[o("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:t.loginForm,rules:t.loginRules,autocomplete:"on","label-position":"left"}},[o("div",{staticClass:"title-container"},[o("h3",{staticClass:"title"},[t._v("登录系统")])]),o("el-form-item",{attrs:{prop:"passport"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"user"}})],1),o("el-input",{ref:"passport",attrs:{placeholder:"用户名",name:"passport",type:"text",tabindex:"1",autocomplete:"on"},model:{value:t.loginForm.passport,callback:function(e){t.$set(t.loginForm,"passport",e)},expression:"loginForm.passport"}})],1),o("el-tooltip",{attrs:{content:"Caps lock is On",placement:"right",manual:""},model:{value:t.capsTooltip,callback:function(e){t.capsTooltip=e},expression:"capsTooltip"}},[o("el-form-item",{attrs:{prop:"password"}},[o("span",{staticClass:"svg-container"},[o("svg-icon",{attrs:{"icon-class":"password"}})],1),o("el-input",{key:t.passwordType,ref:"password",attrs:{type:t.passwordType,placeholder:"密码",name:"password",tabindex:"2",autocomplete:"on"},on:{blur:function(e){t.capsTooltip=!1}},nativeOn:{keyup:[function(e){return t.checkCapslock(e)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleLogin(e)}]},model:{value:t.loginForm.password,callback:function(e){t.$set(t.loginForm,"password",e)},expression:"loginForm.password"}}),o("span",{staticClass:"show-pwd",on:{click:t.showPwd}},[o("svg-icon",{attrs:{"icon-class":"password"===t.passwordType?"eye":"eye-open"}})],1)],1)],1),o("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{size:"medium",loading:t.loading,type:"primary"},nativeOn:{click:function(e){return e.preventDefault(),t.handleLogin(e)}}},[t._v("登录")])],1)],1)},r=[],n=(o("13d5"),o("b64b"),o("61f7")),i={name:"Login",data:function(){var t=function(t,e,o){Object(n["e"])(e)?o():o(new Error("请输入用户名"))},e=function(t,e,o){e.length<6?o(new Error("请输入正确的密码")):o()};return{loginForm:{passport:"",password:""},loginRules:{passport:[{required:!0,trigger:"blur",validator:t}],password:[{required:!0,trigger:"blur",validator:e}]},passwordType:"password",capsTooltip:!1,loading:!1,redirect:void 0,otherQuery:{}}},watch:{$route:{handler:function(t){var e=t.query;e&&(this.redirect=e.redirect,this.otherQuery=this.getOtherQuery(e))},immediate:!0}},mounted:function(){""===this.loginForm.passport?this.$refs.passport.focus():""===this.loginForm.password&&this.$refs.password.focus()},destroyed:function(){},methods:{checkCapslock:function(t){var e=t.key;this.capsTooltip=e&&1===e.length&&e>="A"&&e<="Z"},showPwd:function(){var t=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){t.$refs.password.focus()}))},handleLogin:function(){var t=this;this.$refs.loginForm.validate((function(e){if(!e)return console.log("error submit!!"),!1;t.loading=!0,t.$store.dispatch("user/login",t.loginForm).then((function(){t.$router.push({path:t.redirect||"/",query:t.otherQuery}),t.loading=!1})).catch((function(){t.loading=!1}))}))},getOtherQuery:function(t){return Object.keys(t).reduce((function(e,o){return"redirect"!==o&&(e[o]=t[o]),e}),{})}}},a=i,c=(o("2017"),o("6259"),o("2877")),l=Object(c["a"])(a,s,r,!1,null,"c14708dc",null);e["default"]=l.exports},ab10:function(t,e,o){t.exports={menuText:"#bfcbd9",menuActiveText:"#409eff",subMenuActiveText:"#f4f4f5",menuBg:"#2b2f3a",menuHover:"#444",subMenuBg:"#1f2d3d",subMenuHover:"#001528",sideBarWidth:"210px"}},b767:function(t,e,o){}}]);