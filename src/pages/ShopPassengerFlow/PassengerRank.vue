<template>
  <div class="container">
    <!-- <h1>客流排名</h1> -->
    <div class="top-header">
      <!-- <el-select v-model="value" placeholder="请选择卖场">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="time">
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div> -->
    </div>
    <div class="table">
      <h2>商铺客流排名</h2>
      <el-button type="primary" class="export">导出数据</el-button>
      <el-data-table
        ref="dataTable2"
        :url="url"
        :columns="columns"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="true"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="20"
        :pagination-sizes="[20]"
        :total-path="totalPath"
        :data-path="dataPath"
        v-bind="$data"
      />
      <!-- <el-data-table :has-new="false" :has-operation="false" data-path="payload.list" v-bind="$data" /> -->
    </div>
  </div>
</template>
<script>
import {passengerFlowAnalyseStoreTop} from '@/const/api'
import {formatDate} from '@/const/filter'
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '卖场一',
        },
        {
          value: '2',
          label: '卖场二',
        },
        {
          value: '3',
          label: '中型门店',
        },
        {
          value: '4',
          label: '小型门店',
        },
        {
          value: '5',
          label: '大型商场',
        },
      ],
      value: '',
      date: [],
      url: `${passengerFlowAnalyseStoreTop}`,
      columns: [
        {prop: 'id', label: '排名'},
        {
          prop: 'logoUrl',
          label: '商铺logo',
          formatter: row => this.prodImgFormatte(row),
        },
        {prop: 'name', label: '商铺名称'},
        {prop: 'firstLevelName', label: '一级行业'},
        {prop: 'secondLevelName', label: '二级行业'},
        {prop: 'floorId', label: '所属楼层'},
        {prop: 'location', label: '商铺位置'},
        {prop: 'dayPassengerNum', label: '当日客流'},
        {prop: 'dayPassengerRate', label: '客流环比'},
        {
          prop: 'status',
          label: '操作',
          formatter: row => (
            <nuxt-link class="morebtn" to="/Analysis/DailyWeeklyMonthlyReport">
              查看
            </nuxt-link>
          ),
        },
      ],
      searchForm: [
        {
          type: 'date-picker',
          id: 'date',
          label: '日期',
          default: formatDate(new Date().getTime(), 'YYYY-MM-DD'),
          el: {
            type: 'date',
            valueFormat: 'yyyy-MM-dd',
            placeholder: '选择日期',
          },
        },
        {
          el: {placeholder: '请选择'},
          // label: '一级行业',
          default: ' ',
          id: 'firstLevelName',
          type: 'select',
          options: [
            {
              label: '全部一级行业',
              value: ' ',
            },
            {
              label: '服装',
              value: 'shanghai',
            },
            {
              label: '超市',
              value: 'beijing',
            },
          ],
        },
        {
          el: {placeholder: '请选择'},
          // label: '全部一级行业',
          default: ' ',
          id: 'secondLevelName',
          type: 'select',
          options: [
            {
              label: '全部二级行业',
              value: ' ',
            },
            {
              label: '男装',
              value: 'shanghai1',
            },
            {
              label: '女装',
              value: 'beijing1',
            },
          ],
        },
        {
          el: {placeholder: '请输入'},
          label: '商铺名称',
          id: 'name',
          type: 'input',
          default: ' ',
        },
      ],
      hasView: true,
      dataPath: 'payload.list',
      totalPath: 'payload.total',
    }
  },
  created() {
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/ShopPassengerFlow/PassengerRank'
      if (url === currentUrl) {
        setTimeout(() => {
          this.url = passengerFlowAnalyseStoreTop
          this.$refs.dataTable2.getList()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/ShopPassengerFlow/PassengerRank'
      if (url === currentUrl) {
        setTimeout(() => {
          this.url = passengerFlowAnalyseStoreTop
          this.$refs.dataTable2.getList()
        }, 0)
      }
    })
  },
  methods: {
    prodImgFormatte(row) {
      const {logoUrl} = row
      return <img src={logoUrl} alt="img" style="width:70px;" />
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
    // background: #fff;
    // padding: 20px;
    // margin-top: 20px;

    .time {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 99;
    }
  }

  .table {
    position: relative;
    margin-top: 20px;
    padding: 20px;
    background: #fff;

    h2 {
      margin-bottom: 20px;
    }

    .export {
      position: absolute;
      top: 20px;
      right: 20px;
    }
  }
}
</style>
