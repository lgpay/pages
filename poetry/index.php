<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>今日诗词</title>
  <link rel="stylesheet" href="./style.css">
</head>
<body>
  <script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
  <main class="poem-card" aria-live="polite">
    <div id="poem_sentence"></div>
    <div id="poem_info"></div>
  </main>
  <script type="text/javascript">
    jinrishici.load(function(result) {
      var sentence = document.querySelector("#poem_sentence");
      var info = document.querySelector("#poem_info");
      sentence.textContent = result.data.content;
      info.textContent = '【' + result.data.origin.dynasty + '】' + result.data.origin.author + '《' + result.data.origin.title + '》';
    });
  </script>

  <footer>
    <p>© 2026 lgpay</p>
  </footer>
</body>
</html>
