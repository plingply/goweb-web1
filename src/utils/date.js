import dayjs from 'dayjs'
export function dateFormat(date, format) {
  if (!date) return '--'
  date = new Date(date).getTime()
  format = format || 'YYYY-MM-DD HH:mm:ss'
  const timeStr = dayjs(date).format(format)
  if (timeStr === 'Invalid Date') {
    return '--'
  } else {
    return timeStr
  }
}
