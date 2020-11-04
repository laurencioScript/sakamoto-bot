const bot = require('./src/discord');
const logger = require('./src/logger');

async function main() {
  try {

    // await bot.botOnline();
    await bot.routineMiner();

  } catch (error) {
    logger.error(error,'main')
    console.log(">>> Sakamoto ta offline:", error);
  }
}
main();