<template><h1 id="button-按钮" tabindex="-1"><a class="header-anchor" href="#button-按钮" aria-hidden="true">#</a> Button 按钮</h1>
<h2 id="基础使用" tabindex="-1"><a class="header-anchor" href="#基础使用" aria-hidden="true">#</a> 基础使用</h2>
<p>使用 <code v-pre>type</code>、<code v-pre>plain</code>、<code v-pre>round</code> 和 <code v-pre>circle</code> 来定义按钮的样式。</p>
<p>:::demo
button/base
:::</p>
<h2 id="禁用状态" tabindex="-1"><a class="header-anchor" href="#禁用状态" aria-hidden="true">#</a> 禁用状态</h2>
<p>使用 <code v-pre>disabled</code> 属性来定义按钮是否被禁用。</p>
<p>:::demo</p>
<p>button/disabled</p>
<p>:::</p>
<h2 id="加载中" tabindex="-1"><a class="header-anchor" href="#加载中" aria-hidden="true">#</a> 加载中</h2>
<p>通过设置 <code v-pre>loading</code> 属性为 <code v-pre>true</code> 来显示加载中状态。</p>
<p>:::demo
button/loading
:::</p>
<h2 id="图标按钮" tabindex="-1"><a class="header-anchor" href="#图标按钮" aria-hidden="true">#</a> 图标按钮</h2>
<p>使用 <code v-pre>icon</code> 属性来为按钮添加图标</p>
<p>:::demo
button/icon
:::</p>
<h2 id="各种尺寸的按钮" tabindex="-1"><a class="header-anchor" href="#各种尺寸的按钮" aria-hidden="true">#</a> 各种尺寸的按钮</h2>
<p>使用 <code v-pre>size</code> 属性额外配置尺寸，可使用 <code v-pre>large</code> 和 <code v-pre>small</code> 两种值。</p>
<p>:::demo
button/size
:::</p>
<h2 id="属性" tabindex="-1"><a class="header-anchor" href="#属性" aria-hidden="true">#</a> 属性</h2>
<table>
<thead>
<tr>
<th>参数</th>
<th>说明</th>
<th>类型</th>
<th>可选值</th>
<th>默认值</th>
</tr>
</thead>
<tbody>
<tr>
<td>size</td>
<td>尺寸</td>
<td>string</td>
<td>large,small</td>
<td>—</td>
</tr>
<tr>
<td>type</td>
<td>类型</td>
<td>string</td>
<td>primary,success,warning,danger</td>
<td>—</td>
</tr>
<tr>
<td>plain</td>
<td>是否为朴素按钮</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>round</td>
<td>是否为圆角按钮</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>circle</td>
<td>是否为圆形按钮</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>loading</td>
<td>是否为加载中状态</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>disabled</td>
<td>是否为禁用状态</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>autofocus</td>
<td>原生 <code v-pre>autofocus</code> 属性</td>
<td>boolean</td>
<td>—</td>
<td>false</td>
</tr>
<tr>
<td>icon</td>
<td>图标</td>
<td>string</td>
<td>—</td>
<td>—</td>
</tr>
</tbody>
</table>
<h2 id="事件" tabindex="-1"><a class="header-anchor" href="#事件" aria-hidden="true">#</a> 事件</h2>
<table>
<thead>
<tr>
<th>事件名称</th>
<th>说明</th>
<th>回调参数</th>
</tr>
</thead>
<tbody>
<tr>
<td>click</td>
<td>点击按钮时触发</td>
<td>—</td>
</tr>
</tbody>
</table>
<h2 id="插槽" tabindex="-1"><a class="header-anchor" href="#插槽" aria-hidden="true">#</a> 插槽</h2>
<table>
<thead>
<tr>
<th>插槽名称</th>
<th>说明</th>
</tr>
</thead>
<tbody>
<tr>
<td>—</td>
<td>自定义默认内容</td>
</tr>
</tbody>
</table>
</template>
