const router = require("express").Router();
const CardData = require("../data/cards.json");

router.get("/cards", (req, res) => {
  res.json(CardData);
});

module.exports = router;
