const express = require("express");
const app = express();
const http = require("http");

//const app = require('backend/app')

/* const server = http.createServer((req, res) => {
  console.log("deu bom!");
});

server.listen(process.env.PORT || 3000); */

const port = process.env.PORT || 3000;
app.set("port", port);

app.get("/oi", (req, res) => {
  console.log("oi mundo");
});

app.get("/teste", (req, res) => {
  console.log("teste deu bom");
});

const server = http.createServer(app);
server.listen(port);
