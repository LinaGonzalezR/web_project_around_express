const router = require("express").Router();
const UserData = require("../data/users.json");

router.get("/users", (req, res) => {
  res.json(UserData);
});

router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const card = UserData.find((item) => item._id === id);
  if (card) {
    res.send({
      card,
    });
  } else {
    res.status(404).send({
      message: "NOT FOUND",
    });
  }
});

module.exports = router;
