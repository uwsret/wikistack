const express = require("express");
const router = express.Router();
const {main, addPage, wikiPage} = require("../views/");
const {User,Page} = require("../models")



router.get("/", async function(req, res) {
    const pages = await Page.findAll();
    res.send(main(pages));

})
router.get("/add", function(req, res) {
    res.send(addPage());
})

router.get("/:slug", async function(req, res) {
    const slug = req.params.slug;

    const data = await Page.findOne({where: {slug}});
    const author = await data.getAuthor();
    res.send(wikiPage(data,author));

})

router.post("/", async function(req, res) {

    let obj = req.body;
    try {
    let author = await User.findOrCreate({
        where:{
            name: obj["author-name"],
            email: obj.email
        }
    })
    const page = new Page({
        title: obj.title,
        content: obj.content,
        status: obj.status,
        // slug: obj.title.replace(/\s/g, "_")
    })
        await page.save();
        page.setAuthor(author[0])
        res.redirect(`/wiki/${page.slug}`);
    }
    catch(e) {
        console.log(e.message);
        res.redirect('/wiki/add');
    }
    // res.send(req.body);
})









module.exports = router;