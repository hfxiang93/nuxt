<template>
  <div class="sex-box">
    <h1 class="title">
      {{ headTitle }}
    </h1>
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
      sexData: [],
    }
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   handler(val) {
    //     this.sexData = val
    //     // if(val.length>0){
    //       this.typeDraw()
    //     // }
    //   },
    // },
    chartData(val) {
      this.sexData = val
      this.typeDraw()
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
      if (this.sexData.length > 0) {
        const ds = new DataSet()
        const dv = ds.createView().source(this.sexData)
        this.chart.source(dv)
        this.chart.tooltip(false)
        this.chart.legend({
          position: 'bottom-center',
          offsetY: -20,
        })
        this.chart.coord('theta', {
          radius: 0.75,
          innerRadius: 0.6,
        })
        this.chart
          .intervalStack()
          .position('percent')
          .color('type', this.color)
          .opacity(1)
          .label('percent', {
            offset: -5,
            textStyle: {
              fill: 'white',
              fontSize: 12,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)',
            },
            rotate: 0,
            autoRotate: false,
            formatter: function formatter(text, item) {
              return String(parseInt(item.point.percent * 100)) + '%'
            },
          })
        this.chart.render()
      }
      if (this.sexData.length === 0) {
        this.chart.changeData()
        this.chart.clear()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.sex-box {
  position: relative;
  // width: 100%;
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
