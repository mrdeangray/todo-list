import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, onAddSubTodo, onToggleTodo, onToggleSubTodo, onAddTodo, subTodoInputs, setSubTodoInputs, setTodos }) => {
  return (
    <div className="space-y-4">
      {todos.map((todo, idx) => (
        <Todo
          key={todo.id}
          todo={todo}
          onAddSubTodo={() => onAddSubTodo(todo.id)}
          onToggleTodo={() => onToggleTodo(todo.id)}
          onToggleSubTodo={onToggleSubTodo}
          subTodoInputs={subTodoInputs}
          setSubTodoInputs={setSubTodoInputs}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
