require('dotenv').config();

module.exports = {
  development: {
    username: 'testuser',
    password: 'qwerty',
    database: 'fabr',
    host: '127.0.0.1',
    dialect: 'postgres',
    operatorsAliases: false,
  },

  production: {
    username: process.env.username,
    password: process.env.password,
    database: process.env.database,
    host: process.env.host,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
      ssl: true,
      native: true,
    },
  },
};
