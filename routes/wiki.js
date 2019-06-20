const express = require("express");
const router = express.Router();
const {main, addPage, wikiPage} = require("../views/");
const {Page} = require("../models")



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
    res.send(wikiPage(data));

})

router.post("/", async function(req, res) {

    let obj = req.body;
    const page = new Page({
        title: obj.title,
        content: obj.content,
        status: obj.status,
        // slug: obj.title.replace(/\s/g, "_")
    })
    try {
        await page.save();
        res.redirect(`/wiki/${page.slug}`);
    }
    catch(e) {
        console.log(e);
    }
    // res.send(req.body);
})









module.exports = router;