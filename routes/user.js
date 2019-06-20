const express = require("express");
const router = express.Router();
const {Page, User} = require("../models")
const {userList, userPages} = require("../views")

router.get("/", async function(req, res) {
    const data = await User.findAll()
    res.send(userList(data));
})

router.get("/:id", async function(req, res) {
    const data = await User.findOne({where: {
        id: req.params.id,
    }});
    const pages = await Page.findAll({where: {
        authorId: req.params.id
    }})
    res.send(userPages(data, pages));
})

router.post("/", function(req, res) {
    res.send("<h1>hello</h1>")
})

router.put("/:id", function(req, res) {
    res.send(addPage());
})

router.delete("/:id", function(req, res) {
    res.send("<h1>hello</h1>")
})

module.exports = router;