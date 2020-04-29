const express = require('express');
const router = express.Router();
const controller = require('../controllers');

/* Show User */
router.get('/users/:id', controller.User.showUser);
/* Update User */
router.put('/users/:id', controller.User.updateUser);

module.exports = router;