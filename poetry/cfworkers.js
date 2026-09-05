addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const styles = `:root{--paper:#f6f1e7;--ink:#292722;--muted:#887f72;--vermilion:#a13d32;--line:rgba(161,61,50,.28)}*{box-sizing:border-box}html,body{min-height:100%}body{display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:72px 24px 96px;overflow:hidden;background:var(--paper);color:var(--ink);font-family:"Noto Serif SC","Songti SC","STSong","SimSun",serif}.poem-card{position:relative;z-index:1;width:min(900px,100%);padding:clamp(48px,9vw,96px) clamp(28px,8vw,100px);border:1px solid var(--line);background:#fbf8f1;box-shadow:0 18px 60px rgba(70,53,36,.08);text-align:center}.poem-card::before,.poem-card::after{position:absolute;width:12px;height:12px;border-color:var(--vermilion);content:""}.poem-card::before{top:14px;left:14px;border-top:1px solid;border-left:1px solid}.poem-card::after{right:14px;bottom:14px;border-right:1px solid;border-bottom:1px solid}#poem_sentence{margin:0;color:var(--ink);font-size:clamp(30px,5vw,58px);font-weight:500;letter-spacing:.16em;line-height:1.8}#poem_info{margin-top:30px;color:var(--muted);font-size:clamp(14px,2vw,17px);letter-spacing:.12em}#poem_info::before{display:block;width:42px;height:1px;margin:0 auto 18px;background:var(--vermilion);content:""}footer{position:fixed;right:0;bottom:0;left:0;z-index:2;padding:18px 24px 22px;color:var(--muted);font-family:system-ui,-apple-system,"Microsoft YaHei",sans-serif;font-size:12px;letter-spacing:.12em;text-align:center}footer p{display:inline-flex;align-items:center;gap:10px;margin:0}.github-link{display:inline-flex;color:var(--muted)}.github-link svg{width:17px;height:17px;fill:currentColor}@media (max-width:600px){body{padding:40px 16px 72px}.poem-card{padding:48px 20px}#poem_sentence{letter-spacing:.08em}#poem_info{letter-spacing:.04em}}`

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
    const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>今日诗词</title><style>${styles}</style></head><body><main class="poem-card" aria-live="polite"><div id="poem_sentence">${content}</div><div id="poem_info">${info}</div></main><footer><p><a class="github-link" href="https://github.com/lgpay/pages" aria-label="GitHub 项目地址"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.77.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z"/></svg></a>© 2026 lgpay</p></footer></body></html>`
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=UTF-8' } })
  } catch (error) {
    return new Response('今日诗词暂时无法获取，请稍后再试。', { status: 502, headers: { 'Content-Type': 'text/plain; charset=UTF-8' } })
  }
}
