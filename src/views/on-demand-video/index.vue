<template>
  <div class="app-container">
    <el-row>
      <el-col :span="20">
        <el-form ref="form" v-loading="loading" :model="form" label-width="120px">
          <el-form-item :label="$t('onDemandVideo.videoPeriod')">
            <el-radio-group v-model="form.resource">
              <el-row>
                <el-col><el-radio class="period-radio first-item" :label="1" border>{{ $t('onDemandVideo.fromBegin') }}</el-radio></el-col>
              </el-row>
              <el-row>
                <el-col><el-radio class="period-radio" :label="2" border>{{ $t('onDemandVideo.fromEnd') }}</el-radio></el-col>
              </el-row>
              <el-row>
                <el-col><el-radio class="period-radio" :label="3" border>{{ $t('onDemandVideo.customRange') }}</el-radio></el-col>
              </el-row>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.resource === 3" :label="$t('onDemandVideo.datetime')">
            <el-date-picker v-model="form.dateRange" :picker-options="datePickerOptions" type="daterange" range-separator="~" />
          </el-form-item>
          <el-form-item v-if="form.resource === 3" label="">
            <el-time-picker
              v-model="form.startTime"
            />
            ~
            <el-time-picker
              v-model="form.endTime"
            />
          </el-form-item>
          <el-form-item :label="$t('onDemandVideo.duration')">
            <el-input-number v-model="form.duration" class="duration" :disabled="form.resource === 3" :step="1" :min="0" :max="maxDuration" /> {{ $t('general.minutes') }}
            <span v-if="(form.resource === 3 || durationAsSeconds < 60) && !isInvalidDatetimeRange">({{ durationAsSeconds }} {{ $t('general.seconds') }})</span>
            <span v-if="form.resource === 3 && durationAsSeconds > 300" class="invalid-datetime-range">
              {{ $t('message.videoDuration') }} 0 ~ 5  {{ $t('general.minutes') }}</span>

            <span v-if="form.resource === 3 && isInvalidDatetimeRange" class="invalid-datetime-range">{{ $t('message.invalidDatetimeRange') }} {{ startDatetime }} ~ {{ endDatetime }}</span>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="form.resource === 3 && (isInvalidDatetimeRange || durationAsSeconds > 300)" type="primary" @click="onSubmit">{{ $t('onDemandVideo.submitButton') }}</el-button>
            <el-button @click="initialForm">{{ $t('onDemandVideo.clearButton') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import * as moment from 'moment'
import { makeVideo } from '@/api/video'

export default {
  data() {
    return {
      form: {
        resource: 3,
        duration: 0,
        dateRange: [],
        startTime: null,
        endTime: null
      },
      loading: false,
      maxDuration: 5,
      datePickerOptions: {
        disabledDate(date) {
          return date > new Date()
        }
      }
    }
  },
  computed: {
    durationAsSeconds() {
      if (this.form.resource === 3) {
        const start = moment(`${moment(this.form.dateRange[0]).format('YYYY-MM-DD')} ${moment(this.form.startTime).format('h:mm:ss')}`)
        const end = moment(`${moment(this.form.dateRange[1]).format('YYYY-MM-DD')} ${moment(this.form.endTime).format('h:mm:ss')}`)
        const timePickerDuration = moment.duration(end.diff(start))
        // this.form.duration = timePickerDuration.asMinutes()
        return timePickerDuration.asSeconds()
      }
      const { duration } = this.getDurationFormQueryString()
      // this.form.duration = duration.asMinutes()
      return duration.asSeconds()
    },
    isInvalidDatetimeRange() {
      if (isNaN(this.durationAsSeconds)) {
        return true
      }
      const { duration } = this.getDurationFormQueryString()
      return this.durationAsSeconds < 1 || this.durationAsSeconds > duration.asSeconds()
    },
    startDatetime() {
      return moment(this.$route.query.start).format('YYYY-MM-DD hh:mm:ss')
    },
    endDatetime() {
      return moment(this.$route.query.end).format('YYYY-MM-DD hh:mm:ss')
    }
  },
  watch: {
    durationAsSeconds: {
      deep: true,
      handler: function(newVal) {
        if (this.form.resource === 3) {
          const start = moment(`${moment(this.form.dateRange[0]).format('YYYY-MM-DD')} ${moment(this.form.startTime).format('h:mm:ss')}`)
          const end = moment(`${moment(this.form.dateRange[1]).format('YYYY-MM-DD')} ${moment(this.form.endTime).format('h:mm:ss')}`)
          const timePickerDuration = moment.duration(end.diff(start))
          this.form.duration = timePickerDuration.asMinutes()
        }
        const { duration } = this.getDurationFormQueryString()
        this.form.duration = duration.asMinutes()
      }
    }
  },
  mounted() {
    this.initialForm()
  },
  methods: {
    async onSubmit() {
      let videoMaker = {}
      if (this.form.resource === 1) {
        const start = moment(this.$route.query.start)
        videoMaker = {
          beginDatetime: this.$route.query.start,
          endDatetime: start.add(this.form.duration || 1, 'minutes').format('YYYY-MM-DD hh:mm:ss')
        }
      } else if (this.form.resource === 2) {
        const end = moment(this.$route.query.end)
        videoMaker = {
          beginDatetime: end.add((this.form.duration * -1) || -1, 'minutes').format('YYYY-MM-DD hh:mm:ss'),
          endDatetime: this.$route.query.end
        }
      } else if (this.form.resource === 3) {
        videoMaker = {
          beginDatetime: `${moment(this.form.dateRange[0]).format('YYYY-MM-DD')} ${moment(this.form.startTime).format('h:mm:ss')}`,
          endDatetime: `${moment(this.form.dateRange[1]).format('YYYY-MM-DD')} ${moment(this.form.endTime).format('h:mm:ss')}`
        }
      } else {
        throw new Error('Not implemented exception')
      }

      videoMaker.deviceId = this.$route.params.deviceId
      this.loading = true
      try {
        const { data } = await makeVideo(videoMaker)
        this.$message({
          message: this.$t('message.videoIsProcessing'),
          type: 'success'
        })
        await (new Promise(resolve => setTimeout(resolve, 5000)))
        this.loading = false
        this.$router.push(`/eventSummary/${data.eventId}/event-detail`)
      } catch (error) {
        this.$message({
          message: this.$t('message.noVideo'),
          type: 'error'
        })

        this.loading = false
      }
    },
    getDurationFormQueryString() {
      const start = moment(this.$route.query.start)
      const end = moment(this.$route.query.end)
      const duration = moment.duration(end.diff(start))
      return { start, end, duration }
    },
    initialForm() {
      this.form.resource = 1
      const { start, end, duration } = this.getDurationFormQueryString()
      this.form.duration = duration.asMinutes()

      if (this.form.duration < 5) {
        this.maxDuration = this.form.duration
      }

      this.form.dateRange = [
        start.toDate(),
        end.toDate()
      ]

      this.datePickerOptions = {
        disabledDate(date) {
          const startDateWithoutTime = moment(start.format('YYYY-MM-DD'))
          const endDateWithoutTime = moment(end.format('YYYY-MM-DD'))
          return date < startDateWithoutTime.toDate() || date > endDateWithoutTime.toDate()
        }
      }
      this.form.startTime = start.toDate()
      this.form.endTime = end.toDate()
    }
  }
}
</script>

<style lang="scss" scoped>
.period-radio {
  margin-top: 20px;
  min-width: 200px;
  &.first-item {
     margin-top: 0;
  }
}
.duration {
  max-width: 200px;
  margin-right: 5px;
}

.invalid-datetime-range {
  color: red;
}
</style>
