import moment from 'moment'

export const formatDate = (datestr) => {
  const date = moment(datestr)
  const isToday = date.isSame(new Date(), 'day')
  const isYesterday = date.isSame(moment().subtract(1, 'days'), 'day')
  let formatDate = ''

  if (isToday) {
    formatDate = date.format('HH:mm:ss')
  } else if (isYesterday) {
    formatDate = '어제'
  } else {
    formatDate = date.format('YYYY-MM-DD')
  }

  return formatDate
}
