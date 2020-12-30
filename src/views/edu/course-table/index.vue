<template>
  <div>
    <div class="timetable">
      <el-button type="primary" style="width:120px" @click="paikeClassShow = true">按班排课</el-button>
      <!-- <el-button type="primary" style="width:120px">按学员排课</el-button> -->

      <div class="kb_content">
        <!-- 课表操作部分 -->
        <div class="btnbox">
          <div class="left">
            <span class="end">
              <i></i>已上课
            </span>
            <span class="wait">
              <i></i>待上课
            </span>
            <span class="ing">
              <i></i>上课中
            </span>
          </div>
          <div v-if="type == 'week' && calendarList.item.length > 0" class="center">
            <el-button plain icon="el-icon-arrow-left" @click="prew"></el-button>
            <div>
              <span>{{ calendarList.item[0].month }}月{{ calendarList.item[0].day }}日</span>
              -
              <span>{{ calendarList.item[6].month }}月{{ calendarList.item[6].day }}日</span>
            </div>
            <el-button plain icon="el-icon-arrow-right" @click="next"></el-button>
          </div>
          <div v-if="type == 'month'" class="center">
            <el-button plain icon="el-icon-arrow-left" @click="prew"></el-button>
            <div>
              <span>{{ calendarList.year }}年{{ calendarList.month }}月</span>
            </div>
            <el-button plain icon="el-icon-arrow-right" @click="next"></el-button>
          </div>
          <div class="right">
            <div class="label_list">
              <span
                class="label_list_row"
                :class="{ active: type == 'week' }"
                @click="weekandmonthFun('week')"
              >周</span>
              <span
                class="label_list_row"
                :class="{ active: type == 'month' }"
                @click="weekandmonthFun('month')"
              >月</span>
              <span
                class="label_list_row"
                :class="{ active: type == 'list' }"
                @click="weekandmonthFun('list')"
              >列表</span>
            </div>
          </div>
        </div>

        <!-- 周课表 -->
        <week-course-table v-if="type == 'week'" ref="week" @initCalendar="initCalendar"></week-course-table>

        <!-- 月课表 -->
        <month-course-table v-if="type == 'month'" ref="month" @initCalendar="initCalendar"></month-course-table>

        <!-- 列表 -->
        <list-course-table v-if="type == 'list'" ref="list"></list-course-table>
      </div>
    </div>

    <!-- 班科 -->
    <paike-class
      :show.sync="paikeClassShow"
      :class-list="classList"
      :subject-list="subjectList"
      :teacher-list="teacherList"
      @callback="paikeCallback"
    ></paike-class>
  </div>
</template>
<script src="./index.js"></script>
<style lang="scss" scoped>
@import './index.scss';
</style>
