import { useRef, useState, useEffect } from "react";
import "./Style.css";

function Settings() {
  const inputRef = useRef();

  // تحميل المهام من localStorage
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ التغييرات في localStorage عند أي تعديل
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //إضافة مهمة جديدة
  const handleAddTodo = () => {
    const text = inputRef.current.value.trim();
    if (!text) return;
    const newItem = { completed: false, text };
    setTodos((prevTodos) => [...prevTodos, newItem]);
    inputRef.current.value = "";
  };

  // حذف مهمة
  const handleDeleteItem = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  // إضافة بالضغط على Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="Box">
      <h1>إدارة المهام</h1>
      <div className="to-do-container">
        <ul>
          {todos.map(({ text }, index) => (
            <div key={index} className="item">
              <span onClick={() => handleDeleteItem(index)} className="trash">
                X
              </span>
              <li>{text}</li>
            </div>
          ))}
        </ul>
        <input
          type="text"
          placeholder="أدخل مهمة جديدة..."
          ref={inputRef}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleAddTodo}>إضافة المهمة</button>
      </div>

      {/* زر للرجوع إلى الصفحة الرئيسية */}
        <button className="link" onClick={() => (window.location.href = "/")}>الصفحة الرئيسية</button>
    </div>
  );
}

export default Settings;
