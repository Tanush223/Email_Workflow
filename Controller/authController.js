const { createOAuth2Client } = require("../Config/googleClient");
const jwt = require('jsonwebtoken');
const User = require("../Model/User");
const { google } = require("googleapis");
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const SCOPES = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/calendar.events",
  "email",
  "profile",
];

const loginWithGoogle = (req, res) => {
  try {
    const oauth2Client = createOAuth2Client();
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
  if (!code) {
    return res.status(400).send("Authorization code is missing.");
  }

  try {
    const oauth2Client = createOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
    const { data } = await oauth2.userinfo.get();
    const userEmail = data.email;

    const user = await User.findOneAndUpdate(
      { email: userEmail },
      {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
        expiryDate: tokens.expiry_date,
      },
      { upsert: true, new: true }
    );

    const jwtToken = jwt.sign(
      { email: userEmail, id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    res.redirect(`${frontendUrl}/?token=${jwtToken}&email=${encodeURIComponent(userEmail)}`);

  } catch (error) {
    console.error("❌ Error during callback:", error);
    res.status(500).send("Authentication failed.");
  }
};

module.exports = { loginWithGoogle, callback };