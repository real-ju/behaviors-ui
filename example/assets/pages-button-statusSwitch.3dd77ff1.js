import{e as a,f as s,g as l,o as e,c as o,w as t,a as d,b as n,t as u,u as i,h as c,r,d as v,i as b,_ as g}from"./index-075d9373.js";import{_ as m}from"./index.81b3e12c.js";import"./index.eb225935.js";const p=g(a({__name:"statusSwitch",setup(a){const g=s(!1),p=s(!1),_=s("normal"),f=l((()=>"normal"===_.value?"按钮":"loading"===_.value?"加载中":"不可用")),h=()=>{"normal"===_.value?(g.value=!0,_.value="loading"):"loading"===_.value?(g.value=!1,p.value=!0,_.value="disabled"):(p.value=!1,_.value="normal")};return(a,s)=>{const l=c,_=r(v("be-button"),m),w=b;return e(),o(w,{class:"playground button-status-switch-page"},{default:t((()=>[d(_,{class:"button-1",loading:g.value,disabled:p.value,"disabled-class":"disabled"},{loading:t((()=>[d(l,{class:"loading-icon",src:"./static/button/loading.png",mode:"scaleToFill"})])),default:t((()=>[n(u(i(f))+" ",1)])),_:1},8,["loading","disabled"]),d(_,{class:"button-2",hover:"",onClick:h},{default:t((()=>[n("切换状态")])),_:1})])),_:1})}}}),[["__scopeId","data-v-251284c4"]]);export{p as default};