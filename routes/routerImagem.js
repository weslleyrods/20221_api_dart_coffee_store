const path = require("path");
const express = require("express");
const router = express.Router();
const cors = require("cors");

router.use(cors());

// endpoint de imagens
/* app.get("/foto/:nomeImg", (req, res) => {
  res.sendFile(__dirname + "/image/" + req.params.nomeImg);
}); */

router.get("/:nomeImg", (req, res) => {
  res.sendFile(path.join(__dirname, "../image/", req.params.nomeImg));
});

module.exports = router;
