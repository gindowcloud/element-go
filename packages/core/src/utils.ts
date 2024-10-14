/**
 * 跳转地址
 * @param uri 
 */
export const $jump = (uri: string = '') => location.href = uri

/**
 * JSON 对象浅拷贝
 * @param data 
 * @returns 
 */
export const $copy = (data: {}) => {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 对象取值
 * @param obj 
 * @param keys 
 * @returns 
 */
export const $value = (obj: Object, keys: string | Array<string>) => {
  return (
    (!Array.isArray(keys)
      ? (keys || '').replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : keys
    ).reduce((a: any, b) => (a || {})[b], obj) || undefined
  )
}
