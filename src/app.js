const TelegramBot = require('node-telegram-bot-api');
const https = require("https");

require('dotenv').config();

const { token } = process.env;

console.log(token);

const bot = new TelegramBot(token, { polling: true });

const express = require('express');

const app = express();
const idTelegran = require('../models/').telegramt;

app.get('/', (req, res) => {
  res.send('server Work')

})
let time;
const id = [];
console.log(id.length);
if (id.length === 0) {
  console.log('id =  0');
  await idUSER1.map(x => id.push(x.dataValues.tel_id));
};


bot.onText(/\/start/, async (msg) => {

  const idUSER1 = await idTelegran.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })
  //const usersAll = idUSER1.map(x => x.dataValues.tel_id === msg.chat.id);
  const usersAl2 = idUSER1.map(x => x.dataValues.tel_id);


  console.log('------------------------------------');
  console.log(usersAl2);
  console.log('------------------------------------');

  try {
    bot.sendMessage(msg.chat.id, `Добрый день, ${msg.chat.first_name}. Добро пожаловать!`, {
    });



    console.log(id);
    const testUser = usersAl2.includes(msg.chat.id);
    if (testUser === false) {
      console.log('вы подписаны на рассылку!');

      await idTelegran.create({
        tel_id: msg.chat.id,
      })
      bot.sendMessage(msg.chat.id, `${msg.chat.first_name}. вы подписаны на рассылку!`, {});
      return
    }
    console.log('вы УЖЕ подписаны на рассылку!');
    bot.sendMessage(msg.chat.id, `${msg.chat.first_name}. вы уже подписаны на рассылку!`, {});
    return

  } catch (error) {
    console.log(error);

  }
})



setInterval(() => {
  const now = new Date();
  time = `${now.getHours()}:${now.getMinutes()}`;

  console.log('time:' + time);

  console.log('------------------------------------');
  console.log(id);
  console.log('------------------------------------');
  if (now.getDay() >= 1 && now.getDay() <= 5) {
    if (time === '5:28') {
      for (let i = 0; i < id.length; i += 1)
        bot.sendMessage(id[i], 'Хорошего рабочего дня!!!')

    }

    if (time === '7:28') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Скоро перерыв')
      }
    }

    if (time === '7:39') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Перерыв окончен')
      }
    }

    if (time === '9:25') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Обед через 5 мин.')
      }
    }

    if (time === '9:59') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Уже нужно работать!!!')
      }
    }

    if (time === '11:28') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Скоро перерыв')
      }
    }

    if (time === '11:39') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Перерыв окончен')
      }
    }

    if (time === '12:58') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Скоро перерыв')
      }
    }

    if (time === '13:10') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Перерыв окончен')
      }
    }


    if (time === '14:30') {
      for (let i = 0; i < id.length; i += 1) {
        bot.sendMessage(id[i], 'Пора домой!!! До завтра!')
      }
    }
  }

}, 55000);

setInterval(function () {
  https.get("https://fabrnew.herokuapp.com/");
}, 300000); // every 5 minutes (300000)




app.listen(process.env.PORT || 3030)