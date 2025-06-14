import { ChangeEvent, ReactElement, SetStateAction, useRef } from "react";

import { IAccurancyOption } from "@interfaces/IAccurancyOption";
import { MdClear } from "react-icons/md";

import styles from "./select.module.scss";

interface IOption {
  title: string | number;
  value: string | number;
}

interface Props {
  options: IOption[];
  onSelect: (e: ChangeEvent<HTMLSelectElement> | null) => void;
  resetButton: boolean;
  disable?: boolean;
}

function Select({
  options,
  onSelect,
  resetButton = true,
  disable = false,
}: Props): ReactElement {
  const selectRef = useRef<HTMLSelectElement>(null);

  function resetChange(): void {
    if (selectRef && selectRef.current) {
      selectRef.current.selectedIndex = 0;
    }

    onSelect(null);
  }

  return (
    <div className={styles.container}>
      <select
        ref={selectRef}
        className={styles.select}
        onChange={onSelect}
        disabled={disable}
      >
        <option disabled value={""} selected>
          Выберите
        </option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
      {resetButton && (
        <span className={styles.reset_button} onClick={resetChange}>
          <MdClear color="black" size={30} />
        </span>
      )}
    </div>
  );
}

export default Select;
