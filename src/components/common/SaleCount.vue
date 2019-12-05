<template>
  <div class="sale-box">
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
      SaleData: [],
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        this.SaleData = val
      },
    },
  },
  mounted() {
    this.chart = new G2.Chart({
      container: this.typeId,
      forceFit: true,
      height: 250,
      padding: [20, 'auto', 20, 'auto'],
    })
    this.typeDraw()
  },
  methods: {
    typeDraw() {
      const ds = new DataSet()
      const dv = ds
        .createView()
        .source(this.SaleData)
        .transform({
          type: 'fold',
          fields: ['sales'],
          key: 'type',
          value: 'value',
        })
      // this.chart.source(this.SaleData);
      this.chart.source(dv, {
        value: {
          // alias: 'The Share Price in Dollars',
          formatter: function formatter(val) {
            return val
          },
        },
        time: {
          range: [0, 1],
        },
      })
      this.chart.tooltip({
        crosshairs: true,
        trigger: 'axis',
      })
      this.chart
        .area()
        .position('time*value')
        .color('type', ['l(232) 0:#419EFF 1:#0077FF'])
        .shape('line')
      this.chart
        .line()
        .position('time*value')
        .color('type', ['#419EFF'])
        .size(2)
        .shape('line')
      this.chart.render()
    },
  },
}
</script>
<style lang="less" scoped>
.sale-box {
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
