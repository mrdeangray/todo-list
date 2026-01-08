
import React from "react";
import Todo from "./Todo";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const TodoList = ({ todos, onAddSubTodo, onToggleTodo, onToggleSubTodo, onAddTodo, subTodoInputs, setSubTodoInputs, setTodos }) => {
  const handleDeleteTodo = (todoId) => {
    setTodos(todos => todos.filter(t => t.id !== todoId));
  };
  // Custom handler: toggling a todo also toggles all its subtasks
  const handleToggleTodoWithSubs = async (todoId) => {
    setTodos(todos => {
      const updatedTodos = todos.map(todo => {
        if (todo.id === todoId) {
          const newCompleted = !todo.completed;
          const updatedTodo = {
            ...todo,
            completed: newCompleted,
            subTodos: todo.subTodos.map(sub => ({ ...sub, completed: newCompleted }))
          };
          // Save to Firestore
          setDoc(doc(db, "todos", todo.id), updatedTodo);
          return updatedTodo;
        }
        return todo;
      });
      return updatedTodos;
    });
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {todos.map((todo, idx) => (
        <Todo
          key={todo.id}
          todo={todo}
          onAddSubTodo={subText => onAddSubTodo(todo.id, subText)}
          onToggleTodo={() => handleToggleTodoWithSubs(todo.id)}
          onToggleSubTodo={onToggleSubTodo}
          subTodoInputs={subTodoInputs}
          setSubTodoInputs={setSubTodoInputs}
          setTodos={setTodos}
          onDeleteTodo={handleDeleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
