// import modules
const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../categories/Category");

//criando a tebala articles
const Article = connection.define('articles',{
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: Sequelize.TEXT,
        allowNull: false
    }

})

Category.HasMany(Article);
Article.BelongsTo(Category);


Article.sync({force: true});

module.exports = Article;
