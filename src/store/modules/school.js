import { getSchoolList, getCampusSimpleList } from '@/api/school'
import $s from '@/utils/storage'

const state = {
  schoolList: [],
  schoolId: $s.ls_get('schoolId') || '',
  campusList: []
}

const mutations = {
  SET_SCHOOLLIST: (state, schoolList) => {
    state.schoolList = schoolList
  },

  SET_CAMPUSLIST: (state, campusList) => {
    state.campusList = campusList
  },

  SET_SCHOOLID: (state, schoolId) => {
    $s.ls_set('school_id', schoolId)
    state.schoolId = schoolId
  }
}

const actions = {
  getSchoolList({ commit }) {
    return new Promise((resolve, reject) => {
      getSchoolList()
        .then((response) => {
          const { data } = response

          if (!data || data.length === 0) {
            reject('暂无学校')
            return
          }
          commit('SET_SCHOOLLIST', data)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getCampusSimpleList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getCampusSimpleList(params)
        .then((response) => {
          const { data } = response
          commit('SET_CAMPUSLIST', data)
          resolve(data)
        })
        .catch((error) => {
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
