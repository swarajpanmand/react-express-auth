const express = require("express");
const app = express();
const port = 3000;
const connectDB = require("./db/dbConnection");
const user = require("./db/user");
const cors = require("cors");

//middleware for parsing json data
app.use(express.json());

//enable cors
app.use(cors());

//registration
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new user({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Registration failed" });
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await user.findOne({ username });

    if (!foundUser) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (foundUser.password !== password) {
      return res.status(401).json({ error: "Invalid credentials " });
    }
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Login failed" });
  }
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
