import { ReactElement } from "react";

import RAMUnit from "../RAMUnit/RAMUnit";
import { IProps } from "./IProps";
import styles from "./ram.module.scss";

function RAM({
  checkingColIndex,
  checkingRowIndex,
  values,
  zeroValues,
  showZeroValues,
  changeValue,
  showChecking,
  selectedValues,
  setSelectedValues,
  numberOfBlock,
  isChangeable = true,
  isSelectable = true,
}: IProps): ReactElement {
  function isZero(rowIndex: number, colIndex: number): boolean {
    for (let i = 0; i < zeroValues.length; i++) {
      if (
        zeroValues[i].rowIndex === rowIndex &&
        zeroValues[i].colIndex === colIndex
      ) {
        return true;
      }
    }

    return false;
  }

  return (
    <table className={styles.container}>
      <tbody>
        {values.map((array, rowIndex) => {
          return (
            <tr className={styles.cell} key={rowIndex + 100}>
              {array.map((item, colIndex) => {
                return (
                  <RAMUnit
                    key={colIndex + 1000}
                    text={item}
                    isZero={isZero(rowIndex, colIndex)}
                    rowIndex={rowIndex}
                    colIndex={colIndex}
                    showZeroValues={showZeroValues}
                    changeValue={changeValue}
                    isChecking={
                      rowIndex === checkingRowIndex &&
                      colIndex === checkingColIndex &&
                      showChecking
                    }
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    numberOfBlock={numberOfBlock}
                    isChangeable={isChangeable}
                    isSelectable={isSelectable}
                  />
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default RAM;
