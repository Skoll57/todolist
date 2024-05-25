import {
  addTodolistAC,
  ChangeTodoFilterActionType,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  ChangeTodoTitleActionType,
  removeTodolistAC,
  todolistReducer,
} from "./todolist-reducer";
import { v4 } from "uuid";
import { TaskFilterType, TodoListType } from "../../App";

test("correct todolist should be removed", () => {
  let idForTodolist1 = v4();
  let idForTodolist2 = v4();

  const startState: Array<TodoListType> = [
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(
    startState,
    removeTodolistAC(idForTodolist1)
  );

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(idForTodolist2);
});

test("correct todolist should be added", () => {
  let idForTodolist1 = v4();
  let idForTodolist2 = v4();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ];

  const endState = todolistReducer(startState, addTodolistAC(newTodolistTitle));

  expect(endState.length).toBe(3);
  expect(endState[2].title).toBe(newTodolistTitle);
  expect(endState[2].filter).toBe("all");
});

test("correct todolist should change its name", () => {
  let idForTodolist1 = v4();
  let idForTodolist2 = v4();

  let newTodolistTitle = "New Todolist";

  const startState: Array<TodoListType> = [
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ];

  const action: ChangeTodoTitleActionType = changeTodolistTitleAC(
    idForTodolist2,
    newTodolistTitle
  );

  const endState = todolistReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should change", () => {
  let idForTodolist1 = v4();
  let idForTodolist2 = v4();

  let newFilter: TaskFilterType = "completed";

  const startState: Array<TodoListType> = [
    { id: idForTodolist1, title: "What to learn", filter: "all" },
    { id: idForTodolist2, title: "What to buy", filter: "all" },
  ];

  const action: ChangeTodoFilterActionType = changeTodolistFilterAC(
    idForTodolist2,
    newFilter
  );

  const endState = todolistReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
