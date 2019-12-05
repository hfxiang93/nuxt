<template>
  <div class="container">
    <!-- <h1>卖场对比</h1> -->
    <div class="top-content">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane name="first" label="卖场对比">
          <div style="margin-top:15px;">
            <label for="">选择卖场：</label>
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
        </el-tab-pane>
        <el-tab-pane name="second" label="区域对比">
          <div style="margin-top:15px;">
            <label for="">选择区域：</label>
            <el-select v-model="value6" multiple placeholder="请选择">
              <el-option
                v-for="item in options6"
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
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 日客流趋势 -->
    <div class="graph-content">
      <div class="trend-box">
        <PeopleCount
          :type-id="peopleID"
          :head-title="peopleTitle"
          :chart-data="dayTrendData"
          :fields="fields"
        />
      </div>
    </div>
    <!-- 月日均客流 -->
    <div class="graph-content">
      <div class="trend-box">
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
    <div class="graph-content">
      <div class="trend-box">
        <PeopleCount
          :type-id="averID"
          :head-title="averTitle"
          :chart-data="dayTrendData"
          :fields="fields"
        />
      </div>
    </div>
    <!-- 月新客占比 -->
    <div class="graph-content">
      <div class="single-box">
        <Single :type-id="newID" :head-title="newTitle" :chart-data="newData" />
      </div>
    </div>
    <!-- 月客流趋势 -->
    <div class="graph-content">
      <div class="trend-box">
        <PeopleCount
          :type-id="tID"
          :head-title="tTitle"
          :chart-data="dayTrendData"
          :fields="fields"
        />
      </div>
    </div>
    <!-- 月销售额 -->
    <div class="graph-content">
      <div class="single-box">
        <Single :type-id="mtID" :head-title="mtTitle" :chart-data="newData" />
      </div>
    </div>
    <!-- 日均客单价 -->
    <div class="graph-content">
      <div class="trend-box">
        <PeopleCount
          :type-id="priceID"
          :head-title="priceTitle"
          :chart-data="dayTrendData"
          :fields="fields"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PeopleCount from '@/components/common/peopleCount'
import AgeCount from '@/components/common/AgeCount'
import Single from '@/components/common/Single'
import {trendData, newData, dayTrendData} from './const'

export default {
  components: {
    AgeCount,
    Single,
    PeopleCount,
  },
  data() {
    return {
      activeName2: 'first',
      // 日客流趋势数据
      peopleID: 'people',
      peopleTitle: '日客流趋势',
      fields: ['卖场一', '卖场二', '卖场三'],
      dayTrendData,
      // 月日均驻留时长数据
      averID: 'aver',
      averTitle: '月日均主流时长',
      // 月客流趋势数据
      tID: 't-trend',
      tTitle: '月客流趋势',
      // 日均客单价数据
      priceID: 'porice',
      priceTitle: '日均客单价',
      typeColor: ['#ee5858', '#419eff'],
      // 月日均客流数据
      typeID: 'trend',
      typeData: trendData,
      typeTitle: '月日均客流',
      trendFields: ['卖场一', '卖场二', '卖场三', '卖场四', '卖场五', '卖场六'],
      // 月新客占比数据
      newID: 'new',
      newTitle: '月新客占比',
      newData,
      // 月销售额数据
      mtID: 'mt-box',
      mtTitle: '月销售额',
      options: [
        {
          value: '卖场1',
          label: '卖场一',
        },
        {
          value: '卖场2',
          label: '卖场二',
        },
        {
          value: '卖场3',
          label: '卖场三',
        },
        {
          value: '卖场4',
          label: '卖场四',
        },
        {
          value: '卖场5',
          label: '卖场五',
        },
      ],
      value5: [],
      value6: [],
      options6: [
        {
          value: '区域1',
          label: '区域一',
        },
        {
          value: '区域2',
          label: '区域二',
        },
        {
          value: '区域3',
          label: '区域三',
        },
        {
          value: '区域4',
          label: '区域四',
        },
        {
          value: '区域5',
          label: '区域五',
        },
      ],
    }
  },
  methods: {
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
  }
}
</style>
