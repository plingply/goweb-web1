const schoolRouter = {
  path: '/school/create',
  component: () => import('@/views/school/create/index'),
  name: 'createSchool',
  hidden: true
}
export default schoolRouter
