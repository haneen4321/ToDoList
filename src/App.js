import { useState, useEffect } from "react";
import "./Style.css";

function App() {
  // تحميل المهام من localStorage عند أول تشغيل
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  // حفظ التغييرات بعد التأشير على المهام
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // عند تأشير المستخدم على المهمة كمكتملة أو غير مكتملة
  const handleItemDone = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  return (
    <div className="Box">
      <h1>قائمة المهام</h1>
      <div className="to-do-container">
        <ul>
          {todos.length === 0 ? (
            <p>لا توجد مهام حالياً</p>
          ) : (
            todos.map(({ text, completed }, index) => (
              <div key={index} className="item">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => handleItemDone(index)}
                />
                <li className={completed ? "done" : ""}>{text}</li>
              </div>
            ))
          )}
        </ul>
      </div>

      {/* رابط للانتقال إلى صفحة الإعدادات */}
        <button className="link" onClick={() => (window.location.href = "/settings")}>تعديل المهام</button>

    </div>
  );
}

export default App;
