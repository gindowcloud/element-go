import { Icon } from "@icon-park/vue-next/lib/runtime"

export interface Menu {
  title: string
  path: string
  icon?: Icon
  children?: Menu[]
}
