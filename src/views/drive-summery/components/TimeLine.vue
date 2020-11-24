<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :offset="16">
        <el-checkbox
          v-model="engineCheck"
          @change="processData()"
        >Engine</el-checkbox>
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
// import { TL } from "./timeline-lib";
var _TL = require('./timeline-lib')
var TL = _TL.TL
export default {
  name: 'TimeLine',
  components: {},
  props: {
    deviceId: {
      type: String,
      default: ''
    },
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
        { duration: 200, scale_factor: 2, language: 'ja', marker_width_min: 1 }
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
        this.driveSummery.forEach((drive) => {
          const session = {}
          if (this.engineCheck) {
            // When engine session
            if (drive.engine_started_at) {
              session['start_date'] = {
                year: new Date(drive.engine_started_at).getFullYear(),
                month: new Date(drive.engine_started_at).getMonth() + 1,
                day: new Date(drive.engine_started_at).getDay() + 1,
                hour: new Date(drive.engine_started_at).getHours(),
                minute: new Date(drive.engine_started_at).getMinutes(),
                second: new Date(drive.engine_started_at).getSeconds()
              }
              if (drive.engine_stoped_at) {
                session['end_date'] = {
                  year: new Date(drive.engine_stoped_at).getFullYear(),
                  month: new Date(drive.engine_stoped_at).getMonth() + 1,
                  day: new Date(drive.engine_stoped_at).getDay() + 1,
                  hour: new Date(drive.engine_stoped_at).getHours(),
                  minute: new Date(drive.engine_stoped_at).getMinutes(),
                  second: new Date(drive.engine_stoped_at).getSeconds()
                }
              }

              session['isEngineSession'] = true
              session['background'] = {
                color: '#324157'
              }
              session['group'] = '走行'
              const drivers = drive.driver_data
                ? drive.driver_data.length.toString()
                : '0'
              session['text'] = {
                headline: '車両の走行データ',
                text:
                  '<p>' +
                  drivers +
                  'オペレーターの走行データが見つかりました</p>'
              }
            }
            this.processedDriveData.events.push(session)
          }
          // When driving data is found
          if (this.driverCheck) {
            if (drive.driver_data && drive.driver_data.length > 0) {
              drive.driver_data.forEach((driver) => {
                const driveSession = {}
                if (driver.drive_start_at) {
                  driveSession['start_date'] = {
                    year: new Date(driver.drive_start_at).getFullYear(),
                    month: new Date(driver.drive_start_at).getMonth() + 1,
                    day: new Date(driver.drive_start_at).getDay() + 1,
                    hour: new Date(driver.drive_start_at).getHours(),
                    minute: new Date(driver.drive_start_at).getMinutes(),
                    second: new Date(driver.drive_start_at).getSeconds()
                  }
                }
                if (driver.drive_ended_at) {
                  driveSession['end_date'] = {
                    year: new Date(driver.drive_ended_at).getFullYear(),
                    month: new Date(driver.drive_ended_at).getMonth() + 1,
                    day: new Date(driver.drive_ended_at).getDay() + 1,
                    hour: new Date(driver.drive_ended_at).getHours(),
                    minute: new Date(driver.drive_ended_at).getMinutes(),
                    second: new Date(driver.drive_ended_at).getSeconds()
                  }
                }

                driveSession['isDriveSession'] = true
                driveSession['background'] = {
                  color: '#206655'
                }
                session['group'] = '走行'
                const driverId = driver.driver_id
                driveSession['text'] = {
                  headline: 'オペレーターの走行データ',
                  text: '<p>オペレーター : ' + driverId + '</p>' +
                  ' <a style="color: #70FAFA " href="#/devices/' + this.deviceId + '/drive-route?start=' + driver.drive_start_at + '&end=' + driver.drive_ended_at + '"><i class="fas fa-map-marked-alt"></i> Route Map</a> '
                }
                this.processedDriveData.events.push(driveSession)
              })
            }
          }
        })
      }
    },

    processEventData() {
      if (this.eventCheck && this.events && this.events.length > 0) {
        this.events.forEach((event) => {
          const eventSession = {}

          eventSession['start_date'] = {
            year: new Date(event.time).getFullYear(),
            month: new Date(event.time).getMonth() + 1,
            day: new Date(event.time).getDay() + 1,
            hour: new Date(event.time).getHours(),
            minute: new Date(event.time).getMinutes(),
            second: new Date(event.time).getSeconds()
          }
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

