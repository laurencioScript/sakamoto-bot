require('dotenv').config();
const fs = require('fs');
const path = require('path');
const puppeter = require('puppeteer');
const mangas = require('./mangas.json');
const key = process.env.KEY;
const token = process.env.TOKEN;
const { MessageEmbed, WebhookClient } = require("discord.js");

async function main() {
  try {
    const Discord = require("discord.js");
    const bot = new Discord.Client();
    await bot.login(token);
    await botOnline(bot);
    newNews();

    setInterval(()=>{
      newNews();
    },10800000)

  } catch (error) {
    console.log(">>> error", error);
  }
}

main();

async function botOnline(bot) {
  await bot.on("ready", () => {
    console.log(`Bot online: ${bot.user.tag}!`);
  });
}

async function webhook(message) {
  try {
    const hook = new WebhookClient("772961625879085077", "kkvG2cTRPXK1Y8jzt4JZ03PQ54Fenrui8Z-akbUbnFtixVilbsoBHqhDTbnmnaJt0iYP");
    hook.send(message);
    hook.send("@otakus");
  } catch (error) {
    console.log(">>> error", error);
  }
}

async function newNews() {
  for (const manga of mangas) {
    console.log(`Buscando atualizações do ${manga.name}...`);
    await webhook(`Buscando atualizações do ${manga.name}...`)
    const browser = await puppeter.launch()
    const page = await browser.newPage();
    let deuRuim = null;
   do {
      try {
        deuRuim = null;
        await page.goto(manga.url); 
      } catch (error) {
        deuRuim = error;
        console.log('Deu erro de time out nessa merda');
      }
   } while (deuRuim);
    // page.waitForNavigation({timeout:60000})
    const chapters = await page.evaluate(async () => {
      const result = await document.querySelectorAll(".row .lancamento-linha");
      let caps = [];
      for (const element of result) {
        if(element){
          const div = element.querySelector('.col-xs-6');
          if(div){
            const a = div.querySelector('a')
            if(a){
              caps.push({
                href:a.href,
                cap:a.text
              })
            }
          }
        }
      }
  
      return caps;
    });
    
    console.log(`Exitem ${chapters.length} capitulos...`);
  
    const news = [];
    for (const chapter of chapters) {
      let indexChapter = +chapter.cap.replace('Cap. ','');
      if( indexChapter > manga.last){
        news.push(chapter);
        manga.last = indexChapter;
        manga.href = chapter.href;
        await webhook(`Novo capítulo do ${chapter.name}, N°${chapter.last} acesse em ${chapter.href}.`)
        updateMangas(mangas);
      }
    }

    if(news.length == 0){
      await webhook(`Nada novo do ${manga.name}...`)
    }

    console.log('>>> news chapters',news);
    await browser.close();
    console.log('end');
  }

 


}

function updateMangas(mangas){
  fs.writeFile('./mangas.json', JSON.stringify(mangas, null, 4),{enconding:'utf-8'}, function (err) {
    if (err) throw err;
});
}