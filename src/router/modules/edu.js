/* Layout */
import Layout from '@/layout'
export default {
  path: '/edu',
  component: Layout,
  redirect: '/edu/class',
  name: '教务管理',
  meta: {
    title: '教务管理',
    icon: 'component'
  },
  children: [
    {
      path: 'class',
      component: () => import('@/views/edu/class/index'),
      name: '班级管理',
      meta: { title: '班级管理' }
    },
    {
      path: 'student',
      component: () => import('@/views/edu/student/index'),
      name: '学生管理',
      meta: { title: '学生管理' }
    },
    {
      path: 'subject',
      component: () => import('@/views/edu/subject/index'),
      name: '课程管理',
      meta: { title: '课程管理' }
    },
    {
      path: 'card',
      component: () => import('@/views/edu/card/index'),
      name: '学员卡管理',
      meta: { title: '学员卡管理' }
    }
  ]
}
