import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, onAddSubTodo, onToggleTodo, onToggleSubTodo, onAddTodo, subTodoInputs, setSubTodoInputs, setTodos }) => {
  const handleDeleteTodo = (todoId) => {
    setTodos(todos => todos.filter(t => t.id !== todoId));
  };
  // Custom handler: toggling a todo also toggles all its subtasks
  const handleToggleTodoWithSubs = (todoId) => {
    setTodos(todos =>
      todos.map(todo => {
        if (todo.id === todoId) {
          const newCompleted = !todo.completed;
          return {
            ...todo,
            completed: newCompleted,
            subTodos: todo.subTodos.map(sub => ({ ...sub, completed: newCompleted }))
          };
        }
        return todo;
      })
    );
  };
  return (
    <div className="space-y-4">
      {todos.map((todo, idx) => (
        <Todo
          key={todo.id}
          todo={todo}
          onAddSubTodo={() => onAddSubTodo(todo.id)}
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
