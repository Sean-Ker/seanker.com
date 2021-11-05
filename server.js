const express = require("express");
const fs = require("fs");
var path = require("path");
var favicon = require("serve-favicon");
const app = express();

const public = path.join(__dirname, "public");
const resume_filepath = path.join(public, "assets", "Sean Kernitsman Resume.pdf");

app.set("views", public);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// app.set("view engine", "ejs");

app.use(favicon(path.join(public, "assets", "favico.ico")));
app.use(express.static(public));

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.get("/", (req, res) => {
    console.log("hello", __dirname);
    res.render("index");
});

// app.get("/thank-you", function (req, res) {
//     res.sendFile(path.join(public, "/thanks.html"));
// });

app.post("/thanks", function (req, res) {
    console.log(req.body);
    // res.redirect("/thank-you");
    res.redirect(303, "/thanks");
});

app.get("/thanks", (req, res) => {
    res.sendFile(path.join(public, "thanks.html"));
});

// app.get("/robots.txt", (req, res) => {
//     res.type("text/plain");
//     res.sendFile(path.join(public, "robots.txt"));
// });

app.get("/resume.pdf", (req, res) => {
    res.download(resume_filepath);
});

app.get("/resume", (req, res) => {
    fs.readFile(resume_filepath, function (err, data) {
        res.contentType("application/pdf");
        res.send(data);
    });
});

// app.post("/", function (req, res) {
//     console.log(req.body);
//     thanks = path.join(public, "thanks");
//     res.render(thanks, { req: req.body });
// });

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

const port = process.env.PORT || 3000;
app.listen(port);
