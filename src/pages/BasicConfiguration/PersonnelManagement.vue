<template>
  <div class="role-management">
    <div class="table">
      <div class="top-header">
        <el-button type="primary" @click="addArea('ruleForm')"
          >新增人员</el-button
        >
        <div class="search">
          <el-input v-model="search_value" placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchEmployee"
            ></el-button>
          </el-input>
        </div>
      </div>
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
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="人员" prop="roleId">
          <el-select
            v-model="ruleForm.roleId"
            placeholder="请选择"
            style="width:400px;"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="人脸相片" prop="imageUrl">
          <upload-to-ali
            v-model="ruleForm.imageUrl"
            :max="3"
            multiple
            tip="支持jpg, jpeg,png格式，单张照片最大不超5M，同一个人最多只上传三张照片"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEmployee('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageEmployee,
  saveEmployee,
  editEmployee,
  deleteEmployee,
  personnelAssociation,
} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
export default {
  data() {
    return {
      url: pageEmployee,
      totalPath: 'payload.pageSize',
      dataPath: 'payload.list',
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      search_value: '',
      tableData: [],
      dialogVisible: false,
      columns: [
        {type: 'index', label: '编号', width: 120},
        {
          prop: 'faceId',
          label: 'Face ID',
        },
        {
          prop: 'name',
          label: '人员姓名',
        },
        {
          prop: 'imageUrl',
          label: '人脸图片',
          minWidth: 200,
          formatter: row => this.prodImgFormate(row),
        },
        {prop: 'roleName', label: '角色'},
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
            this.handleEdit(row)
            return Promise.resolve(false)
          },
        },
        {
          text: '删除',
          type: 'primary',
          atClick: row => {
            this.HandleDeleteEmployee(row)
            return Promise.resolve(false)
          },
        },
      ],
      ruleForm: {
        name: '',
        roleId: '',
        id: '',
        faceId: '',
        imageUrl: [],
      },
      options: [],
      loading: false,
      title: '',
      rules: {
        name: [{required: true, message: '请输入人员名称', trigger: 'change'}],
        roleId: [{required: true, message: '请选择角色', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getEmployeeList()
    this.getRoleList()
  },
  methods: {
    // 角色列表
    getRoleList() {
      this.$axios.$get(personnelAssociation).then(res => {
        if (res.code === '0') {
          const data = hasIn(res, ['payload']) ? res.payload : []
          let finalData = data.map(item => {
            return {value: item.id, label: item.name}
          })
          this.options = finalData
        }
      })
    },
    // 处理图片
    prodImgFormate(row) {
      const {imageUrl, imageUrl2, imageUrl3} = row
      // 后台传多个字段前端做处理图片字段
      let finalImageUrl = imageUrl ? (
        <img src={imageUrl} alt="img" style="width:70px;margin-right:5px" />
      ) : (
        ''
      )
      let finalImageUrl2 = imageUrl2 ? (
        <img src={imageUrl2} alt="img" style="width:70px;margin-right:5px" />
      ) : (
        ''
      )
      let finalImageUrl3 = imageUrl3 ? (
        <img src={imageUrl3} alt="img" style="width:70px;" />
      ) : (
        ''
      )
      return (
        <div>
          {finalImageUrl}
          {finalImageUrl2}
          {finalImageUrl3}
        </div>
      )
    },
    // 编辑人员
    handleEdit(row) {
      this.getRoleList()
      this.dialogVisible = true
      this.title = '编辑人员'
      const data = row
      this.ruleForm.name = data.name
      this.ruleForm.roleId = data.roleId
      this.ruleForm.id = data.id
      this.ruleForm.faceId = data.faceId
      this.ruleForm.imageUrl = []
      //原本图片传数组，后台把把参数分开单独传，只能暂时这样处理了
      if (data.imageUrl) {
        this.ruleForm.imageUrl.push(data.imageUrl)
      }
      if (data.imageUrl2) {
        this.ruleForm.imageUrl.push(data.imageUrl2)
      }
      if (data.imageUrl3) {
        this.ruleForm.imageUrl.push(data.imageUrl3)
      }
    },
    // 删除人员
    HandleDeleteEmployee(row) {
      this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios
            .$post(deleteEmployee, {
              id: row.id,
            })
            .then(res => {
              if (res.code === '0') {
                this.$message.success('删除成功!')
                this.$refs.dataTable.getList()
              } else {
                this.$message.error(res.msg ? res.msg : '删除失败！')
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
      this.getRoleList()
      this.dialogVisible = true
      this.title = '新增人员'
      this.ruleForm = {
        name: '',
        roleId: '',
        imageUrl: [],
      }
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    // 新增人员
    saveEmployee(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.ruleForm.id) {
            this.$axios
              .$post(editEmployee, {
                name: this.ruleForm.name,
                id: this.ruleForm.id,
                roleId: this.ruleForm.roleId,
                faceId: this.ruleForm.faceId,
                // 图片传后台参数处理
                imageUrl: this.ruleForm.imageUrl[0]
                  ? this.ruleForm.imageUrl[0]
                  : '',
                imageUrl2: this.ruleForm.imageUrl[1]
                  ? this.ruleForm.imageUrl[1]
                  : '',
                imageUrl3: this.ruleForm.imageUrl[2]
                  ? this.ruleForm.imageUrl[2]
                  : '',
              })
              .then(res => {
                if (res.code === '0') {
                  this.$message.success('修改成功!')
                  this.$refs.dataTable.getList()
                  this.loading = false
                  this.dialogVisible = false
                } else {
                  this.loading = false
                  this.$message.error(res.msg ? res.msg : '修改失败!')
                }
              })
          } else {
            this.$axios
              .$post(saveEmployee, {
                name: this.ruleForm.name,
                roleId: this.ruleForm.roleId,
                imageUrl: this.ruleForm.imageUrl[0]
                  ? this.ruleForm.imageUrl[0]
                  : '',
                imageUrl2: this.ruleForm.imageUrl[1]
                  ? this.ruleForm.imageUrl[1]
                  : '',
                imageUrl3: this.ruleForm.imageUrl[2]
                  ? this.ruleForm.imageUrl[2]
                  : '',
              })
              .then(res => {
                if (res.code === '0') {
                  this.$message.success('人员新增成功!')
                  this.$refs.dataTable.getList()
                  this.loading = false
                  this.dialogVisible = false
                } else {
                  this.loading = false
                  this.$message.error(res.msg ? res.msg : '人员新增失败!')
                }
              })
          }
        }
      })
    },
    // 获取人员列表
    getEmployeeList() {
      this.pageEmployee = pageEmployee
    },
    // 搜索人员
    searchEmployee() {
      if (this.search_value === '') {
        this.url = pageEmployee
        this.totalPath = 'payload.pageSize'
      } else {
        this.url = `${pageEmployee}?name=${this.search_value}`
        this.totalPath = 'payload.totalSize'
      }
    },
  },
}
</script>

<style lang="less" scoped>
.role-management {
  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .table {
    background: #fff;
    padding: 20px;
    margin-top: 20px;

    .top-header {
      display: flex;
      margin-bottom: 20px;

      .search {
        margin-left: 50px;
        width: 300px;
      }
    }

    .page {
      margin-top: 20px;
    }
  }
}
</style>
