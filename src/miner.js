const fs = require('fs');
const puppeter = require('puppeteer');
const mangas = require('./../mangas.json');
const logger = require('./logger');


async function _miningPage() {
  const chapters = [];
  try {
    const elements = await document.querySelectorAll(".row .lancamento-linha");
    for (const element of elements) {
      if(element){
        const div = element.querySelector('.col-xs-6');
        if(div){
          const a = div.querySelector('a')
          if(a){
            chapters.push({
              href:a.href,
              cap:a.text
            })
          }
        }
      }
    }
  
  } catch (error) {
    logger.error(error,'_miningPage')
    console.log(`_miningPage houve um error; ${error} `);
  }
  finally{
    return chapters;
  }
}

 exports._findNews = async () =>{
  const browser = await puppeter.launch()
  const news = [];
  let hasError = null;
  for (const manga of mangas) {
    logger.log(`Buscando atualizações do ${manga.name}...`)
    const page = await browser.newPage();
    
    do {
        try {
          hasError = null;
          await page.goto(manga.url,{timeout:60000}); 
        } catch (e) {
          hasError = e;
          console.log(`    Houve um error com o manga ${manga.name}, ${e}`);
        }
    } while (hasError);

    const chapters = await page.evaluate(_miningPage);
    logger.log(`${chapters.length} Volumes`)
    if(!chapters){
      await page.close();
      continue;
    }

    for (const chapter of chapters) {
      let indexChapter = +chapter.cap.replace('Cap. ','');
      if( indexChapter > manga.last){
        manga.last = indexChapter;
        manga.href = chapter.href;
        news.push(manga);
      }
    }
    await page.close();    
  }
  await browser.close();
  await _updateFile(mangas);
  return news;
}

async function _updateFile(mangas){
  fs.writeFile('./mangas.json', 
    JSON.stringify(mangas, null, 4),
    {
      enconding:'utf-8'
    }, 
    function (err) {
      if (err) {
        logger.error(err,'_updateFile')
        throw err
      };
    }
  );
}


