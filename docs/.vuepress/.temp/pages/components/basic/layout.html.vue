<template><h1 id="layout-布局" tabindex="-1"><a class="header-anchor" href="#layout-布局" aria-hidden="true">#</a> Layout 布局</h1>
<h2 id="概述" tabindex="-1"><a class="header-anchor" href="#概述" aria-hidden="true">#</a> 概述</h2>
<p>栅格化设计是按照一定的规则把页面分成固定的相同宽度，然后列出各种组合的可能性，以便于在进行页面呈现的时候能够快速的进行布局。市面上一般使用 12 栅格 系统，也有采用 8 栅格 系统的，但是随着设备屏幕越来越大，传统的 12 栅格 系统在一些业务场景下，没办法很好的解决元素布局的问题，所以我们使用了 24 栅格 系统。也就是将页面区域 24 等分。</p>
<h2 id="基础布局" tabindex="-1"><a class="header-anchor" href="#基础布局" aria-hidden="true">#</a> 基础布局</h2>
<p>使用单一分栏创建基础的栅格布局。通过 <code v-pre>row</code> 和 <code v-pre>col</code> 组件，并通过 <code v-pre>col</code> 组件的 <code v-pre>span</code> 属性我们就可以自由地组合布局。</p>
<p>:::demo
layout/base
:::</p>
</template>
