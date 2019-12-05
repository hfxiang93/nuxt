<template>
  <div class="container">
    <!-- <h1>客流记录</h1> -->
    <div v-loading="loading" class="flowquery">
      <div class="top-header">
        <el-form-renderer
          ref="ruleForm"
          :content="content"
          label-width="100px"
          inline
        >
          <el-form-item>
            <el-button
              type="primary"
              class="searchbutton"
              @click="submitForm('ruleForm')"
              >查询</el-button
            >
            <el-button class="searchbutton" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form-renderer>
      </div>
      <div v-if="dataList.length !== 0" class="card-box">
        <Cards :info="dataList" />
        <el-pagination
          :current-page="page"
          :page-size="size"
          :page-sizes="PAGE_NUMBER"
          :layout="PAGINATION_LAYOUT"
          :total="total"
          class="page-box"
          align="right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div v-else style="text-align:center; font-size:24px;">暂无数据...</div>
    </div>
  </div>
</template>

<script>
import Cards from './components/cards'
import {passengerQuery, relationMall, getGeginAndFloor} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
import {formatDate} from '@/const/filter'
export default {
  components: {
    Cards: Cards,
  },
  data() {
    return {
      loading: false,
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      size: PAGE_NUMBER[0],
      total: 0,
      page: 1,
      dataList: [],
      content: [
        {
          type: 'select',
          id: 'passengerType',
          label: '客流属性',
          default: this.$route.query.type || 'all',
          options: [
            {
              label: '全部客流',
              value: 'all',
            },
            {
              label: '到访未离开',
              value: 'onlyVisit',
            },
            {
              label: '未到访离开',
              value: 'onlyLeave',
            },
            {
              label: '新增客流',
              value: 'new',
            },

            {
              label: '回访客流',
              value: 'old',
            },
          ],
          el: {
            size: 'medium',
          },
          on: {
            change: this.handleChange,
          },
        },
        {
          type: 'select',
          id: 'regionId',
          label: '所属区域',
          default: '',
          options: [
            {
              label: '全部区域',
              value: '',
            },
          ],
          el: {
            size: 'medium',
          },
        },
        // {
        //   type: 'select',
        //   id: 'storeId',
        //   label: '所属商铺',
        //   default: '',
        //   options: [
        //     {
        //       label: '商铺一',
        //       value: '',
        //     },
        //     {
        //       label: '商铺二',
        //       value: 'shanghai',
        //     },
        //     {
        //       label: '商铺三',
        //       value: 'beijing',
        //     },
        //   ],
        //   el: {
        //     size: 'medium',
        //   },
        // },
        {
          type: 'select',
          id: 'floorId',
          label: '所属楼层',
          default: '',
          options: [
            {
              label: '全部楼层',
              value: '',
            },
          ],
          el: {
            size: 'medium',
          },
        },
        {
          type: 'date-picker',
          id: 'date',
          label: '选择时间',
          default: [
            new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
            new Date() - 0,
          ],
          el: {
            size: 'medium',
            type: 'datetimerange',
            placeholder: '选择时间',
            startPlaceholder: '开始时间',
            endPlaceholder: '结束时间',
          },
        },

        // {
        //   type: 'radio-group',
        //   id: 'resource',
        //   label: '客流条件',
        //   options: [
        //     {
        //       label: '不含以下客流',
        //     },
        //     {
        //       label: '仅含以下客流',
        //     },
        //   ],
        // },
        // {
        //   id: 'avatar',
        //   component: 'upload-to-ali',
        //   el: {
        //     class: 'imgList',
        //     url: '',
        //     accept: 'image/png, image/jpeg, image/jpg',
        //     multiple: true,
        //     tip: '单个文件大小不超过1024KB',
        //   },
        // },
      ],
      relationData: [],
    }
  },
  computed: {
    // 关联区域
    finalAreaData() {
      return this.$store.state.finalAreaData
    },
    // 关联楼层
    finalFloorData() {
      return this.$store.state.finalFloorData
    },
  },
  watch: {
    // 关联区域，监听数据变化，如果变化了就更新对应视图数据
    finalAreaData(val) {
      this.$refs.ruleForm.setOptions(
        'regionId',
        this.$store.state.finalAreaData,
      )
    },
    // 关联楼层，监听数据变化，如果变化了就更新对应视图数据
    finalFloorData(val) {
      this.$refs.ruleForm.setOptions(
        'floorId',
        this.$store.state.finalFloorData,
      )
    },
  },
  mounted() {
    // 触发dispatch获取楼层区域对应关系
    this.$store.dispatch('gitRelation')
    // 获取客流记录列表
    this.getPassengerList()
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('mallChange', url => {
      let currentUrl = '#/Details/PassengerFlowQuery'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getPassengerList()
        }, 0)
      }
    })
    /**
     * eventBus.$on监听mallChange事件，当发生变化时，重新刷新当前页面数据
     */
    eventBus.$on('storeChange', url => {
      let currentUrl = '#/Details/PassengerFlowQuery'
      if (url === currentUrl) {
        setTimeout(() => {
          this.getPassengerList()
        }, 0)
      }
    })
  },
  methods: {
    // 获取客流记录列表
    getPassengerList() {
      let formValue = this.$refs.ruleForm.getFormValue() || []
      this.loading = true
      this.$axios
        .$get(passengerQuery, {
          params: {
            page: this.page,
            size: this.size,
            startTime: formatDate(formValue.date[0]),
            endTime: formatDate(formValue.date[1]),
            regionId: formValue.regionId,
            floorId: formValue.floorId,
            // storeId: formValue.storeId,
            passengerType: formValue.passengerType,
          },
        })
        .then(res => {
          this.loading = false
          if (res.code === '0') {
            this.dataList = hasIn(res, ['payload', 'list'])
              ? res.payload.list
              : []
            this.total = hasIn(res, ['payload', 'total'])
              ? res.payload.total
              : 0
          }
        })
        .catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err,
          })
        })
    },
    handleSizeChange(val) {
      this.size = val
      this.getPassengerList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getPassengerList()
    },
    // 根据条件查询对应客流数据
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let formValue = this.$refs.ruleForm.getFormValue()
          this.loading = true
          this.page = 1
          this.$axios
            .$get(passengerQuery, {
              params: {
                page: this.page,
                size: this.size,
                startTime: formatDate(formValue.date[0]),
                endTime: formatDate(formValue.date[1]),
                regionId: formValue.regionId,
                floorId: formValue.floorId,
                // storeId: formValue.storeId,
                passengerType: formValue.passengerType,
              },
            })
            .then(res => {
              this.loading = false
              if (res.code === '0') {
                this.dataList = hasIn(res, ['payload', 'list'])
                  ? res.payload.list
                  : []
                this.total = hasIn(res, ['payload', 'total'])
                  ? res.payload.total
                  : 0
              }
            })
            .catch(err => {
              this.loading = false
              this.$message({
                type: 'error',
                message: err,
              })
            })
        } else {
          return false
        }
      })
    },
    // 重置form表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange([value]) {
      const dateItem = this.content.find(item => {
        return item.id === 'date'
      })
      if (value === '2' || value === '3') {
        dateItem.el.type = 'date'
      } else {
        dateItem.el.type = 'daterange'
      }
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

  .flowquery {
    min-height: 78vh;

    .top-header {
      background: #fff;
      padding: 20px;

      .el-select {
        width: 350px;
      }
    }

    .card-box {
      margin-top: 20px;
    }
  }

  .imgList {
    position: relative;
    top: 40px;
    right: 252px;
  }

  .searchbutton {
    margin-left: 60px;
  }
}
</style>
