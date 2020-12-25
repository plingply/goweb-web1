/*
 * @Author: 彭林
 * @Date: 2020-12-25 09:58:42
 * @LastEditTime: 2020-12-25 10:10:58
 * @LastEditors: 彭林
 * @Description:
 * @FilePath: /goweb-web1/src/mixin/index.js
 */

export default {
  computed: {
    school_id() {
      return this.$store.state.school.schoolId
    },

    campus_id() {
      return this.$store.state.school.campus_id
    }
  }
}
