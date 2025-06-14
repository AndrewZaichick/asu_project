import { ReactElement } from "react";

import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./textinput.module.scss";

function TextInput({
  placeholder = "Введите данные",
  onTextChange,
  autoComplete = false,
  hasBorder = true,
  disable = false,
}: IProps): ReactElement {
  return (
    <input
      autoComplete={autoComplete.toString()}
      className={classNames(
        styles.input,
        hasBorder ? styles.with_border : styles.without_border,
      )}
      type="text"
      placeholder={placeholder}
      defaultValue={""}
      onChange={onTextChange}
      disabled={disable}
    />
  );
}

export default TextInput;
