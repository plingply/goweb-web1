import weekCourseTable from './componts/week'
import monthCourseTable from './componts/month'
import listCourseTable from './componts/list'
export default {
  data() {
    return {
      type: 'week',
      calendarList: {
        week: [],
        item: []
      }
    }
  },

  components: {
    weekCourseTable,
    monthCourseTable,
    listCourseTable
  },

  methods: {
    initCalendar(obj) {
      this.calendarList = obj
    },

    weekandmonthFun(type) {
      this.type = type
    },

    prew() {
      this.$refs[this.type].prew()
    },

    next() {
      this.$refs[this.type].next()
    }
  }
}
