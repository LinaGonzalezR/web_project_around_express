const Card = require("../models/card");
const {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
} = require("../utils/errors");

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      res
        .status(ERROR_SERVER)
        .send({ message: "Error del servidor al obtener la tarjeta", err });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_BAD_REQUEST)
          .send({
            message: "Datos inválidos al crear la tarjeta",
            error: err.message,
          });
      }
      return res.status(ERROR_SERVER).send({
        message: "Error en el servidor al crear la tarjeta",
        error: err.message,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  return Card.findByIdAndDelete(cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = ERROR_NOT_FOUND;
      throw error;
    })
    .then((card) => res.send({ message: "Tarjeta eliminada", card }))
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_BAD_REQUEST).send({ message: "ID inválido" });
      }
      if (err.statusCode === ERROR_NOT_FOUND) {
        return res.status(ERROR_NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(ERROR_SERVER)
        .send({ message: "Error al eliminar la tarjeta" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: "Tarjeta no encontrada" });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_BAD_REQUEST).send({ message: "ID inválido" });
      }
      return res
        .status(ERROR_SERVER)
        .send({ message: "Error al dar like a la tarjeta" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send({ message: "Tarjeta no encontrada" });
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(ERROR_BAD_REQUEST).send({ message: "ID inválido" });
      }
      return res
        .status(ERROR_SERVER)
        .send({ message: "Error al quitar like a la tarjeta" });
    });
};
