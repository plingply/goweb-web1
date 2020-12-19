<template>
  <div ref="tableWrapper" class="common-table-wrapper" :style="{height: heightStyle || ''}">
    <el-table
      ref="table"
      v-bind="$attrs"
      :border="border"
      style="width: 100%;"
      :height="tableInnerHeight"
      :size="size"
      v-on="$listeners"
    >
      <empty-data slot="empty" :empty-height="emptyHeight"></empty-data>
      <el-table-column v-if="showIndex" type="index" :label="indexText" width="80"></el-table-column>
      <!-- 多选 -->
      <el-table-column
        v-if="selection"
        :selectable="()=>true"
        :fixed="true"
        width="50"
        type="selection"
      ></el-table-column>

      <!-- 数据 -->
      <el-table-column
        v-for="(item,index) of filterHeaders"
        :key="item.keyName ? item[item.keyName] : index"
        :prop="item.prop"
        :align="item.align || 'left'"
        :show-overflow-tooltip="item.showTooltip || true"
        :label="item.label"
        :min-width="item.width || 100"
        :sortable="item.sortable ? 'custom' : false"
        :fixed="item.fixed"
      >
        <template #header>
          <slot name="header" :column="item">{{ item.label }}</slot>
        </template>
        <template slot-scope="scope">
          <slot
            :column="item"
            :prop="item.prop"
            :row="scope.row"
            :scope="scope"
            :value="scope.row[item.prop]"
          >{{ renderCell(scope, item) }}</slot>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column
        v-if="showOperatingObj && showOperating"
        :min-width="showOperatingObj.width"
        :label="showOperatingObj.label"
        :fixed="showOperatingObj.fixed"
        :align="showOperatingObj.align"
        prop="_operation"
      >
        <template slot-scope="{row,$index}">
          <slot name="operation" :row="row" :index="$index"></slot>
        </template>
      </el-table-column>
    </el-table>
    <div style="height: 20px"></div>
    <!-- 分页 -->
    <pagination v-if="paging" v-bind="$attrs" v-on="$listeners"></pagination>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    heightStyle: {
      type: String,
      default: ""
    },
    headers: {
      type: Array,
      default: () => []
    },
    // 尺寸
    size: {
      type: String,
      default: "small"
    },
    // border
    border: {
      type: Boolean,
      default: true
    },
    // 是否显示分页
    paging: {
      type: Boolean,
      default: true
    },
    // 是否显示多选
    selection: {
      type: Boolean,
      default: false
    },
    // 显示序列
    showIndex: {
      type: Boolean,
      default: false
    },
    // 序列名称
    indexText: {
      type: String,
      default: "#"
    },

    // 是否显示操作栏
    showOperating: {
      type: Boolean,
      default: true
    },

    // 空状态高度
    emptyHeight: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableInnerHeight: "auto"
    }
  },
  computed: {
    tableHeight() {
      return this.paging ? `calc(${this.heightStyle} - 48px)` : this.heightStyle
    },
    // 操作栏样式
    showOperatingObj() {
      const obj = this.headers.find((item) => item.prop === "_operation")
      const defalutStyle = {
        width: "150px",
        label: "操作",
        fixed: "right",
        align: "left"
      }
      return obj ? Object.assign(defalutStyle, obj) : defalutStyle
    },
    // 去除操作栏
    filterHeaders() {
      return this.headers.filter((item) => item.prop !== "_operation")
    }
  },
  mounted() {
    this.$nextTick(() => {
      // 使用 settimeout 放置队列最后
      setTimeout(() => {
        this.handleTableInnerHeight()
      }, 0)
    })
  },
  methods: {
    formatValue(row, prop) {
      // 只处理一个小数点
      if (prop.indexOf(".") > -1) {
        const key1 = prop.split(".")[0]
        const key2 = prop.split(".")[1]
        return row[key1][key2]
      } else {
        return row[prop]
      }
    },
    renderCell(scope, column) {
      const value = this.formatValue(scope.row, column.prop)
      if (column && column.formatter) {
        return column.formatter(scope.row, column, value, scope.$index)
      }
      return value
    },
    // https://github.com/ElemeFE/element/issues/4109 table height bug
    handleTableInnerHeight() {
      this.tableInnerHeight = this.heightStyle ? this.$refs.tableWrapper.offsetHeight - (this.paging ? 48 : 0) : ""
    },
    // 清空多选
    clearSelection() {
      this.$refs.table.clearSelection()
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    object-fit: contain;
  }
}
</style>
