"${emailBody}"
  Suggest 3 possible short and polite replies.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function extractEventFromEmail(emailBody) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const prompt = `
  You are an expert at extracting event details from text.
  Given the following email, extract the event information and return it as a valid JSON object based on the provided schema.

  The current date is ${ currentDate }.

  JSON Schema:
{
  "title": "string",
    "date": "string (YYYY-MM-DD)",
      "time": "string (HH:MM 24-hour format)",
        "participants": ["string"]
}

  If a value is not found, use null for strings and an empty array for the participants array.

  Email: "${emailBody}"
    `;

  const result = await model.generateContent(prompt);

  return result.response.text();
}

module.exports = { generateReplySuggestions, extractEventFromEmail };