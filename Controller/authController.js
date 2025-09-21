const { oauth2Client } = require("../Config/googleClient");
const { saveTokens } = require("../Utils/tokenStore");
const User = require("../Model/User");
const { google } = require("googleapis");

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/calendar.events",
  "email",
  "profile",
];

const loginWithGoogle = (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    });
    res.redirect(url);
  } catch (err) {
    console.error("Error generating Google login URL:", err);
    res.status(500).send("Failed to initiate login");
  }
};

const callback = async (req, res) => {
  const code = req.query.code;

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    const userEmail = data.email;

    if (!userEmail) {
      return res.status(400).send("Could not retrieve user email from Google.");
    }

    await User.findOneAndUpdate(
      { email: userEmail },
      {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      { upsert: true, new: true } 
    );

    console.log(`✅ Tokens saved successfully for user: "${userEmail}"`);
    res.json({ status: "authenticated", email: userEmail });

  } catch (error) {
    console.error("❌ Error during callback:", error.response?.data || error.message);
    res.status(500).send("Auth failed");
  }
};

module.exports = { loginWithGoogle, callback };