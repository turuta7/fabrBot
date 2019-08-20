'use strict';
module.exports = (sequelize, DataTypes) => {
  const telegramt = sequelize.define('telegramt', {
    tel_id: DataTypes.INTEGER
  }, {});
  telegramt.associate = function(models) {
    // associations can be defined here
  };
  return telegramt;
};