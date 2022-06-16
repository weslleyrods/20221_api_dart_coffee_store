const mongoose = require("mongoose");

const carrinhoSchema = mongoose.Schema({
  valorTotal: { type: String, required: true },
  qtdTotal: { type: String, required: true },
  frete: { type: String, required: true },
  id_cliente: { type: mongoose.Types.ObjectId, required: true },
  id_produtos: { type: [mongoose.Types.ObjectId], required: false },
});

module.exports = mongoose.model("Carrinho", carrinhoSchema);
