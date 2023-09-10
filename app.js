const express = require("express");
const connectToDB = require("./utils/mongo_db");
const usersSchema = require("./utils/schema/usersSchema");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("API available at /person"));

app.get("/person/:name", async (req, res) => {
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

app.post("/person", async (req, res) => {
  const body = req.body;
  try {

    res.status(200).json({ msg: "User created successfully", data: `Data ${body}` });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Sorry an error occurred" });
  }
});

// app.put("/person/:name", (req, res) => {});

// app.delete("/person/:name", (req, res) => {});

app.listen(port);
