const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const resume_filepath = "./public/assets/Sean Kernitsman Resume.pdf";

port = process.env.PORT || 3000;

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.get("/", (req, res) => {
    console.log("hello", __dirname);
    res.render("index");
});

app.get("/resume.pdf", (req, res) => {
    res.download(resume_filepath);
});

app.get("/resume", (req, res) => {
    fs.readFile(resume_filepath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

app.get("*", function (req, res, next) {
    var err = new Error();
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
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

app.listen(port);
