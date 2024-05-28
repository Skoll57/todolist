import { TaskStateType } from "../../App";
import { v4 } from "uuid";
import {
  AddTodoActionType,
  RemoveTodoActionType,
} from "../todoReducer/todolist-reducer";

import { idForTodolist1 } from "../todoReducer/todolist-reducer";
import { idForTodolist2 } from "../todoReducer/todolist-reducer";

// Types
type RemoveTaskType = {
  type: "REMOVE-TASK";
  idForTodolist: string;
  taskId: string;
};

type AddTaskType = {
  type: "ADD-TASK";
  idForTodolist: string;
  title: string;
};

type changeCheckBoxTaskType = {
  type: "CHANGE-CHECKBOX";
  taskId: string;
  idForTodolist: string;
  isDone: boolean;
};

type changeTaskTitleType = {
  type: "CHANGE-TASK-TITLE";
  taskId: string;
  idForTodolist: string;
  newTitle: string;
};

type ActionsTypes =
  | AddTaskType
  | RemoveTaskType
  | changeCheckBoxTaskType
  | changeTaskTitleType
  | AddTodoActionType
  | RemoveTodoActionType;

const initialState: TaskStateType = {
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
};

// Reducer
export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsTypes
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };

      let newTask = stateCopy[action.idForTodolist];

      let filteredTasks = newTask.filter((t) => t.id !== action.taskId);

      stateCopy[action.idForTodolist] = filteredTasks;

      return stateCopy;
    }

    case "ADD-TASK": {
      const stateCopy = { ...state }; // Copy

      const tasks = stateCopy[action.idForTodolist]; // Нахожу масс. объ. с нужным id

      const newTask = { id: v4(), title: action.title, isDone: false }; // Генерирую

      let newTasks = [...tasks, newTask]; // Создаю новый массив со старыми task и новым сгенерир. объ.

      stateCopy[action.idForTodolist] = newTasks; // Заменяю копию массива state новым массивом

      return stateCopy;
    }

    case "CHANGE-CHECKBOX": {
      // const stateCopy = { ...state };

      let newTask = state[action.idForTodolist];

      let task = newTask.find((t) => t.id === action.taskId);

      if (task) {
        task.isDone = action.isDone;
      }

      state[action.idForTodolist] = [...newTask]; // !
      return { ...state };
    }

    case "CHANGE-TASK-TITLE": {
      // const stateCopy = { ...state };

      let newTask = state[action.idForTodolist];

      let task = newTask.find((t) => t.id === action.taskId);

      if (task) {
        task.title = action.newTitle;
      }

      state[action.idForTodolist] = [...newTask];
      return { ...state };
    }

    case "ADD-TODOLIST": {
      const stateCopy = { ...state };

      stateCopy[action.idForTodolist] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };

      delete stateCopy[action.idForTodolist];

      return stateCopy;
    }

    default:
      return state;
  }
};

// AC's
export const removeTaskAC = (
  idForTodolist: string,
  taskId: string
): RemoveTaskType => {
  return {
    type: "REMOVE-TASK",
    idForTodolist,
    taskId,
  };
};

export const addTaskAC = (
  title: string,
  idForTodolist: string
): AddTaskType => {
  return {
    type: "ADD-TASK",
    idForTodolist,
    title,
  };
};

export const changeCheckBoxAC = (
  taskId: string,
  idForTodolist: string,
  isDone: boolean
): changeCheckBoxTaskType => {
  return {
    type: "CHANGE-CHECKBOX",
    taskId,
    idForTodolist,
    isDone,
  };
};

export const changeTaskTitleAC = (
  taskId: string,
  idForTodolist: string,
  newTitle: string
): changeTaskTitleType => {
  return {
    type: "CHANGE-TASK-TITLE",
    taskId,
    idForTodolist,
    newTitle,
  };
};
