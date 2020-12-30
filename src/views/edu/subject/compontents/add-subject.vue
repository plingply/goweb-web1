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
          <el-form-item label="课程消费">
            <el-checkbox-group v-model="xf">
              <template v-for="(item,key) in cardType">
                <div :key="key" style="margin-bottom: 4px">
                  <el-checkbox :label="key">
                    {{ item }}
                    <el-input
                      v-if="key == 1"
                      v-model="form.ks_value"
                      style="width: 150px"
                      placeholder="课消课时"
                      :disabled="xf.indexOf('1') == -1"
                      @input="inputfuncKs"
                    ></el-input>
                    <el-input
                      v-if="key == 2"
                      v-model="form.cz_value"
                      style="width: 150px"
                      placeholder="课消金额"
                      :disabled="xf.indexOf('2') == -1"
                      @input="inputfuncCz"
                    ></el-input>
                  </el-checkbox>
                </div>
              </template>
            </el-checkbox-group>
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
import { cardType } from '@/config/index'
import { priceFormat } from '@/utils/index'
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
        status: '1',
        ks: '',
        ks_value: '',
        cz: '',
        cz_value: '',
        qx: ''
      },
      xf: [],
      submitLoading: false,
      cardType
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
    inputfuncKs(value) {
      this.form.ks_value = priceFormat(value)
    },

    inputfuncCz(value) {
      this.form.cz_value = priceFormat(value)
    },

    onOpen() {
      this.xf = []
      if (this.subjectInfo) {
        Object.keys(this.form).map((k) => {
          this.form[k] = this.subjectInfo[k]
        })
        if (this.form.ks == 1) {
          this.xf.push('1')
        }
        if (this.form.cz == 1) {
          this.xf.push('2')
        }
        if (this.form.qx == 1) {
          this.xf.push('3')
        }
      } else {
        this.form = {
          subject_name: '',
          remark: '',
          status: '1',
          ks: '',
          ks_value: '',
          cz: '',
          cz_value: '',
          qx: ''
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
      if (this.xf.indexOf('1') > -1) {
        data.ks = 1
      }

      if (this.xf.indexOf('2') > -1) {
        data.cz = 1
      }

      if (this.xf.indexOf('3') > -1) {
        data.qx = 1
      }
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
        .catch(() => {
          this.submitLoading = false
        })
    },

    subjectCreate() {
      this.submitLoading = true
      const params = {
        school_id: this.school_id,
        campus_id: this.campus_id
      }
      const data = { ...this.form }
      if (this.xf.indexOf('1') > -1) {
        data.ks = 1
      }

      if (this.xf.indexOf('2') > -1) {
        data.cz = 1
      }

      if (this.xf.indexOf('3') > -1) {
        data.qx = 1
      }
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
        .catch(() => {
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
