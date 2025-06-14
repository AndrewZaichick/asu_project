import { ReactElement, SetStateAction, useEffect, useState } from "react";

import Button from "@components/Button/Button";
import CacheContainer from "@components/Cache/CacheContainer/CacheContainer";
import Cache from "@components/Cache/CacheTable/Cache";
import Select from "@components/Select/Select";
import Table from "@components/Table/Table/Table";
import TableContainer from "@components/Table/TableContainer/TableContainer";
import TextInput from "@components/TextInput/TextInput";
import WindowForTheory from "@components/WindowForTheory/WindowForTheory";
import { CacheTableSizes } from "@enums/CacheTableSizes";
import { RAMTableSizes } from "@enums/RAMTableSizes";
import useMatchMedia from "@hooks/useMatchMedia";
import { getRandomNumber } from "@scripts/scripts";

import { cacheTheory } from "./cacheTheory";
import styles from "./page.module.scss";

interface IOption {
  title: string;
  value: string;
}

interface IValuesInLFU {
  value: string;
  quantityOfReq: number;
}

interface IValuesInLRU {
  value: string;
  lastTimeOfReq: number;
}

enum Type {
  L3 = "L3",
  L2 = "L2",
  RAM = "RAM",
}

function CachePage(): ReactElement {
  const [valuesOfL3Cache, setValuesOfL3Cache] = useState<string[][]>([]);
  const [valuesOfL2Cache, setValuesOfL2Cache] = useState<string[][]>([]);
  const [ramValues, setRamValues] = useState<string[][]>([]);
  const [inputedValue, setInputedValue] = useState<number | null>(null);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>("");
  const [valueWasFoundedNotInL2, setValueWasFoundedNotInL2] =
    useState<boolean>(false);
  const [valueWasFoundedInL2, setValueWasFoundedInL2] =
    useState<boolean>(false);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const [valuesForLRU, setValuesForLRU] = useState<IValuesInLRU[]>([]);
  const [valuesForLFU, setValuesForLFU] = useState<IValuesInLFU[]>([]);
  const [checkingRowIndex, setCheckingRowIndex] = useState<number>(0);
  const [checkingColIndex, setCheckingColIndex] = useState<number>(0);
  const [checkingType, setCheckingType] = useState<Type>();
  const [globalSearchWasFinished, setGlobalSearchWasFinished] =
    useState<boolean>(true);
  const [wasStepOfSearchFinished, setWasStepOfSearchFinished] =
    useState<boolean>(true);
  const [
    deletedValueIfAllValuesContainsInCache,
    setDeletedValueIfAllValuesContainsInCache,
  ] = useState<string>("");
  const {
    isTablet,
    isMobile,
    isFullHd,
    isTwoK,
    isSmallMobile,
    isNotFullHd,
    isSmallDisplay,
  } = useMatchMedia();
  const [searchAlreadyUsedValuesFinished, setSearchAlreadyUsedValuesFinished] =
    useState<boolean>(true);
  const [
    allValuesAlreadyUsedContainsInCache,
    setAllValuesAlreadyUsedContainsInCache,
  ] = useState<boolean>(false);
  const [algorithms] = useState<IOption[]>([
    { title: "FIFO", value: "FIFO" },
    { title: "LFU", value: "LFU" },
    { title: "LRU", value: "LRU" },
  ]);

  useEffect(() => {
    fillValues(setValuesOfL3Cache, 3, true);
    fillValues(setValuesOfL2Cache, 1, true);
    fillRamValues();
  }, []);

  useEffect(() => {
    if (
      (!valueWasFoundedInL2 && valueWasFoundedNotInL2) ||
      (valueWasFoundedInL2 && !valueWasFoundedNotInL2)
    ) {
      if (selectedAlgorithm === "LRU") {
        addValueToLRUValues();
      } else if (selectedAlgorithm === "LFU") {
        addValueToLFUValues();
      }
      setCheckingType(undefined);
      setSearchAlreadyUsedValuesFinished(true);
      setGlobalSearchWasFinished(true);
    }
  }, [valueWasFoundedInL2, valueWasFoundedNotInL2]);

  useEffect(() => {
    if (
      wasStepOfSearchFinished &&
      valueWasFoundedInL2 === false &&
      valueWasFoundedNotInL2 === false
    ) {
      setWasStepOfSearchFinished(false);
      setSearchAlreadyUsedValuesFinished(false);
      if (checkingType === Type.L2) {
        setCheckingType(Type.L3);
      } else if (checkingType === Type.L3) {
        setCheckingType(Type.RAM);
      }
    }
  }, [wasStepOfSearchFinished]);

  useEffect(() => {
    isAllValuesOfLRUOrLFUContainsINL2Cache();
  }, [valuesForLFU, valuesForLRU]);

  useEffect(() => {
    if (checkingType !== Type.RAM) {
      if (selectedAlgorithm === "FIFO") {
        startSearch();
      } else {
        startSearchAlreadyUsedValues();
      }
    } else {
      startSearch();
    }
  }, [checkingType]);

  useEffect(() => {
    if (
      searchAlreadyUsedValuesFinished &&
      !valueWasFoundedInL2 &&
      !valueWasFoundedNotInL2
    ) {
      startSearch();
    }
  }, [searchAlreadyUsedValuesFinished]);

  function findDeletedValue() {
    const arr =
      selectedAlgorithm === "LRU" ? [...valuesForLRU] : [...valuesForLFU];
    let valueContains: boolean = false;

    for (let i = arr.length - 1; i >= 0; i--) {
      const searchedValue = arr[i].value;
      valueContains = true;

      for (let j = 0; j < valuesOfL2Cache.length; j++) {
        valueContains = valuesOfL2Cache[j][0] === searchedValue;

        if (valueContains) {
          setDeletedValueIfAllValuesContainsInCache(searchedValue);
          return;
        }
      }
    }
  }

  function fillRamValues() {
    const result: string[][] = new Array(10);

    for (let i = 0, number = 1; i < result.length; i++) {
      result[i] = new Array(10);

      for (let j = 0; j < result[i].length; j++, number++) {
        result[i][j] = number.toString();
      }
    }

    setRamValues(result);
  }

  function isAllValuesOfLRUOrLFUContainsINL2Cache() {
    const arr = selectedAlgorithm === "LRU" ? valuesForLRU : valuesForLFU;
    let valuesContains: boolean = true;

    if (arr.length === 0) {
      valuesContains = false;
    } else {
      for (let i = 0; i < valuesOfL2Cache.length; i++) {
        const checkedValue: string = valuesOfL2Cache[i][0];

        if (arr.filter((item) => item.value === checkedValue).length === 0) {
          valuesContains = false;
          break;
        }
      }
    }

    if (valuesContains) {
      findDeletedValue();
    }

    setAllValuesAlreadyUsedContainsInCache(valuesContains);
  }

  function fillAllCache() {
    fillValues(setValuesOfL3Cache, 3, false);
    fillValues(setValuesOfL2Cache, 1, false);
  }

  function clearAllCache() {
    fillValues(setValuesOfL3Cache, 3, true);
    fillValues(setValuesOfL2Cache, 1, true);
    setValueWasFoundedInL2(false);
    setValueWasFoundedNotInL2(false);
  }

  function addValueToLFUValues() {
    if (
      valuesForLFU.filter((item) => item.value === String(inputedValue))
        .length === 0
    ) {
      const arr = [...valuesForLFU];
      arr.push({ value: String(inputedValue), quantityOfReq: 1 });

      sortLFUValues(arr);
    } else {
      const arr = [...valuesForLFU];
      arr.map((item) => {
        if (item.value === String(inputedValue)) {
          item.quantityOfReq++;
        }
      });

      sortLFUValues(arr);
    }
  }

  function addValueToLRUValues() {
    if (
      valuesForLRU.filter((item) => item.value === String(inputedValue))
        .length === 0
    ) {
      const arr = [...valuesForLRU];
      arr.push({ value: String(inputedValue), lastTimeOfReq: Date.now() });

      sortLRUValues(arr);
    } else {
      const arr = [...valuesForLRU];
      arr.map((item) => {
        if (item.value === String(inputedValue)) {
          item.lastTimeOfReq = Date.now();
        }
      });

      sortLRUValues(arr);
    }
  }

  function sortLRUValues(arr: IValuesInLRU[]) {
    const values = [...arr];

    for (let i = 0; i < values.length; i++) {
      let maxIndex: number = i;

      for (let j = maxIndex; j < values.length; j++) {
        if (values[maxIndex].lastTimeOfReq < values[j].lastTimeOfReq) {
          maxIndex = j;
        }
      }

      let temp: IValuesInLRU = values[maxIndex];
      values[maxIndex] = values[i];
      values[i] = temp;
    }

    setValuesForLRU(values);
  }

  function sortLFUValues(arr: IValuesInLFU[]) {
    const values = [...arr];

    for (let i = 0; i < values.length; i++) {
      let maxIndex: number = i;

      for (let j = maxIndex; j < values.length; j++) {
        if (values[maxIndex].quantityOfReq < values[j].quantityOfReq) {
          maxIndex = j;
        }
      }

      let temp: IValuesInLFU = values[maxIndex];
      values[maxIndex] = values[i];
      values[i] = temp;
    }

    setValuesForLFU(values);
  }

  function fillValues(
    setValues: (e: SetStateAction<string[][]>) => void,
    quantityOfColumns: number,
    isEmpty: boolean,
  ) {
    const result: string[][] = new Array(10);

    for (let i = 0; i < result.length; i++) {
      result[i] = new Array(quantityOfColumns);

      for (let j = 0; j < result[i].length; j++) {
        result[i][j] = isEmpty ? "0" : getRandomNumber(1, 100).toString();
      }
    }

    setValues(result);
  }

  function selectAlgorithm(e: React.ChangeEvent<HTMLSelectElement> | null) {
    setSelectedAlgorithm(e ? e.target.value : "");
  }

  function inputValue(e: React.ChangeEvent<HTMLInputElement> | null) {
    const value: string = String(e?.target.value);
    const regex: RegExp = /^\d{1,}$/;

    if (regex.test(value)) {
      const number: number = Number(value);

      if (checkInputedValue(number)) {
        setInputedValue(number);
      } else {
        alert("Число должно быть в диапазоне [1:100]");
        setInputedValue(null);
      }
    } else {
      setInputedValue(null);
    }
  }

  function checkInputedValue(value: number): boolean {
    return value >= 1 && value <= 100 ? true : false;
  }

  function selectStartType() {
    setCheckingType(Type.L2);
    setValueWasFoundedInL2(false);
    setValueWasFoundedNotInL2(false);
    setWasStepOfSearchFinished(false);
    setGlobalSearchWasFinished(false);
    setSearchAlreadyUsedValuesFinished(false);
  }

  function startSearchAlreadyUsedValues() {
    if (selectedAlgorithm === "LRU") {
      if (checkingType === Type.L2) {
        checkIfValueContainsInCache(valuesForLRU, valuesOfL2Cache);
      } else if (checkingType === Type.L3) {
        checkIfValueContainsInCache(valuesForLRU, valuesOfL3Cache);
      }
    }
    if (selectedAlgorithm === "LFU") {
      if (checkingType === Type.L2) {
        checkIfValueContainsInCache(valuesForLFU, valuesOfL2Cache);
      } else if (checkingType === Type.L3) {
        checkIfValueContainsInCache(valuesForLFU, valuesOfL3Cache);
      }
    }
  }

  function startSearch() {
    if (checkingType === Type.L2) {
      search(valuesOfL2Cache);
    } else if (checkingType === Type.L3) {
      search(valuesOfL3Cache);
    } else if (checkingType === Type.RAM) {
      search(ramValues);
    }
  }

  function inputNumberToCache() {
    if (valueWasFoundedInL2) {
      return;
    }

    const resultOfL3: string[][] = new Array(10);
    const resultOfL2: string[][] = new Array(10);
    const valuesAlreadyUsed =
      selectedAlgorithm === "LRU" ? [...valuesForLRU] : [...valuesForLFU];

    let valuesOfL3: string[] = new Array(
      valuesOfL3Cache.length * valuesOfL3Cache[0].length,
    );
    let valuesOfL2: string[] = new Array(
      valuesOfL2Cache.length * valuesOfL2Cache[0].length,
    );
    let deletedValue: string = allValuesAlreadyUsedContainsInCache
      ? deletedValueIfAllValuesContainsInCache
      : "";

    for (
      let i = 0, index = 0, valueWasDeleted = false;
      i < valuesOfL2Cache.length;
      i++
    ) {
      for (let j = 0; j < valuesOfL2Cache[i].length; j++) {
        if (i === 0 && j === 0 && selectedAlgorithm === "FIFO") {
          deletedValue = valuesOfL2Cache[i][j];
          continue;
        } else {
          if (selectedAlgorithm === "FIFO") {
            valuesOfL2[index] = valuesOfL2Cache[i][j];
            index++;
          } else {
            if (!allValuesAlreadyUsedContainsInCache) {
              if (
                valuesAlreadyUsed.filter(
                  (item) => item.value === valuesOfL2Cache[i][j],
                ).length === 0 &&
                !valueWasDeleted
              ) {
                deletedValue = valuesOfL2Cache[i][j];
                valueWasDeleted = true;
                continue;
              }
              valuesOfL2[index] = valuesOfL2Cache[i][j];
              index++;
            } else {
              if (valuesOfL2Cache[i][j] === deletedValue) {
                continue;
              } else {
                valuesOfL2[index] = valuesOfL2Cache[i][j];
                index++;
              }
            }
          }
        }
      }
    }

    valuesOfL2[valuesOfL2.length - 1] = (inputedValue as number).toString();

    for (
      let i = 0, index = 0, valueWasDeleted = false;
      i < valuesOfL3Cache.length;
      i++
    ) {
      for (let j = 0; j < valuesOfL3Cache[i].length; j++) {
        if (i === 0 && j === 0 && selectedAlgorithm === "FIFO") {
          continue;
        } else {
          if (selectedAlgorithm === "FIFO") {
            valuesOfL3[index] = valuesOfL3Cache[i][j];
            index++;
          } else {
            if (
              valuesAlreadyUsed.filter(
                (item) => item.value === valuesOfL3Cache[i][j],
              ).length === 0 &&
              !valueWasDeleted
            ) {
              valueWasDeleted = true;
              continue;
            }
            valuesOfL3[index] = valuesOfL3Cache[i][j];
            index++;
          }
        }
      }
    }

    valuesOfL3[valuesOfL3.length - 1] = deletedValue;

    for (let i = 0; i < resultOfL2.length; i++) {
      resultOfL2[i] = new Array(1);
      resultOfL2[i][0] = valuesOfL2[i];
    }

    for (let i = 0, index = 0; i < resultOfL3.length; i++) {
      resultOfL3[i] = new Array(3);

      for (let j = 0; j < resultOfL3[i].length; j++, index++) {
        resultOfL3[i][j] = valuesOfL3[index];
      }
    }

    setValuesOfL2Cache(resultOfL2);
    setValuesOfL3Cache(resultOfL3);
  }

  function checkIfValueContainsInCache(
    valuesAlreadyUsed: IValuesInLFU[] | IValuesInLRU[],
    valuesForSearch: string[][],
  ) {
    setCheckingColIndex(0);
    setCheckingRowIndex(0);

    const arr = [...valuesForSearch];
    let indexAlreadyUsed: number = 0;
    let indexForSearch: number = 0;

    if (valuesAlreadyUsed.length === 0) {
      setSearchAlreadyUsedValuesFinished(true);
      return;
    }

    const id: number = setInterval(() => {
      const foundedIndex: number = arr[indexForSearch].indexOf(
        valuesAlreadyUsed[indexAlreadyUsed].value,
      );

      if (foundedIndex !== -1) {
        setCheckingColIndex(foundedIndex);
        setCheckingRowIndex(indexForSearch);

        if (
          String(inputedValue) === valuesAlreadyUsed[indexAlreadyUsed].value
        ) {
          if (checkingType === Type.L2) {
            setValueWasFoundedInL2(true);
          } else {
            setValueWasFoundedNotInL2(true);
          }

          clearInterval(id);
          setSearchAlreadyUsedValuesFinished(true);

          return;
        }
      }

      indexForSearch++;

      if (indexForSearch >= arr.length) {
        indexAlreadyUsed++;
        indexForSearch = 0;
      }

      if (indexAlreadyUsed >= valuesAlreadyUsed.length) {
        setSearchAlreadyUsedValuesFinished(true);
        clearInterval(id);

        return;
      }
    }, 100);
  }

  function search(values: string[][]) {
    let rowIndex: number = 0;
    let colIndex: number = 0;
    setCheckingColIndex(colIndex);
    setCheckingRowIndex(rowIndex);
    const arr = [...values];

    const id = setInterval(() => {
      if (arr[rowIndex][colIndex] === (inputedValue as number).toString()) {
        clearInterval(id);

        if (checkingType !== Type.L2) {
          inputNumberToCache();
          setValueWasFoundedNotInL2(true);
        } else if (checkingType === Type.L2) {
          setValueWasFoundedInL2(true);
        }

        setWasStepOfSearchFinished(true);

        return;
      }

      colIndex++;

      if (colIndex >= arr[0].length) {
        colIndex = 0;
        rowIndex++;
      }
      if (rowIndex >= arr.length) {
        clearInterval(id);
        setWasStepOfSearchFinished(true);
        return;
      }

      setCheckingColIndex(colIndex);
      setCheckingRowIndex(rowIndex);
    }, 300);
  }

  function changeValue(
    rowIndex: number,
    colIndex: number,
    value: string,
    titleOfCache: string,
  ) {
    const isL2Cache: boolean = titleOfCache.includes("L2");
    const arr = isL2Cache ? [...valuesOfL2Cache] : [...valuesOfL3Cache];

    arr[rowIndex][colIndex] = value;

    if (isL2Cache) {
      setValuesOfL2Cache(arr);
    } else {
      setValuesOfL3Cache(arr);
    }
  }

  function defineRAMTableSize(): RAMTableSizes {
    if (isTwoK) {
      return RAMTableSizes.Big;
    } else if (isFullHd || isSmallDisplay || isNotFullHd) {
      return RAMTableSizes.Medium;
    } else if (isTablet) {
      return RAMTableSizes.XMedium;
    } else if (isMobile) {
      return RAMTableSizes.Small;
    } else if (isSmallMobile) {
      return RAMTableSizes.XSmall;
    } else {
      return RAMTableSizes.XSmall;
    }
  }

  function defineCacheTableSize(): CacheTableSizes {
    if (isTwoK) {
      return CacheTableSizes.Big;
    } else if (isFullHd || isSmallDisplay || isNotFullHd) {
      return CacheTableSizes.Medium;
    } else if (isTablet || isMobile) {
      return CacheTableSizes.Small;
    } else if (isSmallMobile) {
      return CacheTableSizes.Smaller;
    } else {
      return CacheTableSizes.Smaller;
    }
  }

  function handleShowTheory() {
    setShowTheory((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      {showTheory && (
        <WindowForTheory text={cacheTheory} hideFunc={handleShowTheory} />
      )}
      <div className={styles.tables_container}>
        <TableContainer size={defineRAMTableSize()}>
          <Table
            values={ramValues}
            zeroValues={[]}
            numberOfBlock={1}
            checkingRowIndex={checkingRowIndex}
            checkingColIndex={checkingColIndex}
            selectedValues={[]}
            setSelectedValues={() => {}}
            showChecking={checkingType === Type.RAM}
            showZeroValues={false}
            isChangeable={false}
            isSelectable={false}
            changeValue={() => {}}
          />
        </TableContainer>

        <div className={styles.cache_container}>
          <CacheContainer size={defineCacheTableSize()}>
            <Cache
              values={valuesOfL3Cache}
              title="Кэш L3"
              checkingColIndex={checkingColIndex}
              checkingRowIndex={checkingRowIndex}
              showChecking={checkingType === Type.L3}
              changeValue={changeValue}
              isCheckingForAlreadyUsedValues={
                searchAlreadyUsedValuesFinished === false &&
                checkingType === Type.L3 &&
                selectedAlgorithm !== "FIFO"
              }
              isChangeable={globalSearchWasFinished}
            />
          </CacheContainer>
          <CacheContainer size={defineCacheTableSize()}>
            <Cache
              values={valuesOfL2Cache}
              title="Кэш L2"
              checkingColIndex={checkingColIndex}
              checkingRowIndex={checkingRowIndex}
              showChecking={checkingType === Type.L2}
              showAddedValue={valueWasFoundedNotInL2}
              showFoundedValue={valueWasFoundedInL2}
              changeValue={changeValue}
              isCheckingForAlreadyUsedValues={
                searchAlreadyUsedValuesFinished === false &&
                checkingType === Type.L2 &&
                selectedAlgorithm !== "FIFO"
              }
              isChangeable={globalSearchWasFinished}
            />
          </CacheContainer>
        </div>
      </div>
      <div className={styles.controls_container}>
        <div className={styles.input_container}>
          <span>Введите число</span>
          <TextInput
            placeholder="Число от 1 до 100"
            onTextChange={inputValue}
            autoComplete={false}
            hasBorder
            disable={!globalSearchWasFinished}
          />
        </div>
        <div className={styles.select_container}>
          <span>Алгоритм</span>
          <Select
            onSelect={selectAlgorithm}
            options={algorithms}
            resetButton={globalSearchWasFinished}
            disable={!globalSearchWasFinished}
          />
        </div>
        <div className={styles.buttons_container}>
          <Button
            onClickFunction={selectStartType}
            text="Начать поиск"
            disabled={
              selectedAlgorithm === "" ||
              inputedValue === null ||
              !globalSearchWasFinished
            }
          />
          <Button
            onClickFunction={fillAllCache}
            text="Заполнить кэш"
            disabled={!globalSearchWasFinished}
          />
          <Button
            onClickFunction={clearAllCache}
            text="Очистить кэш"
            disabled={!globalSearchWasFinished}
          />
          <Button onClickFunction={handleShowTheory} text="Показать теорию" />
        </div>
      </div>
    </div>
  );
}

export default CachePage;
