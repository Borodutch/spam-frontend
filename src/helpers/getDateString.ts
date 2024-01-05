export default function (date: Date | string | bigint) {
  if (typeof date === 'bigint') {
    date = new Date(Number(date))
  }
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return date.toLocaleString()
}
