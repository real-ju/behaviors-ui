import{E as i}from"./chunks/ExampleIframe.DqPJ-Xy4.js";import{d as a,c as e,I as s,a1 as t,o as d}from"./chunks/framework.Bgiy4YwT.js";const h=t(`<h1 id="pickerview-内嵌选择器" tabindex="-1">PickerView 内嵌选择器 <a class="header-anchor" href="#pickerview-内嵌选择器" aria-label="Permalink to &quot;PickerView 内嵌选择器&quot;">​</a></h1><h2 id="时间选择" tabindex="-1">时间选择 <a class="header-anchor" href="#时间选择" aria-label="Permalink to &quot;时间选择&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-tQP7R" id="tab-JIWHdBn" checked="checked"><label for="tab-JIWHdBn">template</label><input type="radio" name="group-tQP7R" id="tab-ciMP4jY"><label for="tab-ciMP4jY">script</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker-view</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  timeFormat</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;yyyy-MM-dd hh:mm&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  :timeColumn</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;[&#39;year&#39;, &#39;minute&#39;]&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  :timeRange</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;{ year: [2022, 2024], hour: [12, 23] }&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;200px&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker-view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;2023-08-31 16:00&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></div></div>`,3),n=t(`<h2 id="地区选择" tabindex="-1">地区选择 <a class="header-anchor" href="#地区选择" aria-label="Permalink to &quot;地区选择&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group--IAzx" id="tab-vANkmVC" checked="checked"><label for="tab-vANkmVC">template</label><input type="radio" name="group--IAzx" id="tab-e40ronF"><label for="tab-e40ronF">script</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker-view</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;region&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-model</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;region&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;200px&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker-view</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> region</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">([]);</span></span></code></pre></div></div></div>`,2),l=t('<h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>modelValue(v-model)</td><td>当前选择的时间或地区</td><td><code>string | string[]</code></td><td><code>&#39;&#39;</code></td></tr><tr><td>mode</td><td>选择模式</td><td>time | region</td><td>time</td></tr><tr><td>timeFormat</td><td>时间格式（v-model 值的格式），当<code>mode=time</code>时生效。占位符：年<code>yyyy</code> 月<code>MM</code> 日<code>dd</code> 时<code>hh</code> 分<code>mm</code> 秒<code>ss</code></td><td>string</td><td>yyyy-MM-dd</td></tr><tr><td>timeColumn</td><td>时间可选度量区间。一个数组，第一项表示最大度量单位，二个项表示最小度量单位，当<code>mode=time</code>时生效。单位值：年<code>year</code> 月<code>month</code> 日<code>day</code> 时<code>hour</code> 分<code>minute</code> 秒<code>second</code></td><td><code>string[]</code></td><td><code>[&#39;year&#39;, &#39;day&#39;]</code></td></tr><tr><td>timeRange</td><td>时间可选范围。一个对象，例如<code>{ year: [1990, 2030], hour: [12, 23] }</code>表示年份范围 1990 ~ 2030，小时范围 12 点 ~ 23 点，字段名同上面单位值</td><td>object</td><td>-</td></tr><tr><td>province</td><td>指定省份，例如<code>北京市</code>，当<code>mode=region</code>时生效</td><td>string</td><td>-</td></tr><tr><td>regionValueType</td><td>地区值类型，默认中文名，可选地区编码</td><td>name | code</td><td>name</td></tr><tr><td>width</td><td>宽度</td><td>css width</td><td>100%</td></tr><tr><td>height</td><td>高度</td><td>css height</td><td>400rpx</td></tr><tr><td>layout</td><td>列布局方式。可选值<code>row-reverse</code>，水平从右到左排列</td><td>default | row-reverse</td><td>default</td></tr></tbody></table><div class="info custom-block"><p class="custom-block-title">INFO</p><p><code>v-model</code>值如果为空，在组件初始化时会为其赋一个默认值（时间模式为当前时间，地区模式为第一个地区选项）</p></div><h3 id="props-extend-uni-app-picker-view" tabindex="-1">Props extend uni-app picker-view <a class="header-anchor" href="#props-extend-uni-app-picker-view" aria-label="Permalink to &quot;Props extend uni-app picker-view&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>默认值</th></tr></thead><tbody><tr><td>indicatorStyle</td><td><a href="https://uniapp.dcloud.net.cn/component/picker-view.html" target="_blank" rel="noreferrer">属性说明</a></td><td>height: 40px</td></tr><tr><td>indicatorClass</td><td><a href="https://uniapp.dcloud.net.cn/component/picker-view.html" target="_blank" rel="noreferrer">属性说明</a></td><td>-</td></tr><tr><td>maskStyle</td><td><a href="https://uniapp.dcloud.net.cn/component/picker-view.html" target="_blank" rel="noreferrer">属性说明</a></td><td>-</td></tr><tr><td>maskClass</td><td><a href="https://uniapp.dcloud.net.cn/component/picker-view.html" target="_blank" rel="noreferrer">属性说明</a></td><td>-</td></tr></tbody></table><h3 id="methods" tabindex="-1">Methods <a class="header-anchor" href="#methods" aria-label="Permalink to &quot;Methods&quot;">​</a></h3><table><thead><tr><th>方法名</th><th>说明</th><th>参数</th></tr></thead><tbody><tr><td>clear</td><td>清空当前选中值</td><td><code>() =&gt; void</code></td></tr></tbody></table>',8),E=JSON.parse('{"title":"PickerView 内嵌选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/picker-view.md","filePath":"components/picker-view.md"}'),p={name:"components/picker-view.md"},m=a({...p,setup(r){return(o,k)=>(d(),e("div",null,[h,s(i,{url:"/pages/pickerView/time",height:"300px"}),n,s(i,{url:"/pages/pickerView/region",height:"300px"}),l]))}});export{E as __pageData,m as default};
