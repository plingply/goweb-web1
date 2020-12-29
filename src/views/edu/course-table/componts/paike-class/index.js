import paikeEditor from '../paike-editor/index'
import { checkPaikeConflict } from '@/api/course'
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
    classroomlist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      loading: false,
      paikeText: '加载中...',
      xloading: false,
      cloading: false,
      tloading: false,

      /**
       * 编辑相关
       */
      edshow: 0,
      pkdata: {},
      edtindex: 0,

      // 班级
      class_id: '',
      // 课程id
      subject_id: '',
      // 授课老师
      teacher_id: '',
      // 教室
      classroom_id: '',
      // 上课时间
      start_time: '',
      // 上课时间
      sk_time: '',
      // 上课时长
      time_len: '',
      // 排课结束日期
      end_time: '',
      // 课次截止
      endtype: '1',
      // 排课总量
      pk_count: 0,
      // 排课重复
      pk_repeat: '1',
      // 循环排课选择 星期
      weekgrounp: [],

      // 计算时间
      timeArr: [],

      // 时间间隔
      s_count: 180,

      // 备注
      note: '',

      step: '1',

      weeklist: [
        {
          value: 1,
          text: '周一'
        },
        {
          value: 2,
          text: '周二'
        },
        {
          value: 3,
          text: '周三'
        },
        {
          value: 4,
          text: '周四'
        },
        {
          value: 5,
          text: '周五'
        },
        {
          value: 6,
          text: '周六'
        },
        {
          value: 7,
          text: '周日'
        }
      ],

      // 记录冲突code
      checkCodeList: 0,

      /**
       * 待排课数组
       */
      waitArr: [],

      // 记录小时
      hours_time: '',

      pickerOptions: {
        disabledDate(v) {
          return true
        },
        firstDayOfWeek: 1
      },
      pickerOptions_1: {
        firstDayOfWeek: 1
      },

      succStep: 0,

      // 排课是否存在冲突
      chongtu: false,
      currentTime: ''
    }
  },

  watch: {
    showtime() {
      this.step = '1'
      this.show = true
      this.startChange()
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

  components: {
    paikeEditor
  },

  created() {
    this.currentTime = parseInt(new Date().getTime())
  },

  methods: {
    // 检查全局是否存在冲突
    checkchongtu() {
      this.chongtu = false
      this.waitArr.map((item, index) => {
        if (item.classroom_ct || item.teacher_ct || item.class_ct) {
          this.chongtu = true
        }
      })
    },

    pk_repeat_change() {
      this.checkStartTime()
      this.repeatFun()
    },

    endtype_change() {
      if (this.weekgrounp.length == 0) {
        this.$message({
          type: 'warning',
          message: '请选择循环周期'
        })
        return
      }
      this.checkStartTime()
      this.repeatFun()
    },

    sk_time_change() {
      this.repeatFun()
    },

    // 周改变函数
    weekgrounpChange() {
      this.checkStartTime()
      this.repeatFun()
    },

    // 输入课次
    kcInput(value) {
      value = parseInt(value)
      let val = value > this.s_count ? this.s_count : value
      val = val || ''
      this.pk_count = val
      this.repeatFun()
    },

    // 选择结束日期
    endTimeChange() {
      this.repeatFun()
    },

    // 检查是否选择开始时间
    checkStartTime() {
      if (!this.start_time || !this.sk_time) {
        this.$message({
          type: 'warning',
          message: '请先选择上课时间'
        })
        return false
      }

      return true
    },

    // 开始时间改变
    startChange() {
      this.end_time = ''
      this.typeChange()
      this.repeatFun()
    },

    // 开始时间选择 限制结束日期
    typeChange() {
      const _self = this
      if (this.start_time && this.start_time != 'null') {
        this.pickerOptions.disabledDate = function(v) {
          if (!_self.start_time) {
            return true
          }
          const time = _self.start_time.getTime()
          if (v < time) {
            return true
          } else {
            return false
          }
        }
      } else {
        return true
      }
    },

    // 本地检测冲突
    localCheck(indexs) {
      const curent = this.waitArr[indexs]
      const start = curent.start_time
      const end = start + curent.len * 60 * 1000
      this.waitArr.map((item, index) => {
        if (indexs != index) {
          const s = item.start_time
          const e = s + item.len * 60 * 1000
          if ((start < s && end > s) || (start >= s && start < e)) {
            // 冲突
            if (curent.class_id == item.class_id) {
              item.class_ct = true
            }

            if (curent.classroom_id && curent.classroom_id == item.classroom_id) {
              item.classroom_ct = true
            }

            if (curent.teacher_id == item.teacher_id) {
              item.teacher_ct = true
            }
          }
        }
      })
    },

    // 列表修改排课
    editorfunc(obj, index) {
      this.pkdata = obj
      this.edtindex = index
      this.edshow = Date.now()
    },

    // 修改排课回调
    edtcallback(data) {
      for (const key in data) {
        this.waitArr[this.edtindex][key] = data[key]
      }
      this.paikeText = `冲突检查中...`

      const arr = this.waitArr[this.edtindex]
      const list = [
        {
          school_id: arr.school_id,
          campus_id: arr.campus_id,
          class_id: arr.class_id,
          subject_id: arr.subject_id,
          teacher_id: arr.teacher_id,
          start_time: arr.start_time,
          len: arr.len,
          classroom_id: arr.classroom_id,
          type: 1
        }
      ]

      this.paikeCheck({ pklist: list }).then(res => {
        this.waitArr[this.edtindex].classroom_ct = false
        this.waitArr[this.edtindex].class_ct = false
        this.waitArr[this.edtindex].teacher_ct = false
        // 0:正常,1000:教室冲突1001:年级冲突1002:老师冲突

        if (res.code == 1000) {
          // res.data[result.start_time].forEach(list => {
          //   if (list.code == 1000) {
          //     this.waitArr[this.edtindex].classroom_ct = true
          //   }
          //   if (list.code == 1001) {
          //     this.waitArr[this.edtindex].class_ct = true
          //   }
          //   if (list.code == 1002) {
          //     this.waitArr[this.edtindex].teacher_ct = true
          //   }
          // })
        }

        this.localCheck(this.edtindex)
        this.checkchongtu()
      })
    },

    // 删除排课
    delpaike(index) {
      this.waitArr.splice(index, 1)
    },

    // 下一步
    nextFunc() {
      // 不重复
      if (this.pk_repeat == '1') {
        if (!this.verification()) return

        const time = new Date(this.sk_time)

        this.hours_time = parseInt(time.getTime() - time.setHours(0, 0, 0))

        this.oneCheckChontu()
      } else {
        if (!this.verification()) return

        this.repeatFun()

        this.loading = true
        this.paikeText = `冲突检查中...`

        const list = []

        this.waitArr.map(item => {
          list.push({
            school_id: this.school_id,
            campus_id: this.campus_id,
            class_id: item.class_id,
            subject_id: item.subject_id,
            teacher_id: item.teacher_id,
            start_time: item.start_time,
            len: item.len,
            classroom_id: item.classroom_id,
            type: 1
          })
        })
        this.paikeCheck(list)
          .then(res => {
            this.loading = false
            if (res.status == 'ok') {
              this.step = '2'
              this.checkchongtu()
            } else {
              // 0:正常,1000:教室冲突1001:年级冲突1002:老师冲突
              if (res.code == 1000) {
                this.waitArr.forEach((item, index) => {
                  if (res.data[item.start_time]) {
                    res.data[item.start_time].forEach(list => {
                      if (list.code == 1000) {
                        this.waitArr[index].classroom_ct = true
                      }
                      if (list.code == 1001) {
                        this.waitArr[index].class_ct = true
                      }
                      if (list.code == 1002) {
                        this.waitArr[index].teacher_ct = true
                      }
                    })
                  }
                })

                this.step = '2'
                this.checkchongtu()
              } else {
                this.$message({
                  type: 'warning',
                  message: res.message
                })
              }
            }
          })
          .catch(() => {
            this.loading = false
          })
      }
    },

    // 初始化
    initForm() {
      this.class_id = ''
      this.subject_id = ''
      this.teacher_id = ''
      this.start_time = ''
      this.sk_time = ''
      this.time_len = ''
      this.end_time = ''
      this.endtype = '1'
      this.pk_count = ''
      this.pk_repeat = '1'
      this.weekgrounp = []
      this.step = '1'
      this.note = ''
    },

    // 单次冲突检查
    oneCheckChontu() {
      this.loading = true
      this.paikeText = `冲突检查中...`

      const list = [
        {
          school_id: this.school_id,
          campus_id: this.campus_id,
          class_id: this.class_id,
          subject_id: this.subject_id,
          teacher_id: this.teacher_id,
          start_time: parseInt(this.start_time.setHours(0, 0, 0) + this.hours_time),
          len: this.time_len,
          classroom_id: this.classroom_id,
          type: 1
        }
      ]

      this.paikeCheck({ pklist: list })
        .then(res => {
          this.loading = false
          if (res.status == 'ok') {
            this.singlePaike()
          } else {
            if (res.code == 1000) {
              // this.checkCodeList = res.data[result.start_time]
              this.step = '3'
            } else {
              this.$message({
                type: 'warning',
                message: res.message
              })
            }
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    singlePaike() {
      const result = {}
      const list = [
        {
          start_time: parseInt(this.start_time.setHours(0, 0, 0) + this.hours_time),
          len: this.time_len,
          teacher_id: this.teacher_id,
          classroom_id: this.classroom_id
        }
      ]

      result.school_id = this.school_id
      result.campus_id = this.campus_id
      result.class_id = this.class_id
      result.course_id = this.subject_id
      result.ignore_conflict = 1
      result.type = 1
      result.coursetable_list = JSON.stringify(list)
      result.note = this.note

      this.paikeText = `排课中...`
      this.loading = true
      this.paikeAdd(result)
        .then(res => {
          this.loading = false
          if (res.status == 'ok') {
            this.show = false
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.$emit('callback')
            this.initForm()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 重复添加 确认
    addfunc() {
      if (this.waitArr.length == 0) {
        this.$message({
          type: 'warning',
          message: '请添加排课信息'
        })
        return
      }
      this.loading = true
      this.paikeText = `排课中...`
      this.succStep = 0

      const result = []
      const publicObj = this.waitArr[0]
      const list = []

      this.waitArr.map((item, index) => {
        list.push({
          start_time: item.start_time,
          len: item.len,
          teacher_id: item.teacher_id,
          classroom_id: item.classroom_id
        })
      })

      result.school_id = publicObj.school_id
      result.campus_id = publicObj.campus_id
      result.class_id = publicObj.class_id
      result.course_id = publicObj.course_id
      result.ignore_conflict = 1
      result.type = 1
      result.coursetable_list = JSON.stringify(list)
      result.note = this.note

      this.paikeAdd(result)
        .then(res => {
          this.loading = false
          if (res.status == 'ok') {
            this.show = false
            this.$emit('callback')
            this.$message({
              type: 'success',
              message: '排课成功'
            })
            this.initForm()
          } else {
            this.$message({
              type: 'warning',
              message: res.message
            })
          }
        })
        .catch(() => {
          this.loading = false
        })
    },

    // 单次排课
    paikeCheck(obj) {
      return checkPaikeConflict({}, obj)
    },

    /**
     * 重复排课计算
     */
    repeatFun() {
      if (!this.start_time || !this.sk_time) {
        this.timeArr = []
        this.waitArr = []

        if (this.endtype == '1') {
          this.end_time = ''
        }

        if (this.endtype == '2') {
          this.pk_count = 0
        }

        return
      }

      if (this.weekgrounp.length == 0) {
        this.timeArr = []
        this.waitArr = []

        if (this.endtype == '1') {
          this.end_time = ''
        }

        if (this.endtype == '2') {
          this.pk_count = 0
        }

        return
      }

      if (this.endtype == '1') {
        if (!this.pk_count || this.pk_count <= 0) {
          this.end_time = ''
          this.timeArr = []
          this.waitArr = []
          return
        }
      }

      if (this.endtype == '2') {
        if (!this.end_time) {
          this.pk_count = ''
          this.timeArr = []
          this.waitArr = []
          return
        }
      }

      const time = new Date(this.sk_time)
      this.hours_time = parseInt(time.getTime() - time.setHours(0, 0, 0))
      const start = parseInt(this.start_time.setHours(0, 0, 0))
      let timeArray = []
      //   每周循环
      if (this.pk_repeat == '2') {
        timeArray = this.weeklyCycle(start, 7)
      }
      //   按周重复
      if (this.pk_repeat == '3') {
        timeArray = this.weeklyCycle(start, 14)
      }

      const subjectArr = []

      for (let i = 0; i < timeArray.length; i++) {
        subjectArr.push({
          school_id: this.school_id,
          campus_id: this.campus_id,
          class_id: this.class_id,
          course_id: this.subject_id,
          teacher_id: this.teacher_id,
          start_time: timeArray[i],
          len: this.time_len,
          classroom_id: this.classroom_id,
          class_ct: false,
          teacher_ct: false,
          classroom_ct: false,
          type: 1
        })
      }

      this.waitArr = subjectArr
    },

    checkMaxPkNum(arr) {
      if (arr.length > this.s_count) {
        this.$message({
          type: 'warning',
          message: `最大排课${this.s_count}节`
        })

        return false
      }
      return true
    },

    // 获取当前时间，精确到分
    getNomTimeToMin() {
      const now = new Date()
      const mint = now.getTime()
      const nowtime = parseInt(now.getTime()) - mint
      return nowtime
    },

    // 每周循环
    weeklyCycle(start, step = 7) {
      /**
       *  1  先获取开始日期数组
       *  2  根据开始日期和所选星期获取所有时间
       *  3  去除小于当前时间 和大于总排课次数  或者大于结束日期的时间
       */
      start += this.hours_time
      let start_week = new Date(start).getDay()
      start_week = start_week == 0 ? 7 : start_week
      const start_time_arr = []
      // 所有时间
      let alltime = []
      const oneday = 60 * 60 * 24 * 1000

      // 获取开始日期数组
      this.weekgrounp.forEach(item => {
        let stime = start + (item - start_week) * oneday
        if (stime < start) {
          stime += oneday * step
        }
        start_time_arr.push(stime)
      })

      // 最终结果日期
      if (this.endtype == '1') {
        // 根据开始日期和所选星期获取所有时间
        start_time_arr.forEach(list => {
          for (let i = 0; i < this.pk_count; i++) {
            const t = list + step * i * oneday
            alltime.push(t)
          }
        })

        // 按大小排序
        alltime.sort(function(a, b) {
          return a > b ? 1 : -1
        })

        alltime = alltime.splice(0, this.pk_count)

        this.end_time = new Date(alltime[alltime.length - 1])
      }

      // 按结束日期排课
      if (this.endtype == '2') {
        const end = parseInt(this.end_time.setHours(23, 59, 59))
        const count = Math.ceil((end - start) / (step * oneday)) * this.weekgrounp.length
        // 根据开始日期和所选星期获取所有时间
        start_time_arr.forEach(list => {
          for (let i = 0; i < count; i++) {
            const t = list + step * i * oneday
            if (t <= end) {
              alltime.push(t)
            }
          }
        })

        // 按大小排序
        alltime.sort(function(a, b) {
          return a > b ? 1 : -1
        })

        if (!this.checkMaxPkNum(alltime)) {
          alltime = alltime.splice(0, this.s_count)
          this.end_time = new Date(alltime[this.s_count - 1])
        }

        this.pk_count = alltime.length
      }

      return alltime
    },

    // 添加排课
    paikeAdd(obj) {
      return this._NET.jw_paike_add(obj, true)
    },

    // 返回上一步
    backstep(v) {
      this.step = v
    },

    // 上课时长
    timeLenInput(v) {
      v = parseInt(v) ? parseInt(v) : ''
      this.time_len = v
    },

    // 验证函数
    verification() {
      if (!this.class_id) {
        this.$message({
          type: 'warning',
          message: '请选择班级'
        })
        return false
      }

      if (!this.subject_id) {
        this.$message({
          type: 'warning',
          message: '请选择课程'
        })
        return false
      }

      if (!this.teacher_id) {
        this.$message({
          type: 'warning',
          message: '请选择授课老师'
        })
        return false
      }

      if (!this.start_time) {
        this.$message({
          type: 'warning',
          message: '请选择上课日期'
        })
        return false
      }

      if (!this.sk_time) {
        this.$message({
          type: 'warning',
          message: '请选择上课时间'
        })
        return false
      }

      if (!this.time_len) {
        this.$message({
          type: 'warning',
          message: '请填写上课时长'
        })
        return false
      }

      if (this.time_len <= 0) {
        this.$message({
          type: 'warning',
          message: '上课时长必须大于0'
        })
        return false
      }

      if (this.pk_repeat != '1') {
        if (!this.end_time) {
          this.$message({
            type: 'warning',
            message: '请选择结束日期'
          })
          return false
        }

        if (this.end_time <= this.start_time) {
          this.$message({
            type: 'warning',
            message: '结束日期必须大于开始日期'
          })
          return false
        }

        if (this.waitArr.length == 0) {
          this.$message({
            type: 'warning',
            message: '暂无待排课信息'
          })
          return false
        }
      }

      return true
    }
  }
}
