const { extractEventFromEmail } = require('./Services/aiService');
const dotenv = require('dotenv');
dotenv.config();

async function testExtractEvent() {
    console.log("Testing extractEventFromEmail...");
    const emailBody = "Let's meet tomorrow at 10 AM for coffee.";
    try {
        const result = await extractEventFromEmail(emailBody);
        console.log("Result:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}

testExtractEvent();
