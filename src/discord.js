require('dotenv').config();
const { MessageEmbed, WebhookClient, Client } = require("discord.js");
const key = process.env.KEY;
const token = process.env.TOKEN;
const webHookId = process.env.WEBHOOK_ID;
const webHookToken = process.env.WEBHOOK_TOKEN;

const bot = new Client();
const miner = require('./miner')
    
exports.botOnline = async () => {
  await bot.login(token);
  await bot.on("ready", () => {
    console.log(`Sakamoto Bot está online: ${bot.user.tag}!`);
  });
}

async function sendMessage(message,id,token) {
  const hook = new WebhookClient(id,token);
  hook.send(message);
}

exports.worksMiner = async () =>{
  const newChapters = await miner._findNews();
  for (const chapter of newChapters) {
    await this.sendMessageNewSleeves(`Novo capítulo do ${chapter.name}, N°${chapter.last} acesse em ${chapter.href}.`)
  }
}

exports.routineMiner = async () => {
  setInterval(()=>{
    this.worksMiner();
  },50000)
}

exports.sendMessageNewSleeves = async (message) => {
  await sendMessage(message,webHookId,webHookToken)
}
