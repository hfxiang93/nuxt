<template>
  <el-container>
    <div :class="{hideSidebar: collapse}" class="sidebar-container">
      <el-menu
        :collapse="collapse"
        :default-active="$route.path"
        :collapse-transition="false"
        router
        class="aside-menu"
        background-color="#2D303B"
        text-color="#FFFFFF"
      >
        <nuxt-link to="/Homeview">
          <logo class="home-logo" />
        </nuxt-link>
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <menu-item :menu-list="menuList"></menu-item>
        </el-scrollbar>

        <div class="fix-btn-wrap">
          <div class="collapse-btn" @click="collapse = !collapse">
            <img
              class="btn-icon"
              src="https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/%E5%B7%A6%E4%BE%A7%E8%8F%9C%E5%8D%95/expand.svg"
              alt="toggle-sidebar-btn"
            />
          </div>
        </div>
      </el-menu>
    </div>

    <div class="main-container">
      <div class="header-wrap">
        <el-row
          class="head-container"
          type="flex"
          justify="space-between"
          align="middle"
        >
          <el-col :span="8" class="breadcrumb-content">
            <!-- 面包屑 -->
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item>{{
                activeListArr.length > 0 ? activeListArr[0].name : ''
              }}</el-breadcrumb-item>

              <el-breadcrumb-item v-if="activeNextList.length > 0">{{
                activeNextList.length > 0 ? activeNextList[0].name : ''
              }}</el-breadcrumb-item>
              <!-- <el-breadcrumb-item
                  v-for="(item, index) in activeNameArr"
                  :class="{
                    lastItem:
                      index === activeNameArr.length - 1 &&
                      activeNameArr.length > 1
                  }"
                  :key="index"
                >{{ item }}</el-breadcrumb-item
                >-->
            </el-breadcrumb>
          </el-col>
          <el-col :span="12">
            <el-select
              v-if="isShow"
              v-model="value"
              placeholder="请选择卖场"
              @change="handleChange"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="isShow"
              v-model="value2"
              placeholder="请选择商铺"
              @change="changeStore"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="4" class="breadcrumb-content">
            <div class="head-right">
              <div class="info">
                <div class="head-active">
                  <!-- <img :src="infoImg" class="info-img" alt="info-img" /> -->
                </div>
                <!-- 用户名称 -->
                <div class="info-text">
                  消息
                </div>
              </div>
              <el-dropdown placement="bottom-end" @command="exitBtn">
                <span class="el-dropdown-link">
                  <div class="head-active">
                    <img
                      :src="userImg"
                      class="username-img"
                      alt="username-img"
                    />
                  </div>
                  <!-- 用户名称 -->
                  <div class="username-text">
                    <!-- {{ $store.state.user.nickname }} -->
                    滴普科技
                  </div>
                  <i
                    class="el-icon-arrow-down el-icon--right set-Iconcolor"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="user-drop-menu">
                  <el-dropdown-item
                    v-for="(item, index) in dropdownList"
                    :key="index"
                    :command="item.command"
                    >{{ item.title }}</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-main class="nuxt-main">
        <nuxt></nuxt>
      </el-main>
      <el-footer>
        <copyright></copyright>
      </el-footer>
    </div>
  </el-container>
</template>

<script>
import Copyright from '@/components/copyright.vue'
import {mapState} from 'vuex'
import MenuItem from '@/components/menu-item.vue'
import IconFont from '@/components/icon-font.vue'
import {Scrollbar} from 'element-ui'
import Logo from '@/components/logo.vue'
import {pageMall, pagStore} from '@/const/api'
import {hasIn} from 'lodash'
export default {
  components: {
    Copyright,
    MenuItem,
    ElScrollbar: Scrollbar,
    Logo,
  },
  data() {
    return {
      collapse: false,
      dropdownList: [
        {
          title: '退出',
          command: 'exit',
        },
      ],
      options: [],
      value: null,
      options2: [],
      value2: '',
      isShow: true,
      activeListArr: [],
      activeNextList: [],
    }
  },
  computed: {
    ...mapState(['menuList', 'activeNameArr']),
    userImg() {
      return (
        this.$store.state.user.avatar ||
        'https://deepexi.oss-cn-shenzhen.aliyuncs.com/xpaas-console/user-portrait.png'
      )
    },
    // infoImg(){
    //   return('../assets/imgs/market.svg')
    // }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
      this.showSelect()
    },
  },
  created() {
    this.showSelect()
    this.getBreadcrumb()
    this.getMallList()
    this.getStoreList()
    eventBus.$on('storeUpdate', () => {
      setTimeout(() => {
        this.getStoreList()
      }, 0)
    })
    eventBus.$on('storeAdd', () => {
      setTimeout(() => {
        this.getStoreList()
      }, 0)
    })
    eventBus.$on('storeDelete', () => {
      setTimeout(() => {
        this.getStoreList()
      }, 0)
    })
    eventBus.$on('mallUpdate', () => {
      setTimeout(() => {
        this.getMallList()
      }, 0)
    })
    eventBus.$on('mallAdd', () => {
      setTimeout(() => {
        this.getMallList()
      }, 0)
    })
    eventBus.$on('mallDelete', () => {
      setTimeout(() => {
        this.getMallList()
      }, 0)
    })
  },
  mounted() {},
  methods: {
    // 是否显示卖场商铺选择框
    showSelect() {
      if (this.$route.path.indexOf('BasicConfiguration') > -1) {
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
    // 获取卖场列表
    getMallList() {
      this.$axios.get(`${pageMall}?page=1&size=''`).then(res => {
        if (!Number(res.code)) {
          // this.tableData = hasIn(res, ['data', 'payload','storeList']) ? res.data.payload.storeList: []
          let data = hasIn(res, ['data', 'payload', 'list'])
            ? res.data.payload.list
            : []
          let finalData = []
          for (let index = 0; index < data.length; index++) {
            let obj = {}
            obj.label = data[index].name
            obj.value = data[index].id
            finalData.push(obj)
          }
          this.options = finalData
          this.value = data[0].id
          this.$store.commit('update', {mallId: data[0].id})
          this.$store.commit('update', {mallName: data[0].name})
          // this.$store.dispatch('gitRelation')
        }
      })
    },
    // 获取商铺列表
    getStoreList() {
      this.$axios.get(`${pagStore}?page=1&size=''`).then(res => {
        if (!Number(res.code)) {
          // this.tableData = hasIn(res, ['data', 'payload','storeList']) ? res.data.payload.storeList: []
          let data = hasIn(res, ['data', 'payload', 'list'])
            ? res.data.payload.list
            : []
          let finalData = []
          for (let index = 0; index < data.length; index++) {
            let obj = {}
            obj.label = data[index].name
            obj.value = data[index].id
            finalData.push(obj)
          }
          finalData.unshift({label: '全部商铺', value: ''})
          this.options2 = finalData
          // this.$store.dispatch('gitRelation')
          //  this.$store.commit('update', {storeId: data[0].id})
        }
      })
    },
    exitBtn(key, keyPath) {
      if (key == 'exit') {
        this.$store.commit('logout')
      }
    },
    // 商铺选择
    changeStore(value) {
      let url = window.location.hash
      eventBus.$emit('storeChange', url)
      this.$store.commit('update', {storeId: value || ''})
    },
    // 卖场选择
    handleChange(value) {
      this.getStoreList()
      let url = window.location.hash
      /**eventBus.$emit()在卖场变更时设置，在对应的其他组件中 eventBus.$on()去监听 url为参数，
       *判断eventBus.$on()监听的是否为当前页面，如果为当前页面则当前页面的数据相应的更新，很多页面都用到了这个
       */

      eventBus.$emit('mallChange', url)
      this.$store.commit('update', {mallId: value || '1'})
      let mallName = this.options.filter(item => {
        return item.value === value
      })
      let newMallName = mallName && mallName[0] && mallName[0].label
      this.$store.commit('update', {mallName: newMallName})
      this.$store.dispatch('gitRelation')
    },
    //TODO:动态面包屑先暂时这样处理以后改善吧，写得脑壳疼啊，需要添加导航功能
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      let data = this.menuList.filter(item => {
        return !item.children
          ? item.url === matched[0].path
          : item.children.find(c => c.url === matched[0].path)
      })
      let cData = []
      if (data[0] && data[0].children) {
        cData = data[0].children
      }
      let fData = cData.filter(item => {
        return item.url === matched[0].path
      })
      this.activeListArr = data
      this.activeNextList = fData
    },
  },
}
</script>

<style lang="less">
#__nuxt {
  .el-icon-sort {
    transform: rotate(-90deg);
  }

  .el-breadcrumb__item {
    font-size: 16px;
    font-weight: bold;
  }

  // dropdown
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }

  .header-wrap {
    height: 60px;
    padding: 0 24px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    background: #fff;

    .head-container {
      height: 100%;
    }

    .head-right {
      margin-right: 10px;
      display: -webkit-box;

      .info {
        display: flex;
        align-items: center;

        .head-active {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin: 0 8px;
          background: url('../assets/imgs/bells.svg') no-repeat center center;
          background-size: 100% 100%;

          .info-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 15px;

            .info-text {
              text-align: center;
              overflow: hidden;
              margin-right: 10px;
              color: rgba(0, 0, 0, 0.65);
            }
          }
        }
      }

      .el-dropdown-link {
        display: flex;
        align-items: center;

        .head-active {
          .username-img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin: 0 15px;
          }
        }

        .username-text {
          text-align: center;
          overflow: hidden;
          margin-right: 10px;
          color: rgba(0, 0, 0, 0.65);
        }
      }

      .head-search {
        .set-search {
          margin-right: 5px;
        }

        .head-autocomplete {
          .el-icon-search {
            cursor: pointer;
            font-size: 18px;
          }
        }

        .el-dropdown-link {
          font-size: 18px;
          color: #a2a2b1 !important;
        }
      }

      .head-message {
        margin: 0 30px 0 20px;

        .item {
          .set-IconSize {
            height: 100%;
            max-width: 100%;
          }
        }
      }
    }
  }

  // main
  .nuxt-main {
    padding: 20px;
    background: #f4f4f4;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .main-container {
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
    flex: 1;
  }

  .sidebar-container {
    transition: width 0.28s;
    width: 200px !important;
    height: 100vh;
    overflow: hidden;
    box-shadow: 1px 0 6px rgba(0, 21, 41, 0.35);

    //reset element-ui css
    .horizontal-collapse-transition {
      transition: 0s width ease-in-out, 0s padding-left ease-in-out,
        0s padding-right ease-in-out;
    }

    .home-logo {
      position: relative;
      height: 60px;
      line-height: 60px;
      padding: 0 10px;
      color: #fff;
      font-size: 20px;
      font-weight: 400;
    }

    .scrollbar-wrapper {
      height: calc(100vh - 110px);
      overflow-x: hidden !important;
      margin-bottom: 0 !important;

      .el-scrollbar__view {
        height: 100%;
      }
    }

    .el-scrollbar__bar.is-vertical {
      right: 0;
    }

    .is-horizontal {
      display: none;
    }

    .el-menu {
      border: none;
      height: 100%;
      width: 100% !important;

      .item-title {
        position: relative;

        &::before {
          content: '';
          display: inline-block;
          position: absolute;
          top: 50%;
          left: -12px;
          transform: translateY(-50%);
          bottom: 0;
          width: 5px;
          height: 5px;
          background: rgba(171, 172, 176, 1);
          border-radius: 1px;
        }
      }

      .el-menu-item {
        &.is-active {
          .item-title {
            &::before {
              width: 5px;
              height: 16px;
              background-color: #5d81f9;
              border-radius: 15px;
            }
          }
        }
      }

      [class*='icon'] {
        font-size: 14px;
        margin-right: 5px;
      }
    }

    .fix-btn-wrap {
      height: 50px;

      .collapse-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 100%;
        background: #343744;
        cursor: pointer;
      }

      .btn-icon {
        transform: rotate(180deg);
        font-size: 16px;
        width: 16px;
      }
    }

    // 折叠
    &.hideSidebar {
      width: 64px !important;

      .logo {
        padding-left: 13px;
      }

      .scrollbar-wrapper {
        height: calc(100vh - 60px - 50px);
      }

      .el-submenu__title {
        text-align: center;
      }

      // 有子菜单
      .sub-menu-title,
      .el-submenu__icon-arrow {
        display: none;
      }

      [class*='icon'] {
        font-size: 16px;
        margin: 0;
      }

      .fix-btn-wrap {
        .btn-icon {
          transform: rotate(0deg);
        }
      }
    }

    // when menu collapsed
    .menu--vertical {
      // the scroll bar appears when the subMenu is too long
      > .menu--popup {
        max-height: 100vh;
        overflow-y: auto;

        &::-webkit-scrollbar {
          width: 6px;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 20px;
        }
      }
    }
  }
}
</style>
