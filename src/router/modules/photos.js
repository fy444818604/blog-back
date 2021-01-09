import Layout from '@/layout'

const photosRouter = {
  path: '/photos',
  component: Layout,
  redirect: '/photos/list',
  name: 'photos',
  meta: {
    title: 'photos',
    icon: 'nested'
  },
  children: [
    {
      path: 'create',
      component: () => import('@/views/photos/create'),
      name: 'Createphotos',
      meta: { title: 'Createphotos', icon: 'edit', roles: ['editor'] }
    },
    {
      path: 'edit/:id',
      component: () => import('@/views/photos/edit'),
      name: 'EditArticle',
      meta: { title: 'EditArticle', noCache: true, activeMenu: '/photos/list', roles: ['editor'] },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/photos/list'),
      name: 'photosList',
      meta: { title: 'photosList', icon: 'list', roles: ['editor'] }
    }
  ]
}

export default photosRouter
