import React from "react";
import styles from "./filters.module.css";
import { Task } from "../../../utilsInterface";

type PropsFilters = {
  tasks: Task[];
  activeFilter: string;
  onChangeActiveFilter: (val: string) => void;
};

const Filters: React.FC<PropsFilters> = ({
  tasks,
  activeFilter,
  onChangeActiveFilter,
}) => {
  const doneCount = tasks.filter(({ isDone }) => isDone).length;
  const pendingCount = tasks.length - doneCount;

  function handleDoneClick(): void {
    if (activeFilter == "done") onChangeActiveFilter("all");
    else onChangeActiveFilter("done");
  }
  function handlePendingClick(): void {
    if (activeFilter == "pending") onChangeActiveFilter("all");
    else onChangeActiveFilter("pending");
  }

  return (
    <div className={styles.filters}>
      <span
        className={activeFilter === "done" ? styles.active : ""}
        onClick={handleDoneClick}
      >
        Done (<span>{doneCount}</span>)
      </span>
      <span
        className={activeFilter === "pending" ? styles.active : ""}
        onClick={handlePendingClick}
      >
        Pending (<span>{pendingCount}</span>)
      </span>
    </div>
  );
};

export default Filters;
