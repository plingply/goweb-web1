<template>
  <div class="school-list">
    <template v-for="(item,index) in schoolList">
      <span v-if="item.school_id == schoolId" :key="index">{{ item.school_name }} <img src="../../assets/svg/qiehuan.svg" alt=""></span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    schoolList() {
      return this.$store.state.school.schoolList
    },

    schoolId() {
      return this.$store.state.school.schoolId
    }
  },

  created(){
      console.log(this.schoolId, "xxx")
  }
}
</script>


<style lang="scss" scoped>
.school-list{
    margin-right: 12px;
    span {
        display: flex;
        align-items: center;
        font-weight: bold;
        img {
            width: 20px;
            height: 20px;
            margin-left: 4px;
            cursor: pointer;
        }
    }
}
</style>