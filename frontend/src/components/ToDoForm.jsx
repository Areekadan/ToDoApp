import React, { useState } from "react";
import axios from "axios";

const ToDoForm = ({ setToDos }) => {
  const [newToDo, setNewToDo] = useState({
    body: "",
  });
  const handleChange = (e) => {
    setNewToDo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };
  const postToDo = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/todo/",
        newToDo
      );
      setToDos((prevToDos) => [...prevToDos, response.data]);
      setNewToDo({ body: "" });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Add ToDo"
        className="input input-bordered input-info max-w-xs"
        onChange={handleChange}
        value={newToDo.body}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postToDo();
          }
        }}
      />
      <button className="btn btn-primary ml-2" onClick={postToDo}>
        Add
      </button>
    </div>
  );
};

export default ToDoForm;
