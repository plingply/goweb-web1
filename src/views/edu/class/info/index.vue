<template>
  <page v-loading="loading">
    <h1 class="title">
      <span>{{ info.class_name }}</span>
      <el-tag size="small" :type="tagType">{{ classStatus[info.status] }}</el-tag>
    </h1>
    <div class="class-info-box">
      <el-form ref="form" :model="{}" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="班级类型">{{ classType[info.class_type] }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级容量">1/{{ info.capacity }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">{{ info.created_at | dateFormat('YYYY-MM-DD') }}</el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="累计课消">--</el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">{{ info.remark }}</el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <template v-for="item in tabList">
        <el-tab-pane :key="item.name" :label="item.label" :name="item.name">
          <component :is="item.name" v-if="activeName == item.name"></component>
        </el-tab-pane>
      </template>
    </el-tabs>
  </page>
</template>

<script>
import memberList from '../compontents/member-list'
import courseList from '../compontents/course-list'
import kaoqinList from '../compontents/kaoqin-list'
import { getClassInfo } from '@/api/class'
import { classStatus, classType } from '@/config/index'
export default {
  components: {
    memberList,
    courseList,
    kaoqinList
  },

  data() {
    return {
      activeName: 'courseList',
      tabList: [
        {
          label: '班级课程',
          name: 'courseList'
        },
        {
          label: '班级学员',
          name: 'memberList'
        },
        {
          label: '考勤记录',
          name: 'kaoqinList'
        }
      ],

      info: {},
      loading: false,
      classStatus,
      classType,
      tagType: 'danger'
    }
  },

  created() {
    this.getClassInfo()
  },

  methods: {
    handleClick() {},

    getClassInfo() {
      this.loading = true
      getClassInfo({
        school_id: this.school_id,
        campus_id: this.campus_id,
        class_id: this.$route.params.class_id
      })
        .then((res) => {
          this.loading = false
          this.info = res.data

          if (this.info.status == '1') {
            this.tagType = 'info'
          }
          if (this.info.status == '2') {
            this.tagType = 'success'
          }
          if (this.info.status == '3') {
            this.tagType = 'danger'
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  padding: 0;
  margin: 0;
  margin-bottom: 12px;
  font-size: 16px;
  color: $text_c3;
  > span {
    margin-right: 12px;
  }
}
.class-info-box {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  background-color: #f8f8f8;
}
</style>
