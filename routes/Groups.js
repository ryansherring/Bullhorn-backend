const express = require('express');
const router = express.Router();
const controller = require('../controllers')

router.post('/create', controller.Groups.createGroup)

router.get('/all', controller.Groups.getGroups)

router.get('/show/:id', controller.Groups.showGroup)

router.put('/:id', controller.Groups.editGroup)

router.delete('/:id', controller.Groups.destroyGroup)

module.exports = router;