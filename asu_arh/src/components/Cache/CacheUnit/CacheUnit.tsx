import React, {
  ChangeEvent,
  FocusEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./unit.module.scss";

function CacheUnit({
  text,
  rowIndex,
  colIndex,
  changeValue,
  isChecking,
  isAddedValue,
  isValueFounded,
  titleOfCache,
  isCheckingForAlreadyUsedValues,
  isChangeable = true,
}: IProps): ReactElement {
  const [focus, setFocus] = useState<boolean>();
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(text);
  }, [text]);

  function handleSetFocus() {
    if (isChangeable) {
      setFocus(true);
    }
  }

  function setText(e: ChangeEvent<HTMLInputElement> | null, text?: string) {
    e?.preventDefault();
    const regex: RegExp = /^\d{1,}$/;
    const value: string = e !== null ? e.target.value : String(text);

    if (regex.test(value)) {
      if (Number(value) >= 0 && Number(value) <= 100) {
        changeValue(Number(value).toString(), rowIndex, colIndex, titleOfCache);
        setValue(Number(value).toString());
      } else {
        alert("Число должно быть в диапазоне [1:100]");
      }
    } else if (value === "") {
      changeValue(value, rowIndex, colIndex, titleOfCache);
      setValue(value);
    } else {
      alert("Введеный текст должен быть числом");
    }
  }

  function lostFocus(e: FocusEvent<HTMLElement>) {
    e.currentTarget.blur();
    setFocus(false);
    if (value === "") {
      setText(null, "0");
    }
  }

  if (focus) {
    return (
      <td
        className={classNames(
          styles.cell,
          isCheckingForAlreadyUsedValues &&
            styles.checking_for_already_used_values,
          isChecking && styles.checking,
          isAddedValue || isValueFounded ? styles.founded_or_added : null,
        )}
      >
        <input
          onBlur={lostFocus}
          autoFocus
          className={styles.input}
          value={value}
          onChange={setText}
        />
      </td>
    );
  } else {
    return (
      <td
        className={classNames(
          styles.cell,
          isCheckingForAlreadyUsedValues &&
            styles.checking_for_already_used_values,
          isChecking && styles.checking,
          isAddedValue || isValueFounded ? styles.founded_or_added : null,
        )}
        onDoubleClick={handleSetFocus}
      >
        {value}
      </td>
    );
  }
}

export default CacheUnit;
