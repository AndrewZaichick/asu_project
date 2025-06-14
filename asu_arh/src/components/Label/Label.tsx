import { ReactElement } from "react";

interface Props {
  title: string;
}

function Label({ title = "" }: Props): ReactElement {
  return <label>{title}</label>;
}

export default Label;
