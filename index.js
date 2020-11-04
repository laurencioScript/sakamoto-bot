const bot = require('./src/discord');


async function main() {
  try {

    await bot.botOnline();
    await bot.worksMiner();

  } catch (error) {
    console.log(">>> Sakamoto ta offline:", error);
  }
}
main();