module.exports = {
  HOST: process.env.MYSQL_HOST,
  USER: process.env.MYSQL_USER,
  DB: process.env.MYSQL_DATABASE,
  PASSWORD: process.env.MYSQL_PASSWORD,
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 60000, // 60 seconds
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
