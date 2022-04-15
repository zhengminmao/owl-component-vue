<template>
  <div>
    <h2>Swiper 轮播图</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code1">
      <div class="swiper-wrap">
        <owl-swiper :autoplay="true" :showdots="true" :default-index="0">
          <div class="owl-swiper-slide" v-for="(item, key) in swiperList" :key="key">
            <img class="owl-banner-bgm" @click="(e)=>clickImg(e,item)" :src="item.path" alt="picture" loading="lazy">
          </div>
        </owl-swiper>
      </div>
      <owl-button style="display:block; margin: 12px auto 0;" :disabled="swiperList.length> 2" @click="addNewPic">新增一张轮播图片</owl-button>
    </owl-code-example>
    <h3>例二</h3>
    <owl-code-example :code="code2">
      <div class="swiper-wrap">
        <owl-swiper class="owl-swiper2">
          <div class="owl-swiper-slide " v-for="key in 2" :key="key">
            <div class="student-card-wrap">
              <div class="student-card" v-for="(item, key) in swiperList2" :key="key">
                <img class="cover" @click="(e)=>clickImg(e,item)" :src="item.pic" alt="picture" loading="lazy">
                <div class="uni-title">{{item.universityCn}}</div>
                <div class="uni-title-en">{{item.university}}</div>
                <div class="article-title">{{item.title}}</div>
                <div class="desc">{{item.desc}}</div>
              </div>
            </div>
          </div>
        </owl-swiper>
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
      swiperList2: [
        {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/09/76c365b5-d4c4-4999-ae5c-3b89356effb6.jpg', desc: '畢業院校：中山大學 畢業專業：英語 學生成績：GPA3.3/4.0 申請院校： Durham University Education MA University of Exeter TESOL MED Lancaster University Applied Linguistic and TESOL MA 錄取院校： Durham University Education MA University of Exeter TESOL MED Lancaster University Applied Linguistic and TESOL MA 選擇院校：Durham University 申請時間：2020年01月08日 錄取時間：2020年04月09日 申請優勢：本科專業相關，有相關實習經歷 申請體驗：作為英語專業的本科畢業生，讀研可以選擇的專業方向有很多。和自己所學英語相關的專業方向，例如：英語教學、英語文學、語言學等。到了研究生階段，重在把英語作為一種能力拓展到各個方面去，選擇和英語有關的專業是為今后的就業打好基礎。其中TESOL就是英語專業學生最常申請的一個專業，也是最對口的。TESOL主要研究如何教授母語為非英語的學生學習英語。而教育學是相對偏重', title: 'University of Western Australia - ZWY:', university: 'University of Western Australia', universityCn: '西澳大学'},
        {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/30/a6c06d4f-d6d2-4791-8e37-7530c8d477d8.jpg', desc: '畢業院校：河北經貿大學自考本科；大專：宣化科技職業學院申請優勢：平均分均較高，大專階段的專業與申請專業背景相同申請難點：本科專業背景較弱，專升本自考生申請體驗：通過MOS平台的協助，拿到了大部分申請院校的錄取。MOS精準幫我定位了院校申請層次，平台顧問老師也給予了專業的建議和指導。', title: 'University of Wollongong - Yao Zihao:', university: 'University of Wollongong', universityCn: '伍伦贡大学'},
        {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/30/a61c4e34-0edf-4924-867a-b4cf2729d20c.jpg', desc: '畢業院校：江西科技學院 畢業專業：軟件工程（會計）學生成績：均分80.03 申請優勢：本科專業背景相關聯，有相關實習經歷 申請難點：本科院校背景較為一般申請體驗：MOS平台的申請建議推送較為精準，讓我后期在PS中突出優勢，淡化弱勢對申請很重要。我以國內二本的學習背景，成功邁入世界排名前200的名校讀研，這對我來說是一個極大的鼓舞。', title: 'Newcastle University - WAN WQQ', university: 'Newcastle University', universityCn: '纽卡斯特大学'},
      ],
      propsCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsData: [
        {name: 'autoplay', types: 'boolean', default: 'false', introduce: '自动播放'},
        {name: 'showdots', types: 'boolean', default: 'false', introduce: '是否显示pagination'},
        {name: 'interval', types: 'number', default: '4000', introduce: '4000毫秒切换下一张'}
      ],
      propsData1:[
        {name: 'changed', types: '(val: number) => void', introduce: '当前跳转的轮播图索引'},
      ],
      code1:`&lt;template&gt;
  <owl-swiper :autoplay="true" :showdots="true" :default-index="0">
    <div class="owl-swiper-slide" v-for="(item, key) in swiperList" :key="key">
      <img class="owl-banner-bgm" @click="(e)=>clickImg(e,item)" :src="item.path" alt="picture" loading="lazy">
    </div>
  </owl-swiper>
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
    },
    methods:{
      clickImg(e){
        e.preventDefault();
        e.stopPropagation();
      },
      addNewPic(){
        this.swiperList.push({
          link: '', path: 'https://www.msoffer.hk/appMyFile/files/2022/03/08/a8ea5ec8-f110-41b6-b7c9-51d059101d10.jpg'
        })
      }
    }
  }
&lt;/script&gt;
`,
      code2: `&lt;template&gt;
  <owl-swiper >
    <div class="owl-swiper-slide " v-for="key in 2" :key="key">
      <div class="student-card-wrap">
        <div class="student-card" v-for="(item, key) in swiperList2" :key="key">
          <img class="cover" @click="(e)=>clickImg(e,item)" :src="item.pic" alt="picture" loading="lazy">
          <div class="uni-title">{{item.universityCn}}</div>
          <div class="uni-title-en">{{item.university}}</div>
          <div class="article-title">{{item.title}}</div>
          <div class="desc">{{item.desc}}</div>
        </div>
      </div>
    </div>
  </owl-swiper>
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        swiperList2: [
          {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/09/76c365b5-d4c4-4999-ae5c-3b89356effb6.jpg', desc: '畢業院校：中山大學 畢業專業：英語 學生成績：GPA3.3/4.0 申請院校： Durham University Education MA University of Exeter TESOL MED Lancaster University Applied Linguistic and TESOL MA 錄取院校： Durham University Education MA University of Exeter TESOL MED Lancaster University Applied Linguistic and TESOL MA 選擇院校：Durham University 申請時間：2020年01月08日 錄取時間：2020年04月09日 申請優勢：本科專業相關，有相關實習經歷 申請體驗：作為英語專業的本科畢業生，讀研可以選擇的專業方向有很多。和自己所學英語相關的專業方向，例如：英語教學、英語文學、語言學等。到了研究生階段，重在把英語作為一種能力拓展到各個方面去，選擇和英語有關的專業是為今后的就業打好基礎。其中TESOL就是英語專業學生最常申請的一個專業，也是最對口的。TESOL主要研究如何教授母語為非英語的學生學習英語。而教育學是相對偏重', title: 'University of Western Australia - ZWY:', university: 'University of Western Australia', universityCn: '西澳大学'},
          {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/30/a6c06d4f-d6d2-4791-8e37-7530c8d477d8.jpg', desc: '畢業院校：河北經貿大學自考本科；大專：宣化科技職業學院申請優勢：平均分均較高，大專階段的專業與申請專業背景相同申請難點：本科專業背景較弱，專升本自考生申請體驗：通過MOS平台的協助，拿到了大部分申請院校的錄取。MOS精準幫我定位了院校申請層次，平台顧問老師也給予了專業的建議和指導。', title: 'University of Wollongong - Yao Zihao:', university: 'University of Wollongong', universityCn: '伍伦贡大学'},
          {pic: 'https://www.msoffer.hk/appMyFile/appendix/2021/06/30/a61c4e34-0edf-4924-867a-b4cf2729d20c.jpg', desc: '畢業院校：江西科技學院 畢業專業：軟件工程（會計）學生成績：均分80.03 申請優勢：本科專業背景相關聯，有相關實習經歷 申請難點：本科院校背景較為一般申請體驗：MOS平台的申請建議推送較為精準，讓我后期在PS中突出優勢，淡化弱勢對申請很重要。我以國內二本的學習背景，成功邁入世界排名前200的名校讀研，這對我來說是一個極大的鼓舞。', title: 'Newcastle University - WAN WQQ', university: 'Newcastle University', universityCn: '纽卡斯特大学'},
        ],
      }
    },
  }
&lt;/script&gt;
&lt;style lang="less"&gt;
.owl-swiper{
  height: 800px;
  .owl-banner-bgm{
    height: 100%;
    pointer-events: none;
  }
  .student-card-wrap{
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    flex-wrap: no-wrap;
    .cover{
      height: 168px;
      width: 100%;
      object-fit: cover;
    }
    .uni-title {
      padding: 6px 12px 2px;
      color: var(--owl-success-color);
      font-size: 16px;
      font-weight: bold;
    }
    .uni-title-en {
      font-size: 16px;
      color: #333;
      padding: 0 0 12px;
      margin: 0 12px;
      border-bottom: 1px solid #f1f1f1;
    }
    .article-title {
      padding: 6px 12px 6px;
      color: var(--owl-primary-color);
      font-size: 14px;
      font-weight: bold;
    }
    .desc {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    .student-card{
      border-radius: 6px;
      overflow: hidden;
      box-shadow: 0px 10px 8px rgba(0,0,0, 0.08);
      margin: 0 6px;
      width: 248px;
      flex: 1;
      padding: 0;
      font-size: 0;
    }
  }
}
&lt;/style&gt;
      `
    }
  },
  methods:{
    clickImg(e){
      e.preventDefault();
      e.stopPropagation();
    },
    addNewPic(){
      this.swiperList.push({
        link: '', path: 'https://www.msoffer.hk/appMyFile/files/2022/03/08/a8ea5ec8-f110-41b6-b7c9-51d059101d10.jpg'
      })
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
    &.owl-swiper2{
      height: 800px;
    }
    .owl-banner-bgm{
      height: 100%;
      pointer-events: none;
    }
    .student-card-wrap{
      display: flex;
      justify-content: space-around;
      align-items: flex-start;
      flex-wrap: no-wrap;
      .cover{
        height: 168px;
        width: 100%;
        object-fit: cover;
      }
      .uni-title {
        padding: 6px 12px 2px;
        color: var(--owl-success-color);
        font-size: 16px;
        font-weight: bold;
      }
      .uni-title-en {
        font-size: 16px;
        color: #333;
        padding: 0 0 12px;
        margin: 0 12px;
        border-bottom: 1px solid #f1f1f1;
      }
      .article-title {
        padding: 6px 12px 6px;
        color: var(--owl-primary-color);
        font-size: 14px;
        font-weight: bold;
      }
      .desc {
        padding: 0 12px 12px;
        font-size: 14px;
      }
      .student-card{
        border-radius: 6px;
        overflow: hidden;
        box-shadow: 0px 10px 8px rgba(0,0,0, 0.08);
        margin: 0 6px;
        width: 248px;
        flex: 1;
        padding: 0;
        font-size: 0;
      }
    }
  }
}
</style>