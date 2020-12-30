<template>
  <div>
    <div class="tab-right">
      <el-radio-group v-model="status" size="small" @change="memberStatuaChange">
        <el-radio-button v-for="(v,k) in classMemberStatus" :key="k" :label="k">{{ v }}</el-radio-button>
      </el-radio-group>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      empty-height="300px"
      @callback="getClassMemberList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button
          v-if="row.status == 1"
          class="btn-delete"
          type="text"
          @click="leaveClassMember(row, 2)"
        >移出学员</el-button>
        <el-button
          v-if="row.status == 2"
          class="btn-delete"
          type="text"
          @click="leaveClassMember(row, 1)"
        >重新入班</el-button>
      </template>
    </common-table>
  </div>
</template>

<script>
import { getClassMemberList, leaveClassMember } from '@/api/class'
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
      status: '1',
      classMemberStatus,
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
          },
          filters: classMemberStatus,
          filterHandler() {
            this.getClassMemberList()
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
    memberStatuaChange() {
      this.page = 1
      this.getClassMemberList()
    },
    leaveClassMember(row, status) {
      const msg = status == 2 ? '是否将学员从此班移除？' : '是否将学员重新入班？'
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const data = {
            school: this.school_id,
            campus_id: this.campus_id,
            class_id: row.class_id,
            student_id: row.student_id,
            status
          }
          leaveClassMember({}, data)
            .then((res) => {
              this.$message.success('离班成功')
              this.getClassMemberList()
            })
            .catch(() => {})
        })
        .catch(() => {})
    },

    getClassMemberList() {
      this.loading = true
      getClassMemberList({
        school_id: this.school_id,
        campus_id: this.campus_id,
        class_id: this.$route.params.class_id,
        page: this.page,
        limit: this.limit,
        status: this.status
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

<style lang="scss" scoped>
.tab-right {
  text-align: right;
  margin-bottom: 12px;
}
</style>
