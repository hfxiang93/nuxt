<template>
  <div class="container">
    <div class="table">
      <h2>日客流同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date1"
          class="dateTime"
          type="date"
          placeholder="选择日期"
          @change="getDayRate"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable1"
        :url="url"
        :columns="columns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="PAGE_NUMBER[0]"
        :pagination-sizes="PAGE_NUMBER"
        :total-path="totalPath"
        :data-path="passengerFlowDayRateDataPath"
      />
    </div>
    <div class="table">
      <h2>日人均驻留时长同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date2"
          class="dateTime"
          type="date"
          placeholder="选择日期"
          @change="getAverageStayTime"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable2"
        :url="averageUrl"
        :columns="averageColumns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="PAGE_NUMBER[0]"
        :pagination-sizes="PAGE_NUMBER"
        :total-path="averageTotalPath"
        :data-path="averageDataPath"
      />
    </div>
    <div class="table">
      <h2>日营业额同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date3"
          class="dateTime"
          type="date"
          placeholder="选择日期"
          @change="getAverageStayTime"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable3"
        :url="url22"
        :columns="columns1"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="PAGE_NUMBER[0]"
        :pagination-sizes="PAGE_NUMBER"
        :total-path="totalPath22"
        :data-path="dataPath22"
      />
    </div>
    <div class="table">
      <h2>月客流同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date4"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getMonthRate"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable4"
        :url="monthUrl"
        :columns="monthRateColumns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="false"
        :data-path="monthDataPath"
      />
    </div>
    <div class="table">
      <h2>月人均驻留时长同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date5"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getAverageMonthTime"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable5"
        :url="monthAverageUrl"
        :columns="monthAverageColumns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="false"
        :data-path="averageMonthDataPath"
      />
    </div>
    <div class="table">
      <h2>月营业额同比环比</h2>
      <div class="time">
        <el-date-picker
          v-model="date6"
          class="dateTime"
          type="month"
          placeholder="选择日期"
          @change="getAverageStayTime"
        >
        </el-date-picker>
      </div>
      <el-data-table
        ref="dataTable6"
        :url="url1"
        :columns="columns3"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="false"
        :data-path="dataPath3"
      />
    </div>
  </div>
</template>

<script>
import {
  dayRate,
  averageStayTime,
  monthRate,
  averageMonthTime,
} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
import {formatDate} from '@/const/filter'
export default {
  data() {
    return {
      date1: formatDate(new Date()),
      date2: formatDate(new Date()),
      date3: formatDate(new Date()),
      date4: formatDate(new Date()),
      date5: formatDate(new Date()),
      date6: formatDate(new Date()),
      dataPath: 'items',
      totalPath: 'payload.total',
      dataPath22: 'items',
      totalPath22: 'total_count',
      url: '',
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      size: PAGE_NUMBER[0],
      averageTotalPath: 'payload.total',
      passengerFlowDayRateDataPath: 'payload.list',
      averageDataPath: 'payload.list',
      url22:
        'http://121.40.142.243/mock/24/user-center/user-center/user-center/system/api/v1/dayPassList',
      url1:
        'http://121.40.142.243/mock/24/user-center/user-center/user-center/system/api/v1/monthPassList',
      columns: [
        {prop: 'dateStr', label: '日期'},
        {prop: 'todayNum', label: '当日(人次)'},
        {prop: 'yesterdayNum', label: '昨日'},
        {
          prop: 'yesterdayRate',
          label: '昨日环比',
          formatter: row =>
            `${(Math.round(row.yesterdayRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastWeekNum', label: '上周同日'},
        {
          prop: 'lastWeekRate',
          label: '上周同比',
          formatter: row =>
            `${(Math.round(row.lastWeekRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastMonthNum', label: '上月同日'},
        {
          prop: 'lastMonthRate',
          label: '上月同比',
          formatter: row =>
            `${(Math.round(row.lastMonthRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastYearNum', label: '去年同日'},
        {
          prop: 'lastYearRate',
          label: '去年同比',
          formatter: row =>
            `${(Math.round(row.lastYearRate * 100) / 100) * 100}%`,
        },
      ],
      averageColumns: [
        {prop: 'dateStr', label: '日期'},
        {prop: 'todayNum', label: '当日(分钟)'},
        {prop: 'yesterdayNum', label: '昨日'},
        {
          prop: 'yesterdayRate',
          label: '昨日环比',
          formatter: row =>
            `${(Math.round(row.yesterdayRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastWeekNum', label: '上周同日'},
        {
          prop: 'lastWeekRate',
          label: '上周同比',
          formatter: row =>
            `${(Math.round(row.lastWeekRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastMonthNum', label: '上月同日'},
        {
          prop: 'lastMonthRate',
          label: '上月同比',
          formatter: row =>
            `${(Math.round(row.lastMonthRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastYearNum', label: '去年同日'},
        {
          prop: 'lastYearRate',
          label: '去年同比',
          formatter: row =>
            `${(Math.round(row.yesterdayRate * 100) / 100) * 100}%`,
        },
      ],
      columns1: [
        {prop: 'date', label: '日期'},
        {prop: 'daysale', label: '当日（元）'},
        {prop: 'lastdaysale', label: '昨日'},
        {
          prop: 'lastdayhb',
          label: '昨日环比',
          formatter: row => `${row.lastdayhb * 100}%`,
        },
        {prop: 'lastweekday', label: '上周同日'},
        {
          prop: 'lastweek',
          label: '上周同比',
          formatter: row => `${row.lastweek * 100}%`,
        },
        {prop: 'lastmonthday', label: '上月同日'},
        {
          prop: 'lastmonth',
          label: '上月同比',
          formatter: row => `${row.lastmonth * 100}%`,
        },
        {prop: 'lastyaerday', label: '去年同日'},
        {
          prop: 'lastyear',
          label: '去年同比',
          formatter: row => `${row.lastyear * 100}%`,
        },
      ],
      monthRateColumns: [
        {prop: 'dateStr', label: '月份'},
        {prop: 'thisMonthNum', label: '本月客流'},
        {prop: 'thisMonthAverageNum', label: '本月日均'},
        {prop: 'lastMonthAverageNum', label: '上月日均'},
        {
          prop: 'sameRate',
          label: '同比',
          formatter: row => `${((row.sameRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastYearAverageNum', label: '去年同月日均'},
        {
          prop: 'rate',
          label: '环比',
          formatter: row => `${((row.rate * 100) / 100) * 100}%`,
        },
      ],
      monthAverageColumns: [
        {prop: 'dateStr', label: '月份'},
        {prop: 'thisMonthNum', label: '本月'},
        {prop: 'thisMonthAverageNum', label: '本月日均'},
        {prop: 'lastMonthAverageNum', label: '上月日均'},
        {
          prop: 'sameRate',
          label: '同比',
          formatter: row => `${((row.sameRate * 100) / 100) * 100}%`,
        },
        {prop: 'lastYearAverageNum', label: '去年同月日均'},
        {
          prop: 'rate',
          label: '环比',
          formatter: row => `${((row.rate * 100) / 100) * 100}%`,
        },
      ],
      columns3: [
        {prop: 'month', label: '月份'},
        {prop: 'monthsale', label: '本月'},
        {prop: 'monthrj', label: '本月日均'},
        {prop: 'lastmonthrj', label: '上月日均'},
        {prop: 'tb', label: '同比', formatter: row => `${row.tb * 100}%`},
        {prop: 'lastmonthdayrj', label: '去年同月日均'},
        {prop: 'hb', label: '环比', formatter: row => `${row.hb * 100}%`},
      ],
      dataPath3: 'items',
      monthDataPath: 'payload.list',
      averageMonthDataPath: 'payload.list',
      averageUrl: '',
      monthUrl: '',
      monthAverageUrl: '',
    }
  },
  mounted() {
    this.getDayRate()
    this.getAverageStayTime()
    this.getMonthRate()
    this.getAverageMonthTime()
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/Analysis/ChainRatio'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getDayRate()
          this.getAverageStayTime()
          this.getMonthRate()
          this.getAverageMonthTime()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/Analysis/ChainRatio'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getDayRate()
          this.getAverageStayTime()
          this.getMonthRate()
          this.getAverageMonthTime()
        }, 0)
      }
    })
  },
  methods: {
    // 日客流同比环比
    getDayRate() {
      this.url = `${dayRate}?date=${formatDate(this.date1)}`
      this.passengerFlowDayRateDataPath = 'payload.list'
      setTimeout(() => {
        this.$refs.dataTable1.getList()
      })
    },
    // 日人均驻留时长同比环比
    getAverageStayTime() {
      this.averageUrl = `${averageStayTime}?date=${formatDate(this.date2)}`
      this.averageDataPath = 'payload.list'
      this.$refs.dataTable2.getList()
    },
    // 月客流同比环比
    getMonthRate() {
      this.monthUrl = `${monthRate}?date=${formatDate(this.date4, 'YYYY-MM')}`
      this.monthDataPath = 'payload.list'
      this.$refs.dataTable4.getList()
    },
    // 月人均驻留时长同比环比
    getAverageMonthTime() {
      this.monthAverageUrl = `${averageMonthTime}?date=${formatDate(
        this.date5,
        'YYYY-MM',
      )}`
      this.averageMonthDataPath = 'payload.list'
      this.$refs.dataTable5.getList()
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

  .table {
    position: relative;
    margin-top: 20px;
    padding: 20px;
    background: #fff;

    .time {
      position: absolute;
      right: 0;
      top: 10px;
    }
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
