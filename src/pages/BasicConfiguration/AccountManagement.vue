<template>
  <div class="store-content">
    <!-- <h1>基础配置/账号管理</h1> -->
    <div class="top-content">
      <h1>账号主体</h1>
      <el-form
        ref="mainForm"
        :model="mainForm"
        :rules="rules"
        label-width="100px"
        class="demo-mainForm"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input v-model="mainForm.name" class="inpt"></el-input>
        </el-form-item>
        <el-form-item label="企业ID" prop="id">
          <el-input v-model="mainForm.id" class="inpt"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="top-content">
      <h1>账号设置</h1>
      <el-form
        ref="setForm"
        :model="setForm"
        :rules="rules"
        label-width="100px"
        class="demo-setForm"
      >
        <el-form-item label="登陆邮箱" prop="name">
          <el-input v-model="setForm.name" class="inpt"></el-input>
        </el-form-item>
        <el-form-item label="账号名称" prop="id">
          <el-input v-model="setForm.id" class="inpt"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="setForm.phone" class="inpt"></el-input>
        </el-form-item>
        <el-form-item label="账号密码" prop="pa">
          <el-input v-model="setForm.pa" class="inpt"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <div class="top-header">
        <el-button type="primary" @click="addArea">新增子账号</el-button>
        <div class="search">
          <el-input v-model="input5" placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%;">
        <el-table-column prop="num" label="序号" width="180"></el-table-column>
        <el-table-column prop="name" label="企业ID"></el-table-column>
        <el-table-column prop="operator" label="子账号名称"></el-table-column>
        <el-table-column prop="phone" label="登陆手机号"></el-table-column>
        <el-table-column prop="email" label="登陆邮箱"></el-table-column>
        <el-table-column prop="status" label="账号状态"></el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="stop(scope.row)">停用</el-button>
              <el-button type="text" @click="handeleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button type="text text-danger" @click="handeleDele(scope.row)"
                >删除</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :total="1000"
        class="page"
        align="right"
        background
        layout="prev, pager, next"
      >
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="新增子账号" width="50%">
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号名称" prop="opeator">
          <el-input v-model="ruleForm.opeator"></el-input>
        </el-form-item>
        <el-form-item label="登陆邮箱" prop="opeator">
          <el-input v-model="ruleForm.opeator"></el-input>
        </el-form-item>
        <el-form-item label="绑定手机" prop="opeator">
          <el-input v-model="ruleForm.opeator"></el-input>
        </el-form-item>
        <el-form-item label="登陆密码" prop="opeator">
          <el-input v-model="ruleForm.opeator"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="opeator">
          <el-input v-model="ruleForm.opeator"></el-input>
        </el-form-item>
        <el-form-item label="卖场权限" prop="name">
          <el-select v-model="ruleForm.name" placeholder="卖场权限">
            <el-option label="卖场权限一" value="shanghai"></el-option>
            <el-option label="卖场权限二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域权限" prop="name">
          <el-select v-model="ruleForm.name" placeholder="区域权限">
            <el-option label="区域权限一" value="shanghai"></el-option>
            <el-option label="区域权限二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="有效期" prop="type">
          <el-radio-group v-model="ruleForm.type">
            <el-radio label="永久"></el-radio>
            <el-radio label="指定"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input5: '',
      tableData: new Array(20).fill(
        ...[
          {
            num: '0001',
            name: 'depeexi',
            operator: '靓仔1',
            phone: '234344',
            email: 'dp.deepexi.com',
            status: '启用中',
          },
        ],
      ),
      dialogVisible: false,
      mainForm: {
        name: '滴普科技',
        id: '1001',
      },
      setForm: {
        name: 'dp.deepexi.com',
        id: 'deepexi',
        phone: '18888888888',
        pa: '123456',
      },
      ruleForm: {
        name: '',
        opeator: '',
        phone: '',
        type: '',
        region: '',
        address: '',
      },
      rules: {
        region: [
          {required: true, message: '请选择关联区域', trigger: 'change'},
        ],
      },
    }
  },
  methods: {
    handeleEdit() {
      this.dialogVisible = true
    },
    stop() {
      this.$confirm('确定要停用账号吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '停用成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
          })
        })
    },
    handeleDele() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    addArea() {
      this.dialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.store-content {
  h1 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .top-content {
    background: #fff;
    padding: 20px;
    margin-top: 20px;

    .inpt {
      width: 300px;
    }
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
