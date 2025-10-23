const express = require("express");
const mongoose = require("mongoose");
const routerCards = require("./routes/cards");
const routerUsers = require("./routes/users");

const app = express();
const PORT = 3000;

mongoose.connect("mongodb://localhost:27017/aroundb");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5d8b8592978f8bd833ca8133',
  };
  next();
});

app.use("/users", routerUsers);
app.use("/cards", routerCards);

app.use((req, res) => {
  res.status(404).send({ mensaje: "Página no encontrada" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
