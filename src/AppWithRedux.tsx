import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
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

// AC
import {
  addTaskAC,
  changeCheckBoxAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./state/tasksReducer/tasks-reducer";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from "./state/todoReducer/todolist-reducer";

import { AppRootState } from "./state/store";

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

const AppWithRedux: React.FC = () => {
  console.log("App +");

  // Dispatch
  const dispatch = useDispatch();

  // State.Vetka
  const todolists = useSelector<AppRootState, Array<TodoListType>>(
    (state) => state.todolists
  );
  const tasks = useSelector<AppRootState, TaskStateType>(
    (state) => state.tasks
  );

  // CallBack Function
  // TASKS
  const removeTask = useCallback((id: string, todolistID: string) => {
    dispatch(removeTaskAC(id, todolistID));
  }, []);

  const addTask = useCallback((title: string, todolistID: string) => {
    const action = addTaskAC(title, todolistID);
    dispatch(action);
  }, []);

  const changeCheckbox = useCallback(
    (id: string, isDone: boolean, todolistID: string) => {
      const action = changeCheckBoxAC(id, todolistID, isDone);
      dispatch(action);
    },
    []
  );

  const changeTaskTitle = useCallback(
    (id: string, todolistID: string, newTitle: string) => {
      const action = changeTaskTitleAC(id, todolistID, newTitle);
      dispatch(action);
    },
    []
  );

  // TODO
  const changeFilter = useCallback(
    (value: TaskFilterType, todolistID: string) => {
      const action = changeTodolistFilterAC(todolistID, value);
      dispatch(action);
    },
    []
  );

  const removeTodolist = useCallback((todolistID: string) => {
    const action = removeTodolistAC(todolistID);
    dispatch(action);
  }, []);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, []);

  const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodolistTitleAC(id, newTitle);
    dispatch(action);
  }, []);

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
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            </section>
          </div>
        </Grid>
        <div className="App">
          <>
            <Grid container spacing={8}>
              {todolists.map((tl) => {
                // Filter
                let filteredTask = tasks[tl.id];

                // switch (tl.filter) {
                //   case "completed":
                //     filteredTask = filteredTask.filter(
                //       (t) => t.isDone === true
                //     );
                //     break;
                //   case "active":
                //     filteredTask = filteredTask.filter(
                //       (t) => t.isDone === false
                //     );
                //     break;
                //   default:
                //     break;
                // }

                return (
                  /* This is my KEY */
                  <Grid item key={tl.id}>
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

export default AppWithRedux;
