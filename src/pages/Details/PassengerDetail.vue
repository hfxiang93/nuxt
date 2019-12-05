<template>
  <div>
    <Goback></Goback>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix top-title">
              <span>基础信息</span>
            </div>
            <el-container>
              <el-aside width="100px"
                ><div class="headerImage">
                  <img :src="baseInfo && baseInfo.imageUrl" alt="img" /></div
              ></el-aside>
              <el-main
                ><div class="text-items">
                  <div class="item">
                    <span>性别:</span>
                    {{ baseInfo && baseInfo.gender === 1 ? '男' : '女' }}
                  </div>
                  <div class="item">
                    <span>年龄:</span> {{ baseInfo && baseInfo.age }}
                  </div>
                  <div class="item">
                    <span>FaceId:</span> {{ baseInfo && baseInfo.faceId }}
                  </div>
                  <div class="item">
                    <span>本月到访概览:</span>
                    {{ baseInfo && baseInfo.firstVisitTime }}
                  </div>
                  <div class="item">
                    <span>最近到访时间:</span>
                    {{ baseInfo && baseInfo.lastVisitTime }}
                  </div>
                  <div class="item"></div></div
              ></el-main>
            </el-container>
          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
              <span>当月到访概览</span>
              <span style="float:right;">{{ getNowTime }}</span>
            </div>
            <el-container>
              <el-aside width="100px"></el-aside>
              <el-main
                ><div class="text-items">
                  <div class="item item-right">
                    <span> 到访日均驻留时长</span>:
                    {{ (baseInfo && baseInfo.averageStayTime) || 0 }}
                  </div>
                  <div class="item item-right">
                    <span>到访日均驻留时长排名</span>:
                    {{ (baseInfo && baseInfo.averageStayTimeRanking) || 0 }}
                  </div>
                  <div class="item item-right">
                    <span>当月到访次数</span>:
                    {{ (baseInfo && baseInfo.monthVisitNum) || 0 }}
                  </div>
                  <div class="item item-right">
                    <span>当月月到访次数排名</span>:
                    {{ (baseInfo && baseInfo.monthVisitNumRanking) || 0 }}
                  </div>
                  <div class="item item-right">
                    <span>当月月共计驻留时长</span>:
                    {{ (baseInfo && baseInfo.monthTotalStayTime) || 0 }}
                  </div>
                  <div class="item item-right">
                    <span>当月共计驻留时长排名</span>:
                    {{ (baseInfo && baseInfo.monthTotalStayTimeRanking) || 0 }}
                  </div>
                </div></el-main
              >
            </el-container>
          </el-card>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="grid">
          <span class="titles">采集记录</span>
          <el-data-table ref="dataTable" v-bind="$data" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Goback from '@/components/go-back'
import {passengerDetail, collectRecordList} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
import dayjs from 'dayjs'

export default {
  components: {
    Goback: Goback,
  },
  data() {
    return {
      url: '',
      dataPath: 'payload.list',
      totalPath: 'payload.total',
      columns: [
        {type: 'index', label: '序号'},
        {
          prop: 'imageUrl',
          label: '采集图像',
          formatter: row => this.prodImgFormatte(row),
        },
        {prop: 'mallName', label: '所属卖场'},
        {prop: 'name', label: '采集设备'},
        {prop: 'location', label: '设备位置'},
        {prop: 'collectTime', label: '采集时间'},
        // {prop: 'times', label: '采集次数'},
      ],
      hasOperation: false,
      hasNew: false,
      hasDelete: false,
      faceId: this.$route.query.id, //faceId
      baseInfo: {},
      nowTime: '',
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      size: PAGE_NUMBER[0],
    }
  },
  computed: {
    // 获取当前年月
    getNowTime() {
      return dayjs(new Date().getTime()).format('YYYY-MM')
    },
  },
  mounted() {
    this.getPassengerDetail()
    this.getCollectRecordList()
  },
  methods: {
    prodImgFormatte(row) {
      const {imageUrl} = row
      return (
        <img
          src={imageUrl}
          alt="img"
          style="width:70px; height:70px; border-radius:50%"
        />
      )
    },
    // 获取客流基本信息
    getPassengerDetail() {
      this.$axios
        .$get(passengerDetail, {
          params: {
            faceId: this.faceId,
          },
        })
        .then(res => {
          if (res.code === '0') {
            this.baseInfo = hasIn(res, ['payload']) ? res.payload : {}
          }
        })
    },
    // 获取采集记录
    getCollectRecordList() {
      this.url = `${collectRecordList}?faceId=${this.faceId}`
      this.$refs.dataTable.getList()
    },
  },
}
</script>

<style lang="less" scoped>
.box-card {
  width: 96%;

  .el-card__header {
    background: #f9f9f9;
    padding: 10px 20px;
  }
}

.titles {
  font-size: 20px;
  line-height: 29px;
  font-weight: blod;
}

.grid {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
}

.headerImage {
  margin-top: 20px;

  img {
    width: 72px;
    height: 72px;
    border-radius: 50%;
  }
}

.item {
  font-size: 14px;
  line-height: 30px;
  color: #323232;

  span {
    display: inline-block;
    width: 90px;
    text-align: right;
    color: #acaab7;
    padding-right: 6px;
    font-size: 14px;
  }
}

.item-right {
  line-height: 25px;

  span {
    width: 140px;
  }
}
</style>
