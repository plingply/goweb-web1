<template>
  <common-dialog
    :visible.sync="visible"
    :title="title"
    :submit-loading="submitLoading"
    @submit="postDataForStudent"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form-item label="学生名称">
                <el-input v-model="form.student_name" maxlength="10" style="width: 100%" placeholder="请输入学生姓名" />
              </el-form-item>
              <el-form-item label="学生性别">
                <el-radio-group v-model="form.sex">
                  <el-radio v-for="(item, index) in sexObj" :key="index" :label="index">{{ item }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <div class="avatar-box">
                <pan-thumb :image="form.avatar" width="90px" height="90px" @click.native="imagecropperShow = true">
                  <div class="avatar-upload">
                    <i class="el-icon-picture"></i>
                    <div>学生头像</div>
                  </div>
                </pan-thumb>
              </div>
              <image-cropper
                v-show="imagecropperShow"
                :key="imagecropperKey"
                :width="300"
                :height="300"
                url="/api/upload/file"
                field="file"
                lang-type="en"
                @close="close"
                @crop-upload-success="cropSuccess"
              />
            </el-col>
            <el-col :span="12">
              <el-form-item label="学校名称">
                <el-input v-model="form.school_name" maxlength="50" style="width: 100%" placeholder="请输入学校名称" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="学员生日">
                <el-date-picker
                  v-model="form.birthday"
                  style="width: 100%"
                  type="date"
                  placeholder="选择日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="学校地址">
                <el-input v-model="form.address" maxlength="50" style="width: 100%" placeholder="请输入学校地址" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注">
                <el-input v-model="form.remark" maxlength="100" style="width: 100%" placeholder="备注信息" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { studentUpdate, studentCreate } from '@/api/student'
import { sexObj } from '@/config/index'
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
    studentInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      sexObj,
      form: {
        student_name: '',
        sex: '1',
        avatar: '',
        school_name: '',
        birthday: '',
        address: '',
        status: '1',
        remark: ''
      },
      submitLoading: false,

      // 头像
      imagecropperShow: false,
      imagecropperKey: 0
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
    handleAvatarSuccess() {},

    beforeAvatarUpload() {},

    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.form.avatar = resData
    },
    close() {
      this.imagecropperShow = false
    },

    onOpen() {
      if (this.studentInfo) {
        console.log(this.studentInfo)
        Object.keys(this.form).map(k => {
          this.form[k] = this.studentInfo[k]
        })
        this.form.birthday = this.form.birthday ? new Date(this.form.birthday) : ''
      } else {
        this.form = {
          student_name: '',
          sex: '1',
          avatar: '',
          school_name: '',
          birthday: '',
          address: '',
          status: '1',
          remark: ''
        }
      }
    },

    postDataForStudent() {
      if (this.studentInfo) {
        this.studentUpdate()
      } else {
        this.studentCreate()
      }
    },

    studentUpdate() {
      const params = {
        student_id: this.studentInfo.id
      }
      this.submitLoading = true
      const data = { ...this.form }
      data.birthday = data.birthday ? data.birthday.getTime() : ''
      studentUpdate(params, data)
        .then(res => {
          this.submitLoading = false
          this.$message({
            message: '更新成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch(() => {
          this.submitLoading = false
        })
    },

    studentCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      const data = { ...this.form }
      data.birthday = data.birthday ? data.birthday.getTime() : ''
      studentCreate(params, data)
        .then(res => {
          this.submitLoading = false
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.visible = false
          this.$emit('callback')
        })
        .catch(() => {
          this.submitLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-box {
  text-align: center;
  .upload-btn {
    color: $blue;
  }
}
.avatar-upload {
  width: 100%;
  height: 100%;
  font-size: 32px;
  color: $menuActiveText;
  text-align: center;
  cursor: pointer;
  div {
    text-align: center;
    font-size: 12px;
    color: #999;
    line-height: 1;
    padding-top: 4px;
  }
}
</style>
