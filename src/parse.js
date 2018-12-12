const ptn = /\|.+?([가-힣]+).+?\|.+?(\d+).+?\|/g

function * match (pattern, input, m) {
  while ((m = pattern.exec(input)) !== null) yield m
}

function refmt (m) {
  return {
    name: m[1].trim(),
    level: parseInt(m[2], 10)
  }
}

export default async function parse (url) {
  const res = await fetch(url)
  return (await res.text()).split('###')
    .map(s => Array.from(match(ptn, s), refmt))
    .filter(v => v && v.length)
}
