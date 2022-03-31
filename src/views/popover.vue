<template>
  <div>
    <h2>气泡卡片 Popover</h2>
    <p>当用户触发弹出popover后，接着再触发一个popover会关闭之前的popover</p>
    <owl-code-example :code="code">
      <owl-popover trigger="click">
        <owl-button>click me</owl-button>
        <template slot="cover">
          <div class="owl-menu-item">菜单一</div>
          <div class="owl-menu-item">菜单二</div>
        </template>
      </owl-popover>
      <owl-popover trigger="hover">
        <owl-button>hover me</owl-button>
        <template slot="cover">
          <div class="owl-menu-item">菜单一</div>
          <div class="owl-menu-item">菜单二</div>
        </template>
      </owl-popover>
    </owl-code-example>
    <h3>箭头</h3>
    <owl-code-example :code="code1">
      <p class="subtitle">电话：</p>
      <owl-input v-model="phone" placeholder="请输入电话">
        <owl-popover text-arrow cover-arrow trigger="click" slot="prefix">
          <span>+{{region}}</span>
          <template slot="cover">
            <div class="owl-menu-item" @click="region = 86">+86</div>
            <div class="owl-menu-item" @click="region = 854">+854</div>
          </template>
        </owl-popover>
      </owl-input>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="list" :columns="columns" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      region: '86',
      code: `&lt;template&gt;
  <owl-popover trigger="click">
    <owl-button>click me</owl-button>
    <template slot="cover">
      <div class="owl-menu-item">菜单一</div>
      <div class="owl-menu-item">菜单二</div>
    </template>
  </owl-popover>
  <owl-popover trigger="hover">
    <owl-button>hover me</owl-button>
    <template slot="cover">
      <div class="owl-menu-item">菜单一</div>
      <div class="owl-menu-item">菜单二</div>
    </template>
  </owl-popover>
&lt;/template&gt;`,
      code1:`&lt;template&gt;
  <owl-input v-model="phone" placeholder="请输入电话">
    <owl-popover text-arrow cover-arrow trigger="click" slot="prefix">
      <span>+86</span>
      <template slot="cover">
        <div class="owl-menu-item">+86</div>
        <div class="owl-menu-item">+854</div>
      </template>
    </owl-popover>
  </owl-input>
&lt;/template&gt;`,
      columns: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      list: [
        {name: 'trriger', types: 'click|hover', default: 'click', introduce: '触发条件'},
        {name: 'textArrow', types: 'boolean', default: 'false', introduce: '是否在内容上显示下拉icon'},
        {name: 'coverArrow', types: 'boolean', default: 'false', introduce: '是否在弹出层上显示arrow'},
      ],
    }
  }
}
</script>
<style>
.owl-popover{
  margin-right: 12px;
}
</style>