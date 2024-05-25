import { combineReducers, createStore } from "redux";
import { todolistReducer } from "./todoReducer/todolist-reducer";
import { tasksReducer } from "./tasksReducer/tasks-reducer";

// Автоматическая типизация для глобального стора
export type AppRootState = ReturnType<typeof rootReducer>;

// Объединяю несколько редьюсеров
const rootReducer = combineReducers({
  todolists: todolistReducer,
  tasks: tasksReducer,
});

// Создаю стор с необходимыми редьюсерами
export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;
