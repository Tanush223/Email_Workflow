const { google } = require("googleapis");
const dotenv = require('dotenv');

dotenv.config();

const createOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );
};

module.exports = { createOAuth2Client };