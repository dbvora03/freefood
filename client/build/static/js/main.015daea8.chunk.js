(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{20:function(e,t,a){e.exports=a(31)},25:function(e,t,a){},30:function(e,t,a){},31:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),c=a(18),r=a.n(c),o=(a(25),a(1)),i=a(2),s=a(4),m=function(){var e=Object(n.useContext)(j),t=e.state,a=e.dispatch,c=Object(i.f)();return l.a.createElement("nav",null,l.a.createElement("div",{className:"nav-wrapper teal"},l.a.createElement(s.b,{to:t?"/feed":"/signin",className:"brand-logo right"},"FreeFood"),l.a.createElement("ul",{id:"nav-mobile",className:"left"},t?[l.a.createElement("li",{style:{marginLeft:"10px"}},l.a.createElement("button",{onClick:function(){localStorage.clear(),a({type:"CLEAR"}),c.push("/signin")},className:"btn waves-effect waves-light",type:"submit",name:"action"},"Log out")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/profile"},"Profile")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/createpost"},"Make a Posting"))]:[l.a.createElement("button",{className:"btn waves-effect waves-light",type:"submit",name:"action"},l.a.createElement("li",null,l.a.createElement(s.b,{to:"/guestfeed"},"Guest feed"))),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signup"},"Sign up")),l.a.createElement("li",null,l.a.createElement(s.b,{to:"/signin"},"Sign in"))])))},u=(a(30),function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],r=Object(n.useContext)(j),i=r.state;r.dispatch;Object(n.useEffect)((function(){console.log("a"),fetch("/feed",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){c(e.posts),console.log("b")}))}),[]);return l.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},l.a.createElement("h1",{style:{textAlign:"center",fontFamily:"revert"}},"Todays Postings"),l.a.createElement("div",{className:"gallery"},a.map((function(e){return l.a.createElement("div",{className:"card",key:e._id},l.a.createElement("div",{className:"card-image waves-effect waves-block waves-light"},l.a.createElement("img",{className:"activator",src:e.photo})),l.a.createElement("div",{className:"card-content"},l.a.createElement("span",{className:"card-title activator grey-text text-darken-4"},e.title,l.a.createElement("i",{className:"material-icons right"},"more_vert")),l.a.createElement("p",null,e.author.name)),l.a.createElement("div",{className:"card-reveal"},l.a.createElement("span",{className:"card-title grey-text text-darken-4",style:{marginBottom:"0"}},e.title,l.a.createElement("i",{className:"material-icons right"},"close")),e.author._id===i._id&&l.a.createElement("i",{className:"material-icons",style:{float:"right"},onClick:function(){var t;t=e._id,console.log("c"),console.log(t),fetch("/deletepost/".concat(t),{method:"delete",headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log("d"),console.log(e);var t=a.filter((function(t){return t._id!==e._id}));console.log("e"),c(t)}))}},"delete"),l.a.createElement("div",{className:"card-content",style:{padding:"9px"}},l.a.createElement("img",{src:e.author.pic,style:{width:"80px",height:"80px",marginTop:"0px",borderRadius:"80px",display:"block",marginLeft:"auto",marginRight:"auto"}}),l.a.createElement("h5",{style:{textAlign:"center"}},e.author.name)),l.a.createElement("p",null,e.description),l.a.createElement("h6",null,"Dietary Information"),l.a.createElement("p",null,e.dietaryRestrict),l.a.createElement("h6",null,"Location"),l.a.createElement("div",null,l.a.createElement("h6",null,"Insert map in here"))))}))))}),p=a(10),d=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1],r=Object(n.useContext)(j),i=r.state,s=r.dispatch,m=Object(n.useState)(""),u=Object(o.a)(m,2),d=u[0],h=u[1];Object(n.useEffect)((function(){fetch("/profile",{headers:{Authorization:"Bearer "+localStorage.getItem("jwt")}}).then((function(e){return e.json()})).then((function(e){console.log(e.mypost),c(e.mypost)}))}),[]),Object(n.useEffect)((function(){if(d){var e=new FormData;e.append("file",d),e.append("upload_preset","bongumusa"),e.append("cloud_name","dcjuakpsl"),console.log("line 48"),fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){fetch("/updatepic",{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({pic:e.url})}).then((function(e){return e.json()})).then((function(e){console.log(e),localStorage.setItem("user",JSON.stringify(Object(p.a)(Object(p.a)({},i),{},{pic:e.pic}))),s({type:"UPDATEPIC",payload:e.pic})}))})).catch((function(e){console.log("Line 58 error",e)}))}}),[d]);return l.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col s12 m5"},l.a.createElement("div",{className:"card-panel "},l.a.createElement("img",{src:i?i.pic:"loading Profile Pic",style:{width:"100px",height:"100px",marginTop:"0px",borderRadius:"80px",display:"block",marginLeft:"auto",marginRight:"auto"}}),l.a.createElement("h4",{style:{textAlign:"center"}},i?i.name:"loading"),l.a.createElement("p",{style:{textAlign:"center"}}," ",a.length," open posting(s)"),l.a.createElement("form",{action:"#"},l.a.createElement("div",{class:"file-field input-field"},l.a.createElement("div",{class:"btn"},l.a.createElement("span",null,"Update Logo"),l.a.createElement("input",{type:"file"})),l.a.createElement("div",{class:"file-path-wrapper"},l.a.createElement("input",{class:"file-path validate",onChange:function(e){var t;t=e.target.files[0],h(t),window.location.reload()},type:"text"}))))))),l.a.createElement("div",{className:"gallery"},a.map((function(e){return l.a.createElement("div",{className:"card",key:e._id},l.a.createElement("div",{className:"card-image waves-effect waves-block waves-light"},l.a.createElement("img",{className:"activator",src:e.photo})),l.a.createElement("div",{className:"card-content"},l.a.createElement("span",{className:"card-title activator grey-text text-darken-4"},e.title,l.a.createElement("i",{className:"material-icons right"},"more_vert")),l.a.createElement("p",null,e.author.name)),l.a.createElement("div",{className:"card-reveal"},l.a.createElement("span",{className:"card-title grey-text text-darken-4",style:{marginBottom:"0"}},e.title,l.a.createElement("i",{className:"material-icons right"},"close")),l.a.createElement("div",{className:"card-content",style:{padding:"9px"}},l.a.createElement("img",{src:i?i.pic:"loading Profile Pic",style:{width:"80px",height:"80px",marginTop:"0px",borderRadius:"80px",display:"block",marginLeft:"auto",marginRight:"auto"}}),l.a.createElement("h5",{style:{textAlign:"center"}},e.author.name)),l.a.createElement("p",null,e.description),l.a.createElement("h6",null,"Dietary Information"),l.a.createElement("p",null,e.dietaryRestrict),l.a.createElement("h6",null,"Location"),l.a.createElement("div",null,l.a.createElement("h6",null,"Insert map in here"))))}))))},h=a(8),g=a.n(h),f=function(){var e=Object(n.useContext)(j),t=(e.state,e.dispatch),a=Object(i.f)(),c=Object(n.useState)(""),r=Object(o.a)(c,2),m=r[0],u=r[1],p=Object(n.useState)(""),d=Object(o.a)(p,2),h=d[0],f=d[1];return l.a.createElement("div",{className:"mycard"},l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h2",null,"Welcome to FreeFood"),l.a.createElement("input",{value:h,onChange:function(e){return f(e.target.value)},type:"text",placeholder:"Email"}),l.a.createElement("input",{value:m,onChange:function(e){return u(e.target.value)},type:"password",placeholder:"Password"}),l.a.createElement("button",{onClick:function(){fetch("/signin",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:m,email:h})}).then((function(e){return e.json()})).then((function(e){console.log(e),e.error?g.a.toast({html:e.error}):(localStorage.setItem("jwt",e.token),localStorage.setItem("user",JSON.stringify(e.user)),t({type:"USER",payload:e.user}),g.a.toast({html:"Logging you in!"}),a.push("/feed"))})).catch((function(e){console.log("Bro pleaser",e)}))},className:"btn waves-effect waves-light",style:{margin:"10px"},type:"submit",name:"action"},"Log in"),l.a.createElement("h6",null,"Are you a business that doesn't have an account?"),l.a.createElement("h6",null,l.a.createElement(s.b,{to:"/signup"},"Sign up here!"))))},E=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(""),m=Object(o.a)(s,2),u=m[0],p=m[1],d=Object(n.useState)(""),h=Object(o.a)(d,2),f=h[0],E=h[1],v=Object(n.useState)(""),b=Object(o.a)(v,2),y=b[0],j=b[1],x=Object(n.useState)(""),O=Object(o.a)(x,2),N=O[0],w=O[1],S=Object(n.useState)(void 0),k=Object(o.a)(S,2),C=k[0],A=k[1];Object(n.useEffect)((function(){C&&_()}),[C]);var _=function(){/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(f)?fetch("/signup",{method:"post",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:c,password:u,email:f,pic:C})}).then((function(e){return e.json()})).then((function(t){t.error?g.a.toast({html:t.error}):(g.a.toast({html:"You have been signed up! Check your email!"}),e.push("/signin"))})).catch((function(e){console.log(e)})):g.a.toast({html:"invalid email"})},I=function(){N?function(){var e=new FormData;e.append("file",N),e.append("upload_preset","bongumusa"),e.append("cloud_name","dcjuakpsl"),console.log("line 48"),fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){A(e.url)})).catch((function(e){console.log("Line 58 error",e)}))}():_()};return l.a.createElement("div",{className:"mycard"},l.a.createElement("div",{className:"card auth-card"},l.a.createElement("h2",null,"Signup below!"),l.a.createElement("input",{value:c,onChange:function(e){return r(e.target.value)},type:"text",placeholder:"Company Name"}),l.a.createElement("input",{value:f,onChange:function(e){return E(e.target.value)},type:"text",placeholder:"Email"}),l.a.createElement("input",{value:u,onChange:function(e){return p(e.target.value)},type:"password",placeholder:"Password"}),l.a.createElement("input",{value:y,onChange:function(e){return j(e.target.value)},type:"text",placeholder:"Address"}),l.a.createElement("div",{className:"file-field input-field"},l.a.createElement("div",{className:"btn #64b5f6 darken-1"},l.a.createElement("span",null,"Upload Logo"),l.a.createElement("input",{type:"file",onChange:function(e){return w(e.target.files[0])}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text"}))),l.a.createElement("button",{onClick:function(){return I()},className:"btn waves-effect waves-light",type:"submit",name:"action"},"Sign up"),l.a.createElement("p",null,"An email will be sent to you on  how to use the application")))},v=function(){var e=Object(n.useState)([]),t=Object(o.a)(e,2),a=t[0],c=t[1];return Object(n.useEffect)((function(){console.log("a"),fetch("/guestfeed").then((function(e){return e.json()})).then((function(e){c(e.posts),console.log("b")}))}),[]),l.a.createElement("div",{style:{maxWidth:"550px",margin:"0px auto"}},l.a.createElement("h1",{style:{alignContent:"center"}},"Todays Postings"),l.a.createElement("div",{className:"gallery"},a.map((function(e){return l.a.createElement("div",{className:"card",key:e._id},l.a.createElement("div",{className:"card-image waves-effect waves-block waves-light"},l.a.createElement("img",{className:"activator",src:e.photo})),l.a.createElement("div",{className:"card-content"},l.a.createElement("span",{className:"card-title activator grey-text text-darken-4"},e.title,l.a.createElement("i",{className:"material-icons right"},"more_vert")),l.a.createElement("p",null,e.author.name)),l.a.createElement("div",{className:"card-reveal"},l.a.createElement("span",{className:"card-title grey-text text-darken-4"},e.title,l.a.createElement("i",{className:"material-icons right"},"close")),l.a.createElement("p",null,e.description),l.a.createElement("h6",null,"Dietary Information"),l.a.createElement("p",null,e.dietaryRestrict),l.a.createElement("h6",null,"Location"),l.a.createElement("div",null,l.a.createElement("h6",null,"Insert map in here"))))}))))},b=function(){var e=Object(i.f)(),t=Object(n.useState)(""),a=Object(o.a)(t,2),c=a[0],r=a[1],s=Object(n.useState)(""),m=Object(o.a)(s,2),u=m[0],p=m[1],d=Object(n.useState)(""),h=Object(o.a)(d,2),f=h[0],E=h[1],v=Object(n.useState)(""),b=Object(o.a)(v,2),y=b[0],j=b[1],x=Object(n.useState)(""),O=Object(o.a)(x,2),N=O[0],w=O[1],S=Object(n.useState)(""),k=Object(o.a)(S,2),C=k[0],A=k[1];Object(n.useEffect)((function(){y&&(console.log("4"),fetch("/createpost",{method:"post",headers:{"Content-Type":"application/json",Authorization:"Bearer "+localStorage.getItem("jwt")},body:JSON.stringify({title:c,description:u,photo:y,address:N,dietaryRestrict:C})}).then((function(e){return e.json()})).then((function(t){console.log("5"),t.error?(console.log("6"),g.a.toast({html:t.error,classes:"#c62828 red darken-3"})):(console.log("7"),g.a.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"}),e.push("/feed"))})).catch((function(e){console.log(e)})))}),[y]);return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{class:"row",style:{maxWidth:"500px",padding:"20px",textAlign:"center"}},l.a.createElement("div",{class:"col s12 m5"},l.a.createElement("div",{class:"card-panel"},l.a.createElement("h3",null,"Create a posting")))),l.a.createElement("div",{className:"card input-filed",style:{margin:"30px auto",maxWidth:"500px",padding:"20px",textAlign:"center"}},l.a.createElement("input",{type:"text",placeholder:"title",value:c,onChange:function(e){return r(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"description",value:u,onChange:function(e){return p(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"address",value:N,onChange:function(e){return w(e.target.value)}}),l.a.createElement("input",{type:"text",placeholder:"allergen information",value:C,onChange:function(e){return A(e.target.value)}}),l.a.createElement("div",{className:"file-field input-field"},l.a.createElement("div",{className:"btn #64b5f6 teal darken-1"},l.a.createElement("span",null,"Upload Image"),l.a.createElement("input",{type:"file",onChange:function(e){return E(e.target.files[0])}})),l.a.createElement("div",{className:"file-path-wrapper"},l.a.createElement("input",{className:"file-path validate",type:"text"}))),l.a.createElement("button",{className:"btn waves-effect waves-light #64b5f6 teal darken-1",onClick:function(){return function(){var e=new FormData;e.append("file",f),e.append("upload_preset","bongumusa"),e.append("cloud_name","dcjuakpsl"),fetch("https://api.cloudinary.com/v1_1/dcjuakpsl/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){j(e.url),console.log("3")})).catch((function(e){console.log("Line 58 error",e)}))}()}},"Submit post")))},y=function(e,t){return"USER"===t.type?t.payload:"CLEAR"===t.type?null:"UPDATEPIC"===t.type?Object(p.a)(Object(p.a)({},e),{},{pic:t.payload.pic}):e},j=Object(n.createContext)(),x=function(){var e=Object(i.f)(),t=Object(n.useContext)(j),a=(t.state,t.dispatch);return Object(n.useEffect)((function(){var t=JSON.parse(localStorage.getItem("user"));t?(a({type:"USER",payload:t}),e.push("/feed")):e.push("/signin")}),[]),l.a.createElement(i.c,null,l.a.createElement(i.a,{exact:!0,path:"/feed"},l.a.createElement(u,null)),l.a.createElement(i.a,{path:"/profile"},l.a.createElement(d,null)),l.a.createElement(i.a,{path:"/signin"},l.a.createElement(f,null)),l.a.createElement(i.a,{path:"/signup"},l.a.createElement(E,null)),l.a.createElement(i.a,{path:"/createpost"},l.a.createElement(b,null)),l.a.createElement(i.a,{path:"/guestfeed"},l.a.createElement(v,null)))};var O=function(){var e=Object(n.useReducer)(y,null),t=Object(o.a)(e,2),a=t[0],c=t[1];return l.a.createElement(j.Provider,{value:{state:a,dispatch:c}},l.a.createElement(s.a,null,l.a.createElement(m,null),l.a.createElement(x,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[20,1,2]]]);
//# sourceMappingURL=main.015daea8.chunk.js.map