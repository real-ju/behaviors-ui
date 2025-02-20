import{E as i}from"./chunks/ExampleIframe.DqPJ-Xy4.js";import{d as s,c as e,I as a,a1 as t,o as d}from"./chunks/framework.Bgiy4YwT.js";const h=t(`<h1 id="picker-选择器" tabindex="-1">Picker 选择器 <a class="header-anchor" href="#picker-选择器" aria-label="Permalink to &quot;Picker 选择器&quot;">​</a></h1><h2 id="基本使用" tabindex="-1">基本使用 <a class="header-anchor" href="#基本使用" aria-label="Permalink to &quot;基本使用&quot;">​</a></h2><div class="vp-code-group vp-adaptive-theme"><div class="tabs"><input type="radio" name="group-zQxks" id="tab-QkyLChz" checked="checked"><label for="tab-QkyLChz">template</label><input type="radio" name="group-zQxks" id="tab-OjI8ltk"><label for="tab-OjI8ltk">script</label></div><div class="blocks"><div class="language-html vp-adaptive-theme active"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> title</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;标题&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-model:visible</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;visible&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> mode</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> v-model:value</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;time&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">be-picker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><div class="language-ts vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> { ref } </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;vue&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> visible</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">false</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> time</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> ref</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre></div></div></div>`,3),l=t('<div class="tip custom-block"><p class="custom-block-title">TIP</p><p><code>Picker</code>组件基于 <a href="/behaviors-ui/components/data-popup.html">DataPopup</a> 和 <a href="/behaviors-ui/components/picker-view.html">PickerView</a> 封装，更多示例请参考对应组件。</p></div><h2 id="api" tabindex="-1">API <a class="header-anchor" href="#api" aria-label="Permalink to &quot;API&quot;">​</a></h2><h3 id="props" tabindex="-1">Props <a class="header-anchor" href="#props" aria-label="Permalink to &quot;Props&quot;">​</a></h3><table><thead><tr><th>属性名</th><th>说明</th><th>类型</th><th>默认值</th></tr></thead><tbody><tr><td>visible(v-model)</td><td>是否打开弹出层</td><td>boolean</td><td>false</td></tr><tr><td>value(v-model)</td><td>当前选择的时间或地区</td><td><code>string | string[]</code></td><td><code>&#39;&#39;</code></td></tr><tr><td>title</td><td>标题</td><td>string</td><td>请选择</td></tr><tr><td>confirmText</td><td>自定义确定按钮文字</td><td>string</td><td>确定</td></tr><tr><td>clearText</td><td>自定义清空按钮文字</td><td>string</td><td>清空</td></tr><tr><td>maskCloseAble</td><td>点击遮罩是否关闭弹出层</td><td>boolean</td><td>true</td></tr><tr><td>theme</td><td>主题色</td><td>css color</td><td>#4a68cc</td></tr><tr><td>mode</td><td>选择模式</td><td>time | region</td><td>time</td></tr><tr><td>timeFormat</td><td>时间格式（v-model 值的格式），当<code>mode=time</code>时生效。占位符：年<code>yyyy</code> 月<code>MM</code> 日<code>dd</code> 时<code>hh</code> 分<code>mm</code> 秒<code>ss</code></td><td>string</td><td>yyyy-MM-dd</td></tr><tr><td>timeColumn</td><td>时间可选度量区间。一个数组，第一项表示最大度量单位，二个项表示最小度量单位，当<code>mode=time</code>时生效。单位值：年<code>year</code> 月<code>month</code> 日<code>day</code> 时<code>hour</code> 分<code>minute</code> 秒<code>second</code></td><td><code>string[]</code></td><td><code>[&#39;year&#39;, &#39;day&#39;]</code></td></tr><tr><td>timeRange</td><td>时间可选范围。一个对象，例如<code>{ year: [1990, 2030], hour: [12, 23] }</code>表示年份范围 1990 ~ 2030，小时范围 12 点 ~ 23 点，字段名同上面单位值</td><td>object</td><td>-</td></tr><tr><td>province</td><td>指定省份，例如<code>北京市</code>，当<code>mode=region</code>时生效</td><td>string</td><td>-</td></tr><tr><td>regionValueType</td><td>地区值类型，默认中文名，可选地区编码</td><td>name | code</td><td>name</td></tr><tr><td>layout</td><td>列布局方式。可选值<code>row-reverse</code>，水平从右到左排列</td><td>default | row-reverse</td><td>default</td></tr></tbody></table>',4),m=JSON.parse('{"title":"Picker 选择器","description":"","frontmatter":{},"headers":[],"relativePath":"components/picker.md","filePath":"components/picker.md"}'),o={name:"components/picker.md"},g=s({...o,setup(r){return(n,p)=>(d(),e("div",null,[h,a(i,{url:"/pages/picker/basic",height:"400px",maxWidth:"375px"}),l]))}});export{m as __pageData,g as default};
