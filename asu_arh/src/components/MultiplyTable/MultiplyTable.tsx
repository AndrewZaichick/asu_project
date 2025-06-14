import { ReactElement } from "react";

import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./table.module.scss";

function MultiplyTable({
  values = [],
  firstValue,
  secondValue,
  resultOfMultiply,
}: IProps): ReactElement {
  return (
    <div className={styles.table}>
      <div className={styles.multiply_number_container}>
        <div className={styles.row}>
          {firstValue.split("").map((item, index) => {
            return (
              <span key={"1" + index} className={styles.cell}>
                {item}
              </span>
            );
          })}
        </div>
        <div className={styles.row}>
          {secondValue.split("").map((item, index) => {
            return (
              <span key={"2" + index} className={styles.cell}>
                {item}
              </span>
            );
          })}
        </div>
      </div>

      {values.map((arr, rowIndex) => {
        return (
          <div className={styles.row} key={"3" + rowIndex}>
            {arr.map((item, colIndex) => {
              return (
                <span className={styles.cell} key={"4" + colIndex}>
                  {item}
                </span>
              );
            })}
          </div>
        );
      })}
      <div className={styles.result_number}>
        <div className={styles.row}>
          {resultOfMultiply.split("").map((item, index) => {
            return (
              <span key={"5" + index} className={styles.cell}>
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MultiplyTable;
