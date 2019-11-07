const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const https = require('https');
require('dotenv').config();

const request = require('request');

const { token } = process.env;
const bot = new TelegramBot(token, { polling: true });

const app = express();
const idTelegran = require('../models/').telegramt;

app.get('/', (req, res) => {
  res.send('server Work');
});

function text() {
  return new Promise(resolve => {
    request(
      {
        method: 'POST',
        uri:
          'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&jsonp=parseQuote',
      },
      (error, response, body) => {
        if (response.statusCode === 201) {
          console.log('document saved as: http://mikeal.iriscouch.com/testjs/');
        } else {
          //  console.log(`status: ${response.statusCode}`);
          const res = body.split('(')[1].split('"')[3];
          resolve(res);
        }
      },
    );
  });
}

let time;
let id = [];

async function testUserDB() {
  const now = new Date();
  time = `${now.getHours() + 2}:${now.getMinutes()}`;
  const idUSER = await idTelegran.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  if (id.length === 0) {
    await idUSER.map(x => id.push(x.dataValues.tel_id));
  }
  console.log('------------------------------------');
  console.log(`brief information: `);
  console.log('------------------------------------');
  console.log(`Number of Users: ${id.length}`);
  console.log('------------------------------------');
  console.log(`User ID: ${id}`);
  console.log('------------------------------------');
  console.log(`time Server: ${time}`);
  console.log('------------------------------------');
  return {};
}
testUserDB();

// --------------------------------------------------
bot.onText(/\/start/, async msg => {
  const resp = 'Погода:';
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, resp, {
    reply_markup: {
      keyboard: [['/weather']],
    },
  });

  try {
    bot.sendMessage(
      msg.chat.id,
      `Добрый день, ${msg.chat.first_name}. Добро пожаловать!`,
      {},
    );
    const idUSER = await idTelegran.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
    const usersAl2 = idUSER.map(x => x.dataValues.tel_id);
    id = [];
    if (id.length === 0) {
      await idUSER.map(x => id.push(x.dataValues.tel_id));
    }

    testUserDB();
    const testUser = usersAl2.includes(msg.chat.id);
    if (testUser === false) {
      console.log('вы подписаны на рассылку!');
      await idTelegran.create({
        tel_id: msg.chat.id,
      });
      id.push(msg.chat.id);
      bot.sendMessage(
        msg.chat.id,
        `${msg.chat.first_name}. вы подписаны на рассылку!`,
        {},
      );
      return;
    }
    console.log('вы УЖЕ подписаны на рассылку!');
    bot.sendMessage(
      msg.chat.id,
      `${msg.chat.first_name}. вы уже подписаны на рассылку!`,
      {},
    );
    return;
  } catch (error) {
    console.log(error);
  }
});

// -----------------------------------------------------
bot.onText(/\/weather/, async msg => {
  const userId = msg.from.id;

  try {
    const city = 'cherkasy';
    const { apiKeyWeather } = process.env;
    const units = 'metric';
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=${units}`;

    request(url, (err, response, body) => {
      if (err) {
        console.log('error:', err);
      } else {
        const weather = JSON.parse(body);
        const clouds = 100 - weather.clouds.all;
        const response1 = `*Сейчас: ${weather.main.temp} градусов в ${weather.name}*
        Влажность: ${clouds} %
        Облачность: ${weather.clouds.all} %`;
        bot.sendMessage(userId, response1, { parse_mode: 'Markdown' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

setInterval(() => {
  const now = new Date();
  time = `${now.getHours() + 2}:${now.getMinutes()}`;
  // console.log(time);
  if (now.getDay() >= 1 && now.getDay() <= 5) {
    if (time === '8:28') {
      for (let i = 0; i < id.length; i += 1)
        bot.sendMessage(id[i], 'Хорошего рабочего дня!!!');
    }

    if (time === '7:30') {
      for (let i = 0; i < id.length; i += 1) {
        const city = 'cherkasy';
        const { apiKeyWeather } = process.env;
        const units = 'metric';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKeyWeather}&units=${units}`;

        request(url, (err, response, body) => {
          if (err) {
            console.log('error:', err);
          } else {
            const weather = JSON.parse(body);
            const response1 = `*Сейчас: ${weather.main.temp} градусов в ${weather.name}*
            Влажность: ${weather.main.humidity} %
            Облачность: ${weather.clouds.all} %`;
            bot.sendMessage(id[i], response1, { parse_mode: 'Markdown' });
          }
        });
      }
    }

    if (time === '10:28' || time === '14:28' || time === '15:58') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Скоро перерыв')
          .catch(err => {
            console.log(id[i]);
            console.log('error');
          });;
      }
    }

    if (time === '10:39' || time === '14:39' || time === '16:10') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Перерыв окончен')
          .catch(err => {
            console.log(id[i]);
            console.log('error');
          });
      }
    }

    if (time === '12:25') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Обед через 5 мин.')
          .catch(err => {
            console.log(id[i]);
            console.log('error');
          });;
      }
    }

    if (time === '12:35' || time === '8:30') {
      text().then(x => {
        for (let i = 0; i < id.length; i += 1) {
          bot.sendMessage(id[i], `${x}`);
        }
      });
    }

    if (time === '12:59') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Уже нужно работать!!!')
          .catch(err => {
            console.log(id[i]);
            console.log('error');
          });;
      }
    }

    if (time === '17:30') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Пора домой!!! До завтра!')
          .catch(err => {
            console.log(id[i]);
            console.log('error');
          });;
      }
    }
  }
}, 58000);

setInterval(function () {
  https.get('https://fabrnew.herokuapp.com/');
}, 300000); // every 5 minutes (300000)

app.listen(process.env.PORT || 4040, () => {
  console.log(`Server Work`);
});
