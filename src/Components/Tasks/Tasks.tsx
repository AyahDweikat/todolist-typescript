import React, { useState } from "react";
import styles from "./tasks.module.css";
import { Task } from "../../utilsInterface";
import ModalTask from "./ModaLTask/ModalTask";

type PropsTasks = {
  tasks: Task[];
  changeState: (id: string) => void;
  deleteTask: (id: string, allTasks: Task[]) => void;
  editTask: (id: string, newTask: string) => void;
};
const Tasks: React.FC<PropsTasks> = ({
  tasks,
  changeState,
  deleteTask,
  editTask,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [idEdit, setIdEdit] = useState<string>("");
  const [idToDelete, setIdToDelete] = useState<string>("");

  const handleClose = (): void => {
    setIsModalOpen(false);
  };
  function turnToEdit(idx: string) {
    setIdEdit(idx);
  }
  function turnToTask() {
    setIdEdit("");
  }
  function submitInput(id: string) {
    editTask(id, inputValue);
    setInputValue("");
    turnToTask();
  }
  return (
    <section className={styles.tasks}>
      <ul id="taskDisplay" className={styles.taskList}>
        {tasks?.map((item) => {
          return (
            <li
              key={item.id}
              className={item.isDone ? styles.doneTask : styles.undoneTask}
            >
              <div>
                <button
                  className={styles.btnDoneState}
                  onClick={() => changeState(item.id)}
                >
                  <i
                    className={
                      item.isDone
                        ? `fa-solid fa-circle-check ${styles.doneBtn}`
                        : `fa-regular fa-circle ${styles.undoneBtn}`
                    }
                    style={{ color: "#14bba6" }}
                  ></i>
                </button>
              </div>
              <div>
                {idEdit == item.id && !item.isDone ? (
                  <input
                    autoFocus
                    key={item.id}
                    className={styles.editInpt}
                    onBlur={() => submitInput(item.id)}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                    }}
                    value={inputValue}
                  />
                ) : (
                  <p
                    key={item.id}
                    onDoubleClick={() => {
                      setInputValue(item.task);
                      turnToEdit(item.id);
                    }}
                  >
                    {item.task}
                  </p>
                )}
                <span>{item.assignee}</span>
              </div>
              <div className={styles.delEditBtn}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => {
                    setIsModalOpen(true);
                    setIdToDelete(item.id);
                  }}
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#FF0000" }}
                  ></i>
                </button>
                <button
                  className={styles.btnEdit}
                  onClick={() => {
                    setInputValue(item.task);
                    turnToEdit(item.id);
                  }}
                  disabled={item.isDone}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      {isModalOpen && (
        <ModalTask
          handleClose={handleClose}
          deleteTask={deleteTask}
          tasks={tasks}
          id={idToDelete}
        />
      )}
    </section>
  );
};

export default Tasks;
