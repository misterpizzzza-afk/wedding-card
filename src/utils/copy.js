export function copyText(text){
  if (navigator.clipboard){
    navigator.clipboard.writeText(text).then(()=> alert('복사되었습니다.'))
  } else {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
    alert('복사되었습니다.')
  }
}
