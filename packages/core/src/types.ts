import { Icon } from "@icon-park/vue-next/lib/runtime"

export interface Menu {
  label: string
  path: string
  icon?: Icon
  children?: Menu[]
  external?: boolean
}
