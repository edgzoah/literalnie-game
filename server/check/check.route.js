const express = require('express');
const router = express.Router();

const checkService = require('./service');

router.post('/api/check',async (req, res) => {
	const msg = await checkService.check(req);

	res.json(msg);
});

module.exports = router;
