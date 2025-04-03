require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY; // La API Key desde .env

app.use(cors());

// Ruta para obtener el clima de una ciudad
app.get("/clima/:ciudad", async (req, res) => {
  try {
    const { ciudad } = req.params;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}&units=metric&lang=es`; 
    const respuesta = await axios.get(url);
    res.json(respuesta.data);
  } catch (error) {
    res.status(500).json({ error: "No se pudo obtener el clima" });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
