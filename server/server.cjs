// server/server.cjs
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

app.get(`${process.env.VITE_BASE_URL_API}/states/all`, async (req, res) => {
	try {
		// Используем токен для запроса к OpenSky API
		const params = new URLSearchParams(req.query);
		const token = req.headers.authorization?.split(' ')[1] || (await getToken()); // Функция получения токена

		const response = await axios.get(`https://opensky-network.org/api/states/all?${params}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return res.json(response.data);
	} catch (error) {
		console.error('Ошибка при запросе к OpenSky API:', error);
		return res.status(error.response?.status || 500).json({
			error: 'Ошибка при запросе к OpenSky API',
			details: error.message,
		});
	}
});

// Вспомогательная функция для получения токена
async function getToken() {
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

	const { access_token } = response.data;

	return access_token;
}

app.get(`${process.env.VITE_BASE_URL_API}/flight-info/:icao24`, async (req, res) => {
	const icao24 = req.params.icao24;

	try {
		const params = new URLSearchParams({
			withAircraftImage: true,
			withLocation: true,
		});

		const response = await axios.get(`https://aerodatabox.p.rapidapi.com/flights/icao24/${icao24}`, params, {
			headers: {
				'X-RapidAPI-Host': 'aerodatabox.p.rapidapi.com',
				'X-RapidAPI-Key': process.env.VITE_AERODATABOX_API_KEY, // Ваш RapidAPI ключ
			},
		});

		console.debug('Ответ от AeroDataBox API:', response.data);

		return response.data;
	} catch (error) {
		console.error('Ошибка при запросе к AeroDataBox API:', error);
		return res.status(error.response?.status || 500).json({
			error: 'Ошибка при запросе к AeroDataBox API',
			details: error.message,
		});
	}
});

app.listen(PORT, () => {
	console.log(`OpenSky proxy server запущен на http://localhost:${PORT}`);
});
