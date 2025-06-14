import React, { ReactElement } from "react";

import { IProps } from "./IProps";
import styles from "./field.module.scss";

function SumField({
  firstValue,
  secondValue,
  sectionId,
  addingUnit = "",
  addingUnitIdOfFirstValue = "",
  addingUnitIdOfSecondValue = "",
  currentDigitOfFirstValueId = "",
  currentDigitOfSecondValueId = "",
  resultIdOfFirstAdding,
  resultIdOfSecondAdding,
  templateForEachDigitsOfFirstValue,
  templateForEachDigitsOfSecondValue,
  sectionTitle,
  isSecondValueNegative = false,
  sumId,
}: IProps): ReactElement {
  if (addingUnit) {
    return (
      <div id={sectionId} className={styles.row_container}>
        <div className={styles.row_three_col}>
          <div className={styles.step_title}>{sectionTitle}</div>
          <div style={{ wordBreak: "break-all" }}>
            {firstValue.split("").map((value, index) => {
              if (value === ".") {
                return <span key={index}>{value}</span>;
              } else {
                return (
                  <span
                    key={index}
                    id={index + templateForEachDigitsOfFirstValue}
                  >
                    {value}
                  </span>
                );
              }
            })}
          </div>
          <div style={{ wordBreak: "break-all" }}>
            {secondValue.split("").map((value, index) => {
              if (value === ".") {
                return <span key={index}>{value}</span>;
              } else {
                return (
                  <span
                    key={index}
                    id={index + templateForEachDigitsOfSecondValue}
                  >
                    {value}
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.row_three_col}>
          <div>Добавочная единица</div>
          <div>
            {addingUnit.split("").map((value, index) => {
              if (value === ".") {
                return <span key={index}>{value}</span>;
              } else {
                return (
                  <span key={index} id={index + addingUnitIdOfFirstValue}>
                    {value}
                  </span>
                );
              }
            })}
          </div>
          {isSecondValueNegative && (
            <div>
              {addingUnit.split("").map((value, index) => {
                if (value === ".") {
                  return <span key={index}>{value}</span>;
                } else {
                  return (
                    <span key={index} id={index + addingUnitIdOfSecondValue}>
                      {value}
                    </span>
                  );
                }
              })}
            </div>
          )}
        </div>
        <div className={styles.row_three_col}>
          <div>Результат</div>
          <div className={styles.sum}>
            <span id={resultIdOfFirstAdding}></span>
          </div>
          {isSecondValueNegative && (
            <div className={styles.sum}>
              <span id={resultIdOfSecondAdding}></span>
            </div>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div id={sectionId} className={styles.addiction_container}>
        <div className={styles.row}>
          <div className={styles.step_title}>{sectionTitle}</div>
          <div style={{ wordBreak: "break-all" }}>
            {firstValue.split("").map((value, index) => {
              if (value === ".") {
                return <span key={index}>{value}</span>;
              } else {
                return (
                  <span
                    key={index}
                    id={index + templateForEachDigitsOfFirstValue}
                  >
                    {value}
                  </span>
                );
              }
            })}
          </div>
          <div style={{ wordBreak: "break-all" }}>
            {secondValue.split("").map((value, index) => {
              if (value === ".") {
                return <span key={index}>{value}</span>;
              } else {
                return (
                  <span
                    key={index}
                    id={index + templateForEachDigitsOfSecondValue}
                  >
                    {value}
                  </span>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.second_col}>Текущая цифра</div>
          <div>
            <span id={currentDigitOfFirstValueId}></span>
          </div>
          <div>
            <span id={currentDigitOfSecondValueId}></span>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.second_col}>Результат</div>
          <div className={styles.sum}>
            <span id={sumId}></span>
          </div>
        </div>
      </div>
    );
  }
}

export default SumField;
