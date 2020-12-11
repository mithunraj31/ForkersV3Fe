<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="8" :offset="16">
        <el-checkbox
          v-model="engineCheck"
          @change="processData()"
        >{{ $t('driveSummary.engine') }}</el-checkbox>
        <el-checkbox
          v-model="driverCheck"
          @change="processData()"
        >{{ $t('driveSummary.driver') }}</el-checkbox>
        <el-checkbox
          v-model="eventCheck"
          @change="processData()"
        >{{ $t('driveSummary.eventLabel') }}</el-checkbox>
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
            text: ''
          }
        },
        events: []
      },
      engineCheck: true,
      driverCheck: true,
      eventCheck: true
    }
  },
  computed: {
    currentLocale() {
      return this.$store.state.app.language || 'en'
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
        this.driveSummery.forEach((drive) => {
          const session = {}
          if (this.engineCheck) {
            // When engine session
            if (drive.engine_started_at) {
              session['start_date'] = this.getTimelineDatetime(drive.engine_started_at)
              if (drive.engine_stoped_at) {
                session['end_date'] = this.getTimelineDatetime(drive.engine_stoped_at)
              }

              session['isEngineSession'] = true
              session['background'] = {
                color: '#324157'
              }
              session['group'] = this.$t('driveSummary.running')
              const drivers = drive.driver_data
                ? drive.driver_data.length.toString()
                : '0'
              session['text'] = {
                headline: this.$t('driveSummary.vehicleDrivingData'), // '車両の走行データ',
                text:
                  '<p>' +
                  drivers +
                  `${this.$t('driveSummary.operatorDrivingData')} ${this.$t('driveSummary.discovered')}</p>`
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
                  driveSession['start_date'] = this.getTimelineDatetime(driver.drive_start_at)
                }
                if (driver.drive_ended_at) {
                  driveSession['end_date'] = this.getTimelineDatetime(driver.drive_ended_at)
                }

                driveSession['isDriveSession'] = true
                driveSession['background'] = {
                  color: '#206655'
                }
                session['group'] = this.$t('driveSummary.running')
                const driverId = driver.driver_id
                driveSession['text'] = {
                  headline: this.$t('driveSummary.operatorDrivingData'),
                  text:
                    `<p>${this.$t('driveSummary.operator')} : ` +
                    driverId +
                    '</p>' +
                    ' <a style="color: #70FAFA " href="#/devices/' +
                    this.deviceId +
                    '/drive-route?start=' +
                    driver.drive_start_at +
                    '&end=' +
                    driver.drive_ended_at +
                    '"><i class="fas fa-map-marked-alt"></i> ' + this.$t('driveSummary.routeMap') + '</a> '
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
          eventSession['start_date'] = this.getTimelineDatetime(event.time)
          let eventType = 'Unknown'
          let icon = ''
          switch (event.type) {
            case 16:
              eventType = this.$t('type.Acceleration')// 'Acceleration'
              icon = '<i class="fas fa-shipping-fast"></i> '
              break
            case 17:
              eventType = this.$t('type.Deceleration') // 'Deceleration'
              icon = '<i class="fas fa-parking"></i> '
              // icon = '<i class="fas fa-car-crash"> '
              break
            case 14:
              eventType = this.$t('type.Button') // 'Button'
              icon = '<i class="fas fa-hand-point-down"></i> '
              break
            case 20:
              eventType = this.$t('type.Impact')// 'Impact'
              icon = '<i class="fas fa-car-crash"> '
              break
            case 21:
              eventType = this.$t('type.TurnLeft')// 'Turn Left'
              icon = '<i class="fas fa-arrow-left"></i> '
              break
            case 22:
              eventType = this.$t('type.TurnRight') // 'Turn Right'
              icon = '<i class="fas fa-arrow-right"></i> '
              break
            case 23:
              eventType = this.$t('type.clip')// 'Clip'
              icon = '<i class="fas fa-video"></i> '
              break
            default:
            // code block
          }

          eventSession['isEvent'] = true
          eventSession['background'] = {
            color: '#d19d59'
          }
          eventSession['group'] = this.$t('driveSummary.eventLabel')
          eventSession['text'] = {
            headline: icon + eventType + ` ${this.$t('driveSummary.eventLabel')}`,
            text:
              `<p>${this.$t('device.device')} :` +
              event.device_id +
              '</p>' +
              '<p>' +
              icon +
              eventType +
              ` ${this.$t('driveSummary.eventLabel')}</p>` +
              `<p>${this.$t('driveSummary.operator')} :` +
              event.driver_id +
              '</p>'
          }
          if (event.video && event.video.converted_video_url) {
            eventSession['media'] = {
              url: event.video.converted_video_url
            }
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

