export const distance = (lat1, lon1, lat2, lon2) => {
  // https://www.geodatasource.com/developers/javascript
  const radlat1 = (Math.PI * lat1) / 180
  const radlat2 = (Math.PI * lat2) / 180
  const theta = lon1 - lon2
  const radtheta = (Math.PI * theta) / 180
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
  dist = Math.acos(dist)
  dist = (dist * 180) / Math.PI
  dist = dist * 60 * 1.1515
  return {
    miles: dist,
    kilometers: dist * 1.609344,
  }
}

export const trackClick = props => e => {
  e.preventDefault()
  try {
    window.analytics.track(props.analyticsEventName || 'Clicked Link', {
      href: props.href,
      ...(props.analyticsProperties || {}),
    })
  } catch (err) {
    console.error(err)
  }
  props.onClick
    ? props.onClick(e)
    : props.noNewTab
      ? (window.location.href = props.href)
      : window.open(props.href, '_blank')
}

// based on https://github.com/withspectrum/spectrum/blob/alpha/src/helpers/utils.js#L146
export const timeSince = (previous, absoluteDuration = false, current = new Date(), longForm = false) => {
  const msPerSecond = 1000
  const msPerMinute = msPerSecond * 60
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24
  const msPerWeek = msPerDay * 7
  const msPerYear = msPerDay * 365

  const elapsed = new Date(current) - new Date(previous)

  let humanizedTime
  if (elapsed < msPerMinute) {
    humanizedTime ='< 1m'
  } else if (elapsed < msPerHour) {
    const now = Math.round(elapsed / msPerMinute)
    humanizedTime = (longForm ? `${now} minutes` : `${now}m`)
  } else if (elapsed < msPerDay) {
    const now = Math.round(elapsed / msPerHour)
    humanizedTime = (longForm ? `${now} hours` : `${now}h`)
  } else if (elapsed < msPerWeek) {
    const now = Math.round(elapsed / msPerDay)
    humanizedTime = (longForm ? `${now} days` : `${now}d`)
  } else if (elapsed < msPerYear) {
    const now = Math.round(elapsed / msPerWeek)
    humanizedTime = (longForm ? `${now} weeks` : `${now}w`)
  } else {
    const now = Math.round(elapsed / msPerYear)
    humanizedTime = (longForm ? `${now} years` : `${now}y`)
  }

  if (absoluteDuration) {
    return humanizedTime
  } else {
    return elapsed > 0 ? `${humanizedTime} ago` : `in ${humanizedTime}`
  }
}
