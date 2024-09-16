"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="container">
      <div className="modal">
        <div className="modal-header">
          <h2>Начать</h2>
          <button className="close-btn">×</button>
        </div>
        <div className="modal-body">
          <label>Напишите ваше имя</label>
          <input type="text" placeholder="Ваше имя" value={name} onChange={handleChange} />
        </div>
        <div className="modal-footer">
          <button className="calc-btn">Открыть калькулятор</button>
          <button className="gen-btn">Открыть генератор</button>
        </div>
      </div>
    </div>
  );
}
