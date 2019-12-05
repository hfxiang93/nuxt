<template>
  <div class="sevice-box">
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
  },
  data() {
    return {
      chart: null,
      seviceData: [],
    }
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   handler(val) {
    //     this.seviceData = val
    //   },
    // },
    chartData(val) {
      this.seviceData = val
      this.typeDraw()
    },
  },
  mounted() {
    this.chart = new G2.Chart({
      container: this.typeId,
      forceFit: true,
      height: 250,
      padding: [20, 20, 80, 72],
    })
    this.typeDraw()
  },
  methods: {
    typeDraw() {
      if (this.seviceData.length > 0) {
        const ds = new DataSet()
        const dv = ds
          .createView()
          .source(this.seviceData)
          .transform({
            type: 'fold',
            fields: ['男', '女'], // 展开字段集
            key: '性别', // key字段
            value: '人口数量', // value字段
            retains: ['State'], // 保留字段集，默认为除fields以外的所有字段
          })
        this.chart.source(dv)
        this.chart.coord().transpose()
        this.chart.axis('State', {
          label: {
            offset: 12,
          },
        })
        this.chart
          .intervalStack()
          .position('State*人口数量')
          .color('性别', this.color)
        this.chart.render()
      }
      if (this.seviceData.length === 0) {
        this.chart.changeData()
        this.chart.clear()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.sevice-box {
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
