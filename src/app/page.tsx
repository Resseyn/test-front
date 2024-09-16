"use client";

import { useNameStore } from "@/store/store";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import styles from "./page.module.scss";
import { Inter } from "next/font/google";

const inter600 = Inter({
  weight: "600",
  subsets: ["cyrillic"],
});

const inter500 = Inter({
  weight: "500",
  subsets: ["cyrillic"],
});

export default function Home() {
  const [inputName, setInputName] = useState("");
  const { name, setName } = useNameStore();

  const router = useRouter();

  const handleSaveAndRedirect = (redirectTo: string) => {
    if (inputName.trim() === "") {
      alert("Пожалуйста, введите имя!");
      return;
    }
    setName(inputName);
    localStorage.setItem("name", inputName);
    router.push(redirectTo);
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputName(event.target.value);
    },
    [setInputName],
  );

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={inter600.className}>Начать</h2>
          <button className={styles.closeBtn}>×</button>
        </div>
        <div className={styles.modalBody}>
          <label className={inter500.className}>Напишите ваше имя</label>
          <input type="text" placeholder="Ваше имя" defaultValue={name} onChange={handleChange} />
        </div>
        <div className={`${inter500.className} ${styles.modalFooter}`}>
          <button className={styles.calcBtn} onClick={() => handleSaveAndRedirect("/utility/calculator")}>
            Открыть калькулятор
          </button>
          <button className={styles.genBtn} onClick={() => handleSaveAndRedirect("/utility/password-generator")}>
            Открыть генератор
          </button>
        </div>
      </div>
    </div>
  );
}
