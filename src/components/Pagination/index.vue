
<template>
  <div v-if="totalNum > 0" class="fenye-style">
    <div>
      <slot />
    </div>
    <el-pagination
      class="fenye-style-pagination"
      v-bind="$attrs"
      :page-size="sizes"
      :page-sizes="pageSizes"
      :total="totalNum"
      :current-page="pages"
      :layout="fyLayout"
      @current-change="handleCurrentChange"
      @size-change="sizeChange"
      @prev-click="prevClick"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 40, 50]
    },

    pageNum: {
      type: Number,
      default: 1
    },

    sizeNum: {
      type: Number,
      default: 10
    },

    totalNum: {
      type: Number,
      required: true,
      default: 0
    },

    fyLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },

    callback: {
      type: Function,
      default: () => {}
    }
  },

  data() {
    return {
      pages: 1,
      sizes: 10
    }
  },

  watch: {
    pageNum(val) {
      this.pages = val
    }
  },

  mounted() {
    if (this.sizeNum < 10) {
      this.pageSizes.unshift(this.sizeNum)
    }
    this.pages = this.pageNum
    this.sizes = this.sizeNum
  },

  methods: {
    handleCurrentChange(val) {
      this.pages = val
      this.$emit('update:pageNum', val)
      this.$emit('callback', {
        pageNum: this.pages,
        sizeNum: this.sizes,
        type: 'currentChange'
      })
    },

    sizeChange(val) {
      this.pages = 1
      this.sizes = val
      this.$emit('update:pageNum', 1)
      this.$emit('update:sizeNum', val)
      this.$emit('callback', {
        pageNum: this.pages,
        sizeNum: this.sizes,
        type: 'sizeChange'
      })
    },

    prevClick() {
      this.pages--
      this.$emit('update:pageNum', this.pages)
      this.$emit('callback', {
        pageNum: this.pages,
        sizeNum: this.sizes,
        type: 'prev'
      })
    },

    nextClick() {
      this.pages++
      this.$emit('update:pageNum', this.pages)
      this.$emit('callback', {
        pageNum: this.pages,
        sizeNum: this.sizes,
        type: 'next'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fenye-style {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fenye-style-pagination {
  // margin: 24px 0;
}
</style>
