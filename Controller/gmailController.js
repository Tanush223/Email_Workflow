const User = require("../Model/User");
const { createOAuth2Client } = require("../Config/googleClient.js");
const { listEmails, sendEmail } = require("../Services/gmailService.js");

const getEmails = async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) {
      return res.status(401).json({ error: "No tokens found. Please login via /auth/google first." });
    }
    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });
    const messages = await listEmails(oauth2Client);
    res.json(messages);
  }
  catch (err) {
    console.error("❌ Error fetching emails:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch emails");
  }
};

const sendMail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const user = await User.findOne();
    if (!user) {
      return res.status(401).json({ error: "No tokens found. Please login via /auth/google first." });
    }

    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    await sendEmail(oauth2Client, to, subject, body);
    res.send("📧 Email sent successfully!");
  } catch (err) {
    console.error("❌ Gmail send error:", err.response?.data || err.message);
    res.status(500).send("Failed to send email");
  }
};


module.exports = { getEmails, sendMail }