////importe modules
const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");
//routes
router.get("/admin/categories/new",(req,res)=>{
    res.render("admin/categories/new")   
 
});

router.post("/categories/save",(req,res)=>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        })

    }else{
        res.redirect("/admin/categories/new")
    }
});

module.exports = router;