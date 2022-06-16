require("dotenv").config({ path: ".env" });

//const Cliente = requiere('./models/cliente.js')
const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");

const {
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_CLUSTER,
  MONGODB_DATABASE,
  MONGODB_HOST,
} = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}.${MONGODB_HOST}.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => console.log("Conexão ok"))
  .catch((error) => {
    console.log(typeof error);
    console.error("Erro: " + error.message);
  });

const port = process.env.PORT || 3000;
app.set("port", port);

// models
const Cliente = require("./models/cliente");
const Carrinho = require("./models/carrinho");

const clienteTeste = new Cliente({
  nome: "teste",
  sobrenome: "Silva",
  cpf: "45678945620",
  email: "teste@silva.com",
  senha: "1231313",
  telefone: "114578457845",
  celular: "11978457845",
  endereco: {
    logradouro: "rua a",
    numero: "123",
    bairro: "vila praia",
    cidade: "Sao paulo",
    estado: "Sao paulo",
    cep: "03895562",
  },
});

/* clienteTeste
  .save()
  .then(() => {
    console.log("deu bom");
  })
  .catch((err) => {
    console.log(`deu ruim ${err}`);
  }); */

// app.get("/teste/imagem/:img", (req, res) => {
//   res.sendFile(__dirname + "/image/" + req.params.img);
// });

/* //Weslley
// o mongoose opera sobre promisses
const id = Cliente.findOne(() => {
  //pipe? acho que não tem pipe aqui
  id: Cliente._id;
}); */

Cliente.findOne()
  .then((doc) => {
    console.log(doc);
    console.log(`${doc._id}`);
  })
  .catch((err) => {
    console.log(`deu erro ${err}`);
  });

// const carrinhoTeste = new Carrinho({
//   valorTotal: "25,00",
//   qtdTotal: "5",
//   frete: "15,00",
//   id_cliente: id,
//   id_produto: "teste",
// });

/* carrinhoTeste
  .save()
  .then(() => {
    console.log("deu bom no carrinho");
  })
  .catch((err) => {
    console.log(`deu ruim no carrinho${err}`);
  }); */

/* const carrinhoTeste = new carrinho({
  valorTotal: "25,00",
  qtdTotal: "5",
  frete: "15,00",
  id_cliente: clienteTeste
  id_produto

  
}) */

/*
  valorTotal: { type: String, required: true },
  qtdTotal: { type: String, required: true },
  frete: { type: String, required: true },
  id_cliente: { type: ObjectId, required: true },
  id_produtos: { type: [ObjectId], required: false },
});
*/

const server = http.createServer(app);
server.listen(port);
