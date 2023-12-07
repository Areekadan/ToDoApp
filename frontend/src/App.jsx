import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ToDoForm from "./components/ToDoForm";
import Table from "./components/Table";

function App() {
  const [todos, setToDos] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      setToDos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <nav className="pt-8">
        <h1 className="text-5xl text-center pb-12">ToDo List</h1>
      </nav>
      <ToDoForm setToDos={setToDos}></ToDoForm>
      <Table todos={todos} setToDos={setToDos} isLoading={isLoading}></Table>
    </div>
  );
}

export default App;
