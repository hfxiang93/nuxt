<template>
  <div class="finish-box">
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
    floorCount: {
      type: Number,
      default: 20,
    },
  },
  data() {
    return {
      chart: null,
      finData: [],
    }
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   handler(val) {
    //     this.finData = val
    //   },
    // },
    chartData(val) {
      this.finData = val
      this.typeDraw()
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
      if (this.finData.length > 0) {
        const ds = new DataSet()
        const dv = ds.createView()
        this.chart.source(this.finData)
        this.chart.scale('sales', {
          tickInterval: this.floorCount,
        })
        this.chart.interval().position('time*sales')
        this.chart.render()
      }
      if (this.finData.length === 0) {
        // this.chart.changeData()
        this.chart.clear()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.finish-box {
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
