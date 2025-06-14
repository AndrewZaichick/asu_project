import { ReactElement } from "react";

import Button from "@components/Button/Button";
import MultiplyTable from "@components/MultiplyTable/MultiplyTable";

import { IProps } from "./IProps";
import styles from "./windowForMultiply.module.scss";

function WindowForMultiply({
  stepsOfMultiply,
  resultOfMultiply,
  firstValue,
  secondValue,
  closeModalFunc,
}: IProps): ReactElement {
  function handleClose() {
    closeModalFunc();
  }

  return (
    <div className={styles.outer_container}>
      <div className={styles.inner_container}>
        <div className={styles.table}>
          <MultiplyTable
            values={stepsOfMultiply}
            firstValue={firstValue}
            secondValue={secondValue}
            resultOfMultiply={resultOfMultiply}
          />
        </div>
        <Button text="Закрыть" onClickFunction={handleClose} />
      </div>
    </div>
  );
}

export default WindowForMultiply;
