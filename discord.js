const axios = require('axios');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const CLIENT_OPTIONS = {
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
};

const client = new Client({
    intents: ['GUILDS', 'GUILD_MESSAGES']
  });

let previousPrices = {};

// Symbols and time interval (in milliseconds)
const symbols = [
  "SANTOSUSDT",
  "PORTOUSDT",
  "LAZIOUSDT",
  "ALPINEUSDT",
  "ATMUSDT",
  "ACMUSDT",
  "PSGUSDT",
  "CITYUSDT",
  "OGUSDT",
  "ASRUSDT",
  "TLMUSDT",
  "TVKUSDT",
  "USTCBUSD",
  "LUNCUSDT",
  "LUNAUSDT",
  "DFUSDT",
  "CVPUSDT",
  "COSUSDT",
  "COCOSUSDT",
  "AVAXUSDT",
  "JOEUSDT",
  "DEGOUSDT",
  "ERNUSDT",
  "HIGHUSDT",
  "VOXELUSDT",
  "LOKAUSDT",
  "MANAUSDT",
  "SANDUSDT",
  "ENJUSDT",
  "AUTOBUSD",
  "BIFIBUSD",
  "GASBUSD",
  "NEOBUSD",
  "ACABUSD",
  "GLMRBUSD",
  "ASTRBUSD",
  "SNMBUSD",
  "VIBBUSD",
  "AERGOBUSD",
  "PROSBUSD",
  "ONEUSDT",
  "CELRUSDT",
  "WINGUSDT",
  "BONDUSDT",
  "QUICKUSDT",
  "FARMUSDT",
  "AGIXBUSD",
  "CTXCBUSD",
  "FETBUSD",
  "AXSUSDT",
  "SLPUSDT",
  "PERLUSDT",
  "PNTUSDT",
  "C98BUSD",
  "SFPUSDT",
  "TWTBUSD",
  "SHIBUSDT",
  "DOGEBUSD",
  "HFTBUSD",
  "MAGICBUSD",
  "JSTUSDT",
  "SUNUSDT"
];
const timeInterval = 60 * 1000; // 60 seconds

client.once('ready', () => {
  console.log('Bot is ready!');
});

async function getCurrentPrice(symbol) {
  try {
    const response = await axios.get(`https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=1`);
    if (response.data && response.data.asks && response.data.asks[0]) {
      return parseFloat(response.data.asks[0][0]);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function checkPriceChange() {
  for (const symbol of symbols) {
    const currentPrice = await getCurrentPrice(symbol);
    if (currentPrice !== null) {
      if (previousPrices[symbol] !== undefined) {
        const priceChange = (currentPrice - previousPrices[symbol]) / previousPrices[symbol];
        if (Math.abs(priceChange) >= 0.01) {
          const percentChange = (priceChange * 100).toFixed(2);
          const message = `Price of ${symbol} changed by ${percentChange}% from ${previousPrices[symbol]} to ${currentPrice}`;
          console.log(message);
          const channel = client.channels.cache.get('1085175510998458409'); // Replace CHANNEL_ID with the ID of the channel you want to send the message to
          if (channel) {
            channel.send(message);
          }
        }
      }
      previousPrices[symbol] = currentPrice;
    }
  }
}

client.login('MTA4MDM3Njk3OTc3NTI5MTQwMg.GE4avC.M02Tm6-4NOLKrEFurgQX1Fwz6enYQdsC8u5dcE'); // Replace YOUR_BOT_TOKEN with your actual bot token

setInterval(checkPriceChange, timeInterval);
