<template>
  <page>
    <div style="margin-bottom:24px;">
      <el-button type="primary" @click="openAddClass(true, '添加班级', null)">添加班级</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getClassList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openAddClass(true, '编辑班级', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <add-class :show.sync="showAddClass" :title="title" :class-info="classInfo" @callback="classCallback" />
  </page>
</template>

<script>
import { getClassList } from '@/api/class'
import { dateFormat } from '@/utils/date'
import addClass from './compontents/add-class'
import { classStatus, classType } from '@/config/index'

export default {
  components: {
    addClass
  },
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'class_name',
          label: '班级名称'
        },
        {
          prop: 'class_type',
          label: '班级类型',
          formatter(row, column, value) {
            return classType[value]
          }
        },
        {
          prop: 'status',
          label: '班级状态',
          formatter(row, column, value) {
            return classStatus[value]
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

      showAddClass: false,
      title: '',
      classInfo: {}
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
    this.getClassList()
  },

  methods: {
    classCallback() {
      this.getClassList()
    },

    openAddClass(bool, title, classInfo) {
      this.showAddClass = bool
      this.title = title
      this.classInfo = classInfo
    },

    getClassList() {
      this.loading = true
      getClassList({
        school_id: this.schoolId,
        campus_id: this.campus_id,
        page: this.page,
        limit: this.limit
      })
        .then(res => {
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
