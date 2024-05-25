import { v4 } from "uuid";
import { TaskFilterType, TodoListType } from "../../App";

// Types
export type RemoveTodoActionType = {
  type: "REMOVE-TODOLIST";
  idForTodolist: string;
};

export type AddTodoActionType = {
  type: "ADD-TODOLIST";
  title: string;
  idForTodolist: string;
};

export type ChangeTodoTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodoFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: TaskFilterType;
};

type ActionsTypes =
  | RemoveTodoActionType
  | AddTodoActionType
  | ChangeTodoTitleActionType
  | ChangeTodoFilterActionType;

export const idForTodolist1 = v4();
export const idForTodolist2 = v4();

const initialState: Array<TodoListType> = [
  { id: idForTodolist1, title: "What to learn", filter: "all" },
  { id: idForTodolist2, title: "What to buy", filter: "all" },
];

// Reducer
export const todolistReducer = (
  state: Array<TodoListType> = initialState,
  action: ActionsTypes
): Array<TodoListType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((tl) => tl.id !== action.idForTodolist);

    case "ADD-TODOLIST":
      return [
        ...state,
        { id: action.idForTodolist, title: action.title, filter: "all" },
      ];

    case "CHANGE-TODOLIST-TITLE": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }

    case "CHANGE-TODOLIST-FILTER": {
      let todolist = state.find((tl) => tl.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }

    default:
      return state;
  }
};

// AC's
export const removeTodolistAC = (
  idForTodolist: string
): RemoveTodoActionType => {
  return {
    type: "REMOVE-TODOLIST",
    idForTodolist,
  };
};

export const addTodolistAC = (newTodolistTitle: string): AddTodoActionType => {
  return {
    type: "ADD-TODOLIST",
    title: newTodolistTitle,
    idForTodolist: v4(),
  };
};

export const changeTodolistTitleAC = (
  idForTodolist: string,
  newTodolistTitle: string
): ChangeTodoTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id: idForTodolist,
    title: newTodolistTitle,
  };
};

export const changeTodolistFilterAC = (
  idForTodolist: string,
  newFilter: TaskFilterType
): ChangeTodoFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id: idForTodolist,
    filter: newFilter,
  };
};
