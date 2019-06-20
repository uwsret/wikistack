const express = require("express");
const app = express();
const morgan = require("morgan");
const main = require("./views/main");
const {Page, User, db} = require("./models");
const static = express.static(__dirname + "/public");
const wikiRouter = require("./routes/wiki");
const userRouter = require("./routes/user")
app.use(static);


app.use(morgan("dev"));

app.use(express.urlencoded({extended: false}));


db.authenticate().then(() => {
                    console.log('connected to the database');
                })


app.use("/wiki", wikiRouter);

app.use("/user", userRouter);

app.get("/", function(req, res) {
    // console.log("hello world");
    res.send(main(""));
})

















async function init() {
    await Page.sync({force: true});
    await User.sync({force: true});
    const port = 3000;
    app.listen(port, function() {
        console.log("connect");
    })
}

init();