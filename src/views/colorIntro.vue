<template>
  <div class="color-intro-page">
    <h2>主题色介绍</h2>
    <p>OwlUI 使用css变量存储通用颜色，具体如下:</p>
    <code id="code1"></code>
    <p>如果要更换样式可以覆盖css样式，如果要实现动态切换功能可以在body标签的style属性注入替换样式值</p>
  </div>
</template>

<script>
export default {
  mounted(){
    const dom1 = document.querySelector('#code1')
    dom1.innerHTML = this.$hljs.highlight(`:root{
  --owl-primary-color: #0076d1;           // 主色
  --owl-primary-darken-color: #006abd;    // 鼠标点击时的暗色，同css的触发:active伪类属性
  --owl-primary-lighten-color: #0082e5;   // 鼠标移动到组件上时的颜色，同css的触发:hover伪类属性
  --owl-primary-bgm-color: rgba(0,118,209,.1); // 普通背景色
  --owl-success-color: #ff9600;           // 副色或者成功状态色
  --owl-success-darken-color: #e08400;
  --owl-success-lighten-color: #ffa31f;
  --owl-error-color: #e93f27;             // 危险、警告状态色
  --owl-error-darken-color: #db2f16;
  --owl-error-lighten-color: #ec5843;
}`, {language: 'css'}).value
  }
}
</script>