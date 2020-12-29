import weekCourseTable from './componts/week'
import monthCourseTable from './componts/month'
import listCourseTable from './componts/list'
import paikeClass from './componts/paike-class/index.vue'
import { getClassSimpleList } from '@/api/class'
import { getSubjectList } from '@/api/subject'
import { getTeacherList } from '@/api/teacher'
export default {
  data() {
    return {
      type: 'week',
      calendarList: {
        week: [],
        item: []
      },

      paikeClassShow: false,
      classList: [],
      subjectList: [],
      teacherList: []
    }
  },

  components: {
    weekCourseTable,
    monthCourseTable,
    listCourseTable,
    paikeClass
  },

  created() {
    // 获取班级列表
    this.getClassSimpleList()
    // 获取课程列表
    this.getSubjectList()
    // 老师列表
    this.getTeacherList()
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
    },

    getSubjectList() {
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      getSubjectList(params).then(res => {
        this.subjectList = res.data.item
      })
    },

    getTeacherList() {
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      getTeacherList(params).then(res => {
        this.teacherList = res.data.item
      })
    }
  }
}
