<template>
  <div class="indexPage">
    <h1>
      this is index page heelo12222
    </h1>
    <owl-swiper :list="swiperList" />
    <!-- <img :src="pic" alt="xxx"/> -->
    <owl-button>12</owl-button>
  </div>
</template>

<script>
// import pic from  "@/assets/xxxx.jpg"
export default {
  data(){
    return {
      swiperList: [
        {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2022/01/11/f60ff7b0-c703-40d1-b49e-e12c1c1e4dae.jpg',},
        {link: '', path: 'https://www.msoffer.hk/appMyFile/files/2021/07/05/15066cb8-1b33-471b-85e7-7ecc47eb3225.jpg'}
      ]
    }
  }
}
</script>
<style lang="less">
.indexPage{
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>