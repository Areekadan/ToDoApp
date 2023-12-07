import React, { useState } from "react";
import {
  MdOutlineDeleteOutline,
  MdEditNote,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import axios from "axios";

const Table = ({ todos, setToDos, isLoading }) => {
  const [todo, setTodo] = useState({
    id: "",
    body: "",
    editedBody: "",
  });
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}/`);

      const newList = todos.filter((todo) => todo.id !== id);
      setToDos(newList);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (id, value) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      const newToDos = todos.map((todo) =>
        todo.id === id ? response.data : todo
      );
      setToDos(newToDos);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckBox = (id, value) => {
    handleEdit(id, {
      completed: !value,
    });
  };
  const findIDBody = (id, value) => {
    setTodo((prevToDo) => ({
      ...prevToDo,
      id: id,
      body: value,
      editedBody: value,
    }));
  };
  const handleChange = (e) => {
    setTodo((prevToDo) => ({
      ...prevToDo,
      editedBody: e.target.value,
    }));
  };
  const handleEditNote = (id, value) => {
    handleEdit(id, {
      body: value,
    });
  };
  const formattedDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString();
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${month} ${day} ${year}, ${formattedTime}`;
  };
  return (
    <div className="py-10">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b-2 border-black">
          <tr>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Checkbox
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              TODO
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Status
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Data Created At
            </th>
            <th className="p-3 text-sm font-semibold tracking-wide text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : (
            todos.map((todoItem, index) => {
              return (
                <tr key={index} className="border-b border-black">
                  <td className="p-3 text-sm font-medium">
                    <span
                      onClick={() =>
                        handleCheckBox(todoItem.id, todoItem.completed)
                      }
                      className="text-xl inline-block cursor-pointer"
                    >
                      {todoItem.completed ? (
                        <MdOutlineCheckBox></MdOutlineCheckBox>
                      ) : (
                        <MdOutlineCheckBoxOutlineBlank></MdOutlineCheckBoxOutlineBlank>
                      )}
                    </span>
                  </td>
                  <td className="p-3 text-sm font-medium">{todoItem.body}</td>
                  <td className="p-3 text-sm">
                    <span
                      className={`p-1.5 text-xs font-medium tracking-wider rounded-md ${
                        todoItem.completed ? "bg-green-300" : "bg-red-300"
                      }`}
                    >
                      {todoItem.completed ? "Done" : "Incomplete"}
                    </span>
                  </td>

                  <td className="p-3 text-sm font-medium">
                    {formattedDateTime(todoItem.created)}
                  </td>
                  <td className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                    <span className="text-xl inline-block cursor-pointer">
                      <label
                        htmlFor="my_modal_6"
                        className="btn"
                        onClick={() => findIDBody(todoItem.id, todoItem.body)}
                      >
                        <MdEditNote></MdEditNote>
                      </label>
                    </span>
                    <span className="text-xl inline-block cursor-pointer">
                      <MdOutlineDeleteOutline
                        onClick={() => handleDelete(todoItem.id)}
                      ></MdOutlineDeleteOutline>
                    </span>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div
          className="modal-box flex flex-col items-center justify-center"
          key={todo.id}
        >
          <h3 className="font-bold text-lg">Edit ToDo</h3>
          <input
            type="text"
            value={todo.editedBody}
            onChange={handleChange}
            className="input input-bordered w-full mt-10 mb-10"
          />
          <div className="modal-action mt-0">
            <label
              htmlFor="my_modal_6"
              className="btn btn-primary"
              onClick={() => handleEditNote(todo.id, todo.editedBody)}
            >
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
