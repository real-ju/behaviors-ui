import{E as a}from"./chunks/ExampleIframe.cb873845.js";import{d as t,c as l,J as n,S as s,o}from"./chunks/framework.6dd19598.js";const e=s(`<h1 id="select-选择器" tabindex="-1">Select 选择器 <a class="header-anchor" href="#select-选择器" aria-label="Permalink to &quot;Select 选择器&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group"><div class="tabs"><input type="radio" name="group-fSgrm" id="tab-79R6KbY" checked="checked"><label for="tab-79R6KbY">template</label><input type="radio" name="group-fSgrm" id="tab-mYYYtSR"><label for="tab-mYYYtSR">script</label></div><div class="blocks"><div class="language-html active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">be-select</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">title</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">标题</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-model:visible</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">visible</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">mode</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">single</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">v-model:value</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">selectValue</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#C792EA;">:list</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">selectList</span><span style="color:#89DDFF;">&quot;</span></span>
<span class="line"><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">be-select</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> visible </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">(</span><span style="color:#FF9CAC;">false</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> selectValue </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">number</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#A6ACCD;"> selectList </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#A6ACCD;">([</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">选项1</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">1</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">选项2</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">2</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">{</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">label</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">选项3</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F07178;">value</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">3</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">])</span><span style="color:#89DDFF;">;</span></span></code></pre></div></div></div>`,3),p=s('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>Select</code>组件基于 <a href="/behaviors-ui/components/data-popup.html">DataPopup</a> 和 <a href="/behaviors-ui/components/select-view.html">SelectView</a> 封装，更多示例请参考对应组件。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>visible(v-model)</td><td>是否打开弹出层</td><td>boolean</td><td>false</td></tr><tr><td>value(v-model)</td><td>当前选中值（数组）</td><td><code>string | number | Array&lt;string | number&gt;</code></td><td>undefined</td></tr><tr><td>title</td><td>标题</td><td>string</td><td>请选择</td></tr><tr><td>confirmText</td><td>自定义确定按钮文字</td><td>string</td><td>确定</td></tr><tr><td>clearText</td><td>自定义清空按钮文字</td><td>string</td><td>清空</td></tr><tr><td>maskCloseAble</td><td>点击遮罩是否关闭弹出层</td><td>boolean</td><td>true</td></tr><tr><td>actionCloseAble</td><td>点击确定或清空按钮后是否关闭弹出层</td><td>boolean</td><td>true</td></tr><tr><td>theme</td><td>主题色</td><td>css color</td><td>#4a68cc</td></tr><tr><td>list</td><td>列数据</td><td>见 <a href="/behaviors-ui/components/select-view.html">SelectView</a> 示例</td><td>-</td></tr><tr><td>mode</td><td>选择模式</td><td>single | multiple | cascade</td><td>single</td></tr><tr><td>valueName</td><td>自定义列数据的<code>value</code>字段名</td><td>string</td><td>value</td></tr><tr><td>labelName</td><td>自定义列数据的<code>label</code>字段名</td><td>string</td><td>label</td></tr><tr><td>childName</td><td>自定义列数据的<code>children</code>字段名</td><td>string</td><td>children</td></tr><tr><td>layout</td><td>列布局方式。可选值<code>row-reverse</code>，水平从右到左排列</td><td>default | row-reverse</td><td>default</td></tr></tbody></table>',4),i=JSON.parse('{"title":"Select 选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/select.md","filePath":"components/select.md"}'),c={name:"components/select.md"},C=t({...c,setup(r){return(d,D)=>(o(),l("div",null,[e,n(a,{url:"/pages/select/basic",height:"400px",maxWidth:"375px"}),p]))}});export{i as __pageData,C as default};