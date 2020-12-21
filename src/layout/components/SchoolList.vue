<template>
  <div class="school-list">
    <template v-for="(item,index) in schoolList">
      <span v-if="item.school_id == schoolId" :key="index">
        {{ item.school_name }}
        (
        <template v-for="(list,i) in campusList">
          <span v-if="list.id == campus_id" :key="i">{{ list.campus_name }}</span>
        </template>
        )
        <img src="../../assets/svg/qiehuan.svg" />
      </span>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    schoolList() {
      return this.$store.state.school.schoolList
    },

    campusList() {
      return this.$store.state.school.campusList
    },

    schoolId() {
      return this.$store.state.school.schoolId
    },

    campus_id() {
      return this.$store.state.school.campus_id
    }
  },

  created() {
    // /
    console.log(this.schoolId, '1xxx', this.campusList)
  }
}
</script>

<style lang="scss" scoped>
.school-list {
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
