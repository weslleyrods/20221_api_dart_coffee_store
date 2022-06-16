const mongoose = require("mongoose");

const produtoSchema = mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
  valor: { type: number, required: true },
  qtd: { type: number, required: true },
  atributos: {
    torra: { type: number, required: true },
    corpo: { type: number, required: true },
    amargor: { type: number, required: true },
    acidez: { type: number, required: true },
    aroma: { type: number, required: true },
  },
  categoria: { type: String, required: true },
});

module.exports = mongoose.model("Produto", produtoSchema);
