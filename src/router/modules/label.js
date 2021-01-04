import Layout from '@/layout'

const labelRouter = {
  path: '/label',
  component: Layout,
  redirect: '/label/list',
  name: 'label',
  meta: {
    title: '标签',
    icon: 'table'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/label/create'),
      name: 'CreateLabel',
      meta: { title: '创建标签', icon: 'edit', roles: ['editor'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/label/edit'),
      name: 'EditArticle',
      meta: { title: '编辑标签', noCache: true, activeMenu: '/label/list', roles: ['editor'] },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/label/list'),
      name: 'LabelList',
      meta: { title: '标签列表', icon: 'list', roles: ['editor'] }
    }
  ]
}

export default labelRouter
