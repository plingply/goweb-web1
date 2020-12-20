<template>
  <div class="app-container">
    <div class="search-box">
      <el-select v-model="campus_id" placeholder="请选择校区">
        <el-option v-for="item in campusList" :key="item.id" :label="item.campus_name" :value="item.id"> </el-option>
      </el-select>
      <el-button type="primary" @click="searchfunc('')">查询</el-button>
      <el-button plain @click="searchfunc('reset')">重置</el-button>
    </div>

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
    ></add-teacher>
  </div>
</template>

<script>
import { getTeacherList } from '@/api/teacher'
import { dateFormat } from '@/utils/date'
import addTeacher from './compontents/add-teacher'

export default {
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
          label: '性别'
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
      campus_id: '',

      showAddteacher: false,
      title: '',
      teacherInfo: {}
    }
  },

  components: {
    addTeacher
  },

  computed: {
    schoolId() {
      return this.$store.state.school.schoolId
    },

    campusList() {
      return this.$store.state.school.campusList
    }
  },

  created() {
    this.getTeacherList()
  },

  methods: {
    searchfunc(reset) {
      this.page = 1
      if (reset) {
        this.campus_id = ''
      }
      this.getTeacherList()
    },

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
