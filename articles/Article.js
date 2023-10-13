// import modules
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

//criando a tebala articles
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },slug: {
        type: Sequelize.STRING,
        allowNull: false
    },body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

});

Category.hasMany(Article,{});
Article.belongsTo(Category,{});

// uma categoria tem muitos artigo
// um artigo pertence a uma categoria
// relacionando as tabeles categoria e artigos


Article.sync({force: true});

module.exports = "Article";
