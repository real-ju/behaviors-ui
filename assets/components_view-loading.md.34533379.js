import{E as s}from"./chunks/ExampleIframe.cb873845.js";import{d as t,c as o,J as e,S as a,o as n}from"./chunks/framework.6dd19598.js";const l=a(`<h1 id="viewloading-视图加载中" tabindex="-1">ViewLoading 视图加载中 <a class="header-anchor" href="#viewloading-视图加载中" aria-label="Permalink to &quot;ViewLoading 视图加载中&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-m2-uo" id="tab-AghXFAp" checked="checked"><label for="tab-AghXFAp">template</label><input type="radio" name="group-m2-uo" id="tab-OQmaYdg"><label for="tab-OQmaYdg">style scoped</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">container</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-view-loading</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">be-view-loading</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-scss"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">container</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#676E95;font-style:italic;">// 需要把容器设置为定位祖先元素</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">position</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> relative</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div>`,3),p=a('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>由于 ViewLoading 组件使用了<code>position: absolute</code>定位，所以需要把容器设置为定位祖先元素，比如给容器设置<code>position: relative</code>。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>iconSize</td><td>加载图标大小</td><td>css font-size</td><td>50rpx</td></tr><tr><td>loadingIcon</td><td>自定义加载图标</td><td><a href="/behaviors-ui/components/icon.html">Icon</a> Props</td><td><code>{ fontFamily?: &#39;iconfont&#39;, prefix?: &#39;icon-&#39;, name: &#39;&#39; }</code></td></tr><tr><td>iconColor</td><td>自定义加载图标颜色</td><td>css color</td><td>#aaaaaa</td></tr><tr><td>bgColor</td><td>背景颜色</td><td>css background-color</td><td>rgba(255, 255, 255, 0)</td></tr><tr><td>borderRadius</td><td>边框圆角</td><td>css border-radius</td><td>0rpx</td></tr><tr><td>height</td><td>高度</td><td>css height</td><td>100%</td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table><thead><tr><th>插槽名</th><th>说明</th><th>slot props</th><th>默认值</th></tr></thead><tbody><tr><td>default</td><td>自定义加载样式</td><td>-</td><td>有</td></tr></tbody></table>',6),D=JSON.parse('{"title":"ViewLoading 视图加载中","description":"","frontmatter":{},"headers":[],"relativePath":"components/view-loading.md","filePath":"components/view-loading.md"}'),d={name:"components/view-loading.md"},F=t({...d,setup(r){return(c,i)=>(n(),o("div",null,[l,e(s,{url:"/pages/viewLoading/basic",height:"135px"}),p]))}});export{D as __pageData,F as default};
