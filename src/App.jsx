
import React, { useState } from "react";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Geometry Trainer",
      completed: false,
      subTodos: [
        { id: 1, text: "Fix passcode bug", completed: false }
      ]
    }
  ]);
  const [newTodoText, setNewTodoText] = useState("");
  const [subTodoInputs, setSubTodoInputs] = useState({});

  const handleAddTodo = () => {
    if (!newTodoText.trim()) return;
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodoText,
        completed: false,
        subTodos: []
      }
    ]);
    setNewTodoText("");
  };

  const handleToggleTodo = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleAddSubTodo = (todoId) => {
    setTodos(todos.map(todo =>
      todo.id === todoId
        ? {
            ...todo,
            subTodos: [
              ...todo.subTodos,
              {
                id: Date.now(),
                text: `Sub-Todo ${todo.subTodos.length + 1}`,
                completed: false
              }
            ]
          }
        : todo
    ));
  };

  const handleToggleSubTodo = (todoId, subTodoId) => {
    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        const updatedSubTodos = todo.subTodos.map(sub =>
          sub.id === subTodoId ? { ...sub, completed: !sub.completed } : sub
        );
        const allCompleted = updatedSubTodos.length > 0 && updatedSubTodos.every(sub => sub.completed);
        return {
          ...todo,
          subTodos: updatedSubTodos,
          completed: allCompleted ? true : todo.completed
        };
      }
      return todo;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold mb-8">Todo App with Sub-Todos</h1>
      <div className="flex mb-4">
        <input
          type="text"
          className="border rounded px-2 py-1 mr-2"
          placeholder="Enter new todo..."
          value={newTodoText}
          onChange={e => setNewTodoText(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddTodo}
        >
          Add Todo
        </button>
      </div>
      <TodoList
        todos={todos}
        onAddTodo={handleAddTodo}
        onAddSubTodo={handleAddSubTodo}
        onToggleTodo={handleToggleTodo}
        onToggleSubTodo={handleToggleSubTodo}
        subTodoInputs={subTodoInputs}
        setSubTodoInputs={setSubTodoInputs}
        setTodos={setTodos}
      />
    </div>
  );
}

export default App;
