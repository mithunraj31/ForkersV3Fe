<template>
  <div class="app-container">
    <!-- <el-row :gutter="20" class="panel-group" /> -->
    <el-row :gutter="40" class="panel-group">
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-online">
            <font-awesome-icon icon="caret-square-up" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.online') }}
            </div>
            <count-to :start-val="0" :end-val="online" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-offline">
            <font-awesome-icon icon="caret-square-down" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.offline') }}
            </div>
            <count-to :start-val="0" :end-val="offline" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :lg="24" />
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-acceleration">
            <font-awesome-icon icon="tachometer-alt" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.event.suddenAccelaration') }}
            </div>
            <count-to :start-val="0" :end-val="acceleration" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-deceleration">
            <font-awesome-icon icon="exclamation-triangle" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.event.suddenDeceleration') }}
            </div>
            <count-to :start-val="0" :end-val="deceleration" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-sudden-handle">
            <font-awesome-icon icon="car-crash" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.event.suddenHandle') }}
            </div>
            <count-to :start-val="0" :end-val="accident" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
      <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
        <div class="card-panel">
          <div class="card-panel-icon-wrapper icon-handle">
            <font-awesome-icon icon="directions" class="card-panel-icon" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              {{ $t('maps.event.accident') }}
            </div>
            <count-to :start-val="0" :end-val="handle" :duration="2000" class="card-panel-num" />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  name: 'EventPanel',
  components: {
    CountTo
  },
  props: {
    acceleration: {
      type: Number,
      default: 0
    },
    deceleration: {
      type: Number,
      default: 0
    },
    accident: {
      type: Number,
      default: 0
    },
    handle: {
      type: Number,
      default: 0
    },
    online: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  computed: {
    offline() {
      return this.total - this.online
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 23px;
  }

  .card-panel {
    height: 75px; // note
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-acceleration {
        background: #40c9c6;
      }

      .icon-deceleration {
        background: #36a3f7;
      }

      .icon-sudden-handle {
        background: #f4516c;
      }

      .icon-handle {
        background: #34bfa3
      }

      .icon-online {
      background:  #24AE21
    }

    .icon-offline {
      background: #c0c0c0
    }
    }

    .icon-acceleration {
      color: #f7e239;
    }

    .icon-deceleration {
      color: #36a3f7;
    }

    .icon-sudden-handle {
      color: #f4516c;
    }

    .icon-handle {
      color: #34bfa3;
    }

    .icon-online {
      color:  #24AE21;
    }

    .icon-offline {
      color: #c0c0c0;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 0 0 0 14px; // note
      padding: 13.5px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 14px 26px 26px 0; // note

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

