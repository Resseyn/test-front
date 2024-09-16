"use client";
import { useState } from "react";
import styles from "./passwordGenerator.module.scss";
import { generatePassword } from "@/utils/generatePassword";
import { BsCopy } from "react-icons/bs";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: "500",
  subsets: ["cyrillic"],
});

const inter = Inter({
  weight: "400",
  subsets: ["cyrillic"],
});

export default function PasswordGenerator() {
  const [passwords, setPasswords] = useState<string[]>([]);
  const [length, setLength] = useState(8);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [avoidRepeats, setAvoidRepeats] = useState(false);

  const generateNewPassword = () => {
    if (length == 0) {
      alert("Нельзя использовать нулевую длинну!");
      return;
    }
    if (!useUppercase && !useLowercase && !useNumbers && !useSymbols && !avoidRepeats) {
      alert("Выберете что-то!");
      return;
    }
    const newPassword = generatePassword(length, useUppercase, useLowercase, useNumbers, useSymbols);
    setPasswords((passwords) => [...passwords, newPassword]);
  };

  const copyToClipboard = (password: string) => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="page">
      <div className={styles.container}>
        <div>
          <h1 className={`${roboto.className} ${styles.title}`}>Генератор паролей</h1>
          <label>Длина пароля:</label>
          <input
            className={`${inter.className} ${styles.passwordInput}`}
            type="number"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
          />
          <div className={`${inter.className} ${styles.options}`}>
            <label className={styles.optionsLabel}>
              <input type="checkbox" checked={useUppercase} onChange={() => setUseUppercase(!useUppercase)} />
              Использовать прописные буквы
            </label>
            <label className={styles.optionsLabel}>
              <input type="checkbox" checked={useLowercase} onChange={() => setUseLowercase(!useLowercase)} />
              Использовать строчные буквы
            </label>
            <label className={styles.optionsLabel}>
              <input type="checkbox" checked={useNumbers} onChange={() => setUseNumbers(!useNumbers)} />
              Использовать цифры
            </label>
            <label className={styles.optionsLabel}>
              <input type="checkbox" checked={useSymbols} onChange={() => setUseSymbols(!useSymbols)} />
              Использовать символы: % * ~ ? @ # $ ~
            </label>
            <label className={styles.optionsLabel}>
              <input type="checkbox" checked={avoidRepeats} onChange={() => setAvoidRepeats(!avoidRepeats)} />
              Избегать повторения символов
            </label>
          </div>
          <button className={styles.generateButton} onClick={generateNewPassword}>
            Сгенерировать пароль
          </button>
        </div>
        <div className={styles.passwordList}>
          {passwords.map((password, index) => (
            <div className={styles.passwordItem} key={index}>
              <p className={styles.password}>{password}</p>
              <button className={styles.copyButton} onClick={() => copyToClipboard(password)}>
                <BsCopy className={styles.copyButton}></BsCopy>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
