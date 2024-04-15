const TelegramBot = require('node-telegram-bot-api');
const { exec } = require('child_process');

// Add your telegram bot api
const token = '6959619997:AAGWIBICrM7iTwb9-YjcQmogwr_6ctVMVog';

// Initialize bot with token
const bot = new TelegramBot(token, { polling: true });

// Function to record bot usage activities in the console log
function logActivity(msg) {
  const user = msg.from;
  const chat = msg.chat;
  const command = msg.text.toLowerCase();

  console.log(`Telegram Bot Usage Activities`);
  console.log(`• User ID: ${user.id}`);
  console.log(`• Username: ${user.username || 'There isn't any'}`);
  console.log(`• Chat ID: ${chat.id}`);
  console.log(`• Perintah: ${command}`);
}

// Event listener for messages from users
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const command = msg.text.toLowerCase();

  // Logs bot usage activity in the console log
  logActivity(msg);

  // Respond to the /mix command
  if (command.startsWith('/mix')) {
    // Extracts arguments from the message
    const args = command.split(' ');
    const url = args[1];
    const time = args[2];
    const thread = args[3];
    const rate = args[4];

   // Checks whether the message format is correct
    if (args.length === 5 && url && time && thread && rate) {
      // Runs the mix.js file with the given arguments
      exec(`node mix.js ${url} ${time} ${thread} ${rate}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          bot.sendMessage(chatId, 'Successful');
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          bot.sendMessage(chatId, 'Successful');
          return;
        }
        // Display stdout output if successful
        console.log(`stdout: ${stdout}`);
        bot.sendMessage(chatId, 'Proses telah dimulai.');
      });
    } else {
      // Notifies the user that the message format is incorrect
      bot.sendMessage(chatId, 'Format pesan tidak benar. Gunakan format: /mix [url] [time] [thread] [rate]');
    }
  }
});
