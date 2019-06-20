const express = require("express");
const router = express.Router();

router.get("/", function(req, res) {
    res.send("<h1>hello</h1>")
})

router.get("/:id", function(req, res) {
    res.send("<h1>hello</h1>")
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