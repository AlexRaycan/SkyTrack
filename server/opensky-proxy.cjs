// server/opensky-proxy.cjs
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { URLSearchParams } = require('url');
require('dotenv').config(); // для .env

const app = express();
const PORT = 3001;
const clientId = process.env.VITE_OPENSKY_CLIENT_ID;
const clientSecret = process.env.VITE_OPENSKY_CLIENT_SECRET;

app.use(cors());

app.get('/api/opensky-token', async (req, res) => {
	try {
		if (!clientId || !clientSecret) {
			throw new Error('Не заданы CLIENT_ID или CLIENT_SECRET');
		}

		const params = new URLSearchParams({
			grant_type: 'client_credentials',
			client_id: clientId,
			client_secret: clientSecret,
		});

		const response = await axios.post(
			'https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token',
			params,
			{ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
		);

		return res.json({ access_token: response.data.access_token });
	} catch (error) {
		return res.status(500).json({
			error: 'Ошибка при запросе к OpenSky',
			details: error.message,
		});
	}
});

app.get('/api/states/all', async (req, res) => {
	try {
		const params = new URLSearchParams(req.query);
	}
});

app.listen(PORT, () => {
	console.log(`OpenSky proxy server запущен на http://localhost:${PORT}`);
});
