const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.post('/create', controller.Topics.createTopic)

router.get('/show/:id', controller.Topics.showTopic)

router.delete('/:id', controller.Topics.destroyTopic)

module.exports = router;