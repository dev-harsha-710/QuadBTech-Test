import React, { useState } from "react";

interface InputProps {
  addTodo: (text: string) => void;
}

const InputComponent: React.FC<InputProps> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      addTodo(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your task here..."
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default InputComponent;
