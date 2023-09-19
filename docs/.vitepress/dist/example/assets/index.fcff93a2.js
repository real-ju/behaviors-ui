import{e as t,f as e,g as o,B as a,o as i,c as s,w as n,a as p,n as l,j as u,u as r,k as c,l as v,C as d,i as f,_ as m}from"./index-bb9952dd.js";const x=m(t({name:"BePopup",props:{visible:{type:Boolean,default:!1},position:{type:String,default:"center"},width:{type:String,default:"unset"},height:{type:String,default:"unset"},backgroundColor:{type:String,default:"#ffffff"},borderRadius:{type:String,default:"16rpx"},maskOpacity:{type:Number,default:.6},maskCloseAble:{type:Boolean,default:!0},negativeTop:{type:String,default:"5%"},animation:{type:Boolean,default:!0},animationDuration:{type:Number,default:150},screenTopOffset:{type:String,default:"0px"},screenBottomOffset:{type:String,default:"0px"}},emits:["update:visible","close","maskClick"],setup(t,{emit:m}){const x=t,g=e(x.visible),b=e(null),y=e(null),k=e(null),h=e(null),$=e(null),C=e(null),B=o((()=>x.animation?x.animationDuration:0)),S=o((()=>x.screenTopOffset)),T=o((()=>`calc(100vh - ${x.screenTopOffset} - ${x.screenBottomOffset})`)),O=o((()=>"top"===x.position||"bottom"===x.position||"custom"===x.position?"100%":x.width)),_=o((()=>"left"===x.position||"right"===x.position||"custom"===x.position?"100%":x.height)),w=o((()=>"center"===x.position?"unset":"custom"===x.position?"transparent":x.backgroundColor)),R=o((()=>{let t=x.borderRadius;return"center"===x.position?"unset":"top"===x.position?`0px 0px ${t} ${t}`:"bottom"===x.position?`${t} ${t} 0px 0px`:"left"===x.position?`0px ${t} ${t} 0px`:"right"===x.position?`${t} 0px 0px ${t}`:"custom"===x.position?"unset":void 0})),j=o((()=>"center"===x.position?"translate(-50%, -40%)":"top"===x.position?"translate(0px, -100%)":"bottom"===x.position?"translate(0px, 100%)":"left"===x.position?"translate(-100%, 0px)":"right"===x.position?"translate($100%, 0px)":void x.position)),A=o((()=>"center"===x.position?`calc(50% - ${x.negativeTop})`:"top"===x.position?"0px":"bottom"===x.position?void 0:"left"===x.position||"right"===x.position||"custom"===x.position?"0px":void 0));a((()=>x.visible),(t=>{t?(g.value=!0,setTimeout((()=>{I()}),150)):(P(),setTimeout((()=>{g.value=!1}),B.value))}));const D=()=>{x.maskCloseAble&&(P(),setTimeout((()=>{m("update:visible",!1),m("close")}),B.value)),m("maskClick")},N=()=>{"custom"===x.position&&D()},I=()=>{k.value.backgroundColor(`rgba(0, 0, 0, ${x.maskOpacity})`).step(),b.value=k.value.export(),"center"===x.position?$.value.translate("-50%","-50%").opacity(1).step():"custom"===x.position?$.value.opacity(1).step():$.value.translate("0px","0px").step(),y.value=$.value.export()},P=()=>{h.value.backgroundColor("rgba(0, 0, 0, 0)").step(),b.value=h.value.export(),"center"===x.position?C.value.translate("-50%","-40%").opacity(0).step():"top"===x.position?C.value.translate("0px","-100%").step():"bottom"===x.position?C.value.translate("0px","100%").step():"left"===x.position?C.value.translate("-100%","0px").step():"right"===x.position?C.value.translate("100%","0px").step():"custom"===x.position&&C.value.opacity(0).step(),y.value=C.value.export()};return k.value=d({duration:B.value}),h.value=d({duration:B.value}),$.value=d({duration:B.value}),C.value=d({duration:B.value}),g.value&&I(),(e,o)=>{const a=f;return g.value?(i(),s(a,{key:0,class:"be-popup",style:u({top:r(S),height:r(T)})},{default:n((()=>[p(a,{class:"popup-mask",onClick:D,animation:b.value},null,8,["animation"]),p(a,{class:l(["popup-content-area",t.position+"-content-area"]),style:u({width:r(O),height:r(_),backgroundColor:r(w),borderRadius:r(R),transform:r(j),top:r(A)}),animation:y.value,onClick:N},{default:n((()=>[c(e.$slots,"default",{},void 0,!0)])),_:3},8,["class","style","animation"])])),_:3},8,["style"])):v("v-if",!0)}}}),[["__scopeId","data-v-994ab433"]]);export{x as B};
