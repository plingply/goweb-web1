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
            <el-input v-model="form.campus_name" style="width: 100%" maxlength="20" placeholder="请输入校区名称" />
          </el-form-item>

          <el-form-item label="校区地址">
            <el-cascader clearable v-model="cityArr" style="width: 100%" :props="props" @change="handleChange" />
          </el-form-item>

          <el-form-item label="详细地址">
            <el-input v-model="form.address" maxlength="50" style="width: 100%" placeholder="请输入校区详细地址" />
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { campusUpdate, campusCreate, getCityList } from '@/api/school'
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
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          console.log(node)
          const { level } = node
          let id = node.value
          if (level == 0) {
            id = 1
          }
          getCityList(id).then(res => {
            res.data.map(item => {
              item.value = item.code
              item.label = item.name
              item.leaf = level >= 2
              return item
            })
            resolve(res.data)
          })
        }
      },
      cityArr: [],
      provinceList: [],
      cityList: [],
      areaList: [],
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
    getCityList(id, key) {
      getCityList(id).then(res => {
        this[key] = res.data
      })
    },

    onOpen() {
      if (this.campusInfo) {
        Object.keys(this.form).map(k => {
          this.form[k] = this.campusInfo[k]
        })
        this.cityArr = [this.form.province, this.form.city, this.form.area]
      } else {
        Object.keys(this.form).map(k => {
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
      this.form.province = this.cityArr[0]
      this.form.city = this.cityArr[1]
      this.form.area = this.cityArr[2]
      campusUpdate(params, this.form)
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
        })
    },

    campusCreate() {
      const params = {
        school_id: this.school_id
      }
      this.submitLoading = true
      this.form.province = this.cityArr[0]
      this.form.city = this.cityArr[1]
      this.form.area = this.cityArr[2]
      campusCreate(params, this.form)
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
