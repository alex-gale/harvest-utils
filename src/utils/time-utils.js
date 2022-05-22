const timeToInt = (timeString) => {
  const hoursMinutes = timeString.split(':')
  const hours = parseInt(hoursMinutes[0])
  const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1]) : 0

  return hours + (minutes / 60)
}

const intToTime = (timeInt) => {
  const hours = Math.trunc(timeInt).toString()
  const minutes = Math.abs(Math.round((timeInt % 1) * 60, 2)).toString()

  return `${hours}:${minutes.padStart(2, '0')}`
}

export {
  timeToInt,
  intToTime
}