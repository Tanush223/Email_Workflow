const { google } = require("googleapis");

async function createEvent(auth, eventDetails) {
  const calendar = google.calendar({ version: "v3", auth });

  const response = await calendar.events.insert({
    auth: auth,
    calendarId: "primary",
    resource: eventDetails,
  });

  return response.data;
}

module.exports = { createEvent };