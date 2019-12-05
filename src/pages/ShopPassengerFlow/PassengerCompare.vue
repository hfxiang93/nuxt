<template>
  <div class="container">
    <!-- <h1>客流对比</h1> -->
    <div class="top-content">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <!-- <el-tab-pane name="first" label="商铺对比">
          <div style="margin-top:15px;">
            <label for="">选择商铺：</label>
            <el-select v-model="value5" multiple placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div style="margin-top:15px;">
            <p>对比参数</p>
            <div style="margin-top:15px;">
              <el-tag>日客流趋势</el-tag>
              <el-tag>月日均客流</el-tag>
              <el-tag>月日均驻留时长</el-tag>
              <el-tag>月新客占比</el-tag>
              <el-tag>月客流趋势</el-tag>
              <el-tag>月销售额</el-tag>
              <el-tag>日客均单价</el-tag>
            </div>
          </div>
        </el-tab-pane> -->
        <el-tab-pane name="second" label="对比商铺">
          <div style="margin-top:15px;">
            <label for="">选择商铺：</label>

            <el-select
              v-model="value"
              multiple
              placeholder="请选择"
              @change="handleChangeStore"
            >
              <el-option
                v-for="item in storeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-tooltip
              effect="dark"
              content="最多支持6个区域对比"
              placement="bottom"
            >
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </div>
          <div style="margin-top:15px;">
            <p>对比参数</p>
            <div style="margin-top:15px;">
              <el-checkbox-group
                v-model="checkboxGroup"
                size="small"
                @change="handleCheckGroup"
              >
                <el-checkbox-button
                  v-for="tag in tags"
                  :label="tag"
                  :key="tag"
                  >{{ tag }}</el-checkbox-button
                >
              </el-checkbox-group>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 日客流趋势 -->
    <div v-if="checkboxGroup.indexOf('日客流趋势') > -1" class="graph-content">
      <div class="trend-box">
        <el-date-picker
          v-model="dateValte1"
          class="dateTime"
          type="date"
          placeholder="选择日期"
          @change="getCompareDayPassengerFlow"
        >
        </el-date-picker>
        <PeopleCount
          :type-id="peopleID"
          :head-title="peopleTitle"
          :chart-data="dayTrendData"
          :fields="fields"
        />
      </div>
    </div>
    <!-- 月日均客流 -->
    <div v-if="checkboxGroup.indexOf('月日均客流') > -1" class="graph-content">
      <div class="trend-box">
        <el-date-picker
          v-model="dateValte2"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getCompareMonthPassengerFlow"
        >
        </el-date-picker>
        <AgeCount
          :type-id="typeID"
          :head-title="typeTitle"
          :color="typeColor"
          :chart-data="typeData"
          :fields="trendFields"
        />
      </div>
    </div>
    <!-- 月日均驻留时长 -->
    <div
      v-if="checkboxGroup.indexOf('月日均驻留时长') > -1"
      class="graph-content"
    >
      <div class="trend-box">
        <el-date-picker
          v-model="dateValte3"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getCompareMonthPassengerFlowTime"
        >
        </el-date-picker>
        <PeopleCount
          :type-id="averID"
          :head-title="averTitle"
          :chart-data="dayMonthData"
          :fields="dayMonthFields"
        />
      </div>
    </div>
    <!-- 月新客占比 -->
    <div v-if="checkboxGroup.indexOf('月新客占比') > -1" class="graph-content">
      <div class="single-box">
        <el-date-picker
          v-model="dateValte4"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getCompareMonthNewPassengerFlowRate"
        >
        </el-date-picker>
        <Single
          :type-id="newID"
          :head-title="newTitle"
          :floor-count="floorCount"
          :chart-data="newPassengerData"
        />
      </div>
    </div>
    <!-- 月客流趋势 -->
    <div v-if="checkboxGroup.indexOf('月客流趋势') > -1" class="graph-content">
      <div class="trend-box">
        <el-date-picker
          v-model="dateValte5"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getCompareMonthPassengerFlowTrend"
        >
        </el-date-picker>
        <PeopleCount
          :type-id="tID"
          :head-title="tTitle"
          :chart-data="dayFlowData"
          :fields="dayFlowFields"
        />
      </div>
    </div>
    <!-- 月销售额 -->
    <div v-if="checkboxGroup.indexOf('月销售额') > -1" class="graph-content">
      <div class="single-box">
        <el-date-picker
          v-model="dateValte6"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getDayPassengerPrice"
        >
        </el-date-picker>
        <Single
          :type-id="mtID"
          :head-title="mtTitle"
          :floor-count="monthCount"
          :chart-data="newData"
        />
      </div>
    </div>
    <!-- 日均客单价 -->
    <div v-if="checkboxGroup.indexOf('日均客单价') > -1" class="graph-content">
      <div class="trend-box">
        <el-date-picker
          v-model="dateValte7"
          class="dateTime"
          type="date"
          placeholder="选择日期"
          @change="getMonthSale"
        >
        </el-date-picker>
        <PeopleCount
          :type-id="priceID"
          :head-title="priceTitle"
          :chart-data="priceData"
          :fields="priceFields"
        />
      </div>
    </div>
  </div>
</template>

<script>
const tagOptions = [
  '日客流趋势',
  '月日均客流',
  '月日均驻留时长',
  '月新客占比',
  '月客流趋势',
  '月销售额',
  '日均客单价',
]
import PeopleCount from '@/components/common/peopleCount'
import AgeCount from '@/components/common/AgeCount'
import Single from '@/components/common/Single'
import {holidays, newData, priceData} from './const'
import {
  storeList,
  compareDayPassengerFlow,
  compareMonthPassengerFlow,
  compareMonthPassengerFlowTime,
  compareMonthNewPassengerFlowRate,
  compareMonthPassengerFlowTrend,
} from '@/const/api'
import {hasIn} from 'lodash'
import {formatDate} from '@/const/filter'
export default {
  components: {
    AgeCount,
    Single,
    PeopleCount,
  },
  data() {
    return {
      tags: tagOptions,
      checkboxGroup: [
        '日客流趋势',
        '月日均客流',
        '月日均驻留时长',
        '月新客占比',
        '月客流趋势',
        '月销售额',
        '日均客单价',
      ],
      holidays,
      activeName2: 'second',
      // 日客流趋势数据
      peopleID: 'people',
      peopleTitle: '日客流趋势',
      fields: [],
      dayTrendData: [],
      // 月日均驻留时长数据
      averID: 'aver',
      averTitle: '月日均驻留时长',
      dayMonthData: [],
      dayMonthFields: [],
      // 月客流趋势数据
      tID: 't-trend',
      tTitle: '月客流趋势',
      dayFlowFields: [],
      dayFlowData: [],
      // 日均客单价数据
      priceID: 'porice',
      priceTitle: '日均客单价',
      priceData: [],
      priceFields: ['商铺一', '商铺二', '商铺三'],
      typeColor: ['#ee5858', '#419eff'],
      // 月日均客流数据
      typeID: 'trend',
      typeData: [],
      typeTitle: '月日均客流',
      trendFields: [],
      // 月新客占比数据
      newID: 'new',
      newTitle: '月新客占比',
      floorCount: 100,
      newPassengerData: [],
      newData: [],
      // 月销售额数据
      mtID: 'mt-box',
      mtTitle: '月销售额',
      monthCount: 2000,
      dateValte1: formatDate(new Date(), 'YYYY-MM-DD'),
      dateValte2: formatDate(new Date(), 'YYYY-MM'),
      dateValte3: formatDate(new Date(), 'YYYY-MM'),
      dateValte4: formatDate(new Date(), 'YYYY-MM'),
      dateValte5: formatDate(new Date(), 'YYYY-MM'),
      dateValte6: formatDate(new Date(), 'YYYY-MM'),
      dateValte7: formatDate(new Date(), 'YYYY-MM-DD'),
      value5: [],
      value: [],
      storeOptions: [],
      storeArr: '',
    }
  },
  created() {
    this.getStoreList()
    this.getCompareDayPassengerFlow()
    this.getCompareMonthPassengerFlow()
    this.getCompareMonthPassengerFlowTime()
    this.getCompareMonthNewPassengerFlowRate()
    this.getCompareMonthPassengerFlowTrend()
    this.getDayPassengerPrice()
    this.getMonthSale()
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/ShopPassengerFlow/PassengerCompare'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getStoreList()
          this.getCompareDayPassengerFlow()
          this.getCompareMonthPassengerFlow()
          this.getCompareMonthPassengerFlowTime()
          this.getCompareMonthNewPassengerFlowRate()
          this.getCompareMonthPassengerFlowTrend()
          this.getDayPassengerPrice()
          this.getMonthSale()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/ShopPassengerFlow/PassengerCompare'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getStoreList()
          this.getCompareDayPassengerFlow()
          this.getCompareMonthPassengerFlow()
          this.getCompareMonthPassengerFlowTime()
          this.getCompareMonthNewPassengerFlowRate()
          this.getCompareMonthPassengerFlowTrend()
          this.getDayPassengerPrice()
          this.getMonthSale()
        }, 0)
      }
    })
  },
  methods: {
    // 获取商铺列表
    getStoreList() {
      this.$axios.$get(storeList).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload']) ? res.payload : []
          let finalData = []
          for (let index = 0; index < data.length; index++) {
            let obj = {}
            obj.label = data[index].name
            obj.value = data[index].id
            finalData.push(obj)
          }
          this.storeOptions = finalData
          // this.value.push(this.storeOptions[0].value)
        }
      })
    },
    // 选择商铺
    handleChangeStore(value) {
      if (value.length > 6) {
        this.$message.warning('最多只能选择六个区域对比')
      } else {
        const arr = []
        arr.push(value)
        this.storeArr = arr.join(',')
        this.getCompareDayPassengerFlow()
        this.getCompareMonthPassengerFlow()
        this.getCompareMonthPassengerFlowTime()
        this.getCompareMonthNewPassengerFlowRate()
        this.getCompareMonthPassengerFlowTrend()
        this.getDayPassengerPrice()
        this.getMonthSale()
      }
    },
    // 选择对比参数
    handleCheckGroup(values) {
      //TODO:交互待处理
      // this.getCompareDayPassengerFlow()
      // this.getCompareMonthPassengerFlow()
      // this.getCompareMonthPassengerFlowTime()
      // this.getCompareMonthNewPassengerFlowRate()
      // this.getCompareMonthPassengerFlowTrend()
      // this.getDayPassengerPrice()
      // this.getMonthSale()
    },
    // 日客流趋势
    getCompareDayPassengerFlow() {
      this.$axios
        .$get(compareDayPassengerFlow, {
          params: {
            mallIds: this.$store.state.mallId,
            areaIds: this.storeArr,
            date: formatDate(this.dateValte1),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.fields = data.map(item => {
              return item.name
            })
            let finalData = []
            let holidays = this.holidays
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
            this.dayTrendData = finalData
          }
        })
    },
    // 月日均客流
    getCompareMonthPassengerFlow() {
      this.$axios
        .$get(compareMonthPassengerFlow, {
          params: {
            mallIds: this.$store.state.mallId,
            areaIds: this.storeArr,
            date: formatDate(this.dateValte2, 'YYYY-MM'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.trendFields = data.map(item => {
              return item.name
            })
            let finalData = []
            let femaleObj = {}
            let maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj.name = '女'
              femaleObj[data[index].name] = parseInt(data[index].female)
              maleObj.name = '男'
              maleObj[data[index].name] = parseInt(data[index].male)
            }
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.typeData = finalData
          }
        })
    },
    // 月日均驻留时长
    getCompareMonthPassengerFlowTime() {
      this.$axios
        .$get(compareMonthPassengerFlowTime, {
          params: {
            mallIds: this.$store.state.mallId,
            areaIds: this.storeArr,
            date: formatDate(this.dateValte3, 'YYYY-MM'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.dayMonthFields = data.map(item => {
              return item.name
            })
            let finalData = []
            let holidays = this.holidays
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
            this.dayMonthData = finalData
          }
        })
    },
    // 月客流趋势
    getCompareMonthPassengerFlowTrend() {
      this.$axios
        .$get(compareMonthPassengerFlowTrend, {
          params: {
            mallIds: this.$store.state.mallId,
            areaIds: this.storeArr,
            date: formatDate(this.dateValte4, 'YYYY-MM'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            this.dayFlowFields = data.map(item => {
              return item.name
            })
            let finalData = []
            let holidays = this.holidays
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
            this.dayFlowData = finalData
          }
        })
    },
    // 月新客占比
    getCompareMonthNewPassengerFlowRate() {
      this.$axios
        .$get(compareMonthNewPassengerFlowRate, {
          params: {
            mallIds: this.$store.state.mallId,
            areaIds: this.storeArr,
            date: formatDate(this.dateValte5, 'YYYY-MM'),
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'list']) ? res.payload.list : []
            let finalData = []
            for (let index = 0; index < data.length; index++) {
              let obj = {}
              obj.time = data[index].name
              obj.sales = parseInt(data[index].value)
              finalData.push(obj)
            }
            this.newPassengerData = finalData
          }
        })
    },
    // 月销售额
    getMonthSale() {
      this.$nextTick(() => {
        this.newData = newData
      })
    },
    // 日均客单价
    getDayPassengerPrice() {
      this.$nextTick(() => {
        this.priceData = priceData
      })
    },
    handleClick(tab, event) {},
  },
}
</script>

<style lang="less" scoped>
.container {
  .top-content {
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }

  .graph-content {
    margin-top: 20px;

    .dateTime {
      position: relative;
      top: 50px;
      left: 150px;
      z-index: 99;
    }
  }
}
</style>
