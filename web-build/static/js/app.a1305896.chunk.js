(this.webpackJsonp=this.webpackJsonp||[]).push([[0],{169:function(e,t,n){"use strict";n.d(t,"b",(function(){return E})),n.d(t,"c",(function(){return x}));var a=n(6),r=n.n(a),o=n(0),l=n.n(o),s=n(4),i=n(35),c=n(3),u=n(17),m=n(34),d=n(43),p=n(1),b=n(38),f=n(56);function w(e){var t=e.navigation,n=Object(o.useState)(""),a=r()(n,2),s=a[0],i=a[1];return l.a.createElement(p.a,{style:C.appContainer},l.a.createElement(d.a,null),l.a.createElement(m.a,{style:C.usersContainer},x.map((function(e,n){var a=Object(o.useState)(!1),c=r()(a,2),m=c[0],d=c[1],w=Object(o.useState)(!1),y=r()(w,2),g=y[0],x=y[1],S=Object(o.useState)(e),k=r()(S,2),T=k[0],_=(k[1],function(){d(!1)});return l.a.createElement(p.a,{style:C.userView,key:n},l.a.createElement(b.a,{style:[C.buttonContainer,{backgroundColor:g?"green":"red"}],onPress:function(){d(!0)}},l.a.createElement(p.a,null,l.a.createElement(u.a,{style:C.usernameText},T.username),l.a.createElement(f.a.Container,{visible:m},l.a.createElement(f.a.Title,null,"Inserir password"),l.a.createElement(f.a.Description,null,"Insira a sua password para come\xe7ar!"),l.a.createElement(f.a.Input,{secureTextEntry:!0,onChangeText:function(e){i(e)}}),l.a.createElement(f.a.Button,{label:"OK",onPress:function(){if(s==T.password)if(g){x(!1);var e=Date.now();E.database().ref("users/"+T.username+"/"+e).set("Saiu")}else if(T.admin)t.push("Admin");else{x(!0);var n=Date.now();E.database().ref("users/"+T.username+"/"+n).set("Entrou")}i(""),_()}}),l.a.createElement(f.a.Button,{label:"Cancel",onPress:_})))))}))))}var C=c.a.create({appContainer:{display:"flex",flexGrow:1,backgroundColor:"#000"},usersContainer:{display:"flex",flexGrow:1,backgroundColor:"#000"},userView:{padding:10},usernameText:{color:"#fff",textAlign:"center"},buttonContainer:{padding:20,borderRadius:10,justifyContent:"center",alignContent:"center"},timestampView:{padding:10,flex:1,flexDirection:"row",justifyContent:"space-between"},timestampContainer:{},logStateContainer:{}}),y=n(147),g=n(261),E=n(232);n(233);var x=[{username:"Francisco",password:"2378",admin:!1},{username:"Alexandre",password:"4536",admin:!1},{username:"Administrador",password:"6748",admin:!0}];E.initializeApp({apiKey:"AIzaSyA9MV-PgCXfWhnGt-FRHlVIzlvUuRhVmRc",authDomain:"log-my-work-8db34.firebaseapp.com",databaseURL:"https://log-my-work-8db34-default-rtdb.firebaseio.com",projectId:"log-my-work-8db34",storageBucket:"log-my-work-8db34.appspot.com",messagingSenderId:"721021340350",appId:"1:721021340350:web:75b15661f04266d863ecef",measurementId:"G-86K99VSDRW"});var S=Object(g.a)();console.log("Heroku sucks sometimes...");t.a=function(){return l.a.createElement(y.a,null,l.a.createElement(S.Navigator,null,"web"!==s.a.OS&&l.a.createElement(S.Screen,{name:"Home",component:w,options:{title:"Registo produ\xe7\xe3o Hoterway",headerStyle:{backgroundColor:"#000"},headerTintColor:"#FFF"}}),"web"===s.a.OS&&l.a.createElement(S.Screen,{name:"Home",component:_,options:{title:"Registo produ\xe7\xe3o Hoterway",headerTitleStyle:{alignSelf:"center"},headerStyle:{backgroundColor:"#000"},headerTintColor:"#FFF"}}),l.a.createElement(S.Screen,{name:"Admin",component:T,options:{title:"Admin",headerTitleStyle:{alignSelf:"center"},headerStyle:{backgroundColor:"#000"},headerTintColor:"#FFF"}}),l.a.createElement(S.Screen,{name:"AdminUser",component:k,options:{title:"Admin",headerTitleStyle:{alignSelf:"center"},headerStyle:{backgroundColor:"#000"},headerTintColor:"#FFF"}})))};function k(e){var t=e.route;return l.a.createElement(p.a,{style:h.appContainer},l.a.createElement(d.a,null),l.a.createElement(p.a,{style:h.userView},l.a.createElement(u.a,{style:h.usernameText},t.params.username),l.a.createElement(m.a,{style:h.usersContainer},Object.keys(t.params.user).map((function(e,n){return l.a.createElement(p.a,{style:h.timestampView,key:n},l.a.createElement(p.a,{style:h.logStateContainer},l.a.createElement(u.a,{style:h.usernameText},t.params.user[e])),l.a.createElement(p.a,{style:h.timestampContainer},l.a.createElement(u.a,{style:h.usernameText},new Date(parseInt(e)).toDateString()),l.a.createElement(u.a,{style:h.usernameText},new Date(parseInt(e)).toLocaleTimeString())))})))))}function T(e){var t=e.navigation,n=Object(o.useState)({}),a=r()(n,2),s=a[0],i=a[1];return E.database().ref("users/").once("value").then((function(e){i(e.val())})),null==s?l.a.createElement(p.a,{style:h.appContainer},l.a.createElement(d.a,null),l.a.createElement(u.a,{style:h.usernameText},"Loading....")):l.a.createElement(p.a,{style:h.appContainer},l.a.createElement(d.a,null),l.a.createElement(m.a,{style:h.usersContainer},Object.keys(s).map((function(e,n){return l.a.createElement(p.a,{style:h.timestampView,key:n},l.a.createElement(b.a,{style:[h.buttonContainer],onPress:function(){t.push("AdminUser",{username:e,user:s[e]})}},l.a.createElement(u.a,{style:h.usernameText},e)))}))))}function _(e){var t=e.navigation,n=Object(o.useState)(""),a=r()(n,2),s=a[0],c=a[1];return l.a.createElement(p.a,{style:h.web_appContainer},l.a.createElement(d.a,null),l.a.createElement(m.a,{style:h.web_usersContainer},x.map((function(e,n){var a=Object(o.useState)(!1),m=r()(a,2),d=m[0],f=(m[1],Object(o.useState)(e)),w=r()(f,2),C=w[0],y=(w[1],Object(o.useState)(!1)),g=r()(y,2),E=g[0],x=g[1];return l.a.createElement(p.a,{style:h.web_userView,key:n},E&&l.a.createElement(p.a,{style:h.web_passwdInputContainer},l.a.createElement(i.a,{style:h.web_passwdInput,secureTextEntry:!0,onChangeText:function(e){return c(e)}}),l.a.createElement(p.a,{style:{display:"flex",flex:1}},l.a.createElement(b.a,{style:h.web_cancelInputContainer,onPress:function(){return x(!1)}},l.a.createElement(p.a,{style:h.web_cancelInput},l.a.createElement(u.a,{style:h.web_buttonText},"Cancelar"))),l.a.createElement(b.a,{style:h.web_confirmInputContainer,onPress:function(){e.password==s&&t.push("Admin"),x(!1)}},l.a.createElement(p.a,{style:h.web_confirmInput},l.a.createElement(u.a,{style:h.web_buttonText},"Confirmar"))))),!E&&l.a.createElement(b.a,{style:[h.web_buttonContainer,{backgroundColor:e.admin?"#4D4E4F":d?"green":"red"}],onPress:function(){e.admin&&x(!E)}},l.a.createElement(p.a,null,l.a.createElement(u.a,{style:h.web_usernameText},C.username))))}))))}var h=c.a.create({appContainer:{display:"flex",flexGrow:1,backgroundColor:"#000"},usersContainer:{display:"flex",flexGrow:1,backgroundColor:"#000"},userView:{padding:10},usernameText:{color:"#fff",textAlign:"center"},buttonContainer:{padding:20,borderRadius:10,justifyContent:"center",alignContent:"center"},timestampView:{padding:10,flex:1,flexDirection:"row",justifyContent:"space-between"},timestampContainer:{},logStateContainer:{},web_appContainer:{backgroundColor:"#000",flexGrow:1,justifyContent:"center",alignContent:"center",maxHeight:800},web_usersContainer:{backgroundColor:"#000"},web_userView:{display:"flex",flex:1,padding:10,justifyContent:"space-between",alignContent:"space-between"},web_usernameText:{color:"#fff",textAlign:"center",fontSize:30},web_buttonContainer:{padding:20,borderRadius:10,justifyContent:"center",alignContent:"center"},web_timestampView:{padding:10,flex:1,flexDirection:"row",justifyContent:"space-between"},web_timestampContainer:{},web_logStateContainer:{},web_passwdInput:{flex:1,borderColor:"white",borderWidth:1,color:"#FFF",fontSize:20,marginTop:5},web_passwdInputContainer:{justifyContent:"space-between",alignContent:"space-between",flexDirection:"row",display:"flex"},web_cancelInputContainer:{flex:1,backgroundColor:"red",alignContent:"center",justifyContent:"center",borderRadius:15,paddingHorizontal:40,paddingVertical:6},web_cancelInput:{backgroundColor:"red"},web_confirmInputContainer:{flex:1,backgroundColor:"green",alignContent:"center",justifyContent:"center",borderRadius:15,paddingHorizontal:40,paddingVertical:6},web_confirmInput:{backgroundColor:"green"},web_buttonText:{color:"#fff",textAlign:"center",fontSize:12}})},212:function(e,t,n){e.exports=n(257)}},[[212,1,2]]]);
//# sourceMappingURL=app.a1305896.chunk.js.map