<template>
  <common-table
    v-loading="loading"
    :data="list"
    :headers="headers"
    :paging="true"
    :total-num="total"
    :page-num.sync="page"
    :size-num.sync="limit"
    @callback="getClassMemberList"
  >
    <template slot="operation">
      <el-button class="btn-delete" type="text">删除</el-button>
    </template>
  </common-table>
</template>

<script>
import { getClassMemberList } from '@/api/class'
import { dateFormat } from '@/utils/date'
import { classMemberStatus } from '@/config/index'
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
          prop: 'student_name',
          label: '学生姓名'
        },
        {
          prop: 'status',
          label: '学生状态',
          formatter(row, column, value) {
            return classMemberStatus[value]
          }
        },
        {
          prop: 'entry_at',
          label: '进班时间',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        },
        {
          prop: 'leave_at',
          label: '离班时间',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        }
      ]
    }
  },

  created() {
    this.getClassMemberList()
  },

  methods: {
    getClassMemberList() {
      this.loading = true
      getClassMemberList({
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
