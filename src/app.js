const express = require('express');

const app = express();
const idTelegran = require('../models/').telegramt;

app.get('/', async (req, res) => {

    await idTelegran.create({
        tel_id: 1,
      })

  res.send('server Work')
  next()
})

app.listen(process.env.PORT || 5000)