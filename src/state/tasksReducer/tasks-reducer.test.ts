import {addTaskAC, changeCheckBoxAC, changeTaskTitleAC, tasksReducer} from "./tasks-reducer";
import {TaskStateType} from "../../App";
import {removeTaskAC} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../todoReducer/todolist-reducer";


test("correct task should be deleted from correct array", () => {

    const startState: TaskStateType = {
        "idForTodolist1": [
        { id: "1", title: "HTML & CSS", isDone: true },
        { id: "2", title: "JAVASCRIPT", isDone: true },
        { id: "3", title: "REACT", isDone: false },
        { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
        { id: "1", title: "PHONE", isDone: false },
        { id: "2", title: "PC", isDone: true },
        { id: "3", title: "PS 5", isDone: false },
        { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = removeTaskAC("idForTodolist2", "3")

    const endState = tasksReducer(startState, action)

    expect(endState["idForTodolist1"].length).toBe(4) // В первом массиве ничего не изменилось
    expect(endState["idForTodolist2"].length).toBe(3) // Во втором массиве - 1 объект
    expect(endState["idForTodolist2"].every(t => t.id !== "3")).toBeTruthy() // Во втором массиве нет объекта с id=2
})

test("correct task should be add from correct array", () => {

    const startState: TaskStateType = {
        "idForTodolist1": [
        { id: "1", title: "HTML & CSS", isDone: true },
        { id: "2", title: "JAVASCRIPT", isDone: true },
        { id: "3", title: "REACT", isDone: false },
        { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
        { id: "1", title: "PHONE", isDone: false },
        { id: "2", title: "PC", isDone: true },
        { id: "3", title: "PS 5", isDone: false },
        { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = addTaskAC("new title", "idForTodolist2")

    const endState = tasksReducer(startState, action)

    expect(endState["idForTodolist1"].length).toBe(4)
    expect(endState["idForTodolist2"].length).toBe(5)
    expect(endState["idForTodolist2"][4].title).toBe("new title")
    expect(endState["idForTodolist2"][4].isDone).toBe(false)
    expect(endState["idForTodolist2"][4].id).toBeDefined()

})

test("status of specified task should be changed", () => {

    const startState: TaskStateType = {
        "idForTodolist1": [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: "2", title: "JAVASCRIPT", isDone: true },
            { id: "3", title: "REACT", isDone: false },
            { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
            { id: "1", title: "PHONE", isDone: false },
            { id: "2", title: "PC", isDone: true },
            { id: "3", title: "PS 5", isDone: false },
            { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = changeCheckBoxAC("2", "idForTodolist2", false)

    const endState = tasksReducer(startState, action)

    expect(endState["idForTodolist1"][1].isDone).toBe(true)
    expect(endState["idForTodolist2"][1].isDone).toBe(false)
})

test("title of specified task should be changed", () => {

    const startState: TaskStateType = {
        "idForTodolist1": [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: "2", title: "JAVASCRIPT", isDone: true },
            { id: "3", title: "REACT", isDone: false },
            { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
            { id: "1", title: "PHONE", isDone: false },
            { id: "2", title: "PC", isDone: true },
            { id: "3", title: "PS 5", isDone: false },
            { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = changeTaskTitleAC("4", "idForTodolist2", "MICROPHONES")

    const endState = tasksReducer(startState, action)

    expect(endState["idForTodolist1"][3].title).toBe("REDUX")
    expect(endState["idForTodolist2"][3].title).toBe("MICROPHONES")
})

test("new property with new array should be added when new todolist is added", () => {

    const startState: TaskStateType = {
        "idForTodolist1": [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: "2", title: "JAVASCRIPT", isDone: true },
            { id: "3", title: "REACT", isDone: false },
            { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
            { id: "1", title: "PHONE", isDone: false },
            { id: "2", title: "PC", isDone: true },
            { id: "3", title: "PS 5", isDone: false },
            { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = addTodolistAC("new todolist")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState) // Все ключи объекта endState

    const newKey = keys.find(k => k !== "idForTodolist1" && k !== "idForTodolist2") // Ищу ключ, который не равен предыдущим ключам

    if(!newKey) {
     throw Error("new key should be added")
    }


    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([]) // ищу свойство объекта, значение которого пустой массив
})

test("property with todo should be deleted", () => {
    const startState: TaskStateType = {
        "idForTodolist1": [
            { id: "1", title: "HTML & CSS", isDone: true },
            { id: "2", title: "JAVASCRIPT", isDone: true },
            { id: "3", title: "REACT", isDone: false },
            { id: "4", title: "REDUX", isDone: false },
        ],

        "idForTodolist2": [
            { id: "1", title: "PHONE", isDone: false },
            { id: "2", title: "PC", isDone: true },
            { id: "3", title: "PS 5", isDone: false },
            { id: "4", title: "HEADPHONES", isDone: false },
        ],
    };

    const action = removeTodolistAC("idForTodolist2")

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState["idForTodolist2"]).not.toBeDefined()
})