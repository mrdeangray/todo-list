import React from "react";

const Todo = ({ todo, onAddSubTodo, onToggleTodo, onToggleSubTodo, subTodoInputs, setSubTodoInputs, setTodos }) => {
  const subInput = subTodoInputs[todo.id] || "";
  const handleInputChange = e => {
    setSubTodoInputs(inputs => ({ ...inputs, [todo.id]: e.target.value }));
  };
  const handleAddSubTodo = () => {
    if (!subInput.trim()) return;
    setTodos(todos =>
      todos.map(t =>
        t.id === todo.id
          ? {
              ...t,
              subTodos: [
                ...t.subTodos,
                {
                  id: Date.now(),
                  text: subInput,
                  completed: false
                }
              ]
            }
          : t
      )
    );
    setSubTodoInputs(inputs => ({ ...inputs, [todo.id]: "" }));
  };
  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={onToggleTodo}
            className="mr-2"
          />
          <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
        </div>
        <div className="flex">
          <input
            type="text"
            className="border rounded px-2 py-1 mr-2"
            placeholder="Enter sub-todo..."
            value={subInput}
            onChange={handleInputChange}
          />
          <button
            className="bg-green-500 text-white px-2 py-1 rounded"
            onClick={handleAddSubTodo}
          >
            Add Sub-Todo
          </button>
        </div>
      </div>
      <ul className="ml-6 mt-2">
        {todo.subTodos.map((sub, idx) => (
          <li key={sub.id} className="flex items-center">
            <input
              type="checkbox"
              checked={sub.completed}
              onChange={() => onToggleSubTodo(todo.id, sub.id)}
              className="mr-2"
            />
            <span className={sub.completed ? "line-through text-gray-400" : ""}>{sub.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
