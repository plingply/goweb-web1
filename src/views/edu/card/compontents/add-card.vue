<template>
  <common-dialog
    :visible.sync="visible"
    :title="title"
    :submit-loading="submitLoading"
    @submit="postDataForCard"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="班级名称">
            <el-input
              v-model="form.card_name"
              maxlength="10"
              style="width: 100%"
              placeholder="请输入学员卡名称"
            />
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              maxlength="100"
              style="width: 100%"
              placeholder="请输入学员卡备注"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { cardUpdate, cardCreate } from '@/api/card'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      defalut: ''
    },
    cardInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        card_name: '',
        remark: '1',
        status: '1'
      },
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
    }
  },

  methods: {
    onOpen() {
      if (this.cardInfo) {
        Object.keys(this.form).map((k) => {
          this.form[k] = this.cardInfo[k]
        })
      } else {
        this.form = {
          card_name: '',
          remark: '',
          status: '1'
        }
      }
    },

    postDataForCard() {
      if (this.cardInfo) {
        this.cardUpdate()
      } else {
        this.cardCreate()
      }
    },

    cardUpdate() {
      const params = {
        card_id: this.cardInfo.id
      }
      this.submitLoading = true
      const data = { ...this.form }
      cardUpdate(params, data)
        .then((res) => {
          this.submitLoading = false
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch((err) => {
          this.submitLoading = false
          this.$message.error(err)
        })
    },

    cardCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      const data = { ...this.form }
      cardCreate(params, data)
        .then((res) => {
          this.submitLoading = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch((err) => {
          this.submitLoading = false
          this.$message.error(err)
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
