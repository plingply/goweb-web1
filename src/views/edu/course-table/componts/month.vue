<!--
 * @Author: 彭林
 * @Date: 2020-12-28 16:09:21
 * @LastEditTime: 2020-12-28 18:27:42
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/views/edu/course-table/componts/month.vue
-->

<template>
  <div v-loading="loading" class="month">
    <div class="table_head">
      <span v-for="(item,index) in calendarList.week" :key="index">
        <em>{{ item | weekUnit }}</em>
      </span>
    </div>
    <div class="table_box">
      <div
        v-for="(item,index) in calendarList.item"
        :key="index"
        :class="{ currentMonth: item.isCurrentMonth , currentDay: item.isCurrentToday }"
      >
        <time>{{ item.day }}</time>
        <div
          v-for="(list,indexs) in item.result"
          :key="indexs"
          :class="{ await: list.status == '1', end: list.status == '3', ing: list.status == '2'}"
          data-popover="popover"
          @click="showPopfunc(list)"
        >
          <p>课程：{{ list.subject_name }}({{ courseType[list.course_type] }})</p>
          <span>{{ list.start_time | dateFormat('hh:mm') }}-{{ list.end_time | dateFormat('hh:mm') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Calendar from 'c-calendar'
import { getCourseList } from '@/api/course'
import { courseType } from '@/config/index'
export default {
  data() {
    return {
      loading: false,
      calendar: {},
      courseType,
      calendarList: {
        week: [],
        item: []
      },
      sk_time: [],
      page: 1,
      limit: 10
    }
  },

  created() {
    this.weekandmonthFun()
  },

  methods: {
    weekandmonthFun(val) {
      this.calendar = new Calendar({
        time: new Date(),
        type: val,
        week: 'month'
      })
      this.sk_time = []
      this.calendarList = this.calendar.init()
      this.$emit('initCalendar', this.calendarList)
      this.getCourseList()
    },

    prew() {
      this.calendarList = this.calendar.prew()
      this.$emit('initCalendar', this.calendarList)
      this.getCourseList()
    },

    next() {
      this.calendarList = this.calendar.next()
      this.$emit('initCalendar', this.calendarList)
      this.getCourseList()
    },

    getCourseList() {
      this.loading = true

      let start_time = null
      let end_time = {}
      this.calendarList.item.map((item, index) => {
        if (index < 15) {
          if (item.isCurrentMonth) {
            start_time = start_time || item
          }
        } else {
          if (item.isCurrentMonth) {
            end_time = item
          }
        }
      })

      start_time = new Date(start_time.year, start_time.month - 1, start_time.day).setHours(0, 0, 0)
      end_time = new Date(end_time.year, end_time.month - 1, end_time.day).setHours(23, 59, 59)

      getCourseList({
        school_id: this.school_id,
        campus_id: this.campus_id,
        class_id: '',
        start_time,
        end_time
      })
        .then((res) => {
          this.loading = false
          this.list = res.data.item
          this.formatCalendarData(this.list)
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 格式化日历
    formatCalendarData(result) {
      const arr = this.calendarList.item
      arr.map((item) => {
        item.result = item.result ? item.result : []
        result.map((list) => {
          const time = new Date(parseInt(list.start_time))
          const year = time.getFullYear()
          const month = time.getMonth() + 1
          const day = time.getDate()
          const hourse = time.getHours()
          list.fmt = hourse >= 12 ? 'pm' : 'am'
          if (item.year == year && item.month == month && item.day == day) {
            item.result.push(list)
          }
        })
      })

      this.$nextTick(() => {
        this.calendarList.item = JSON.parse(JSON.stringify(arr))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.table_head {
  width: 100%;
  display: flex;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  box-sizing: border-box;

  span {
    display: block;
    flex: 1;
    height: 40px;
    border-right: 1px solid #eee;
    border-bottom: 1px solid #eee;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 1;

    em {
      font-style: normal;
      font-size: 14px;
      line-height: 20px;
      color: $text_c3;
    }

    s {
      text-decoration: none;
      font-size: 12px;
      color: $text_c6;
    }
  }
}

.month {
  .table_box {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    flex-wrap: wrap;

    > div {
      width: calc(100% / 7);
      min-width: calc(100% / 7);
      box-sizing: border-box;
      border-left: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: 8px;
      min-height: 150px;
      position: relative;
      background-color: #fdfdfd;

      &.currentMonth {
        background-color: #fff;

        &:hover {
          background-color: #f8f8f8;
        }

        &.currentDay {
          border: 1px solid $main;
        }
      }

      time {
        display: block;
        text-align: right;
        font-size: 14px;
        color: $text_c6;
        margin-bottom: 4px;
      }

      > div {
        margin-bottom: 4px;
        padding: 8px;
        border-radius: 2px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 12px;
        line-height: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        &.end {
          background-color: $main;
          color: #fff;
        }

        &:hover {
          //border: 1px solid #00d756;
          transform: scale(1.05);
          box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.2);
        }

        &.end {
          background-color: #b3b3b3;
          color: #fff;
        }

        &.await {
          background-color: #ffb418;
          color: #fff;
        }

        &.ing {
          background-color: $panGreen;
          color: #fff;
        }

        .c_icon {
          position: absolute;
          top: 0;
          right: 0;

          img {
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
