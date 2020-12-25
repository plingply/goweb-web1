<template>
  <common-table
    v-loading="loading"
    :data="list"
    :headers="headers"
    :paging="true"
    :total-num="total"
    :page-num.sync="page"
    :size-num.sync="limit"
    @callback="getCourseList"
  >
    <template slot="operation">
      <el-button class="btn-delete" type="text">删除</el-button>
    </template>
  </common-table>
</template>

<script>
import { getCourseList } from '@/api/course'
import { dateFormat, weekFormat } from '@/utils/date'
import { courseStatus } from '@/config/index'
export default {
  data() {
    return {
      loading: false,
      page: 1,
      limit: 10,
      list: [],
      total: 0,
      headers: [
        {
          prop: 'subject_name',
          label: '课程名称'
        },
        {
          prop: 'course_type',
          label: '课程类型',
          formatter(row, column, value) {
            return courseStatus[value]
          }
        },
        {
          prop: 'start_time',
          label: '上课时间',
          width: '180px',
          formatter(row, column, value) {
            return '[星期' + weekFormat(value) + ']' + dateFormat(value, 'YYYY-MM-DD hh:mm')
          }
        },
        {
          prop: 'len',
          label: '上课时长',
          formatter(row, column, value) {
            return value + '分钟'
          }
        }
      ]
    }
  },

  created() {
    this.getCourseList()
  },

  methods: {
    getCourseList() {
      this.loading = true
      getCourseList({
        school_id: this.school_id,
        campus_id: this.campus_id,
        class_id: this.$route.params.class_id,
        page: this.page,
        limit: this.limit
      })
        .then((res) => {
          this.loading = false
          this.list = res.data.item
          this.total = res.data.total
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
