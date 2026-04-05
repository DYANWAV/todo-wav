import { isValidDate } from './is-valid-date'

export function formatDate(
  date: Date | string | undefined,
  month: Intl.DateTimeFormatOptions['month'] = 'short',
) {
  if (!date) {
    return ''
  }

  const dateObj = typeof date === 'string' ? new Date(date) : date

  if (!isValidDate(dateObj)) {
    return ''
  }

  return dateObj.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: month,
    year: 'numeric',
  })
}
