import React, {
  ChangeEvent,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "@components/Button/Button";
import ColorBlock from "@components/ColorContainer/ColorBlock/ColorBlock";
import ColorContainer from "@components/ColorContainer/ColorContainer";
import Select from "@components/Select/Select";
import Table from "@components/Table/Table/Table";
import TableContainer from "@components/Table/TableContainer/TableContainer";
import WindowForTheory from "@components/WindowForTheory/WindowForTheory";
import { RAMValuesChangedInCurrentSessionContext } from "@context/RAMValuesChangedInCurrentSessionContext";
import { ButtonSizes } from "@enums/ButtonSizes";
import { RAMTableSizes } from "@enums/RAMTableSizes";
import useMatchMedia from "@hooks/useMatchMedia";
import { IBlockForAnalysis } from "@interfaces/IBlocksForAnalysis";
import { IRAMValue } from "@interfaces/IRAMValue";
import { IRAMValues } from "@interfaces/IRAMValues";
import { getRandomNumber } from "@scripts/scripts";

import styles from "./page.module.scss";
import { ramTheory } from "./ramTheory";

interface IInputNumber {
  title: number;
  value: string;
}

function RAMPage(): ReactElement {
  const timer = useRef<number | undefined>();
  const [checkingBlock, setCheckingBlock] = useState<number>(0);
  const [firstBlockvalues, setFirstBlockValues] = useState<string[][]>([]);
  const [secondBlockvalues, setSecondBlockValues] = useState<string[][]>([]);
  const [thirdBlockvalues, setThirdBlockValues] = useState<string[][]>([]);
  const [fourthBlockvalues, setFourthBlockValues] = useState<string[][]>([]);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const [zeroValuesOfFirstBlock, setZeroValuesOfFirstBlock] = useState<
    IRAMValues[]
  >([]);
  const [zeroValuesOfSecondBlock, setZeroValuesOfSecondBlock] = useState<
    IRAMValues[]
  >([]);
  const [zeroValuesOfThirdBlock, setZeroValuesOfThirdBlock] = useState<
    IRAMValues[]
  >([]);
  const [zeroValuesOfFourthBlock, setZeroValuesOfFourthBlock] = useState<
    IRAMValues[]
  >([]);
  const [showZeroValues, setShowZeroValues] = useState<boolean>(false);
  const [selectedValuesOfFirstBlock, setSelectedValuesOfFirstBlock] = useState<
    IRAMValues[]
  >([]);
  const [selectedValuesOSecondBlock, setSelectedValuesOfSecondBlock] = useState<
    IRAMValues[]
  >([]);
  const [selectedValuesOfThirdBlock, setSelectedValuesOfThirdBlock] = useState<
    IRAMValues[]
  >([]);
  const [selectedValuesOfFourthBlock, setSelectedValuesOfFourthBlock] =
    useState<IRAMValues[]>([]);
  const [valuesChangedInCurrentSession, setValuesChangedInCurrentSession] =
    useState<IRAMValue[]>([]);
  const [numberOfFirstBlock] = useState<number>(1);
  const [numberOfSecondBlock] = useState<number>(2);
  const [numberOfThirdBlock] = useState<number>(3);
  const [numberOfFourthBlock] = useState<number>(4);
  const [inputNumbers, setInputNumbers] = useState<IInputNumber[]>([]);
  const [checkingRowIndex, setCheckingRowIndex] = useState<number>(0);
  const [checkingColIndex, setCheckingColIndex] = useState<number>(0);
  const [showChecking, setShowChecking] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [delay] = useState<number>(300);
  const [lengthOfTheBlocks] = useState<number>(7);
  const { isTablet, isMobile, isFullHd, isTwoK, isNotFullHd, isSmallDisplay } =
    useMatchMedia();
  const [analysisBlock, setAnalysisBlock] = useState<number>(0);
  const [quantityOfFreeCells, setQuantityOfFreeCells] = useState<number>(0);
  const [quantityOfOccupiedCells, setQuantityOfOccupiedCells] =
    useState<number>(0);
  const [blocksForAnalysis] = useState<IBlockForAnalysis[]>([
    { title: `Блок памяти ${numberOfFirstBlock}`, value: numberOfFirstBlock },
    { title: `Блок памяти ${numberOfSecondBlock}`, value: numberOfSecondBlock },
    { title: `Блок памяти ${numberOfThirdBlock}`, value: numberOfThirdBlock },
    { title: `Блок памяти ${numberOfFourthBlock}`, value: numberOfFourthBlock },
  ]);

  useEffect(() => {
    startFillArray();
    fillInputNumbers();
  }, []);

  useEffect(() => {
    if (showChecking) {
      startCheckingValues();
    }
  }, [checkingBlock]);

  useEffect(() => {
    if (firstBlockvalues) {
      findZeroValues(firstBlockvalues, setZeroValuesOfFirstBlock);
    }
    if (secondBlockvalues) {
      findZeroValues(secondBlockvalues, setZeroValuesOfSecondBlock);
    }
    if (thirdBlockvalues) {
      findZeroValues(thirdBlockvalues, setZeroValuesOfThirdBlock);
    }
    if (fourthBlockvalues) {
      findZeroValues(fourthBlockvalues, setZeroValuesOfFourthBlock);
    }
  }, [
    firstBlockvalues,
    secondBlockvalues,
    thirdBlockvalues,
    fourthBlockvalues,
  ]);

  useEffect(() => {
    if (analysisBlock > 0) {
      if (analysisBlock === numberOfFirstBlock) {
        blockAnalysis(firstBlockvalues);
      } else if (analysisBlock === numberOfSecondBlock) {
        blockAnalysis(secondBlockvalues);
      } else if (analysisBlock === numberOfThirdBlock) {
        blockAnalysis(thirdBlockvalues);
      } else if (analysisBlock === numberOfFourthBlock) {
        blockAnalysis(fourthBlockvalues);
      }
    }
  }, [
    analysisBlock,
    firstBlockvalues,
    secondBlockvalues,
    thirdBlockvalues,
    fourthBlockvalues,
  ]);

  function blockAnalysis(values: string[][]) {
    let quantityOfFree: number = 0;
    let quantityOfOccupied: number = 0;

    for (let i = 0; i < values.length; i++) {
      quantityOfFree += values[i].filter((item) => item === "0000").length;
      quantityOfOccupied += values[i].filter((item) => item !== "0000").length;
    }

    setQuantityOfFreeCells(quantityOfFree);
    setQuantityOfOccupiedCells(quantityOfOccupied);
  }

  function fillInputNumbers() {
    const result: IInputNumber[] = new Array(15);

    for (let i = 0; i < result.length; i++) {
      result[i] = { title: i + 1, value: (i + 1).toString(2).padStart(4, "0") };
    }

    setInputNumbers(result);
  }

  function startFillArray() {
    fillArray(setFirstBlockValues);
    fillArray(setSecondBlockValues);
    fillArray(setThirdBlockValues);
    fillArray(setFourthBlockValues);
  }

  function fillArray(setValues: (e: SetStateAction<string[][]>) => void) {
    let result: string[][] = [];

    for (let i = 0; i < lengthOfTheBlocks; i++) {
      result[i] = new Array(lengthOfTheBlocks);

      for (let j = 0; j < result[i].length; j++) {
        result[i][j] = getRandomNumber(0, 15).toString(2).padStart(4, "0");
      }
    }

    setShowZeroValues(false);
    setValuesChangedInCurrentSession([]);
    setValues(result);
  }

  function findZeroValues(
    values: string[][],
    setZeroValues: (e: SetStateAction<IRAMValues[]>) => void,
  ) {
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

  function startDeleteSelectedValues() {
    if (selectedValuesOfFirstBlock.length) {
      deleteSelectedValues(
        firstBlockvalues,
        selectedValuesOfFirstBlock,
        setSelectedValuesOfFirstBlock,
        setFirstBlockValues,
      );
    }
    if (selectedValuesOSecondBlock.length) {
      deleteSelectedValues(
        secondBlockvalues,
        selectedValuesOSecondBlock,
        setSelectedValuesOfSecondBlock,
        setSecondBlockValues,
      );
    }
    if (selectedValuesOfThirdBlock.length) {
      deleteSelectedValues(
        thirdBlockvalues,
        selectedValuesOfThirdBlock,
        setSelectedValuesOfThirdBlock,
        setThirdBlockValues,
      );
    }
    if (selectedValuesOfFourthBlock.length) {
      deleteSelectedValues(
        fourthBlockvalues,
        selectedValuesOfFourthBlock,
        setSelectedValuesOfFourthBlock,
        setFourthBlockValues,
      );
    }
  }

  function deleteSelectedValues(
    values: string[][],
    selectedValues: IRAMValues[],
    setSelectedValues: (e: SetStateAction<IRAMValues[]>) => void,
    setValues: (e: SetStateAction<string[][]>) => void,
  ) {
    const array = [...values];

    for (let i = 0; i < selectedValues.length; i++) {
      array[selectedValues[i].rowIndex][selectedValues[i].colIndex] = "0000";
    }

    setSelectedValues([]);

    setValues(values);
  }

  function startChangeValue(
    rowIndex: number,
    colIndex: number,
    value: string,
    numberOfBlock: number,
  ) {
    if (numberOfBlock === 1) {
      changeValue(
        rowIndex,
        colIndex,
        value,
        firstBlockvalues,
        setFirstBlockValues,
      );
    } else if (numberOfBlock === 2) {
      changeValue(
        rowIndex,
        colIndex,
        value,
        secondBlockvalues,
        setSecondBlockValues,
      );
    } else if (numberOfBlock === 3) {
      changeValue(
        rowIndex,
        colIndex,
        value,
        thirdBlockvalues,
        setThirdBlockValues,
      );
    } else if (numberOfBlock === 4) {
      changeValue(
        rowIndex,
        colIndex,
        value,
        fourthBlockvalues,
        setFourthBlockValues,
      );
    }
  }

  function changeValue(
    rowIndex: number,
    colIndex: number,
    value: string,
    values: string[][],
    setValues: (e: SetStateAction<string[][]>) => void,
  ) {
    const arr = [...values];

    arr[rowIndex][colIndex] = value;

    setValues(arr);
  }

  function showOrHideZeroValues() {
    setShowZeroValues((prev) => !prev);
  }

  function startCheckingValues() {
    if (checkingBlock === 0) {
      checkingValues(numberOfFirstBlock, firstBlockvalues, setFirstBlockValues);
    } else if (checkingBlock === 1) {
      checkingValues(
        numberOfSecondBlock,
        secondBlockvalues,
        setSecondBlockValues,
      );
    } else if (checkingBlock === 2) {
      checkingValues(numberOfThirdBlock, thirdBlockvalues, setThirdBlockValues);
    } else if (checkingBlock === 3) {
      checkingValues(
        numberOfFourthBlock,
        fourthBlockvalues,
        setFourthBlockValues,
      );
    }
  }

  function checkingValues(
    numberOfBlock: number,
    values: string[][],
    setValues: (e: SetStateAction<string[][]>) => void,
  ) {
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
      } else if (colIndex === arr[0].length && checkingBlock === 3) {
        alert("Нет свободных ячеек");
        stopInput();
        return;
      } else if (colIndex === arr[0].length && checkingBlock !== 3) {
        setCheckingBlock(checkingBlock + 1);

        clearInterval(timer.current);

        return;
      } else {
        setCheckingColIndex(colIndex);
        setCheckingRowIndex(rowIndex);
        rowIndex++;

        if (rowIndex === arr.length) {
          rowIndex = 0;
          colIndex++;
        }
      }
    }, delay);
  }

  function startSortValuesToTheEnd() {
    sortValuesToTheEnd(
      firstBlockvalues,
      zeroValuesOfFirstBlock,
      setFirstBlockValues,
    );
    sortValuesToTheEnd(
      secondBlockvalues,
      zeroValuesOfSecondBlock,
      setSecondBlockValues,
    );
    sortValuesToTheEnd(
      thirdBlockvalues,
      zeroValuesOfThirdBlock,
      setThirdBlockValues,
    );
    sortValuesToTheEnd(
      fourthBlockvalues,
      zeroValuesOfFourthBlock,
      setFourthBlockValues,
    );
  }

  function sortValuesToTheEnd(
    values: string[][],
    zeroValues: IRAMValues[],
    setValues: (e: SetStateAction<string[][]>) => void,
  ) {
    const notZeroValues: string[] = new Array(
      lengthOfTheBlocks * lengthOfTheBlocks,
    );
    const result: string[][] = new Array(lengthOfTheBlocks);

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
      result[i] = new Array(lengthOfTheBlocks);

      for (let j = 0; j < result[i].length; j++, k++) {
        result[i][j] = notZeroValues[k];
      }
    }
    setValuesChangedInCurrentSession([]);
    setValues(result);
  }

  function sortValuesToTheStart() {
    let index: number = 0;
    const quantityOfZero: number =
      zeroValuesOfFirstBlock.length +
      zeroValuesOfSecondBlock.length +
      zeroValuesOfThirdBlock.length +
      zeroValuesOfFourthBlock.length;
    const resultFirstArray: string[][] = new Array(lengthOfTheBlocks);
    const resultSecondArray: string[][] = new Array(lengthOfTheBlocks);
    const resultThirdArray: string[][] = new Array(lengthOfTheBlocks);
    const resultFourthArray: string[][] = new Array(lengthOfTheBlocks);
    const values: string[] = [];

    for (let i = 0; i < lengthOfTheBlocks; i++) {
      resultFirstArray[i] = new Array(lengthOfTheBlocks);
      resultSecondArray[i] = new Array(lengthOfTheBlocks);
      resultThirdArray[i] = new Array(lengthOfTheBlocks);
      resultFourthArray[i] = new Array(lengthOfTheBlocks);
    }

    for (let i = 0; i < quantityOfZero; i++) {
      values.push("0000");
    }

    firstBlockvalues.map((item) => {
      const arr = item.filter((item) => item !== "0000");
      values.push(...arr);
    });
    secondBlockvalues.map((item) => {
      const arr = item.filter((item) => item !== "0000");
      values.push(...arr);
    });
    thirdBlockvalues.map((item) => {
      const arr = item.filter((item) => item !== "0000");
      values.push(...arr);
    });
    fourthBlockvalues.map((item) => {
      const arr = item.filter((item) => item !== "0000");
      values.push(...arr);
    });

    for (let i = 0; i < resultFirstArray[0].length; i++) {
      for (let j = 0; j < resultFirstArray.length; j++) {
        resultFirstArray[j][i] = values[index];
        index++;
      }
    }

    for (let i = 0; i < resultSecondArray[0].length; i++) {
      for (let j = 0; j < resultSecondArray.length; j++) {
        resultSecondArray[j][i] = values[index];
        index++;
      }
    }

    for (let i = 0; i < resultThirdArray[0].length; i++) {
      for (let j = 0; j < resultThirdArray.length; j++) {
        resultThirdArray[j][i] = values[index];
        index++;
      }
    }

    for (let i = 0; i < resultFourthArray[0].length; i++) {
      for (let j = 0; j < resultFourthArray.length; j++) {
        resultFourthArray[j][i] = values[index];
        index++;
      }
    }

    setFirstBlockValues(resultFirstArray);
    setSecondBlockValues(resultSecondArray);
    setThirdBlockValues(resultThirdArray);
    setFourthBlockValues(resultFourthArray);
  }

  function stopInput() {
    clearInterval(timer.current);
    timer.current = undefined;
    setCheckingBlock(0);
    setShowChecking(false);
  }

  function selectInputNumber(e: ChangeEvent<HTMLSelectElement> | null) {
    setInputValue(e ? e.target.value : "");
  }

  function selectAnalysisBlock(e: ChangeEvent<HTMLSelectElement> | null) {
    setAnalysisBlock(e ? Number(e.target.value) : 0);
  }

  function defineTableSize(): RAMTableSizes {
    if (isTwoK) {
      return RAMTableSizes.Medium;
    } else if (isFullHd || isSmallDisplay || isNotFullHd) {
      return RAMTableSizes.XMedium;
    } else if (isTablet || isMobile) {
      return RAMTableSizes.Small;
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
        <WindowForTheory text={ramTheory} hideFunc={handleShowTheory} />
      )}
      <div className={styles.ram_container}>
        <div className={styles.ram_row}>
          <TableContainer size={defineTableSize()}>
            <RAMValuesChangedInCurrentSessionContext.Provider
              value={{
                valuesChangedInCurrentSession: valuesChangedInCurrentSession,
              }}
            >
              <Table
                checkingColIndex={checkingColIndex}
                checkingRowIndex={checkingRowIndex}
                values={firstBlockvalues}
                zeroValues={zeroValuesOfFirstBlock}
                showZeroValues={showZeroValues}
                showChecking={showChecking && checkingBlock === 0}
                changeValue={startChangeValue}
                selectedValues={selectedValuesOfFirstBlock}
                setSelectedValues={setSelectedValuesOfFirstBlock}
                numberOfBlock={numberOfFirstBlock}
              />
            </RAMValuesChangedInCurrentSessionContext.Provider>
          </TableContainer>
          <TableContainer size={defineTableSize()}>
            <RAMValuesChangedInCurrentSessionContext.Provider
              value={{
                valuesChangedInCurrentSession: valuesChangedInCurrentSession,
              }}
            >
              <Table
                checkingColIndex={checkingColIndex}
                checkingRowIndex={checkingRowIndex}
                values={secondBlockvalues}
                zeroValues={zeroValuesOfSecondBlock}
                showZeroValues={showZeroValues}
                showChecking={showChecking && checkingBlock === 1}
                changeValue={startChangeValue}
                selectedValues={selectedValuesOSecondBlock}
                setSelectedValues={setSelectedValuesOfSecondBlock}
                numberOfBlock={numberOfSecondBlock}
              />
            </RAMValuesChangedInCurrentSessionContext.Provider>
          </TableContainer>
        </div>
        <div className={styles.ram_row}>
          <TableContainer size={defineTableSize()}>
            <RAMValuesChangedInCurrentSessionContext.Provider
              value={{
                valuesChangedInCurrentSession: valuesChangedInCurrentSession,
              }}
            >
              <Table
                checkingColIndex={checkingColIndex}
                checkingRowIndex={checkingRowIndex}
                values={thirdBlockvalues}
                zeroValues={zeroValuesOfThirdBlock}
                showZeroValues={showZeroValues}
                showChecking={showChecking && checkingBlock === 2}
                changeValue={startChangeValue}
                selectedValues={selectedValuesOfThirdBlock}
                setSelectedValues={setSelectedValuesOfThirdBlock}
                numberOfBlock={numberOfThirdBlock}
              />
            </RAMValuesChangedInCurrentSessionContext.Provider>
          </TableContainer>

          <TableContainer size={defineTableSize()}>
            <RAMValuesChangedInCurrentSessionContext.Provider
              value={{
                valuesChangedInCurrentSession: valuesChangedInCurrentSession,
              }}
            >
              <Table
                checkingColIndex={checkingColIndex}
                checkingRowIndex={checkingRowIndex}
                values={fourthBlockvalues}
                zeroValues={zeroValuesOfFourthBlock}
                showZeroValues={showZeroValues}
                showChecking={showChecking && checkingBlock === 3}
                changeValue={startChangeValue}
                selectedValues={selectedValuesOfFourthBlock}
                setSelectedValues={setSelectedValuesOfFourthBlock}
                numberOfBlock={numberOfFourthBlock}
              />
            </RAMValuesChangedInCurrentSessionContext.Provider>
          </TableContainer>
        </div>
      </div>
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
            onClickFunction={timer.current ? stopInput : startCheckingValues}
            disabled={inputValue === ""}
          />
        </div>
        <div className={styles.check_values_container}>
          <div className={styles.select_container}>
            <span>Анализ блока памяти</span>
            <Select
              onSelect={selectAnalysisBlock}
              resetButton={false}
              options={blocksForAnalysis}
            />
          </div>
          {analysisBlock > 0 && (
            <div className={styles.info_about_cells_container}>
              <div className={styles.free_cells}>
                Свободно ячеек: {quantityOfFreeCells}
              </div>
              <div className={styles.not_free_cells}>
                Занято ячеек: {quantityOfOccupiedCells}
              </div>
            </div>
          )}
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
            onClickFunction={startFillArray}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Дефрагментировать"
            onClickFunction={startSortValuesToTheEnd}
            size={defineButtonSize()}
            disabled={timer.current !== undefined}
          />
          <Button
            text="Дефрагментировать в начало"
            onClickFunction={sortValuesToTheStart}
            size={defineButtonSize()}
          />
          <Button
            text="Удалить выбранное"
            onClickFunction={startDeleteSelectedValues}
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

export default RAMPage;
