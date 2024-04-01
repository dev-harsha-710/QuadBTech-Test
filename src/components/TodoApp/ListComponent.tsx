import React from "react";
import ListItemComponent from "./ListItemComponent";

interface ListProps {
  todos: { id: number; text: string; completed: boolean }[];
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  completed: boolean;
}

const ListComponent: React.FC<ListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  completed,
}) => {
  const filteredTodos = todos.filter((todo) => todo.completed === completed);

  return (
    <div className="inner-box">
      <h2>{completed ? "Completed Tasks" : "Added Tasks"}</h2>
      <ul>
        {filteredTodos.map((todo) => (
          <ListItemComponent
            key={todo.id}
            text={todo.text}
            toggleTodo={() => toggleTodo(todo.id)}
            deleteTodo={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
