const { GoogleGenerativeAI }= require ( "@google/generative-ai");
const dotenv = require ("dotenv");
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    response_mime_type: "application/json",
  },
});


 async function generateReplySuggestions(emailBody) {
  const prompt = `
  You are an assistant helping generate professional email replies.
  Email:
  "${emailBody}"
  Suggest 3 possible short and polite replies.
  `;

  const result = await model.generateContent(prompt);
  return result.response.text(); 
}

async function extractEventFromEmail(emailBody) {
  const prompt = `
  You are an expert at extracting event details from text.
  Given the following email, extract the event information and return it as a valid JSON object based on the provided schema.

  The current date is September 21, 2025.

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

module.exports = {generateReplySuggestions,extractEventFromEmail}