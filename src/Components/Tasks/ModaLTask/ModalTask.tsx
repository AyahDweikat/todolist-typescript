import React from "react";
import { Task } from "../../../utilsInterface";
import styles from "./modalTasks.module.css";

type PropsModalTask = {
  handleClose: () => void;
  deleteTask: (id: string, allTasks: Task[]) => void;
  id: string;
  tasks: Task[];
};
const ModalTask: React.FC<PropsModalTask> = ({
  handleClose,
  deleteTask,
  id,
  tasks,
}) => {
  return (
    <div id="deleteModal" className={styles.modal}>
      <h3>Delete Task</h3>
      <p>Are you sure you want to delete this task?</p>
      <span>
        This is a permenant deletion, you won&apos;t be able to undo it
      </span>
      <div className={styles.modalBtns}>
        <button
          type="button"
          data-bs-dismiss="modal"
          onClick={() => handleClose()}
        >
          Cancel
        </button>
        <button
          type="button"
          id="delBtn"
          onClick={() => {
            deleteTask(id, tasks);
            handleClose();
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ModalTask;
