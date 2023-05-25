import type { Menu } from '../../packages/lib/types'
import { HamburgerButton, Search, TableFile, Loading, MoreFour, Page, Video } from '@icon-park/vue-next'

const menu: Array<Menu> = [
  { title: 'ExLayout 布局', icon: Page, path: '/components/layout' },
  { title: 'ExPageHeader 页头', icon: HamburgerButton, path: '/components/page-header' },
  { title: 'ExSearch 搜索', icon: Search, path: '/components/form-search' },
  { title: 'ExTable 表格', icon: TableFile, path: '/components/table' },
  { title: 'ExLoading 加载', icon: Loading, path: '/components/loading' },
  { title: 'ExPagination 分页', icon: MoreFour, path: '/components/pagination' },
  { title: 'ExPlayer 视频', icon: Video, path: '/components/player' },
]

export default menu
