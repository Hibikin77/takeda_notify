function hook() {

    const query = '{from:info@takeda.tv from:support@jyukunavi.jp from:info@bestjuku.com} label:unread';
   
    const threads = GmailApp.search(query);  // 未読のスレッドを取得
   
    if (threads.length == 0) {
      Logger.log('新規メッセージなし');
      return
    }
    
    threads.forEach(function (thread) {
      const messages = thread.getMessages();
   
      const payloads = messages.map(function (message) {
        message.markRead();  // メールを既読に設定する
   
        let date = message.getDate();
             date = Utilities.formatDate(date, 'Asia/Tokyo', 'MM/dd HH:mm:ss');
   
       //  const from = message.getFrom();
        const subject = message.getSubject();
       //  const plainBody = message.getPlainBody();
   
        const webhook = getWebhookUrl();
   
        Logger.log(subject);
        const payload = {
          content: subject,
          embeds: [{
            title: subject,
            author: {
              name: date,
            },
            color:0xff4500,
          }],
        }
        return {
          url: webhook,
          contentType: 'application/json',
          payload: JSON.stringify(payload),
        }
      })
   
      Logger.log(payloads);
      UrlFetchApp.fetchAll(payloads);
    })
   }
   
   
function getWebhookUrl() {
    const WebhookUrl = ""; // discordのbotから取得
   
    return WebhookUrl ; 
    }
