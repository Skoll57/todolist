import React, { useReducer, useState } from "react";
import "./App.css";
// import { Routes, Route } from "react-router-dom";
import { v4 } from "uuid";
import TodoList, { TaskType } from "./component/TodoList/TodoList";
import AddItemForm from "./component/AddItemForm/AddItemForm";

// Material UI import
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import { Paper } from "@mui/material";

import {
  addTaskAC,
  changeCheckBoxAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./state/tasksReducer/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistReducer,
} from "./state/todoReducer/todolist-reducer";

// Type
export type TaskFilterType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: TaskFilterType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

const AppWithReducers: React.FC = () => {
  // Unic ID for todolists
  const idForTodolist1 = v4();
  const idForTodolist2 = v4();

  // State
  let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
    [idForTodolist1]: [
      { id: v4(), title: "HTML & CSS", isDone: true },
      { id: v4(), title: "JAVASCRIPT", isDone: true },
      { id: v4(), title: "REACT", isDone: false },
      { id: v4(), title: "REDUX", isDone: false },
    ],
    [idForTodolist2]: [
      { id: v4(), title: "PHONE", isDone: false },
      { id: v4(), title: "PC", isDone: true },
      { id: v4(), title: "PS 5", isDone: false },
      { id: v4(), title: "HEADPHONES", isDone: false },
    ],
  });

  let [todolists, dispatchToTodolistsReducer] = useReducer(todolistReducer, [
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ]);

  // CallBack Function
  // TASKS
  function removeTask(id: string, todolistID: string) {
    const action = removeTaskAC(id, todolistID);
    dispatchToTasksReducer(action);
  }

  function addTask(title: string, todolistID: string) {
    const action = addTaskAC(title, todolistID);
    dispatchToTasksReducer(action);
  }

  function changeCheckbox(id: string, isDone: boolean, todolistID: string) {
    const action = changeCheckBoxAC(id, todolistID, isDone);
    dispatchToTasksReducer(action);
  }

  function changeTaskTitle(id: string, todolistID: string, newTitle: string) {
    const action = changeTaskTitleAC(id, todolistID, newTitle);
    dispatchToTasksReducer(action);
  }

  // TODO
  function changeFilter(value: TaskFilterType, todolistID: string) {
    const action = changeTodolistFilterAC(todolistID, value);
    dispatchToTodolistsReducer(action);
  }

  function removeTodolist(todolistID: string) {
    const action = removeTodolistAC(todolistID);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function addTodolist(title: string) {
    const action = addTodolistAC(title);
    dispatchToTodolistsReducer(action);
    dispatchToTasksReducer(action);
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatchToTodolistsReducer(action);
  }

  return (
    <>
      {/* App Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "gray" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      {/* New Item Add*/}
      <Container fixed>
        <Grid container style={{ textAlign: "center" }}>
          <div className="new-todolist__block">
            <p className="new-todolist__title">Create new TodoList:</p>
            <AddItemForm addItem={addTodolist} />
            <section>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Excepturi dolorem veritatis impedit suscipit nisi magni minus
                repudiandae!
              </p>
            </section>
          </div>
        </Grid>
        <div className="App">
          <>
            <Grid container spacing={8}>
              {todolists.map((tl) => {
                // Filter
                let filteredTask = tasks[tl.id];

                switch (tl.filter) {
                  case "completed":
                    filteredTask = filteredTask.filter(
                      (t) => t.isDone === true
                    );
                    break;
                  case "active":
                    filteredTask = filteredTask.filter(
                      (t) => t.isDone === false
                    );
                    break;
                  default:
                    break;
                }

                return (
                  <Grid item>
                    <Paper style={{ padding: "10px", margin: "40px auto 0" }}>
                      <TodoList
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={filteredTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeCheckbox={changeCheckbox}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                      />
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </>
        </div>
      </Container>
    </>
  );
};

export default AppWithReducers;
