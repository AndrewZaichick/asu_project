import { ReactElement } from "react";

import Button from "@components/Button/Button";

import { IProps } from "./IProps";
import styles from "./WindowForTheory.module.scss";

function WindowForTheory({ text, hideFunc }: IProps): ReactElement {
  function handleClick() {
    hideFunc();
  }
  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <textarea className={styles.text} readOnly autoFocus>
          {text}
        </textarea>
        <div className={styles.button}>
          <Button text="Закрыть" onClickFunction={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default WindowForTheory;
