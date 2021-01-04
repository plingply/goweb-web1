<template>
  <div class="school">
    <el-card class="box-card">
      <div class="title">欢迎光临，创建属于您的学校把！</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="学校名称">
          <el-input v-model="form.school_name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="校区名称">
          <el-input v-model="form.campus_name" maxlength="20"></el-input>
          <div class="tips">创建学校，必须创建一个校区</div>
        </el-form-item>
        <el-form-item label="LOGO">
          <div class="avatar-box">
            <el-image
              style="width: 80px; height: 80px"
              :src="form.logo"
              fit="cover"
              @click.native="imagecropperShow = true"
            ></el-image>
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
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" style="width: 100%" @click="createSchool">创建并进入系统</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { createSchool } from '@/api/school'
import $s from '@/utils/storage'
export default {
  data() {
    return {
      form: {
        school_name: '',
        campus_name: '',
        logo: ''
      },
      imagecropperShow: false,
      imagecropperKey: 0
    }
  },

  methods: {
    cropSuccess(resData) {
      this.imagecropperShow = false
      this.imagecropperKey = this.imagecropperKey + 1
      this.form.logo = resData
    },
    close() {
      this.imagecropperShow = false
    },

    createSchool() {
      createSchool(this.form).then((res) => {
        this.$message.success(res.message)
        this.$router.push('/')
      })
    },

    GetSchoolList() {
      this.$store
        .dispatch('school/getSchoolList')
        .then((res) => {
          this.$store.commit('school/SET_SCHOOLLIST', res)
          let schoolId = $s.ls_get('school_id')

          const result = res.some((item) => {
            if (item.school_id === schoolId) {
              return true
            }
          })
          console.log('result:', result, schoolId)
          if (!schoolId || !result) {
            schoolId = res[0].school_id
          }
          this.$store.commit('school/SET_SCHOOLID', schoolId)

          this.$store
            .dispatch('school/getCampusSimpleList', {
              school_id: schoolId
            })
            .then((res) => {
              this.$router.replace('/')
            })
            .catch((error) => {
              this.$store.dispatch('user/resetToken')
              this.$message.error(error)
            })
        })
        .catch((error) => {
          this.$store.dispatch('user/resetToken')
          this.$message.error(error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.school {
  width: 500px;
  height: 500px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.tips {
  font-size: 12px;
  color: $text_c9;
}

.title {
  text-align: center;
  padding-top: 16px;
  margin-bottom: 32px;
  font-weight: 500;
  color: $text_c3;
  font-size: 20px;
}
</style>
