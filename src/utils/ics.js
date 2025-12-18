export function createICS({ title, description = '', start, end }) {
  const pad = (n) => String(n).padStart(2, '0')
  function formatDate(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z'
  }

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding-card//EN',
    'BEGIN:VEVENT',
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(new Date(start))}`,
    `DTEND:${formatDate(new Date(end))}`,
    `SUMMARY:${escapeICSText(title)}`,
    `DESCRIPTION:${escapeICSText(description)}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ]

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' })
  return blob
}

function escapeICSText(t) {
  return t.replace(/\n/g, '\\n')
}
