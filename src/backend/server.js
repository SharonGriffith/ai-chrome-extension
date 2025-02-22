const express = require("express");
const axios = require("axios");
const app = express();
const port = 5000;

app.use(express.json());

app.post("/chat", async (req, res) => {
  const message = req.body.message;
  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    },
    {
      headers: {
        Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        "Content-Type": "application/json",
      },
    }
  );

  res.json({ reply: response.data.choices[0].message.content });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
