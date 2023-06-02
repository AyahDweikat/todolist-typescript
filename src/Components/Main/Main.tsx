import React, { useState } from "react";
import { useEffect } from "react";
import styles from "./main.module.css";
import { Task } from "../../utilsInterface";
import Filters from "./Filters/Filters";
import AddModal from "./AddModal/AddModal";
import Tasks from "./../Tasks/Tasks";

type PropsMain = {
  searchValue: string;
};

const Main: React.FC<PropsMain> = ({ searchValue }) => {
  const [isModalOpen, setIsModalOpen]= useState<boolean>(false);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  function fetchData() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "https://todolist-backend-app-nodb.onrender.com/getTasks",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) setAllTasks(data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchData();
  }, []);
  const tasks = getSearchResults(searchValue, allTasks);
  function filterTasks(tasks: Task[], activeFilter: string): Task[] {
    if (!tasks.length) return tasks;
    else if (activeFilter == "all") return tasks;
    else if (activeFilter === "done")
      return tasks.filter(({ isDone }) => isDone);
    else return tasks.filter(({ isDone }) => !isDone);
  }
  function getSearchResults(searchValue: string, allTasks: Task[]): Task[] {
    if (searchValue === "") {
      return filterTasks(allTasks, activeFilter);
    } else {
      return filterTasks(
        allTasks.filter(
          (task) =>
            task.task.toLowerCase().includes(searchValue.toLowerCase()) ||
            task.assignee.toLowerCase().includes(searchValue.toLowerCase())
        ),
        activeFilter
      );
    }
  }
  function addTask(task: Task) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    };
    fetch(
      "https://todolist-backend-app-nodb.onrender.com/addTasks",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data);
    setAllTasks([...allTasks, task]);
  }
  function changeState(id: string) {
    let newState = false;
    const _tasks: Task[] = allTasks.map((item) => {
      if (item.id == id) {
        newState = item.isDone;
        return {
          ...item,
          isDone: !item.isDone,
        };
      } else {
        return item;
      }
    });
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isDone: newState }),
    };
    fetch(
      `https://todolist-backend-app-nodb.onrender.com/changedoneState/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data);
    setAllTasks(_tasks);
  }
  function editTask(id: string, newTask: string) {
    const _tasks: Task[] = allTasks.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          task: newTask,
        };
      } else {
        return item;
      }
    });
    setAllTasks(_tasks);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask }),
    };
    fetch(
      `https://todolist-backend-app-nodb.onrender.com/editTask/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data);
  }
  function deleteTask(id: string, allTasks: Task[]) {
    const _tasks: Task[] = allTasks.filter((item) => {
      return item.id !== id;
    });
    setAllTasks(_tasks);
    const requestOptions = {
      method: "DELETE",
    };
    fetch(
      `https://todolist-backend-app-nodb.onrender.com/deleteTask/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => data);
    handleClose();
  }
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.mainSection}>
      <section className={styles.heroSection}>
        <div className={styles.heading}>
          <h2>
            You Got{" "}
            <span className={styles.taskNum}>{allTasks.length} Tasks </span>
            today
          </h2>
          <button
          name="newTask"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <span className={styles.plusSign}>
              <i className="fa-solid fa-plus" />
            </span>{" "}
            New Task
          </button>
        </div>
        <Filters
          tasks={allTasks}
          activeFilter={activeFilter}
          onChangeActiveFilter={setActiveFilter}
        />
      </section>
      {isModalOpen && (
        <AddModal
          onChangeIsModalOpen={setIsModalOpen}
          addTask={addTask}
        />
      )}
      <Tasks
        tasks={tasks}
        changeState={changeState}
        deleteTask={deleteTask}
        editTask={editTask}
      />
    </div>
  );
};

export default Main;
