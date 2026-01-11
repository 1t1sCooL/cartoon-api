const express = require('express');
const { getCartoons, searchCartoons } = require('../controllers/cartoons'); // Исправлено на cartoons

const router = express.Router();

// Получить все мультфильмы
router.get('/', getCartoons);

// Поиск мультфильмов
router.get('/search', searchCartoons);

module.exports = router;