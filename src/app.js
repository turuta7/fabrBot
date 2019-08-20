const TelegramBot = require('node-telegram-bot-api');

require('dotenv').config();

const { token } = process.env;

console.log(token);

const bot = new TelegramBot(token, { polling: true });

const express = require('express');

const app = express();
const idTelegran = require('../models/').telegramt;

app.get('/', async (req, res) => {

    // await idTelegran.create({
    //     tel_id: 1,
    //   })



  res.send('server Work')
  next()
})


bot.onText(/\/start/, async (msg) => {
    try {
      //const id = unique.filter((v, i, a) => a.indexOf(v) === i);
      bot.sendMessage(msg.chat.id, `Добрый день, ${msg.chat.first_name}. Добро пожаловать!`, {
      });
  
      console.log(msg.chat.id);
      console.log(typeof (msg.chat.id));
  
  
      await idTelegran.create({
        tel_id: msg.chat.id,
      })
      // unique.push(msg.chat.id)
  
      // console.log(id);
    } catch (error) {
      console.log(error);
  
    }
  
  
  
  })
  

app.listen(process.env.PORT || 4000)