<template>
  <common-dialog
    :visible.sync="visible"
    :title="title"
    :submit-loading="submitLoading"
    @submit="postDataForCampus"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="校区名称">
            <el-input style="width: 100%" v-model="form.campus_name" placeholder="请输入校区名称"></el-input>
          </el-form-item>

          <el-form-item label="校区地址">
            <el-cascader style="width: 100%" v-model="cityArr" :options="city" @change="handleChange"></el-cascader>
          </el-form-item>

          <el-form-item label="详细地址">
            <el-input style="width: 100%" v-model="form.address" placeholder="请输入校区详细地址"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import city from './city'
import { campusUpdate, campusCreate } from '@/api/school'
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
    campusInfo: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      form: {
        campus_name: '',
        address: '',
        province: '',
        city: '',
        area: ''
      },
      city,
      cityArr: [],
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
    handleChange(data) {
      console.log(data)
      this.form.province = data[0] || this.form.province
      this.form.city = data[1] || this.form.city
      this.form.area = data[2] || this.form.area
    },

    onOpen() {
      if (this.campusInfo) {
        Object.keys(this.form).map((k) => {
          this.form[k] = this.campusInfo[k]
        })
        this.cityArr = [this.form.province, this.form.city, this.form.area]
      } else {
        Object.keys(this.form).map((k) => {
          this.form[k] = ''
        })
        this.cityArr = []
      }
    },

    postDataForCampus() {
      if (this.campusInfo) {
        this.campusUpdate()
      } else {
        this.campusCreate()
      }
    },

    campusUpdate() {
      const params = {
        campus_id: this.campusInfo.id
      }
      this.submitLoading = true
      campusUpdate(params, this.form)
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

    campusCreate() {
      const params = {
        school_id: this.schoolId
      }
      this.submitLoading = true
      campusCreate(params, this.form)
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
