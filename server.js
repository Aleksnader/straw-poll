const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;
const fs = require("fs");
var path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const jsonExample = {
  glossary: {
    title: "example glossary",
    GlossDiv: {
      title: "S",
      GlossList: {
        GlossEntry: {
          ID: "SGML",
          SortAs: "SGML",
          GlossTerm: "Standard Generalized Markup Language",
          Acronym: "SGML",
          Abbrev: "ISO 8879:1986",
          GlossDef: {
            para:
              "A meta-markup language, used to create markup languages such as DocBook.",
            GlossSeeAlso: ["GML", "XML"],
          },
          GlossSee: "markup",
        },
      },
    },
  },
};

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});
app.get("/api/example", (req, res) => {
  //res.send({ express: req.params.dupa });
  console.log(req.query);
  const jsonPath = path.join(
    __dirname,
    "data",
    "allPolls",
    `${req.query.id}.json`
  );
  let rawdata = fs.readFileSync(jsonPath);
  let data = JSON.parse(rawdata);

  res.send({ sendFromEx: data }); //req.query.id -- parametr po /? --- TU SKONCZYLEM NIECH ZWRACA TYLKO ID
});

app.post("/api/world", (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`
  );
});
app.post("/api/new-poll", (req, res) => {
  const ID = "_" + Math.random().toString(36).substr(2, 9);
  var jsonPath = path.join(__dirname, "data", "allPolls", `${ID}.json`);
  fs.writeFile(jsonPath, JSON.stringify(req.body), function (err) {
    if (err) throw err;
    console.log("File is created successfully.");
  });
  console.log(req.body);
  res.send(ID);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
