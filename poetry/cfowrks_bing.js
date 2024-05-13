addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // 发起对今日诗词 API 的请求
  const response = await fetch('https://v2.jinrishici.com/one.json')
  const data = await response.json()

  // 构建响应
  const poemContent = data.data.content
  const poemInfo = `【${data.data.origin.dynasty}】${data.data.origin.author}《${data.data.origin.title}》`
  const htmlResponse = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <title>今日诗词</title>
      <style>
        body {
          background-image: url('https://fastly.jsdelivr.net/gh/lgpay/bing_wallpaper/bing_wallpaper.jpg');
          background-size: cover;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-size: 50px;
        }
        #poem_info {
          text-align: center;
          color: gray;
          position: fixed;
          bottom: 0;
          width: 100%;
          margin-bottom: 20px;
          font-size: 16px;
        }

        /* 移动设备样式 */
        @media (max-width: 768px) {
          body {
            font-size: 30px;
          }
        }
      </style>
    </head>
    <body>
      <div id="poem_sentence">${poemContent}</div>
      <div id="poem_info">${poemInfo}</div>
    </body>
    </html>
  `

  return new Response(htmlResponse, {
    headers: {
      'Content-Type': 'text/html',
    },
  })
}
