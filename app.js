const express = require("express");
const app = express();

app.use(express.static(__dirname + "/public"));

const PORT = 8000;

app.get("/", function (req, res) {
  res.sendFile("index.html");
});

app.listen(PORT, () => {
  console.log(`Server statrted at https://localhost:${PORT}`);
});