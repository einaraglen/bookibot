export const getTodayKey = (): string => {
  const now = new Date()
  return `${normalizeNumber(now.getFullYear())}-${normalizeNumber(now.getMonth() + 1)}-${normalizeNumber(now.getDate())}`
}

export const normalizeNumber = (number: number): string => {
  return number.toString().length === 1 ? `0${number}` : number.toString()
}
