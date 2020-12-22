<template>
  <common-dialog
    :visible.sync="visible"
    :title="title"
    :submit-loading="submitLoading"
    @submit="postDataForTeacher"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="班级名称">
            <el-input v-model="form.class_name" maxlength="10" style="width: 100%" placeholder="请输入班级姓名" />
          </el-form-item>

          <el-form-item label="班级类型">
            <el-radio-group v-model="form.class_type">
              <el-radio :label="v" v-for="(k, v) in classType" :key="k">{{ k }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { classUpdate, classCreate } from '@/api/class'
import { classType } from '@/config/index'
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
    classInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        class_name: '',
        class_type: '1',
        status: '1'
      },
      submitLoading: false,
      classType
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

    school_id() {
      return this.$store.state.school.schoolId
    },

    campus_id() {
      return this.$store.state.school.campus_id
    }
  },

  methods: {
    onOpen() {
      if (this.classInfo) {
        Object.keys(this.form).map(k => {
          this.form[k] = this.classInfo[k]
        })
      } else {
        this.form = {
          class_name: '',
          class_type: '1',
          status: '1'
        }
      }
    },

    postDataForTeacher() {
      if (this.classInfo) {
        this.classUpdate()
      } else {
        this.classCreate()
      }
    },

    classUpdate() {
      const params = {
        class_id: this.classInfo.id
      }
      this.submitLoading = true
      const data = { ...this.form }
      classUpdate(params, data)
        .then(res => {
          this.submitLoading = false
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch(err => {
          this.submitLoading = false
          this.$message.error(err)
        })
    },

    classCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      const data = { ...this.form }
      classCreate(params, data)
        .then(res => {
          this.submitLoading = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch(err => {
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
