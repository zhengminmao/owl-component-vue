import { throttleFunc } from '../_util';
import './style/index.less'
export default {
  name: 'OwlSwiper',
  props:{
    autoplay: {
      type: Boolean,
      default: false,
    },
    showdots: {
      type: Boolean,
      default: false,
    },
    interval: {
      type: Number,
      default: 4000
    },
    defaultIndex: {
      type: Number,
      default: 0
    }
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
        oldX: 0,
        width: 0,
      },
      currentIndex: -1, // 当前banner
      count: 0,  // count等于4下一张
      listLng: 0,
      bannerList: []
    }
  },
  computed: {
    paginations(){
      return new Array(this.listLng).fill(0)
    }
  },
  watch: {
    autoplay(val){
      val? this.setAutoPlay(): this.time && clearInterval(this.time)
    },
    interval(){
      if(!this.autoplay) return;
      this.time && clearInterval(this.time)
      this.setAutoPlay()
    },
    defaultIndex(val){
      val < this.listLng && this.swipeChange(val)
    },
  },
  created(){
    this.onBannerMove = throttleFunc(this.onBannerMove)
    this.listLng = this.$slots.default.length;
    Object.defineProperty(this, 'time', {
      configurable: false,
      value: undefined,
      writable: true,
    })
    // 自动滚动
    this.autoplay && this.setAutoPlay()
  },
  mounted(){
    this.$nextTick(()=>{
      this.currentIndex = this.defaultIndex < this.listLng? this.defaultIndex: 0;
      const width = this.$refs.swiperDom && this.$refs.swiperDom.clientWidth;
      if (!width) return;
      
      this.bannerInfo.width = width;
      window && window.addEventListener('resize', this.windowSizeChange);
      if(this.listLng <= 1) {
        // 如果小于1张
        this.count = 4;
        return;
      }
      this.bannerInfo.x = (this.currentIndex + 1) * -this.bannerInfo.width;
      this.$once("hook:beforeDestroy", ()=>{
        this.time && clearInterval(this.time);
        window && window.removeEventListener('resize', this.windowSizeChange)
      })
    })
  },
  methods:{
    addList(vNodes){
      let lng = vNodes.length
      this.listLng = lng;
      if(lng <= 1) return vNodes;
      return ([vNodes[lng-1]].concat(vNodes, vNodes[0])).map((item, index) => {
        const newItem = Object.create(null)
        for(let key in item){
          newItem[key] = item[key]
          if(key === 'key'){
            newItem[key] = index;
          }
        }
        return newItem;
      })
    },
    setAutoPlay(){
      this.time = setInterval(()=>{
        if(this.count == 4){
          this.count = 0;
          this.swipeNext();
          return;
        }
        this.count++;
      },this.interval / 4)
    },
    onBannerDown(e){
      if(this.clearAnimateFunc) {
        this.clearAnimateFunc();
        this.clearAnimateFunc = undefined;
      } else {
        this.bannerInfo.oldX = this.bannerInfo.x;
      }
      let start = e.clientX || (e.changedTouches && e.changedTouches[0].clientX)
      this.bannerInfo.active = true;
      this.bannerInfo.startTime = Date.now();
      this.bannerInfo.start = start;
    },
    onBannerUp(e){
      if(!this.bannerInfo.active) return;
      const endTime = Date.now();
      this.bannerInfo.active = false;
      const winWidth = e.currentTarget.clientWidth;
      let isSuc = false;

      if ( winWidth / 3 < Math.abs(this.bannerInfo.move) ){
        isSuc = true;
      } else if(this.bannerInfo.move / (this.bannerInfo.startTime - endTime) > 1){
        // 计算速度 px/ms
        isSuc = true;
      }
      let cur = (this.bannerInfo.x += this.bannerInfo.move);
      let to = Math.round(this.bannerInfo.x / winWidth) * winWidth;
      
      if(this.listLng > 1 && isSuc ) {
        // 切换至上一张图
        if (this.bannerInfo.move > 0) {
          to = this.bannerInfo.oldX + winWidth
        // 切换至下一张图
        } else {
          to = this.bannerInfo.oldX - winWidth
        }
      } else {
        if(this.listLng < 1) to = 0;
        // let link = this.list[this.currentIndex].link;
        // 判断是否触发点击事件
        // if(link && Date.now() - this.bannerInfo.startTime < 400 && Math.abs(this.bannerInfo.move) < 10){
        //   window.open(link, '_blank')
        // }
      }
      this.setAnimationPos(cur, to)

      this.count = 0;
      this.bannerInfo.startTime = 0;
      this.bannerInfo.move = 0;
      this.bannerInfo.start = 0;
    },
    onBannerMove(e){
      if(!this.bannerInfo.active) return;
      this.count = 0;
      let move = (e.clientX || (e.changedTouches && e.changedTouches[0].clientX)) - this.bannerInfo.start;
      this.bannerInfo.move = move;
    },
    // 是否需要复原位置
    recoverPosition(){
      let lng = this.listLng;
      if(this.listLng <= 1) return 0;
      lng += 2;
      if(this.bannerInfo.x === 0) {
        this.bannerInfo.x = this.bannerInfo.width * (lng - 2) * -1;
        return this.listLng - 1;
      }
      if(this.bannerInfo.x === this.bannerInfo.width * (lng - 1) * -1 ){
        this.bannerInfo.x = this.bannerInfo.width * -1;
        return 0;
      }
      return Math.abs(this.bannerInfo.x / this.bannerInfo.width) - 1
    },
    // 下一个
    swipeNext(){
      console.log(this.$refs.swiperDom)
      const width = this.$refs.swiperDom && this.$refs.swiperDom.clientWidth;
      if (width) {
        this.bannerInfo.width = width;
      }
      this.count = 0;
      this.setAnimationPos(this.bannerInfo.x, this.bannerInfo.x - this.bannerInfo.width)
    },
    // 点击页数按钮
    swipeChange(index){
      if(this.currentIndex == index) return;
      this.currentIndex = index;
      this.count = 0;
      this.setAnimationPos(this.bannerInfo.x, (this.currentIndex + 1) * -this.bannerInfo.width)
      this.bannerInfo.x = (this.currentIndex + 1) * -this.bannerInfo.width;
    },
    windowSizeChange(){
      if(this.listLng <= 1) return;
      this.count = 0;
      const width = this.$refs.swiperDom && this.$refs.swiperDom.clientWidth;
      if (!width || width === this.bannerInfo.width) return
      this.bannerInfo.width = width;
      this.bannerInfo.x = (this.currentIndex + 1) * -width;
    },
    setAnimationPos(cur, to){
      const clearAnimateFunc = this.animateTo(cur, to, 300, ()=>{
        this.clearAnimateFunc = undefined;
        this.currentIndex = this.recoverPosition()
        this.$emit('changed', this.currentIndex);
      })
      !this.clearAnimateFunc ? Object.defineProperty(this, 'clearAnimateFunc', {
        value: clearAnimateFunc,
        configurable: false,
        writable: true
      }) : (this.clearAnimateFunc = clearAnimateFunc);
    },
    // times 毫秒
    animateTo(from, to, times, finished){
      let that = this;
      let dis = to - from;
      let disPerMs = dis/times;
      let first = 0, stop = false;
      function animate(s){
        if(stop) return finished && finished();
        if(first === 0) first = s;
        if(s - first >= times) {
          that.bannerInfo.x = to;
          return finished && finished();
        } else {
          that.bannerInfo.x = from +( s - first ) * disPerMs;
          window && window.requestAnimationFrame(animate)
        }
      }
      window && window.requestAnimationFrame(animate)
      return function() {
        stop = true;
      }
    }
  },
  render(h){
    const vNodes = this.$slots.default;
    const lng = vNodes.length
    if(this.listLng !== lng){
      this.listLng = lng;
    }
    const paginations = new Array(lng).fill(0)
    const bannerList = vNodes.length <= 1?vNodes :([vNodes[lng-1]].concat(vNodes, vNodes[0])).map((item, index) => {
      const newItem = Object.create(null)
      for(let key in item){
        newItem[key] = item[key]
        if(key === 'key'){
          newItem[key] =  this.listLng+'-'+index;
        }
      }
      return newItem;
    })
    return h(
      'div',
      { class: 'owl-swiper', ref: 'swiperDom' },
      [
        h( 
          'div',
          {
            class: 'owl-swiper-wrap',
            on:{
              'mousedown': this.onBannerDown,
              'touchstart': this.onBannerDown,
              'mouseup': this.onBannerUp,
              'touchend': this.onBannerUp,
              'mouseout': this.onBannerUp,
              'mousemove': this.onBannerMove,
              'touchmove': this.onBannerMove
            },
            style: {
              transform: `translate3d(${this.bannerInfo.x + this.bannerInfo.move}px,0,0)`,
            }
          },
          bannerList
        ),
        this.showdots ? h(
          'div', {class: 'owl-pagination-wrap'}, paginations.map((_, index) => h(
            'div', {
              class: ['owl-pagination', this.currentIndex == index && 'active'],
              key: index,
              on: {
                click: ()=> this.swipeChange(index)
              },
            },
            [ h('div', { class: 'owl-progress', style: `transform: scaleX(${this.currentIndex == index ? 1: 0}); transform-origin: 0% 50%;`}) ]
          ))
        ): ''
      ]
    )
  }
}
