const express = require("express");
const router = express.Router();
const cors = require("cors");

const Produto = require("../models/produto");
router.use(express.json());
router.use(express.query());
router.use(cors());
// router.set("query parser", "simple");

router.get("/", (req, res) => {
  // pegar todos os produtos da base e retornar o json
  Produto.find()
    .then((Produto) => {
      res.status(200).json({
        success: true,
        data: Produto,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

router.get("/:id", (req, res) => {
  // pegar o produto da base com o id correspondente e retornar o json *busca por id*
  let id = req.params.id;
  Produto.findOne({ _id: id })
    .then((docProduto) => {
      res.status(200).json({
        success: true,
        data: docProduto,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

// localhost:3000/produto?title=produtox
router.get("/busca/:busca", (req, res) => {
  // pegar o produto da base com o id correspondente e retornar o json *palavra chave*
  // req.query.
  console.log(req.params.busca);
  const b = new RegExp(req.params.busca, "i");
  Produto.find({ titulo: b })
    .then((docs) => {
      res.status(201).json({
        success: true,
        data: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});
// Produto.find({ titulo: /req.params.busca/im })
module.exports = router;
