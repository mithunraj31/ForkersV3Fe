<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :offset="16">
        <el-checkbox
          v-model="driverCheck"
          @change="processData()"
        >Driver</el-checkbox>
        <el-checkbox
          v-model="eventCheck"
          @change="processData()"
        >Events</el-checkbox>
      </el-col>
    </el-row>
    <div id="timeline-embed" style="width: 100%; height: 400px" />
  </div>
</template>

<script>
import * as moment from 'moment'

// import { TL } from "./timeline-lib";
var _TL = require('./../../../utils/timeline-lib.js')
var TL = _TL.TL
export default {
  name: 'TimeLine',
  components: {},
  props: {
    header: {
      type: Object,
      default() {
        return {}
      }
    },
    driveSummery: {
      type: Array,
      default() {
        return []
      }
    },
    events: {
      type: Array,
      default() {
        return []
      }
    },
    operatorId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      iconClass: '',
      timeline: null,
      processedDriveData: {
        title: {
          text: {
            headline: '',
            text: 'sdsd'
          }
        },
        events: []
      },
      engineCheck: true,
      driverCheck: true,
      eventCheck: true
    }
  },
  beforeCreate() {},
  async mounted() {
    this.processData()
  },
  methods: {
    processData() {
      this.processedDriveData.events = []
      this.processDriveData()
      this.processEventData()
      this.timeline = new TL.Timeline(
        'timeline-embed',
        this.processedDriveData,
        { duration: 200, scale_factor: 2, language: this.currentLocale, marker_width_min: 1 }
      )
    },
    processDriveData() {
      this.processedDriveData['title'] = {
        text: {
          headline: this.header.headline + '<br/>',
          text: this.header.subtitle
        }
      }
      if (this.driveSummery && this.driveSummery.length > 0) {
        this.driveSummery.forEach((driver) => {
          const session = {}
          // When driving data is found
          if (this.driverCheck) {
            const driveSession = {}
            if (driver.drive_started_at) {
              driveSession['start_date'] = this.getTimelineDatetime(driver.drive_started_at)
            }
            if (driver.drive_stoped_at) {
              driveSession['end_date'] = this.getTimelineDatetime(driver.drive_stoped_at)
            }

            driveSession['isDriveSession'] = true
            driveSession['background'] = {
              color: '#206655'
            }
            session['group'] = '走行'
            const deviceId = driver.device_id
            driveSession['text'] = {
              headline: 'オペレーターの走行データ',
              text: '<p>オペレーター : ' + this.operatorId + '</p>' +
                    '<p>デバイス : ' + deviceId + '</p>' +
                    ' <a style="color: #70FAFA " href="#/devices/' + deviceId + '/drive-route?start=' + driver.drive_started_at + '&end=' + driver.drive_stoped_at + '"><i class="fas fa-map-marked-alt"></i> Route Map</a> '

            }
            this.processedDriveData.events.push(driveSession)
          }
        })
      }
    },

    processEventData() {
      if (this.eventCheck && this.events && this.events.length > 0) {
        this.events.forEach((event) => {
          const eventSession = {}

          eventSession['start_date'] = this.getTimelineDatetime(event.time)
          let eventType = 'Unknown'
          let icon = ''
          switch (event.type) {
            case 16:
              eventType = 'Acceleration'
              icon = '<i class="fas fa-shipping-fast"></i> '
              break
            case 17:
              eventType = 'Deceleration'
              icon = '<i class="fas fa-parking"></i> '
              // icon = '<i class="fas fa-car-crash"> '
              break
            case 14:
              eventType = 'Button'
              icon = '<i class="fas fa-hand-point-down"></i> '
              break
            case 20:
              eventType = 'Impact'
              icon = '<i class="fas fa-car-crash"> '
              break
            case 21:
              eventType = 'Turn Left'
              icon = '<i class="fas fa-arrow-left"></i> '
              break
            case 22:
              eventType = 'Turn Right'
              icon = '<i class="fas fa-arrow-right"></i> '
              break
            case 23:
              eventType = 'Clip'
              icon = '<i class="fas fa-video"></i> '
              break
            default:
            // code block
          }

          eventSession['isEvent'] = true
          eventSession['background'] = {
            color: '#d19d59'
          }
          eventSession['group'] = 'イベント'
          eventSession['text'] = {
            headline: icon + eventType + ' イベント',
            text:
              '<p>デバイス :' +
              event.device_id +
              '</p>' +
              '<p>' +
              icon +
              eventType +
              ' イベント</p>' +
              '<p>オペレーター :' +
              event.driver_id +
              '</p>'
          }

          this.processedDriveData.events.push(eventSession)
        })
      }
    },
    getTimelineDatetime(datetime) {
      const dt = moment(datetime)
      return {
        year: dt.year(),
        month: dt.month(),
        day: dt.date(),
        hour: dt.hour(),
        minute: dt.minute(),
        second: dt.second()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/timeline.scss";
.engine-session {
  background-color: #324157 !important;

  .tl-headline {
    color: azure !important;
  }
}
.drive-session {
  background-color: #30b08f !important;
}
.event {
  background-color: #fec171 !important;
  .tl-headline {
    color: rgb(241, 7, 7) !important;
  }
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
}
</style>

