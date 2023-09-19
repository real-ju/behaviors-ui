import{E as a}from"./chunks/ExampleIframe.cb873845.js";import{d as s,c as e,J as o,S as t,o as n}from"./chunks/framework.6dd19598.js";const l=t(`<h1 id="video-视频" tabindex="-1">Video 视频 <a class="header-anchor" href="#video-视频" aria-label="Permalink to &quot;Video 视频&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-2fALj" id="tab-mLuCW8F" checked="checked"><label for="tab-mLuCW8F">template</label><input type="radio" name="group-2fALj" id="tab-eTCkI-8"><label for="tab-eTCkI-8">style scoped</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-video</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">video1</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">src</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">coverSrc</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">/static/xxx/xxx.jpg</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">be-video</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-scss"><button title="Copy Code" class="copy"></button><span class="lang">scss</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">.</span><span style="color:#FFCB6B;">video1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">width</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">100%</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#B2CCD6;">height</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">200px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span></code></pre></div></div></div>`,3),p=t('<div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>必须给 Video 组件设置宽高，否则无法正常显示。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>rootClass</td><td><a href="/behaviors-ui/note.html#组件如何自定义样式">根节点 class</a></td><td>string</td><td>-</td></tr><tr><td>rootStyle</td><td><a href="/behaviors-ui/note.html#组件如何自定义样式">根节点 style</a></td><td>string</td><td>-</td></tr><tr><td>coverSrc</td><td>视频封面 URL</td><td>string</td><td>-</td></tr><tr><td>hideCover</td><td>隐藏视频封面</td><td>boolean</td><td>false</td></tr><tr><td>playBtnSrc</td><td>播放按钮图标 URL</td><td>string</td><td><em>default value</em></td></tr><tr><td>playBtnWidth</td><td>播放按钮宽度</td><td>css width</td><td>100rpx</td></tr><tr><td>playBtnHeight</td><td>播放按钮高度</td><td>css height</td><td>100rpx</td></tr></tbody></table><h3 id="props-extend-uni-app-video" tabindex="-1">Props extend uni-app video <a class="header-anchor" href="#props-extend-uni-app-video" aria-label="Permalink to &quot;Props extend uni-app video&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>src</td><td><a href="https://uniapp.dcloud.net.cn/component/video.html" target="_blank" rel="noreferrer">属性说明</a></td><td>-</td></tr></tbody></table><h3 id="events-extend-uni-app-video" tabindex="-1">Events extend uni-app video <a class="header-anchor" href="#events-extend-uni-app-video" aria-label="Permalink to &quot;Events extend uni-app video&quot;">​</a></h3><table><thead><tr><th>事件名称</th><th>说明</th></tr></thead><tbody><tr><td>play</td><td><a href="https://uniapp.dcloud.net.cn/component/video.html" target="_blank" rel="noreferrer">事件说明</a></td></tr></tbody></table><h3 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-label="Permalink to &quot;Slots&quot;">​</a></h3><table><thead><tr><th>插槽名</th><th>说明</th><th>slot props</th><th>默认值</th></tr></thead><tbody><tr><td>cover</td><td>自定义视频封面</td><td>-</td><td>有</td></tr></tbody></table>',10),u=JSON.parse('{"title":"Video 视频","description":"","frontmatter":{},"headers":[],"relativePath":"components/video.md","filePath":"components/video.md"}'),d={name:"components/video.md"},D=s({...d,setup(r){return(i,c)=>(n(),e("div",null,[l,o(a,{url:"/pages/video/basic",height:"250px",maxWidth:"375px"}),p]))}});export{u as __pageData,D as default};
