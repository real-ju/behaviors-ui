import{E as a}from"./chunks/ExampleIframe.cb873845.js";import{d as n,c as t,J as l,S as s,o}from"./chunks/framework.6dd19598.js";const p=s(`<h1 id="apppage-页面" tabindex="-1">AppPage 页面 <a class="header-anchor" href="#apppage-页面" aria-label="Permalink to &quot;AppPage 页面&quot;">​</a></h1><p>应用的每一个页面。</p><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-zLsF0" id="tab-qSgu6s6" checked="checked"><label for="tab-qSgu6s6">template</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-app-page</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">showNavbar</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">标题</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">bgColor</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#f2f2f2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">#navBar</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ title }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">内容</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">be-app-page</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div></div></div>`,4),e=s(`<div class="info custom-block"><p class="custom-block-title">INFO</p><p>顶部导航栏一般根据产品设计，有不同的样式和功能。所以导航栏组件请自行封装，通过<code>navBar</code>slot 传入即可。这里不提供 NavBar 组件代码，只用于演示。</p></div><h2 id="沉浸式导航栏" tabindex="-1">沉浸式导航栏 <a class="header-anchor" href="#沉浸式导航栏" aria-label="Permalink to &quot;沉浸式导航栏&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-K_ySU" id="tab-54_JEFg" checked="checked"><label for="tab-54_JEFg">template</label><input type="radio" name="group-K_ySU" id="tab-2CP69bk"><label for="tab-2CP69bk">script</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight has-highlighted-lines"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-app-page</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">showNavbar</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">标题</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">bgColor</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#f2f2f2</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line highlighted"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">immersiveNav</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">@toggleImmersive</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">toggleImmersive</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">#navBar</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ title }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:bgTheme</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">bgTheme</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">banner</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Banner</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  ...</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">be-app-page</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> defaultBgTheme </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dark</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 导航栏背景色是暗色还是亮色</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> bgTheme </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">dark</span><span style="color:#89DDFF;">&#39;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> toggleImmersive </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">isImmersive</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">boolean</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#A6ACCD;">bgTheme</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">isImmersive</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">?</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">defaultBgTheme</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">light</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div></div></div>`,3),r=s(`<h2 id="下拉刷新" tabindex="-1">下拉刷新 <a class="header-anchor" href="#下拉刷新" aria-label="Permalink to &quot;下拉刷新&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-bC2l5" id="tab-DUjBIXp" checked="checked"><label for="tab-DUjBIXp">template</label><input type="radio" name="group-bC2l5" id="tab-H5Gamzw"><label for="tab-H5Gamzw">script</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-app-page</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">showNavbar</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">标题</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">bgColor</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">#f2f2f2</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">pullDownRefresh</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@refreshData</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">refreshData</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">#navBar</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">{ title }</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">title</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">NavBar</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">文本文本文本文本文本文本文本文本文本文本</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">view</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">be-app-page</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> refreshData </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(</span><span style="color:#82AAFF;">finishRefresh</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#FFCB6B;">Function</span><span style="color:#89DDFF;">)</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">finishRefresh</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">1000</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">};</span></span></code></pre></div></div></div>`,2),c=s('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>showNavbar</td><td>显示导航栏</td><td>boolean</td><td>false</td></tr><tr><td>title</td><td>导航栏标题</td><td>string</td><td>-</td></tr><tr><td>navBgColor</td><td>导航栏背景色</td><td>css background-color</td><td>#ffffff</td></tr><tr><td>immersiveNav</td><td>是否开启沉浸式导航栏</td><td>boolean</td><td>false</td></tr><tr><td>bgColor</td><td>页面背景色</td><td>css background-color</td><td>#ffffff</td></tr><tr><td>loading</td><td>页面加载状态</td><td>boolean</td><td>false</td></tr><tr><td>loadingIconSize</td><td>页面加载图标大小</td><td>css font-size</td><td>50rpx</td></tr><tr><td>pullDownRefresh</td><td>是否开启页面下拉刷新</td><td>boolean</td><td>false</td></tr><tr><td>refresherColor</td><td>下拉刷新器颜色</td><td>css color</td><td>#aaaaaa</td></tr><tr><td>scrollWithAnimation</td><td>是否开启页面滚动动画</td><td>boolean</td><td>false</td></tr></tbody></table><h3 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-label="Permalink to &quot;Events&quot;">​</a></h3><table><thead><tr><th>事件名称</th><th>说明</th><th>回调参数</th></tr></thead><tbody><tr><td>refreshData</td><td>下拉刷新数据</td><td><code>(finishRefresh: Function) =&gt; {}</code></td></tr><tr><td>toggleImmersive</td><td>沉浸状态切换时，<code>isImmersive=true</code>表示导航栏背景透明</td><td><code>(isImmersive: boolean) =&gt; {}</code></td></tr></tbody></table><h3 id="events-extend-uni-app-scroll-view" tabindex="-1">Events extend uni-app scroll-view <a class="header-anchor" href="#events-extend-uni-app-scroll-view" aria-label="Permalink to &quot;Events extend uni-app scroll-view&quot;">​</a></h3><table><thead><tr><th>事件名称</th><th>说明</th></tr></thead><tbody><tr><td>scrolltolower</td><td><a href="https://uniapp.dcloud.net.cn/component/scroll-view.html" target="_blank" rel="noreferrer">事件说明</a></td></tr><tr><td>scroll</td><td><a href="https://uniapp.dcloud.net.cn/component/scroll-view.html" target="_blank" rel="noreferrer">事件说明</a></td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table><thead><tr><th>插槽名</th><th>说明</th><th>slot props</th><th>默认值</th></tr></thead><tbody><tr><td>navBar</td><td>自定义导航栏</td><td><code>{ title: string }</code></td><td>无</td></tr><tr><td>loading</td><td>自定义加载视图，推荐传入 <a href="/behaviors-ui/components/view-loading.html">BeViewLoading</a> 组件</td><td>-</td><td>有</td></tr><tr><td>upLayer</td><td>顶层视图。由于在微信小程序中，<code>position: fixed</code>定位的基准元素是最近的<code>&lt;scroll-view&gt;</code>而不是视口。如果需要跳出这个限制，比如全局弹出层，请把视图代码放在该插槽中。</td><td>-</td><td>无</td></tr><tr><td>default</td><td>页面内容</td><td>-</td><td>无</td></tr></tbody></table><h3 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h3><table><thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td>finishRefresh</td><td>结束下拉刷新</td><td><code>() =&gt; void</code></td></tr><tr><td>backTop</td><td>返回页面顶部</td><td><code>() =&gt; void</code></td></tr></tbody></table>',11),C=JSON.parse('{"title":"AppPage 页面","description":"","frontmatter":{},"headers":[],"relativePath":"components/app-page.md","filePath":"components/app-page.md"}'),D={name:"components/app-page.md"},A=n({...D,setup(F){return(y,d)=>(o(),t("div",null,[p,l(a,{url:"/pages/appPage/basic",height:"300px"}),e,l(a,{url:"/pages/appPage/immersiveNav",height:"300px"}),r,l(a,{url:"/pages/appPage/refresh",height:"300px"}),c]))}});export{C as __pageData,A as default};