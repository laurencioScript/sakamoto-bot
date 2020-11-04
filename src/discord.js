require('dotenv').config();
const { MessageEmbed, WebhookClient, Client } = require("discord.js");
const key = process.env.KEY;
const token = process.env.TOKEN;
const webHookId = process.env.WEBHOOK_ID;
const webHookToken = process.env.WEBHOOK_TOKEN;

const bot = new Client();
const miner = require('./miner')
const logger = require('./logger');

exports.botOnline = async () => {
  await bot.login(token);
  await bot.on("ready", () => {
    logger.log(`Sakamoto Bot está online: ${bot.user.tag}!`);
    console.log(`Sakamoto Bot esstá online: ${bot.user.tag}!`);
  });
}

async function sendMessage(message, id, token) {
  const hook = new WebhookClient(id, token);
  hook.send(message);
}

exports.worksMiner = async () => {
  logger.log('starting worksMiner...');
  const newChapters = await miner._findNews();
  for (const chapter of newChapters) {
    await this.sendMessageNewSleeves(`Novo capítulo do ${chapter.name}, N°${chapter.last} acesse em ${chapter.href}.`)
  }
}

exports.routineMiner = async () => {
  this.worksMiner();
  setInterval(() => {
    this.worksMiner();
  }, 900000)
}

exports.sendMessageNewSleeves = async (message) => {
  await sendMessage(message, webHookId, webHookToken)
}
