
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState("");
  const [subTodoInputs, setSubTodoInputs] = useState({});

  // Firestore collection reference
  const todosCol = collection(db, "todos");

  // Load todos from Firestore on mount and subscribe to changes
  useEffect(() => {
    const unsubscribe = onSnapshot(todosCol, (snapshot) => {
      const loaded = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
      setTodos(loaded);
    });
    return () => unsubscribe();
  }, []);

  // Add a new todo to Firestore
  const handleAddTodo = async () => {
    if (!newTodoText.trim()) return;
    await addDoc(todosCol, {
      text: newTodoText,
      completed: false,
      subTodos: []
    });
    setNewTodoText("");
  };

  // Toggle todo and its subtasks in Firestore
  const handleToggleTodo = async (todoId) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    const newCompleted = !todo.completed;
    const updated = {
      ...todo,
      completed: newCompleted,
      subTodos: todo.subTodos.map(sub => ({ ...sub, completed: newCompleted }))
    };
    await setDoc(doc(db, "todos", todoId), updated);
  };

  // Add a sub-todo to Firestore
  const handleAddSubTodo = async (todoId) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    const newSub = {
      id: Date.now(),
      text: `Sub-Todo ${todo.subTodos.length + 1}`,
      completed: false
    };
    const updated = {
      ...todo,
      subTodos: [...todo.subTodos, newSub]
    };
    await setDoc(doc(db, "todos", todoId), updated);
  };

  // Toggle a sub-todo in Firestore
  const handleToggleSubTodo = async (todoId, subTodoId) => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo) return;
    const updatedSubTodos = todo.subTodos.map(sub =>
      sub.id === subTodoId ? { ...sub, completed: !sub.completed } : sub
    );
    const allCompleted = updatedSubTodos.length > 0 && updatedSubTodos.every(sub => sub.completed);
    const updated = {
      ...todo,
      subTodos: updatedSubTodos,
      completed: allCompleted ? true : todo.completed
    };
    await setDoc(doc(db, "todos", todoId), updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-xl font-bold mb-8">Todo-List</h1>
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
