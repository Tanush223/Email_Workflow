const { getTokens } = require ("../Utils/tokenStore.js");
const { oauth2Client } = require ( "../Config/googleClient.js");
const { listEmails, sendEmail } = require ("../Services/gmailService.js");

const getEmails = async (req, res) => {
  try {
    const userTokens = getTokens("me");

    if (!userTokens) {
    console.log(userTokens)
      return res.status(401).json({ error: "No tokens found. Please login via /auth/google first." });
    }

    oauth2Client.setCredentials(userTokens);

    const messages = await listEmails(oauth2Client);
    res.json(messages);
  } catch (err) {
    console.log(userTokens)
    console.error("❌ Error fetching emails:", err.response?.data || err.message);
    res.status(500).send("Failed to fetch emails");
  }
};

const sendMail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const tokens = getTokens("me");

    if (!tokens) {
      return res.status(401).json({ error: "No tokens found. Please login first." });
    }

    oauth2Client.setCredentials(tokens);
    await sendEmail(oauth2Client, to, subject, body);

    res.send("📧 Email sent successfully!");
  } catch (err) {
    console.error("❌ Gmail send error:", err.response?.data || err.message);
    res.status(500).send("Failed to send email");
  }
};


module.exports = {getEmails,sendMail}