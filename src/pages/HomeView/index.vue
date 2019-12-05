<template>
  <div class="container">
    <!-- <h2 class="title">客流概览</h2> -->
    <div class="top-header">
      <h1>{{ mallName || '' }}客流分析</h1>
      <div class="time">更新时间：{{ getNowTime }}</div>
    </div>
    <div
      v-loading="curdayLoading"
      class="top-content"
      element-loading-text="拼命加载中"
    >
      <div class="top-title">
        <div>
          <span>入口位置：</span>
          <span>{{ deviceName }}</span>
        </div>
        <div class="center-title">
          <span>当日入场时间：</span>
          <span>{{ lastVisitTime }}</span>
        </div>
        <div class="right-title">
          <span>标签：</span>
          <span v-if="userId === null" class="tag">非会员</span>
          <span v-if="isNewVisitor === 1" class="tag">新增访客</span>
          <span v-if="userId !== null" class="tag">会员</span>
          <span v-if="isNewVisitor === 2" class="tag">回访访客</span>
        </div>
      </div>
      <div class="avatar-bg">
        <div class="cycle"></div>
        <div class="cycleOne"></div>
        <div class="cycleTwo"></div>
        <div class="cycleThree"></div>
        <div
          v-for="(item, index) in passengerList"
          :style="{left: left(index), top: top(index)}"
          :class="index === 0 ? 'avatar-center' : 'avatar'"
          :key="item.id"
        >
          <a @click="handleToJump(item.faceId)"
            ><img :src="item.imageUrl" :alt="item.id" class="img" fit="cover" />
            <div
              style="height:100px; overflow:hidden; position: relative; top: -40px; left: 0;"
            >
              <span v-if="index === 0" class="name"
                >{{ item.age }}岁
                <a :class="item.gender === 1 ? 'man' : 'woman'"></a
              ></span>
            </div>
            <div v-if="index === 0 && userId !== null" class="vip"></div>
          </a>
        </div>
      </div>
      <div class="info">
        <div @click="handleClick('all')">
          <p>
            当日总客流(人)
            <el-tooltip
              effect="dark"
              content="当日日总客流人数"
              placement="bottom"
            >
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </p>
          <h1>{{ (baseInfo && baseInfo.passengerNum) || 0 }}</h1>
          <i class="el-icon-arrow-right jump"></i>
        </div>
        <div @click="handleClick('new')">
          <p>
            当日新增访客(人)
            <el-tooltip
              effect="dark"
              content="当日新增访客人数"
              placement="bottom"
            >
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </p>
          <h1>{{ (baseInfo && baseInfo.passengerNewNum) || 0 }}</h1>
          <i class="el-icon-arrow-right jump"></i>
        </div>
        <div @click="handleClick('old')">
          <p>
            当日回访客数(人)
            <el-tooltip effect="dark" content="当日回访客数" placement="bottom">
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </p>
          <h1>{{ (baseInfo && baseInfo.passengerOldNum) || 0 }}</h1>
          <i class="el-icon-arrow-right jump"></i>
        </div>
        <div @click="handleClick('onlyVisit')">
          <p>
            当日场内访客(人)
            <el-tooltip
              effect="dark"
              content="当日场内访客数量"
              placement="bottom"
            >
              <i class="el-icon-question icon"></i>
            </el-tooltip>
          </p>
          <h1>{{ (baseInfo && baseInfo.hisPassengerNum) || 0 }}</h1>
          <i class="el-icon-arrow-right jump"></i>
        </div>
      </div>
    </div>
    <div class="graph-content">
      <h2>客流相关报表</h2>
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
    <div class="graph-content">
      <div class="left">
        <!-- 当日人流量实时分布 -->
        <PeopleCount
          :type-id="peopleID"
          :head-title="peopleTitle"
          :chart-data="peopleData"
          :fields="fields"
        />
      </div>
      <div class="right">
        <!-- 各设备实时客流Top5 -->
        <SeviceCount
          :type-id="seviceID"
          :head-title="seviceTitle"
          :color="typeColor"
          :chart-data="seviceData"
        />
      </div>
    </div>
    <div class="graph-content">
      <h2>运营相关报表</h2>
      <div class="left">
        <!-- 会员成交率 -->
        <Finish
          :type-id="vfinishID"
          :head-title="vfinishTitle"
          :chart-data="vfinishData"
        />
      </div>
      <div class="right">
        <!-- 客流占比 -->
        <SexCount
          :type-id="vipId"
          :head-title="vipTitle"
          :color="typeVipColor"
          :chart-data="vipData"
        />
      </div>
    </div>
    <div class="graph-content">
      <div class="left left-49">
        <!-- 成交率 -->
        <Finish
          :type-id="finishID"
          :head-title="finishTitle"
          :chart-data="finishData"
        />
      </div>
      <div class="right right-49">
        <!-- 订单数 -->
        <SaleCount
          :type-id="countID"
          :head-title="countTitle"
          :chart-data="saleData"
        />
      </div>
    </div>
    <div class="graph-content">
      <div class="left left-49">
        <!-- 销售额 -->
        <SaleCount
          :type-id="saleID"
          :head-title="saleTitle"
          :chart-data="saleData"
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

    <!-- 当日访客到访次数排行TOP10 -->
    <div class="table">
      <h1>当日访客到访次数排行 Top10</h1>
      <i class="el-icon-download download"></i>
      <el-data-table
        ref="dataTable"
        :url="url"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="false"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="10"
        v-bind="$data"
        :data-path="dataPath"
      />
    </div>
  </div>
</template>
<script>
import AgeCount from '@/components/common/AgeCount'
import SaleCount from '@/components/common/SaleCount'
import SexCount from '@/components/common/SexCount'
import Finish from '@/components/common/Finish'
import PeopleCount from '@/components/common/peopleCount'
import SeviceCount from '@/components/common/SeviceCount'
import {hasIn} from 'lodash'
import {formatDate} from '@/const/filter'
import {mapState} from 'vuex'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {finishData, saleData, vfinishData} from './const'
import {
  curDayDetail,
  ageInfo,
  sexInfo,
  vipInfo,
  deviceInfo,
  visitInfo,
  realInfo,
} from '@/const/api'
export default {
  components: {AgeCount, SexCount, PeopleCount, SeviceCount, Finish, SaleCount},
  data() {
    return {
      curdayLoading: false,
      getNowTime: formatDate(new Date().getTime()),
      // 年龄统计数据
      typeID: 'age',
      typeColor: ['#ee5858', '#419eff'],
      typeData: [],
      typeTitle: '年龄统计',
      ageFields: [],
      // 性别分布数据
      sexID: 'sex',
      sexTitle: '性别分布',
      sexData: [],
      // 当日人流量实时分布数据
      peopleID: 'people',
      peopleTitle: '当日场内客流实时趋势',
      peopleData: [],
      fields: ['人数'],
      // 设备实时客流数据
      seviceID: 'sevice',
      seviceTitle: '各设备实时客流 Top5',
      seviceData: [],
      // 成交率数据
      finishID: 'finish',
      finishTitle: '成交率',
      // 会员成交率数据
      vfinishID: 'vfinish',
      vfinishTitle: '会员成交率',
      finishData: [],
      vfinishData: [],
      // 销售额数据
      saleID: 'sale',
      saleTitle: '销售额',
      saleData,
      // 客流占比数据
      vipId: 'vip',
      vipTitle: '客流占比',
      typeVipColor: ['#FFC474', '#6ED8F6'],
      vipData: [],
      // 订单数数据
      countID: 'pay',
      countTitle: '订单数',
      // 客单价数据
      priceID: 'price',
      priceTitle: '客单价',
      baseInfo: {},
      url: '',
      columns: [
        {type: 'index', label: '排名'},
        {prop: 'faceId', label: 'faceId'},
        {
          prop: 'imageUrl',
          label: '头像',
          formatter: row => this.prodImgFormate(row),
        },
        {
          prop: 'gender',
          label: '性别',
          formatter: row => (row.gender === 1 ? '男' : '女'),
        },
        {prop: 'age', label: '年龄'},
        {prop: 'firstVisitTime', label: '最早到访时间'},
        {prop: 'lastLeaveTime', label: '最晚离开时间'},
        {prop: 'totalStayTime', label: '当日驻留时长'},
        {prop: 'visitNum', label: '当日到店次数'},
      ],
      dataPath: '',
      passengerList: [],
      deviceName: '',
      lastVisitTime: '',
      isNewVisitor: null,
      userId: null,
      clearTime1: null,
      clearTime2: null,
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
      this.value = val
    },
  },
  // computed: {
  //   // 获取当前时间
  //   getNowTime() {
  //     return formatDate(new Date().getTime())
  //   },
  // },
  created() {
    this.getCurDayDetail()
    this.getData()
    this.getDatas()
    this.getAgeInfo()
    this.getSexInfo()
    this.getVipInfo()
    this.getRealInfo()
    this.getDeviceTop()
    this.getVisitTop()
    this.getVfinishData()
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/HomeView'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getCurDayDetail()
          this.getAgeInfo()
          this.getSexInfo()
          this.getVipInfo()
          this.getRealInfo()
          this.getDeviceTop()
          this.getVisitTop()
          this.getVfinishData()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/HomeView'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getCurDayDetail()
          this.getAgeInfo()
          this.getSexInfo()
          this.getVipInfo()
          this.getRealInfo()
          this.getDeviceTop()
          this.getVisitTop()
          this.getVfinishData()
        }, 0)
      }
    })
  },
  destroyed() {
    clearInterval(this.clearTime1)
    clearInterval(this.clearTime2)
  },
  methods: {
    getData() {
      this.clearTime1 = setInterval(() => {
        this.getCurDayDetail()
      }, 10 * 1000)
    },
    getDatas() {
      this.clearTime2 = setInterval(() => {
        this.getAgeInfo()
        this.getSexInfo()
        this.getVipInfo()
        this.getRealInfo()
        this.getDeviceTop()
        this.getVisitTop()
        this.getVfinishData()
      }, 60 * 1000)
    },
    handleToJump(id = 123) {
      this.$router.push({
        path: '/Details/PassengerDetail',
        query: {
          id,
        },
      })
    },
    // 首页各人脸图片左偏移
    left(index) {
      if (index === 0) {
        return '50%'
      } else if (index === 1) {
        return '15%'
      } else if (index === 2) {
        return '5%'
      } else if (index === 3) {
        return '25%'
      } else if (index === 4) {
        return '30%'
      } else if (index === 5) {
        return '60%'
      } else if (index === 6) {
        return '45%'
      } else if (index === 7) {
        return '85%'
      } else if (index === 8) {
        return '75%'
      } else if (index === 9) {
        return '75%'
      } else {
        return '60%'
      }
    },
    // 各人脸头像上偏移
    top(index) {
      if (index === 0) {
        return '50%'
      } else if (index === 1) {
        return '50%'
      } else if (index === 2) {
        return '10%'
      } else if (index === 3) {
        return '20%'
      } else if (index === 4) {
        return '60%'
      } else if (index === 5) {
        return '20%'
      } else if (index === 6) {
        return '65%'
      } else if (index === 7) {
        return '20%'
      } else if (index === 8) {
        return '30%'
      } else if (index === 9) {
        return '75%'
      } else {
        return '60%'
      }
    },
    getVfinishData() {
      this.$nextTick(() => {
        this.vfinishData = vfinishData
        this.finishData = finishData
      })
    },
    // 表格中展示图片
    prodImgFormate(row) {
      const {imageUrl} = row
      return <img src={imageUrl} alt="img" style="width:70px; height:70px;" />
    },
    // 获取概览详情
    getCurDayDetail() {
      // this.curdayLoading = true
      this.getNowTime = formatDate(new Date().getTime())
      this.$axios
        .$get(curDayDetail, {
          params: {
            size: 11,
          },
        })
        .then(res => {
          this.curdayLoading = false
          if (res.code === '0') {
            this.baseInfo = hasIn(res, ['payload']) ? res.payload : {}
          }
          //头像显示正在做呀
          this.passengerList = hasIn(res, ['payload', 'passengerList'])
            ? res.payload.passengerList
            : []
          // const list = hasIn(res, ['payload', 'passengerList'])
          //   ? res.payload.passengerList
          //   : []
          //   this.passengerList = []
          //   let time = 0
          //   list.map((item)=>{
          //     setTimeout(()=>{this.passengerList.push(item)},time)
          //     time += 100
          //   })
          this.lastVisitTime = hasIn(res, ['payload', 'passengerList'])
            ? res.payload.passengerList[0] &&
              res.payload.passengerList[0].lastVisitTime
            : ''
          this.lastVisitTime = formatDate(this.lastVisitTime, 'HH:mm:ss')
          this.deviceName = hasIn(res, ['payload', 'passengerList'])
            ? res.payload.passengerList[0] &&
              res.payload.passengerList[0].deviceName
            : ''
          this.isNewVisitor = hasIn(res, ['payload', 'passengerList'])
            ? res.payload.passengerList[0] &&
              res.payload.passengerList[0].isNewVisitor
            : ''
          this.userId = hasIn(res, ['payload', 'passengerList'])
            ? res.payload.passengerList[0] &&
              res.payload.passengerList[0].userId
            : ''
        })
        .catch(err => {
          this.curdayLoading = false
        })
    },
    // 获取年龄分布数据
    getAgeInfo() {
      this.$axios.$get(ageInfo).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload', 'ageList'])
            ? res.payload.ageList
            : []
          if (data && data.length > 0) {
            this.ageFields = data.map(item => {
              return item.ageInterval
            })
            let finalData = []
            const femaleObj = {}
            const maleObj = {}
            for (let index = 0; index < data.length; index++) {
              femaleObj[data[index].ageInterval] =
                data[index].passengerFemaleNum
              maleObj[data[index].ageInterval] = data[index].passengerMaleNum
            }
            femaleObj.name = '女'
            maleObj.name = '男'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.typeData = finalData
          } else {
            this.typeData = []
            this.ageFields = []
          }
        }
      })
    },
    // 获取性别分布数据
    getSexInfo() {
      this.$axios.$get(sexInfo).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload']) ? res.payload : {}
          if (data) {
            let femaleObj = {}
            let maleObj = {}
            let finalData = []
            femaleObj.percent =
              data.passengerFemaleNum /
              (data.passengerFemaleNum + data.passengerMaleNum)
            femaleObj.type = '女'
            maleObj.percent =
              data.passengerMaleNum /
              (data.passengerFemaleNum + data.passengerMaleNum)
            maleObj.type = '男'
            finalData.push(femaleObj)
            finalData.push(maleObj)
            this.sexData = finalData
          } else {
            this.$nextTick(() => {
              this.sexData = []
            })
          }
        }
      })
    },
    // 获取会员分布
    getVipInfo() {
      this.$axios.$get(vipInfo).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload']) ? res.payload : {}
          if (data) {
            let vipObj = {}
            let noVipObject = {}
            let finalData = []
            vipObj.percent =
              data.memberNum / (data.memberNum + data.nonMemberNum)
            vipObj.type = '会员'
            noVipObject.percent =
              data.nonMemberNum / (data.memberNum + data.nonMemberNum)
            vipObj.type = '会员'
            noVipObject.type = '非会员'
            finalData.push(vipObj)
            finalData.push(noVipObject)
            this.vipData = finalData
          } else {
            this.vipData = []
          }
        }
      })
    },
    //当日人流量实时分布
    getRealInfo() {
      this.$axios.$get(realInfo).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload', 'realTimeList'])
            ? res.payload.realTimeList
            : []
          let finalData = []
          for (let index = 0; index < data.length; index++) {
            let obj = {}
            obj.time = data[index].timeShareInterval
            obj['人数'] = data[index].passengerNum
            finalData.push(obj)
          }
          this.peopleData = finalData
        }
      })
    },
    //当日各设备实时客流 Top 排名
    getDeviceTop() {
      this.$axios
        .$get(deviceInfo, {
          params: {
            size: 5,
          },
        })
        .then(res => {
          if (res.code === '0') {
            const data = hasIn(res, ['payload', 'deviceList'])
              ? res.payload.deviceList
              : []

            if (data && data.length > 0) {
              let finalData = []
              for (let index = 0; index < data.length; index++) {
                let obj = {}
                obj.State = data[index].name
                obj['男'] = data[index].passengerMaleNum
                obj['女'] = data[index].passengerFemaleNum
                finalData.push(obj)
              }
              this.seviceData = finalData
            } else {
              this.seviceData = []
            }
          }
        })
    },
    // 当日访客到访次数排行 Top10
    getVisitTop() {
      this.url = `${visitInfo}`
      this.dataPath = 'payload.visitList'
    },
    /**
     * 跳转客流记录并初始化客流属性筛选条件
     * @param(type)  有4种 all new old onlyVist
     * 对应全部客流、新增访客、回访访客、当日场内访客
     */
    handleClick(type) {
      this.$router.push({
        path: '/Details/PassengerFlowQuery',
        query: {
          type,
        },
      })
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
    }
  }

  .top-content {
    background: #fff;

    .top-title {
      display: flex;
      background: #f6faff;
      padding: 10px 20px;

      .right-title {
        text-align: right;
      }

      .center-title {
        text-align: center;
      }

      & > div {
        flex: 1;

        span:last-child {
          font-weight: bold;
        }

        .tag {
          display: inline-block;
          font-weight: bold;
          color: #157dff;
          width: 70px;
          height: 20px;
          border-radius: 20px;
          border: 1px solid #157dff;
          font-size: 12px;
          text-align: center;
        }
      }
    }

    .avatar-bg {
      position: relative;
      width: 100%;
      height: 400px;
      overflow: hidden;
      // background: #fff url(../../assets/imgs/bj.png) no-repeat center center;
      .cycle {
        position: absolute;
        width: 280px;
        height: 280px;
        left: 50%;
        top: 50%;
        opacity: 0.6;
        border: 1px solid rgba(197, 197, 197, 1);
        border-radius: 50%;
        margin-top: -195px;
        margin-left: -152px;
      }

      .cycleOne {
        position: absolute;
        width: 480px;
        height: 480px;
        left: 50%;
        top: 50%;
        opacity: 0.6;
        border: 1px solid rgba(197, 197, 197, 1);
        border-radius: 50%;
        margin-top: -295px;
        margin-left: -252px;
      }

      .cycleTwo {
        position: absolute;
        width: 780px;
        height: 780px;
        left: 50%;
        top: 50%;
        opacity: 0.4;
        border: 1px solid rgba(197, 197, 197, 1);
        border-radius: 50%;
        margin-top: -450px;
        margin-left: -400px;
      }

      .cycleThree {
        position: absolute;
        width: 1080px;
        height: 1080px;
        left: 50%;
        top: 50%;
        opacity: 0.3;
        border: 1px solid rgba(197, 197, 197, 1);
        border-radius: 50%;
        margin-top: -600px;
        margin-left: -552px;
      }

      .avatar-center {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 210px;
        margin-top: -160px;
        margin-left: -115px;

        .img {
          height: 210px;
          width: 210px;
          border-radius: 50%;
        }

        .name {
          position: relative;
          top: -80px;
          left: 0;
          display: inline-block;
          // background:rgba(35,165,255,0.4);
          background:
            linear-gradient(
              141deg,
              rgba(35, 165, 255, 0.4) 0%,
              rgba(15, 108, 255, 0.4) 100%,
              rgba(15, 108, 255, 0.4) 100%
            );
          width: 210px;
          height: 115px;
          text-align: center;
          color: #157dff;
          font-size: 16px;
          line-height: 190px;
          border-radius: 0 0 115px 115px;

          a {
            position: relative;
            top: 1px;
            display: inline-block;
            width: 20px;
            height: 20px;
          }

          .man {
            background: url(../../assets/imgs/man.svg) no-repeat center center;
          }

          .woman {
            background: url(../../assets/imgs/woman.svg) no-repeat center center;
          }
        }

        .vip {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 30px;
          height: 30px;
          border-radius: 100%;
          background: url(../../assets/imgs/vip.svg) no-repeat center center;
        }
      }

      .avatar {
        position: absolute;
        width: 94px;
        height: 94px;
        border-radius: 50%;
        opacity: 0.8;

        .img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          // height: 100%;
        }
      }
    }

    .info {
      display: flex;

      & > div {
        flex: 1;
        padding: 20px;
        cursor: pointer;
        position: relative;

        p {
          font-size: 14px;
        }

        .jump {
          font-size: 20px;
          position: absolute;
          top: 50px;
          left: 200px;
        }

        h1 {
          font-size: 30px;
        }
      }
    }
  }

  .graph-content {
    clear: both;
    margin-top: 20px;
    overflow: hidden;

    h2 {
      margin-bottom: 10px;
    }

    .left {
      float: left;
      width: 61%;
    }

    .right {
      width: 37%;
      float: right;
    }

    .left-49 {
      width: 49%;
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

    // .avatar {
    //   width: 24px;
    //   height: 24px;

    //   img {
    //     width: 100%;
    //   }
    // }

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
