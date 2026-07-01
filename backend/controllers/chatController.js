const {
    generateResponse,
} = require("../services/geminiService");

const chatWithAI = async (req, res) => {
    try {
        const { message } = req.body;

        const reply = await generateResponse(message);

        return res.json({
            reply,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "AI Error",
        });

    }
};

module.exports = {
    chatWithAI,
};
