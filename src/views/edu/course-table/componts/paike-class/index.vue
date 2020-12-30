<template>
  <div>
    <el-dialog
      title="按班排课"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :visible.sync="visible"
      width="800px"
      @open="onOpen"
    >
      <div v-loading="loading" class="pk_content" :element-loading-text="paikeText">
        <div v-show="step == '1'" class="formbox">
          <el-form ref="form" :model="{}" label-width="80px">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="班级" class="require">
                  <el-select
                    v-model="class_id"
                    :loading="cloading"
                    style="width: 100%"
                    size="medium"
                    placeholder="请选择班级"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in classList"
                      :key="'1c_' + index"
                      :label="item.class_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="课程" class="require">
                  <el-select
                    v-model="subject_id"
                    style="width: 100%"
                    size="medium"
                    placeholder="请选择课程"
                    filterable
                  >
                    <el-option
                      v-for="item in subjectList"
                      :key="'2x_' + item.id"
                      :label="item.subject_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="授课老师" class="require">
                  <el-select
                    v-model="teacher_id"
                    :loading="tloading"
                    style="width: 100%"
                    size="medium"
                    placeholder="请选择授课老师"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in teacherList"
                      :key="'3t_' + index"
                      :label="item.teacher_name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="上课时间" class="require">
                  <el-date-picker
                    v-model="start_time"
                    style="width: 152px; margin-right: 12px"
                    size="medium"
                    type="date"
                    placeholder="上课日期"
                    :picker-options="pickerOptions_1"
                    @change="startChange"
                  ></el-date-picker>
                  <el-time-picker
                    v-model="sk_time"
                    size="medium"
                    style="width: 117px"
                    format="HH:mm"
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
                    v-model="time_len"
                    style="width: 100%"
                    size="medium"
                    placeholder="上课时长(分钟)"
                    maxlength="5"
                    @input="timeLenInput"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="教室">
                  <el-select
                    v-model="classroom_id"
                    style="width: 100%"
                    size="medium"
                    placeholder="请选择教室"
                    filterable
                  >
                    <el-option
                      v-for="(item, index) in classroomList"
                      :key="'4m_' + index"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item style="margin-bottom: 0px" label="重复" class="require">
                  <el-select
                    v-model="pk_repeat"
                    style="width: 100%"
                    size="medium"
                    @change="pk_repeat_change"
                  >
                    <el-option label="单次" value="1"></el-option>
                    <el-option label="每周循环" value="2"></el-option>
                    <el-option label="隔周循环" value="3"></el-option>
                  </el-select>
                  <p v-show="pk_repeat != '1'" class="tishi">最多可排{{ s_count }}节课</p>
                </el-form-item>
              </el-col>
            </el-row>

            <div v-if="pk_repeat != '1'" class="bg_student">
              <el-form-item label="循环周期" class="require">
                <el-checkbox-group v-model="weekgrounp" @change="weekgrounpChange">
                  <el-checkbox-button
                    v-for="item in weeklist"
                    :key="'5w_' + item.value"
                    :label="item.value"
                  >{{ item.text }}</el-checkbox-button>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="课次截止" class="require">
                <div>
                  <el-radio v-model="endtype" label="1" @change="endtype_change">设置排课总数</el-radio>
                  <el-radio v-model="endtype" label="2" @change="endtype_change">设置结束日期</el-radio>
                </div>
                <div v-if="endtype == '1'" class="keciend">
                  共
                  <el-input
                    v-model="pk_count"
                    :disabled="!start_time || weekgrounp.length == 0"
                    style="width: 70px"
                    @input="kcInput"
                  ></el-input>&nbsp;次课程
                  <span>结束日期：{{ end_time | dateFormat('YYYY-MM-DD HH:MM') }}</span>
                </div>
                <div v-if="endtype == '2'" class="keciend">
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
                <p v-if="pk_repeat == '3'" class="c_c">
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
                    v-model="note"
                    type="textarea"
                    style="width: 100%"
                    size="medium"
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

        <div v-show="step == '2'" class="tablebox">
          <el-table :data="waitArr" style="width: 100%">
            <el-table-column prop="class_id" label="班级">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in classList"
                  v-show="item.id == scope.row.class_id"
                  :key="'6cl_' + index"
                >
                  {{ item.class_name }}
                  <span
                    v-if="scope.row.conflict == 'class'"
                    class="chongtu"
                  >[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="teacher_id" label="老师">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in teacherList"
                  v-show="item.id == scope.row.teacher_id"
                  :key="'7tl_' + index"
                >
                  {{ item.teacher_name }}
                  <span
                    v-if="scope.row.conflict == 'teacher'"
                    class="chongtu"
                  >[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="classroom_id" label="教室">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in classroomList"
                  v-show="item.id == scope.row.classroom_id"
                  :key="'8cls_' + index"
                >
                  {{ item.name }}
                  <span v-if="scope.row.conflict == 'classroom'" class="chongtu">[冲突]</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="start_time" label="上课时间" width="150">
              <template slot-scope="scope">
                {{ scope.row.start_time | dateFormat('YYYY-MM-DD hh:mm') }}
                <span
                  v-if="scope.row.start_time < currentTime"
                  class="chongtu"
                >[补排]</span>
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

        <div v-show="step == '3'" class="tablebox">
          <div class="tixing">
            <div v-for="item in subjectList" :key="'9k_' + item.id">
              <span v-if="subject_id == item.id">课程：{{ item.subject_name }}</span>
            </div>
            <div v-for="item in classList" :key="'10k_' + item.id">
              <span v-if="class_id == item.id">班级：{{ item.name }}</span>
            </div>
            <div v-for="item in teacherList" :key="'11k_' + item.id">
              <span v-if="teacher_id == item.id">授课老师：{{ item.teacher_name }}</span>
            </div>
            <div v-for="item in classroomList" :key="'12k_' + item.id">
              <span v-if="classroom_id == item.id">教室：{{ item.name }}</span>
            </div>
            <div v-if="start_time && sk_time">
              <span>上课时间：{{ parseInt(start_time.getTime()) | dateFormat('YYYY-MM-DD') }}&nbsp;{{ parseInt(sk_time.getTime()) | dateFormat('hh:mm') }}</span>
            </div>
            <p class="tishi1">新建的排课存在冲突</p>
            <p class="paikeinfo">
              冲突的排课信息：
              <span
                v-for="(item, index) in checkCodeList"
                :key="'13ct_' + index"
                class="active"
              >{{ item.msg }}</span>
            </p>
          </div>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button v-if="step == '1'" @click="visible = false">取 消</el-button>
          <el-button v-if="step == '1'" type="primary" :loading="xloading" @click="nextFunc">确 定</el-button>
          <el-button v-if="step == '2'" @click="backstep('1')">返回修改</el-button>
          <el-button
            v-if="step == '2' && chongtu"
            type="primary"
            :loading="xloading"
            @click="addfunc"
          >仍然创建</el-button>
          <el-button
            v-if="step == '2' && !chongtu"
            type="primary"
            :loading="xloading"
            @click="addfunc"
          >确认添加</el-button>
          <el-button v-if="step == '3'" @click="backstep('1')">返回修改</el-button>
          <el-button v-if="step == '3'" type="primary" :loading="xloading" @click="singlePaike">仍然创建</el-button>
        </span>
      </div>
    </el-dialog>

    <paike-editor
      :show.sync="edshow"
      :pkdata.sync="pkdata"
      :class-list="classList"
      :teacher-list="teacherList"
      :classroom-list="classroomList"
      :subject-list="subjectList"
      @callback="edtcallback"
    ></paike-editor>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped src="./index.scss"></style>
