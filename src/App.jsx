import React, { useState } from "react";
import img1 from "./assets/delete.svg";
import img2 from "./assets/check.svg";
import imgAdd from "./assets/add.svg";


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
  const [todos, setTodos] = useState(init);
  const [text, setText] = useState("");
  

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    setTodos(newTodos);
  };

const taskDone = (id) => {
  setTodos(todos.map(t => {
    if (t.id === id) {
      t.done = !t.done;
    }
    return t;
  }));
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
    <div className="App">
      <form onSubmit={addNewTodo} className="form">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Add a new task"
        />
        <button type="submit" disabled={text.trim() === ""}>
          <img src={imgAdd} alt="abc" />
        </button>
      </form>
      <h3>Tasks to do - {todos.length > 0 ? todos.length : "Bo'sh"}</h3>
      <ul>
        {todos.map((t) => (
          <li key={t.id} className={t.done ? "done" : ""}>
            <p>{t.title}</p>
            <span>
              <button onClick={() => taskDone(t.id)}>
                <img src={img2} alt="mark as done" />
              </button>
              <button onClick={() => deleteTodo(t.id)}>
                <img src={img1} alt="delete task" />
              </button>
            </span>
          </li>
        ))}
      </ul>
      <div className="taskDone">
        <h3>Done - {todos.filter((t) => t.done).length > 0 ? todos.filter((t) => t.done).length : "Bo'sh"}</h3>
        <ul>
          {todos.filter((t) => t.done).map((t) => (
            <li key={t.id}>
              <span>{t.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
