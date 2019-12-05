import cookie from 'js-cookie'
import cookieKeys from '@/const/cookie-keys'
import {getGeginAndFloor} from '@/const/api'
import {hasIn} from 'lodash'
const cookiePath = process.env.COOKIE_PATH
// 最好提前在你的 store 中初始化好所有所需属性
// https://vuex.vuejs.org/zh-cn/mutations.html
export const state = () => ({
  // 这两个用于client side的使用, 又放cookie里是为了刷新时状态不丢失
  userId: '1234',
  token: 'a',
  tenantId: '2345678',
  tenantCode: '',
  activeNameArr: [], // 路由守卫根据id计算出来的地址，用于面包屑
  meta: {},
  mallId: '1',
  mallName: '湾畔花园一期',
  storeId: '',
  user: {nickname: '滴普科技'},
  finalAreaData: [],
  finalFloorData: [],
  menuList: [
    {
      key: '1',
      name: '客流概览',
      url: '/HomeView',
    },
    {
      key: '2',
      name: '客流分析',
      // url:'/DailyWeeklyMonthlyReport',
      children: [
        {
          key: '2-1',
          name: '日周月报',
          url: '/Analysis/DailyWeeklyMonthlyReport',
        },
        {
          key: '2-2',
          name: '同比环比',
          url: '/Analysis/ChainRatio',
        },
        {
          key: '2-3',
          name: '其他报表',
          url: '/Analysis/PassengerFlowStatistics',
        },

        // {
        //   key: '2-4',
        //   name: '卖场对比',
        //   url: '/Analysis/ComparisonStores',
        // },
      ],
    },
    {
      key: '3',
      name: '商铺客流',
      children: [
        {
          key: '3-1',
          name: '客流排名',
          url: '/ShopPassengerFlow/PassengerRank',
        },
        {
          key: '3-2',
          name: '客流对比',
          url: '/ShopPassengerFlow/PassengerCompare',
        },
      ],
    },
    {
      key: '4',
      name: '客流记录',
      // url:'/',
      children: [
        {
          key: '4-1',
          name: '客流记录',
          url: '/Details/PassengerFlowQuery',
        },
        // {
        //   key: '4-2',
        //   name: '访客详情',
        //   url: '/Details/VisitorDetails',
        // },
      ],
    },
    {
      key: '5',
      name: '基础设置',
      // url:'/'
      children: [
        {
          key: '5-1',
          name: '卖场管理',
          url: '/BasicConfiguration/StoreManagement',
        },
        {
          key: '5-2',
          name: '商铺管理',
          url: '/BasicConfiguration/RegionalManagement',
        },
        {
          key: '5-3',
          name: '设备管理',
          url: '/BasicConfiguration/DeviceManagement',
        },
        {
          key: '5-4',
          name: '参数设置',
          url: '/BasicConfiguration/ParameterSetting',
        },
        {
          key: '5-5',
          name: '角色管理',
          url: '/BasicConfiguration/RoleManagement',
        },
        {
          key: '5-6',
          name: '人员设置',
          url: '/BasicConfiguration/PersonnelManagement',
        },
        {
          key: '5-7',
          name: '账号管理',
          url: '/BasicConfiguration/AccountManagement',
        },
      ],
    },
  ],
  permission: {},
})

//  mutation 必须同步执行
export const mutations = {
  login(state, payload) {
    // 部署不一定是在根路径, 所以cookie要设置path
    cookieKeys.forEach(key => {
      state[key] = payload[key]
      cookie.set(key, payload[key], {
        path: cookiePath,
      })
    })
  },

  logout(state) {
    cookieKeys.forEach(key => {
      state[key] = ''
      cookie.remove(key, {
        path: cookiePath,
      })
    })
    this.$router.replace('/login')
  },

  update(state, payload) {
    Object.keys(payload).forEach(k => {
      state[k] = payload[k]
    })
  },
}

// Action 提交的是 mutation，而不是直接变更状态
// Action 可以包含任意异步操作
export const actions = {
  //获取关联关系
  gitRelation({commit}) {
    this.$axios.$get(getGeginAndFloor).then(res => {
      if (res.code === '0') {
        let relationData = hasIn(res, ['payload']) ? res.payload : []
        // 获取关联区域
        let areaData = relationData.regin
        let finalAreaData = []
        for (let index = 0; index < areaData.length; index++) {
          let obj = {}
          obj.label = areaData[index].name
          obj.value = areaData[index].id
          finalAreaData.push(obj)
        }
        finalAreaData.unshift({
          label: '全部区域',
          value: '',
        })
        commit('update', {finalAreaData: finalAreaData || []})
        // this.$refs.ruleForm.setOptions('regionId',finalData)
        // 获取关联区域
        let floorData = relationData.floor
        let finalFloorData = []
        for (let index = 0; index < floorData.length; index++) {
          let obj = {}
          obj.label = floorData[index].name
          obj.value = floorData[index].id
          finalFloorData.push(obj)
        }
        finalFloorData.unshift({
          label: '全部楼层',
          value: '',
        })
        commit('update', {finalFloorData: finalFloorData || []})
        // this.$refs.ruleForm.setOptions('floorId',finalFloorData)
      }
    })
  },
  async login(context, payload) {
    // store 对象
    let {commit, state, dispatch} = context

    let resp = await this.$axios.$post(
      `http://121.40.142.243/mock/24/user-center/deepexi-tenant/api/v1/tenants/login`,
      payload,
    )

    const userDetail = {...resp.payload}
    userDetail.userId = userDetail.id
    commit('login', userDetail)

    dispatch('fetchUserAndMenuList')
  },

  async fetchUserAndMenuList({commit}) {
    let user = await this.$axios.$get(
      `http://121.40.142.243/mock/24/user-center/deepexi-permission/api/v2/apps/service/userResource`,
    )
    commit('update', {user: user.payload || {}})

    let menuResources = await this.$axios.$get(
      `http://121.40.142.243/mock/24/user-center/security/api/v1/users/48FAD804068A423FB836939B11460D07/menuResources`,
    )
    if (menuResources && menuResources.payload) {
      commit('update', {
        menuList: menuResources.payload,
      })
    }
  },
}
