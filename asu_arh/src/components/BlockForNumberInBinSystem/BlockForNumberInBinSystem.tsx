import React, { ReactElement } from "react";

import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./block.module.scss";

function BlockForNumberInBinSystem({
  indexOfSelectedDigit,
  number,
  maxDigit,
  isBigger,
  isLower,
  areEquals,
}: IProps): ReactElement {
  return (
    <div className={styles.block}>
      <div className={styles.title_digits}>Разряды</div>
      <div className={styles.outer_container_for_numbers}>
        <div className={styles.numbers_container}>
          {number.split("").map((item, index) => {
            if (index !== 0) {
              maxDigit--;
            }

            return (
              <div key={index}>
                <span
                  className={classNames(
                    index === 0 && styles.sing,
                    styles.digit,
                    index === indexOfSelectedDigit &&
                      areEquals &&
                      styles.selected,
                    isBigger &&
                      index === indexOfSelectedDigit &&
                      styles.isbigger,
                    isLower && index === indexOfSelectedDigit && styles.islower,
                  )}
                >
                  {index === 0 ? "+/-" : item !== "." ? maxDigit : "0"}
                </span>
                <span
                  className={classNames(
                    index === 0 ? styles.sing : null,
                    styles.number,
                    index === indexOfSelectedDigit &&
                      areEquals &&
                      styles.selected,
                    isBigger &&
                      index === indexOfSelectedDigit &&
                      styles.isbigger,
                    isLower && index === indexOfSelectedDigit && styles.islower,
                  )}
                >
                  {item}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BlockForNumberInBinSystem;
