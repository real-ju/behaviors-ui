import{E as i}from"./chunks/ExampleIframe.DqPJ-Xy4.js";import{d as t,c as a,I as e,a1 as s,o as l}from"./chunks/framework.Bgiy4YwT.js";const n=s(`<h1 id="viewloading-视图加载中" tabindex="-1">ViewLoading 视图加载中 <a class="header-anchor" href="#viewloading-视图加载中" aria-label="Permalink to &quot;ViewLoading 视图加载中&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-Yloh6" id="tab-UTIxssi" checked="checked"><label for="tab-UTIxssi">template</label><input type="radio" name="group-Yloh6" id="tab-IBmzLJ8"><label for="tab-IBmzLJ8">style scoped</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">view</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> class</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;container&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-view-loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-view-loading</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-scss vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.container</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  // 需要把容器设置为定位祖先元素</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">relative</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div></div></div>`,3),d=s('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>由于 ViewLoading 组件使用了<code>position: absolute</code>定位，所以需要把容器设置为定位祖先元素，比如给容器设置<code>position: relative</code>。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>iconSize</td><td>加载图标大小</td><td>css font-size</td><td>50rpx</td></tr><tr><td>loadingIcon</td><td>自定义加载图标</td><td><a href="/behaviors-ui/components/icon.html">Icon</a> Props</td><td><code>{ fontFamily?: &#39;iconfont&#39;, prefix?: &#39;icon-&#39;, name: &#39;&#39; }</code></td></tr><tr><td>iconColor</td><td>自定义加载图标颜色</td><td>css color</td><td>#aaaaaa</td></tr><tr><td>bgColor</td><td>背景颜色</td><td>css background-color</td><td>rgba(255, 255, 255, 0)</td></tr><tr><td>borderRadius</td><td>边框圆角</td><td>css border-radius</td><td>0rpx</td></tr><tr><td>height</td><td>高度</td><td>css height</td><td>100%</td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table><thead><tr><th>插槽名</th><th>说明</th><th>slot props</th><th>默认值</th></tr></thead><tbody><tr><td>default</td><td>自定义加载样式</td><td>-</td><td>有</td></tr></tbody></table>',6),g=JSON.parse('{"title":"ViewLoading 视图加载中","description":"","frontmatter":{},"headers":[],"relativePath":"components/view-loading.md","filePath":"components/view-loading.md"}'),h={name:"components/view-loading.md"},E=t({...h,setup(o){return(p,r)=>(l(),a("div",null,[n,e(i,{url:"/pages/viewLoading/basic",height:"135px"}),d]))}});export{g as __pageData,E as default};
