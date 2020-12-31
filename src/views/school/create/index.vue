<template>
  <div class="school">
    <el-card class="box-card">
      <div class="title">欢迎光临，创建属于您的学校把！</div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="学校名称">
          <el-input v-model="form.school_name"></el-input>
        </el-form-item>
        <el-form-item label="校区名称">
          <el-input v-model="form.campus_name"></el-input>
          <div class="tips">创建学校，必须创建一个校区</div>
        </el-form-item>
        <el-form-item label="LOGO"> </el-form-item>
        <el-form-item label="">
          <el-button type="primary" style="width: 100%">创建并进入系统</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        school_name: '',
        campus_name: '',
        logo: ''
      }
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
