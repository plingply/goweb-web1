<template>
  <el-dialog
    v-bind="$attrs"
    :visible.sync="visible"
    :before-close="close"
    :width="width"
    v-on="$listeners"
  >
    <div v-if="$slots.title" slot="title">
      <slot name="title"></slot>
    </div>
    <!-- 弹框内容 -->
    <div v-loading="loading">
      <slot name="content"></slot>
    </div>

    <div v-if="showFooter" slot="footer">
      <slot name="footer">
        <el-button
          v-if="!cancelBtnTextStyle"
          plain
          :size="btnSize"
          @click="cancel"
        >{{ cancelBtnTitle }}</el-button>
        <el-button
          v-if="cancelBtnTextStyle"
          type="text"
          :size="btnSize"
          @click="cancel"
        >{{ cancelBtnTitle }}</el-button>
        <el-button
          v-if="!submitPermission && showSubmit"
          :size="btnSize"
          type="primary"
          @click="$emit('submit')"
          v-html="submitBtnTitle"
        ></el-button>
        <el-button
          v-else-if="showSubmit"
          v-ui-permission="submitPermission"
          :size="btnSize"
          type="primary"
          @click="$emit('submit')"
          v-html="submitBtnTitle"
        ></el-button>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
export default {
  /* 去掉默认行为 */

  props: {
    width: {
      type: String,
      default: "600px"
    },
    btnSize: {
      type: String,
      default: "small"
    },
    visible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    submitPermission: {
      type: String,
      default: ""
    },
    submitBtnTitle: {
      type: String,
      default: "确 定"
    },
    cancelBtnTitle: {
      type: String,
      default: "取消"
    },
    showSubmit: {
      type: Boolean,
      default: true
    },
    cancelBtnTextStyle: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    cancel() {
      this.$emit("cancel")
      this.close()
    },
    close() {
      this.$emit("update:visible", false)
    }
  }
}
</script>
