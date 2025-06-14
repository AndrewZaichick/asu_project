import React from "react";

import { IRAMValue } from "@interfaces/IRAMValue";

interface IContext {
  valuesChangedInCurrentSession: IRAMValue[];
}

const RAMValuesChangedInCurrentSessionContext = React.createContext(
  {} as IContext,
);

export { RAMValuesChangedInCurrentSessionContext };
