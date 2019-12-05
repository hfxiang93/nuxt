<template>
  <div class="container">
    <!-- <h1>其他报表</h1> -->
    <div class="top-header">
      <div class="time">
        <el-date-picker
          v-model="value6"
          type="year"
          placeholder="选择年"
          @change="updateData"
        >
        </el-date-picker>
      </div>
    </div>
    <div class="table">
      <h1>节日客流</h1>
      <el-data-table
        ref="dataTable"
        :url="url"
        :columns="columns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="false"
        :data-path="dataPath"
      />
    </div>
    <div class="compare-content">
      <div class="compare-box">
        <!-- 往年同期节假日日均客流 -->
        <PeopleCount
          :type-id="dayID"
          :head-title="dayTitle"
          :chart-data="dayData"
          :fields="fields"
        />
      </div>
    </div>
    <div class="graph-content">
      <div class="left">
        <!-- 各季度客流 -->
        <AgeCount
          :type-id="flowID"
          :head-title="flowTitle"
          :color="flowColor"
          :chart-data="flowData"
          :fields="flowFields"
        />
      </div>
      <div class="right">
        <!-- 各月份客流 -->
        <AgeCount
          :type-id="monthID"
          :head-title="monthTitle"
          :color="flowColor"
          :chart-data="monthData"
          :fields="monthFields"
        />
      </div>
    </div>
    <div class="graph-content">
      <div class="left">
        <!-- 各月份订单数 -->
        <AgeCount
          :type-id="monthOrderID"
          :head-title="monthOrderTitle"
          :color="flowColor"
          :chart-data="monthOrderData"
          :fields="monthOrderFields"
        />
      </div>
      <div class="right">
        <!-- 销售趋势 -->
        <SaleCount
          :type-id="saleID"
          :head-title="saleTitle"
          :chart-data="saleData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PeopleCount from '@/components/common/peopleCount'
import AgeCount from '@/components/common/AgeCount'
import SaleCount from '@/components/common/SaleCount'
import {
  passengerFlowAnalyse,
  passengerLastFlowAnalyse,
  passengerFlowEveryThreeMonth,
  passengerFlowEveryMonth,
} from '@/const/api'
import {formatDate} from '@/const/filter'
import {monthOrderFields, monthOrderData, saleData} from './const'
import {hasIn} from 'lodash'
export default {
  components: {PeopleCount, AgeCount, SaleCount},
  data() {
    return {
      value6: '2019',
      url: '',
      dataPath: '',
      columns: [
        {prop: 'name', label: '节假日'},
        {prop: 'date', label: '时间'},
        {prop: 'dayAverage', label: '假日日均客流'},
        {prop: 'allNum', label: '假日总客流'},
        {prop: 'lastYearAllNum', label: '去年同期总客流'},
        {
          prop: 'numAddRate',
          label: '客流增长率',
          formatter: row => `${row.numAddRate * 100}%`,
        },
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false,
      // 往年同期节假日日均客流数据
      dayID: 'day',
      dayTitle: '往年同期节假日日均客流',
      fields: [],
      dayData: [],
      // 各季度客流数据
      flowID: 'flow',
      flowTitle: '各季度客流',
      flowColor: ['#ee5858', '#419eff'],
      flowData: [],
      flowFields: [],
      // 各月份客流数据
      monthID: 'month',
      monthTitle: '各月份客流',
      monthData: [],
      monthFields: [],
      // 各月份订单数数据
      monthOrderID: 'month-order',
      monthOrderTitle: '各月份订单数',
      monthOrderFields: [],
      monthOrderData: [],
      // 销售趋势数据
      saleID: 'sale',
      saleTitle: '销售额趋势',
      saleData,
    }
  },
  mounted() {
    this.getPassengerFlowAnalyse()
    this.getPassengerLastFlowAnalyse()
    this.getPassengerFlowEveryThreeMonth()
    this.getPassengerFlowEveryMonth()
    this.getEveryMonthOrder()
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/Analysis/PassengerFlowStatistics'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getPassengerFlowAnalyse()
          this.getPassengerLastFlowAnalyse()
          this.getPassengerFlowEveryThreeMonth()
          this.getPassengerFlowEveryMonth()
          this.getEveryMonthOrder()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/Analysis/PassengerFlowStatistics'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getPassengerFlowAnalyse()
          this.getPassengerLastFlowAnalyse()
          this.getPassengerFlowEveryThreeMonth()
          this.getPassengerFlowEveryMonth()
          this.getEveryMonthOrder()
        }, 0)
      }
    })
  },
  methods: {
    updateData() {
      this.getPassengerFlowAnalyse()
      this.getPassengerLastFlowAnalyse()
      this.getPassengerFlowEveryThreeMonth()
      this.getPassengerFlowEveryMonth()
      this.getEveryMonthOrder()
    },
    // 节假日客流
    getPassengerFlowAnalyse() {
      this.url = `${passengerFlowAnalyse}?year=${formatDate(
        this.value6,
        'YYYY',
      )}`
      this.dataPath = 'payload.list'
      this.$refs.dataTable.getList()
    },
    getPassengerLastFlowAnalyse() {
      this.$axios
        .$get(passengerLastFlowAnalyse, {
          params: {
            year: formatDate(this.value6, 'YYYY'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.fields = data.map(item => {
              return item.name
            })
            let finalData = []
            let holidays = [
              '元旦',
              '春节',
              '清明节',
              '劳动节',
              '端午节',
              '中秋节',
              '国庆节',
            ]
            for (let index = 0; index < holidays.length; index++) {
              let obj = {}
              obj.time = holidays[index]
              const ee = data.map(item => {
                return item.name
              })
              const ff = data.map(item => {
                return item.list.filter(dd => dd.name === holidays[index])
              })
              for (let h = 0; h < ee.length; h++) {
                for (let g = 0; g < ff.length; g++) {
                  if (h === g) {
                    obj[ee[h]] = ff[g].length ? parseInt(ff[g][0].value) : 0
                  }
                }
              }
              finalData.push(obj)
            }
            this.dayData = finalData
          }
        })
    },
    // 各季度客流
    getPassengerFlowEveryThreeMonth() {
      this.$axios
        .$get(passengerFlowEveryThreeMonth, {
          params: {
            year: formatDate(this.value6, 'YYYY'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.flowFields = data.map(item => {
              return item.name
            })
            let finalData = []
            let femaleObj = {}
            let maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj.name = '女'
              femaleObj[data[index].name] =
                data[index].list && data[index].list.female
                  ? parseInt(data[index].list.female)
                  : 0
              maleObj.name = '男'
              maleObj[data[index].name] =
                data[index].list && data[index].list.male
                  ? parseInt(data[index].list.male)
                  : 0
            }
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.flowData = finalData
          }
        })
    },
    // 各月份客流
    getPassengerFlowEveryMonth() {
      this.$axios
        .$get(passengerFlowEveryMonth, {
          params: {
            year: formatDate(this.value6, 'YYYY'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.monthFields = data.map(item => {
              return item.name
            })
            let finalData = []
            let femaleObj = {}
            let maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj.name = '女'
              femaleObj[data[index].name] =
                data[index].list && data[index].list.female
                  ? parseInt(data[index].list.female)
                  : 0
              maleObj.name = '男'
              maleObj[data[index].name] =
                data[index].list && data[index].list.male
                  ? parseInt(data[index].list.male)
                  : 0
            }
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.monthData = finalData
          }
        })
    },
    getEveryMonthOrder() {
      this.$nextTick(() => {
        this.monthOrderFields = monthOrderFields
        this.monthOrderData = monthOrderData
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .top-header {
    position: relative;

    .time {
      position: absolute;
      right: 10px;
      top: 20px;
    }
  }

  .table {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
  }

  .compare-content {
    margin-top: 20px;

    .compare-box {
      width: 100%;
    }
  }

  .graph-content {
    clear: both;
    margin-top: 20px;
    overflow: hidden;

    .left {
      float: left;
      width: 53%;
    }

    .right {
      width: 45%;
      float: right;
    }
  }
}
</style>
