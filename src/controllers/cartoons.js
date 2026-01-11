const Cartoon = require("../models/Cartoon");

const getCartoons = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const cartoons = await Cartoon.find().skip(skip).limit(limit);

    const total = await Cartoon.countDocuments();

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

const searchCartoons = async (req, res) => {
  try {
    const { name, ratingKP, age, page = 1, limit = 12 } = req.query;

    const filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };
    }

    if (ratingKP) {
      filter.ratingKP = { $gte: parseFloat(ratingKP) };
    }

    if (age) {
      filter.age = age;
    }

    const skip = (page - 1) * limit;

    const cartoons = await Cartoon.find(filter).skip(skip).limit(limit);

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
