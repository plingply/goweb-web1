import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import $s from '@/utils/storage'
import whiteList from '@/config/white-list'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  if (whiteList.indexOf(to.path) !== -1) {
    NProgress.done()
    next()
    return
  }

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    console.log('to:', to)
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const { roles } = await store.dispatch('user/getInfo')

          if (roles && roles.length > 0) {
            // generate accessible routes map based on roles
            const accessRoutes = await store.dispatch('permission/generateRoutes', roles)

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            GetSchoolList(next, to)
          } else {
            NProgress.done()
          }
        } catch (error) {
          // remove token and go to login page to re-login
          store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          NProgress.done()
        }
      }
    }
  } else {
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

function GetSchoolList(next, to) {
  store
    .dispatch('school/getSchoolList')
    .then(res => {
      store.commit('school/SET_SCHOOLLIST', res)
      let schoolId = $s.ls_get('school_id')

      const result = res.some(item => {
        if (item.school_id === schoolId) {
          return true
        }
      })
      console.log('result:', result, schoolId)
      if (!schoolId || !result) {
        schoolId = res[0].school_id
      }
      store.commit('school/SET_SCHOOLID', schoolId)

      store
        .dispatch('school/getCampusSimpleList', {
          school_id: schoolId
        })
        .then(res => {
          NProgress.done()
          if (to) {
            next({ ...to, replace: true })
          } else {
            next('/')
          }
        })
        .catch(error => {
          store.dispatch('user/resetToken')
          Message.error(error)
          NProgress.done()
        })
    })
    .catch(error => {
      store.dispatch('user/resetToken')
      Message.error(error)
      NProgress.done()
    })
}
