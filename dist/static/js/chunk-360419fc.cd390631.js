(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-360419fc"],{"4f61":function(t,e,a){},"6a21":function(t,e,a){},"8c4c":function(t,e,a){"use strict";a("4f61")},cabd:function(t,e,a){"use strict";a.d(e,"b",(function(){return s})),a.d(e,"a",(function(){return i})),a.d(e,"c",(function(){return r}));var n=a("b775");function s(t,e){return Object(n["a"])({url:"/api/course/list",method:"get",params:t,data:e})}function i(t,e){return Object(n["a"])({url:"/api/course/check",method:"post",params:t,data:e})}function r(t,e){return Object(n["a"])({url:"/api/course/add",method:"post",params:t,data:e})}},f121:function(t,e,a){"use strict";a.d(e,"e",(function(){return n})),a.d(e,"d",(function(){return s})),a.d(e,"h",(function(){return i})),a.d(e,"i",(function(){return r})),a.d(e,"j",(function(){return o})),a.d(e,"a",(function(){return l})),a.d(e,"c",(function(){return u})),a.d(e,"g",(function(){return c})),a.d(e,"f",(function(){return d})),a.d(e,"b",(function(){return m}));var n={1:"正式班",2:"临时班"},s={1:"未开班",2:"已开班",3:"已毕业"},i={1:"男",2:"女",3:"保密"},r={1:"正常",2:"毕业"},o={1:"正常",2:"停用"},l={1:"正常",2:"停用"},u={1:"在班",2:"离班"},c={1:"班课",2:"学员课"},d={1:"未上课",2:"上课中",3:"已下课"},m={1:"课时卡",2:"储值卡",3:"期限卡"}},f679:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("page",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}]},[a("h1",{staticClass:"title"},[a("span",[t._v(t._s(t.info.class_name))]),a("el-tag",{attrs:{size:"small",type:t.tagType}},[t._v(t._s(t.classStatus[t.info.status]))])],1),a("div",{staticClass:"class-info-box"},[a("el-form",{ref:"form",attrs:{model:{},"label-width":"80px"}},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"班级类型"}},[t._v(t._s(t.classType[t.info.class_type]))])],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"班级容量"}},[t._v("1/"+t._s(t.info.capacity))])],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"创建时间"}},[t._v(t._s(t._f("dateFormat")(t.info.created_at,"YYYY-MM-DD")))])],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"累计课消"}},[t._v("--")])],1),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"备注"}},[t._v(t._s(t.info.remark))])],1)],1)],1)],1),a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[t._l(t.tabList,(function(e){return[a("el-tab-pane",{key:e.name,attrs:{label:e.label,name:e.name}},[t.activeName==e.name?a(e.name,{tag:"component"}):t._e()],1)]}))],2)],1)},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"tab-right"},[a("el-radio-group",{attrs:{size:"small"},on:{change:t.memberStatuaChange},model:{value:t.status,callback:function(e){t.status=e},expression:"status"}},t._l(t.classMemberStatus,(function(e,n){return a("el-radio-button",{key:n,attrs:{label:n}},[t._v(t._s(e))])})),1)],1),a("common-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,headers:t.headers,paging:!0,"total-num":t.total,"page-num":t.page,"size-num":t.limit,"empty-height":"300px"},on:{"update:pageNum":function(e){t.page=e},"update:page-num":function(e){t.page=e},"update:sizeNum":function(e){t.limit=e},"update:size-num":function(e){t.limit=e},callback:t.getClassMemberList},scopedSlots:t._u([{key:"operation",fn:function(e){var n=e.row;return[1==n.status?a("el-button",{staticClass:"btn-delete",attrs:{type:"text"},on:{click:function(e){return t.leaveClassMember(n,2)}}},[t._v("移出学员")]):t._e(),2==n.status?a("el-button",{staticClass:"btn-delete",attrs:{type:"text"},on:{click:function(e){return t.leaveClassMember(n,1)}}},[t._v("重新入班")]):t._e()]}}])})],1)},r=[],o=a("fbf3"),l=a("c466"),u=a("f121"),c={data:function(){return{loading:!1,page:1,limit:10,list:[],total:0,status:"1",classMemberStatus:u["c"],headers:[{prop:"student_name",label:"学生姓名"},{prop:"status",label:"学生状态",formatter:function(t,e,a){return u["c"][a]},filters:u["c"],filterHandler:function(){this.getClassMemberList()}},{prop:"entry_at",label:"进班时间",formatter:function(t,e,a){return Object(l["a"])(a,"YYYY-MM-DD")}},{prop:"leave_at",label:"离班时间",formatter:function(t,e,a){return Object(l["a"])(a,"YYYY-MM-DD")}}]}},created:function(){this.getClassMemberList()},methods:{memberStatuaChange:function(){this.page=1,this.getClassMemberList()},leaveClassMember:function(t,e){var a=this,n=2==e?"是否将学员从此班移除？":"是否将学员重新入班？";this.$confirm(n,"提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n={school:a.school_id,campus_id:a.campus_id,class_id:t.class_id,student_id:t.student_id,status:e};Object(o["h"])({},n).then((function(t){a.$message.success("离班成功"),a.getClassMemberList()})).catch((function(){}))})).catch((function(){}))},getClassMemberList:function(){var t=this;this.loading=!0,Object(o["f"])({school_id:this.school_id,campus_id:this.campus_id,class_id:this.$route.params.class_id,page:this.page,limit:this.limit,status:this.status}).then((function(e){t.loading=!1,t.list=e.data.item,t.total=e.data.total})).catch((function(){t.loading=!1}))}}},d=c,m=(a("f8d3"),a("2877")),p=Object(m["a"])(d,i,r,!1,null,"321f56f8",null),f=p.exports,g=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("common-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,headers:t.headers,paging:!0,"total-num":t.total,"page-num":t.page,"size-num":t.limit},on:{"update:pageNum":function(e){t.page=e},"update:page-num":function(e){t.page=e},"update:sizeNum":function(e){t.limit=e},"update:size-num":function(e){t.limit=e},callback:t.getCourseList},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.column,s=e.row;return["status"==n.prop?["1"==s.status?a("el-tag",{attrs:{type:"warning"}},[t._v("未上课")]):t._e(),"2"==s.status?a("el-tag",{attrs:{type:"success"}},[t._v("上课中")]):t._e(),"3"==s.status?a("el-tag",{attrs:{type:"danger"}},[t._v("已下课")]):t._e()]:t._e()]}}])},[a("template",{slot:"operation"},[a("el-button",{staticClass:"btn-delete",attrs:{type:"text"}},[t._v("删除")])],1)],2)},b=[],h=a("cabd"),_={data:function(){return{loading:!1,page:1,limit:10,list:[],total:0,headers:[{prop:"subject_name",label:"课程名称"},{prop:"course_type",label:"课程类型",formatter:function(t,e,a){return u["g"][a]}},{prop:"status",label:"课程状态",formatter:function(t,e,a){return u["f"][a]}},{prop:"start_time",label:"上课时间",width:"180px",formatter:function(t,e,a){return"[星期"+Object(l["b"])(a)+"]"+Object(l["a"])(a,"YYYY-MM-DD hh:mm")}},{prop:"len",label:"上课时长",formatter:function(t,e,a){return a+"分钟"}}]}},created:function(){this.getCourseList()},methods:{getCourseList:function(){var t=this;this.loading=!0,Object(h["b"])({school_id:this.school_id,campus_id:this.campus_id,class_id:this.$route.params.class_id,page:this.page,limit:this.limit}).then((function(e){t.loading=!1,t.list=e.data.item,t.total=e.data.total})).catch((function(){t.loading=!1}))}}},v=_,j=Object(m["a"])(v,g,b,!1,null,null,null),C=j.exports,y=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("common-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{data:t.list,headers:t.headers,paging:!0,"total-num":t.total,"page-num":t.page,"size-num":t.limit},on:{"update:pageNum":function(e){t.page=e},"update:page-num":function(e){t.page=e},"update:sizeNum":function(e){t.limit=e},"update:size-num":function(e){t.limit=e},callback:t.getCourseList}},[a("template",{slot:"operation"},[a("el-button",{staticClass:"btn-delete",attrs:{type:"text"}},[t._v("删除")])],1)],2)},O=[],k={data:function(){return{loading:!1,page:1,limit:10,list:[],total:0,headers:[{prop:"subject_name",label:"课程名称"},{prop:"course_type",label:"课程类型",formatter:function(t,e,a){return u["f"][a]}},{prop:"start_time",label:"上课时间",formatter:function(t,e,a){return"[星期"+Object(l["b"])(a)+"]"+Object(l["a"])(a,"YYYY-MM-DD hh:mm")}},{prop:"len",label:"上课时长",formatter:function(t,e,a){return a+"分钟"}}]}},created:function(){this.getCourseList()},methods:{getCourseList:function(){var t=this;this.loading=!0,Object(h["b"])({school_id:this.school_id,campus_id:this.campus_id,class_id:this.$route.params.class_id,page:this.page,limit:this.limit}).then((function(e){t.loading=!1,t.list=e.data.item,t.total=e.data.total})).catch((function(){t.loading=!1}))}}},L=k,M=Object(m["a"])(L,y,O,!1,null,null,null),x=M.exports,Y={components:{memberList:f,courseList:C,kaoqinList:x},data:function(){return{activeName:"courseList",tabList:[{label:"班级课程",name:"courseList"},{label:"班级学员",name:"memberList"},{label:"考勤记录",name:"kaoqinList"}],info:{},loading:!1,classStatus:u["d"],classType:u["e"],tagType:"danger"}},created:function(){this.getClassInfo()},methods:{handleClick:function(){},getClassInfo:function(){var t=this;this.loading=!0,Object(o["d"])({school_id:this.school_id,campus_id:this.campus_id,class_id:this.$route.params.class_id}).then((function(e){t.loading=!1,t.info=e.data,"1"==t.info.status&&(t.tagType="info"),"2"==t.info.status&&(t.tagType="success"),"3"==t.info.status&&(t.tagType="danger")})).catch((function(){t.loading=!1}))}}},w=Y,N=(a("8c4c"),Object(m["a"])(w,n,s,!1,null,"49128fe1",null));e["default"]=N.exports},f8d3:function(t,e,a){"use strict";a("6a21")},fbf3:function(t,e,a){"use strict";a.d(e,"e",(function(){return s})),a.d(e,"b",(function(){return i})),a.d(e,"a",(function(){return r})),a.d(e,"g",(function(){return o})),a.d(e,"f",(function(){return l})),a.d(e,"d",(function(){return u})),a.d(e,"c",(function(){return c})),a.d(e,"h",(function(){return d}));var n=a("b775");function s(t,e){return Object(n["a"])({url:"/api/class/list",method:"get",params:t,data:e})}function i(t,e){return Object(n["a"])({url:"/api/class/update",method:"post",params:t,data:e})}function r(t,e){return Object(n["a"])({url:"/api/class/create",method:"post",params:t,data:e})}function o(t,e){return Object(n["a"])({url:"/api/class/simple/list",method:"get",params:t,data:e})}function l(t,e){return Object(n["a"])({url:"/api/class/member/list",method:"get",params:t,data:e})}function u(t,e){return Object(n["a"])({url:"/api/class/info",method:"get",params:t,data:e})}function c(t,e){return Object(n["a"])({url:"/api/class/member/create",method:"post",params:t,data:e})}function d(t,e){return Object(n["a"])({url:"/api/class/member/leave",method:"post",params:t,data:e})}}}]);