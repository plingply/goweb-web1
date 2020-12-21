<template>
  <div class="app-container">
    <div style="margin-bottom:24px;">
      <el-button type="primary" @click="openAddteacher(true, '添加老师', null)">添加老师</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getTeacherList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openAddteacher(true, '编辑老师', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <add-teacher
      :show.sync="showAddteacher"
      :title="title"
      :teacher-info="teacherInfo"
      @callback="teacherCallback"
    />
  </div>
</template>

<script>
import { getTeacherList } from '@/api/teacher'
import { dateFormat } from '@/utils/date'
import addTeacher from './compontents/add-teacher'

export default {
  components: {
    addTeacher
  },
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'teacher_name',
          label: '老师名称'
        },
        {
          prop: 'phone',
          label: '联系电话'
        },
        {
          prop: 'sex',
          label: '性别',
          formatter(row, column, value) {
            const sexArr = {
              1: '男',
              2: '女',
              3: '保密'
            }
            return sexArr[value]
          }
        },
        {
          prop: 'birthday',
          label: '生日',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        },
        {
          prop: 'address',
          label: '联系地址'
        },
        {
          prop: 'entry_at',
          label: '入职时间',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        }
      ],

      total: 0,
      page: 1,
      limit: 10,

      showAddteacher: false,
      title: '',
      teacherInfo: {}
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
    this.getTeacherList()
  },

  methods: {
    teacherCallback() {
      this.getTeacherList()
    },

    openAddteacher(bool, title, teacherInfo) {
      this.showAddteacher = bool
      this.title = title
      this.teacherInfo = teacherInfo
    },

    getTeacherList() {
      this.loading = true
      getTeacherList({
        school_id: this.schoolId,
        campus_id: this.campus_id,
        page: this.page,
        limit: this.limit
      })
        .then((res) => {
          this.loading = false
          this.list = res.data.item
          this.total = res.data.total
          console.log('res:', res)
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
