<template>
  <page>
    <div style="margin-bottom:30px;">
      <el-button type="primary" :loading="start" :disabled="start" @click="getZuowenLastId">同步数据</el-button>
      <el-button plain @click="playFunc">{{ !play ? '开始' : '暂停' }}</el-button>
      <span class="progress">
        成功
        <span>{{ succ }}</span> 条，失败
        <span>{{ error }}</span> 条
      </span>
      >
      <el-button @click="getZuowenList">查询</el-button>
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getZuowenList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button class="btn-delete" type="text" @click="link(row.zuowen_id)">详情</el-button>
      </template>
    </common-table>
  </page>
</template>

<script>
import { zuowenSync, getZuowenInfo, getZuowenLastId, getZuowenList } from '@/api/zuowen'
import { dateFormat } from '@/utils/date'
import md5 from 'md5'
export default {
  data() {
    return {
      loading: false,
      list: [],
      headers: [
        {
          prop: 'title',
          label: '标题'
        },
        {
          prop: 'genre',
          label: '类型'
        },
        {
          prop: 'grade',
          label: '所属年纪'
        },
        {
          prop: 'theme',
          label: '主题'
        },
        {
          prop: 'read_count',
          label: '阅读次数'
        },
        {
          prop: 'updated_at',
          label: '更新时间',
          formatter(row, column, value) {
            return dateFormat(value, 'YYYY-MM-DD')
          }
        }
      ],
      total: 0,
      page: 1,
      limit: 10,
      succ: 0,
      error: 0,
      start: false,
      play: true
    }
  },

  created() {
    this.getZuowenList()
  },

  destroyed() {
    clearTimeout(this.timeout)
  },

  methods: {
    link(zuowen_id) {
      window.open('/work/zuowenresult.html?zuowen_id=' + zuowen_id)
    },

    playFunc() {
      this.play = !this.play
      clearTimeout(this.timeout)
      if (this.play) {
        this.getZuowenLastId()
      }
    },

    getZuowenList() {
      this.loading = true
      getZuowenList({
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
    },

    getZuowenLastId() {
      if (!this.play) return
      getZuowenLastId().then((res) => {
        this.start = true
        this.forEachZuowen(res.data + 1)
      })
    },

    forEachZuowen(id) {
      for (let i = id; i < id + 20; i++) {
        this.request({
          zuoWenId: i
        })
      }

      this.getZuowenList()
      this.timeout = setTimeout(() => {
        this.getZuowenLastId()
      }, 3000)
    },

    async syncData(data) {
      try {
        await zuowenSync({}, data)
        this.succ++
        if (this.succ + this.error >= 20) {
          this.start = false
        }
      } catch {
        this.error++
      }
    },

    objKeySort(e) {
      for (var t = Object.keys(e).sort(), n = {}, r = 0; r < t.length; r++) {
        n[t[r]] = e[t[r]]
      }
      return n
    },

    getSign(e) {
      var t = md5(e.date)
      var n = this.objKeySort(e)
      var r = ''
      for (var o in n) {
        r += n[o]
      }
      r += 'CVrFcVJu564ArjsShh058xSjb'

      const s = t.substring(0, 16) + md5(r) + t.substring(16, 32)
      return s
    },

    async request(t) {
      var o = t != null ? t : {}
      var date = dateFormat(new Date().getTime())
      o.date = date
      console.log(o)
      var i = this.getSign(o)
      o.ciphertext = i
      var a
      var s = []
      for (var c in o) {
        // eslint-disable-next-line no-prototype-builtins
        o.hasOwnProperty(c) && ((a = o[c]), s.push(c + '=' + a))
      }

      const res = await getZuowenInfo(null, o)
      if (res.code === 1) {
        const e = res.data
        const data = {
          comments: e.comment,
          genre: e.genre,
          grade: e.grade,
          zuowen_id: e.id,
          quality: e.quality,
          read_count: e.readCount,
          theme: e.theme,
          title: e.title,
          word_number: e.wordNumber,
          zw_content: e.zwContent
        }
        await this.syncData(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.progress {
  padding-left: 24px;
  font-size: 14px;
  color: $text_c6;
  span {
    color: $pink;
  }
}
</style>
