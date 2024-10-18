// backend.js
import express, { json } from "express";
import cors from "cors";
import userObject from "./user-services.js";

const app = express();
const port = 8003;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  const name = req.query["name"];
  const job = req.query["job"];
  if (name === undefined && job === undefined)
  {
    const result = await userObject.returnUsers();
    if (result)
    {
      res.send({ users_list: result } )
    }
    else {
      res.status(404).send("Resource not found.")
    }
  }
  else{
    try {
      const result = await userObject.findUserByNameAndJob(name, job);
      res.send({ users_list: result });
    } catch (error) {
      console.log(error);
      res.status(500).send("An error ocurred in the server.");
    }
  }
});

app.post("/users", async (req, res) => {
  const userToAdd = req.body;
  const savedUser = await userObject.addUser(userToAdd);
  if (savedUser){
    res.status(201).send(savedUser);
  } 
  else {
    res.status(500).end();
  }
});

app.get("/users/:id", async (req, res) => {
  const userID = req.params["id"];
  const result = await userObject.findUserById(userID);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.");
  else {
    res.send({users_list: result});
  }
});

app.delete("/users/:id", async (req, res) => {
  const userID = req.params["id"];
  const result = await userObject.findUserAndDelete(userID);
  if (result === undefined || result === null)
    res.status(404).send("Resource not found.")
  else
  {
    res.send(`This user has been deleted: ${(result)}`);
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});