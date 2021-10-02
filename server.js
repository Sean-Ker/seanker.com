const express = require("express");
const fs = require("fs");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

const resume_filepath = "./public/assets/Sean Kernitsman Resume.pdf";

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

app.listen(3000);
