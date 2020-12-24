<template>
  <page>
    <div style="margin-bottom:30px;">
      <el-button type="primary" @click="openSyncZuowen">同步数据</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getCampusList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openSyncZuowen(true, '编辑校区', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <sync-data :show.sync="showAddCampus" @callback="campusCallback"></sync-data>
  </page>
</template>

<script>
import { getCampusList } from '@/api/school'
import { dateFormat } from '@/utils/date'
import syncData from './compontents/sync-data'

export default {
  components: {
    syncData
  },

  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'campus_name',
          label: '校区名称'
        },
        {
          prop: 'address',
          label: '详细地址'
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

      showAddCampus: false
    }
  },

  computed: {
    schoolId() {
      return this.$store.state.school.schoolId
    }
  },

  created() {
    this.getCampusList()
  },

  methods: {
    campusCallback() {
      this.getCampusList()
    },

    openSyncZuowen() {
      this.showAddCampus = true
    },

    getCampusList() {
      this.loading = true
      getCampusList({
        school_id: this.schoolId,
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
