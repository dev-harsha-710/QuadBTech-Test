import React, { useReducer } from "react";
import InputComponent from "./InputComponent";
import ListComponent from "./ListComponent";
import "./todolist.css";

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

const TodoComponent: React.FC = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = (text: string) => {
    dispatch({ type: "ADD_TODO", text });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: "TOGGLE_TODO", id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: "DELETE_TODO", id });
  };

  return (
    <div className="main-shadow-box">
      <h1>Todo list 2024</h1>
      <InputComponent addTodo={addTodo} />
      <div className="inner-box-container">
        <ListComponent
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          completed={false}
        />
        <ListComponent
          todos={todos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          completed={true}
        />
      </div>
    </div>
  );
};

export default TodoComponent;
