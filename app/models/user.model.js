const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "users",
    {
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      username: {
        // virtual attribute that will not be stored in the database but will be returned in the response
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstname} ${this.lastname}`;
        },
      },
      phonenumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          notNull: false,
          isInt: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
      birthdate:{
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      address:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      freezeTableName: true,
      indexes: [{ fields: ["email"] }],
      validate: {
        // validate over common or related records can be placed right here!
      },
      hooks: {
        beforeUpdate: (record, options) => {
          console.log("runs before record update");
        },
        afterDestroy: async (user, options) => {
         console.log("runs after records deleted");
        },
      },
    }
  );
  return User;
};
