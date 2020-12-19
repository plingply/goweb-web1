<!--
 * @Author: 彭林
 * @Date: 2020-12-14 10:41:13
 * @LastEditTime: 2020-12-14 10:51:13
 * @LastEditors: 彭林
 * @Description: 空数据
 * @FilePath: /eduplus_web/src/components/empty-data/index.vue
-->
<template>
  <div class="empty" :style="{ height: emptyHeight }">
    <img src="@/assets/image/components/empty.png" />
    <span style="line-height:40px">暂无数据</span>
  </div>
</template>

<script>
export default {
  props: {
    emptyHeight: {
      type: String,
      default: "500px"
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  font-size: 12px;
  color: $text_c9;
  img {
    object-fit: contain;
  }
}
</style>
