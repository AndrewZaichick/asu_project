import { ReactElement } from "react";

import Card from "@components/Card/Card";
import {
  RAM,
  addingNumbers,
  arithmeticOperations,
  cache,
  compareNumbers,
  dynamicRAM,
  laboratories,
  multiplicationOfNumbers,
} from "@router/Links";
import { createAPathWithParametr } from "@scripts/scripts";
import { Link } from "react-router-dom";

import styles from "./laboratoriespage.module.scss";

function LaboratoriesPage(): ReactElement {
  return (
    <div className={styles.container}>
      <Link
        to={
          laboratories.path +
          createAPathWithParametr(
            arithmeticOperations.path,
            addingNumbers.path,
            addingNumbers.isParameter as boolean,
          )
        }
        className={styles.link}
      >
        <Card
          title={addingNumbers.title}
          toolTipText={addingNumbers.toolTipText}
        />
      </Link>
      <Link
        to={laboratories.path + compareNumbers.path}
        className={styles.link}
      >
        <Card
          title={compareNumbers.title}
          toolTipText={compareNumbers.toolTipText}
        />
      </Link>
      <Link to={laboratories.path + dynamicRAM.path} className={styles.link}>
        <Card title={dynamicRAM.title} toolTipText={dynamicRAM.toolTipText} />
      </Link>
      <Link to={laboratories.path + RAM.path} className={styles.link}>
        <Card title={RAM.title} toolTipText={RAM.toolTipText} />
      </Link>
      <Link to={laboratories.path + cache.path} className={styles.link}>
        <Card title={cache.title} toolTipText={cache.toolTipText} />
      </Link>
      <Link
        to={
          laboratories.path +
          createAPathWithParametr(
            arithmeticOperations.path,
            multiplicationOfNumbers.path,
            multiplicationOfNumbers.isParameter as boolean,
          )
        }
        className={styles.link}
      >
        <Card
          title={multiplicationOfNumbers.title}
          toolTipText={multiplicationOfNumbers.toolTipText}
        />
      </Link>
    </div>
  );
}

export default LaboratoriesPage;
