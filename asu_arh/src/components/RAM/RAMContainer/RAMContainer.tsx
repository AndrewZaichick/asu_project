import { ReactElement } from "react";

import classNames from "classnames";

import { IProps } from "./IProps";
import styles from "./container.module.scss";

function RAMContainer({ size, children }: IProps): ReactElement {
  return (
    <div className={classNames(styles.table, styles[size])}>{children}</div>
  );
}

export default RAMContainer;
