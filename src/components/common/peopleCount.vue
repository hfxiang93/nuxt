<template>
  <div class="people-box">
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
      peopleData: [],
    }
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   handler(val) {
    //     this.peopleData = val
    //   },
    // },
    chartData(val) {
      this.peopleData = val
      this.typeDraw()
    },
  },
  mounted() {
    this.chart = new G2.Chart({
      container: this.typeId,
      forceFit: true,
      height: 250,
      padding: [20, 20, 60, 40],
    })
    this.typeDraw()
  },
  methods: {
    typeDraw() {
      if (this.peopleData.length > 0) {
        const ds = new DataSet()
        const dv = ds
          .createView()
          .source(this.peopleData)
          .transform({
            type: 'fold',
            fields: this.fields,
            key: 'type',
            value: 'value',
          })
        // this.chart.source(this.peopleData);
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
        })
        this.chart
          .area()
          .position('time*value')
          .color('type')
          .shape('smooth')
        this.chart
          .line()
          .position('time*value')
          .color('type')
          .size(2)
          .shape('smooth')
        this.chart.render()
      }
      if (this.peopleData.length === 0) {
        // this.chart.changeData()
        this.chart.clear()
      }
    },
  },
}
</script>
<style lang="less" scoped>
.people-box {
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
