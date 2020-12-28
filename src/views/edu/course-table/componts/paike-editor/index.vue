<template>
  <el-dialog title="调整班课" :visible.sync="show" width="600px">
    <div class="pk_content" v-loading="loading">
      <div class="formbox">
        <el-form ref="form" :model="form" label-width="170px">
          <el-form-item label="班级" class="require">
            <el-select
              style="width: 272px"
              @change="classChange"
              size="medium"
              v-model="form.class"
              placeholder="请选择班级"
              filterable
              disabled
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in classList"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="课程" class="require">
            <el-select
              style="width: 272px"
              size="medium"
              v-model="form.subject"
              placeholder="请选择课程"
              filterable
              disabled
            >
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in subjectlist"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="授课老师" class="require">
            <el-select
              style="width: 272px"
              size="medium"
              v-model="form.teacher"
              placeholder="请选择授课老师"
              filterable
            >
              <el-option
                :label="item.user_remark"
                :value="item.user_id"
                v-for="(item, index) in teacherlist"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上课时间" class="require">
            <el-date-picker
              style="width: 150px"
              size="medium"
              v-model="form.start_time"
              type="date"
              placeholder="上课日期"
              :picker-options="pickerOptions_1"
            ></el-date-picker>
            <el-time-picker
              size="medium"
              style="width: 118px"
              format="HH:mm"
              v-model="form.time"
              placeholder="上课时间"
            ></el-time-picker>
          </el-form-item>
          <el-form-item label="上课时长" class="require">
            <el-input
              style="width: 150px"
              size="medium"
              @input="scInput"
              v-model="form.sc"
              placeholder="上课时长(分钟)"
              maxlength="5"
            ></el-input
            >&nbsp;分钟
          </el-form-item>
          <el-form-item label="教室">
            <el-select style="width: 272px" size="medium" v-model="form.classroom" placeholder="请选择教室" filterable>
              <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in classroomlist"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="课前通知">
            <el-radio-group v-model="form.is_notice">
              <el-radio label="1">通知</el-radio>
              <el-radio label="2">不通知</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="备注">
            <el-input
              type="textarea"
              style="width: 272px"
              size="medium"
              v-model="form.note"
              placeholder="备注信息"
              maxlength="200"
              rows="3"
            ></el-input>
            <el-checkbox v-model="form.update_notice"><span class="c2">发送调课通知</span></el-checkbox>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="show = false">取 消</el-button>
      <el-button v-if="!pkdata.ctid" type="primary" @click="quedingfun">确 定</el-button>
      <el-button v-if="pkdata.ctid" type="primary" @click="updatefunc">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: ['showtime', 'pkdata', 'classroomlist', 'teacherlist', 'classList'],
  data() {
    return {
      show: false,
      loading: false,
      form: {
        class: '',
        subject: '',
        teacher: '',
        start_time: '',
        time: '',
        sc: '',
        classroom: '',
        note: '',
        is_notice: '',
        update_notice: true
      },

      subjectlist: [],

      hours_time: '',

      pickerOptions_1: {
        // disabledDate(time) {
        //   return time.getTime() < Date.now() - 1000 * 3600 * 24;
        // },
        firstDayOfWeek: 1
      }
    }
  },

  watch: {
    showtime() {
      console.log('pkdata=>', this.pkdata)
      // ctid
      this.show = true
      this.form.class = this.pkdata.grade_id
      this.form.subject = this.pkdata.course_id
      this.form.start_time = new Date(this.pkdata.start_time * 1000)
      this.form.time = new Date(this.pkdata.start_time * 1000)
      this.form.sc = this.pkdata.len
      this.form.is_notice = this.pkdata.is_notice
      this.form.update_notice = true
      this.form.classroom = this.pkdata.classroom_id == '0' ? '' : this.pkdata.classroom_id
      this.form.note = this.pkdata.note
      if (this.pkdata.ctid) {
        this.form.teacher = this.pkdata.teacher_id
      } else {
        this.form.teacher = this.pkdata.teacher_ids
      }

      this.classChange(this.form.class)
    }
  },

  methods: {
    scInput() {},

    classChange(id) {
      this.classList.map(item => {
        if (item.id == id) {
          this.subjectlist = item.course_list
        }
      })
    },

    updatefunc(type) {
      if (!this.verification()) return
      let time = new Date(this.form.time)
      this.hours_time = time.getTime() - time.setHours(0, 0, 0)
      let start_time = parseInt((this.form.start_time.setHours(0, 0, 0) + this.hours_time) / 1000)
      let data = {
        merchant_id: this.pkdata.merchant_id,
        grade_id: this.form.class,
        course_id: this.form.subject,
        teacher_ids: this.form.teacher,
        start_time,
        len: this.form.sc,
        classroom_id: this.form.classroom,
        ctid: this.pkdata.ctid,
        ignore_conflict: type == '1' ? '1' : '0',
        type: '1',
        note: this.form.note,
        is_notice: this.form.is_notice,
        update_notice: this.form.update_notice ? '1' : '2'
      }

      this._NET.jw_paike_update(data, true).then(res => {
        if (res.status == 'ok') {
          this._alert({
            type: 'success',
            msg: '修改成功'
          })

          this.show = false
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
            this._alert({
              type: 'warning',
              msg: res.msg
            })
          }
        }
      })
    },

    quedingfun() {
      if (!this.verification()) return
      let time = new Date(this.form.time)
      this.hours_time = time.getTime() - time.setHours(0, 0, 0)
      let start_time = parseInt((this.form.start_time.setHours(0, 0, 0) + this.hours_time) / 1000)
      let data = {
        merchant_id: this.mymange,
        grade_id: this.form.class,
        course_id: this.form.subject,
        teacher_ids: this.form.teacher,
        start_time,
        len: this.form.sc,
        classroom_id: this.form.classroom,
        note: this.form.note,
        is_notice: this.form.is_notice
      }
      this.$emit('callback', data)
      this.show = false
    },

    verification() {
      if (!this.form.class) {
        this._alert({
          type: 'warning',
          msg: '请选择班级'
        })
        return false
      }

      if (!this.form.subject) {
        this._alert({
          type: 'warning',
          msg: '请选择课程'
        })
        return false
      }

      if (!this.form.teacher) {
        this._alert({
          type: 'warning',
          msg: '请选择授课老师'
        })
        return false
      }

      if (!this.form.start_time) {
        this._alert({
          type: 'warning',
          msg: '请选择上课日期'
        })
        return false
      }

      if (!this.form.time) {
        this._alert({
          type: 'warning',
          msg: '请选择上课时间'
        })
        return false
      }

      if (!this.form.sc) {
        this._alert({
          type: 'warning',
          msg: '请填写上课时长'
        })
        return false
      }

      if (this.form.sc <= 0) {
        this._alert({
          type: 'warning',
          msg: '上课时长必须大于0'
        })
        return false
      }

      return true
    }
  }
}
</script>
