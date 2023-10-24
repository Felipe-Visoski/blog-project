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
    Article.findAll({
        order:[ ['id','DESC']]
    }).then(articles=>{
        res.render("index", {articles: articles});
    })

})

app.get("/:slug",(req,res) => {
    var slug = req.params.slug;
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            res.render("article",{article: article});
        }else{
            res.redirect("/");
        }
    }).catch(err =>{
        res.redirect("/");
    });
})

app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})