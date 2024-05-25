import { useState, ChangeEvent } from "react";
import { TaskFilterType } from "../../App";
import "./TodoList.css";

import AddItemForm from "../AddItemForm/AddItemForm";
import EditTitle from "../EditTitle/EditTitle";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { blue } from "@mui/material/colors";

interface TodoListProps {
  title: string;
  id: string;
  filter: TaskFilterType;
  tasks: Array<TaskType>;
  removeTask: (id: string, todolistID: string) => void;
  changeFilter: (value: TaskFilterType, todolistID: string) => void;
  addTask: (title: string, todolistID: string) => void;
  changeCheckbox: (id: string, isDone: boolean, todolistID: string) => void;
  removeTodolist: (todolistID: string) => void;
  changeTaskTitle: (id: string, todolistID: string, newValue: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
}

export interface TaskType {
  id: string;
  title: string;
  isDone: boolean;
}

const TodoList = (props: TodoListProps) => {
  console.log("Todolist +");

  // Function-callback
  function onChangeFilterCompleted() {
    props.changeFilter("completed", props.id);
  }
  function onChangeFilterActive() {
    props.changeFilter("active", props.id);
  }
  function onChangeFilterAll() {
    props.changeFilter("all", props.id);
  }
  function removeTodolist() {
    props.removeTodolist(props.id);
  }
  function addTask(title: string) {
    props.addTask(title, props.id);
  }
  function changeTodolistTitle(newTitle: string) {
    props.changeTodolistTitle(props.id, newTitle);
  }

  return (
    <div className="todo-general">
      <div className="todo-top">
        <h3 className="todo-top__title">
          <abbr
            title="Дважды кликните по заголовку для изменения :)"
            style={{
              textDecoration: "none",
              textTransform: "uppercase",
              fontWeight: "700",
            }}
          >
            <EditTitle
              title={props.title}
              onChangeTitle={changeTodolistTitle}
            />
          </abbr>
          <IconButton
            aria-label="delete"
            color="error"
            className="todo-top__btn"
            onClick={removeTodolist}
          >
            <DeleteIcon />
          </IconButton>
        </h3>
      </div>
      <div className="add-item__form">
        <AddItemForm addItem={addTask} />
      </div>
      <ul>
        {props.tasks.map((t) => {
          function onRemoveTaskHandler() {
            props.removeTask(props.id, t.id);
          }
          function onChangeCheckbox(e: ChangeEvent<HTMLInputElement>) {
            props.changeCheckbox(t.id, e.currentTarget.checked, props.id);
          }
          function onChangeTitle(newValue: string) {
            props.changeTaskTitle(t.id, props.id, newValue);
          }
          return (
            <li className="todo-li" key={t.id}>
              <Checkbox
                checked={t.isDone}
                onChange={onChangeCheckbox}
                sx={{
                  color: blue[800],
                  "&.Mui-checked": {
                    color: blue[600],
                  },
                }}
              />
              <EditTitle
                isDone={t.isDone}
                title={t.title}
                onChangeTitle={onChangeTitle}
              />
              <IconButton
                aria-label="delete"
                color="primary"
                className="todo-top__btn"
                onClick={onRemoveTaskHandler}
              >
                <DeleteIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>

      <div className="todo-filter">
        <Button
          color="primary"
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onChangeFilterAll}
        >
          All
        </Button>
        <Button
          color="primary"
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onChangeFilterCompleted}
        >
          Completed
        </Button>
        <Button
          color="primary"
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onChangeFilterActive}
        >
          Active
        </Button>
      </div>
    </div>
  );
};

export default TodoList;
