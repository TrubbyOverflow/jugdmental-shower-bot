const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_TOKEN || "";

const bot = new TelegramBot(token, { polling: true });

const jailers = {};

bot.onText(/\/banhar/, msg => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const username = msg.from.username;

  jailers[chatId] = jailers[chatId] || { isShowerFree: true };

  const jailer = jailers[chatId];

  if (jailer.isShowerFree) {
    jailer.userId = userId;
    jailer.username = username;
    jailer.isShowerFree = false;
    bot.sendMessage(chatId, "Você sabia que se ficar debaixo de um chuveiro e ele estiver aberto, você vai se molhar?");
  } else {
    bot.sendMessage(chatId, "Quer tomar dois banhos?");
  }
});

bot.onText(/\/liberar/, msg => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  jailers[chatId] = jailers[chatId] || { userId };

  const jailer = jailers[chatId];

  if (jailer.isShowerFree) {
    bot.sendMessage(chatId, "Ninguém toma banho nessa casa");
  } else if (jailer.userId === userId) {
    jailer.isShowerFree = true;
    bot.sendMessage(chatId, "Liberado!");
  } else {
    bot.sendMessage(chatId, `@${jailer.username} está tomando banho!`);
  }
});

bot.onText(/\/status/, msg => {
  const chatId = msg.chat.id;

  const jailer = jailers[chatId] || { isShowerFree: true };

  if (jailer.isShowerFree) {
    bot.sendMessage(chatId, "Ninguém toma banho nessa casa.");
  } else {
    bot.sendMessage(
      chatId,
      `@${jailer.username} está sujo mas já vai tomar banho.`
    );
  }
});

bot.on("message", msg => {
});
