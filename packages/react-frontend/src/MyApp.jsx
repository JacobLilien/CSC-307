// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table"
import Form from "./Form"

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index)
  {
    const updated = characters.filter((character, i) => {
      if (i === index)
      {
        deleteUser(character)
        .then((response) => {
          if (response.status === 204) {
            setCharacters(updated);
          }
          else {
            throw new Error("Incorrect status number")
          }
        })
        .catch((error) => {
          console.log(error);
        })
      }
      return i !== index;
    })
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (response.status === 201) {
          (response.json().then((id) => {
            person["id"] = id
            setCharacters([...characters, person]);
          }))
        }
        else {
          throw new Error("Incorrect status number")
        }
      })
      .catch((error) => {
        console.log(error);
      })
}

  function fetchUsers()
  {
    const promise = fetch("http://localhost:8003/users");
    return promise;
  }

  function deleteUser(person) {
    const promise = fetch("Http://localhost:8003/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
      return promise;
  }

  function postUser(person) {
    const promise = fetch("Http://localhost:8003/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
      console.log(person)
      return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => { console.log(error); });
  }, [] );

  return (
    <div className="container">
      <Table 
      characterData = {characters}
      removeCharacter = {removeOneCharacter}
      />
      <Form handleSubmit = {updateList} />
    </div>
  );
}
export default MyApp;
