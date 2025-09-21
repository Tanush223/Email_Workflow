const { google } = require("googleapis");

async function listEmails(auth) {
  const gmail = google.gmail({ version: "v1", auth });
  const res = await gmail.users.messages.list({ userId: "me", maxResults: 5 });
  const messages = await Promise.all(
    (res.data.messages || []).map(async (msg) => {
      const fullMsg = await gmail.users.messages.get({ userId: "me", id: msg.id });
      return {
        id: msg.id,
        snippet: fullMsg.data.snippet,
        payload: fullMsg.data.payload.headers,
      };
    })
  );

  return messages;
}


 async function sendEmail(auth, to, subject, body) {
  const gmail = google.gmail({ version: "v1", auth });
  const message = [
    `To: ${to}`,
    `Subject: ${subject}`,
    "",
    body,
  ].join("\n");

  const encodedMessage = Buffer.from(message).toString("base64");

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw: encodedMessage },
  });
}

module.exports = {listEmails,sendEmail}
