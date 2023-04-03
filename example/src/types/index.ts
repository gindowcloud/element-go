export interface User {
  id?: string
  name?: string
  phone?: string
  data?: string
}


export const propColumns = [
  { label: '属性名', prop: 'name', width: 250 },
  { label: '说明', prop: 'desc' },
  { label: '类型', prop: 'type', width: 250 },
  { label: '默认', prop: 'default', width: 250 },
]

export const methodColumns = [
  { label: '方法名', prop: 'name', width: 250 },
  { label: '说明', prop: 'desc' },
  { label: '参数', prop: 'para', width: 500 },
]

export const slotColumns = [
  { label: '插槽名', prop: 'name', width: 250 },
  { label: '说明', prop: 'desc' },
  { label: '参数', prop: 'para', width: 500 },
]