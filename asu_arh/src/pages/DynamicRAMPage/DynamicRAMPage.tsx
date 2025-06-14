import { ChangeEvent, ReactElement, useEffect, useRef, useState } from "react";

import Button from "@components/Button/Button";
import ColorBlock from "@components/ColorContainer/ColorBlock/ColorBlock";
import ColorContainer from "@components/ColorContainer/ColorContainer";
import Select from "@components/Select/Select";
import Table from "@components/Table/Table/Table";
import TableContainer from "@components/Table/TableContainer/TableContainer";
import WindowForTheory from "@components/WindowForTheory/WindowForTheory";
import { RAMTableSizes } from "@enums/RAMTableSizes";
import useMatchMedia from "@hooks/useMatchMedia";
import { IRAMValue } from "@interfaces/IRAMValue";
import { IRAMValues } from "@interfaces/IRAMValues";

import { ButtonSizes } from "../../enums/ButtonSizes";
import { getRandomNumber } from "../../scripts/scripts";
import { dramTheory } from "./dramTheory";
import styles from "./page.module.scss";

interface IInputNumber {
  title: number;
  value: string;
}

function DynamicRAMPage(): ReactElement {
  const timer = useRef<number | undefined>();
  const [values, setValues] = useState<string[][]>([]);
  const [zeroValues, setZeroValues] = useState<IRAMValues[]>([]);
  const [showZeroValues, setShowZeroValues] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<IRAMValues[]>([]);
  const [valuesChangedInCurrentSession, setValuesChangedInCurrentSession] =
    useState<IRAMValue[]>([]);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const [numberOfBlock] = useState<number>(1);
  const [inputNumbers, setInputNumbers] = useState<IInputNumber[]>([]);
  const [checkingRowIndex, setCheckingRowIndex] = useState<number>(0);
  const [checkingColIndex, setCheckingColIndex] = useState<number>(0);
  const [showChecking, setShowChecking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [delay] = useState<number>(300);
  const {
    isTablet,
    isMobile,
    isFullHd,
    isTwoK,
    isSmallDisplay,
    isNotFullHd,
    isSmallMobile,
  } = useMatchMedia();

  useEffect(() => {
    fillArray();
    fillInputNumbers();
  }, []);

  useEffect(() => {
    if (values) {
      findZeroValues();
    }
  }, [values]);

  function fillInputNumbers() {
    const result: IInputNumber[] = new Array(15);

    for (let i = 0; i < result.length; i++) {
      result[i] = { title: i + 1, value: (i + 1).toString(2).padStart(4, "0") };
    }

    setInputNumbers(result);
  }

  function fillArray() {
    let result: string[][] = [];

    for (let i = 0; i < 10; i++) {
      result[i] = new Array(10);

      for (let j = 0; j < 10; j++) {
        result[i][j] = getRandomNumber(0, 15).toString(2).padStart(4, "0");
      }
    }

    setShowZeroValues(false);
    setValuesChangedInCurrentSession([]);
    setValues(result);
  }

  function findZeroValues() {
    const result: IRAMValues[] = [];

    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        if (values[j][i] === "0000") {
          result.push({ colIndex: i, rowIndex: j } as IRAMValues);
        }
      }
    }

    setZeroValues(result);
  }

  function deleteSelectedValues() {
    const array = [...values];

    for (let i = 0; i < selectedValues.length; i++) {
      array[selectedValues[i].rowIndex][selectedValues[i].colIndex] = "0000";
    }

    setSelectedValues([]);

    setValues(array);
  }

  function changeValue(rowIndex: number, colIndex: number, value: string) {
    const arr = [...values];

    arr[rowIndex][colIndex] = value;

    setValues(arr);
  }

  function showOrHideZeroValues() {
    setShowZeroValues((prev) => !prev);
  }

  function checkingValues() {
    setShowChecking(true);
    setCheckingColIndex(0);
    setCheckingRowIndex(0);

    const arr = [...values];
    let rowIndex: number = 0;
    let colIndex: number = 0;

    timer.current = setInterval(() => {
      if (arr[rowIndex][colIndex] === "0000") {
        arr[rowIndex][colIndex] = inputValue.toString();
        stopInput();

        setValuesChangedInCurrentSession((prev) => [
          ...prev,
          {
            numberOfBlock: numberOfBlock,
            rowIndex: rowIndex,
            colIndex: colIndex,
          },
        ]);
        setValues(arr);

        return;
      }
      if (colIndex === arr[0].length) {
        alert("Нет свободных ячеек");
        stopInput();
        return;
      }

      setCheckingColIndex(colIndex);
      setCheckingRowIndex(rowIndex);

      rowIndex++;

      if (rowIndex === arr.length) {
        rowIndex = 0;
        colIndex++;
      }
    }, delay);
  }

  function sortValues() {
    const notZeroValues: string[] = new Array(100);
    const result: string[][] = new Array(10);

    for (let i = 0, k = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        if (values[i][j] !== "0000") {
          notZeroValues[k] = values[i][j];
          k++;
        }
      }
    }

    for (
      let i = notZeroValues.length - zeroValues.length;
      i < notZeroValues.length;
      i++
    ) {
      notZeroValues[i] = "0000";
    }

    for (let i = 0, k = 0; i < result.length; i++) {
      result[i] = new Array(10);

      for (let j = 0; j < result[i].length; j++, k++) {
        result[i][j] = notZeroValues[k];
      }
    }
    setValuesChangedInCurrentSession([]);
    setValues(result);
  }

  function stopInput() {
    clearInterval(timer.current);
    timer.current = undefined;

    setShowChecking(false);
  }

  function selectInputNumber(e: ChangeEvent<HTMLSelectElement> | null) {
    setInputValue(e ? e.target.value : "");
  }

  function defineTableSize(): RAMTableSizes {
    if (isTwoK) {
      return RAMTableSizes.Big;
    } else if (isFullHd || isNotFullHd || isSmallDisplay) {
      return RAMTableSizes.Medium;
    } else if (isTablet) {
      return RAMTableSizes.XMedium;
    } else if (isMobile) {
      return RAMTableSizes.Small;
    } else if (isSmallMobile) {
      return RAMTableSizes.Smaller;
    } else {
      return RAMTableSizes.XSmall;
    }
  }

  function defineButtonSize(): ButtonSizes | undefined {
    if (isFullHd || isTwoK) {
      return ButtonSizes.Big;
    } else if (isTablet) {
      return ButtonSizes.Medium;
    } else if (isMobile) {
      return ButtonSizes.Small;
    }
  }

  function handleShowTheory() {
    setShowTheory((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      {showTheory && (
        <WindowForTheory text={dramTheory} hideFunc={handleShowTheory} />
      )}
      <TableContainer size={defineTableSize()}>
        <Table
          showChecking={showChecking}
          checkingColIndex={checkingColIndex}
          checkingRowIndex={checkingRowIndex}
          zeroValues={zeroValues}
          values={values}
          showZeroValues={showZeroValues}
          changeValue={changeValue}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
          numberOfBlock={numberOfBlock}
        />
      </TableContainer>
      <div className={styles.controls_container}>
        <div className={styles.input_container}>
          <span>Ввод значения</span>
          <Select
            options={inputNumbers}
            onSelect={selectInputNumber}
            resetButton={false}
          />
          <span>В двоичном виде</span>
          <input readOnly value={inputValue} className={styles.bin_value} />
          <Button
            text={timer.current ? "Прервать" : "Ввести"}
            onClickFunction={timer.current ? stopInput : checkingValues}
            disabled={inputValue === ""}
          />
        </div>
        <div className={styles.color_container}>
          <ColorContainer>
            <ColorBlock
              title="-занятая ячейка памяти"
              color="rgba(255, 0, 0, 0.5)"
            />
            <ColorBlock
              title="-свободная ячейка памяти"
              color="rgba(0, 255, 0, 0.5)"
            />
            <ColorBlock
              title="-ячейка памяти текущей сессии"
              color="rgba(208, 132, 9, 0.4)"
            />
            <ColorBlock
              title="-проверяемая ячейка памяти"
              color="rgba(67, 149, 217, 0.4)"
            />
          </ColorContainer>
        </div>
        <div className={styles.button_container}>
          <Button
            text="Раскрасить"
            onClickFunction={showOrHideZeroValues}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Перегенерировать"
            onClickFunction={fillArray}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Дефрагментировать"
            onClickFunction={sortValues}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Удалить выбранное"
            onClickFunction={deleteSelectedValues}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Показать теорию"
            onClickFunction={handleShowTheory}
            size={defineButtonSize()}
          />
        </div>
      </div>
    </div>
  );
}

export default DynamicRAMPage;
