const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/save', async (req, res) => {
	const { username, roomId } = req.body;

	if (!username || !roomId) {
		return res
			.status(400)
			.json({ error: 'Username and Room ID are required' });
	}

	try {
		const user = new User({ username, roomId });
		await user.save();
		res.status(201).json({ message: 'User saved successfully' });
	} catch (error) {
		res.status(500).json({ error: 'Failed to save user' });
	}
});

module.exports = router;
