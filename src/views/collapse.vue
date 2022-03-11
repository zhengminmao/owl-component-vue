<template>
  <div class="collapse-page">
    <h2>Collapse 手风琴</h2>
    <h3>基础用法</h3>
    <owl-code-example :code="code" >
      <owl-collapse v-model="active">
        <owl-collapse-panel value="value1" header="手风琴1">
        </owl-collapse-panel>
        <owl-collapse-panel value="value2" header="手风琴2">
        </owl-collapse-panel>
      </owl-collapse>
    </owl-code-example>
    <h3>设置默认展开项</h3>
    <owl-code-example :code="code1" >
      <owl-collapse v-model="active1">
        <owl-collapse-panel value="value1" header="我该如何报名？">
          <p  style="margin: 0; font-size: 14px;">您可到英國學校列表和澳洲學校列表選擇心儀的學校，然後按立刻申請按鈕。或者您心目中已有目標的學校，可直接進入申請系統報名。</p>
        </owl-collapse-panel>
        <owl-collapse-panel value="value2" header="申请流程是怎么样的？">
          <p  style="margin: 0; font-size: 14px;">進入申請系統報名-->資料無誤後我們將送出申請-->等待學校批審結果-->獲得學校錄取-->支付留位費-->學校發出學位確認書(COE)-->申請簽證-->開始升學之旅</p>
        </owl-collapse-panel>
        <owl-collapse-panel value="value3" header="什么时候知道结果？">
          <p style="margin: 0; font-size: 14px;">一般而言，您將會在兩至三星期內收到由院校發出的申請結果通知，具體時間將視乎情況而定。請定期登入以下申請系統查詢狀態。</p>
        </owl-collapse-panel>
      </owl-collapse>
    </owl-code-example>
    <h3>Collapse Props</h3>
    <owl-table :data="propsCol" :columns="collapseCol" />
    <h3>Collapse Panel Props</h3>
    <owl-table :data="propsPanel" :columns="panelCol" />
  </div>
</template>

<script>
export default {
  data(){
    return {
      active: [],
      active1: ['value1'],
      code: `&lt;template&gt;
  <owl-collapse >
    <owl-collapse-panel value="value1" header="手风琴1">
    </owl-collapse-panel>
    <owl-collapse-panel value="value2" header="手风琴2">
    </owl-collapse-panel>
  </owl-collapse>
&lt;/template&gt;
`,
      code1:`&lt;template&gt;
  <owl-collapse v-model="active1">
    <owl-collapse-panel value="value1" header="我该如何报名？">
      <p  style="margin: 0;font-size: 14px;">您可到英國學校列表和澳洲學校列表選擇心儀的學校，然後按立刻申請按鈕。或者您心目中已有目標的學校，可直接進入申請系統報名。</p>
    </owl-collapse-panel>
    <owl-collapse-panel value="value2" header="申请流程是怎么样的？">
      <p  style="margin: 0;font-size: 14px;">進入申請系統報名-->資料無誤後我們將送出申請-->等待學校批審結果-->獲得學校錄取-->支付留位費-->學校發出學位確認書(COE)-->申請簽證-->開始升學之旅</p>
    </owl-collapse-panel>
    <owl-collapse-panel value="value3" header="什么时候知道结果？">
      <p style="margin: 0;font-size: 14px;">一般而言，您將會在兩至三星期內收到由院校發出的申請結果通知，具體時間將視乎情況而定。請定期登入以下申請系統查詢狀態。</p>
    </owl-collapse-panel>
  </owl-collapse>
&lt;/template&gt;
&lt;script&gt;
  export default {
    data(){
      return {
        active1: ['value1'],
      }
    }
  }
&lt;/script&gt;
      `,
      collapseCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '默认值', key: 'default'},
        {title: '说明', key: 'introduce'},
      ],
      propsCol: [
        {name: 'expand', types: 'Boolean', default: 'false', introduce: '是否展开全部'},
        {name: 'value/v-model', types: 'string', default: '[]', introduce: '当前值'},
      ],
      panelCol: [
        {title: '名称', key: 'name'},
        {title: '类型', key: 'types'},
        {title: '说明', key: 'introduce'},
      ],
      propsPanel: [
        {name: 'header', types: 'String', default: '', introduce: '面板标题'},
        {name: 'value', types: 'string', default: '', introduce: '当前面板的唯一标识，必填'},
      ],
    }
  }
}
</script>

<style lang="less">
  .collapse-page{

  }
</style>