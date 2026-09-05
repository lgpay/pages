addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const styles = `:root{--paper:#f6f1e7;--ink:#292722;--muted:#887f72;--vermilion:#a13d32;--line:rgba(161,61,50,.28)}*{box-sizing:border-box}html,body{min-height:100%}body{position:relative;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:72px 24px 96px;overflow:hidden;background:var(--paper);color:var(--ink);font-family:"Noto Serif SC","Songti SC","STSong","SimSun",serif}body::before,body::after{position:fixed;z-index:0;color:var(--line);font-size:clamp(110px,18vw,260px);line-height:1;pointer-events:none}body::before{top:8vh;left:5vw;content:"诗"}body::after{right:5vw;bottom:8vh;content:"意"}.poem-card{position:relative;z-index:1;width:min(900px,100%);padding:clamp(48px,9vw,96px) clamp(28px,8vw,100px);border:1px solid var(--line);background:rgba(255,252,246,.56);box-shadow:0 18px 60px rgba(70,53,36,.08);text-align:center}.poem-card::before,.poem-card::after{position:absolute;width:12px;height:12px;border-color:var(--vermilion);content:""}.poem-card::before{top:14px;left:14px;border-top:1px solid;border-left:1px solid}.poem-card::after{right:14px;bottom:14px;border-right:1px solid;border-bottom:1px solid}#poem_sentence{margin:0;color:var(--ink);font-size:clamp(30px,5vw,58px);font-weight:500;letter-spacing:.16em;line-height:1.8}#poem_info{margin-top:30px;color:var(--muted);font-size:clamp(14px,2vw,17px);letter-spacing:.12em}#poem_info::before{display:block;width:42px;height:1px;margin:0 auto 18px;background:var(--vermilion);content:""}footer{position:fixed;right:0;bottom:0;left:0;z-index:2;padding:18px 24px 22px;color:var(--muted);font-family:system-ui,-apple-system,"Microsoft YaHei",sans-serif;font-size:12px;letter-spacing:.12em;text-align:center}@media (max-width:600px){body{padding:40px 16px 72px}.poem-card{padding:48px 20px}#poem_sentence{letter-spacing:.08em}#poem_info{letter-spacing:.04em}}`

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]))
}

async function handleRequest(request) {
  try {
    const response = await fetch('https://v2.jinrishici.com/one.json')
    if (!response.ok) throw new Error(`API returned ${response.status}`)
    const poem = (await response.json()).data
    const content = escapeHtml(poem.content)
    const info = escapeHtml(`【${poem.origin.dynasty}】${poem.origin.author}《${poem.origin.title}》`)
    const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>今日诗词</title><style>${styles}</style></head><body><main class="poem-card" aria-live="polite"><div id="poem_sentence">${content}</div><div id="poem_info">${info}</div></main><footer><p>© 2026 lgpay</p></footer></body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } })
  } catch (error) {
    return new Response('今日诗词暂时无法获取，请稍后再试。', { status: 502, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
  }
}
