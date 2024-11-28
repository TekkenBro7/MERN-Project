const Vacancy = require('../models/vacancy.js');

const getVacancies = async(req, res) => {
    try {
        const vacancies = await Vacancy.find({});
        res.status(200).json(vacancies);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении списка вакансий' });
    }
};

const createVacancy = async(req, res) => {
    try {
        const { title, description, requirements, payment } = req.body;
        const newVacancy = new Vacancy({
            title,
            description,
            requirements,
            payment,
        });
        await newVacancy.save();
        res.status(201).json(newVacancy);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при создании вакансии' });
    }
};

module.exports = { getVacancies, createVacancy };