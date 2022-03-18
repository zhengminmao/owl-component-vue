import './style/index.less'

export default {
  name: 'OwlSwiper',
  props:{
    list: {
      type: Array,
      default: [],
      require: true,
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
  },
  data(){
    return {
      bannerStatus: false,
      bannerInfo: {
        x: 0,
        active: false,
        start: 0,
        move: 0,
        startTime: 0,
        transition: false,
        width: 0,
      },
      currentIndex: 0, // 当前banner
      count: 0  //count等于4下一张
    }
  },
  computed:{
    bannerList(){
      let lng = this.list.length
      if(lng <= 1) return this.list;
      return [this.list[lng-1]].concat(this.list, this.list[0])
    }
  },
  mounted(){
    this.$nextTick(()=>{
      const width = this.$refs.swiperDom.clientWidth;
      if (!width) return;
      this.bannerInfo.width = width;
      window.addEventListener('resize', this.windowSizeChange);
      if(this.list.length <= 1) {
        // 如果小于1张
        this.count = 4;
        return;
      }
      this.bannerInfo.x = -width;
      // 自动滚动
      let time = setInterval(()=>{
        if(this.count == 4){
          this.count = 0;
          this.swipeNext();
          return;
        }
        this.count++;
      },1000)
      this.$once("hook:beforeDestroy", ()=>{
        clearInterval(time);
        window.removeEventListener('resize', this.windowSizeChange)
      })
    })
  },
  methods:{
    onBannerDown(e){
      e.preventDefault();
      if(this.bannerInfo.transition) return;
      let start = e.clientX || (e.changedTouches && e.changedTouches[0].clientX)
      this.bannerInfo.active = true;
      this.bannerInfo.startTime = Date.now();
      this.bannerInfo.start = start;
    },
    onBannerUp(e){
      e.preventDefault();
      if(!this.bannerInfo.active) return;
      const endTime = Date.now();
      this.bannerInfo.active = false;
      const winWidth = e.currentTarget.clientWidth;
      let isSuc = false;
      
      if (winWidth / 3 < Math.abs(this.bannerInfo.move)){
          isSuc = true;
      } else {
        // 计算速度 px/ms
        const v = this.bannerInfo.move / (this.bannerInfo.startTime - endTime);
        if(v > 1){
          isSuc = true;
        }
      }
      if(this.list.length > 1 && isSuc ) {
        // 切换至上一张图
        if (this.bannerInfo.move > 0) {
          this.bannerInfo.x += winWidth;
          this.count = 0;
          if (this.currentIndex !== 0) {
            this.currentIndex --;
          } else {
            this.currentIndex = this.list.length - 1;
          }
        // 切换至下一张图
        } else {
          this.bannerInfo.x += -1 * winWidth;
          this.count = 0;
          if (this.currentIndex !== this.list.length-1){
            this.currentIndex ++;
          } else {
            this.currentIndex = 0;
          }
        }
      } else {
        let link = this.list[this.currentIndex].link;
        // 判断是否触发点击事件
        if(link && Date.now() - this.bannerInfo.startTime < 400 && Math.abs(this.bannerInfo.move) < 10){
          window.open(link, '_blank')
        }
      }
      this.bannerInfo.startTime = 0;
      this.bannerInfo.move = 0;
      this.bannerInfo.start = 0;
      this.setSwiperMoving();
    },
    onBannerMove(e){
      e.preventDefault();
      if(!this.bannerInfo.active) return;
      this.count = 0;
      let move = (e.clientX || (e.changedTouches && e.changedTouches[0].clientX)) - this.bannerInfo.start;
      this.bannerInfo.move = move;
    },
    setSwiperMoving(){
      this.bannerInfo.transition = true;
      setTimeout(()=>{
        this.bannerInfo.transition = false;
        this.recoverPosition();
        this.$emit('changed', this.currentIndex)
      },500)
    },
    // 是否需要复原位置
    recoverPosition(){
      const lng = this.bannerList.length;
      if(this.list.length <= 1) return;
      if(this.bannerInfo.x === 0) {
        this.bannerInfo.x = this.bannerInfo.width * (lng - 2) * -1;
        return;
      }
      if(this.bannerInfo.x === this.bannerInfo.width * (lng - 1) * -1 ){
        this.bannerInfo.x = this.bannerInfo.width * -1;
      }
    },
    // 下一个
    swipeNext(){
      const width = this.$refs.swiperDom.clientWidth;
      if (width) {
        this.bannerInfo.width = width;
      }
      if(this.currentIndex < this.list.length - 1){
        this.currentIndex ++;
      } else {
        this.currentIndex = 0;
      }
      this.count = 0;
      this.bannerInfo.x = this.bannerInfo.x - this.bannerInfo.width;
      this.setSwiperMoving();
    },
    // 点击页数按钮
    swipeChange(index){
      if(this.currentIndex == index) return;
      this.currentIndex = index;
      this.setSwiperMoving();
      this.count = 0;
      this.bannerInfo.x = (this.currentIndex + 1) * -this.bannerInfo.width;
    },
    windowSizeChange(){
      if(this.bannerList.length <= 1) return;
      this.count = 0;
      const width = this.$refs.swiperDom.clientWidth;
      if (!width || width === this.bannerInfo.width) return
      this.bannerInfo.width = width;
      this.bannerInfo.x = (this.currentIndex + 1) * -width;
    }
  },
  render(h){
    return h(
      'div',
      { class: 'owl-swiper', ref: 'swiperDom' },
      [
        h( 
          'div',
          {
            class: 'owl-swiper-wrap',
            on:{
              '!mousedown': this.onBannerDown,
              '!touchstart': this.onBannerDown,
              '!mouseup': this.onBannerUp,
              '!touchend': this.onBannerUp,
              '!mouseout': this.onBannerUp,
              '!mousemove': this.onBannerMove,
              '!touchmove': this.onBannerMove
            },
            style: {
              transform: `translate3d(${this.bannerInfo.x + this.bannerInfo.move}px,0,0)`,
              transition: this.bannerInfo.transition && 'transform .5s ease'
            }
          },
          this.bannerList.map((item, index) => h(
            'div',{
              class: 'owl-swiper-slide',
              key: index,
            },
            [
              h('div', {class: 'owl-picture-wrap'}, [
                h('img', {
                  class: ['owl-banner-bgm', this.objectFit], 
                  attrs: {
                    alt: 'picture',
                    src: item.path,
                    loading: 'lazy'
                  }
                }),
              ])
            ]
          ))
        ),
        h(
          'div', {class: 'owl-pagination-wrap'}, this.list.map((_, index) => h(
            'div', {
              class: ['owl-pagination', this.currentIndex == index && 'active'],
              key: index,
              on: {
                click: ()=> this.swipeChange(index)
              },
            },
            [ h('div', { class: 'owl-progress', style: `transform: scaleX(${this.currentIndex == index ? 1: 0}); transform-origin: 0% 50%;`}) ]
          ))
        )
      ]
    )
  }
}