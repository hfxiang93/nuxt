<template>
  <div class="age-box">
    <h1>{{ headTitle }}</h1>
    <i class="el-icon-download download"></i>
    <div :id="typeId"></div>
  </div>
</template>
<script>
import G2 from '@antv/g2'
import {DataSet} from '@antv/data-set'

export default {
  props: {
    typeId: {
      type: String,
      default: '',
    },
    chartData: {
      type: Array,
      default: () => {
        return []
      },
    },
    color: {
      type: Array,
      default: () => {
        return []
      },
    },
    headTitle: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      chart: null,
      typeData: [],
    }
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   handler(val) {
    //     console.log(val,'val')
    //     this.typeData = val
    //     if(val.length>0){
    //       this.typeDraw()
    //     }
    //   },
    // },
    chartData(val) {
      this.typeData = val
      this.typeDraw()
    },
  },
  mounted() {
    this.chart = new G2.Chart({
      container: this.typeId,
      forceFit: true,
      height: 250,
      padding: [28, 28, 60, 50],
    })
    this.typeDraw()
  },
  methods: {
    typeDraw() {
      if (this.typeData.length > 0 && this.fields.length > 0) {
        const ds = new DataSet()
        const dv = ds
          .createView()
          .source(this.typeData)
          .transform({
            type: 'fold',
            fields: this.fields, // 展开字段集
            key: '年龄', // key字段
            value: '人数', // value字段
          })
        this.chart.source(dv)
        this.chart
          .intervalStack()
          .position('年龄*人数')
          .color('name', this.color)
        this.chart.render()
      }
      if (this.typeData.length === 0) {
        // this.chart.changeData()
        this.chart.clear()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.age-box {
  position: relative;
  background: #fff;
  padding: 20px;

  h1 {
    font-size: 16px;
  }

  .download {
    font-size: 16px;
    cursor: pointer;
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
