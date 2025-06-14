import React, { ReactElement, useRef } from "react";

import classNames from "classnames";

import { ButtonSizes } from "../../enums/ButtonSizes";
import IProps from "./IProps";
import styles from "./button.module.scss";

export default function Button({
  text,
  onClickFunction,
  rounded = false,
  id = "",
  disabled = false,
  size = ButtonSizes.Medium,
  circle = false,
}: IProps): ReactElement {
  function handleClick() {
    onClickFunction();
  }

  return (
    <button
      id={id}
      disabled={disabled}
      className={classNames(
        styles.button,
        rounded ? styles.rounded : null,
        styles[size],
        circle ? styles.circle : null,
      )}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}
