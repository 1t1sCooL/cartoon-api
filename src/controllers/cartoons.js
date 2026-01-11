const Cartoon = require('../models/Cartoon');

// Получить все мультфильмы с пагинацией
const getCartoons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Номер страницы (по умолчанию 1)
    const limit = parseInt(req.query.limit) || 12; // Количество мультфильмов на странице (по умолчанию 12)
    const skip = (page - 1) * limit; // Пропуск документов

    // Получаем мультфильмы с пагинацией
    const cartoons = await Cartoon.find()
      .skip(skip)
      .limit(limit);

    // Получаем общее количество мультфильмов
    const total = await Cartoon.countDocuments();

    // Отправляем ответ с данными и информацией о пагинации
    res.json({
      cartoons,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Поиск мультфильмов
const searchCartoons = async (req, res) => {
  try {
    const { name, ratingKP, age, page = 1, limit = 12 } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: 'i' }; // Поиск по частичному совпадению (регистронезависимо)
    }

    if (ratingKP) {
      filter.ratingKP = { $gte: parseFloat(ratingKP) }; // Ищем мультфильмы с рейтингом >= указанного
    }

    if (age) {
      filter.age = age;
    }

    const skip = (page - 1) * limit; // Пропуск документов

    const cartoons = await Cartoon.find(filter)
      .skip(skip)
      .limit(limit);

    const total = await Cartoon.countDocuments(filter);

    res.json({
      cartoons,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCartoons,
  searchCartoons,
};