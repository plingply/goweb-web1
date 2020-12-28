<!--
 * @Author: 彭林
 * @Date: 2020-12-28 16:09:25
 * @LastEditTime: 2020-12-28 18:28:50
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/views/edu/course-table/componts/list.vue
-->

<template>
  <div>list</div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      sk_time: []
    }
  },
  methods: {
    getCourseList() {
      // this.loading = true
      // let start_time = parseInt(new Date().setHours(0, 0, 0) / 1000)
      // let end_time = start_time + 60 * 60 * 24 * 32 - 1
      // if (this.sk_time && this.sk_time.length == 2) {
      //   start_time = parseInt(this.sk_time[0].setHours(0, 0, 0) / 1000)
      //   end_time = parseInt(this.sk_time[1].setHours(23, 59, 59) / 1000)
      // }
    }
  }
}
</script>
