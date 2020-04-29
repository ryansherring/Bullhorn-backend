const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.post('/create', controller.Speakers.createSpeaker)

router.get('/all', controller.Speakers.getSpeakers)

router.put('/:id', controller.Speakers.editSpeaker)

router.delete('/:id', controller.Speakers.destroySpeaker)

module.exports = router;