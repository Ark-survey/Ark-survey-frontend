export function mapToArray<T>(map: { [key: string]: T }) {
  const list: T[] = []
  Object.keys(map).forEach((key) => {
    list.push({
      ...map[key],
      key
    })
  })
  return list
}

export function setMapAttr(map: { [key: string]: any }, itemKey: string, attrValue: any) {
  map[itemKey] = {
    ...map[itemKey],
    ...attrValue
  }
  return map
}

export function setAllMapAttr(map: { [key: string]: any }, attrValue: any) {
  Object.keys(map).forEach((key) => {
    map[key] = {
      ...map[key],
      ...attrValue
    }
  })
  return map
}