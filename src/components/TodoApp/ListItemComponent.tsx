import React from "react";

interface ListItemProps {
  text: string;
  toggleTodo: () => void;
  deleteTodo: () => void;
}

const ListItemComponent: React.FC<ListItemProps> = ({
  text,
  toggleTodo,
  deleteTodo,
}) => {
  return (
    <li>
      <span>{text}</span>
      <div>
        <button onClick={toggleTodo}>Toggle</button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={deleteTodo}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ListItemComponent;
