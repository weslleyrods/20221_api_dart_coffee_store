require("dotenv").config({ path: ".env" });
const express = require("express");
const app = express();
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");

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

// routes
const routerCliente = require("./routes/routerCliente");
const routerProduto = require("./routes/routerProduto");
/*const routerCarrinho = require("./routes/routerCarrinho"); */

const port = process.env.PORT || 3000;
app.set("port", port);

// endpoint de imagens
/* app.get("/foto/:nomeImg", (req, res) => {
  res.sendFile(__dirname + "/image/" + req.params.nomeImg);
}); */
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    rotas: {
      produto: "/produto/",
      cliente: "/cliente/",
    },
  });
});
app.use("/cliente", routerCliente);
app.use("/produto", routerProduto);
/* app.use("/produto", routerProduto);
app.use("/carrinho", routerCarrinho); */

// aceitar json np corpo(body) da requisicao
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
server.listen(port);
