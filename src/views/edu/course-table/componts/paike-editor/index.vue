<template>
  <el-dialog title="调整班课" :visible.sync="visible" width="600px" @open="onOpen">
    <div v-loading="loading" class="pk_content">
      <div class="formbox">
        <el-form ref="form" :model="form" label-width="170px">
          <el-form-item label="班级" class="require">
            <el-select
              v-model="form.class_id"
              style="width: 284px"
              size="medium"
              placeholder="请选择班级"
              filterable
              disabled
            >
              <el-option
                v-for="(item, index) in classList"
                :key="index"
                :label="item.class_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程" class="require">
            <el-select
              v-model="form.subject_id"
              style="width: 284px"
              size="medium"
              placeholder="请选择课程"
              filterable
              disabled
            >
              <el-option
                v-for="(item, index) in subjectList"
                :key="index"
                :label="item.subject_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授课老师" class="require">
            <el-select
              v-model="form.teacher_id"
              style="width: 284px"
              size="medium"
              placeholder="请选择授课老师"
              filterable
            >
              <el-option
                v-for="(item, index) in teacherList"
                :key="index"
                :label="item.teacher_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间" class="require">
            <el-date-picker
              v-model="form.start_time"
              style="width: 150px"
              size="medium"
              type="date"
              placeholder="上课日期"
              :picker-options="pickerOptions_1"
            ></el-date-picker>
            <el-time-picker
              v-model="time"
              size="medium"
              style="width: 118px; margin-left: 12px"
              format="HH:mm"
              placeholder="上课时间"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="上课时长" class="require">
            <el-input
              v-model="form.len"
              style="width: 150px"
              size="medium"
              placeholder="上课时长(分钟)"
              maxlength="5"
              @input="scInput"
            ></el-input>&nbsp;分钟
          </el-form-item>
          <el-form-item label="教室">
            <el-select
              v-model="form.classroom"
              style="width: 284px"
              size="medium"
              placeholder="请选择教室"
              filterable
            >
              <el-option
                v-for="(item, index) in classroomList"
                :key="index"
                :label="item.classroom_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              v-model="form.note"
              type="textarea"
              style="width: 284px"
              size="medium"
              placeholder="备注信息"
              maxlength="200"
              rows="3"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button v-if="!pkdata.id" type="primary" @click="quedingfun">确 定</el-button>
      <el-button v-if="pkdata.id" type="primary" @click="updatefunc">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    classList: {
      type: Array,
      default: () => []
    },
    subjectList: {
      type: Array,
      default: () => []
    },
    teacherList: {
      type: Array,
      default: () => []
    },
    classroomList: {
      type: Array,
      default: () => []
    },
    pkdata: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      hours_time: '',
      time: '',
      pickerOptions_1: {
        firstDayOfWeek: 1
      }
    }
  },

  computed: {
    visible: {
      get() {
        return this.show
      },
      set() {
        this.$emit('update:show', false)
      }
    },

    form: {
      get() {
        return this.pkdata
      },
      set() {
        this.$emit('update:pkdata', this.pkdata)
      }
    }
  },

  methods: {
    onOpen() {
      console.log(this.form)
      this.time = this.form.start_time
    },

    scInput() {},

    updatefunc(type) {
      if (!this.verification()) return
      const time = new Date(this.time)
      this.hours_time = time.getTime() - time.setHours(0, 0, 0)
      const start_time = parseInt((this.form.start_time.setHours(0, 0, 0) + this.hours_time) / 1000)
      const data = {
        merchant_id: this.pkdata.merchant_id,
        grade_id: this.form.class,
        course_id: this.form.subject,
        teacher_ids: this.form.teacher,
        start_time,
        len: this.form.len,
        classroom_id: this.form.classroom,
        ctid: this.pkdata.ctid,
        ignore_conflict: type == '1' ? '1' : '0',
        type: '1',
        note: this.form.note,
        is_notice: this.form.is_notice,
        update_notice: this.form.update_notice ? '1' : '2'
      }

      this._NET.jw_paike_update(data, true).then((res) => {
        if (res.status == 'ok') {
          this.$message({
            type: 'success',
            msg: '修改成功'
          })

          this.visible = false
          this.$emit('callback')
        } else {
          // 冲突
          if (res.code == 1002 || res.code == 1001 || res.code == 1000) {
            this.$confirm(`排课信息${res.msg}，是否继续修改?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(() => {
                this.updatefunc('1')
              })
              .catch(() => {})
          } else {
            this.$message({
              type: 'warning',
              msg: res.msg
            })
          }
        }
      })
    },

    quedingfun() {
      if (!this.verification()) return
      const time = new Date(this.time)
      this.hours_time = time.getTime() - time.setHours(0, 0, 0)
      const start_time = parseInt(new Date(this.form.start_time).setHours(0, 0, 0) + this.hours_time)
      this.form.start_time = start_time
      console.log(this.form)
      this.$emit('callback', this.form)
      this.visible = false
    },

    verification() {
      if (!this.form.class_id) {
        this.$message({
          type: 'warning',
          message: '请选择班级'
        })
        return false
      }

      if (!this.form.subject_id) {
        this.$message({
          type: 'warning',
          message: '请选择课程'
        })
        return false
      }

      if (!this.form.teacher_id) {
        this.$message({
          type: 'warning',
          message: '请选择授课老师'
        })
        return false
      }

      if (!this.form.start_time) {
        this.$message({
          type: 'warning',
          message: '请选择上课日期'
        })
        return false
      }

      if (!this.time) {
        this.$message({
          type: 'warning',
          message: '请选择上课时间'
        })
        return false
      }

      if (!this.form.len) {
        this.$message({
          type: 'warning',
          message: '请填写上课时长'
        })
        return false
      }

      if (this.form.len <= 0) {
        this.$message({
          type: 'warning',
          message: '上课时长必须大于0'
        })
        return false
      }

      return true
    }
  }
}
</script>
