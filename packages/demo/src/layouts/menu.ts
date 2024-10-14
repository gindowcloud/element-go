import type { Menu } from '@core/types'
import { HamburgerButton, Search, TableFile, Loading, MoreFour, Page, Video } from '@icon-park/vue-next'

const menu: Array<Menu> = [
  { label: 'ExLayout 布局', icon: Page, path: '/components/layout' },
  { label: 'ExPageHeader 页头', icon: HamburgerButton, path: '/components/page-header' },
  { label: 'ExSearch 搜索', icon: Search, path: '/components/form-search' },
  { label: 'ExTable 表格', icon: TableFile, path: '/components/table' },
  { label: 'ExLoading 加载', icon: Loading, path: '/components/loading' },
  { label: 'ExPagination 分页', icon: MoreFour, path: '/components/pagination' },
  { label: 'ExPlayer 视频', icon: Video, path: '/components/player' },
]

export default menu
