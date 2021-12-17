const express = require("express");
var bodyParser = require("body-parser");
// const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project");
const db = mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback) {
    console.log("conncection succeeded");
})

// const Register = require("./models/registers");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", function(req, res) {
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.render("index");
})

app.get("/register", function(req, res) {
    return res.render("register");
})

// app.post("/register", urlencodedParser, function(req, res) {
//     res.json(req.body)
// })

app.post("/register", async(req, res) => {
    try {
        var name = req.body.name;
        var email = req.body.email;
        var pass = req.body.password;
        var phone = req.body.phone;

        var data = {
            "name": name,
            "email": email,
            "password": pass,
            "phone": phone,
        }
        db.collection('details').insertOne(data, function(err, collection) {
            if (err) throw err;
            console.log("Record inserted successfully");
        });

    } catch (error) {
        res.status(400).send(error);
    }
})

app.listen(3000, function() {
    console.log("server started");
})