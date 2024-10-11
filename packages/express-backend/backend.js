// backend.js
import express, { json } from "express";
import cors from "cors";

const app = express();
const port = 8003;
const users = {
    users_list: [
      {
        id: "xyz789",
        name: "Charlie",
        job: "Janitor"
      },
      {
        id: "abc123",
        name: "Mac",
        job: "Bouncer"
      },
      {
        id: "ppp222",
        name: "Mac",
        job: "Professor"
      },
      {
        id: "yat999",
        name: "Dee",
        job: "Aspring actress"
      },
      {
        id: "zap555",
        name: "Dennis",
        job: "Bartender"
      }
    ]
  };

  const filterUserByName = (name) => {
    return users["users_list"].filter(
      (user) => user["name"] === name
    );
  };

  const filterUserByID = (id) => {
    return users["users_list"].filter(
      (user) => user["id"] === id
    );
  };

  const findUserByID = (id) =>
    users["users_list"].find((user) => user["id"] === id);

  const addUser = (user) => {
    user["id"] = Math.round(100000 * Math.random()).toString()
    users["users_list"].push(user);
    return user;
  };

  const deleteUser = (id) => {
    const index = users["users_list"].findIndex(user => user["id"] === id)
    if (index !== -1)
    {
      users["users_list"].splice(index, 1)
      return true
    }
    return false
  };

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = filterUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201).send(userToAdd["id"]);
});

app.delete("/users", (req, res) => {
  const userToDelete = req.body["id"];
  const deleted = deleteUser(userToDelete);
  if (deleted)
  {
    res.status(204).send("Successful Delete");
  }
  else{
    res.status(404).send("Resource not found")
  }
  res.send(userToDelete);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserByID(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.put("/users", (req, res) => {
  const name = req.body["name"]
  const id = req.body["id"]
  let resultname = filterUserByName(name);
  let resultid = filterUserByID(id)
  if (resultname["name"] == resultid["name"] && resultname["id"] == resultid["id"]){
    res.send(resultname)
  }
  else {
    res.send("No Match")
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});