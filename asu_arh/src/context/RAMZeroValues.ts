import React from "react";

import { IRAMValue } from "@interfaces/IRAMValue";

interface IContext {
  zeroValuesOfBlock: IRAMValue[];
}

const RAMZeroValues = React.createContext({} as IContext);

export { RAMZeroValues };
