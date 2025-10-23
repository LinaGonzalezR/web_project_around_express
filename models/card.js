const mongoose = require("mongoose");

const urlRegex =
  /^(https?:\/\/)?(www\.)?([a-zA-Z0-9._~:/?%#@!$&'()*+,;=]+)(#)?$/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: "Este enlace no es válido",
    },
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createId: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
