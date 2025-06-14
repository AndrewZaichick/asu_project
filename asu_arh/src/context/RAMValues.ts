import React from "react";

import { IRAMValue } from "@interfaces/IRAMValue";

interface IContext {
  numberOfBlock: number;
  valuesOfBlock: string[][];
}

const RAMValues = React.createContext({} as IContext);

export { RAMValues };
