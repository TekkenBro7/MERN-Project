const express = require('express');
const router = express.Router();
const bodyTypeController = require('../controllers/body_type_controller');

router.get('/', bodyTypeController.getAllBodyTypes);

router.get('/:id', bodyTypeController.getBodyTypeById);

router.post('/', bodyTypeController.createBodyType);

module.exports = router;