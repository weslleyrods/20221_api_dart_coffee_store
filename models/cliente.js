const mongoose = require("mongoose");

const clienteSchema = mongoose.Schema({
  nome: { type: String, required: true },
  sobrenome: { type: String, required: true },
  cpf: { type: String, required: true },
  email: { type: String, required: true },
  senha: { type: String, required: true },
  telefone: { type: String, required: false },
  celular: { type: String, required: true },
  endereco: [
    {
      logradouro: { type: String, required: true },
      numero: { type: String, required: true },
      bairro: { type: String, required: true },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      cep: { type: String, required: true },
    },
  ],
  id_carrinho: { type: mongoose.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Cliente", clienteSchema);

//produto {codigo, titulo, descritivo, valor, destaque, qtd, categoria}
// descritivo: texto do produto
//

// export mongoose.model("Cliente", schemaCliente)

/*
const clienteSchema = mongoose.Schema ({
    nome: {type: String, required: true},
    fone: {type: String, required: false, default: '00000000'},
    email: {type: String, required: true}
   });
*/
