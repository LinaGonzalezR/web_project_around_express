const express = require("express");
const routerCards = require("./routes/cards");
const routerUsers = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({ message: "Servidor funcionando" });
});

app.use(routerCards);
app.use(routerUsers);

app.get("/", (req, res) => {
  res.status(404).send({ mensaje: "<h1>Página no encontrada</h1>" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
