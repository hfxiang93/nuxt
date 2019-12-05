<template>
  <div class="store-content">
    <!-- <h1>基础配置/卖场管理</h1> -->
    <div class="top-header">
      <el-button type="primary" @click="addArea('ruleForm')"
        >新增卖场</el-button
      >
      <div class="search">
        <el-input v-model="input5" placeholder="请输入内容">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="search"
          ></el-button>
        </el-input>
      </div>
    </div>
    <el-drawer
      v-loading="drawerLoading"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :title="title"
      element-loading-text="拼命加载中"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
        size="small"
      >
        <el-form-item label="卖场名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:300px;" />
        </el-form-item>
        <el-form-item label="责任人" prop="contactPerson">
          <el-input
            v-model="ruleForm.contactPerson"
            style="width:300px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="contactTel">
          <el-input
            v-model="ruleForm.contactTel"
            style="width:300px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="district">
          <!-- <el-select v-model="ruleForm.district" placeholder="地区" style="width:300px;">
            <el-option label="上海" value="shanghai"></el-option>
            <el-option label="北京" value="beijing"></el-option>
          </el-select> -->
          <el-select-area
            v-model="ruleForm.district"
            :auto-fill="false"
            class="area"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input v-model="ruleForm.address" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item label="卖场类型" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio :label="1">商场</el-radio>
            <el-radio :label="2">大门店</el-radio>
            <el-radio :label="3">小门店</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <div class="door-box">
            <el-tag
              v-for="tag in areadynamicTags"
              :key="tag"
              :disable-transitions="false"
              closable
              @close="handleClosed(tag)"
              >{{ tag }}</el-tag
            >
          </div>
          <el-input
            v-if="inputVisible"
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            style="width:300px;"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInput"
            >添加区域</el-button
          >
        </el-form-item>
        <el-form-item label="楼层" prop="floor">
          <div class="door-box">
            <el-tag
              v-for="tag in floorTags"
              :key="tag"
              :disable-transitions="false"
              closable
              @close="handleClosedFloor(tag)"
              >{{ tag }}</el-tag
            >
          </div>
          <el-input
            v-if="inputVisibleFloor"
            ref="saveFloorTagInput"
            v-model="inputFloorValue"
            class="input-new-tag"
            size="small"
            style="width:300px;"
            @keyup.enter.native="handleInputFloorConfirms"
            @blur="handleInputFloorConfirms"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showFloorInput"
            >添加楼层</el-button
          >
        </el-form-item>
        <el-form-item label="主出入口" prop="door">
          <div class="door-box">
            <el-tag
              v-for="tag in dynamicTags"
              :key="tag"
              :disable-transitions="false"
              closable
              @close="handleCloseds(tag)"
              >{{ tag }}</el-tag
            >
          </div>
          <el-input
            v-if="inputVisibles"
            ref="saveTagInputs"
            v-model="inputsValue"
            class="input-new-tag"
            size="small"
            style="width:300px;"
            @keyup.enter.native="handleInputConfirms"
            @blur="handleInputConfirms"
          ></el-input>
          <el-button
            v-else
            class="button-new-tag"
            size="small"
            @click="showInputs"
            >添加出入口</el-button
          >
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer" style="text-align:center;">
        <el-button @click="handleCancel('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="addStore('ruleForm')"
          >确 定</el-button
        >
      </div>
    </el-drawer>
    <div v-loading="loading" element-loading-text="拼命加载中">
      <Cards :info="dataList" @editArea="editArea" @deleteArea="deleteArea" />
      <div v-if="dataList.length === 0" class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script>
import Cards from './compontents/cards'
import ElSelectArea from '@femessage/el-select-area'
import {
  SearchMall,
  pageMall,
  UpdateMall,
  DeleteMall,
  SaveMall,
  detailsMall,
} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
export default {
  components: {
    Cards: Cards,
    ElSelectArea,
  },
  data() {
    return {
      loading: false,
      drawerLoading: false,
      title: '新增卖场',
      areadynamicTags: [],
      floorTags: [],
      dynamicTags: [],
      inputVisible: false,
      inputVisibleFloor: false,
      inputVisibles: false,
      inputValue: '',
      inputsValue: '',
      inputFloorValue: '',
      drawer: false,
      direction: 'rtl',
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      size: PAGE_NUMBER[0],
      input5: '',
      dialogVisible: false,
      ruleForm: {
        id: '',
        name: '',
        contactPerson: '',
        contactTel: '',
        type: 1,
        district: ['', '', ''],
        address: '',
        floor: [],
        area: [],
        door: [],
        region: [],
      },
      rules: {
        name: [{required: true, message: '请选择卖场名称', trigger: 'change'}],
        type: [
          {required: true, message: '请输选择卖场类型', trigger: 'change'},
        ],
        door: [{required: true, message: '请输入主出入口', trigger: 'change'}],
      },
      dataList: [],
    }
  },
  mounted() {
    this.getStoreList()
  },
  methods: {
    // 查询列表
    search() {
      if (this.input5 !== '') {
        this.loading = true
        this.$axios
          .get(SearchMall, {
            params: {
              name: this.input5,
              page: 1,
              size: 999,
            },
          })
          .then(res => {
            this.loading = false
            if (res.data.code === '0') {
              this.dataList = hasIn(res, ['data', 'payload', 'list'])
                ? res.data.payload.list
                : []
              this.total = hasIn(res, ['data', 'payload', 'totalSize'])
                ? res.data.payload.totalSize
                : 0
            }
          })
          .catch(err => {
            this.$message({
              type: 'error',
              message: err,
            })
          })
      } else {
        this.loading = true
        this.$axios.get(`${pageMall}?page=1&size=''`).then(res => {
          this.loading = false
          if (res.data.code === '0') {
            this.dataList = hasIn(res, ['data', 'payload', 'list'])
              ? res.data.payload.list
              : []
            this.total = hasIn(res, ['data', 'payload', 'totalSize'])
              ? res.data.payload.totalSize
              : 0
          }
        })
      }
    },
    // 编辑卖场
    editArea(id) {
      this.drawer = true
      this.drawerLoading = true
      this.title = '编辑卖场'
      this.$axios
        .get(detailsMall, {
          params: {
            mallId: id,
          },
        })
        .then(res => {
          if (res.data.code === '0') {
            const ruleFormData = hasIn(res, ['data', 'payload'])
              ? res.data.payload
              : {}
            this.ruleForm.name = ruleFormData.name
            this.ruleForm.contactPerson = ruleFormData.contactPerson
            this.ruleForm.contactTel = ruleFormData.contactTel
            this.ruleForm.type = ruleFormData.type
            this.ruleForm.address = ruleFormData.address
            this.ruleForm.district = [
              ruleFormData.province,
              ruleFormData.city,
              ruleFormData.area,
            ]
            // 入口数据
            this.ruleForm.id = ruleFormData.id
            let doorData = ruleFormData.door || []
            this.ruleForm.door =
              doorData &&
              doorData.map(item => {
                return {name: item.name, id: item.id}
              })
            let finalData = []
            for (let index = 0; index < doorData.length; index++) {
              finalData.push(doorData[index].name)
            }
            this.dynamicTags = finalData
            // 楼层数据
            let floorData = ruleFormData.floor || []
            this.ruleForm.floor =
              floorData &&
              floorData.map(item => {
                return {name: item.name, id: item.id}
              })
            let floorFinalData = []
            for (let i = 0; i < floorData.length; i++) {
              floorFinalData.push(floorData[i].name)
            }
            this.floorTags = floorFinalData
            // 区域数据
            let regionData = ruleFormData.region || []
            this.ruleForm.region =
              regionData &&
              regionData.map(item => {
                return {name: item.name, id: item.id}
              })
            let regionFinalData = []
            for (let i = 0; i < regionData.length; i++) {
              regionFinalData.push(regionData[i].name)
            }
            this.areadynamicTags = regionFinalData
            this.drawerLoading = false
          }
        })
        .catch(error => {
          this.drawerLoading = false
          this.$message({
            type: 'error',
            message: error,
          })
        })
    },
    // 删除数据
    deleteArea(id) {
      this.$confirm(
        '此操作将永久删除该卖场,删除卖场后，卖场内包括区域、楼层、商铺、设备、出入口和客流数据等所有相关信息全部被删除, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          this.loading = true
          this.$axios
            .post(DeleteMall, {
              id: id,
            })
            .then(res => {
              if (res.data.code === '0') {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.getStoreList()
                eventBus.$emit('mallDelete')
              } else {
                this.loading = false
                this.$message({
                  type: 'error',
                  message: '删除失败!',
                })
              }
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    // 取消
    handleCancel(ruleForm) {
      this.$refs[ruleForm].resetFields()
      this.floorTags = []
      this.areadynamicTags = []
      this.dynamicTags = []
      this.ruleForm.district = ['', '', '']
      this.drawer = false
    },
    // 添加
    addStore(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.drawerLoading = true
          if (this.ruleForm.id !== '') {
            this.$axios
              .post(UpdateMall, {
                name: this.ruleForm.name,
                id: this.ruleForm.id,
                contactPerson: this.ruleForm.contactPerson,
                contactTel: this.ruleForm.contactTel,
                type: this.ruleForm.type,
                address: this.ruleForm.address,
                floor: this.ruleForm.floor,
                door: this.ruleForm.door,
                province: this.ruleForm.district[0],
                city: this.ruleForm.district[1],
                area: this.ruleForm.district[2],
                region: this.ruleForm.region,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.drawerLoading = false
                  this.$message({
                    type: 'success',
                    message: '修改成功!',
                  })
                  this.getStoreList()
                  this.drawer = false
                  eventBus.$emit('mallUpdate')
                } else {
                  this.drawerLoading = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '修改失败!',
                  })
                }
              })
          } else {
            this.$axios
              .post(SaveMall, {
                name: this.ruleForm.name,
                contactPerson: this.ruleForm.contactPerson,
                contactTel: this.ruleForm.contactTel,
                type: this.ruleForm.type,
                address: this.ruleForm.address,
                floor: this.ruleForm.floor,
                province: this.ruleForm.district[0],
                city: this.ruleForm.district[1],
                area: this.ruleForm.district[2],
                door: this.ruleForm.door,
                region: this.ruleForm.region,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.drawerLoading = false
                  this.$message({
                    type: 'success',
                    message: '卖场新增成功!',
                  })
                  this.drawer = false
                  this.getStoreList()
                  eventBus.$emit('mallAdd')
                } else {
                  this.drawerLoading = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '卖场新增失败!',
                  })
                }
              })
          }
        }
      })
    },
    handleCloseds(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
      this.ruleForm.door.splice(
        this.ruleForm.door.findIndex(item => item.name === tag),
        1,
      )
    },

    showInputs() {
      this.inputVisibles = true
      this.$nextTick(_ => {
        this.$refs.saveTagInputs.$refs.input.focus()
      })
    },
    // 输入主出入口
    handleInputConfirms() {
      let inputsValue = this.inputsValue
      if (inputsValue) {
        if (!this.dynamicTags.includes(inputsValue)) {
          if (this.dynamicTags.length < 20) {
            this.dynamicTags.push(inputsValue)
            this.ruleForm.door.push({name: inputsValue})
          } else {
            this.$message.warning('最多创建二十个出入口')
          }
        } else {
          this.$message.warning('不能输入重复出入口')
        }
      }
      this.inputVisibles = false
      this.inputsValue = ''
    },
    handleClosed(tag) {
      this.areadynamicTags.splice(this.areadynamicTags.indexOf(tag), 1)
      this.ruleForm.region.splice(
        this.ruleForm.region.findIndex(item => item.name === tag),
        1,
      )
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    // 输入区域
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        if (!this.areadynamicTags.includes(inputValue)) {
          if (this.areadynamicTags.length < 10) {
            this.areadynamicTags.push(inputValue)
            this.ruleForm.region.push({name: inputValue})
          } else {
            this.$message.warning('最多创建十个区域')
          }
        } else {
          this.$message.warning('不能输入重复区域')
        }
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    // 楼层输入
    handleInputFloorConfirms() {
      let inputValue = this.inputFloorValue
      if (inputValue) {
        if (!this.floorTags.includes(inputValue)) {
          if (this.floorTags.length < 10) {
            this.floorTags.push(inputValue)
            this.ruleForm.floor.push({name: inputValue})
          } else {
            this.$message.warning('最多创建十个楼层')
          }
        } else {
          this.$message.warning('不能输入重复楼层')
        }
      }
      this.inputVisibleFloor = false
      this.inputFloorValue = ''
    },
    showFloorInput() {
      this.inputVisibleFloor = true
      this.$nextTick(_ => {
        this.$refs.saveFloorTagInput.$refs.input.focus()
      })
    },
    handleClosedFloor(tag) {
      this.floorTags.splice(this.floorTags.indexOf(tag), 1)
      this.ruleForm.floor.splice(
        this.ruleForm.floor.findIndex(item => item.name === tag),
        1,
      )
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.ruleForm.district = ['', '', '']
          done()
        })
        .catch(_ => {})
    },
    // 获取卖场列表
    getStoreList() {
      this.loading = true
      this.$axios.get(`${pageMall}?page=1&size=''`).then(res => {
        this.loading = false
        if (!Number(res.code)) {
          this.dataList = hasIn(res, ['data', 'payload', 'list'])
            ? res.data.payload.list
            : []
          this.total = hasIn(res, ['data', 'payload', 'totalSize'])
            ? res.data.payload.totalSize
            : 0
        }
      })
    },
    addArea(formName) {
      this.title = '新增卖场'
      this.drawer = true
      this.floorTags = []
      this.areadynamicTags = []
      this.dynamicTags = []
      this.ruleForm = {
        id: '',
        name: '',
        contactPerson: '',
        contactTel: '',
        type: 1,
        district: ['', '', ''],
        address: '',
        floor: [],
        area: [],
        door: [],
        region: [],
      }
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
  },
}
</script>

<style lang="less">
.store-content {
  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .top-header {
    display: flex;
    background: #fff;
    padding: 20px;
    margin-top: 20px;

    .search {
      margin-left: 50px;
      width: 300px;
    }
  }

  .no-data {
    text-align: center;
    min-height: 100px;
    line-height: 100px;
    color: #93959b;
  }
}

.select-area-item {
  .el-input {
    width: 300px;
    margin-bottom: 10px;
  }

  &:last-child {
    .el-input {
      width: 300px;
      margin-bottom: 0;
    }
  }
}

.door-box {
  // display: inline-block;
  float: left;
  max-height: 70px;
  overflow-y: auto;
  .el-tag {
    margin-right: 5px;
  }
}
</style>
