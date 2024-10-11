const express = require('express');
const router = express.Router();
const { handleRedirection } = require('../controller/redirect-controller')

router.get('/:shortId', handleRedirection);

module.exports = router;