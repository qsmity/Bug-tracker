(this["webpackJsonpbug-tracker-frontend"]=this["webpackJsonpbug-tracker-frontend"]||[]).push([[0],{26:function(e,t,n){e.exports=n(39)},31:function(e,t,n){},37:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(12),o=n.n(c),u=(n(31),n(20)),l=n(1),i=n(10),s=n(2),m=n.n(s),p=n(4),E=n(7),f=n(14),d=n.n(f),b=function(e){return{type:"LOAD_EMPLOYEES",employees:e}},v=function(e){return{type:"REMOVE_ONE_EMPLOYEE",employeeId:e}},h=function(){return function(){var e=Object(p.a)(m.a.mark((function e(t){var n,a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("/users");case 3:return n=e.sent,e.next=6,n.json();case 6:a=e.sent,r=a.employees,t(b(r)),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})));return function(t){return e.apply(this,arguments)}}()},O=function(e,t){return{type:"LOAD_SESSION",user:e,token:t}},y=function(e,t){return function(){var n=Object(p.a)(m.a.mark((function n(a){var r,c,o,u,l;return m.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r={email:e,password:t},n.prev=1,n.next=4,fetch("/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});case 4:return c=n.sent,o=d.a.get("token"),n.next=8,c.json();case 8:u=n.sent,l=u.employee,a(O(l,o)),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(1),console.log(n.t0);case 16:case"end":return n.stop()}}),n,null,[[1,13]])})));return function(e){return n.apply(this,arguments)}}()},g=function(e,t,n){return function(){var a=Object(p.a)(m.a.mark((function a(r){var c,o,u,l,i;return m.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return c={name:e,email:t,password:n},a.prev=1,a.next=4,fetch("/users",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 4:return o=a.sent,u=d.a.get("token"),a.next=8,o.json();case 8:l=a.sent,i=l.employee,r(O(i,u)),a.next=16;break;case 13:a.prev=13,a.t0=a.catch(1),console.log(a.t0);case 16:case"end":return a.stop()}}),a,null,[[1,13]])})));return function(e){return a.apply(this,arguments)}}()},j=n(3),k=function(){var e=Object(j.b)(),t=Object(a.useState)("demo1@example.com"),n=Object(E.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)("password1"),l=Object(E.a)(u,2),i=l[0],s=l[1],f=function(){var t=Object(p.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),e(y(c,i));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:f},r.a.createElement("h2",null,"login here"),r.a.createElement("input",{onChange:function(e){return o(e.target.value)},name:"email",type:"email",value:c,required:!0}),r.a.createElement("input",{onChange:function(e){return s(e.target.value)},name:"password",type:"password",value:i,required:!0}),r.a.createElement("button",{type:"submit"},"Submit")))},S=function(e){var t=e.employeesArray,n=Object(j.b)(),a=function(e){var t;window.confirm("Are you sure you wish to delete this item?")&&n((t=e.target.id,function(){var e=Object(p.a)(m.a.mark((function e(n){var a,r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=parseInt(t,10),e.prev=1,e.next=4,fetch("/users/".concat(a),{method:"DELETE"});case 4:if((r=e.sent).ok){e.next=7;break}throw r;case 7:n(v(a)),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.error(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()))};return r.a.createElement("table",null,r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"Employee"),r.a.createElement("th",null,"Role"),r.a.createElement("th",null))),r.a.createElement("tbody",null,t.map((function(e){return r.a.createElement("tr",{key:e.id},r.a.createElement("td",null,e.name),r.a.createElement("td",null,function(e){switch(e){case 1:return"admin";case 2:return"project manager";case 3:return"dev";case 4:return"submitter";default:return null}}(e.roleId)),r.a.createElement("td",null,r.a.createElement("button",{id:e.id,onClick:a},"Delete")))}))))},w=function(){var e=Object(j.b)(),t=Object(j.c)((function(e){return e.employees})),n=Object(a.useState)(""),c=Object(E.a)(n,2),o=c[0],u=c[1],l=Object(a.useState)(""),i=Object(E.a)(l,2),s=i[0],f=i[1],d=Object.values(t);Object(a.useEffect)((function(){e(h())}),[e]);return d.length>0?r.a.createElement("div",null,r.a.createElement("h1",null,"employee component"),r.a.createElement(S,{employeesArray:d}),r.a.createElement("form",{onSubmit:function(t){var n,a;t.preventDefault(),e((n=o,a=s,function(){var e=Object(p.a)(m.a.mark((function e(t){var r,c,o;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=parseInt(n,10),e.prev=1,c={roleId:a},e.next=5,fetch("/users/".concat(r),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(c)});case 5:if((o=e.sent).ok){e.next=8;break}throw o;case 8:t(h()),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(1),console.error(e.t0.message);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}()))}},r.a.createElement("label",{htmlFor:"employee"},"Edit Employee Roles: "),r.a.createElement("select",{onChange:function(e){u(e.target.value)},id:"employee",name:"employee",value:o,required:!0},r.a.createElement("option",{value:"",key:-1},"Select Employee"),d.map((function(e){return r.a.createElement("option",{key:e.id,value:e.id},e.name)}))),r.a.createElement("select",{onChange:function(e){f(e.target.value)},id:"roles",name:"roles",value:s,required:!0},r.a.createElement("option",{value:"",key:-1},"Select Role"),r.a.createElement("option",{value:0,key:0},"no role"),r.a.createElement("option",{value:1,key:1},"admin"),r.a.createElement("option",{value:2,key:2},"project manager"),r.a.createElement("option",{value:3,key:3},"dev"),r.a.createElement("option",{value:4,key:4},"submitter")),r.a.createElement("button",{type:"submit"},"Submit"))):r.a.createElement("h2",null,"no employees available")},x=function(){var e=Object(j.b)(),t=function(){var t=Object(p.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e((function(e){d.a.remove("token"),e({type:"REMOVE_SESSION"}),e({type:"REMOVE_EMPLOYEES"})}));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("button",{onClick:t,type:"submit"},"Logout"))},_=(n(37),function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"admin dashboard"),r.a.createElement("nav",null,r.a.createElement(x,null)),r.a.createElement("div",{className:"employee-container"},r.a.createElement(w,null)))}),I=function(){var e=Object(j.b)(),t=Object(a.useState)(""),n=Object(E.a)(t,2),c=n[0],o=n[1],u=Object(a.useState)(""),l=Object(E.a)(u,2),i=l[0],s=l[1],f=Object(a.useState)(""),d=Object(E.a)(f,2),b=d[0],v=d[1],h=function(){var t=Object(p.a)(m.a.mark((function t(n){return m.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:n.preventDefault(),e(g(c,i,b));case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:h},r.a.createElement("h2",null,"Sign Up here"),r.a.createElement("label",{htmlFor:"name"},"Name: "),r.a.createElement("input",{id:"name",onChange:function(e){return o(e.target.value)},name:"name",type:"name",value:c,required:!0}),r.a.createElement("label",{htmlFor:"email"},"Email: "),r.a.createElement("input",{id:"email",onChange:function(e){return s(e.target.value)},name:"email",type:"email",value:i,required:!0}),r.a.createElement("label",{htmlFor:"password"},"password: "),r.a.createElement("input",{id:"password",onChange:function(e){return v(e.target.value)},name:"password",type:"password",value:b,required:!0}),r.a.createElement("button",{type:"submit"},"Sign Up")))},L=function(e){var t=e.component,n=e.token,a=Object(u.a)(e,["component","token"]);return r.a.createElement(l.b,Object.assign({},a,{render:function(e){return n?r.a.createElement(t,e):r.a.createElement(l.a,{to:"/login"})}}))},M=function(e){var t=e.component,n=e.token,a=Object(u.a)(e,["component","token"]);return r.a.createElement(l.b,Object.assign({},a,{render:function(e){return n?r.a.createElement(l.a,{to:"/admin/dashboard"}):r.a.createElement(t,e)}}))};function C(e){var t=e.token;return r.a.createElement("div",null,r.a.createElement("h1",null,"Trackerfy"),r.a.createElement("nav",null,r.a.createElement(i.b,{to:"/login"},"Login"),r.a.createElement(i.b,{to:"/signup"},"Sign Up"),r.a.createElement(i.b,{to:"/admin/dashboard"},"Dashboard")),r.a.createElement(l.d,null,r.a.createElement(L,{token:t,exact:!0,path:"/admin/dashboard",component:_}),r.a.createElement(M,{exact:!0,token:t,path:"/login",component:k}),r.a.createElement(M,{token:t,path:"/signup",component:I})))}var N=function(){var e=Object(j.c)((function(e){return e.session.authToken}));return r.a.createElement(C,{token:e})},D=n(8),T=n(24),P=n(25),R=function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"LOAD_EMPLOYEES":return e={},n.employees.map((function(t){return e[t.id]=t})),e;case"REMOVE_EMPLOYEES":return{};case"REMOVE_ONE_EMPLOYEE":return delete(e=Object.assign({},Object(P.a)({},t)))[n.employeeId],e;default:return t}},q=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOAD_SESSION":return Object.assign({},{currentUserId:t.user.id,role:t.user.roleId,authToken:t.token});case"REMOVE_SESSION":return{};default:return e}},A=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||D.d,V=Object(D.c)({employees:R,session:q}),U=A(Object(D.a)(T.a)),Y=function(e){return Object(D.e)(V,e,U)}();o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,null,r.a.createElement(j.a,{store:Y},r.a.createElement(N,null)))),document.getElementById("root"))}},[[26,1,2]]]);
//# sourceMappingURL=main.9b5891be.chunk.js.map