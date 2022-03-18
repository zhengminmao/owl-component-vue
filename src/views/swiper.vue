<template>
  <div>
    <h2>Swiper 轮播图</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <div class="swiper-wrap">
        <owl-swiper :list="swiperList" />
      </div>
    </owl-code-example>
    <h3>属性</h3>
    <owl-table :data="propsData" :columns="propsCol" />
     <h3>事件</h3>
    <owl-table :data="propsData1" :columns="propsCol" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      swiperList: [
        {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2022/01/11/f60ff7b0-c703-40d1-b49e-e12c1c1e4dae.jpg',},
        {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2021/07/05/15066cb8-1b33-471b-85e7-7ecc47eb3225.jpg'}
      ],
      propsCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'list', types: '{path: string, link: string}[]', introduce: 'path：图片路径， link：点击图片跳转的地址'},
        {name: 'object-fit', types: '\'cover\'', introduce: 'css的object-fit属性，默认值是\'cover\''},
      ],
      propsData1:[
        {name: 'changed', types: '(val: number) => void', introduce: '当前跳转的轮播图索引'},
      ],
      code1:`&lt;template&gt;
  &lt;owl-swiper :list="swiperList" /&gt;
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        swiperList: [
          {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2022/01/11/f60ff7b0-c703-40d1-b49e-e12c1c1e4dae.jpg',},
          {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2021/07/05/15066cb8-1b33-471b-85e7-7ecc47eb3225.jpg'}
        ],
      }
    }
  }
&lt;/script&gt;
`
    }
  }
}
</script>
<style lang="less">
.swiper-wrap{
  overflow: hidden;
  border-radius: 4px;
  .owl-swiper{
    height: 380px;
  }
}
</style>