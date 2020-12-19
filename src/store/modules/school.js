import { getSchoolList } from '@/api/school'
import $s from '@/utils/storage'

const state = {
  schoolList: [],
  schoolId: $s.ls_get('schoolId') || ''
}

const mutations = {
  SET_SCHOOLLIST: (state, schoolList) => {
    state.schoolList = schoolList
  },

  SET_SCHOOLID: (state, schoolId) => {
    $s.ls_set('school_id', schoolId)
    state.schoolId = schoolId
  }
}

const actions = {
  getSchoolList({ commit }) {
    return new Promise((resolve, reject) => {
      getSchoolList().then(response => {
        const { data } = response
        commit('SET_SCHOOLLIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
