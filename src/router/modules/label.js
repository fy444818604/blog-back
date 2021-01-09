import Layout from '@/layout'

const labelRouter = {
  path: '/label',
  component: Layout,
  redirect: '/label/list',
  name: 'label',
  meta: {
    title: 'label',
    icon: 'table'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/label/create'),
      name: 'CreateLabel',
      meta: { title: 'CreateLabel', icon: 'edit', roles: ['editor'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/label/edit'),
      name: 'EditArticle',
      meta: { title: 'EditArticle', noCache: true, activeMenu: '/label/list', roles: ['editor'] },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/label/list'),
      name: 'LabelList',
      meta: { title: 'LabelList', icon: 'list', roles: ['editor'] }
    }
  ]
}

export default labelRouter
