import React, { useState } from "react";
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
import { Grid} from "@mui/material";
import { Paper } from "@mui/material";

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

const App: React.FC = () => {
  // Unic ID for todolists
  const idForTodolist1 = v4();
  const idForTodolist2 = v4();

  // State
  let [tasks, setTasks] = useState<TaskStateType>({
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

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ]);

  // CallBack Function
    // TASKS
  function removeTask(id: string, todolistID: string) {
    let newTask = tasks[todolistID];
    let filteredTasks = newTask.filter((t) => t.id !== id);
    tasks[todolistID] = filteredTasks;
    setTasks({ ...tasks });
  }

  function addTask(title: string, todolistID: string) {
    let taskCreate = { id: v4(), title: title, isDone: false };
    let newTask = tasks[todolistID];
    let newTasks = [taskCreate, ...newTask];
    tasks[todolistID] = newTasks;
    setTasks({ ...tasks });
  }

  function changeCheckbox(id: string, isDone: boolean, todolistID: string) {
    // Достаю нужный массив task из объекта tasks
    let newTask = tasks[todolistID];
    // Ищу нужную task
    let task = newTask.find((t) => t.id === id);
    // Меняю свойство task, если она нашлась
    if (task) {
      task.isDone = isDone;
      // Перерисовываю
      setTasks({ ...tasks });
    }
  }

  function changeTaskTitle(id: string, todolistID: string, newTitle: string) {
    let newTask = tasks[todolistID];
    let task = newTask.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasks });
    }
  }

    // TODO
  function changeFilter(value: TaskFilterType, todolistID: string) {
    let todolist = todolists.find((tl) => tl.id === todolistID);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function removeTodolist(todolistID: string) {
    let filteredTodolist = todolists.filter((tl) => tl.id !== todolistID);
    setTodolists(filteredTodolist);

    delete tasks[todolistID];
    setTasks({ ...tasks });
  }

  function addTodolist(title: string) {
    let todolist: TodoListType = { id: v4(), filter: "all", title: title };
    setTodolists([...todolists, todolist]);
    setTasks({
      ...tasks,
      [todolist.id]: [],
    });
  }

  function changeTodolistTitle(id: string, newTitle: string) {
    let todolist = todolists.find((tl) => tl.id === id);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  return (
    <>
      {/* App Bar */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{backgroundColor: "gray"}}>
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
      <Grid container style={{textAlign: "center"}}>
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
                  filteredTask = filteredTask.filter((t) => t.isDone === true);
                  break;
                case "active":
                  filteredTask = filteredTask.filter((t) => t.isDone === false);
                  break;
                default:
                  break;
              }
              

              return (
                <Grid item>
                <Paper style={{padding: "10px", margin: "40px auto 0"}}>
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
                </Grid >
              );
            })}
            </Grid>
          </>
        </div>
      </Container>
    </>
  );
};

export default App;
