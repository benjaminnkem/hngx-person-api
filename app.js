const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const connectToDB = require("./utils/mongo_db");
const usersSchema = require("./utils/schema/usersSchema");

const bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.disable("x-powered-by");

app.get("/", (req, res) => res.send("API available at /api/person"));

app.get("/api/person/:name", async (req, res) => {
  try {
    const { name } = req.params;
    if (typeof name !== "string") return res.status(500).json({ msg: "Parameter name must be a string" });

    await connectToDB();

    const userDetails = await usersSchema.findOne({ name });
    if (!userDetails) return res.status(404).json({ msg: `User with name (${name}) not found` });

    res.status(200).json(userDetails);
  } catch (e) {
    res.status(500).json({ msg: "Sorry an error occurred" });
  }
});

app.post("/api/person", async (req, res) => {
  const personData = req.body;

  if (!personData || !personData.name) return res.status(500).json({ msg: "Name field is required" });

  const { name } = personData;
  try {
    await connectToDB();
    const userExists = await usersSchema.findOne({ name });
    if (userExists) return res.status(403).json({ msg: "User already exists" });

    await usersSchema.create({ name });
    res.status(200).json({ msg: "User created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Sorry an error occurred" });
  }
});

app.put("/api/person/:name", (req, res) => {
});

// app.delete("/api/person/:name", (req, res) => {});

app.listen(port);
