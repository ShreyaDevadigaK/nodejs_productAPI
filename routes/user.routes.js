const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');
const auth = require('../middleware/auth');
const role = require('../middleware/role');

router.post('/', auth, role('admin'), userCtrl.register);  // only admin can add user
router.post('/login', userCtrl.login);
router.post('/', userCtrl.register); 

router.put('/:id', auth, role('admin'), userCtrl.updateUser);


module.exports = router;
