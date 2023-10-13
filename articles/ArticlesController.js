//importe modules
const express = require("express");
const router = express.Router();


// routes
router.get("/articles",(req,res)=>{
    res.send("Rota de artigo!")
});

router.get("/admin/articles/new",(req,res)=>{
    res.send("Rota para criar um nova artigo")
 
});

module.exports = router;