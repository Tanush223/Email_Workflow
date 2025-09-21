const { oauth2Client } = require("../Config/googleClient");
const { saveTokens } = require("../Utils/tokenStore");

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
    const userId = "me"; 
    saveTokens(userId, tokens);
    console.log(`✅ Tokens saved successfully for user key: "${userId}"`);
    res.send("Authentication successful! You can now call the Gmail APIs.");
  } catch (error) {
    console.error("❌ Error during callback:", error.response?.data || error.message);
    res.status(500).send("Auth failed");
  }
};

module.exports = { loginWithGoogle, callback };