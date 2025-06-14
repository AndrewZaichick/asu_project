import React, { ReactElement, ReactNode } from "react";

import styles from "./tableRow.module.scss";

interface IProps {
  children: ReactNode;
}

function TableRow({ children }: IProps): ReactElement {
  return <div className={styles.row}>{children}</div>;
}

export default TableRow;
