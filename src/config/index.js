const { resolve } = require("path");
require("dotenv").config({ path: resolve(__dirname, "../../.env") });

module.exports = {
  mode: process.env.NODE_ENV,
  token: process.env.TOKEN,
  prefix: process.env.PREFIX,
  logsPath: resolve(process.cwd(), "./logs/"),
  adminId: process.env.ADMIN_ID,
  googleApiKey: process.env.GOOGLE_API_KEY,
  googleSearchApiKey: process.env.GOOGLE_SEARCH_API_KEY,
  googleSearchApiCx: process.env.GOOGLE_SEARCH_API_CX,
  googleImageApiKey: process.env.GOOGLE_IMAGE_API_KEY,
  googleImageApiCx: process.env.GOOGLE_IMAGE_API_CX,
  googleYoutubeApiCx: process.env.GOOGLE_YOUTUBE_API_CX,
  dictionaryApiKey: process.env.DICTIONARY_API_KEY,
  dictionaryAppId: process.env.DICTIONARY_APP_ID,
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD
};
