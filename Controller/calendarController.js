const User = require("../Model/User");
const { createOAuth2Client } = require("../Config/googleClient.js");
const { google } = require("googleapis");

const addEvent = async (req, res) => {
  try {
    const { title, date, time, participants, location } = req.body;

    const user = await User.findOne();
    if (!user || !user.refreshToken) {
      return res.status(401).json({ error: "No user with valid tokens found. Please re-authenticate." });
    }

    const oauth2Client = createOAuth2Client();
    oauth2Client.setCredentials({
      access_token: user.accessToken,
      refresh_token: user.refreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);
    const attendees = participants ? participants.map(email => ({ email })) : [];

    const event = {
      summary: title,
      location,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: attendees,
    };
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    res.json({ status: "Event created", eventId: response.data.id });
  } catch (err) {
    console.error("❌ Calendar addEvent error:", err.response?.data?.error || err.message);
    res.status(500).send("Failed to create event");
  }
};

module.exports = { addEvent };