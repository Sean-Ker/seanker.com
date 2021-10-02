const express = require("express");
const fs = require("fs");
const serverless = require("serverless");

const app = express();
const router = express.router();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/.netlify/functions/api", router);

const resume_filepath = "./public/assets/Sean Kernitsman Resume.pdf";

router.get("/home", (req, res) => {
    res.redirect("/");
});

router.get("/", (req, res) => {
    console.log("hello", __dirname);
    res.render("index");
});

router.get("/resume.pdf", (req, res) => {
    res.download(resume_filepath);
});

router.get("/resume", (req, res) => {
    fs.readFile(resume_filepath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

router.get("*", function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

router.use(function (err, req, res, next) {
    if (err.status === 404) {
        var data = {
            title: "404 Not Found",
            content: "Oops, page not found!",
        };
        res.render("404", data);
    } else {
        return next();
    }
});

// app.listen(3000);
module.exports.handler = serverless(app);
