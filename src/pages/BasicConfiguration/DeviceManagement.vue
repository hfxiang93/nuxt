<template>
  <div class="store-content">
    <!-- <h1>基础配置/设备管理</h1> -->
    <div class="top-header">
      <el-button type="primary" @click="addArea('ruleForms')"
        >新增设备</el-button
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
    <div class="table">
      <el-data-table
        v-loading="loading"
        ref="dataTable"
        :has-new="false"
        :has-edit="false"
        :has-delete="false"
        :has-operation="true"
        :is-tree="false"
        :has-pagination="true"
        :pagination-size="PAGE_NUMBER[0]"
        :pagination-sizes="PAGE_NUMBER"
        v-bind="$data"
        :total-path="totalPath"
        :data-path="dataPath"
      />
    </div>
    <el-dialog
      v-loading="loadings"
      :visible.sync="dialogVisible"
      :title="title"
      width="50%"
    >
      <el-form
        ref="ruleForms"
        :model="ruleForms"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForms"
      >
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="ruleForms.name"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="ruleForms.ip"></el-input>
        </el-form-item>
        <el-form-item label="mac地址" prop="mac">
          <el-input v-model="ruleForms.mac"></el-input>
        </el-form-item>
        <el-form-item label="关联卖场" prop="mall.relationTypeId">
          <el-select
            v-model="ruleForms.mall.relationTypeId"
            placeholder="选择关联卖场"
            @change="handleMallChange"
          >
            <el-option
              v-for="item in mallArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="关联区域" prop="region.relationTypeId">
          <el-select
            v-model="ruleForms.region.relationTypeId"
            placeholder="地区"
          >
            <el-option
              v-for="item in regionArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-radio-group v-model="ruleForms.region.accessType">
            <el-radio label="1">出口</el-radio>
            <el-radio label="2">入口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联主出入口" prop="door.relationTypeId">
          <el-select
            v-model="ruleForms.door.relationTypeId"
            placeholder="出入口"
          >
            <el-option
              v-for="item in doorArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-radio-group v-model="ruleForms.door.accessType">
            <el-radio label="1">出口</el-radio>
            <el-radio label="2">入口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联楼层" prop="floor.relationTypeId">
          <el-select
            v-model="ruleForms.floor.relationTypeId"
            placeholder="楼层"
          >
            <el-option
              v-for="item in floorArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-radio-group v-model="ruleForms.floor.accessType">
            <el-radio label="1">出口</el-radio>
            <el-radio label="2">入口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联商铺" prop="store.relationTypeId">
          <el-select
            v-model="ruleForms.store.relationTypeId"
            placeholder="商铺"
          >
            <el-option
              v-for="item in storeArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
          <el-radio-group v-model="ruleForms.store.accessType">
            <el-radio label="1">出口</el-radio>
            <el-radio label="2">入口</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="关联位置" prop="location">
          <el-input v-model="ruleForms.location"></el-input>
        </el-form-item>
        <el-form-item label="位置属性" prop="type">
          <el-select v-model="ruleForms.type" placeholder="属性">
            <el-option label="大门" value="1"></el-option>
            <el-option label="侧门" value="4"></el-option>
            <el-option label="直梯" value="3"></el-option>
            <el-option label="扶梯" value="2"></el-option>
            <el-option label="安全通道" value="5"></el-option>
            <el-option label="其他" value="6"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDevice('ruleForms')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {LOCATION_ARR, ENTRY_EXIT} from './const'
import {hasIn} from 'lodash'
import {
  saveDevice,
  deleteDevice,
  updateDevice,
  pageDevice,
  searchDevice,
  relationMall,
} from '@/const/api'
export default {
  data() {
    return {
      totalPath: 'payload.total',
      dataPath: 'payload.list',
      title: '新增设备',
      loading: false,
      loadings: false,
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      url: pageDevice,
      columns: [
        {prop: 'displayId', label: '编号', width: 110},
        {prop: 'name', label: '设备名称', minWidth: 130},
        {prop: 'ip', label: 'IP地址', width: 130},
        {prop: 'mac', label: 'mac地址', minWidth: 150},
        {
          prop: 'mall',
          label: '关联卖场',
          formatter: row => {
            let newArry = row.deviceRelationDtos.filter(item => {
              return item.relationType === 'mall'
            })
            return newArry.length ? newArry[0].name : ''
          },
        },
        {
          prop: 'door',
          label: '关联主出入口',
          width: '120',
          formatter: row => {
            let newArry = row.deviceRelationDtos.filter(item => {
              return item.relationType === 'door'
            })
            return newArry.length && newArry[0].name
              ? newArry[0].name +
                  ENTRY_EXIT.find(item => item.key === newArry[0].accessType)
                    .value
              : ''
          },
        },
        {
          prop: 'region',
          label: '关联区域',
          formatter: row => {
            let newArry = row.deviceRelationDtos.filter(item => {
              return item.relationType === 'region'
            })
            return newArry.length && newArry[0].name
              ? newArry[0].name +
                  ENTRY_EXIT.find(item => item.key === newArry[0].accessType)
                    .value
              : ''
          },
        },
        {
          prop: 'floor',
          label: '关联楼层',
          formatter: row => {
            let newArry = row.deviceRelationDtos.filter(item => {
              return item.relationType === 'floor'
            })
            return newArry.length && newArry[0].name
              ? newArry[0].name +
                  ENTRY_EXIT.find(item => item.key === newArry[0].accessType)
                    .value
              : ''
          },
        },
        {
          prop: 'store',
          label: '关联商铺',
          width: 120,
          formatter: row => {
            let newArry = row.deviceRelationDtos.filter(item => {
              return item.relationType === 'store'
            })
            return newArry.length && newArry[0].name
              ? newArry[0].name +
                  ENTRY_EXIT.find(item => item.key === newArry[0].accessType)
                    .value
              : ''
          },
        },
        {prop: 'location', label: '位置'},
        {
          prop: 'type',
          label: '位置属性',
          formatter: row => this.handleLocation(row),
        },
        {
          prop: 'status',
          label: '设备状态',
          formatter: row => {
            return row.status === '1' ? '在线' : '离线'
          },
        },
      ],
      operationAttrs: {
        width: '120px',
        fixed: 'right',
      },
      extraButtons: [
        {
          text: '编辑',
          type: 'primary',
          atClick: row => {
            this.handeleEdit(row)
            return Promise.resolve(false)
          },
        },
        {
          text: '删除',
          type: 'primary',
          atClick: row => {
            this.deleteDevice(row)
            return Promise.resolve(false)
          },
        },
      ],
      input5: '',
      dialogVisible: false,
      mallArr: [], //卖场
      regionArr: [], //区域
      floorArr: [], //楼层
      doorArr: [], //门
      storeArr: [], //商铺
      ruleForms: {
        deviceRelationList: [],
        id: '',
        name: '',
        ip: '',
        mac: null,
        accessType: null,
        mallId: null,
        type: '',
        door: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'door',
        },
        mall: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'mall',
        },
        floor: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'floor',
        },
        region: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'region',
        },
        store: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'store',
        },
      },
      rules: {
        name: [{required: true, message: '请选择设备名称', trigger: 'change'}],
        ip: [{required: true, message: '请选择IP地址', trigger: 'change'}],
        'mall.relationTypeId': [
          {required: true, message: '请选择关联卖场', trigger: 'change'},
        ],
        type: [{required: true, message: '请选择位置属性', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getRelationMall()
  },
  methods: {
    // 处理位置属性
    handleLocation(row) {
      const {type} = row
      let data = LOCATION_ARR.filter(
        item => parseInt(item.key) === parseInt(type),
      )
      return data.length > 0 ? data[0].value : ''
    },
    // 关联查询接口
    getRelationMall() {
      this.$axios.$get(relationMall).then(res => {
        if (res.code === '0') {
          let relationData = hasIn(res, ['payload']) ? res.payload : []
          this.mallArr = relationData
        }
      })
    },
    // 选择卖场
    handleMallChange(value) {
      this.ruleForms.region.relationTypeId = null
      this.ruleForms.door.relationTypeId = null
      this.ruleForms.floor.relationTypeId = null
      this.ruleForms.store.relationTypeId = null
      const regionData = this.mallArr.filter(item => item.id === value)
      this.regionArr = regionData[0].region
      this.floorArr = regionData[0].floor
      this.doorArr = regionData[0].door
      this.storeArr = regionData[0].store
      this.ruleForms.mallId = value
      this.ruleForms.mall.mallId = value
      this.ruleForms.floor.mallId = value
      this.ruleForms.door.mallId = value
      this.ruleForms.store.mallId = value
      this.ruleForms.region.mallId = value
    },
    addDevice(ruleForms) {
      this.$refs[ruleForms].validate(valid => {
        if (valid) {
          this.loadings = true
          if (this.ruleForms.id !== '') {
            // 不选择就不传
            this.ruleForms.deviceRelationList = []
            if (this.ruleForms.floor.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.floor)
            }
            if (this.ruleForms.door.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.door)
            }
            if (this.ruleForms.store.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.store)
            }
            if (this.ruleForms.region.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.region)
            }
            this.ruleForms.deviceRelationList.push(this.ruleForms.mall)
            this.$axios
              .post(updateDevice, {
                name: this.ruleForms.name,
                deviceRelationList: this.ruleForms.deviceRelationList,
                location: this.ruleForms.location,
                accessType: this.ruleForms.accessType,
                ip: this.ruleForms.ip,
                mac: this.ruleForms.mac,
                id: this.ruleForms.id,
                type: this.ruleForms.type,
                mallId: this.ruleForms.mall.mallId,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.$message({
                    type: 'success',
                    message: '修改成功!',
                  })
                  this.$refs.dataTable.getList()
                  this.loadings = false
                  this.dialogVisible = false
                } else {
                  this.loadings = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '修改失败!',
                  })
                }
              })
          } else {
            // 不选择就不传
            this.ruleForms.deviceRelationList = []
            if (this.ruleForms.floor.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.floor)
            }
            if (this.ruleForms.door.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.door)
            }
            if (this.ruleForms.store.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.store)
            }
            if (this.ruleForms.region.relationTypeId) {
              this.ruleForms.deviceRelationList.push(this.ruleForms.region)
            }
            this.ruleForms.deviceRelationList.push(this.ruleForms.mall)
            this.$axios
              .post(saveDevice, {
                name: this.ruleForms.name,
                deviceRelationList: this.ruleForms.deviceRelationList,
                location: this.ruleForms.location,
                accessType: this.ruleForms.accessType,
                ip: this.ruleForms.ip,
                mac: this.ruleForms.mac,
                mallId: this.ruleForms.mallId,
                type: this.ruleForms.type,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.$message({
                    type: 'success',
                    message: '设备新增成功!',
                  })
                  this.$refs.dataTable.getList()
                  this.loadings = false
                  this.dialogVisible = false
                } else {
                  this.loadings = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '设备新增失败!',
                  })
                }
              })
          }
        }
      })
    },
    deleteDevice(row) {
      this.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.loading = true
          this.$axios.post(deleteDevice, {id: row.id}).then(res => {
            this.loading = false
            if (res.data.code === '0') {
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
              this.$refs.dataTable.getList()
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
          this.loading = false
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    search(e) {
      e.preventDefault()
      if (this.input5 === '') {
        this.url = pageDevice
        this.dataPath = 'payload.list'
      } else {
        this.url = `${searchDevice}?name=${this.input5}`
        this.dataPath = 'payload.list'
      }
    },
    handeleEdit(row) {
      this.getRelationMall()
      this.title = '编辑设备'
      const ruleFormsData = row
      this.ruleForms.name = ruleFormsData.name
      this.ruleForms.ip = ruleFormsData.ip
      this.ruleForms.mac = ruleFormsData.mac
      // 位置
      let doorData = ruleFormsData.deviceRelationDtos.filter(item => {
        return item.relationType === 'door'
      })
      doorData.length > 0
        ? (this.ruleForms.door = doorData[0])
        : this.ruleForms.door
      //楼层数据
      let floorData = ruleFormsData.deviceRelationDtos.filter(item => {
        return item.relationType === 'floor'
      })
      this.ruleForms.floor =
        floorData.length > 0 ? floorData[0] : this.ruleForms.floor
      // 卖场数据

      let mallData = ruleFormsData.deviceRelationDtos.filter(item => {
        return item.relationType === 'mall'
      })
      this.ruleForms.mall =
        mallData.length > 0 ? mallData[0] : this.ruleForms.mall
      this.ruleForms.location = ruleFormsData.location
      //区域数据
      let regionFinalData = ruleFormsData.deviceRelationDtos.filter(item => {
        return item.relationType === 'region'
      })
      this.ruleForms.region =
        regionFinalData.length > 0 ? regionFinalData[0] : this.ruleForms.region
      // 商铺数据
      let storeData = ruleFormsData.deviceRelationDtos.filter(item => {
        return item.relationType === 'store'
      })
      this.ruleForms.store =
        storeData.length > 0 ? storeData[0] : this.ruleForms.store

      this.ruleForms.id = ruleFormsData.id
      //note:type字段传过去是string，后台返回是number，为了显示位置属性，number处理为string
      // 因为商铺管理的位置属性字段为locationArr是字符类型，这边是共用的所以暂时这样处理
      //当type不传的时候，后台返回为0，前台需要处理为''
      this.ruleForms.type =
        ruleFormsData.type !== 0 ? ruleFormsData.type.toString() : ''
      //处理骚操作带来的报错问题（不关联卖场）
      this.ruleForms.mallId = mallData.length > 0 ? mallData[0].mallId : null
      const regionData = this.mallArr.filter(
        item => item.id === this.ruleForms.mallId,
      )
      //为了防止那些瞎造的数据导致卖场为空而必须加的判断，没有卖场哪里来的商铺？？
      this.regionArr = regionData.length > 0 ? regionData[0].region : []
      this.floorArr = regionData.length > 0 ? regionData[0].floor : []
      this.doorArr = regionData.length > 0 ? regionData[0].door : []
      this.storeArr = regionData.length > 0 ? regionData[0].store : []
      this.dialogVisible = true
    },
    addArea(formName) {
      this.getRelationMall()
      this.title = '新增设备'
      this.dialogVisible = true
      this.floorArr = []
      this.doorArr = []
      this.regionArr = []
      this.storeArr = []
      this.ruleForms = {
        deviceRelationList: [],
        id: '',
        name: '',
        ip: '',
        mac: null,
        accessType: null,
        door: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'door',
        },
        mall: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'mall',
        },
        floor: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'floor',
        },
        region: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'region',
        },
        store: {
          accessType: '1',
          relationTypeId: null,
          mallId: null,
          relationType: 'store',
        },
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

  .table {
    margin-top: 20px;
    background: #fff;
    padding: 20px;

    .page {
      margin-top: 20px;
    }
  }

  .demo-ruleForms {
    .el-input__inner {
      width: 300px;
    }
  }
}
</style>
