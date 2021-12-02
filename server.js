const express = require("express");
const fs = require("fs");
var path = require("path");
var favicon = require("serve-favicon");
const app = express();

const public = path.join(__dirname, "public");
const resume_filepath = path.join(public, "assets", "Sean Kernitsman Resume.pdf");

var cors = require("cors");
app.use(cors());
app.options("*", cors());

app.set("views", public);
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
// app.set("view engine", "ejs");

app.use(favicon(path.join(public, "assets", "favico.ico")));
app.use(express.static(public));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/home", (req, res) => {
    res.redirect("/");
});

app.get("/thanks", (req, res) => {
    res.sendFile(path.join(public, "thanks.html"));
    // res.render("thanks");
});

app.post("/thanks", function (req, res) {
    console.log(req.body);
    // res.redirect("/thank-you");
    res.redirect(301, "/thanks");
});

// app.all("/thanks", function (req, res, next) {
//     console.log(req.body);
//     next();
// });

// app.use("/thanks", function (req, res, next) {
//     console.log(req.body);
//     res.redirect(301, "/thanks");
//     next();
// });

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

app.get("/math235_project", (req, res) => {
    res.sendFile(path.join(public, "children_book_project.html"));
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
