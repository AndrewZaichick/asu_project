import { ReactElement, useEffect, useState } from "react";

import BlockForNumberInBinSystem from "@components/BlockForNumberInBinSystem/BlockForNumberInBinSystem";
import Button from "@components/Button/Button";
import ModalWindow from "@components/ModalWindow/ModalWindow";
import WindowForTheory from "@components/WindowForTheory/WindowForTheory";
import { IAccurancyOption } from "@interfaces/IAccurancyOption";

import { ButtonSizes } from "../../enums/ButtonSizes";
import styles from "./page.module.scss";
import theory from "./theory";

function ComparingNumbersPage(): ReactElement {
  const [firstValue, setFirstValue] = useState<string | number | null>(0);
  const [firstValueInBin, setFirstValueInBin] = useState<string>("");
  const [secondValue, setSecondValue] = useState<string | number | null>(0);
  const [secondValueInBin, setSecondValueInBin] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(true);
  const [showTheory, setShowTheory] = useState<boolean>(false);
  const [currentDigit, setCurrentDigit] = useState<number>(-1);
  const [maxDigit, setMaxDigit] = useState<number>(0);
  const [theSign, setTheSign] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [selectedDigitOfFirstValue, setSelectedDigitOfFirstValue] =
    useState<number>(0);
  const [selectedDigitOfSecondValue, setSelectedDigitOfSecondValue] =
    useState<number>(0);
  const [firstNumberIsBigger, setFirstNumberIsBigger] =
    useState<boolean>(false);
  const [secondNumberIsBigger, setSecondNumberIsBigger] =
    useState<boolean>(false);
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
    {
      title: 6,
      value: 6,
    },
    {
      title: 7,
      value: 7,
    },
    {
      title: 8,
      value: 8,
    },
    {
      title: 9,
      value: 9,
    },
    {
      title: 10,
      value: 10,
    },
  ]);
  const [selectedAccuracy, setSelectedAccuracy] = useState<string | null>("");

  useEffect(() => {
    compareNumbers();
  }, [selectedDigitOfFirstValue, selectedDigitOfSecondValue]);

  useEffect(() => {
    if (currentDigit <= maxDigit + Number(selectedAccuracy) + 1) {
      setSelectedDigitOfFirstValue(Number(firstValueInBin[currentDigit]));
      setSelectedDigitOfSecondValue(Number(secondValueInBin[currentDigit]));
    } else {
      setResult("Числа равны");
    }
  }, [currentDigit]);

  function hideModal() {
    setShowModal(false);
    startPermatations();
  }

  function isValueNegative(value: number, valueInBin: string): string {
    return value < 0 ? "1" + valueInBin : "0" + valueInBin;
  }

  function increaseDigit(value: string): string {
    return "0" + value;
  }

  function eqializeDigit(value: string, maxLength: number): string {
    return value.length !== maxLength ? value.padStart(maxLength, "0") : value;
  }

  function startPermatations() {
    const wholePartOfFirstValue: string = convertToBinWholePart(
      Math.abs(Math.trunc(firstValue as number)),
    );
    const floatPartOfFirstValue: string = convertToBinFloatPart(
      Math.abs(Number(firstValue) - Math.trunc(firstValue as number)),
    );
    const wholePartOfSecondValue: string = convertToBinWholePart(
      Math.abs(Math.trunc(secondValue as number)),
    );
    const floatPartOfSecondValue: string = convertToBinFloatPart(
      Math.abs(Number(secondValue) - Math.trunc(secondValue as number)),
    );
    const maxLength: number =
      wholePartOfFirstValue.length > wholePartOfSecondValue.length
        ? wholePartOfFirstValue.length
        : wholePartOfSecondValue.length;
    const equalizedWholePartOfFirstValue: string = eqializeDigit(
      wholePartOfFirstValue,
      maxLength,
    );
    const equalizedWholePartOfSecondValue: string = eqializeDigit(
      wholePartOfSecondValue,
      maxLength,
    );

    setFirstValueInBin(
      isValueNegative(
        Number(firstValue),
        increaseDigit(
          concatWholeAndFloatParts(
            equalizedWholePartOfFirstValue,
            floatPartOfFirstValue,
          ),
        ),
      ),
    );

    setSecondValueInBin(
      isValueNegative(
        Number(secondValue),
        increaseDigit(
          concatWholeAndFloatParts(
            equalizedWholePartOfSecondValue,
            floatPartOfSecondValue,
          ),
        ),
      ),
    );

    setMaxDigit(increaseDigit(equalizedWholePartOfFirstValue).length);
  }

  function reEnterData() {
    setSecondValue(0);
    setFirstValue(0);
    setCurrentDigit(-1);
    setMaxDigit(0);
    setSelectedAccuracy("");
    setSecondValueInBin("");
    setFirstValueInBin("");
    setResult("");
    setTheSign("");
    setShowModal(true);
    setFirstNumberIsBigger(false);
    setSecondNumberIsBigger(false);
  }

  function concatWholeAndFloatParts(
    wholePart: string,
    floatPart: string,
  ): string {
    return wholePart + "." + floatPart;
  }

  function convertToBinWholePart(value: number): string {
    return value.toString(2);
  }

  function convertToBinFloatPart(value: number): string {
    let result: string = "";

    while (result.length !== Number(selectedAccuracy)) {
      value *= 2;
      result += Math.trunc(value);
      value = value - Math.trunc(value);
    }

    return result;
  }

  function increaseIndex() {
    if (firstValueInBin[currentDigit + 1] === ".") {
      setCurrentDigit((prev) => (prev += 2));
    } else {
      setCurrentDigit((prev) => ++prev);
    }
  }

  function repeat() {
    setResult("");
    setFirstNumberIsBigger(false);
    setSecondNumberIsBigger(false);
    setCurrentDigit(-1);
  }

  function showTheoryFunc() {
    setShowTheory(true);
  }

  function hideTheory() {
    setShowTheory(false);
  }

  function compareNumbers() {
    if (
      currentDigit === 0 ||
      (Number(firstValue) < 0 && Number(secondValue) < 0)
    ) {
      if (selectedDigitOfFirstValue === selectedDigitOfSecondValue) {
        setFirstNumberIsBigger(false);
        setSecondNumberIsBigger(false);
        setTheSign("=");
      } else if (selectedDigitOfFirstValue > selectedDigitOfSecondValue) {
        setFirstNumberIsBigger(false);
        setSecondNumberIsBigger(true);
        setTheSign("<");
        setResult(`Число ${secondValue} больше, чем ${firstValue}`);
      } else {
        setFirstNumberIsBigger(true);
        setSecondNumberIsBigger(false);
        setTheSign(">");
        setResult(`Число ${firstValue} больше, чем ${secondValue}`);
      }
    } else {
      if (selectedDigitOfFirstValue < selectedDigitOfSecondValue) {
        setFirstNumberIsBigger(false);
        setSecondNumberIsBigger(true);
        setTheSign("<");
        setResult(`Число ${secondValue} больше, чем ${firstValue}`);
      } else if (selectedDigitOfFirstValue > selectedDigitOfSecondValue) {
        setFirstNumberIsBigger(true);
        setSecondNumberIsBigger(false);
        setTheSign(">");
        setResult(`Число ${firstValue} больше, чем ${secondValue}`);
      } else {
        setFirstNumberIsBigger(false);
        setSecondNumberIsBigger(false);
        setTheSign("=");
      }
    }
  }

  if (showModal) {
    return (
      <ModalWindow
        firstValue={firstValue}
        secondValue={secondValue}
        setFirstValue={setFirstValue}
        setSecondValue={setSecondValue}
        setShowSecondModal={hideModal}
        accurancyOptions={accuracyOptions}
        selectedAccuracy={selectedAccuracy}
        setSelectedAccurancy={setSelectedAccuracy}
      />
    );
  }

  return (
    <>
      {showTheory && <WindowForTheory text={theory} hideFunc={hideTheory} />}
      <div className={styles.container}>
        <div className={styles.blocks_container}>
          <div className={styles.block}>
            <div className={styles.title}>Первое число: {firstValue}</div>
            <BlockForNumberInBinSystem
              number={firstValueInBin}
              indexOfSelectedDigit={currentDigit}
              maxDigit={maxDigit + 1}
              isBigger={firstNumberIsBigger}
              isLower={secondNumberIsBigger}
              areEquals={firstNumberIsBigger === secondNumberIsBigger}
            />
          </div>
          <div className={styles.block}>
            <div className={styles.title}>Второе число: {secondValue}</div>
            <BlockForNumberInBinSystem
              number={secondValueInBin}
              indexOfSelectedDigit={currentDigit}
              maxDigit={maxDigit + 1}
              isBigger={secondNumberIsBigger}
              isLower={firstNumberIsBigger}
              areEquals={firstNumberIsBigger === secondNumberIsBigger}
            />
          </div>
        </div>
        <div className={styles.info_container}>
          <div className={styles.text_container}>
            {!showTheory && (
              <div className={styles.info_button}>
                <Button
                  size={ButtonSizes.Small}
                  text="?"
                  onClickFunction={showTheoryFunc}
                  circle
                />
              </div>
            )}
            <div className={styles.result}>{result}</div>
            <div className={styles.compare}>
              <div>{currentDigit !== -1 && selectedDigitOfFirstValue}</div>
              <div>{currentDigit !== -1 && theSign}</div>
              <div>{currentDigit !== -1 && selectedDigitOfSecondValue}</div>
            </div>
          </div>
          <div className={styles.button_container}>
            <Button
              text={result.length ? "Повторить" : "Сравнить разряд"}
              onClickFunction={result.length ? repeat : increaseIndex}
              size={ButtonSizes.Big}
            />
            <Button
              text="Ввести данные заново"
              onClickFunction={reEnterData}
              size={ButtonSizes.Big}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ComparingNumbersPage;
