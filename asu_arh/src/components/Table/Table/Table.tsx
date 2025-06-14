import { ReactElement } from "react";

import TableCell from "../TableCell/TableCell";
import TableRow from "../TableRow/TableRow";
import { IProps } from "./IProps";
import styles from "./table.module.scss";

function Table({
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
    <div className={styles.container}>
      {values.map((arr, rowIndex) => {
        return (
          <TableRow>
            {arr.map((item, colIndex) => {
              return (
                <TableCell
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
          </TableRow>
        );
      })}
    </div>
  );
}

export default Table;
