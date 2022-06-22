const express = require("express");
const router = express.Router();
const cors = require("cors");

// model
const Cliente = require("../models/cliente");

// aceitar json np corpo(body) da requisicao
router.use(express.json());
router.use(cors());
//Luan
router.get("/:id", (req, res) => {
  // pegar informacoes de um usuario
  let id = req.params.id;
  Cliente.findOne({ _id: id })
    .then((docCliente) => {
      res.status(200).json({
        success: true,
        data: docCliente,
      });
    })
    .catch((err) => {
      res.status(500).json({
        sucess: false,
        message: err,
      });
    });
});

//Weslley
router.post("/cadastro", (req, res) => {
  // cadastrar um usuario
  console.log(req.body);
  const cliente = new Cliente({
    //...req.body
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    cpf: req.body.cpf,
    email: req.body.email,
    senha: req.body.senha,
    telefone: req.body.telefone,
    celular: req.body.celular,
    endereco: [
      {
        logradouro: req.body.logradouro,
        numero: req.body.numero,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        estado: req.body.estado,
        cep: req.body.cep,
      },
    ],
  });
  Cliente.findOne({ cpf: cliente.cpf }).then((doc) => {
    if (doc === null) {
      // retorna null se não existir cliente com o cpf
      cliente.save().then((clienteInserido) => {
        res.status(201).json({
          success: true,
          data: clienteInserido._id,
        });
      });
    } else {
      res.status(500).json({
        success: false,
        message: "O usuário já foi criado",
      });
    }
  });
});

// Marcelo
//atualizar um usuario
router.put("/atualizar/:id", (req, res) => {
  const filtro = { _id: req.params.id };

  Cliente.updateMany(filtro, {
    $set: {
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "",
      senha: "",
      telefone: "",
      celular: "",
      endereco: [
        {
          logradouro: "",
          numero: "",
          bairro: "",
          cidade: "",
          estado: "",
          cep: "",
        },
      ],
    },
  })
    .then(() => {
      res.status(201).json({
        success: true,
        message: "Dados do cliente atualizados com sucesso!",
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message:
          "Problema na atualização dos dados do cliente, tentar novamente: " +
          err,
      });
    });
});

//Rana
//deletar um usuario
router.delete("/remover/:id", (req, res) => {
  Cliente.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json({
        success: true,
        message: req.params.id,
      }); //;
      //res.redirect("/router/usuario"); //confirmar se é esse caminho mesmo  //redireciona para a URL derivada do caminho especificado
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      }); //;
      //res.redirect("/router/usuario"); //confirmar se é esse caminho mesmo //redireciona para a URL derivada do caminho especificado
    });

  /*
  // delete do Bossini
      Cliente.deleteOne({_id: req.params.id})
      .then((resultado) => {
          console.log(resultado)
          res.status(200).end()    
 */
});

module.exports = router;
