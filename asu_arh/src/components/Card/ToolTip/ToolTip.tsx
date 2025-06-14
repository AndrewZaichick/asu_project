import { ReactElement } from "react";

import styles from "./tooltip.module.scss";

interface Props {
  isVisible: boolean;
  text: string;
}

function ToolTip({ text = "" }: Props): ReactElement {
  return <div className={styles.container}>{text}</div>;
}

export default ToolTip;
