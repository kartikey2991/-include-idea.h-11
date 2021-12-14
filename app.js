const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render("index");
})

app.listen(3000, function() {
    console.log("heloo");
})