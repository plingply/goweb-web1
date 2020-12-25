<template>
  <common-dialog
    :visible.sync="visible"
    :title="title"
    :submit-loading="submitLoading"
    @submit="postDataForSubject"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="课程名称">
            <el-input
              v-model="form.subject_name"
              maxlength="10"
              style="width: 100%"
              placeholder="请输入课程姓名"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="form.remark"
              maxlength="100"
              style="width: 100%"
              placeholder="请输入课程备注"
            />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { subjectUpdate, subjectCreate } from '@/api/subject'
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
    subjectInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        subject_name: '',
        remark: '',
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
      if (this.subjectInfo) {
        Object.keys(this.form).map((k) => {
          this.form[k] = this.subjectInfo[k]
        })
      } else {
        this.form = {
          subject_name: '',
          remark: '',
          status: '1'
        }
      }
    },

    postDataForSubject() {
      if (this.subjectInfo) {
        this.subjectUpdate()
      } else {
        this.subjectCreate()
      }
    },

    subjectUpdate() {
      const params = {
        subject_id: this.subjectInfo.id
      }
      this.submitLoading = true
      const data = { ...this.form }
      subjectUpdate(params, data)
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

    subjectCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      const data = { ...this.form }
      subjectCreate(params, data)
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
