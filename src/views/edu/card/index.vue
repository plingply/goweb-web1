<template>
  <page>
    <div style="margin-bottom:24px;">
      <el-button type="primary" @click="openAddCard(true, '添加学员卡', null)">添加学员卡</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getCardList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button type="text" @click="openAddCard(true, '编辑学员卡', row)">编辑</el-button>
        <el-button class="btn-delete" type="text">删除</el-button>
      </template>
    </common-table>

    <add-card :show.sync="showAddCard" :title="title" :card-info="cardInfo" @callback="cardCallback" />
  </page>
</template>

<script>
import { getCardList } from '@/api/card'
import { dateFormat } from '@/utils/date'
import addCard from './compontents/add-card'
import { cardStatus } from '@/config/index'

export default {
  components: {
    addCard
  },
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'card_name',
          label: '学员卡名称'
        },
        {
          prop: 'status',
          label: '学员卡状态',
          formatter(row, column, value) {
            return cardStatus[value]
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

      showAddCard: false,
      title: '',
      cardInfo: {}
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
    this.getCardList()
  },

  methods: {
    cardCallback() {
      this.getCardList()
    },

    openAddCard(bool, title, cardInfo) {
      this.showAddCard = bool
      this.title = title
      this.cardInfo = cardInfo
    },

    getCardList() {
      this.loading = true
      getCardList({
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
