import{e,g as t,o as s,c as a,w as l,a as o,b as i,t as n,u as A,k as c,n as r,j as p,i as d,h as b,_ as m}from"./index-bb9952dd.js";import{B as u}from"./index.fcff93a2.js";import{_ as g}from"./index.0add789f.js";const f=m(e({name:"BeDataPopup",options:{styleIsolation:"shared"},props:{visible:{type:Boolean,default:!1},height:{type:String,default:"unset"},title:{type:String,default:""},clearText:{type:String,default:"清空"},confirmText:{type:String,default:"确定"},maskCloseAble:{type:Boolean,default:!0},actionCloseAble:{type:Boolean,default:!0},theme:{type:String,default:"#4a68cc"}},emits:["update:visible","close","clear","confirm"],setup(e,{emit:m}){const f=e,k=t((()=>"unset"!==f.height&&"auto"!==f.height)),h=e=>{m("update:visible",e)},C=()=>{m("close")},v=()=>{m("update:visible",!1),m("close")},B=()=>{m("clear"),f.actionCloseAble&&v()},x=()=>{m("confirm"),f.actionCloseAble&&v()};return(t,m)=>{const f=d,y=b;return s(),a(u,{class:"be-data-popup",style:p({"--theme-color":e.theme}),visible:e.visible,"onUpdate:visible":h,onClose:C,position:"bottom",height:e.height,"mask-close-able":e.maskCloseAble},{default:l((()=>[o(f,{class:"header-bar"},{default:l((()=>[i(n(e.title),1)])),_:1}),o(y,{class:"close-icon",src:A("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABUklEQVQ4T43Tz0rDQBAG8G92mxzUq6IQUETQR1C0PoIXD4IgQiGH0ucpYQnkIAj+OQk+gYq+ggcVhR6EXtVDG3dkQ7ak6SYxx81+v8xkdkkptcLMl1LK4zAMB/jH0+/3l6WU557nnZBS6gbAAYAPIcReE2LCrVbrHsAGM99SkiSL4/H40SwYJE3T7V6v9+kqpBgG8JKmaZvMRteLMlK1JwOakLoPTIAqxKzbnm3ZxeqmAAfynRc4X/V/ZoAC8gpgLgd+hBCbrgk5ATOZ0Wj0RkQLBmDmL9/31zudzrA8nRkgH+sdgC0Av3lAAnj2PG+/jEwBpXB2sAygtX4AsOpCJoArbHuO4zioQjKgLmx7rkLsUbY9D4QQO1X3IUeeAASmHSnlrrlMFwCOAAy01u1ut/tedyGjKFoTQpjLFDDzFUVRtERE18x82hS2sEGI6Mz3/cM/ECPemofvA2YAAAAASUVORK5CYII="),onClick:v},null,8,["src"]),o(f,{class:"data-content"},{default:l((()=>[c(t.$slots,"default",{},void 0,!0)])),_:3}),o(f,{class:r(["action-bar",{"sink-bottom":A(k)}])},{default:l((()=>[o(g,{class:"btn-comp","root-class":"btn clear-btn",onClick:B},{default:l((()=>[i(n(e.clearText),1)])),_:1}),o(g,{class:"btn-comp","root-class":"btn ok-btn",hover:"",onClick:x},{default:l((()=>[i(n(e.confirmText),1)])),_:1})])),_:1},8,["class"])])),_:3},8,["style","visible","height","mask-close-able"])}}}),[["__scopeId","data-v-e690b903"]]);export{f as B};
