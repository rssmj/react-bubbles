const express = require('express');
const bodyParser = require('body-parser');
const CORS = require('cors');

const app = express();
const token =
	'ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98';

app.use(bodyParser.json());
app.use(CORS());

let colors = [
	{
		color: 'palette 1',
		code: {
			hex: '#9fffa5',
		},
		id: 1,
	},
	{
		color: 'palette 1',
		code: {
			hex: '#9fffb9',
		},
		id: 2,
	},
	{
		color: 'palette 1',
		code: {
			hex: '#9fffc7',
		},
		id: 3,
	},
	{
		color: 'palette 1',
		code: {
			hex: '#9fffd6',
		},
		id: 4,
	},
	{
		color: 'palette 1',
		code: {
			hex: '#9fffe0',
		},
		id: 5,
	},
	{
		color: 'palette 2',
		code: {
			hex: '#ffc19f',
		},
		id: 6,
	},
	{
		color: 'palette 2',
		code: {
			hex: '#ffcb9f',
		},
		id: 7,
	},
	{
		color: 'palette 2',
		code: {
			hex: '#ffd99f',
		},
		id: 8,
	},
	{
		color: 'palette 2',
		code: {
			hex: '#ffe39f',
		},
		id: 9,
	},
	{
		color: 'palette 2',
		code: {
			hex: '#fff19f',
		},
		id: 10,
	},
	{
		color: 'palette 3',
		code: {
			hex: '#9ffff3',
		},
		id: 11,
	},
	{
		color: 'palette 3',
		code: {
			hex: '#9feeff',
		},
		id: 12,
	},
	{
		color: 'palette 3',
		code: {
			hex: '#9fdbff',
		},
		id: 13,
	},
	{
		color: 'palette 3',
		code: {
			hex: '#9fc7ff',
		},
		id: 14,
	},
	{
		color: 'palette 3',
		code: {
			hex: '#9fb9ff',
		},
		id: 15,
	},
];

let nextId = 16;

function authenticator(req, res, next) {
	const { authorization } = req.headers;
	if (authorization === token) {
		next();
	} else {
		res.status(403).json({ error: 'User must be logged in to do that.' });
	}
}

app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	if (username === 'human' && password === 'pswrd!') {
		req.loggedIn = true;
		setTimeout(() => {
			res.status(200).json({
				payload: token,
			});
		}, 1000);
	} else {
		res
			.status(403)
			.json({ error: 'Username or Password incorrect. Please see Readme' });
	}
});

app.get('/api/colors', authenticator, (req, res) => {
	res.send(colors);
});

app.post('/api/colors', authenticator, (req, res) => {
	if (req.body.color !== undefined && req.body.code !== undefined) {
		const newcolor = req.body;
		newcolor.id = nextId;
		colors.push(newcolor);
	}
	nextId = nextId + 1;
	res.status(201).json(colors);
});

app.put('/api/colors/:id', authenticator, (req, res) => {
	if (!req.params.id)
		res.status(400).send('Your request is missing the color id');
	if (req.body.id === undefined || !req.body.color || !req.body.code) {
		res
			.status(422)
			.send('Make sure your request body has all the fields it needs');
	}
	colors = colors.map(color => {
		if (`${color.id}` === req.params.id) {
			return req.body;
		}
		return color;
	});
	res.status(200).send(req.body);
});

app.delete('/api/colors/:id', authenticator, (req, res) => {
	if (!req.params.id)
		res.status(400).send('Your request is missing the color id');
	colors = colors.filter(color => `${color.id}` !== req.params.id);
	res.status(202).send(req.params.id);
});

app.get('/', function(req, res) {
	res.send('App is working 👍');
});

app.listen(5000, () => {
	console.log('Server listening on port 8888');
});
