import React, { ReactElement } from "react";

import { IProps } from "./IProps";
import styles from "./gridrow.module.scss";

function GridRowContainer({
  sectionId = "",
  sectionTitle = "",
  idOfFirstField = "",
  idOfSecondField = "",
  firstValue = "",
  secondValue = "",
}: IProps): ReactElement {
  return (
    <div id={sectionId} className={styles.row_container}>
      <div className={styles.row_three_col}>
        <div className={styles.step_title}>{sectionTitle}</div>
        <div id={idOfFirstField}>{firstValue}</div>
        <div id={idOfSecondField}>{secondValue}</div>
      </div>
    </div>
  );
}

export default GridRowContainer;
