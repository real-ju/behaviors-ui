import{e,f as l,B as a,o as t,c as i,w as o,a as u,_ as n}from"./index-ca8328b0.js";import{B as s}from"./index.c05298c2.js";import{B as m}from"./index.296cb134.js";const d=n(e({name:"BeSelect",options:{virtualHost:!0},props:{visible:{type:Boolean,default:!1},value:{type:[Number,String,Array],default:void 0},title:{type:String,default:"请选择"},clearText:{type:String,default:"清空"},confirmText:{type:String,default:"确定"},maskCloseAble:{type:Boolean,default:!0},actionCloseAble:{type:Boolean,default:!0},theme:{type:String,default:"#4a68cc"},mode:{type:String,default:"single"},list:{type:Array,default:()=>[]},valueName:{type:String,default:"value"},labelName:{type:String,default:"label"},childName:{type:String,default:"children"},layout:{type:String,default:"default"}},emits:["update:value","update:visible","change","clear","confirm"],setup(e,{expose:n,emit:d}){const r=e,c=l(r.value),p=l();a((()=>r.value),(e=>{c.value=e})),a((()=>r.visible),(e=>{e&&(c.value=r.value)}));const v=e=>{d("update:visible",e)},f=(e,l)=>{d("change",e,l)},b=()=>{p.value.clear(),d("update:value",c.value),d("clear"),r.actionCloseAble&&g()},y=()=>{d("update:value",c.value),d("confirm"),r.actionCloseAble&&g()},g=()=>{d("update:visible",!1)};return n({updateSingleColumn:(e,l)=>{p.value.updateSingleColumn(e,l)}}),(l,a)=>(t(),i(s,{class:"be-select",visible:e.visible,"onUpdate:visible":v,title:e.title,"clear-text":e.clearText,"confirm-text":e.confirmText,"mask-close-able":e.maskCloseAble,"action-close-able":e.actionCloseAble,theme:e.theme,onConfirm:y,onClear:b},{default:o((()=>[u(m,{modelValue:c.value,"onUpdate:modelValue":a[0]||(a[0]=e=>c.value=e),mode:e.mode,list:e.list,"value-name":e.valueName,"label-name":e.labelName,"child-name":e.childName,onChange:f,ref_key:"selectView",ref:p,layout:e.layout},null,8,["modelValue","mode","list","value-name","label-name","child-name","layout"])])),_:1},8,["visible","title","clear-text","confirm-text","mask-close-able","action-close-able","theme"]))}}),[["__scopeId","data-v-e1fbb6d7"]]);export{d as B};
