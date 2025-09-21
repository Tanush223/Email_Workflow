const { getTokens } = require("../Utils/tokenStore.js");
const { oauth2Client } = require("../Config/googleClient.js");
const { createEvent } = require("../Services/calendarService.js");

const addEvent = async (req, res) => {
  try {
    oauth2Client.setCredentials(getTokens("me"));

    const { title, date, time, participants } = req.body;

    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const attendees = participants ? participants.map(email => ({ email: email })) : [];

    const eventDetails = {
      summary: title,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: "Asia/Kolkata",
      },
      attendees: attendees,
    };

    const event = await createEvent(oauth2Client, eventDetails);
    res.json(event);
    
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create calendar event");
  }
};

module.exports = { addEvent };