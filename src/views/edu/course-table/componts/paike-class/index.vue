<template>
  <div>
    <el-dialog
      title="按班排课"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="800px"
    >
      <div class="pk_content" :element-loading-text="paikeText" v-loading="loading">
        <div class="formbox" v-show="step == '1'">
          <el-form ref="form" :model="{}" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="班级" class="require">
                  <el-select
                    :loading="cloading"
                    style="width: 100%"
                    @change="classChange"
                    size="medium"
                    v-model="class_id"
                    placeholder="请选择班级"
                    filterable
                  >
                    <el-option
                      :label="item.class_name"
                      :value="item.id"
                      v-for="(item, index) in classList"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程" class="require">
                  <el-select style="width: 100%" size="medium" v-model="subject_id" placeholder="请选择课程" filterable>
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item, index) in subjectlist"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="授课老师" class="require">
                  <el-select
                    :loading="tloading"
                    style="width: 100%"
                    size="medium"
                    v-model="teacher_id"
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
              </el-col>
              <el-col :span="12">
                <el-form-item label="上课时间" class="require">
                  <el-date-picker
                    style="width: 152px; margin-right: 12px"
                    size="medium"
                    v-model="start_time"
                    type="date"
                    placeholder="上课日期"
                    @change="startChange"
                    :picker-options="pickerOptions_1"
                  ></el-date-picker>
                  <el-time-picker
                    size="medium"
                    style="width: 117px"
                    format="HH:mm"
                    v-model="sk_time"
                    placeholder="上课时间"
                    @change="sk_time_change"
                  ></el-time-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="上课时长" class="require">
                  <el-input
                    style="width: 100%"
                    size="medium"
                    @input="timeLenInput"
                    v-model="time_len"
                    placeholder="上课时长(分钟)"
                    maxlength="5"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教室">
                  <el-select
                    style="width: 100%"
                    size="medium"
                    v-model="classroom_id"
                    placeholder="请选择教室"
                    filterable
                  >
                    <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item, index) in classroomlist"
                      :key="index"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item style="margin-bottom: 0px" label="重复" class="require">
                  <el-select style="width: 100%" size="medium" v-model="pk_repeat" @change="pk_repeat_change">
                    <el-option label="单次" value="1"></el-option>
                    <el-option label="每周循环" value="2"></el-option>
                    <el-option label="隔周循环" value="3"></el-option>
                  </el-select>
                  <p class="tishi" v-show="pk_repeat != '1'">最多可排{{ s_count }}节课</p>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课前通知" class="require">
                  <el-radio-group v-model="is_notice">
                    <el-radio label="1">通知</el-radio>
                    <el-radio label="2">不通知</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>

            <div class="bg_student" v-if="pk_repeat != '1'">
              <el-form-item label="循环周期" class="require">
                <el-checkbox-group v-model="weekgrounp" @change="weekgrounpChange">
                  <el-checkbox-button v-for="item in weeklist" :label="item.value" :key="item.value">{{
                    item.text
                  }}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="课次截止" class="require">
                <div>
                  <el-radio v-model="endtype" @change="endtype_change" label="1">设置排课总数</el-radio>
                  <el-radio v-model="endtype" @change="endtype_change" label="2">设置结束日期</el-radio>
                </div>
                <div class="keciend" v-if="endtype == '1'">
                  共
                  <el-input
                    @input="kcInput"
                    :disabled="!start_time || weekgrounp.length == 0"
                    v-model="pk_count"
                    style="width: 70px"
                  ></el-input
                  >&nbsp;次课程
                  <span>结束日期：{{ end_time | dateFormat('YYYY-MM-DD HH:MM') }}</span>
                </div>
                <div class="keciend" v-if="endtype == '2'">
                  <el-date-picker
                    v-model="end_time"
                    style="width: 150px"
                    :picker-options="pickerOptions"
                    type="date"
                    placeholder="选择日期"
                    :disabled="!start_time || weekgrounp.length == 0"
                    @change="endTimeChange"
                  ></el-date-picker>
                  <span>共{{ pk_count }}次课程</span>
                </div>
                <p class="c_c" v-if="pk_repeat == '3'">
                  <span v-if="waitArr[0]">{{ waitArr[0].start_time | dateFormat('YYYY-MM-DD') }}</span>
                  <span v-if="!waitArr[0]">--</span>
                  所在周上课，下一周休息，以此循环
                </p>
              </el-form-item>
            </div>

            <el-row :gutter="20" style="margin-top: 18px">
              <el-col :span="24">
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    style="width: 100%"
                    size="medium"
                    v-model="note"
                    placeholder="备注信息"
                    maxlength="200"
                    rows="3"
                  ></el-input>
                  <p class="text_right">
                    <span>{{ note.length }}/200</span>
                  </p>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>

        <div class="tablebox" v-show="step == '2'">
          <el-table :data="waitArr" style="width: 100%">
            <el-table-column prop="grade_id" label="班级">
              <template slot-scope="scope">
                <div v-for="(item, index) in classList" :key="index" v-show="item.id == scope.row.grade_id">
                  {{ item.class_name }}
                  <span class="chongtu" v-if="scope.row.class_ct">[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teacher_ids" label="老师">
              <template slot-scope="scope">
                <div v-for="(item, index) in teacherlist" :key="index" v-show="item.user_id == scope.row.teacher_ids">
                  {{ item.user_remark }}
                  <span class="chongtu" v-if="scope.row.teacher_ct">[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="classroom_id" label="教室">
              <template slot-scope="scope">
                <div v-for="(item, index) in classroomlist" :key="index" v-show="item.id == scope.row.classroom_id">
                  {{ item.name }}
                  <span class="chongtu" v-if="scope.row.classroom_ct">[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="上课时间" width="150">
              <template slot-scope="scope">
                {{ scope.row.start_time | dateFormat('YYYY-MM-DD hh:mm') }}
                <span class="chongtu" v-if="scope.row.start_time < currentTime">[补排]</span>
              </template>
            </el-table-column>
            <el-table-column prop="is_notice" label="是否通知">
              <template slot-scope="scope">
                {{ scope.row.is_notice == '1' ? '通知' : '不通知' }}
              </template>
            </el-table-column>
            <el-table-column prop="date" label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="editorfunc(scope.row, scope.$index)">编辑</el-button>
                <el-button type="text" @click="delpaike(scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="tablebox" v-show="step == '3'">
          <div class="tixing">
            <div v-for="(item, index) in subjectlist" :key="index">
              <span v-if="subject_id == item.id">课程：{{ item.name }}</span>
            </div>
            <div v-for="(item, index) in classList" :key="index">
              <span v-if="class_id == item.id">班级：{{ item.name }}</span>
            </div>
            <div v-for="(item, index) in teacherlist" :key="index">
              <span v-if="teacher_id == item.user_id">授课老师：{{ item.user_remark }}</span>
            </div>
            <div v-for="(item, index) in classroomlist" :key="index">
              <span v-if="classroom_id == item.id">教室：{{ item.name }}</span>
            </div>
            <div v-if="start_time && sk_time">
              <span
                >上课时间：{{ parseInt(start_time.getTime()) | dateFormat('YYYY-MM-DD') }}&nbsp;{{
                  parseInt(sk_time.getTime()) | dateFormat('hh:mm')
                }}</span
              >
            </div>
            <p class="tishi1">新建的排课存在冲突</p>
            <p class="paikeinfo">
              冲突的排课信息：
              <span class="active" v-for="(item, index) in checkCodeList" :key="index">{{ item.msg }}</span>
            </p>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button v-if="step == '1'" @click="visible = false">取 消</el-button>
          <el-button v-if="step == '1'" type="primary" :loading="xloading" @click="nextFunc">确 定</el-button>
          <el-button v-if="step == '2'" @click="backstep('1')">返回修改</el-button>
          <el-button v-if="step == '2' && chongtu" type="primary" @click="addfunc" :loading="xloading"
            >仍然创建</el-button
          >
          <el-button v-if="step == '2' && !chongtu" type="primary" @click="addfunc" :loading="xloading"
            >确认添加</el-button
          >
          <el-button v-if="step == '3'" @click="backstep('1')">返回修改</el-button>
          <el-button v-if="step == '3'" type="primary" @click="singlePaike" :loading="xloading">仍然创建</el-button>
        </span>
      </div>
    </el-dialog>

    <paike-editor
      :showtime="edshow"
      :pkdata="pkdata"
      :classList="classList"
      :teacherlist="teacherlist"
      :classroomlist="classroomlist"
      @callback="edtcallback"
    ></paike-editor>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
