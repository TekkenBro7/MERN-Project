const express = require('express');
const router = express.Router();
const { getVacancies, createVacancy } = require('../controllers/vacancy_controller');

router.get('/', getVacancies);

router.post('/', createVacancy);

module.exports = router;