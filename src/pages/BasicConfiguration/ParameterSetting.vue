<template>
  <div v-loading="loading" class="ParameterSetting">
    <div class="header">
      <h1 class="title">参数设置</h1>
      <span class="titleDesc"
        >调整系统参数会给数据统计带来影响，请谨慎操作！调整后的定义参数将在次日凌晨4:00生效</span
      >
    </div>
    <div class="newOld">
      <h1 class="title">新老顾客定义</h1>
      <span class="titleDesc"
        >*请输入整数，月范围限制在1-6个月，一个月按照30次计算。</span
      >
      <el-switch
        v-model="newpassenger.dr"
        :active-value="switchOn"
        :inactive-value="switchOff"
        class="swicth"
      ></el-switch>
    </div>
    <div class="item">
      <span>新&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 客:</span>
      近
      <el-input-number
        v-model="newpassenger.cycle"
        :min="1"
        :max="6"
        label="描述文字"
      ></el-input-number
      >个月内到访小于等于
      <el-input-number
        v-model="newpassenger.endValue"
        :min="0"
        :max="30"
        label="描述文字"
      ></el-input-number
      >次
    </div>
    <div class="item">
      <span>流&nbsp;&nbsp;失&nbsp; 客:</span> 近
      <el-input-number
        v-model="losspassenger.cycle"
        :min="1"
        :max="6"
        label="描述文字"
      ></el-input-number
      >个月内到访小于等于
      <el-input-number
        v-model="losspassenger.endValue"
        :min="0"
        :max="30"
        label="描述文字"
      ></el-input-number
      >次
    </div>
    <div class="item">
      <span>低活老客:</span> 近
      <el-input-number
        v-model="lowlife.cycle"
        :min="1"
        :max="6"
        label="描述文字"
      ></el-input-number
      >个月内到访大于&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <el-input-number
        v-model="lowlife.startValue"
        :min="0"
        :max="lowlife.endValue - 1"
        label="描述文字"
      ></el-input-number
      >次,但小于
      <el-input-number
        v-model="lowlife.endValue"
        :min="lowlife.startValue + 1"
        :max="30"
        label="描述文字"
      ></el-input-number
      >次,(前者必须小于后者)
    </div>
    <div class="item">
      <span>高活老客:</span>
      近
      <el-input-number
        v-model="highlife.cycle"
        :min="1"
        :max="6"
        label="描述文字"
      ></el-input-number
      >个月内到访大于等于
      <el-input-number
        v-model="highlife.startValue"
        :min="0"
        :max="30"
        label="描述文字"
      ></el-input-number
      >次
    </div>
    <div class="filter">
      <h1 class="title">过滤时长定义</h1>
      <span class="titleDesc">*请输入整数，默认值为360分钟。</span>
      <el-switch
        v-model="duration.dr"
        :active-value="switchOn"
        :inactive-value="switchOff"
        class="swicth"
      ></el-switch>
    </div>
    <div class="item">
      单日访问时长大于
      <el-input-number
        v-model="duration.cycle"
        :min="1"
        :max="8640"
        label="描述文字"
      ></el-input-number
      >分钟，不计入客流统计
    </div>
    <el-button type="primary" class="saveBtn" @click="saveChange"
      >保存</el-button
    >
  </div>
</template>

<script>
import {
  paramSettingSearch,
  paramSettingSave,
  paramSettingUpdate,
} from '@/const/api'
import {hasIn} from 'lodash'
export default {
  data() {
    return {
      loading: false,
      switchOn: 0,
      switchOff: 1,
      duration: {
        cycle: 1,
        dr: 0,
      },
      highlife: {
        cycle: 1,
        startValue: 0,
        dr: 0,
      },
      losspassenger: {
        cycle: 1,
        endValue: 0,
        dr: 0,
      },
      lowlife: {
        cycle: 1,
        startValue: 0,
        endValue: 1,
        dr: 0,
      },
      newpassenger: {
        cycle: 1,
        endValue: 0,
        dr: 0,
      },
    }
  },
  created() {
    this.serchParamSetting()
  },
  methods: {
    /**
     * 查询参数设置
     */
    serchParamSetting() {
      this.loading = true
      this.$axios
        .get(`${paramSettingSearch}?mallId=${this.$store.state.mallId}`)
        .then(res => {
          this.loading = false
          const data = hasIn(res, ['data'], ['payload']) ? res.data.payload : {}
          this.duration = data.duration || {cycle: 360}
          this.highlife = data.highlife || {cycle: 1}
          this.losspassenger = data.losspassenger || {cycle: 1}
          this.lowlife = data.lowlife || {cycle: 1}
          this.newpassenger = data.newpassenger || {cycle: 1}
        })
        .catch(error => {
          this.loading = false
          this.$message({
            type: 'error',
            message: '获取参数配置失败!',
          })
        })
    },
    /**
     * 保存设置
     */
    saveChange() {
      this.$confirm(
        '调整后的定义参数将在次日凌晨4:00生效,确定要保存该设置吗?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        },
      )
        .then(() => {
          this.loading = true
          // 如果存在id就执行更新，否则执行新增
          if (this.duration && this.duration.id) {
            this.$axios
              .post(
                `${paramSettingUpdate}?mallId=${this.$store.state.mallId}`,
                {
                  duration: this.duration,
                  highlife: this.highlife,
                  losspassenger: this.losspassenger,
                  lowlife: this.lowlife,
                  newpassenger: this.newpassenger,
                },
              )
              .then(res => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '更新成功!',
                })
                this.serchParamSetting()
              })
              .catch(error => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '更新失败!',
                })
              })
          } else {
            //新增参数设置
            this.$axios
              .post(`${paramSettingSave}?mallId=${this.$store.state.mallId}`, {
                duration: this.duration,
                highlife: this.highlife,
                losspassenger: this.losspassenger,
                lowlife: this.lowlife,
                newpassenger: this.newpassenger,
              })
              .then(res => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '新增成功!',
                })
                this.serchParamSetting()
              })
              .catch(error => {
                this.loading = false
                this.$message({
                  type: 'success',
                  message: '新增失败!',
                })
              })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消保存!',
          })
        })
    },
  },
}
</script>

<style lang="less">
.ParameterSetting {
  min-height: 500px;
  background-color: #fff;

  .item {
    margin: 20px;
    font-size: 14px;
    line-height: 30px;
    color: #323232;

    .num {
      width: 60px;
    }
  }

  .header {
    position: relative;
    margin: 10px;

    .title {
      display: inline;
    }
  }

  .titleDesc {
    display: inline;
    margin-left: 10px;
  }

  .newOld {
    position: relative;
    margin: 10px;

    .swicth {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    border-bottom: rgba(202, 203, 206, 1) solid 1px;

    .title {
      display: inline;

      .titleDesc {
        display: inline;
        margin-left: 20px;
      }
    }
  }

  .filter {
    position: relative;
    margin: 10px;
    border-bottom: rgba(202, 203, 206, 1) solid 1px;

    .swicth {
      position: absolute;
      right: 10px;
      top: 10px;
    }

    .title {
      display: inline;

      .titleDesc {
        display: inline;
        margin-left: 20px;
      }
    }
  }

  .saveBtn {
    margin: 40px;
  }
}
</style>
