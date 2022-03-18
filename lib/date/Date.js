import './style/index.less'
import '../select/style/index.less'
import { OwlSelectCover } from '../select/Select.js'
import { getOffset } from '../_util/index.js'
import dayjs from 'dayjs'
export default {
  name: 'OwlDate',
  model: {
    prop: 'value',
    event: 'change' 
  },
  components: {
    OwlSelectCover,
  },
  props: {
    value: String,
    placeholder: String,
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    quicklyChoose: Array,
    size: {
      default: 'default',
      validator(val){
        return ['large','default','small'].indexOf(val) !== -1;
      }
    }
  },
  data(){
    return {
      filterVal: '',
      visible: false,
      listTop: 0,
      listLeft: 0,
      dates: new Array(42).fill(0),
      getDatesKey:'',
      weeks: ['Sun.', 'Mon.', 'Tues.', 'Wed.', 'Thur.', 'Fri.', 'Sat.'],
      months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      years: [],
      weeksNum: [0,1,2,3,4,5,6],
      currentYear: 2000,
      currentMonth: 1,
      currentDate: 1,
      today: 1,
      currentShow: 'date', // date, month, year 当前默认显示日期选择
    }
  },
  mounted(){
    this.getListPos();
    window.addEventListener('resize',this.onWinResize)
    this.$once("hook:beforeDestroy", ()=>{
      window.removeEventListener('resize', this.onWinResize)
    })
    const hasVal = this.value && dayjs(this.value).isValid();
    const hadDayjs = hasVal ? dayjs(this.value) : null;
    const newDayjs = dayjs()
    this.currentYear = hadDayjs? hadDayjs.get('year') : newDayjs.get('year')
    this.currentMonth = (hadDayjs ? hadDayjs.get('month') : newDayjs.get('month')) + 1;
    this.today = newDayjs.format('YYYY-MM-DD');
    const str = `${this.currentYear}-${this.currentMonth}-01`
    if (hasVal) {
      this.currentDate = hadDayjs.get('date');
      this.filterVal = hadDayjs.format(this.format)
    }
    this.getDates(str)
  },
  methods:{
    onWinResize(){
      this.getListPos();
    },
    clearValue(e){
      e && e.stopPropagation();
      this.$emit('change','')
      this.filterVal = '';
      this.visible = false;
    },
    onBlur(){
      if(!this.filterVal) {
        this.$emit('change','')
        return false;
      }
      const newDayjs = dayjs(this.filterVal)
      if(!newDayjs.isValid()){
        if(this.value) this.filterVal = this.value
        return false;
      }
      const d = newDayjs.get('date');
      const m = newDayjs.get('month')+1;
      const y = newDayjs.get('year');
      this.setDate(d,m,y)
    },
    close(){
      this.visible = false;
    },
    // 点击日期下拉
    dateWrapClick(e){
      e && e.stopPropagation()
      this.getListPos();
      const dom = e.currentTarget.querySelector('input')
      this.visible = true;

      this.recoverByValue()
      dom && dom.focus();
    },
    getListPos(){
      const dom = this.$refs.selectWrapDom;
      const domOffset = getOffset(dom)
      this.listTop = domOffset.offsetTop + dom.clientHeight + 8;
      this.listLeft = domOffset.offsetLeft
    },
    // 渲染dates数组 str:某月的第一天
    getDates(str){
      if(this.getDatesKey === str){
        return;
      }
      this.getDatesKey = str;
      let arr = [];
      const firstDate = dayjs(str);
      const firstDay = firstDate.get('day');
      let prefixNum = this.weeksNum.indexOf(firstDay);
      prefixNum === 0 && (prefixNum = 7)
      const bMonth = firstDate.subtract(24,'hour').get('month') + 1
      const aMonth = firstDate.add(1,'month').get('month') + 1
      const bYear = firstDate.subtract(24,'hour').get('year')
      const aYear = firstDate.add(1,'month').get('year')
      while(prefixNum > 0){
        arr.push({
          v: firstDate.subtract(24 * prefixNum, 'hour').get('date'),
          a: 0,
          m: bMonth,
          y: bYear
        })
        prefixNum--;
      }
      const lastDay = firstDate.add(1, 'month').subtract(24, 'hour').get('date');
      let i = 0;
      while(i < lastDay){
        arr.push({
          v: ++i,
          a: 1,
          m: firstDate.get('month') + 1,
          y: firstDate.get('year')
        });
      }
      i = 0;
      while(arr.length < 42 ){
        arr.push({
          v: ++i,
          a: 0,
          m: aMonth,
          y: aYear,
        })
      }
      this.dates = arr;
    },
    // 赋值给value，重新赋值dates数组
    setDate(d, m, y){
      this.currentDate = d;
      this.currentMonth = m;
      this.currentYear = y;
      const str = `${y}-${m < 10 ? '0'+m: m}-${d < 10? '0'+d : d}`;
      this.getDates(`${y}-${m < 10 ? '0'+m: m}-01`);
      this.$nextTick(()=>{
        this.filterVal = dayjs(str).format(this.format);
        this.$emit('change', dayjs(str).format(this.valueFormat))
      })
    },
    changeMonth(type){
      if(type === 'prev'){
        if(this.currentMonth === 1){
          this.currentMonth = 12;
          this.currentYear--
        } else {
          this.currentMonth--;
        }
      }
      if(type === 'next'){
        if(this.currentMonth === 12){
          this.currentMonth = 1;
          this.currentYear++;
        } else {
          this.currentMonth++;
        }
      }
      this.getDates(`${this.currentYear}-${this.currentMonth}-01`)
    },
    commonPrev(){
      switch (this.currentShow){
        case 'year': this.setYears(this.years[0] - 12); break;
        case 'month': this.currentYear--; break;
        case 'date': this.changeMonth('prev'); break;
      }
    },
    commonNext(){
      switch (this.currentShow){
        case 'year': this.setYears(this.years[11] + 1); break;
        case 'month': this.currentYear++;  break;
        case 'date': this.changeMonth('next'); break;
      }
    },
    // 复原
    recoverByValue(){
      const curVal = !this.value? dayjs(this.today): dayjs(this.value);
      this.currentMonth = curVal.get('month')+1
      this.currentYear = curVal.get('year')
      this.currentDate = curVal.get('date')
      this.currentShow = 'date'
      this.getDates(`${this.currentYear}-${this.currentMonth}-01`)
    },
    // 点击月份列其中一个月的事件
    onChooseMonth(index){
      this.currentMonth = index + 1;
      this.getDates(`${this.currentYear}-${this.currentMonth}-01`);
      this.currentShow = 'date'
    },
    // 显示年份面板
    showYearPanel(){
      this.setYears(this.currentYear - 6);
      this.currentShow = 'year'
    },
    setYears(startYear){
      let arr = []
      let i = 0;
      while(i < 12){
        arr.push(startYear++)
        i++;
      }
      this.years = arr;
    },
    // 点击年份列其中一个年的事件
    onChooseYear(year){
      this.currentYear = year;
      this.currentShow = 'month'
    },
    onQuiklyClick(val){
      const newdayjs = dayjs(val);
      if(newdayjs.isValid()){
        this.setDate(newdayjs.get('date'), newdayjs.get('month')+1, newdayjs.get('year'))
        this.close()
      }
    }
  },
  render(h){
    let mstr = this.currentMonth < 10 ? '0'+this.currentMonth : this.currentMonth;
    let placeholder = this.value ? '': this.placeholder || '请选择日期 Please pick date'
    const commonTitle =  h('div', {class: 'owl-date-title'}, [
      h('span', {class: 'owlfont owl-arrow-you left', on: {click: this.commonPrev}}),
      h('div', { class: 'title-wrap' }, [
        h('span', {class: 'title', on: {click: this.showYearPanel}}, this.currentYear+'Y'),
        h('span', {class: 'title', on: {click: ()=> this.currentShow = 'month'}}, mstr+'M'),
      ]),
      h('span', {class: 'owlfont owl-arrow-you', on: {click: this.commonNext}}),
    ])
    let OwlWrapChildren = [];
    if(this.currentShow === 'date') {
      OwlWrapChildren = [
        commonTitle,
        h('div', {class: 'owl-date-week date-blc'},
          this.weeks.map(item => h('div', {key:item, class: 'date-itm'}, [h('span', item)]))
        ),
        h('div', {class: 'owl-date-day date-blc'},
          this.dates.map((item,key) => {
            const str = `${item.y}-${item.m < 10 ? '0'+item.m: item.m}-${item.v < 10? '0'+item.v : item.v}`;
            const isActive = dayjs(this.value).format('YYYY-MM-DD') == str;
            return h('div', {
              key, 
              class: ['date-itm', item.a && 'light', str === this.today && 'today', isActive && 'active'],
              on: {
                click:()=> {this.setDate(item.v, item.m, item.y); this.close();}
              }
            }, [h('span', item.v)])
          })
        ),
        this.quicklyChoose && this.quicklyChoose.length 
          ? h('div', {class: 'owl-date-quickly'}, [
            this.quicklyChoose.map((item, key) => h('div', {
              key, 
              class: 'owl-date-quickly-item',
              on: {click: () => this.onQuiklyClick(item.value)},
            }, item.label))
          ])
          : '',
      ]
    }
    if(this.currentShow === 'month'){
      OwlWrapChildren = [
        commonTitle,
        h('div', {class: 'owl-week-wrap'}, [
          this.months.map((item, index) => {
            return h('div', {key: item, class: 'owl-week-item', on: {click: ()=>this.onChooseMonth(index)}}, item)
          })
        ])
      ]
    }
    if(this.currentShow === 'year'){
      OwlWrapChildren = [
        commonTitle,
        h('div', {class: 'owl-week-wrap'}, [
          this.years.map((item, index) => {
            return h('div', {key: index, class: 'owl-week-item', on: {click: ()=>this.onChooseYear(item)}}, item)
          })
        ])
      ]
    }
    const OwlWrap = h('div', {
      class: 'owl-date-wrap', 
      style: { left: this.listLeft +'px', top: this.listTop + 'px', width: '304px' },
      on: {'click': e=> e.stopPropagation()}
    }, OwlWrapChildren)

    return h('div', {
      class: ['owl-date owl-select', 'owl-'+this.size], 
      on: {click: this.dateWrapClick},
      ref: 'selectWrapDom'
    }, [
      h('div', {class: ['owl-select-wrap', this.visible && 'active', this.value && 'clear']}, [
        h('div', {class: ['owl-select-plchld']}, placeholder),
        h('input', {
          class: 'owl-select-npt',
          domProps:{
            value: this.filterVal,
          },
          on: {
            input: e => this.filterVal = e.target.value,
            blur: this.onBlur,
            keyup: e=> (e.keyCode == 13 && this.onBlur(), this.close())
          }
        }),
        h('span', {
          class: 'suffix-icon owl-date-icon owlfont',
        }),
        h('span', {
          class: 'suffix-icon owl-close owlfont', 
          on: {
            click: this.clearValue
          }
        })
      ]),
      h('owl-select-cover', {props: {visible: this.visible}, on: {change: this.close}}, [OwlWrap])
    ])
  }
}