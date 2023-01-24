const express     =   require("express");
const router = express.Router();
const controller_users = require('../controllers/users');
const { token_validation } = require('../helpers/validator');

router.get('/profile', token_validation, controller_users.profile);

module.exports = router;