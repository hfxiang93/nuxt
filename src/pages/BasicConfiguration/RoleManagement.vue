<template>
  <div class="role-management">
    <div class="table">
      <div class="top-header">
        <el-button type="primary" @click="addArea('ruleForm')"
          >新增角色</el-button
        >
        <div class="search">
          <el-input v-model="search_value" placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchRole"
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
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="ruleForm.name" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-checkbox-group v-model="ruleForm.permission">
            <el-checkbox
              label="不计入数据统计分析"
              name="permission"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="">
          *勾选后改角色下访客不计入客流统计分析。
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveRole('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  pageRole,
  searchRole,
  saveRole,
  updateRole,
  deleteRole,
} from '@/const/api'
import {PAGE_NUMBER, PAGINATION_LAYOUT} from '@/const/common'
import {hasIn} from 'lodash'
export default {
  data() {
    return {
      url: pageRole,
      totalPath: 'payload.total',
      dataPath: 'payload.list',
      PAGE_NUMBER, // 分页类型
      PAGINATION_LAYOUT, // 分页功能
      search_value: '',
      tableData: [],
      dialogVisible: false,
      columns: [
        {type: 'index', label: '编号', width: 120},
        {
          prop: 'name',
          label: '角色名称',
        },
        {prop: 'permission', label: '角色权限'},
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
            this.HandleDeleteRole(row)
            return Promise.resolve(false)
          },
        },
      ],
      ruleForm: {
        name: '',
        permission: [],
        id: '',
      },
      loading: false,
      title: '',
      rules: {
        name: [{required: true, message: '请输入角色名称', trigger: 'change'}],
      },
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    // 编辑角色
    handleEdit(row) {
      this.dialogVisible = true
      this.title = '编辑角色'
      const data = row
      this.ruleForm.name = data.name
      this.ruleForm.id = data.id
      this.ruleForm.permission =
        data.permission !== null ? data.permission.split() : []
    },
    // 删除角色
    HandleDeleteRole(row) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$axios
            .$post(deleteRole, {
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
      this.dialogVisible = true
      this.title = '新增角色'
      this.ruleForm = {
        name: '',
        permission: [],
        id: '',
      }
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    // 新增角色
    saveRole(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.loading = true
          if (this.ruleForm.id) {
            this.$axios
              .$post(updateRole, {
                name: this.ruleForm.name,
                id: this.ruleForm.id,
                // 处理为字符串
                permission:
                  this.ruleForm.permission.length > 0
                    ? this.ruleForm.permission.join(',')
                    : null,
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
            const finalData = {
              name: this.ruleForm.name,
              mallId: this.$store.state.mallId,
              // 此前默认是一个，应该是要传数组的，后端处理为字符串，只能处理下数据传字符串了，不选传null
              // 后续可能会扩展，传数组，所以不知道后端为啥不愿意传数组
              permission:
                this.ruleForm.permission.length > 0
                  ? this.ruleForm.permission.join(',')
                  : null,
            }
            this.$axios.$post(saveRole, {...finalData}).then(res => {
              if (res.code === '0') {
                this.$message.success('角色新增成功!')
                this.$refs.dataTable.getList()
                this.loading = false
                this.dialogVisible = false
              } else {
                this.loading = false
                this.$message.error(res.msg ? res.msg : '角色新增失败!')
              }
            })
          }
        }
      })
    },
    // 获取角色列表
    getRoleList() {
      this.pageRole = pageRole
    },
    // 搜索角色
    searchRole() {
      if (this.search_value === '') {
        this.url = pageRole
        this.totalPath = 'payload.total'
      } else {
        this.url = `${searchRole}?name=${this.search_value}`
        this.totalPath = 'payload.total'
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
