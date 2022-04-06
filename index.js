const express = require("express");
require("dotenv").config();
const results = require("./results");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  //   app.use(express.static("public"));
  res.sendFile(__dirname + "/public/index.html");
});

//get all results
app.get("/results", (req, res) => {
  res.json({ results });
});

//get a specific result
app.get("/results/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = results.find((result) => result.id === id);
  if (!result) {
    return res.json({ message: "Result not found" });
  } else {
    return res.json(result);
  }
});

//get all results for a specific class
app.get("/results/class/:class", (req, res) => {
  const className = req.params.class;
  const result = results.filter(
    (result) =>
      result.class.toLocaleLowerCase() === className.toLocaleLowerCase()
  );
  if (!result) {
    return res.json({ message: "Result not found" });
  } else {
    return res.json(result);
  }
});

//delete a specific result
app.delete("/results/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = results.filter((result) => result.id !== id);
  if (!result) {
    return res.json({ message: "Result not found" });
  } else {
    return res.json(result);
  }
});

//post a new result
app.post("/results", (req, res) => {
  const result = {
    id: results.length + 1,
    name: req.body.name,
    score: req.body.score,
    class: req.body.class,
  };

  return res.json({
    message: "Result added successfully",
    results: [...results, result],
  });
});

//update a specific result
app.put("/results/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const result = results.find((result) => result.id === id);
  if (!result) {
    return res.json({ message: "Result not found" });
  } else {
    result.name = req.body.name || result.name;
    result.score = req.body.score || result.score;
    result.class = req.body.class || result.class;
    return res.json({
      message: "Result updated successfully",
      results: [...results, result],
    });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
