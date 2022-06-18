const mongoose = require("mongoose");

const produtoSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  valor: { type: String, required: true },
  qtd: { type: String, required: true },
  atributos: {
    torra: { type: String, required: false },
    corpo: { type: String, required: false },
    amargor: { type: String, required: false },
    acidez: { type: String, required: false },
    aroma: { type: String, required: false },
  },
  categoria: { type: String, required: true },
});

module.exports = mongoose.model("Produto", produtoSchema);
