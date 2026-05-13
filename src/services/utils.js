const DRIVE_THUMBNAIL = 'https://drive.google.com/thumbnail?id={id}&sz=w1000'
const DRIVE_FILE_RE = /drive\.google\.com\/file\/d\/([^/]+)/
const DRIVE_ID_RE = /^[a-zA-Z0-9_-]{25,}$/

export function parseImageUrl(value) {
  if (!value) return ''
  const v = value.trim()
  if (v.startsWith('http://') || v.startsWith('https://') || v.startsWith('data:')) {
    const m = v.match(DRIVE_FILE_RE)
    if (m) return DRIVE_THUMBNAIL.replace('{id}', m[1])
    return v
  }
  if (DRIVE_ID_RE.test(v)) return DRIVE_THUMBNAIL.replace('{id}', v)
  return v
}
