<template>
  <page>
    <h1 class="title">
      <span>班级名称</span>
      <el-tag type="danger">已停用</el-tag>
    </h1>
    <div class="class-info-box">
      <el-form ref="form" :model="{}" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="班级名称">
              小小班
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级类型">
              临时班
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="班级容量">
              2
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间">
              2020-01-12
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="累计课消">
              20课时
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注">
              小小班
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
        <!-- <components :is="item.name" :key="item.name"></components> -->
        <member-list></member-list>
      </el-tab-pane>
    </el-tabs>
  </page>
</template>

<script>
import memberList from '../compontents/member-list'
export default {
  components: {
    memberList
  },

  data() {
    return {
      activeName: 'member-list',
      tabList: [
        {
          label: '班级课程',
          name: 'member-list'
        },
        {
          label: '班级学员',
          name: 'member-list'
        },
        {
          label: '考勤记录',
          name: 'member-list'
        }
      ]
    }
  },

  methods: {
    handleClick() {}
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
}
.class-info-box {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  background-color: #f8f8f8;
}
</style>
