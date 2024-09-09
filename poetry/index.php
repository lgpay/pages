<?php
function getServerUptime() {
    // 读取 /proc/uptime 文件内容
    $uptime = @file_get_contents('/proc/uptime');
    
    if ($uptime === false) {
        // 无法获取系统运行时间，返回 false
        return false;
    }
    
    // 提取 uptime 字符串中的第一个值，即运行的秒数
    $uptimeInSeconds = (float) strtok($uptime, ' ');
    
    // 计算运行的天数
    return floor($uptimeInSeconds / 86400);
}
?>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>今日诗词</title>
  <style>
    :root {
      --bg-color: #f9f1db;
      --text-color: #1661ab;
    }
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
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
      bottom: 60px;
      width: 100%;
      margin-bottom: 20px;
      font-size: 16px;
    }
    footer {
      text-align: center;
      color: var(--text-color);
      position: fixed;
      bottom: 0;
      width: 100%;
      font-size: 14px;
      background-color: var(--bg-color);
      padding: 10px 0;
    }
    footer a {
      color: var(--text-color);
      text-decoration: none;
    }
    footer a:hover {
      text-decoration: underline;
    }
    /* 移动设备样式 */
    @media (max-width: 768px) {
      body {
        font-size: 30px;
      }
      #poem_info {
        font-size: 14px;
      }
      footer {
        font-size: 12px;
      }
    }
  </style>
</head>
<body>
  <script src="https://sdk.jinrishici.com/v2/browser/jinrishici.js" charset="utf-8"></script>
  <div id="poem_sentence"></div>
  <div id="poem_info"></div>
  <script type="text/javascript">
    jinrishici.load(function(result) {
      var sentence = document.querySelector("#poem_sentence");
      var info = document.querySelector("#poem_info");
      sentence.innerHTML = result.data.content;
      info.innerHTML = '【' + result.data.origin.dynasty + '】' + result.data.origin.author + '《' + result.data.origin.title + '》';
    });
  </script>

  <!-- 底部版权信息和（有条件显示的）累计运行时间 -->
  <footer>
    <p>© 2024 <a href="https://3w.pm" target="_blank">3w.pm</a> 由 <a href="https://3w.pm/" target="_blank">3w.pm</a> 提供服务
      <?php 
        $uptime = getServerUptime(); 
        if ($uptime !== false) {
          echo '，累计运行时长：' . htmlspecialchars($uptime) . '天';
        }
      ?>
    </p>
  </footer>
</body>
</html>
