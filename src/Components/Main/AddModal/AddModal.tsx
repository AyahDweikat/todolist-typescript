import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./addModal.module.css";
import { Task } from "../../../utilsInterface";
// import { Modal } from '../../../../node_modules/react-overlays/cjs/index';

function* generateID() {
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}
function getID() {
  return generateID().next().value;
}
type PropsAddModal = {
  isModalOpen: boolean;
  setIsModalOpen: (arg0: boolean) => void;
  addTask: (arg0: Task) => void;
};

const AddModal: React.FC<PropsAddModal> = ({
  isModalOpen,
  setIsModalOpen,
  addTask,
}) => {
  const [task, setTask]: [string, Dispatch<SetStateAction<string>>] =
    useState("");
  const [assignee, setAssignee]: [string, Dispatch<SetStateAction<string>>] =
    useState("");

  function submitHandle(e: React.SyntheticEvent) {
    e.preventDefault();
    addTask({ id: `${getID()}`, task, assignee, isDone: false });
    resetHandle();
    setIsModalOpen(false);
  }
  function resetHandle() {
    setTask("");
    setAssignee("");
  }
  //   const renderBackdrop = (props) => <div className="backdrop" {...props} />;
  const renderBackdrop = () => <div className="backdrop" />;
  return (
    <div>
      {/* <Modal
        className={styles.modal}
        show={isModalOpen}
        renderBackdrop={renderBackdrop}
      > */}
        <section>
          <div className={styles.modal}>
            <h3>Add a New Task</h3>
            <form onSubmit={(e: React.SyntheticEvent)=> submitHandle(e)}>
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
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </section>
      {/* </Modal> */}
    </div>
  );
};

export default AddModal;
