import React, { useState, useEffect } from "react";
import img1 from "./assets/delete.svg";
import img2 from "./assets/check.svg";
import imgAdd from "./assets/add.svg";
import "./index.css";

const init = [
  {
    id: 1,
    title: "Buy groceries",
    done: false,
  },
  {
    id: 2,
    title: "Walk the dog",
    done: true,
  },
  {
    id: 3,
    title: "Complete homework",
    done: false,
  },
  {
    id: 4,
    title: "Read a book",
    done: true,
  },
  {
    id: 5,
    title: "Exercise",
    done: false,
  },
];

export default function App() {
  // Retrieve todos from localStorage or use initial todos if not available
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : init;
  });
  const [text, setText] = useState("");

  // Store todos in localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

  const taskDone = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          t.done = !t.done;
        }
        return t;
      })
    );
  };

  const markAsNotDone = (id) => {
    setTodos(
      todos.map((t) => {
        if (t.id === id) {
          t.done = false;
        }
        return t;
      })
    );
  };

  const addNewTodo = (event) => {
    event.preventDefault();
    if (text.trim()) {
      const newTodo = {
        id: Date.now(),
        title: text,
        done: false,
      };
      setTodos([...todos, newTodo]);
      setText("");
    }
  };

  return (
    <div className="font-sans bg-gray-900 text-white p-8">
      <form onSubmit={addNewTodo} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a new task"
          className="w-full bg-transparent border border-purple-600 px-4 py-3 text-white rounded-lg focus:outline-none"
        />
        <button
          type="submit"
          disabled={text.trim() === ""}
          className="w-10 h-10 bg-purple-600 rounded-lg"
        >
          <img src={imgAdd} alt="Add task" />
        </button>
      </form>
      <h3 className="text-white mt-4">
        Tasks to do - {todos.length > 0 ? todos.length : "Bo'sh"}
      </h3>
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            className={`flex justify-between items-center px-6 py-5 mt-4 rounded-lg ${
              t.done
                ? "line-through text-green-400"
                : "bg-black text-purple-600"
            }`}
          >
            <p>{t.title}</p>
            <span>
              <button onClick={() => taskDone(t.id)} className="bg-transparent">
                <img src={img2} alt="Mark as done" />
              </button>
              <button
                onClick={() => deleteTodo(t.id)}
                className="bg-transparent"
              >
                <img src={img1} alt="Delete task" />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h3 className="text-white">
          Done -{" "}
          {todos.filter((t) => t.done).length > 0
            ? todos.filter((t) => t.done).length
            : "Bo'sh"}
        </h3>
        <ul>
          {todos
            .filter((t) => t.done)
            .map((t) => (
              <li
                onClick={() => markAsNotDone(t.id)}
                key={t.id}
                className="flex justify-between items-center px-6 py-5 mt-4 rounded-lg line-through text-green-400 cursor-pointer"
              >
                <span>{t.title}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
