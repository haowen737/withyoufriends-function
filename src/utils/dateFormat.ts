const DateFormat = function (time: any, format: string) {
  const date = new Date(time)
  const year: any = date.getFullYear()
  const month: any = date.getMonth() + 1
  const day: any = date.getDate()
  const hour: any = date.getHours() + 1
  const minutes: any = date.getMinutes()
  const seconds: any = date.getSeconds()
  return format
    .replace('YYYY', year)
    .replace('MM', adjustDateLength(month))
    .replace('DD', adjustDateLength(day))
    .replace('hh', adjustDateLength(hour))
    .replace('mm', adjustDateLength(minutes))
    .replace('ss', adjustDateLength(seconds))
}

function adjustDateLength (target: any) {
  return target > 10 ? target : target.toString().concat('0').split('').reverse().join('')
}

export default DateFormat