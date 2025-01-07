const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Route pour uploader une image vers Imgur
app.get("/imgur", async (req, res) => {
  const imageURL = req.query.link;
  if (!imageURL) return res.status(400).json({ error: "No image URL provided" });

  try {
    const response = await axios.post(
      "https://api.imgur.com/3/image",
      { image: imageURL },
      {
        headers: {
          Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        },
      }
    );

    res.json({
      success: true,
      uploaded: response.data.data,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to upload image to Imgur" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
