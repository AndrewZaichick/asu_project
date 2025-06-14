import { ReactElement, useState } from "react";

import ToolTip from "./ToolTip/ToolTip";
import styles from "./card.module.scss";

interface Props {
  title: string;
  toolTipText?: string;
}

function Card({ title = "", toolTipText = "" }: Props): ReactElement {
  const [showToolTip, setShowTooltip] = useState<boolean>(false);

  function switchShow() {
    setShowTooltip((prev) => !prev);
  }

  return (
    <div
      className={styles.container}
      onMouseEnter={switchShow}
      onMouseLeave={switchShow}
    >
      {toolTipText && <ToolTip isVisible={showToolTip} text={toolTipText} />}
      <h2>{title}</h2>
    </div>
  );
}

export default Card;
