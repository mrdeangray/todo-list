import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Todo = ({ todo, onAddSubTodo, onToggleTodo, onToggleSubTodo, subTodoInputs, setSubTodoInputs, setTodos, onDeleteTodo }) => {
  const [showSubInput, setShowSubInput] = useState(false);
  const subInputRef = React.useRef(null);
  React.useEffect(() => {
    setShowSubInput(false);
  }, [todo]);
  const [isEditingTodo, setIsEditingTodo] = useState(false);
  const [editTodoText, setEditTodoText] = useState(todo.text);
  const [editingSubId, setEditingSubId] = useState(null);
  const [editSubText, setEditSubText] = useState("");
  const subInput = subTodoInputs[todo.id] || "";
  const handleInputChange = e => {
    setSubTodoInputs(inputs => ({ ...inputs, [todo.id]: e.target.value }));
  };
  const handleAddSubTodo = async () => {
    if (!subInput.trim()) return;
    await onAddSubTodo(subInput);
    setSubTodoInputs(inputs => ({ ...inputs, [todo.id]: "" }));
    setShowSubInput(false);
  };
  const handleEditTodo = () => {
    setIsEditingTodo(true);
    setEditTodoText(todo.text);
  };
  const handleSaveTodo = () => {
    setTodos(todos => todos.map(t => t.id === todo.id ? { ...t, text: editTodoText } : t));
    setIsEditingTodo(false);
  };
  const handleEditSub = (sub) => {
    setEditingSubId(sub.id);
    setEditSubText(sub.text);
  };
  const handleSaveSub = async (subId) => {
    const updatedSubTodos = todo.subTodos.map(s => s.id === subId ? { ...s, text: editSubText } : s);
    const updated = { ...todo, subTodos: updatedSubTodos };
    await setDoc(doc(db, "todos", todo.id), updated);
    setEditingSubId(null);
  };
  const handleDeleteSub = async (subId) => {
    const updatedSubTodos = todo.subTodos.filter(s => s.id !== subId);
    const updated = { ...todo, subTodos: updatedSubTodos };
    await setDoc(doc(db, "todos", todo.id), updated);
    setEditingSubId(null);
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
          {isEditingTodo ? (
            <>
              <input
                type="text"
                className="border rounded px-2 py-1 mr-2"
                value={editTodoText}
                onChange={e => setEditTodoText(e.target.value)}
              />
              <button className="text-green-500 mr-2" title="Save" onClick={handleSaveTodo}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
              <button className="text-gray-400" title="Cancel" onClick={() => setIsEditingTodo(false)}>Cancel</button>
              <button
                className="ml-2 text-gray-500 hover:text-blue-500"
                title="Delete Todo"
                onClick={() => onDeleteTodo(todo.id)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3.46-9.12a1 1 0 0 1 1.41 0l1.13 1.13 1.13-1.13a1 1 0 1 1 1.41 1.41l-1.13 1.13 1.13 1.13a1 1 0 0 1-1.41 1.41l-1.13-1.13-1.13 1.13a1 1 0 0 1-1.41-1.41l1.13-1.13-1.13-1.13a1 1 0 0 1 0-1.41z" />
                  <path d="M18 4h-3.5l-1-1h-5l-1 1H6a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2z" />
                </svg>
              </button>
            </>
          ) : (
            <>
              <span className={todo.completed ? "line-through text-gray-400" : ""}>{todo.text}</span>
              <button
                className="ml-2 text-gray-500 hover:text-blue-500"
                title="Edit Todo"
                onClick={handleEditTodo}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M17.414 2.586a2 2 0 0 0-2.828 0l-9.5 9.5A2 2 0 0 0 4 13.5V16a1 1 0 0 0 1 1h2.5a2 2 0 0 0 1.414-.586l9.5-9.5a2 2 0 0 0 0-2.828l-2-2z" />
                </svg>
              </button>
            </>
          )}
        </div>
        <div className="flex">
          {!showSubInput ? (
            <button
              className="bg-green-500 text-white rounded-full flex items-center justify-center w-6 h-6"
              onClick={() => {
                setShowSubInput(true);
                setTimeout(() => {
                  if (subInputRef.current) subInputRef.current.focus();
                }, 0);
              }}
              aria-label="Show Sub-Todo Input"
            >
              <span style={{fontSize: '1em', fontWeight: 'bold', lineHeight: '1'}}>+</span>
            </button>
          ) : (
            <>
              <input
                ref={subInputRef}
                type="text"
                className="border rounded px-2 py-1 mr-2"
                placeholder="Enter sub-todo..."
                value={subInput}
                onChange={handleInputChange}
              />
              <button
                className="bg-green-500 text-white rounded-full flex items-center justify-center w-6 h-6"
                onClick={handleAddSubTodo}
                aria-label="Add Sub-Todo"
              >
                <span style={{fontSize: '1em', fontWeight: 'bold', lineHeight: '1'}}>+</span>
              </button>
            </>
          )}
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
            {editingSubId === sub.id ? (
              <>
                <input
                  type="text"
                  className="border rounded px-2 py-1 mr-2"
                  value={editSubText}
                  onChange={e => setEditSubText(e.target.value)}
                />
                <button className="text-green-500 mr-2" title="Save" onClick={() => handleSaveSub(sub.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button className="text-gray-400" title="Cancel" onClick={() => setEditingSubId(null)}>Cancel</button>
                <button
                  className="ml-2 text-gray-500 hover:text-blue-500"
                  title="Delete Sub-Todo"
                  onClick={() => handleDeleteSub(sub.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12zm3.46-9.12a1 1 0 0 1 1.41 0l1.13 1.13 1.13-1.13a1 1 0 1 1 1.41 1.41l-1.13 1.13 1.13 1.13a1 1 0 0 1-1.41 1.41l-1.13-1.13-1.13 1.13a1 1 0 0 1-1.41-1.41l1.13-1.13-1.13-1.13a1 1 0 0 1 0-1.41z" />
                    <path d="M18 4h-3.5l-1-1h-5l-1 1H6a1 1 0 0 0 0 2h12a1 1 0 0 0 0-2z" />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <span className={sub.completed ? "line-through text-gray-400" : ""}>{sub.text}</span>
                <button
                  className="ml-2 text-gray-400 hover:text-blue-500"
                  title="Edit Sub-Todo"
                  onClick={() => handleEditSub(sub)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path d="M17.414 2.586a2 2 0 0 0-2.828 0l-9.5 9.5A2 2 0 0 0 4 13.5V16a1 1 0 0 0 1 1h2.5a2 2 0 0 0 1.414-.586l9.5-9.5a2 2 0 0 0 0-2.828l-2-2z" />
                  </svg>
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
