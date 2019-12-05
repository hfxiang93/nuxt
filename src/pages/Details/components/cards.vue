<template>
  <div class="box-card">
    <el-card v-for="item in info" :key="item.id" class="card" shadow="hover">
      <el-container>
        <el-aside width="20%"
          ><div class="headerImage">
            <img :src="item.imageUrl" alt="img" /></div
        ></el-aside>
        <el-main
          ><div class="text-item">
            <div class="item">
              <span> 访客ID <i>:</i></span
              >{{ item.id }}
            </div>
            <div class="item">
              <span>性别<i>:</i></span
              >{{ item.gender == 1 ? '男' : '女' }}
            </div>
            <div class="item">
              <span>年龄<i>:</i> </span>{{ item.age }}
            </div>
            <div class="item">
              <span>时间<i>:</i></span>
              <span class="time">{{ item.lastVisitTime || '' }}</span>
            </div>
            <div class="item">
              <a class="morebtn" @click="handleToJump(item.faceId)">查看更多</a>
            </div>
          </div></el-main
        >
      </el-container>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: {
    info: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    handleToJump(id) {
      this.$router.push({
        path: '/Details/PassengerDetail',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.box-card {
  // display: flex;
  border-radius: 4px;
  margin-left: -0.84%;

  .card {
    display: inline-block;
    min-width: 242px;
    width: 19%;
    height: 20%;
    margin-left: 0.84%;
    margin-bottom: 15px;
    cursor: pointer;
  }

  .el-main {
    padding: 0;
  }
}

.headerImage {
  margin-top: 30px;
  width: 100%;
  border-radius: 50%;

  img {
    width: 41px;
    height: 41px;
    border-radius: 50%;
  }
}

.text-item {
  margin-left: 16px;
}

.item {
  span:first-child {
    display: inline-block;
    width: 55px;
    text-align-last: justify;
    color: #acaab7;
    padding-right: 6px;
    word-break: break-all;

    i {
      position: relative;
      right: 5px;
      font-style: normal;
    }
  }

  .time {
    display: inline-block;
    width: 50%;
    vertical-align: top;
    position: relative;
    left: -4px;
  }
}

.morebtn {
  color: #419eff;
  border-bottom: 1px solid #419eff;
  font-size: 14px;
}
</style>
