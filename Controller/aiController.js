const { generateReplySuggestions, extractEventFromEmail } = require("../Services/aiService");


const getReplySuggestions = async (req, res) => {
  try {
    const { emailBody } = req.body;

    if (!emailBody) {
      return res.status(400).json({ error: "Email body is required" });
    }

    const suggestions = await generateReplySuggestions(emailBody);
    res.json({ suggestions });
  } catch (err) {
    console.error("❌ Error generating reply suggestions:", err.message);
    res.status(500).json({ error: "Error generating reply suggestions" });
  }
};


const getEventFromEmail = async (req, res) => {
  try {
    const { emailBody } = req.body;

    if (!emailBody) {
      return res.status(400).json({ error: "Email body is required" });
    }

    const rawJsonString = await extractEventFromEmail(emailBody);

    let event;
    try {
      event = JSON.parse(rawJsonString);
    } catch (parseError) {
      console.error("❌ Failed to parse event JSON:", parseError.message);
      return res.status(500).json({ error: "Failed to parse event details" });
    }

    res.json({ event });
  } catch (err) {
    console.error("❌ Error extracting event:", err.message);
    res.status(500).json({ error: "Error extracting event" });
  }
};

module.exports = { getReplySuggestions, getEventFromEmail };
