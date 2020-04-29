const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.post('/create', controller.Games.createGame)

router.get('/all', controller.Games.getGames)

router.get('/show/:id', controller.Games.showGame)

router.put('/:id', controller.Games.editGame)

router.delete('/:id', controller.Games.destroyGame)

module.exports = router;