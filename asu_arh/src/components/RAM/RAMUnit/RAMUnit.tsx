import React, {
  ChangeEvent,
  FocusEvent,
  ReactElement,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { RAMValuesChangedInCurrentSessionContext } from "@context/RAMValuesChangedInCurrentSessionContext";
import { IRAMValues } from "@interfaces/IRAMValues";
import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./unit.module.scss";

function RAMUnit({
  text,
  isZero = false,
  rowIndex,
  colIndex,
  showZeroValues = false,
  changeValue,
  isChecking,
  selectedValues = [],
  setSelectedValues = (e: SetStateAction<IRAMValues[]>) => {},
  numberOfBlock,
  isSelectable = true,
  isChangeable = true,
}: IProps): ReactElement {
  const [focus, setFocus] = useState<boolean>();
  const [isCtrlDown, setIsCtrlDown] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const { valuesChangedInCurrentSession } = useContext(
    RAMValuesChangedInCurrentSessionContext,
  );

  useEffect(() => {
    if (isSelectable) {
      window.addEventListener("keydown", checkCtrl);
      window.addEventListener("keyup", checkCtrl);

      return () => {
        window.removeEventListener("keydown", checkCtrl);
        window.removeEventListener("keyup", checkCtrl);
      };
    }
  });

  useEffect(() => {
    setValue(text);
  }, [text]);

  useEffect(() => {
    setIsChanged(isValueChanged());
  }, [valuesChangedInCurrentSession]);

  useEffect(() => {
    if (isSelected) {
      setSelectedValues([
        ...selectedValues,
        { rowIndex: rowIndex, colIndex: colIndex },
      ]);
    } else {
      setSelectedValues(
        selectedValues.filter(
          (item) => item.colIndex !== colIndex && item.rowIndex !== rowIndex,
        ),
      );
    }
  }, [isSelected]);

  function handleSetFocus() {
    setFocus(true);
  }

  function setText(e: ChangeEvent<HTMLInputElement>) {
    changeValue(numberOfBlock, rowIndex, colIndex, e.target.value);
    setValue(e.target.value);
  }

  function selectItem() {
    if (isCtrlDown) {
      setIsSelected((prev) => !prev);
    }
  }

  function checkCtrl(e: KeyboardEvent) {
    setIsCtrlDown(e.ctrlKey);
  }

  function lostFocus(e: FocusEvent<HTMLElement>) {
    e.currentTarget.blur();
    setFocus(false);

    if (isZero) {
      e.currentTarget.className = styles.zero;
    }
  }

  function isValueChanged(): boolean {
    return (
      valuesChangedInCurrentSession?.find(
        (item) =>
          item.numberOfBlock === numberOfBlock &&
          item.rowIndex === rowIndex &&
          item.colIndex === colIndex,
      ) !== undefined
    );
  }

  if (focus) {
    return (
      <td
        className={classNames(
          styles.cell,
          showZeroValues && isZero !== null
            ? isZero
              ? styles.zero
              : styles.not_zero
            : null,
          isChanged && !isSelected && styles.changed,
          isSelected && styles.selected,
          isChecking && !isSelected && styles.checking,
        )}
      >
        <input
          onBlur={lostFocus}
          autoFocus
          className={styles.input}
          value={value}
          onChange={setText}
          maxLength={4}
        />
      </td>
    );
  } else {
    return (
      <td
        className={classNames(
          styles.cell,
          showZeroValues && isZero !== null
            ? isZero
              ? styles.zero
              : styles.not_zero
            : null,
          isChanged && !isSelected && styles.changed,
          isSelected && styles.selected,
          isChecking && !isSelected && styles.checking,
        )}
        onDoubleClick={isChangeable ? handleSetFocus : () => {}}
        onClick={selectItem}
      >
        {value}
      </td>
    );
  }
}

export default RAMUnit;
