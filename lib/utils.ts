/**
 * 对象取值
 * @param obj 
 * @param keys 
 * @returns 
 */
export const getValue = (obj: Object, keys: string | Array<string>) => {
  return (
    (!Array.isArray(keys)
      ? keys.replace(/\[/g, '.').replace(/\]/g, '').split('.')
      : keys
    ).reduce((a: any, b) => (a || {})[b], obj) || undefined
  )
}
