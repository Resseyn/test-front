import React, { useEffect, useRef, useState } from "react";
import styles from "./Calculator.module.scss";
import { Work_Sans } from "next/font/google";

const work_Sans = Work_Sans({ subsets: ["latin"] });

const toLocaleString = (num: string) => String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const Calculator = () => {
  const [input, setInput] = useState<string>("0");
  const [previousInput, setPreviousInput] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);

  const [fontSize, setFontSize] = useState<number>(96);
  const [prevFontSize, setPrevFontSize] = useState<number>(40);
  const currentInputRef = useRef<HTMLDivElement>(null);
  const prevInputRef = useRef<HTMLDivElement>(null);

  const calculateFontSize = () => {
    if (currentInputRef.current) {
      const containerWidth = currentInputRef.current.offsetWidth;
      let newFontSize = fontSize;

      if (currentInputRef.current.scrollWidth > containerWidth) {
        newFontSize = fontSize / 2;
      }

      setFontSize(newFontSize);
    }
  };

  const calculatePreviusFontSize = () => {
    if (prevInputRef.current) {
      const containerWidth = prevInputRef.current.offsetWidth;
      let newFontSize = prevFontSize;

      if (prevInputRef.current.scrollWidth > containerWidth) {
        newFontSize = prevFontSize / 2;
      }

      setPrevFontSize(newFontSize);
    }
  };

  useEffect(() => {
    calculateFontSize();
    calculatePreviusFontSize();
  }, [input]);

  useEffect(() => {
    // after using any operator, but after calculation caltulate the font size
    if (operator !== null) {
      setFontSize(96);
    } else {
      calculateFontSize();
    }
  }, [operator]);

  const handleNumberClick = (value: string) => {
    if (input === "0") {
      setInput(value);
    } else {
      setInput(input + value);
    }
  };

  const handleOperatorClick = (selectedOperator: string) => {
    setPreviousInput(input);
    setOperator(selectedOperator);
    setInput("0");
  };

  const calculateResult = () => {
    if (!previousInput || !operator) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(input);

    let result;
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "×":
        result = prev * current;
        break;
      case "÷":
        result = prev / current;
        break;
      default:
        return;
    }

    setInput(result.toLocaleString());
    setPreviousInput(`${previousInput} ${operator} ${input}`);
    setOperator(null);
  };

  const handleClear = () => {
    setInput("0");
    setFontSize(96);
    setPrevFontSize(40);
    setPreviousInput(null);
    setOperator(null);
  };

  const handleDelete = () => {
    if (input.length > 1) {
      setInput(input.slice(0, -1));
    } else {
      setInput("0");
    }
  };

  const handleInvert = () => {
    setInput((input) => {
      return (-parseFloat(input)).toString();
    });
  };

  const handlePercent = () => {
    const currentNumber = parseFloat(input);

    if (operator && previousInput) {
      const prevNumber = parseFloat(previousInput);
      const percentage = currentNumber / 100;

      switch (operator) {
        case "+":
          setInput(String(prevNumber + prevNumber * percentage));
          break;
        case "-":
          setInput(String(prevNumber - prevNumber * percentage));
          break;
        case "*":
          setInput(String(prevNumber * percentage));
          break;
        case "/":
          setInput(String(prevNumber / percentage));
          break;
        default:
          break;
      }

      setPreviousInput(null);
      setOperator(null);
    } else {
      setInput(toLocaleString(String(currentNumber / 100)));
    }
  };
  return (
    <div className="page">
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div
            style={{ fontSize: `${prevFontSize}px` }}
            ref={prevInputRef}
            className={`${work_Sans.className} ${styles.previousInput}`}
          >
            {previousInput} {operator}
          </div>
          <div
            style={{ fontSize: `${fontSize}px` }}
            ref={currentInputRef}
            className={`${work_Sans.className} ${styles.currentInput}`}
          >
            {input}
          </div>
        </div>
        <div className={styles.buttons}>
          <button className={`${styles.calcButton} ${styles.gray}`} onClick={handleClear}>
            C
          </button>
          <button className={`${styles.calcButton} ${styles.gray}`} onClick={() => handleInvert()}>
            +/-
          </button>
          <button className={`${styles.calcButton} ${styles.gray}`} onClick={() => handlePercent()}>
            %
          </button>
          <button className={`${styles.calcButton} ${styles.blue}`} onClick={() => handleOperatorClick("÷")}>
            ÷
          </button>

          <button className={styles.calcButton} onClick={() => handleNumberClick("7")}>
            7
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("8")}>
            8
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("9")}>
            9
          </button>
          <button className={`${styles.calcButton} ${styles.blue}`} onClick={() => handleOperatorClick("×")}>
            ×
          </button>

          <button className={styles.calcButton} onClick={() => handleNumberClick("4")}>
            4
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("5")}>
            5
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("6")}>
            6
          </button>
          <button className={`${styles.calcButton} ${styles.blue}`} onClick={() => handleOperatorClick("-")}>
            -
          </button>

          <button className={styles.calcButton} onClick={() => handleNumberClick("1")}>
            1
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("2")}>
            2
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("3")}>
            3
          </button>
          <button className={`${styles.calcButton} ${styles.blue}`} onClick={() => handleOperatorClick("+")}>
            +
          </button>

          <button className={styles.calcButton} onClick={() => handleNumberClick(".")}>
            .
          </button>
          <button className={styles.calcButton} onClick={() => handleNumberClick("0")}>
            0
          </button>
          <button className={styles.calcButton} onClick={handleDelete}>
            ⌫
          </button>
          <button className={`${styles.calcButton} ${styles.blue}`} onClick={calculateResult}>
            =
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
