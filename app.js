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

app.get("/", (_, res) => res.send("API available at /api/person"));

app.get("/api/person", async (_, res) => {
  await connectToDB();
  const allPerson = await usersSchema.aggregate([
    { $match: {} },
    { $project: { name: 1, date_joined: 1 } },
    { $sort: { date_joined: -1 } },
  ]);

  res.status(200).json(allPerson);
});

app.get("/api/person/:name", async (req, res) => {
  const { name } = req.params;
  try {
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

app.put("/api/person/:name", async (req, res) => {
  const personData = req.body;
  const { name } = personData;

  if (!name) return res.status(500).json({ msg: "Name field is required" });
  const nameParam = req.params.name;

  try {
    await connectToDB();
    const userExists = await usersSchema.findOne({ name: nameParam });
    if (!userExists) return res.status(403).json({ msg: `User with name (${nameParam}) does not exist.` });

    const willOverrideOtherUsers = await usersSchema.findOne({ name });
    if (willOverrideOtherUsers) return res.status(403).json({ msg: `User with name (${name}) already exist.` });

    await usersSchema.updateOne({ name: nameParam }, { $set: { name } });
    res.status(200).json({ msg: `User (${nameParam}) changed to => (${name})` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Sorry an error occurred" });
  }
});

app.delete("/api/person/:name", async (req, res) => {
  const { name } = req.params;

  if (!name) return res.status(500).json({ msg: "Name field is required" });

  try {
    await connectToDB();
    const userExists = await usersSchema.findOne({ name });
    if (!userExists) return res.status(403).json({ msg: `User with name (${name}) does not exist.` });

    await usersSchema.deleteOne({ name });
    res.status(200).json({ msg: `User (${name}) deleted successfully` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Sorry an error occurred" });
  }
});

app.listen(port);
module.exports = app;
