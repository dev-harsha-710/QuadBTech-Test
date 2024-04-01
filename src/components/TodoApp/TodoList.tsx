import React, { useReducer, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoAction =
  | { type: "ADD_TODO"; text: string }
  | { type: "TOGGLE_TODO"; id: number }
  | { type: "DELETE_TODO"; id: number };

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE_TODO":
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};

const TodoList: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch({ type: "ADD_TODO", text });
      setText("");
    }
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
      <div
        style={{
          width: "50%",
          backgroundImage: `url(/background.jpg)`,
          backgroundSize: "cover",
          backdropFilter: "blur(8px)",
        }}
        className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden mb-8"
      >
        <div className="px-4 py-2 border-b">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Todo list 2024
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="px-4 py-2 border-b">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your task here..."
            className="px-4 py-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700"
          />
          <button
            type="submit"
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Todo
          </button>
        </form>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2 text-white">Tasks</h2>
          {todos.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No tasks yet.</p>
          ) : (
            <ul>
              {todos.map((todo) => (
                <li
                  key={todo.id}
                  className={`flex items-center justify-between py-2 border-b dark:border-gray-700 ${
                    todo.completed && "line-through"
                  }`}
                >
                  <span className="text-gray-800 dark:text-white">
                    {todo.text}
                  </span>
                  <div>
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
