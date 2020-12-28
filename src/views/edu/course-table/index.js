import weekCourseTable from './componts/week'
import monthCourseTable from './componts/month'
import listCourseTable from './componts/list'
import paikeClass from './componts/paike-class/index.vue'
import { getClassSimpleList } from '@/api/class'
export default {
  data() {
    return {
      type: 'week',
      calendarList: {
        week: [],
        item: []
      },

      paikeClassShow: false,
      classList: []
    }
  },

  components: {
    weekCourseTable,
    monthCourseTable,
    listCourseTable,
    paikeClass
  },

  created() {
    this.getClassSimpleList()
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
    },

    getClassSimpleList() {
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      getClassSimpleList(params).then(res => {
        this.classList = res.data
      })
    }
  }
}
