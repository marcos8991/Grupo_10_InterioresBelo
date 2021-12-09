require('dotenv').config();


//los process.env.DB vienen del archivo .env
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME || "root",
    "password": process.env.DB_PASSWORD || "root",
    "database": "interioresbelo_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
