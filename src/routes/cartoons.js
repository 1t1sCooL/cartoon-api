const express = require("express");
const { getCartoons, searchCartoons } = require("../controllers/cartoons");

const router = express.Router();

router.get("/", getCartoons);

router.get("/search", searchCartoons);

module.exports = router;
