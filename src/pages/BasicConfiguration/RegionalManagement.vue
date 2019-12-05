<template>
  <div class="store-content">
    <!-- <h1>基础配置/商铺管理</h1> -->
    <div class="top-header">
      <el-button type="primary" @click="addArea('ruleForm')"
        >新增商铺</el-button
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
    <el-dialog :visible.sync="dialogVisible" :title="title" width="50%">
      <el-form
        v-loading="loading"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        element-loading-text="加载中，请稍等！"
      >
        <el-form-item label="商铺名称" prop="name">
          <el-input v-model="ruleForm.name" placeholder="区域名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="一级行业" prop="oneLevelIndustry">
          <el-select v-model="ruleForm.oneLevelIndustry" placeholder="一级行业">
            <el-option label="服装一" value="shanghai"></el-option>
            <el-option label="美食" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级行业" prop="secondLevelIndustry">
          <el-select
            v-model="ruleForm.secondLevelIndustry"
            placeholder="一级行业"
          >
            <el-option label="男装" value="shanghai"></el-option>
            <el-option label="女装" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="所属卖场" prop="mallId">
          <el-select
            v-model="ruleForm.mallId"
            placeholder="请选择卖场"
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
        <el-form-item label="所属区域" prop="regionId">
          <el-select v-model="ruleForm.regionId" placeholder="请选择区域">
            <el-option
              v-for="item in regionArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属楼层" prop="floor">
          <el-select v-model="ruleForm.floor" placeholder="请选择楼层">
            <el-option
              v-for="item in floorArr"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺位置" prop="location">
          <el-input v-model="ruleForm.location"></el-input>
        </el-form-item>
        <el-form-item label="位置属性" prop="locationAttr">
          <el-select v-model="ruleForm.locationAttr" placeholder="地区">
            <el-option label="大门" value="1">大门</el-option>
            <el-option label="扶梯" value="2">扶梯</el-option>
            <el-option label="直梯" value="3">直梯</el-option>
            <el-option label="侧门" value="4">侧门</el-option>
            <el-option label="安全通道" value="5">安全通道</el-option>
            <el-option label="其他" value="6">其他</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商铺面积(平米)" prop="storeArea">
          <el-input-number
            :step-strictly="false"
            :min="0"
            :controls="false"
            v-model="ruleForm.storeArea"
            class="area-input"
          >
          </el-input-number>
        </el-form-item>
        <el-form-item label="商铺logo" prop="logoUrl">
          <upload-to-ali v-model="ruleForm.logoUrl" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStore('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {LOCATION_ARR} from './const'
import {hasIn} from 'lodash'
import {
  saveStore,
  deleteStore,
  updateStore,
  pagStore,
  searchStore,
  relationMall,
} from '@/const/api'
export default {
  data() {
    return {
      totalPath: 'payload.pageSize',
      dataPath: 'payload.list',
      title: '新增商铺',
      loading: false,
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      url: pagStore,
      columns: [
        {prop: 'displayId', label: '序号'},
        {
          prop: 'logoUrl',
          label: '商铺logo',
          formatter: row => this.prodImgFormate(row),
        },
        {prop: 'name', label: '商铺名称'},
        // {prop: 'oneLevelIndustry', label: '一级行业'},
        // {prop: 'secondLevelIndustry', label: '二级行业'},
        {prop: 'mall.name', label: '所属卖场'},
        {prop: 'region.name', label: '所属区域'},
        {prop: 'floor.name', label: '所属楼层'},
        {prop: 'location', label: '商铺位置'},
        {
          prop: 'locationAttr',
          label: '位置属性',
          formatter: row => this.handleLocation(row),
        },
        {prop: 'storeArea', label: '面积（平米）'},
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
            this.deleteStore(row)
            return Promise.resolve(false)
          },
        },
      ],
      input5: '',
      dialogVisible: false,
      mallArr: [], //卖场
      regionArr: [], //区域
      floorArr: [], //楼层
      ruleForm: {
        name: '',
        floor: null,
        location: '',
        locationAttr: '',
        logoUrl: '',
        regionId: null,
        mallId: null,
        // secondLevelIndustry: '',
        // oneLevelIndustry: '',
        storeArea: null,
        id: '',
      },
      rules: {
        name: [{required: true, message: '请填写商铺名称', trigger: 'change'}],
        mallId: [
          {required: true, message: '请选择所属卖场', trigger: 'change'},
        ],
        locationAttr: [
          {required: true, message: '请选择位置属性', trigger: 'change'},
        ],
      },
    }
  },
  created() {
    this.getRelationMall()
  },
  methods: {
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
      this.ruleForm.regionId = null
      this.ruleForm.floor = null
      const regionData = this.mallArr.filter(item => item.id === value)
      this.regionArr = regionData[0].region
      this.floorArr = regionData[0].floor
    },
    search(e) {
      e.preventDefault()
      if (this.input5 === '') {
        this.url = pagStore
        this.totalPath = 'payload.pageSize'
      } else {
        this.url = `${searchStore}?name=${this.input5}`
        this.totalPath = 'payload.totalSize'
      }
    },
    addStore(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.ruleForm.id !== '') {
            this.$axios
              .post(updateStore, {
                name: this.ruleForm.name,
                floor: this.ruleForm.floor,
                location: this.ruleForm.location,
                locationAttr: this.ruleForm.locationAttr,
                logoUrl: this.ruleForm.logoUrl,
                mallId: this.ruleForm.mallId,
                // oneLevelIndustry: this.ruleForm.oneLevelIndustry,
                regionId: this.ruleForm.regionId,
                // secondLevelIndustry: this.ruleForm.secondLevelIndustry,
                storeArea: this.ruleForm.storeArea,
                id: this.ruleForm.id,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.$message({
                    type: 'success',
                    message: '修改成功!',
                  })
                  this.$refs.dataTable.getList()
                  this.loading = false
                  this.dialogVisible = false
                  eventBus.$emit('storeUpdate')
                } else {
                  this.loading = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '修改失败!',
                  })
                }
              })
          } else {
            this.$axios
              .post(saveStore, {
                name: this.ruleForm.name,
                floor: this.ruleForm.floor,
                location: this.ruleForm.location,
                locationAttr: this.ruleForm.locationAttr,
                logoUrl: this.ruleForm.logoUrl,
                mallId: this.ruleForm.mallId,
                // oneLevelIndustry: this.ruleForm.oneLevelIndustry,
                regionId: this.ruleForm.regionId,
                // secondLevelIndustry: this.ruleForm.secondLevelIndustry,
                storeArea: this.ruleForm.storeArea,
              })
              .then(res => {
                if (res.data.code === '0') {
                  this.$message({
                    type: 'success',
                    message: '商铺新增成功!',
                  })
                  this.$refs.dataTable.getList()
                  this.loading = false
                  this.dialogVisible = false
                  eventBus.$emit('storeAdd')
                } else {
                  this.loading = false
                  this.$message({
                    type: 'error',
                    message: res.data.msg ? res.data.msg : '商铺新增失败!',
                  })
                }
              })
          }
        }
      })
    },
    // 处理位置属性
    handleLocation(row) {
      const {locationAttr} = row
      let data = LOCATION_ARR.filter(item => item.key === locationAttr)
      return data.length > 0 ? data[0].value : ''
    },
    prodImgFormate(row) {
      const {logoUrl} = row
      return <img src={logoUrl} alt="img" style="width:70px;" />
    },
    handeleEdit(row) {
      this.getRelationMall()
      this.title = '编辑商铺'
      const ruleFormData = row
      this.ruleForm.name = ruleFormData.name
      this.ruleForm.floor = ruleFormData.floor && ruleFormData.floor.id
      this.ruleForm.location = ruleFormData.location
      this.ruleForm.locationAttr = ruleFormData.locationAttr
      this.ruleForm.logoUrl = ruleFormData.logoUrl
      // 处理骚操作带来的报错问题（不关联卖场）
      this.ruleForm.mallId = ruleFormData.mall ? ruleFormData.mall.id : null
      // 可能会用到暂时隐藏
      // this.ruleForm.oneLevelIndustry = ruleFormData.oneLevelIndustry
      // this.ruleForm.secondLevelIndustry = ruleFormData.secondLevelIndustry
      this.ruleForm.regionId = ruleFormData.region && ruleFormData.region.id
      this.ruleForm.storeArea = ruleFormData.storeArea
      this.ruleForm.id = ruleFormData.id
      const regionData = this.mallArr.filter(
        item => item.id === this.ruleForm.mallId,
      )
      // 处理骚操作带来的报错问题（不关联卖场）,没有卖场哪里来的区域和楼层？？？
      this.regionArr =
        regionData && regionData.length > 0 ? regionData[0].region : []
      this.floorArr =
        regionData && regionData.length > 0 ? regionData[0].floor : []
      this.dialogVisible = true
    },
    deleteStore(row) {
      this.$confirm('此操作将永久删除该商铺, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios
            .post(deleteStore, {
              id: row.id,
            })
            .then(res => {
              if (res.data.code === '0') {
                this.$message({
                  type: 'success',
                  message: '删除成功!',
                })
                this.$refs.dataTable.getList()
                eventBus.$emit('storeDelete')
              } else {
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
    addArea(formName) {
      this.getRelationMall()
      this.title = '新增商铺'
      this.dialogVisible = true
      this.ruleForm = {
        name: '',
        floor: null,
        location: '',
        locationAttr: '',
        logoUrl: '',
        regionId: null,
        mallId: null,
        secondLevelIndustry: '',
        oneLevelIndustry: '',
        storeArea: null,
        id: '',
      }
      this.floorArr = []
      this.regionArr = []
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

  // .el-input__inner {
  //   width: 300px;
  // }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    // width: 100px;
    // height: 100px;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .demo-ruleForm {
    .el-input__inner {
      width: 400px;
    }

    .area-input {
      input {
        text-align: left;
      }
    }
  }
}
</style>
