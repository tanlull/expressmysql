const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.index);

router.get('/:id', userController.show);

router.post('/', userController.insert); //post

router.put('/:id', userController.update); //put

router.delete('/:id', userController.destroy); //delete

module.exports = router;
