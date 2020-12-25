<template>
  <page>
    <div style="margin-bottom:24px;">
      <el-button type="primary" @click="openAddSubject(true, '添加课程', null)">添加课程</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getSubjectList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openAddSubject(true, '编辑课程', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <add-subject
      :show.sync="showAddSubject"
      :title="title"
      :subject-info="subjectInfo"
      @callback="subjectCallback"
    />
  </page>
</template>

<script>
import { getSubjectList } from '@/api/subject'
import { dateFormat } from '@/utils/date'
import addSubject from './compontents/add-subject'
import { subjectStatus } from '@/config/index'

export default {
  components: {
    addSubject
  },
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'subject_name',
          label: '班级名称'
        },
        {
          prop: 'status',
          label: '课程状态',
          formatter(row, column, value) {
            return subjectStatus[value]
          }
        },
        {
          prop: 'remark',
          label: '备注'
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

      showAddSubject: false,
      title: '',
      subjectInfo: {}
    }
  },

  created() {
    this.getSubjectList()
  },

  methods: {
    subjectCallback() {
      this.getSubjectList()
    },

    openAddSubject(bool, title, subjectInfo) {
      this.showAddSubject = bool
      this.title = title
      this.subjectInfo = subjectInfo
    },

    getSubjectList() {
      this.loading = true
      getSubjectList({
        school_id: this.school_id,
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
