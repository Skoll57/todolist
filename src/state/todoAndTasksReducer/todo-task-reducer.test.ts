import {TaskStateType, TodoListType} from "../../App";
import {tasksReducer} from "../tasksReducer/tasks-reducer";
import {addTodolistAC, todolistReducer} from "../todoReducer/todolist-reducer";

test("ids should be equal", () => {
    const startTasksState: TaskStateType = {};
    const startTodoState: Array<TodoListType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action);

    const endTodoState = todolistReducer(startTodoState, action);

    const keys = Object.keys(endTasksState);
    const idFromTask = keys[0];
    const idFromTodo = endTodoState[0].id;

    expect(idFromTask).toBe(action.idForTodolist)
    expect(idFromTodo).toBe(action.idForTodolist)

})