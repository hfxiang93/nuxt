<template>
  <div class="container">
    <!-- <h1 class="title">日周月报</h1> -->
    <div class="top-header">
      <h2>{{ curMallName || '' }}客流分析</h2>
      <div class="time">
        <el-radio-group
          v-model="type"
          style="margin-bottom: 30px;"
          @change="handleRadioChange"
        >
          <el-radio-button label="date">日</el-radio-button>
          <el-radio-button label="week">周</el-radio-button>
          <el-radio-button label="month">月</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-if="type === 'date' || type === 'month'"
          v-model="value"
          :type="type"
          :value-format="type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM'"
          class="date"
          @change="changeTime"
        ></el-date-picker>
        <el-date-picker
          v-else
          v-model="weekValue"
          :picker-options="{firstDayOfWeek: 1}"
          class="date"
          type="week"
          format="yyyy 第 WW 周"
          @change="changeTime"
        ></el-date-picker>
      </div>
    </div>
    <div class="top-content">
      <div class="left">
        <div v-loading="flowLoading" class="one">
          <div v-for="(item, index) in flowListTop" :key="index">
            <i class="el-icon-info icon day"></i>
            <div>
              <p>{{ item.label }}(人次)</p>
              <h1>{{ item.value || 0 }}</h1>
            </div>
          </div>
        </div>
        <div v-loading="flowLoading" class="two">
          <div
            v-for="(item, index) in flowListBottom"
            :key="index"
            class="first"
          >
            <p>{{ item.label }}(人次)</p>
            <h1>{{ item.value || 0 }}</h1>
          </div>
        </div>
      </div>
      <div v-loading="flowLoading" class="right">
        <!-- 当日与历史同期客流量对比 -->
        <SeviceCount
          :type-id="seviceID"
          :head-title="seviceTitle"
          :color="typeColor"
          :chart-data="seviceData"
        />
      </div>
    </div>
    <div class="rate-content">
      <div v-loading="flowLoading" class="rate-box">
        <!-- 当日与历史同期客流趋势对比 -->
        <PeopleCount
          :type-id="peopleID"
          :head-title="peopleTitle"
          :chart-data="peopleData"
          :fields="fields"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <div class="left">
        <!-- 年龄统计 -->
        <AgeCount
          :type-id="typeID"
          :head-title="typeTitle"
          :color="typeColor"
          :chart-data="typeData"
          :fields="ageFields"
        />
      </div>
      <div class="right">
        <!-- 性别分布 -->
        <SexCount
          :type-id="sexID"
          :head-title="sexTitle"
          :color="typeColor"
          :chart-data="sexData"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <div class="left left-37">
        <!-- 各设备实时客流 Top5 -->
        <SeviceCount
          :type-id="seviceTopID"
          :head-title="seviceTopTitle"
          :color="typeColor"
          :chart-data="seviceTopData"
        />
      </div>
      <div class="right right-61">
        <!-- 区域客流分析 -->
        <AgeCount
          :type-id="gustID"
          :head-title="gustTitle"
          :color="typeColor"
          :chart-data="gustData"
          :fields="gustFields"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <div class="left left-37">
        <!-- 区域日均驻留时长 -->
        <Finish
          :type-id="waitID"
          :head-title="waitTitle"
          :chart-data="waitData"
          :floor-count="waitCount"
        />
      </div>
      <div class="right right-61">
        <!-- 楼层客流分布 -->
        <AgeCount
          :type-id="gustFlowID"
          :head-title="gustFlowTitle"
          :color="typeColor"
          :chart-data="gustFlowData"
          :fields="gustFlowFields"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <h2>运营相关报表</h2>
      <div class="left">
        <!-- 会员成交率 -->
        <Finish
          :type-id="finishID"
          :head-title="finishTitle"
          :chart-data="finishData"
          :floor-count="floorCount"
        />
      </div>
      <div class="right">
        <!-- 会员占比 -->
        <SexCount
          :type-id="memberID"
          :head-title="memberTitle"
          :color="typeVipColor"
          :chart-data="vipData"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <div class="left left-49">
        <!-- 成交率 -->
        <Finish
          :type-id="totalID"
          :head-title="totalTitle"
          :chart-data="finishData"
        />
      </div>
      <div class="right right-49">
        <!-- 订单数 -->
        <SaleCount
          :type-id="orderID"
          :head-title="orderTitle"
          :chart-data="orderData"
        />
      </div>
    </div>
    <div v-loading="flowLoading" class="graph-content">
      <div class="left left-49">
        <!-- 销售额 -->
        <SaleCount
          :type-id="saleID"
          :head-title="saleTitle"
          :chart-data="orderData"
        />
      </div>
      <div class="right right-49">
        <!-- 客单价 -->
        <Finish
          :type-id="priceID"
          :head-title="priceTitle"
          :chart-data="finishData"
        />
      </div>
    </div>
    <!-- 当日各设备客流详情 -->
    <div class="table">
      <h1>当日各设备客流详情</h1>
      <i class="el-icon-download download"></i>
      <!-- <el-data-table
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
      /> -->
      <el-table
        v-loading="flowLoading"
        :data="tableData"
        stripe
        style="width: 100%;"
      >
        <el-table-column prop="name" fixed label="设备名称" width="120">
        </el-table-column>
        <el-table-column prop="time00" label="01时"> </el-table-column>
        <el-table-column prop="time01" label="01时"> </el-table-column>
        <el-table-column prop="time02" label="02时"> </el-table-column>
        <el-table-column prop="time03" label="03时"> </el-table-column>
        <el-table-column prop="time04" label="04时"> </el-table-column>
        <el-table-column prop="time05" label="05时"> </el-table-column>
        <el-table-column prop="time06" label="06时"> </el-table-column>
        <el-table-column prop="time07" label="07时"> </el-table-column>
        <el-table-column prop="time08" label="08时"> </el-table-column>
        <el-table-column prop="time09" label="09时"> </el-table-column>
        <el-table-column prop="time10" label="10时"> </el-table-column>
        <el-table-column prop="time11" label="11时"> </el-table-column>
        <el-table-column prop="time12" label="12时"> </el-table-column>
        <el-table-column prop="time13" label="13时"> </el-table-column>
        <el-table-column prop="time14" label="14时"> </el-table-column>
        <el-table-column prop="time15" label="15时"> </el-table-column>
        <el-table-column prop="time16" label="16时"> </el-table-column>
        <el-table-column prop="time17" label="17时"> </el-table-column>
        <el-table-column prop="time18" label="18时"> </el-table-column>
        <el-table-column prop="time19" label="19时"> </el-table-column>
        <el-table-column prop="time20" label="20时"> </el-table-column>
        <el-table-column prop="time21" label="21时"> </el-table-column>
        <el-table-column prop="time22" label="22时"> </el-table-column>
        <el-table-column prop="time23" label="23时"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import SeviceCount from '@/components/common/SeviceCount'
import AgeCount from '@/components/common/AgeCount'
import PeopleCount from '@/components/common/peopleCount'
import SexCount from '@/components/common/SexCount'
import Finish from '@/components/common/Finish'
import SaleCount from '@/components/common/SaleCount'
import dayjs from 'dayjs'
import {
  passengerFlow,
  dayHistory,
  dayCompare,
  ageAnalyse,
  sexAnalyse,
  topFive,
  areaAnalyse,
  areaTime,
  flowFloor,
  flowDetail,
  passengerFlowWeek,
  passengerFlowDayCompareWeek,
  passengerFlowDayCompareHistoryWeek,
  passengerFlowMonth,
  passengerFlowDayCompareMonth,
  passengerFlowDayCompareHistoryMonth,
} from '@/const/api'
import {hasIn} from 'lodash'
import {formatDate} from '@/const/filter'
import {mapState} from 'vuex'
import {
  finishData,
  vipData,
  memberData,
  orderData,
  deviceColumns,
  DAY_KEY_INFO,
  WEEK_KEY_INFO,
  MONTH_KEY_INFO,
  HISTORY_FLOW,
  HISTORY_TREND,
  TIME,
  WEEK,
  MONTH,
} from './const'

export default {
  components: {
    SeviceCount,
    AgeCount,
    SexCount,
    Finish,
    PeopleCount,
    SaleCount,
  },
  data() {
    return {
      flowLoading: false,
      type: 'date',
      weekValue: new Date(),
      value: dayjs(new Date().getTime()).format('YYYY-MM-DD'),
      // 当日与历史同期客流量对比数据
      seviceID: 'compare',
      seviceTitle: HISTORY_FLOW[0],
      typeColor: ['#ee5858', '#419eff'],
      seviceData: [],
      // 年龄统计数据
      typeID: 'age',
      typeData: [],
      typeTitle: '年龄统计',
      ageFields: [],
      ageType: 0,
      // 性别分布数据
      sexID: 'sex',
      sexTitle: '性别分布',
      sexData: [],
      // 各设备实时客流 Top5数据
      seviceTopID: 'seviceTop',
      seviceTopTitle: '客流排名Top5设备',
      seviceTopData: [],
      // 区域客流分析数据
      gustID: 'gust',
      gustTitle: '各位置客流分析',
      gustFields: [],
      gustData: [],
      // 区域日均驻留时长数据
      waitID: 'wait',
      waitTitle: '区域日均驻留时长',
      waitCount: 10,
      waitData: [],
      // 楼层客流分布数据
      gustFlowID: 'gustFlow',
      gustFlowTitle: '楼层客流分布',
      gustFlowFields: [],
      gustFlowData: [],
      // 会员占比数据
      memberID: 'member',
      memberTitle: '客流分布',
      memberData,
      // 会员成交率数据
      finishID: 'finish',
      floorCount: 20,
      finishTitle: '会员成交率',
      finishData: [],
      // 成交率数据
      totalID: 'total',
      totalTitle: '成交率',
      // 当日与历史同期客流趋势对比数据
      peopleID: 'people',
      peopleTitle: HISTORY_TREND[0],
      fields: [],
      peopleData: [],
      orderData,
      typeVipColor: ['#FFC474', '#6ED8F6'],
      vipData: [],
      // 订单数数据
      orderID: 'order',
      orderTitle: '订单数',
      orderFields: ['人数'],
      // 销售额数据
      saleID: 'sale',
      saleTitle: '销售额',
      // 客单价数据
      priceID: 'price',
      priceTitle: '客单价',
      tableData: [],
      baseInfo: {},
      url: '',
      columns: deviceColumns,
      dataPath: '',
      flowListTop: [],
      flowListBottom: [],
      weekStartTime: '',
      weekEndTime: '',
      curMallName: '',
    }
  },
  computed: {
    // 卖场名称
    // mallName() {
    //   return this.$store.state.mallName
    // },
    ...mapState(['mallName']),
  },
  watch: {
    // 卖场名称，监听数据变化，如果变化了就更新对应视图数据
    mallName(val, oldValue) {
      this.curMallName = val
    },
  },
  created() {
    this.getWeekStartEndDate()
    this.getVipData()
    this.getFinishData()
    this.getInitData(this.ageType)
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/Analysis/DailyWeeklyMonthlyReport'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getVipData()
          this.getFinishData()
          this.getInitData(this.ageType)
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/Analysis/DailyWeeklyMonthlyReport'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getVipData()
          this.getFinishData()
          this.getInitData(this.ageType)
        }, 0)
      }
    })
  },

  methods: {
    // 获取当前时间所在的周一和周末
    getWeekStartEndDate() {
      let now = new Date() //当前日期
      let nowDayOfWeek = now.getDay() //今天本周的第几天
      let nowDay = now.getDate() //当前日
      let nowMonth = now.getMonth() //当前月
      let nowYear = now.getFullYear() //当前年
      let weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
      this.weekStartTime = formatDate(weekStartDate)
      this.weekEndTime = formatDate(
        weekStartDate.getTime() + 6 * 24 * 3600 * 1000,
      )
    },
    //TODO:是否只能选择一周7天的时间
    weekTimeLimit(date) {
      this.weekStartTime = formatDate(date - 24 * 3600 * 1000)
      this.weekEndTime = formatDate(date - -5 * 24 * 3600 * 1000)
    },
    // 选择日周月的时候触发，重新获取当前页面数据
    changeTime(date) {
      if (this.type === 'week') {
        this.weekTimeLimit(date)
      } else {
        this.value = date
      }
      this.getInitData(this.ageType)
    },
    // 格式化日周月报的title
    formateOverview(obj, info) {
      return Object.keys(info).reduce((cur, key) => {
        cur.push({
          label: info[key],
          value: obj !== null ? obj[key] : 0,
        })
        return cur
      }, [])
    },
    // 获取会员数据
    getVipData() {
      this.$nextTick(() => {
        this.vipData = vipData
      })
    },
    getFinishData() {
      this.$nextTick(() => {
        this.finishData = finishData
      })
    },
    // 日报
    getDayInfo() {
      this.flowLoading = true
      this.$axios
        .$get(passengerFlow, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : {}
            this.baseInfo = data
            let aa = this.formateOverview(data, DAY_KEY_INFO)
            this.flowListTop = aa.slice(0, 3)
            this.flowListBottom = aa.slice(3)
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    //当日与历史同期客流量对比
    getDayCompare() {
      this.seviceTitle = HISTORY_FLOW[0]
      this.flowLoading = true
      this.seviceData = []
      this.$axios
        .$get(dayCompare, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : {}
            let finalData = []
            let firstObj = {}
            let secondObj = {}
            let thirdObj = {}
            let fourthObj = {}
            let lastObj = {}
            firstObj.State = '当日客流'
            secondObj.State = '昨日客流'
            thirdObj.State = '上周客流'
            fourthObj.State = '上月客流'
            lastObj.State = '去年客流'
            firstObj['男'] = data.toDayPassengerNum
              ? parseInt(data.toDayPassengerNum.male)
              : 0
            firstObj['女'] = data.toDayPassengerNum
              ? parseInt(data.toDayPassengerNum.female)
              : 0
            secondObj['男'] = data.lastDayPassengerNum
              ? parseInt(data.lastDayPassengerNum.male)
              : 0
            secondObj['女'] = data.lastDayPassengerNum
              ? parseInt(data.lastDayPassengerNum.female)
              : 0
            thirdObj['男'] = data.lastWeekPassengerNum
              ? parseInt(data.lastWeekPassengerNum.male)
              : 0
            thirdObj['女'] = data.lastWeekPassengerNum
              ? parseInt(data.lastWeekPassengerNum.female)
              : 0
            fourthObj['男'] = data.lastMonthPassengerNum
              ? parseInt(data.lastMonthPassengerNum.male)
              : 0
            fourthObj['女'] = data.lastMonthPassengerNum
              ? parseInt(data.lastMonthPassengerNum.female)
              : 0
            lastObj['男'] = data.lastYearPassengerNum
              ? parseInt(data.lastYearPassengerNum.male)
              : 0
            lastObj['女'] = data.lastYearPassengerNum
              ? parseInt(data.lastYearPassengerNum.female)
              : 0
            finalData.push(firstObj)
            finalData.push(secondObj)
            finalData.push(thirdObj)
            finalData.push(fourthObj)
            finalData.push(lastObj)
            this.$nextTick(() => {
              this.seviceData = finalData
            })
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 当日与历史同期客流趋势对比
    getDayHistory() {
      this.flowLoading = true
      this.peopleTitle = HISTORY_TREND[0]
      this.peopleData = []
      this.fields = []
      this.$axios
        .$get(dayHistory, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.fields = data.map(item => {
              return item.name
            })
            const finalData = []
            let aa = TIME
            for (let index = 0; index < aa.length; index++) {
              let obj = {}
              obj.time = aa[index]
              const ee = data.map(item => {
                return item.name
              })
              const ff = data.map(item => {
                return item.list.filter(dd => dd.name === aa[index])
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
            this.peopleData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 年龄统计
    getAgeAnalyse(type) {
      this.flowLoading = true
      this.typeData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(ageAnalyse, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.ageFields = data.map(item => {
              return item.name
            })
            let finalData = []
            const femaleObj = {}
            const maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj[data[index].name] = data[index].female
                ? parseInt(data[index].female)
                : 0
              maleObj[data[index].name] = data[index].male
                ? parseInt(data[index].male)
                : 0
            }
            femaleObj.name = '女'
            maleObj.name = '男'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.typeData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 性别分布
    getSexAnalyse(type) {
      this.flowLoading = true
      this.sexData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(sexAnalyse, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload'], ['data'])
              ? res.payload.data
              : {}
            let femaleObj = {}
            let maleObj = {}
            let finalData = []
            femaleObj.percent =
              data !== null && data.female ? parseFloat(data.female) / 100 : 0
            maleObj.percent =
              data !== null && data.male ? parseFloat(data.male) / 100 : 0
            maleObj.type = '男'
            femaleObj.type = '女'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.sexData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 各设备实时客流 Top5
    /* 后端不传name的话，页面会只显示一条数据，所以后端必须返回设备name*/
    getFlowTopFive(type) {
      this.flowLoading = true
      this.seviceTopData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(topFive, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload'], ['list'])
              ? res.payload.list
              : []
            let finalData = []
            for (let index = 0; index < data.length; index++) {
              let obj = {}
              obj.State = data[index].name
              obj['男'] = parseInt(data[index].male)
              obj['女'] = parseInt(data[index].female)
              finalData.push(obj)
            }
            this.seviceTopData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 区域客流分析
    getAreaAnalyse(type) {
      this.flowLoading = true
      this.gustData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(areaAnalyse, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload'], ['list'])
              ? res.payload.list
              : []
            this.gustFields = data.map(item => {
              return item.name
            })
            let finalData = []
            const femaleObj = {}
            const maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj[data[index].name] = parseInt(data[index].female)
              maleObj[data[index].name] = parseInt(data[index].male)
            }
            femaleObj.name = '女'
            maleObj.name = '男'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.gustData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 区域日均驻留时长
    getAreaTime(type) {
      this.flowLoading = true
      this.waitData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(areaTime, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload'], ['list'])
              ? res.payload.list
              : []
            let finalData = []
            for (let index = 0; index < data.length; index++) {
              let obj = {}
              obj.time = data[index].name
              obj.sales = parseInt(data[index].value)
              finalData.push(obj)
            }
            this.waitData = finalData
          }
        })
    },
    // 楼层客流分布
    getGustFlowFloor(type) {
      this.flowLoading = true
      this.gustFlowData = []
      let finalParams = {
        type,
        dayDate: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.dayDate = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.$axios
        .$get(flowFloor, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', ['list']])
              ? res.payload.list
              : []
            this.gustFlowFields = data.map(item => {
              return item.name
            })
            let finalData = []
            const femaleObj = {}
            const maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj[data[index].name] = parseInt(data[index].female)
              maleObj[data[index].name] = parseInt(data[index].male)
            }
            femaleObj.name = '女'
            maleObj.name = '男'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.gustFlowData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 当日各设备客流详情
    getFlowDetail(type) {
      this.flowLoading = true
      this.tableData = []
      let finalParams = {
        type,
        date: '',
        weekStartDate: '',
        weekEndDate: '',
        monthDate: '',
      }
      if (type == 0) {
        finalParams.date = this.value
      }
      if (type === 1) {
        finalParams.weekStartDate = this.weekStartTime
        finalParams.weekEndDate = this.weekEndTime
      }
      if (type === 2) {
        finalParams.monthDate = this.value
      }
      this.url = flowDetail
      this.$axios
        .$get(flowDetail, {
          params: finalParams,
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload'], ['list'])
              ? res.payload.list
              : []
            const finalData = []
            let aa = TIME
            for (let index = 0; index < data.length; index++) {
              let obj = {}
              obj.name = data[index].name
              let name = data[index].list.map(item => {
                return item.name
              })
              let value = data[index].list.map(item => {
                return item.value
              })
              for (let i = 0; i < name.length; i++) {
                for (let j = 0; j < value.length; j++) {
                  if (i === j) {
                    obj['time' + name[i]] = value[j]
                  }
                }
              }
              finalData.push(obj)
            }
            this.tableData = finalData
            // this.dataPath = 'payload'
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    //周报
    getWeekInfo() {
      this.flowLoading = true
      this.$axios
        .$get(passengerFlowWeek, {
          params: {
            dateStart: this.weekStartTime,
            dateEnd: this.weekEndTime,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : []
            let aa = this.formateOverview(data, WEEK_KEY_INFO)
            this.flowListTop = aa.slice(0, 3)
            this.flowListBottom = aa.slice(3)
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 本周与历史同期客流量对比
    getWeekCompare() {
      this.seviceTitle = HISTORY_FLOW[1]
      this.flowLoading = true
      this.seviceData = []
      this.$axios
        .$get(passengerFlowDayCompareWeek, {
          params: {
            startDate: this.weekStartTime,
            endDate: this.weekEndTime,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : {}
            let finalData = []
            let firstObj = {}
            let secondObj = {}
            let thirdObj = {}
            let fourthObj = {}
            let lastObj = {}
            firstObj.State = '本周客流'
            secondObj.State = '上周客流'
            thirdObj.State = '上月同期'
            fourthObj.State = '去年同期'
            firstObj['男'] = data.weekOfThisWeek
              ? parseInt(data.weekOfThisWeek.male)
              : 0
            firstObj['女'] = data.weekOfThisWeek
              ? parseInt(data.weekOfThisWeek.female)
              : 0
            secondObj['男'] = data.weekOfLastWeek
              ? parseInt(data.weekOfLastWeek.male)
              : 0
            secondObj['女'] = data.weekOfLastWeek
              ? data.weekOfLastWeek.female
              : 0
            thirdObj['男'] = data.weekOfLastMonth
              ? parseInt(data.weekOfLastMonth.male)
              : 0
            thirdObj['女'] = data.weekOfLastMonth
              ? parseInt(data.weekOfLastMonth.female)
              : 0
            fourthObj['男'] = data.weekOfLastYear
              ? parseInt(data.weekOfLastYear.male)
              : 0
            fourthObj['女'] = data.weekOfLastYear
              ? parseInt(data.weekOfLastYear.female)
              : 0
            finalData.push(firstObj)
            finalData.push(secondObj)
            finalData.push(thirdObj)
            finalData.push(fourthObj)
            this.$nextTick(() => {
              this.seviceData = finalData
            })
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 本周与历史同期客流量对比
    getWeekHistory() {
      this.flowLoading = true
      this.peopleTitle = HISTORY_TREND[1]
      this.peopleData = []
      this.fields = []
      this.$axios
        .$get(passengerFlowDayCompareHistoryWeek, {
          params: {
            startDate: this.weekStartTime,
            endDate: this.weekEndTime,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.fields = data.map(item => {
              return item.name
            })
            const finalData = []
            let aa = WEEK
            for (let index = 0; index < aa.length; index++) {
              let obj = {}
              obj.time = aa[index]
              const ee = data.map(item => {
                return item.name
              })
              const ff = data.map(item => {
                return item.list.filter(dd => dd.name === aa[index])
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
            this.peopleData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 月报
    getMonthInfo() {
      this.flowLoading = true
      this.$axios
        .$get(passengerFlowMonth, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : []
            let aa = this.formateOverview(data, MONTH_KEY_INFO)
            this.flowListTop = aa.slice(0, 3)
            this.flowListBottom = aa.slice(3)
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 本月与历史同期客流量对比
    getMonthCompare() {
      this.seviceTitle = HISTORY_FLOW[2]
      this.flowLoading = true
      this.seviceData = []
      this.$axios
        .$get(passengerFlowDayCompareMonth, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload']) ? res.payload : {}
            let finalData = []
            let firstObj = {}
            let secondObj = {}
            let thirdObj = {}
            let fourthObj = {}
            let lastObj = {}
            firstObj.State = '本月客流'
            secondObj.State = '上月客流'
            thirdObj.State = '去年同期'
            firstObj['男'] = data.monthOfThisMonth
              ? parseInt(data.monthOfThisMonth.male)
              : 0
            firstObj['女'] = data.monthOfThisMonth
              ? parseInt(data.monthOfThisMonth.female)
              : 0
            secondObj['男'] = data.monthOfLastMonth
              ? parseInt(data.monthOfLastMonth.male)
              : 0
            secondObj['女'] = data.monthOfLastMonth
              ? data.monthOfLastMonth.female
              : 0
            thirdObj['男'] = data.monthOfLastYear
              ? parseInt(data.monthOfLastYear.male)
              : 0
            thirdObj['女'] = data.monthOfLastYear
              ? parseInt(data.monthOfLastYear.female)
              : 0
            finalData.push(firstObj)
            finalData.push(secondObj)
            finalData.push(thirdObj)
            this.$nextTick(() => {
              this.seviceData = finalData
            })
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 本月与历史同期客流量对比
    getMonthHistory() {
      this.flowLoading = true
      this.peopleTitle = HISTORY_TREND[2]
      this.peopleData = []
      this.fields = []
      this.$axios
        .$get(passengerFlowDayCompareHistoryMonth, {
          params: {
            date: this.value,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.fields = data.map(item => {
              return item.name
            })
            const finalData = []
            let aa = MONTH
            for (let index = 0; index < aa.length; index++) {
              let obj = {}
              obj.time = aa[index]
              const ee = data.map(item => {
                return item.name
              })
              const ff = data.map(item => {
                return item.list.filter(dd => dd.name === aa[index])
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
            this.peopleData = finalData
          }
        })
        .finally(() => {
          this.flowLoading = false
        })
    },
    // 初始获取所有图表数据
    getInitData(type) {
      if (type === 0) {
        this.getDayInfo()
        this.getDayCompare()
        this.getDayHistory()
      } else if (type === 1) {
        this.getWeekInfo()
        this.getWeekCompare()
        this.getWeekHistory()
      } else if (type === 2) {
        this.getMonthInfo()
        this.getMonthCompare()
        this.getMonthHistory()
      }
      this.getAgeAnalyse(type)
      this.getSexAnalyse(type)
      this.getFlowTopFive(type)
      this.getAreaAnalyse(type)
      this.getAreaTime(type)
      this.getGustFlowFloor(type)
      this.getFlowDetail(type)
    },
    handleRadioChange(type) {
      if (type === 'date') {
        this.value = formatDate(new Date().getTime(), 'YYYY-MM-DD')
        this.ageType = 0
        this.getInitData(this.ageType)
      } else if (type === 'week') {
        this.weekValue = new Date()
        this.ageType = 1
        this.getInitData(this.ageType)
      } else if (type === 'month') {
        this.value = formatDate(new Date().getTime(), 'YYYY-MM')
        this.ageType = 2
        this.getInitData(this.ageType)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .top-header {
    position: relative;

    .time {
      position: absolute;
      right: 0;
      top: 0;

      .date {
        width: 250px;
        position: relative;
        top: -14px;
      }
    }
  }

  .top-content {
    margin-top: 20px;
    overflow: hidden;

    .left {
      width: 61%;
      float: left;

      .one {
        height: 110px;
        background: #fff;
        padding: 20px;
        display: flex;

        & > div {
          margin-top: 40px;
          clear: both;
          flex: 1;

          .icon {
            float: left;
            position: relative;
            top: 10px;
            padding-right: 6px;
            font-size: 16px;
          }

          .day {
            color: #80b1e3;
          }

          .add {
            color: #e3b180;
          }

          .back {
            color: #b4e380;
          }

          & > div {
            float: left;
            line-height: 24px;

            p {
              font-size: 12px;
            }

            h1 {
              font-size: 24px;
            }
          }
        }
      }

      .two {
        height: 110px;
        background: #fff;
        padding: 20px;
        margin-top: 20px;
        display: flex;

        .first {
          margin-top: 40px;
          clear: both;
          flex: 1;

          p {
            font-size: 12px;
          }

          h1 {
            font-size: 24px;
          }

          .rate {
            color: #ec4040;
          }
        }
      }
    }

    .right {
      width: 37%;
      float: right;
    }
  }

  .rate-content {
    margin-top: 20px;

    .rate-box {
      width: 100%;
    }
  }

  .graph-content {
    clear: both;
    margin-top: 20px;
    overflow: hidden;

    h2 {
      margin-bottom: 15px;
    }

    .left {
      float: left;
      width: 61%;
    }

    .left-37 {
      width: 37%;
    }

    .left-49 {
      width: 49%;
    }

    .right {
      width: 37%;
      float: right;
    }

    .right-61 {
      width: 61%;
    }

    .right-49 {
      width: 49%;
    }
  }

  .table {
    position: relative;
    margin-top: 20px;
    background: #fff;
    padding: 20px;

    .atavr {
      width: 50px;
      height: 50px;

      img {
        width: 100%;
      }
    }

    .download {
      font-size: 16px;
      cursor: pointer;
      position: absolute;
      right: 20px;
      top: 20px;
    }
  }
}
</style>
