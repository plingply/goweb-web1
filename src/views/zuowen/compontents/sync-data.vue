<!--
 * @Author: 彭林
 * @Date: 2020-12-24 18:24:32
 * @LastEditTime: 2020-12-24 19:26:31
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/views/zuowen/compontents/sync-data.vue
-->
<template>
  <common-dialog
    :visible.sync="visible"
    title="同步数据"
    :submit-loading="submitLoading"
    @submit="postDataForCampus"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="{}" label-width="80px">
          <el-form-item label="开始id">
            <el-input v-model="start" style="width: 100%" type="number" />
          </el-form-item>

          <el-form-item label="同步条数">
            <el-input v-model="count" style="width: 100%" type="number" />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { zuowenSync, getZuowenInfo } from '@/api/zuowen'
import { dateFormat } from '@/utils/date'
import md5 from 'md5'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      start: 1,
      count: 0,
      submitLoading: false
    }
  },

  computed: {
    visible: {
      get() {
        return this.show
      },
      set(v) {
        this.$emit('update:show', v)
      }
    },

    schoolId() {
      return this.$store.state.school.schoolId
    }
  },

  methods: {
    onOpen() {
      this.start = 1
      this.count = 0
    },

    postDataForCampus() {
      this.start = Number(this.start)
      this.count = Number(this.count)
      if (this.start <= 0) {
        this.$message.error('开始id必须大于0')
        return
      }
      if (this.count <= 0) {
        this.$message.error('同步条数必须大于0')
        return
      }
      for (let i = this.start; i < this.start + this.count; i++) {
        this.request({
          zuoWenId: i
        })
      }
    },

    syncData(data) {
      zuowenSync({}, data)
        .then((res) => {
          console.log('保存成功')
          this.visible = false
        })
        .catch(() => {
          console.error('保存失败')
        })
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

    request(t) {
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

      getZuowenInfo(null, o).then((res) => {
        if (res.code === 1) {
          const e = res.data
          const data = {
            comment: e.comment,
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
          this.syncData(data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.myfrom {
  width: 300px;
  margin: 0 auto;
}
</style>
