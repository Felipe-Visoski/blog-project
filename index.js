//Imports
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const connection = require("./database/database");
const CategoriesController = require("./categories/CategoriesController");
const ArticlesControoller = require("./articles/ArticlesController");
const Article = require("./articles/Article");
const Category = require("./categories/Category");
//view engine
app.set('view engine','ejs');
//static
app.use(express.static('public'));
//body-parser
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());
//Database
connection
    .authenticate()
    .then(()=>{
        console.log("Conexão feita com sucesso!");
    }).catch((error)=>{
        console.log(error);

    })
//routes
app.use("/",CategoriesController);
app.use("/",ArticlesControoller);

app.get("/", (req,res)=> {
    res.render("index");

})


app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})