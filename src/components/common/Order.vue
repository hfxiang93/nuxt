<template>
  <div class="order-box">
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
      orderData: [],
    }
  },
  watch: {
    chartData: {
      immediate: true,
      handler(val) {
        this.orderData = val
      },
    },
  },
  mounted() {
    this.chart = new G2.Chart({
      container: this.typeId,
      forceFit: true,
      height: 250,
      padding: 20,
    })
    this.typeDraw()
  },
  methods: {
    typeDraw() {
      this.chart.source(this.orderData, {
        time: {
          type: 'linear',
          tickInterval: 1,
        },
      })
      this.chart.tooltip({
        crosshairs: {
          type: 'line',
        },
      })
      this.chart.areaStack().position('time*订单数')
      this.chart.lineStack().position('time*订单数')
      this.chart.render()
    },
  },
}
</script>
<style lang="less" scoped>
.order-box {
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
