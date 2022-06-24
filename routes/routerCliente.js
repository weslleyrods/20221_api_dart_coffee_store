const express = require("express");
const router = express.Router();
const cors = require("cors");

// model
const Cliente = require("../models/cliente");
const Carrinho = require("../models/carrinho");
const cliente = require("../models/cliente");

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

//1º criar rota post para login
router.post("/login", (req, res) => {
  //2º pegar o objeto json do body que possui email e senha
  console.log(req.body);
  email = req.body.email;
  senha = req.body.senha;

  //3º busca no mongo, com o model Cliente, o cliente com o email que foi informado
  Cliente.findOne({ email: email })
    .then((doc) => {
      //4º se o documento existir , comparar a senha passada no body com a senha contida no documento do cliente;
      if (senha === doc.senha) {
        //5º caso a senha bata, retornar sucesso true e  id do usuario dentro do json data
        res.json({
          success: true,
          data: {
            id: doc._id,
            nome: doc.nome,
            carrinho: doc.id_carrinho,
          },
        });
      } else {
        //6º caso a senha não bata, retornar false e falar que email ou senha estão incorretos
        res.json({
          success: false,
          message: "Dados inválidos, confira e-mail e senha.",
        });
      }
    })
    .catch((err) => {
      //7º se o documento do cliente não existir, informar o mesmo do passo 6º
      res.json({
        success: false,
        message: "Dados inválidos, confira e-mail e senha." + err,
      });
    });
});

//Weslley
router.post("/cadastro", (req, res) => {
  // cadastrar um usuario
  console.log(req.body);
  Cliente.findOne({ $or: [{ email: req.body.email }, { cpf: req.body.cpf }] })
    .then((doc) => {
      console.log(doc);
      if (doc === null) {
        new Carrinho({
          valorTotal: "0,00",
          qtdTotal: "0,00",
          frete: "0,00",
          id_podutos: [],
        })
          .save()
          .then((carrinhoCriado) => {
            console.log(carrinhoCriado);
            const cliente = new Cliente({
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
              id_carrinho: carrinhoCriado._id,
            });
            cliente.save().then((clienteInserido) => {
              res.status(201).json({
                success: true,
                data: clienteInserido._id,
              });
            });
          });
      } else {
        res.status(500).json({
          success: false,
          message: "O usuário já pussui cadastro",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
});

// Marcelo
//atualizar um usuario
router.put("/atualizar/:id", (req, res) => {
  const filtro = { _id: req.params.id };

  Cliente.updateMany(filtro, {
    $set: {
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
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err,
      });
    });
});

module.exports = router;
