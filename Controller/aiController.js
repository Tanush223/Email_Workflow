const { generateReplySuggestions, extractEventFromEmail } = require("../Services/aiService");


 const getReplySuggestions = async (req, res) => {
  try {
    const { emailBody } = req.body;
    const suggestions = await generateReplySuggestions(emailBody);
    res.json({ suggestions });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating reply suggestions");
  }
};

const getEventFromEmail = async (req, res) => {
  try {
    const { emailBody } = req.body;
    const rawJsonString = await extractEventFromEmail(emailBody);

    const event = JSON.parse(rawJsonString);

    res.json({ event });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error extracting event");
  }
};
module.exports = { getReplySuggestions, getEventFromEmail };