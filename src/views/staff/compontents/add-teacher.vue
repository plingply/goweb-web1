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
          <el-form-item label="选择校区">
            <el-select style="width: 100%" v-model="form.campus_id" placeholder="请选择校区">
              <el-option v-for="item in campusList" :key="item.id" :label="item.campus_name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="老师姓名">
            <el-input style="width: 100%" v-model="form.teacher_name" placeholder="请输入老师姓名"></el-input>
          </el-form-item>

          <el-form-item label="性别">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">保密</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="联系电话">
            <el-input style="width: 100%" v-model="form.phone" placeholder="请输入联系电话"></el-input>
          </el-form-item>

          <el-form-item label="老师生日">
            <el-date-picker style="width: 100%" v-model="form.birthday" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="入职日期">
            <el-date-picker style="width: 100%" v-model="form.entry_at" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="联系地址">
            <el-input style="width: 100%" v-model="form.address" placeholder="请输入联系地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { teacherUpdate, teacherCreate } from '@/api/teacher'
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
    teacherInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        campus_id: '',
        teacher_name: '',
        sex: '',
        phone: '',
        birthday: '',
        entry_at: '',
        address: ''
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
    },

    schoolId() {
      return this.$store.state.school.schoolId
    },

    campusList() {
      return this.$store.state.school.campusList
    }
  },

  methods: {
    onOpen() {
      if (this.teacherInfo) {
        Object.keys(this.form).map((k) => {
          if (k == 'sex') {
            this.form[k] = this.teacherInfo[k] * 1
          } else if (k == 'birthday' || k == 'entry_at') {
            this.form[k] = this.teacherInfo[k] ? new Date(this.teacherInfo[k] * 1) : ''
          } else {
            this.form[k] = this.teacherInfo[k]
          }
        })
        console.log(this.form)
        this.cityArr = [this.form.province, this.form.city, this.form.area]
      } else {
        Object.keys(this.form).map((k) => {
          this.form[k] = ''
        })
      }
    },

    postDataForTeacher() {
      if (this.teacherInfo) {
        this.teacherUpdate()
      } else {
        this.teacherCreate()
      }
    },

    teacherUpdate() {
      const params = {
        teacher_id: this.teacherInfo.id
      }
      this.submitLoading = true
      const data = { ...this.form }
      data.birthday = new Date(data.birthday).getTime()
      data.entry_at = new Date(data.entry_at).getTime()
      teacherUpdate(params, data)
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

    teacherCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.schoolId
      }
      const data = { ...this.form }
      data.birthday = new Date(data.birthday).getTime()
      data.entry_at = new Date(data.entry_at).getTime()
      teacherCreate(params, data)
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
