/* Layout */
import Layout from '@/layout'
export default {
  path: '/edu',
  component: Layout,
  redirect: '/edu/class',
  name: 'edu',
  meta: {
    title: '教务管理',
    icon: 'component'
  },
  children: [
    {
      path: 'course/table',
      component: () => import('@/views/edu/course-table/index.vue'),
      name: 'course-table',
      meta: { title: '排课表' }
    },
    {
      path: 'class',
      component: () => import('@/views/edu/class/index'),
      name: 'class',
      meta: { title: '班级管理' }
    },
    {
      path: 'class/info/:class_id',
      component: () => import('@/views/edu/class/info/index'),
      name: 'classInfo',
      hidden: true,
      meta: { title: '班级详情' }
    },
    {
      path: 'student',
      component: () => import('@/views/edu/student/index'),
      name: 'student',
      meta: { title: '学生管理' }
    },
    {
      path: 'subject',
      component: () => import('@/views/edu/subject/index'),
      name: 'subject',
      meta: { title: '课程管理' }
    },
    {
      path: 'card',
      component: () => import('@/views/edu/card/index'),
      name: 'card',
      meta: { title: '学员卡管理' }
    }
  ]
}
