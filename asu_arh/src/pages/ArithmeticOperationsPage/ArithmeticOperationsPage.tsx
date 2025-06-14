import {
  MutableRefObject,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

import Button from "@components/Button/Button";
import GridRowContainer from "@components/GridRowContainer/GridRow";
import ModalWindow from "@components/ModalWindow/ModalWindow";
import SumField from "@components/SumField/SumField";
import WindowForMultiply from "@components/WindowForMultiply/WindowForMultiply";
import { ButtonSizes } from "@enums/ButtonSizes";
import useMatchMedia from "@hooks/useMatchMedia";
import { IAccurancyOption } from "@interfaces/IAccurancyOption";
import {
  addingNumbers as addingNumbersPath,
  multiplicationOfNumbers as multiplicationOfNumbersPath,
} from "@router/Links";
import { useSearchParams } from "react-router-dom";

import styles from "./page.module.scss";
import { theory } from "./theory";

function ArithmeticOperationsPage(): ReactElement {
  const timer1 = useRef<number>();
  const timer2 = useRef<number>();
  const timerOfSum = useRef<number>();
  const [searchParams] = useSearchParams();
  const [isFirstTimerEnd, setIsFirstTimerEnd] = useState<boolean>(false);
  const [isSecondTimerEnd, setIsSecondTimerEnd] = useState<boolean>(false);
  const [isTimerOfSumEnd, setIsTimerOfSumEnd] = useState<boolean>(false);
  const [delay] = useState<number>(700);
  const [automationDelay] = useState<number>(1500);
  const [arraysOfMultiply, setArraysOfMultiply] = useState<string[][]>([]);
  const [resultOfMultiply, setResultOfMultiply] = useState<string>("");
  const [amountInBinSystem, setAmountInBinSystem] = useState<string>("");
  const [wholePartOfAmount, setWholePartOfAmount] = useState<string>("");
  const [floatPartOfAmount, setFloatPartOfAmount] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);
  const [showTableOfMultiply, setShowTableOfMultiply] =
    useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [globalStep, setGlobalStep] = useState<number>(0);
  const [firstValue, setFirstValue] = useState<number | string | null>(null);
  const [secondValue, setSecondValue] = useState<number | string | null>(null);
  const [binFirstValue, setBinFirstValue] = useState<string>("");
  const [binSecondValue, setBinSecondValue] = useState<string>("");
  const [amountInDecSystem, setAmountInDecSystem] = useState<number>(0);
  const [amountInReverseCode, setAmountInReverseCode] = useState<string>("");
  const [amountInAddingCode, setAmountInAddingCode] = useState<string>("");
  const [machineFirstValue, setMachineFirstValue] = useState<string>("");
  const [machineSecondValue, setMachineSecondValue] = useState<string>("");
  const [selectedAccuracy, setSelectedAccuracy] = useState<string | null>(null);
  const [firstValueInReverseCode, setFirstValueInReverseCode] =
    useState<string>("");
  const [secondValueInReverseCode, setSecondValueInReverseCode] =
    useState<string>("");
  const [firstValueInAddictionCode, setFirstValueInAddictionCode] =
    useState<string>("");
  const [secondValueInAddictionCode, setSecondValueInAddictionCode] =
    useState<string>("");
  const [addingUnit, setAddingUnit] = useState<string>("");
  const { isFullHd, isSmallDisplay, isNotFullHd, isTwoK, isTablet, isMobile } =
    useMatchMedia();
  const [accuracyOptions] = useState<IAccurancyOption[]>([
    {
      title: 1,
      value: 1,
    },
    {
      title: 2,
      value: 2,
    },
    {
      title: 3,
      value: 3,
    },
    {
      title: 4,
      value: 4,
    },
    {
      title: 5,
      value: 5,
    },
  ]);
  const [inputFieldsId] = useState({
    templateForEachDigitsOfFirstValue: "digitOfFirstValue",
    templateForEachDigitsOfSecondValue: "digitOfSecondValue",
    wholePartFirst: "wholePartFirst",
    wholePartFirstToBin: "wholePartFirstToBin",
    wholePartSecond: "wholePartSecond",
    wholePartSecondToBin: "wholePartSecondToBin",
    floatPartFirst: "floatPartFirst",
    floatPartFirstToBin: "floatPartFirstToBin",
    floatPartSecond: "floatPartSecond",
    floatPartSecondToBin: "floatPartSecondToBin",
    machineFirstValue: "machineFirstValue",
    machineSecondValue: "machineSecondValue",
    mantissaFirstValue: "mantissaFirstValue",
    mantissaSecondValue: "mantissaSecondValue",
    currentDigitFirstValue: "currentDigitFirstValue",
    currentDigitSecondValue: "currentDigitSecondValue",
    sum: "sum",
    resultIdOfFirstAddingInAddictionCode: "sumOfFirstInAddictionCode",
    resultIdOfSecondAddingInAddictionCode: "sumOfSecondInAddictionCode",
    addingUnitIdOfFirstValue: "addingUnitIdOfFirstValue",
    addingUnitIdOfSecondValue: "addingUnitIdOfSecondValue",
    formulaOfWholePart: "formulaOfWholePart",
    convertedToDecWholePart: "convertedToDecWholePart",
    formulaOfFloatPart: "formulaOfFloatPart",
    convertedToDecFloatPart: "convertedToDecFloatPart",
    convertedToAddictionCodeFirstValue: "convertedToAddictionCodeFirstValue",
    convertedToAddictionCodeSecondValue: "convertedToAddictionCodeSecondValue",
    convertedToReverseCodeFirstValue: "convertedToReverseCodeFirstValue",
    convertedToReverseCodeSecondValue: "convertedToReverseCodeSecondValue",
    templateForEachDigitsOfFirstValueInAddictionCode:
      "templateForEachDigitsOfFirstValueInAddictionCode",
    templateForEachDigitsOfSecondValueInAddictionCode:
      "templateForEachDigitsOfSecondValueInAddictionCode",
    convertedAmountInReverseCode: "convertedAmountInReverseCode",
    templateForEachDigitOfStraightCodeAmountValue:
      "templateForEachDigitOfStraightCodeAmountValue",
    templateForEachDigitOfStraightCodeSecondValue:
      "templateForEachDigitOfStraightCodeSecondValue",
    convertedAmountInStraightCode: "convertedAmountInStraightCode",
    fromMachineToBin: "fromMachineToBin",
    binFirstValue: "binFirstValue",
    binSecondValue: "binSecondValue",
    currentDigitToAddictionFirstValue: "currentDigitToAddictionFirstValue",
    currentDigitToAddictionSecondValue: "currentDigitToAddictionSecondValue",
  });
  const [sectionsId] = useState({
    wholePartSection: "wholePartSection",
    floatPartSection: "floatPartSection",
    numberToBinSection: "numberToBinSection",
    toMachineRepresSection: "toMachineRepresSection",
    equalizingMantissaSection: "equalizingMantissaSection",
    additionSection: "additionSection",
    fromMachineToBinSection: "fromMachineToBinSection",
    convertWholePartOfAmountSection: "convertWholePartOfAmountSection",
    convertFloatPartOfAmountSection: "convertFloatPartOfAmountSection",
    resultSection: "resultSection",
    toReverseCodeSection: "toReverseCodeSection",
    toAddictionCodeSection: "toAddictionCodeSection",
    toReverseCodeAmount: "toReverseCodeAmount",
    toStraightCodeAmount: "toStraightCodeAmount",
    resultOfMultiplication: "resultOfMultiplication",
  });
  const [isAutomate, setIsAutomate] = useState<boolean>(false);

  useEffect(() => {
    if (!showModal) {
      hideAllSections();
    }
  }, [showModal]);

  useEffect(() => {
    if (isFirstTimerEnd && isSecondTimerEnd) {
      enableNextStepBttnAndIncreaseStep();
      setIsFirstTimerEnd((prev) => !prev);
      setIsSecondTimerEnd((prev) => !prev);
      timer1.current = undefined;
      timer2.current = undefined;
    }
  }, [isFirstTimerEnd, isSecondTimerEnd]);

  useEffect(() => {
    if (isAutomate) {
      if (Object.keys(theory).length + 1 !== globalStep) {
        setTimeout(() => startAll(), automationDelay);
      } else {
        setAutomate();
      }
    }
  }, [globalStep]);

  useEffect(() => {
    if (isAutomate) {
      startAll();
    }
  }, [isAutomate]);

  useEffect(() => {
    if (isTimerOfSumEnd) {
      setIsTimerOfSumEnd((prev) => !prev);
      timerOfSum.current = undefined;
      enableNextStepBttnAndIncreaseStep();
    }
  }, [isTimerOfSumEnd]);

  function handleSetShowSecondModal() {
    setShowModal(false);
  }

  function resetAll() {
    resetStates();
    resetTextInHTMLElements();
    hideAllSections();
  }

  function setAutomate() {
    if (!isAutomate) {
      if (
        timer1.current === undefined &&
        timer2.current === undefined &&
        timerOfSum.current === undefined
      ) {
        setIsAutomate((prev) => !prev);
      }
    } else {
      setIsAutomate((prev) => !prev);
    }
  }

  function reenterTheData() {
    resetAll();
    resetEnteredData();
    setShowModal((prev) => !prev);
  }

  function resetEnteredData() {
    setFirstValue("");
    setSecondValue("");
    setSelectedAccuracy("");
  }

  function resetStates() {
    setBinFirstValue("");
    setBinSecondValue("");
    setAmountInBinSystem("");
    setAmountInDecSystem(0);
    setMachineFirstValue("");
    setMachineSecondValue("");
    setGlobalStep(0);
    setText("");
    setWholePartOfAmount("");
    setFloatPartOfAmount("");
    setFirstValueInAddictionCode("");
    setSecondValueInAddictionCode("");
    setFirstValueInReverseCode("");
    setSecondValueInReverseCode("");
  }

  function resetTextInHTMLElements() {
    for (let key in inputFieldsId) {
      insertTextToElement("", key);
    }
  }

  function showWholePart(wholePart: number, bin: string, id: string) {
    (document.getElementById(id) as HTMLElement).innerText =
      wholePart.toString();
    (document.getElementById(id + "ToBin") as HTMLElement).innerText = bin;
  }

  function showFloatPart(floatPart: number, bin: string, id: string) {
    (document.getElementById(id) as HTMLElement).innerText =
      floatPart.toString();
    (document.getElementById(id + "ToBin") as HTMLElement).innerText = bin;
  }

  function insertTextToElement(id: string, value: string) {
    let field = document.getElementById(id);

    if (field) {
      field.innerHTML = value;
    }
  }

  function paintNumber(id: string, color: string) {
    let field = document.getElementById(id);

    if (field) {
      field.style.color = color;
    }
  }

  function multiplyNumbers() {
    const number1: string[] =
      Number(firstValue) >= 0
        ? (machineFirstValue[0] + machineFirstValue.slice(2)).split("")
        : (
            firstValueInAddictionCode[0] + firstValueInAddictionCode.slice(2)
          ).split("");

    const number2: string[] =
      Number(secondValue) >= 0
        ? (machineSecondValue[0] + machineSecondValue.slice(2)).split("")
        : (
            secondValueInAddictionCode[0] + secondValueInAddictionCode.slice(2)
          ).split("");

    const result: string[][] = [];
    let sum: string[] = [];

    for (let i = number2.length - 1, step = 0; i >= 0; i--, step++) {
      const arr: string[] = [];

      for (let j = 0; j < step; j++) {
        arr.push("0");
      }

      for (let j = number1.length - 1; j >= 0; j--) {
        if (number1[j] === "1" && number2[i] === "1") {
          arr.push("1");
        } else {
          arr.push("0");
        }
      }

      result.push(arr.reverse());
    }

    setArraysOfMultiply([...result]);

    const maxLength: number = result[result.length - 1].length;

    for (let i = 0; i < result.length; i++) {
      result[i] = result[i].join("").padStart(maxLength, "0").split("");
    }

    for (let i = 0; i < result.length; i++) {
      if (i === 0) {
        sum = addingArraysOfMultiply(result[i], result[i + 1]);
        i++;
      } else {
        sum = addingArraysOfMultiply(sum, result[i]);
      }
    }

    setIsTimerOfSumEnd(true);

    extractWholeAndFloatPartsFromAmountInBin(sum.join(""));

    sum = (sum.join("")[0] + "." + sum.join("").slice(1)).split("");

    setResultOfMultiply(sum.join(""));

    if (Number(firstValue) * Number(secondValue) >= 0) {
      setAmountInBinSystem(sum.join(""));
    } else {
      setAmountInAddingCode(sum.join(""));
    }
  }

  function addingArraysOfMultiply(arr1: string[], arr2: string[]): string[] {
    let result: string[] = [];
    let index: number = arr1.length - 1;
    let digitOfFirstValue: string = arr1[index];
    let digitOfSecondValue: string = arr2[index];
    let isOverflowed: boolean = false;
    let sum: string = "";

    while (true) {
      if (index < 0) {
        result = sum.split("");

        break;
      }
      if (digitOfFirstValue === "0" && digitOfSecondValue === "0") {
        if (isOverflowed) {
          sum = "1" + sum;
          isOverflowed = false;
        } else {
          sum = "0" + sum;
        }
      } else if (
        (digitOfFirstValue === "1" && digitOfSecondValue === "0") ||
        (digitOfFirstValue === "0" && digitOfSecondValue === "1")
      ) {
        if (isOverflowed) {
          sum = "0" + sum;
        } else {
          sum = "1" + sum;
        }
      } else if (digitOfFirstValue === "1" && digitOfSecondValue === "1") {
        if (isOverflowed) {
          sum = "1" + sum;
        } else {
          sum = "0" + sum;
        }
        isOverflowed = true;
      }

      index--;
      digitOfFirstValue = arr1[index];
      digitOfSecondValue = arr2[index];
    }

    return result;
  }

  function addingNumbers(
    tempaleIdForEachDigitOfFirstValue: string,
    tempaleIdForEachDigitOfSecondValue: string,
    sumId: string,
    firstValue: string,
    secondValue: string,
    colorizeFunc: (id: string, color: string) => void,
    displayFunc: (id: string, value: string) => void,
    setValue: (e: SetStateAction<string>) => void,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
    idForCurrentDigitFirstValue: string = "",
    idForCurrentDigitSecondValue: string = "",
  ) {
    let index: number = firstValue.length - 1;
    let digitOfFirstValue: string = firstValue[index];
    let digitOfSecondValue: string = secondValue[index];
    let isOverflowed: boolean = false;
    let sum: string = "";

    colorizeFunc(index + tempaleIdForEachDigitOfFirstValue, "red");
    colorizeFunc(index + tempaleIdForEachDigitOfSecondValue, "red");
    if (idForCurrentDigitFirstValue) {
      displayFunc(digitOfFirstValue, idForCurrentDigitFirstValue);
    }
    if (idForCurrentDigitSecondValue) {
      displayFunc(digitOfSecondValue, idForCurrentDigitSecondValue);
    }

    timerRef.current = setInterval(() => {
      if (index < 0) {
        extractWholeAndFloatPartsFromAmountInBin(sum);

        sum = sum[0] + "." + sum.slice(1);

        displayFunc(sumId, sum);
        isTimerEnd(true);
        setValue(sum);

        clearInterval(timerRef.current);
        return;
      }
      if (digitOfFirstValue === "0" && digitOfSecondValue === "0") {
        if (isOverflowed) {
          sum = "1" + sum;
          isOverflowed = false;
        } else {
          sum = "0" + sum;
        }
      } else if (
        (digitOfFirstValue === "1" && digitOfSecondValue === "0") ||
        (digitOfFirstValue === "0" && digitOfSecondValue === "1")
      ) {
        if (isOverflowed) {
          sum = "0" + sum;
        } else {
          sum = "1" + sum;
        }
      } else if (digitOfFirstValue === "1" && digitOfSecondValue === "1") {
        if (isOverflowed) {
          sum = "1" + sum;
        } else {
          sum = "0" + sum;
        }
        isOverflowed = true;
      }

      displayFunc(sumId, sum);
      colorizeFunc(index + tempaleIdForEachDigitOfFirstValue, "black");
      colorizeFunc(index + tempaleIdForEachDigitOfSecondValue, "black");

      index--;
      digitOfFirstValue = firstValue[index];
      digitOfSecondValue = secondValue[index];

      if (digitOfFirstValue !== "." && digitOfFirstValue) {
        colorizeFunc(index + tempaleIdForEachDigitOfFirstValue, "red");
        colorizeFunc(index + tempaleIdForEachDigitOfSecondValue, "red");
        if (idForCurrentDigitFirstValue) {
          displayFunc(idForCurrentDigitFirstValue, digitOfFirstValue);
        }
        if (idForCurrentDigitSecondValue) {
          displayFunc(idForCurrentDigitSecondValue, digitOfSecondValue);
        }
      }
    }, delay);
  }

  function showSection(sectionId: string, displayProperty: string = "grid") {
    (document.getElementById(sectionId) as HTMLElement).style.display =
      displayProperty;
  }

  function enableNextStepBttnAndIncreaseStep() {
    if (!isAutomate) {
      (document.getElementById("nextStepBttn") as HTMLButtonElement).disabled =
        false;
    }
    setGlobalStep((prev) => ++prev);
  }

  function convertToBinWholeParts(
    value: number,
    func: (wholePart: number, bin: string, id: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    value = Math.abs(value);
    let bin: number = value % 2;
    value = Math.trunc(value / 2);
    let str: string = bin.toString();

    timerRef.current = setInterval(() => {
      if (value === 0) {
        setValue(str);
        clearInterval(timerRef.current);
        setIsTimerEnd((prev) => !prev);
      }

      func(value, str, id);

      bin = value % 2;
      value = Math.trunc(value / 2);
      str = bin + str;
    }, delay);
  }

  function convertToBinFloatParts(
    floatPart: number,
    func: (floatPart: number, bin: string, id: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setBinValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let bin: number = 0;
    let str: string = "";
    let step: number = 1;
    floatPart = Math.abs(floatPart);
    timerRef.current = setInterval(() => {
      floatPart *= 2;
      bin = Math.trunc(floatPart);
      str = str + bin.toString();
      floatPart = floatPart - Math.trunc(floatPart);

      func(floatPart, str, id);
      step++;

      if (step > Number(selectedAccuracy)) {
        setBinValue((prev) => prev + `.${str}`);
        clearInterval(timerRef.current);
        setIsTimerEnd((prev) => !prev);
      }
    }, delay);
  }

  function convertBinNumberToMachineRepresentation(
    binValue: string,
    isValueNegative: boolean,
    func: (id: string, bin: string) => void,
    timerRef: MutableRefObject<number | undefined>,
    id: string,
    setValue: (e: SetStateAction<string>) => void,
    setIsTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    let splitBin: string[] = binValue.split(".");
    let floatPart: string = splitBin[1];
    let str: string = splitBin[0];
    let floatLength: number = floatPart.length;
    let index: number = 0;
    let stepAfterEqual: number = 0;
    timerRef.current = setInterval(() => {
      if (index === floatLength) {
        if (stepAfterEqual === 0) {
          str = "." + str;
        } else if (stepAfterEqual === 1) {
          if (isValueNegative) {
            str = "1" + str;
          } else {
            str = "0" + str;
          }
        } else {
          setValue(str);
          clearInterval(timerRef.current);
          setIsTimerEnd((prev) => !prev);
        }

        func(id, str);
        stepAfterEqual++;
      } else {
        func(id, str);

        str += floatPart[index];
        index++;
      }
    }, delay);
  }

  function fromMachineToBin(
    value: string,
    idToShow: string,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
    insertIntoHTMLFunc: (id: string, value: string) => void,
  ) {
    let splitedValue: string[] = value.split(".");
    let valueBeforeDot: string = splitedValue[0];
    let valueAfterDot: string = splitedValue[1];
    let str: string = value;

    timerRef.current = setInterval(() => {
      if (
        valueAfterDot.length ===
        Number(selectedAccuracy) *
          (searchParams.get("type") === addingNumbersPath.path ? 1 : 2)
      ) {
        isTimerEnd((prev) => !prev);
        clearInterval(timerRef.current);
      }

      insertIntoHTMLFunc(idToShow, str);

      str = valueBeforeDot + valueAfterDot[0] + "." + valueAfterDot.slice(1);

      splitedValue = str.split(".");
      valueBeforeDot = splitedValue[0];
      valueAfterDot = splitedValue[1];
      str = str.slice(1);
    }, delay);
  }

  function equalizingTheLengthOfMantissa(
    maxLengthOfWholePart: number,
    binValue: string,
    machineValue: string,
    func: (id: string, value: string) => void,
    setValue: (e: SetStateAction<string>) => void,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
    id: string,
  ) {
    let isNegative: string = machineValue[0];
    let str: string = machineValue;
    let wholePart: string = binValue.split(".")[0];
    let floatPart: string = binValue.split(".")[1];

    timerRef.current = setInterval(() => {
      if (wholePart.length === maxLengthOfWholePart + 1) {
        isTimerEnd((prev) => !prev);
        setValue(str);
        clearInterval(timerRef.current);
      } else {
        wholePart = "0" + wholePart;
      }

      func(id, str);

      str = isNegative + "." + wholePart + floatPart;
    }, delay);
  }

  function startWholeParts() {
    convertToBinWholeParts(
      Math.trunc(firstValue as number),
      showWholePart,
      timer1,
      inputFieldsId.wholePartFirst,
      setBinFirstValue,
      setIsFirstTimerEnd,
    );
    convertToBinWholeParts(
      Math.trunc(secondValue as number),
      showWholePart,
      timer2,
      inputFieldsId.wholePartSecond,
      setBinSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startFloatParts() {
    convertToBinFloatParts(
      (firstValue as number) - Math.trunc(firstValue as number),
      showFloatPart,
      timer1,
      inputFieldsId.floatPartFirst,
      setBinFirstValue,
      setIsFirstTimerEnd,
    );
    convertToBinFloatParts(
      (secondValue as number) - Math.trunc(secondValue as number),
      showFloatPart,
      timer2,
      inputFieldsId.floatPartSecond,
      setBinSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startMachineRepresentation() {
    convertBinNumberToMachineRepresentation(
      binFirstValue,
      Number(firstValue) < 0,
      insertTextToElement,
      timer1,
      inputFieldsId.machineFirstValue,
      setMachineFirstValue,
      setIsFirstTimerEnd,
    );
    convertBinNumberToMachineRepresentation(
      binSecondValue,
      Number(secondValue) < 0,
      insertTextToElement,
      timer2,
      inputFieldsId.machineSecondValue,
      setMachineSecondValue,
      setIsSecondTimerEnd,
    );
  }

  function startFromMachineToBin() {
    setIsSecondTimerEnd(true);
    fromMachineToBin(
      amountInBinSystem,
      "fromMachineToBin",
      timer1,
      setIsFirstTimerEnd,
      insertTextToElement,
    );
  }

  function startConvertToReverseCode() {
    convertToReverseCode(
      machineFirstValue,
      Number(firstValue) < 0,
      setFirstValueInReverseCode,
      inputFieldsId.convertedToReverseCodeFirstValue,
      insertTextToElement,
    );
    convertToReverseCode(
      machineSecondValue,
      Number(secondValue) < 0,
      setSecondValueInReverseCode,
      inputFieldsId.convertedToReverseCodeSecondValue,
      insertTextToElement,
    );
    enableNextStepBttnAndIncreaseStep();
  }

  function startEqualizingMantissa() {
    if (machineFirstValue.length > machineSecondValue.length) {
      equalizingTheLengthOfMantissa(
        binFirstValue.split(".")[0].length,
        binFirstValue,
        machineFirstValue,
        insertTextToElement,
        setMachineFirstValue,
        timer1,
        setIsFirstTimerEnd,
        inputFieldsId.mantissaFirstValue,
      );
      equalizingTheLengthOfMantissa(
        binFirstValue.split(".")[0].length,
        binSecondValue,
        machineSecondValue,
        insertTextToElement,
        setMachineSecondValue,
        timer2,
        setIsSecondTimerEnd,
        inputFieldsId.mantissaSecondValue,
      );
    } else if (machineFirstValue.length < machineSecondValue.length) {
      equalizingTheLengthOfMantissa(
        binSecondValue.split(".")[0].length,
        binFirstValue,
        machineFirstValue,
        insertTextToElement,
        setMachineFirstValue,
        timer1,
        setIsFirstTimerEnd,
        inputFieldsId.mantissaFirstValue,
      );
      equalizingTheLengthOfMantissa(
        binSecondValue.split(".")[0].length,
        binSecondValue,
        machineSecondValue,
        insertTextToElement,
        setMachineSecondValue,
        timer2,
        setIsSecondTimerEnd,
        inputFieldsId.mantissaSecondValue,
      );
    } else {
      equalizingTheLengthOfMantissa(
        binSecondValue.split(".")[0].length,
        binFirstValue,
        machineFirstValue,
        insertTextToElement,
        setMachineFirstValue,
        timer1,
        setIsFirstTimerEnd,
        inputFieldsId.mantissaFirstValue,
      );
      equalizingTheLengthOfMantissa(
        binSecondValue.split(".")[0].length,
        binSecondValue,
        machineSecondValue,
        insertTextToElement,
        setMachineSecondValue,
        timer2,
        setIsSecondTimerEnd,
        inputFieldsId.mantissaSecondValue,
      );
    }
  }

  function startConvertToAddictionCode() {
    const addingUnit: string =
      "0." + "1".padStart(firstValueInReverseCode.split(".")[1].length, "0");
    setAddingUnit(addingUnit);
    convertToAddictionCode(
      Number(firstValue) < 0,
      addingUnit,
      inputFieldsId.templateForEachDigitsOfFirstValueInAddictionCode,
      inputFieldsId.addingUnitIdOfFirstValue,
      "",
      "",
      inputFieldsId.resultIdOfFirstAddingInAddictionCode,
      firstValueInReverseCode,
      paintNumber,
      insertTextToElement,
      setFirstValueInAddictionCode,
      timer1,
      setIsFirstTimerEnd,
    );
    convertToAddictionCode(
      Number(secondValue) < 0,
      addingUnit,
      inputFieldsId.templateForEachDigitsOfSecondValueInAddictionCode,
      inputFieldsId.addingUnitIdOfSecondValue,
      "",
      "",
      inputFieldsId.resultIdOfSecondAddingInAddictionCode,
      secondValueInReverseCode,
      paintNumber,
      insertTextToElement,
      setSecondValueInAddictionCode,
      timer2,
      setIsSecondTimerEnd,
    );
  }

  function startAdding() {
    addingNumbers(
      "digitOfFirstValue",
      "digitOfSecondValue",
      inputFieldsId.sum,
      firstValueInAddictionCode ? firstValueInAddictionCode : machineFirstValue,
      secondValueInAddictionCode
        ? secondValueInAddictionCode
        : machineSecondValue,
      paintNumber,
      insertTextToElement,
      Number(firstValue) + Number(secondValue) >= 0
        ? setAmountInBinSystem
        : setAmountInAddingCode,
      timerOfSum,
      setIsTimerOfSumEnd,
      inputFieldsId.currentDigitFirstValue,
      inputFieldsId.currentDigitSecondValue,
    );
  }

  function startConvertToReverseAmount() {
    convertToReverseCode(
      amountInAddingCode,
      true,
      setAmountInReverseCode,
      inputFieldsId.convertedAmountInReverseCode,
      insertTextToElement,
    );
    enableNextStepBttnAndIncreaseStep();
  }

  function startAll() {
    if (!isAutomate) {
      (document.getElementById("nextStepBttn") as HTMLButtonElement).disabled =
        true;
    }
    let step = globalStep;
    if (step === 0) {
      showSection(sectionsId.wholePartSection, "flex");
      setText(theory.convertWholePartToBin);
      startWholeParts();
    } else if (step === 1) {
      showSection(sectionsId.floatPartSection, "flex");
      setText(theory.convertFloatPartToBin);
      startFloatParts();
    } else if (step === 2) {
      showSection(sectionsId.numberToBinSection, "flex");
      setText(theory.concatWholeAndFloatPartsOfBin);
      enableNextStepBttnAndIncreaseStep();
    } else if (step === 3) {
      showSection(sectionsId.toMachineRepresSection, "flex");
      setText(theory.machineRepres);
      startMachineRepresentation();
    } else if (step === 4) {
      showSection(sectionsId.equalizingMantissaSection, "flex");
      setText(theory.mantissa);
      startEqualizingMantissa();
    } else if (step === 5) {
      if (Number(firstValue) >= 0 && Number(secondValue) >= 0) {
        step = 7;
        setGlobalStep(7);

        if (isAutomate) {
          return;
        }
      } else {
        showSection(sectionsId.toReverseCodeSection);
        setText(theory.convertToReverseCode);
        startConvertToReverseCode();
      }
    } else if (step === 6) {
      showSection(sectionsId.toAddictionCodeSection);
      setText(theory.convertToAddingCode);
      startConvertToAddictionCode();
    }

    if (step === 7) {
      if (searchParams.get("type") === addingNumbersPath.path) {
        showSection(sectionsId.additionSection);
        setText(theory.adding);
        startAdding();
      } else if (
        searchParams.get("type") === multiplicationOfNumbersPath.path
      ) {
        showSection(sectionsId.resultOfMultiplication, "flex");
        setText(theory.multiply);
        multiplyNumbers();
      }
    } else if (step === 8) {
      if (searchParams.get("type") === addingNumbersPath.path) {
        if (Number(firstValue) + Number(secondValue) >= 0) {
          step = 10;
          setGlobalStep(10);

          if (isAutomate) {
            return;
          }
        } else {
          showSection(sectionsId.toReverseCodeAmount);
          setText(theory.convertAmountToReverseCode);
          startConvertToReverseAmount();
        }
      } else if (
        searchParams.get("type") === multiplicationOfNumbersPath.path
      ) {
        if (Number(firstValue) * Number(secondValue) >= 0) {
          step = 10;
          setGlobalStep(10);

          if (isAutomate) {
            return;
          }
        } else {
          showSection(sectionsId.toReverseCodeAmount);
          setText(theory.convertAmountToReverseCode);
          startConvertToReverseAmount();
        }
      }
    } else if (step === 9) {
      showSection(sectionsId.toStraightCodeAmount);
      setText(theory.convertAmountToStraightCode);
      startConvertAmountToStraightCode();
    }

    if (step === 10) {
      showSection(sectionsId.fromMachineToBinSection, "flex");
      setText(theory.fromMachineToBin);
      startFromMachineToBin();
    } else if (step === 11) {
      showSection(sectionsId.convertWholePartOfAmountSection, "flex");
      startConvertToDecWholePart();
    } else if (step === 12) {
      showSection(sectionsId.convertFloatPartOfAmountSection, "flex");
      startConvertToDecFloatPart();
    } else if (step === 13) {
      showResult();
    }
    (document.getElementById("innerContainer") as HTMLElement).scrollTo(
      0,
      (document.getElementById("innerContainer") as HTMLElement).scrollHeight,
    );
  }

  function startConvertToDecWholePart() {
    setTimeout(
      () =>
        convertToDecWholePart(
          inputFieldsId.convertedToDecWholePart,
          inputFieldsId.formulaOfWholePart,
        ),
      delay,
    );
  }

  function startConvertToDecFloatPart() {
    setTimeout(
      () =>
        convertToDecFloatPart(
          inputFieldsId.convertedToDecFloatPart,
          inputFieldsId.formulaOfFloatPart,
        ),
      delay,
    );
  }

  function showResult() {
    setTimeout(() => {
      showSection(sectionsId.resultSection);
      (document.getElementById("innerContainer") as HTMLElement).scrollTo(
        0,
        (document.getElementById("innerContainer") as HTMLElement).scrollHeight,
      );
      enableNextStepBttnAndIncreaseStep();
    }, delay);
  }

  function extractWholeAndFloatPartsFromAmountInBin(amount: string) {
    const type: string | null = searchParams.get("type");

    setWholePartOfAmount(
      amount.slice(
        1,
        amount.length -
          Number(selectedAccuracy) * (type === addingNumbersPath.path ? 1 : 2),
      ),
    );
    setFloatPartOfAmount(
      amount.slice(
        amount.length -
          Number(selectedAccuracy) * (type === addingNumbersPath.path ? 1 : 2),
      ),
    );
  }

  function convertToReverseCode(
    value: string,
    isValueNegative: boolean,
    setValue: (e: SetStateAction<string>) => void,
    fieldId: string,
    displayFunc: (id: string, value: string) => void,
  ) {
    let result: string = "";
    if (isValueNegative) {
      result = value.split(".")[0] + ".";

      let valueAfterDot: string = value.split(".")[1];

      for (let i = 0; i < valueAfterDot.length; i++) {
        if (valueAfterDot[i] === "0") {
          result += "1";
        } else {
          result += "0";
        }
      }
    } else {
      result = value;
    }

    displayFunc(fieldId, result);

    setValue(result);
  }

  function startConvertAmountToStraightCode() {
    const addingUnit: string =
      "0." + "1".padStart(amountInReverseCode.split(".")[1].length, "0");
    setAddingUnit(addingUnit);

    addingNumbers(
      inputFieldsId.templateForEachDigitOfStraightCodeAmountValue,
      inputFieldsId.templateForEachDigitOfStraightCodeSecondValue,
      inputFieldsId.convertedAmountInStraightCode,
      amountInReverseCode,
      addingUnit,
      paintNumber,
      insertTextToElement,
      setAmountInBinSystem,
      timerOfSum,
      setIsTimerOfSumEnd,
    );
  }

  function convertToAddictionCode(
    isValueNegative: boolean,
    addingUnit: string,
    tempaleIdForEachDigitOfFirstValue: string,
    tempaleIdForEachDigitOfSecondValue: string,
    idForCurrentDigitFirstValue: string = "",
    idForCurrentDigitSecondValue: string = "",
    sumId: string,
    firstValue: string,
    colorizeFunc: (id: string, color: string) => void,
    displayFunc: (id: string, value: string) => void,
    setValue: (e: SetStateAction<string>) => void,
    timerRef: MutableRefObject<number | undefined>,
    isTimerEnd: (e: SetStateAction<boolean>) => void,
  ) {
    if (isValueNegative) {
      addingNumbers(
        tempaleIdForEachDigitOfFirstValue,
        tempaleIdForEachDigitOfSecondValue,
        sumId,
        firstValue,
        addingUnit,
        colorizeFunc,
        displayFunc,
        setValue,
        timerRef,
        isTimerEnd,
        idForCurrentDigitFirstValue,
        idForCurrentDigitSecondValue,
      );
    } else {
      isTimerEnd(true);
      displayFunc(sumId, firstValue);
      setValue(firstValue);
    }
  }

  function convertToDecWholePart(resultId: string, formulaId: string) {
    const formula: string = drawingUpAFormula(
      wholePartOfAmount,
      wholePartOfAmount.length - 1,
    );
    setAmountInDecSystem((prev) => prev + parseInt(wholePartOfAmount, 2));
    insertTextToElement(formulaId, formula);
    insertTextToElement(resultId, parseInt(wholePartOfAmount, 2).toString());
    enableNextStepBttnAndIncreaseStep();
  }

  function convertToDecFloatPart(resultId: string, formulaId: string) {
    const formula: string = drawingUpAFormula(floatPartOfAmount, -1);
    insertTextToElement(formulaId, formula);

    let value: number = 0;
    let degree: number = 1;

    for (let i = 0; i < floatPartOfAmount.length; i++, degree++) {
      value += Math.pow(1 / 2, degree) * Number(floatPartOfAmount[i]);
    }
    setAmountInDecSystem((prev) => prev + value);
    insertTextToElement(resultId, value.toString());
    enableNextStepBttnAndIncreaseStep();
  }

  function drawingUpAFormula(value: string, degree: number): string {
    let formula: string = "";

    for (let i = 0; i < value.length; i++, degree--) {
      if (i + 1 === value.length) {
        formula += `${value[i]}&times2<sup>${degree}</sup>`;
      } else {
        formula += `${value[i]}&times2<sup>${degree}</sup>+`;
      }
    }

    return formula;
  }

  function hideAllSections() {
    for (let id in sectionsId) {
      const doc = document.getElementById(id);
      if (doc) {
        doc.style.display = "none";
      }
    }
  }

  function defineButtonSize(): ButtonSizes | undefined {
    if (isTwoK || isFullHd) {
      return ButtonSizes.Big;
    } else if (isTablet || isSmallDisplay || isNotFullHd) {
      return ButtonSizes.Medium;
    } else if (isMobile) {
      return ButtonSizes.Small;
    }
  }

  function showOrHideMultiplyTable() {
    setShowTableOfMultiply((prev) => !prev);
  }

  if (showModal) {
    return (
      <ModalWindow
        firstValue={firstValue}
        setFirstValue={setFirstValue}
        secondValue={secondValue}
        setSecondValue={setSecondValue}
        accurancyOptions={accuracyOptions}
        selectedAccuracy={selectedAccuracy}
        setSelectedAccurancy={setSelectedAccuracy}
        setShowSecondModal={handleSetShowSecondModal}
      />
    );
  }

  return (
    <div className={styles.outer_container}>
      {showTableOfMultiply && (
        <WindowForMultiply
          firstValue={machineFirstValue.split(".").join("")}
          secondValue={machineSecondValue.split(".").join("")}
          stepsOfMultiply={arraysOfMultiply}
          closeModalFunc={showOrHideMultiplyTable}
          resultOfMultiply={resultOfMultiply.split(".").join("")}
        />
      )}
      <div id="innerContainer" className={styles.inner_container}>
        <GridRowContainer
          sectionTitle="Этап"
          firstValue={
            <>
              Первое число: <span>{firstValue}</span>
            </>
          }
          secondValue={
            <>
              Второе число: <span>{secondValue}</span>
            </>
          }
        />
        <div id={sectionsId.wholePartSection} className={styles.row_container}>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>Преобразование целой части</div>
            <div>
              Целая часть:{" "}
              <span id={inputFieldsId.wholePartFirst}>
                {Math.trunc(firstValue as number)}
              </span>
            </div>
            <div>
              Целая часть:{" "}
              <span id={inputFieldsId.wholePartSecond}>
                {Math.trunc(secondValue as number)}
              </span>
            </div>
          </div>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>В двоичном виде</div>
            <div id={inputFieldsId.wholePartFirstToBin}></div>
            <div id={inputFieldsId.wholePartSecondToBin}></div>
          </div>
        </div>
        <div id={sectionsId.floatPartSection} className={styles.row_container}>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>
              Преобразование дробной части
            </div>
            <div>
              Дробная часть:{" "}
              <span id={inputFieldsId.floatPartFirst}>
                {(firstValue as number) - Math.trunc(firstValue as number)}
              </span>
            </div>
            <div>
              Дробная часть:{" "}
              <span id={inputFieldsId.floatPartSecond}>
                {(secondValue as number) - Math.trunc(secondValue as number)}
              </span>
            </div>
          </div>
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>В двоичном виде</div>
            <div id={inputFieldsId.floatPartFirstToBin}></div>
            <div id={inputFieldsId.floatPartSecondToBin}></div>
          </div>
        </div>
        <GridRowContainer
          sectionId={sectionsId.numberToBinSection}
          sectionTitle="Числа в двоичной системе"
          idOfFirstField={inputFieldsId.binFirstValue}
          idOfSecondField={inputFieldsId.binSecondValue}
          firstValue={(Number(firstValue) < 0 ? "-" : "") + binFirstValue}
          secondValue={(Number(secondValue) < 0 ? "-" : "") + binSecondValue}
        />
        <GridRowContainer
          sectionId={sectionsId.toMachineRepresSection}
          sectionTitle="Преобразование в машинное представление"
          idOfFirstField={inputFieldsId.machineFirstValue}
          idOfSecondField={inputFieldsId.machineSecondValue}
        />
        <GridRowContainer
          sectionId={sectionsId.equalizingMantissaSection}
          sectionTitle="Уравнивание мантиссы"
          idOfFirstField={inputFieldsId.mantissaFirstValue}
          idOfSecondField={inputFieldsId.mantissaSecondValue}
        />
        {Number(firstValue) < 0 || Number(secondValue) < 0 ? (
          <>
            <GridRowContainer
              sectionId={sectionsId.toReverseCodeSection}
              sectionTitle="Перевод в обратный код"
              idOfFirstField={inputFieldsId.convertedToReverseCodeFirstValue}
              idOfSecondField={inputFieldsId.convertedToReverseCodeSecondValue}
            />
            <SumField
              firstValue={firstValueInReverseCode}
              secondValue={secondValueInReverseCode}
              addingUnit={addingUnit}
              addingUnitIdOfFirstValue={inputFieldsId.addingUnitIdOfFirstValue}
              addingUnitIdOfSecondValue={
                inputFieldsId.addingUnitIdOfSecondValue
              }
              currentDigitOfFirstValueId={
                inputFieldsId.currentDigitToAddictionFirstValue
              }
              currentDigitOfSecondValueId={
                inputFieldsId.currentDigitToAddictionSecondValue
              }
              resultIdOfFirstAdding={
                inputFieldsId.resultIdOfFirstAddingInAddictionCode
              }
              resultIdOfSecondAdding={
                inputFieldsId.resultIdOfSecondAddingInAddictionCode
              }
              templateForEachDigitsOfFirstValue={
                inputFieldsId.templateForEachDigitsOfFirstValueInAddictionCode
              }
              templateForEachDigitsOfSecondValue={
                inputFieldsId.templateForEachDigitsOfSecondValueInAddictionCode
              }
              sectionTitle="Перевод в дополнительный код"
              isSecondValueNegative={Number(secondValue) < 0}
              sectionId={sectionsId.toAddictionCodeSection}
              sumId=""
            />
          </>
        ) : null}
        <div
          id={sectionsId.resultOfMultiplication}
          className={styles.row_container}
        >
          <div className={styles.row_three_col}>
            <div className={styles.step_title}>Результат умножения</div>
            <div>{resultOfMultiply}</div>
            <div>
              <Button
                onClickFunction={showOrHideMultiplyTable}
                text="Показать таблицу умножения"
                size={ButtonSizes.Big}
              />
            </div>
          </div>
        </div>
        <SumField
          firstValue={
            firstValueInAddictionCode
              ? firstValueInAddictionCode
              : machineFirstValue
          }
          secondValue={
            secondValueInAddictionCode
              ? secondValueInAddictionCode
              : machineSecondValue
          }
          sectionId={sectionsId.additionSection}
          sectionTitle="Сложение чисел"
          templateForEachDigitsOfFirstValue={
            inputFieldsId.templateForEachDigitsOfFirstValue
          }
          templateForEachDigitsOfSecondValue={
            inputFieldsId.templateForEachDigitsOfSecondValue
          }
          sumId={inputFieldsId.sum}
          currentDigitOfFirstValueId={inputFieldsId.currentDigitFirstValue}
          currentDigitOfSecondValueId={inputFieldsId.currentDigitSecondValue}
          isSecondValueNegative={false}
        />
        {Number(firstValue) + Number(secondValue) < 0 ||
          (Number(firstValue) * Number(secondValue) < 0 && (
            <>
              <GridRowContainer
                sectionId={sectionsId.toReverseCodeAmount}
                sectionTitle="Перевод суммы в обратный код"
                idOfFirstField={inputFieldsId.convertedAmountInReverseCode}
              />
              <SumField
                firstValue={amountInReverseCode}
                secondValue=""
                sumId=""
                addingUnit={addingUnit}
                sectionId={sectionsId.toStraightCodeAmount}
                sectionTitle="Перевод суммы в прямой код"
                templateForEachDigitsOfFirstValue={
                  inputFieldsId.templateForEachDigitOfStraightCodeAmountValue
                }
                templateForEachDigitsOfSecondValue=""
                addingUnitIdOfFirstValue={
                  inputFieldsId.templateForEachDigitOfStraightCodeSecondValue
                }
                resultIdOfFirstAdding={
                  inputFieldsId.convertedAmountInStraightCode
                }
                isSecondValueNegative={false}
              />
            </>
          ))}
        <GridRowContainer
          sectionId={sectionsId.fromMachineToBinSection}
          sectionTitle=" Преобразование числа из машинного представления в двоичную систему"
          idOfFirstField={inputFieldsId.fromMachineToBin}
        />
        <div
          id={sectionsId.convertWholePartOfAmountSection}
          className={styles.row_container}
        >
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>
              Преобразование целой части в десятичную систему
            </div>
            <div>Целая часть: {wholePartOfAmount}</div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Формула</div>
            <div
              id={inputFieldsId.formulaOfWholePart}
              className={styles.formula}
            ></div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Результат</div>
            <div
              id={inputFieldsId.convertedToDecWholePart}
              className={styles.formula}
            ></div>
          </div>
        </div>
        <div
          id={sectionsId.convertFloatPartOfAmountSection}
          className={styles.row_container}
        >
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>
              Преобразование дробной части в десятичную систему
            </div>
            <div>Дробная часть: {floatPartOfAmount}</div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Формула</div>
            <div
              id={inputFieldsId.formulaOfFloatPart}
              className={styles.formula}
            ></div>
          </div>
          <div className={styles.row_two_col}>
            <div className={styles.step_title}>Результат</div>
            <div
              id={inputFieldsId.convertedToDecFloatPart}
              className={styles.formula}
            ></div>
          </div>
        </div>
      </div>
      <div className={styles.info_container}>
        <div id={sectionsId.resultSection} className={styles.result_container}>
          <div className={styles.resultSection}>
            <p>
              Результатом{" "}
              {searchParams.get("type") === addingNumbersPath.path
                ? "сложение"
                : "умножения"}{" "}
              чисел <b>{firstValue}</b> и <b>{secondValue}</b> с точностью{" "}
              <b>{selectedAccuracy}</b> является число{" "}
              <b>
                {amountInAddingCode ? -amountInDecSystem : amountInDecSystem}
              </b>
            </p>
          </div>
        </div>
        <div className={styles.text_container}>{text}</div>
        <div className={styles.buttons_container}>
          <Button
            text={
              Object.keys(theory).length + 1 === globalStep
                ? "Повторить"
                : "Следующий этап"
            }
            size={defineButtonSize()}
            id="nextStepBttn"
            onClickFunction={
              Object.keys(theory).length + 1 === globalStep
                ? resetAll
                : startAll
            }
            disabled={isAutomate}
          />
          <Button
            text={
              isAutomate ? "Показывать поэтапно" : "Показывать автоматически"
            }
            size={defineButtonSize()}
            onClickFunction={setAutomate}
            disabled={Object.keys(theory).length + 1 === globalStep}
          />
          <Button
            text="Ввести данные заново"
            size={defineButtonSize()}
            onClickFunction={reenterTheData}
            disabled={isAutomate}
          />
        </div>
      </div>
    </div>
  );
}

export default ArithmeticOperationsPage;
