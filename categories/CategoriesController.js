////importe modules
const express = require("express");
const Category = require("./Category");
const router = express.Router();
const slugify = require("slugify");
const adminauth = require("../middllewares/adminauth");
//routes
router.get("/admin/categories/new",adminauth,(req,res)=>{
    res.render("admin/categories/new")   
 
});

router.post("/categories/save",adminauth,(req,res)=>{
    var title = req.body.title;
    if(title != undefined){
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        })

    }else{
        res.redirect("/admin/categories/new")
    }
});

router.get("/admin/categories",adminauth,(req,res)=>{
    Category.findAll().then(categories =>{
        res.render("admin/categories/index",{categories: categories});
    });

    
});

router.post("/categories/delete",adminauth,(req, res)=>{
    var id = req.body.id;
    if(id != undefined){
        if(!isNaN(id)){
            Category.destroy({
                where: {
                    id: id
                }
            }).then(()=> {
                res.redirect("/admin/categories");
            });
        }else{
            res.redirect("/admin/categories");

        }
    }else{
        res.redirect("/admin/categories");
    }
})

router.get("/admin/categories/edit/:id",adminauth,(req, res)=>{
    var id = req.params.id;
    if(isNaN(id)){
        res.redirect("/admin/categories");
    }

    Category.findByPk(id).then(category =>{
        if(category != undefined){
            res.render("admin/categories/edit",{category: category});
        }else{
            res.redirect("/admin/categories");
        }
    }).catch(erro =>{
        res.redirect("/admin/categories");
    })

});

router.post("/categories/update",adminauth,(req,res)=>{
    var id = req.body.id;
    var title = req.body.title;

    Category.update({title: title, slug: slugify(title)},{
        where: {
            id: id
        }
    }).then(()=>{
        res.redirect("/admin/categories");
    })
});

module.exports = router;