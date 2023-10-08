import{e,f as a,y as r,k as s,_ as t,z as l,o,c as n,w as d,a as i,n as u,b as f,t as m,l as p,i as c,r as g,d as v}from"./index-ca8328b0.js";import{_}from"./index.39ca5641.js";import{_ as b}from"./index.e146641d.js";import"./index.b1d1cd92.js";const h=t(e({name:"BeFormItem",options:{virtualHost:!0},props:{prop:{type:String,default:""},required:{type:Boolean,default:!1}},setup(e){const t=e,l=a(null);return r("beFormContext").addField({field:t.prop,handleError:e=>{l.value=e},clearError:()=>{l.value=null}}),(a,r)=>s(a.$slots,"default",{required:e.required,error:l.value},void 0,!0)}}),[["__scopeId","data-v-b360e517"]]),y={mobile:{pattern:/^1\d{10}$/,message:"手机号格式错误"}},w={validate:function(e,a){if("object"!=typeof e||"object"!=typeof a)throw"validate()参数错误";let r=[];for(let s in e){let t=a[s],l=e[s];if(t){if(!(t instanceof Array))throw"validate()规则格式错误";let e=q(l,t);"string"==typeof e&&r.push({field:s,message:e})}}return!(r.length>0)||r},single:q,match:F};function q(e,a){let r=!0,s="验证未通过";if(!(a instanceof Array))throw"single()规则格式错误";for(let t=0;t<a.length;t++){const l=a[t];if("required"in l){if(l.required&&""==String(e)){l.message&&(s=l.message),r=s;break}}else if(l.rule){let a=F(String(e),l.rule);if("string"==typeof a){s=l.message?l.message:a,r=s;break}}else if("validator"in l){let a=(0,l.validator)(e);if("string"==typeof a||!1===a){s=l.message?l.message:String(a),r=s;break}}}return r}function F(e,a){let r=null,s="验证未通过";if(a instanceof RegExp)r=a;else{if("string"!=typeof a)throw"single()参数错误";{let e=y[a];if(!e)throw`没有找到预置验证规则"${a}"`;r=e.pattern,s=e.message}}return!!r.test(e)||s}const x=t(e({name:"BeForm",options:{virtualHost:!0},props:{model:{type:Object,default:()=>({})},rules:{type:Object,default:()=>({})}},emits:["update:model"],setup(e,{expose:a,emit:r}){const t=e;let o={};const n=[],d=(e=!0)=>{e&&r("update:model",{...o}),n.forEach((e=>{e.clearError()}))},i=async e=>{const a=n.find((a=>a.field===e));if(a){const r=w.single(t.model[e],t.rules[e]);if(!0===r)return a.clearError(),!0;{const s={field:e,message:r};throw a.handleError(s),s}}return!0},u=async()=>{const e=w.validate(t.model,t.rules);if(!0===e)return d(!1),!0;throw f(e),e},f=e=>{n.forEach((a=>{const r=e.find((e=>e.field===a.field));r?a.handleError(r):a.clearError()}))};return o={...t.model},l("beFormContext",{addField:e=>{n.push(e)}}),a({validateField:i,validate:u,resetFields:d}),(e,a)=>s(e.$slots,"default",{validateField:i,validate:u,resetFields:d},void 0,!0)}}),[["__scopeId","data-v-d3ffab03"]]),E=t(e({__name:"login",setup(e){const r=a(),s=a({username:"",password:""}),t={username:[{required:!0,message:"请输入用户名"}],password:[{required:!0,message:"请输入密码"},{rule:/^\d{6}$/,message:"密码为6位数字"}]},l=()=>{r.value.validate().then((()=>{console.log("校验通过")}))};return(e,a)=>{const y=c,w=g(v("be-input"),_),q=g(v("be-form-item"),h),F=g(v("be-button"),b),E=g(v("be-form"),x);return o(),n(y,{class:"playground form-login-page"},{default:d((()=>[i(E,{ref_key:"formRef",ref:r,model:s.value,"onUpdate:model":a[2]||(a[2]=e=>s.value=e),rules:t},{default:d((({validateField:e})=>[i(y,{class:"login-form"},{default:d((()=>[i(q,{prop:"username",required:""},{default:d((({required:r,error:t})=>[i(y,{class:u(["form-item",{required:r}])},{default:d((()=>[i(y,{class:"label"},{default:d((()=>[f("用户名")])),_:1}),i(y,{class:"content"},{default:d((()=>[i(w,{class:"input",modelValue:s.value.username,"onUpdate:modelValue":a[0]||(a[0]=e=>s.value.username=e),onInput:a=>e("username")},null,8,["modelValue","onInput"])])),_:2},1024),t?(o(),n(y,{key:0,class:"error-msg"},{default:d((()=>[f(m(t.message),1)])),_:2},1024)):p("v-if",!0)])),_:2},1032,["class"])])),_:2},1024),i(q,{prop:"password",required:""},{default:d((({required:r,error:t})=>[i(y,{class:u(["form-item",{required:r}])},{default:d((()=>[i(y,{class:"label"},{default:d((()=>[f("密码")])),_:1}),i(y,{class:"content"},{default:d((()=>[i(w,{class:"input",modelValue:s.value.password,"onUpdate:modelValue":a[1]||(a[1]=e=>s.value.password=e),password:"",maxlength:6,onInput:a=>e("password")},null,8,["modelValue","onInput"])])),_:2},1024),t?(o(),n(y,{key:0,class:"error-msg"},{default:d((()=>[f(m(t.message),1)])),_:2},1024)):p("v-if",!0)])),_:2},1032,["class"])])),_:2},1024),i(F,{class:"login-btn",hover:"",onClick:l},{default:d((()=>[f("登录")])),_:1})])),_:2},1024)])),_:1},8,["model"])])),_:1})}}}),[["__scopeId","data-v-001e8e07"]]);export{E as default};
