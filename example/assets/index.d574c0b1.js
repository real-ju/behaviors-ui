import{e,k as a,_ as t}from"./index-075d9373.js";const o=t(e({name:"BeRadio",options:{virtualHost:!0},props:{modelValue:{type:[Number,String],default:void 0},options:{type:Array,default:()=>[]}},emits:["update:modelValue"],setup(e,{emit:t}){const o=e,s=e=>e.value===o.modelValue,l=e=>{e.disabled||o.modelValue===e.value||t("update:modelValue",e.value)};return(t,o)=>a(t.$slots,"default",{options:e.options,isChecked:s,selectItem:l},void 0,!0)}}),[["__scopeId","data-v-a2394ac2"]]);export{o as _};