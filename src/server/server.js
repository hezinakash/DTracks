const express = require("express");
const app = express();
const dbManager = require("./modules/DbManager");
const port = 8080;
const searchManager = require("./modules/searchManager");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.listen(port, () => console.log(`Server listening on port ${port}!`));

dbManager.connectToDB(() => console.log("db connected"));

app.get("/getTopTen", (req, res) => {
  searchManager.getTopTen(data => {
    res.status(200).send(data);
  });
});

app.post("/addSearch", (req, res) => {
  const userQuery = req.body.query;

  searchManager.add(userQuery, data => {
    if (data) {
      res.status(200).send();
    } else {
      res.status(500).send();
    }
  });
});
