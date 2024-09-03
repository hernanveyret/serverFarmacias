const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors()); // Permitir todas las solicitudes CORS, aunque no es estrictamente necesario aquí
app.use(cors());

// Ruta que actuará como proxy para la API externa
app.get('/api/farmacias/:year/:month/:day', async (req, res) => {
  const { year, month, day } = req.params;
  const apiUrl = `https://www.laguiasn.com.ar/api/pharmacies/${year}/${month}/${day}`;

  try {
    const response = await axios.get(apiUrl);
    res.json(response.data);  // Devuelve la respuesta de la API externa al cliente
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error al recibir los datos' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
