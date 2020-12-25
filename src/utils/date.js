import dayjs from 'dayjs'
export function dateFormat(date, format) {
  if (!date) return '--'
  date = Number(date) ? Number(date) : date
  date = new Date(date).getTime()
  format = format || 'YYYY-MM-DD HH:mm:ss'
  const timeStr = dayjs(date).format(format)
  if (timeStr === 'Invalid Date') {
    return '--'
  } else {
    return timeStr
  }
}

export function weekFormat(date) {
  if (!date) return '--'
  date = Number(date) ? Number(date) : date
  const week = new Date(date).getDay()
  let str = ''
  switch (week) {
    case 0:
      str = '日'
      break
    case 1:
      str = '一'
      break
    case 2:
      str = '二'
      break
    case 3:
      str = '三'
      break
    case 4:
      str = '四'
      break
    case 5:
      str = '五'
      break
    case 6:
      str = '六'
      break
  }
  return str
}
