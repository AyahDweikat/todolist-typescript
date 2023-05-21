import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./addModal.module.css";
import { Task } from "../../../utilsInterface";

function* generateID() {
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}
function getID() {
  return generateID().next().value;
}
type PropsAddModal = {
  onChangeIsModalOpen: (arg0: boolean) => void;
  addTask: (arg0: Task) => void;
};

const AddModal: React.FC<PropsAddModal> = ({ onChangeIsModalOpen, addTask }) => {
  const [task, setTask] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");

  function submitHandle(e: React.SyntheticEvent) {
    e.preventDefault();
    addTask({ id: `${getID()}`, task, assignee, isDone: false });
    resetHandle();
    onChangeIsModalOpen(false);
  }
  function resetHandle() {
    setTask("");
    setAssignee("");
  }
  return (
    <div>
      <section>
        <div className={styles.modal}>
          <h3>Add a New Task</h3>
          <form onSubmit={(e: React.SyntheticEvent) => submitHandle(e)}>
            <div className={styles.formControl}>
              <label htmlFor="task">Task</label>
              <input
                autoFocus
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="task"
                placeholder="Task"
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="assignee">Assignee</label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="assignee"
                placeholder="Assignee"
              />
            </div>
            <div className={styles.modalBtns}>
              <button
                type="button"
                data-bs-dismiss="modal"
                onClick={() => onChangeIsModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit">Add</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default AddModal;
