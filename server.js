const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', async (req, res) => {
  try {
    const requestData = req.body;

    console.log('Received POST request with data:', requestData);

    const apiResponse = await axios.post('https://api.mtlmrtb.com/bids/v1/get-bids', requestData);
    console.log('API Response', apiResponse);

    // Set CORS headers for this specific route
    res.header('Access-Control-Allow-Origin', 'https://listings-nine.vercel.app');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    // Allow private network access
    res.header('Access-Control-Allow-Private-Network', 'true');

    const responseData = {
      apiData: apiResponse.data,
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
