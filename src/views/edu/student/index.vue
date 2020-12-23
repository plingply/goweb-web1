<template>
  <page>
    <div style="margin-bottom:24px;">
      <el-button type="primary" @click="openAddStudent(true, '添加学生', null)">添加学生</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getStudentList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openAddStudent(true, '编辑学生', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <add-student
      :show.sync="showAddStudent"
      :title="title"
      :student-info="studentInfo"
      @callback="studentCallback"
    />
  </page>
</template>

<script>
import { getStudentList } from '@/api/student'
import { dateFormat } from '@/utils/date'
import addStudent from './compontents/add-student'
import { sexObj, studentStatus } from '@/config/index'

export default {
  components: {
    addStudent
  },
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'student_name',
          label: '学生姓名'
        },
        {
          prop: 'sex',
          label: '性别',
          formatter(row, column, value) {
            return sexObj[value]
          }
        },
        {
          prop: 'birthday',
          label: '学员生日',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        },
        {
          prop: 'status',
          label: '学生状态',
          formatter(row, column, value) {
            return studentStatus[value]
          }
        },
        {
          prop: 'created_at',
          label: '创建时间',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        }
      ],

      total: 0,
      page: 1,
      limit: 10,

      showAddStudent: false,
      title: '',
      studentInfo: {}
    }
  },

  computed: {
    schoolId() {
      return this.$store.state.school.schoolId
    },

    campus_id() {
      return this.$store.state.school.campus_id
    }
  },

  created() {
    this.getStudentList()
  },

  methods: {
    studentCallback() {
      this.getStudentList()
    },

    openAddStudent(bool, title, studentInfo) {
      this.showAddStudent = bool
      this.title = title
      this.studentInfo = studentInfo
    },

    getStudentList() {
      this.loading = true
      getStudentList({
        school_id: this.schoolId,
        campus_id: this.campus_id,
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
