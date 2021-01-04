import Layout from '@/layout'

const photosRouter = {
  path: '/photos',
  component: Layout,
  redirect: '/photos/list',
  name: 'photos',
  meta: {
    title: '相册',
    icon: 'nested'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/photos/create'),
      name: 'Createphotos',
      meta: { title: '创建相册', icon: 'edit', roles: ['editor'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/photos/edit'),
      name: 'EditArticle',
      meta: { title: '编辑相册', noCache: true, activeMenu: '/photos/list', roles: ['editor'] },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/photos/list'),
      name: 'photosList',
      meta: { title: '相册列表', icon: 'list', roles: ['editor'] }
    }
  ]
}

export default photosRouter
