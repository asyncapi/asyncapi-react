export const parse = <T extends {}>(str: string): T => {
  return JSON.parse(str) as T
}

export const stringify = <T extends {}>(content: T): string => {
  return JSON.stringify(content)
}