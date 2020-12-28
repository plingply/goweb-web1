<!--
 * @Author: 彭林
 * @Date: 2020-12-28 11:16:08
 * @LastEditTime: 2020-12-28 11:55:18
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/views/edu/class/compontents/add-member.vue
-->
<template>
  <common-dialog
    :visible.sync="visible"
    title="学员入班"
    :submit-loading="submitLoading"
    @submit="postDataForMember"
    @open="onOpen"
  >
    <template #content>
      <div class="myfrom">
        <el-form ref="form" :model="{}" label-width="80px">
          <el-form-item label="班级名称">
            <el-select v-model="class_id" filterable style="width: 100%" placeholder="请选择">
              <el-option
                v-for="item in classList"
                :key="item.id"
                :label="item.class_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="入班时间">
            <el-date-picker v-model="entry_at" style="width: 100%" type="date" placeholder="选择日期"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </common-dialog>
</template>

<script>
import { createClassMember, getClassSimpleList } from '@/api/class'
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    student_id: {
      type: Number,
      default: 0
    },
    member_type: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      class_id: '',
      entry_at: '',
      classList: [],
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
    onOpen() {
      this.classId = ''
      this.getClassSimpleList()
    },

    getClassSimpleList() {
      getClassSimpleList({
        school_id: this.school_id,
        campus_id: this.campus_id
      }).then((res) => {
        this.classList = res.data
      })
    },

    postDataForMember() {
      const data = {
        school_id: this.school_id,
        campus_id: this.campus_id,
        class_id: this.class_id,
        student_id: this.student_id,
        member_type: this.member_type,
        entry_at: this.entry_at
      }
      data.entry_at = data.entry_at ? new Date(data.entry_at).getTime() : ''
      this.submitLoading = true
      createClassMember({}, data)
        .then((res) => {
          this.submitLoading = false
          this.visible = false
          this.$message.success('入班成功')
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

.my-tips {
  font-size: 12px;
  color: $text_c9;
  line-height: 1;
  padding-top: 4px;
}
</style>
