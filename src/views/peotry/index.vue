<template>
  <page>
    <div style="margin-bottom:30px;">
      <el-button type="primary" :loading="start" :disabled="start" @click="getPeotryLastId">同步数据</el-button>
      <el-button plain @click="playFunc">{{ !play ? '开始' : '暂停' }}</el-button>
      <span class="progress">
        成功
        <span>{{ succ }}</span> 条，失败
        <span>{{ error }}</span> 条
      </span>
      >
    </div>

    <common-table
      v-loading="loading"
      :data="list"
      :headers="headers"
      :paging="true"
      :total-num="total"
      :page-num.sync="page"
      :size-num.sync="limit"
      @callback="getPeotryList"
    >
      <template slot="operation" slot-scope="{ row }">
        <el-button class="btn-delete" type="text" @click="link(row.zuowen_id)">详情</el-button>
      </template>
    </common-table>
  </page>
</template>

<script>
import { peotrySync, getPeotryInfo, getPeotryLastId, getPeotryList } from '@/api/peotry'
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
      play: true,
      id: 0
    }
  },

  created() {
    this.getPeotryList()
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
        this.getPeotryLastId()
      }
    },

    getPeotryList() {
      this.loading = true
      getPeotryList({
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

    getPeotryLastId() {
      if (!this.play) return
      getPeotryLastId().then((res) => {
        res.data = res.data == 0 ? 9999 : res.data
        this.start = true
        const count = Math.max(res.data, this.id)
        this.forEachPeotry(count + 1)
      })
    },

    forEachPeotry(id) {
      for (let i = id; i < id + 20; i++) {
        this.request({
          shiId: i
        })
      }
      this.id = id + 20
      this.getPeotryList()
      this.timeout = setTimeout(() => {
        this.getPeotryLastId()
      }, 3000)
    },

    async syncData(data) {
      try {
        await peotrySync({}, data)
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

      const res = await getPeotryInfo(null, o)
      if (res.code === 1) {
        const e = res.data
        const noteList = res.data.noteList
        const data = {
          peotry_id: e.id,
          align: e.align,
          appreciate: e.appreciate,
          author: e.author,
          author_more: e.authorMore,
          du_yin: e.duYin,
          org_text: e.orgText,
          reason: e.reason,
          title: e.title,
          translation: e.translation,
          video: e.video,
          years: e.years,
          note_list: []
        }

        noteList &&
          noteList.forEach((item, index) => {
            data.note_list[index] = {
              ciyu: item.ciyu,
              notes: item.notes,
              peotry_id: e.id
            }
          })

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
