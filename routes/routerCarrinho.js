const express = require("express");
const router = express.Router();
const cors = require("cors");

const Carrinho = require("../models/carrinho");

router.use(cors());
router.use(express.json());
/* 
{ body
    id_carrinho: sadsajehgqjehfqwgej
    id_produto: dsaasddsadsadasddsad
}
*/

router.put("/add", (req, res) => {
  let idCarrinho = req.body.id_carrinho;
  let idProduto = req.body.id_produto;
  Carrinho.findOne({ _id: idCarrinho })
    .then((docCarrinho) => {
      docCarrinho.id_produtos.push(idProduto);
      Carrinho.updateOne({ _id: docCarrinho._id }, docCarrinho).then(() => {
        res.status(200).json({
          success: true,
          data: docCarrinho,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

router.put("/remove", (req, res) => {
  let idCarrinho = req.body.id_carrinho;
  let idProduto = req.body.id_produto;
  /// profiles.insertOne( { _id: 1, votes: [ 3, 5, 6, 7, 7, 8 ] } )

  // { $pull: { <field1>: <value|condition>}

  //profiles.updateOne( { _id: 1 }, { $pull: { votes: { $gte: 6 } } } )
  Carrinho.updateOne(
    { _id: idCarrinho },
    {
      $pull: {
        id_produtos: idProduto,
      },
    }
  )
    .then((carrinhoAtt) => {
      res.status(200).json({
        success: true,
        data: carrinhoAtt,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

module.exports = router;
