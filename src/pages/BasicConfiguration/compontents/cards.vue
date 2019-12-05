<template>
  <div class="box-card">
    <el-card
      v-for="(item, index) in info"
      :key="index"
      class="card"
      shadow="hover"
    >
      <div @mouseover="enter(index)" @mouseout="out(index)">
        <div slot="header" class="title">
          <span class="name">
            <i class="icon market"></i>
            {{ item.name || '广州-天河城（大型商场' }}
          </span>

          <span v-show="showCard[index]" class="button-group">
            <el-button type="text" @click="editArea(item)">
              <i class="icon edit"></i>
            </el-button>
            <el-button type="text" @click="deleteArea(item)">
              <i class="icon delete"></i>
            </el-button>
          </span>
        </div>
        <div class="content">
          <ul style="padding-inline-start: 22px;">
            <li>
              <label class="key"> <i class="icon region"></i>区域数： </label>
              <span class="value">{{ item.regionNumber || '0' }}</span>
            </li>
            <li>
              <label class="key"> <i class="icon shop"></i>商铺数： </label>
              <span class="value">{{ item.storeNumber || '0' }}</span>
            </li>
            <li>
              <label class="key"> <i class="people icon"></i>责任人： </label>
              <span class="value">{{ item.contactPerson || '' }}</span>
            </li>
            <li>
              <label class="key"> <i class="phone icon"></i>电话： </label>
              <span class="value">{{ item.contactTel || '' }}</span>
            </li>
          </ul>
          <ul style="padding-inline-start: 22px;">
            <li>
              <label class="key"> <i class="floor icon"></i>楼层数： </label>
              <span class="value">{{ item.floorNumber || '0' }}</span>
            </li>
            <li>
              <label class="key"> <i class="device icon"></i>设备数： </label>
              <span class="value">{{ item.deviceNumber || '0' }}</span>
            </li>
            <li>
              <label class="key"> <i class="num icon"></i>编号： </label>
              <span class="value">{{ item.displayId || '001' }}</span>
            </li>
          </ul>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Cards',
  props: {
    info: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      showCard: [],
    }
  },
  methods: {
    enter(index) {
      this.$set(this.showCard, index, true)
    },
    out(index) {
      this.$set(this.showCard, index, false)
    },
    editArea(item) {
      this.$emit('editArea', item.id)
    },
    deleteArea(item) {
      this.$emit('deleteArea', item.id)
    },
  },
}
</script>

<style lang="less" scoped>
.box-card {
  // display: flex;
  border-radius: 4px;
  margin-right: -0.85%;
  margin-top: 15px;
  // margin-left: 10px;

  .card {
    display: inline-block;
    width: 32.3%;
    // min-width: 525px;
    // height: 258px;
    margin-right: 0.85%;
    margin-bottom: 15px;
    // margin-bottom: 15px;
    .title {
      position: relative;
      top: -11px;

      .market {
        width: 40px;
        height: 40px;
        display: inline-block;
        position: relative;
        top: 15px;
        background: url('../../../assets/imgs/market.svg') no-repeat;
      }

      .name {
        color: #3e3e3e;
        font-size: 18px;
        font-weight: bold;
      }

      .button-group {
        position: absolute;
        right: 0;
        font-size: 14px;
        top: 15px;

        .icon {
          color: #419eff;
          width: 20px;
          height: 20px;
          display: inline-block;
        }

        .edit {
          background: url('../../../assets/imgs/edit.svg') no-repeat;
        }

        .delete {
          background: url('../../../assets/imgs/delete.svg') no-repeat;
        }
      }
    }

    .content {
      overflow: hidden;

      ul {
        list-style: none;
        float: left;

        li {
          margin: 15px 0;
          font-size: 14px;

          .key {
            color: #505050;
            position: relative;
            top: -10px;

            .icon {
              color: #419eff;
              padding-right: 3px;
              width: 20px;
              height: 20px;
              display: inline-block;
              position: relative;
              top: 6px;
            }

            .region {
              background: url('../../../assets/imgs/area.svg') no-repeat;
            }

            .shop {
              background: url('../../../assets/imgs/shop.svg') no-repeat;
            }

            .people {
              background: url('../../../assets/imgs/people.svg') no-repeat;
            }

            .num {
              background: url('../../../assets/imgs/num.svg') no-repeat;
            }

            .phone {
              background: url('../../../assets/imgs/tel.svg') no-repeat;
            }

            .floor {
              background: url('../../../assets/imgs/floor.svg') no-repeat;
            }

            .device {
              background: url('../../../assets/imgs/device.svg') no-repeat;
            }
          }

          .value {
            color: #505050;
            font-weight: bold;
            position: relative;
            top: -10px;
          }
        }
      }
    }
  }
}
</style>
