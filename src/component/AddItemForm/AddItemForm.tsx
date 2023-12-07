import "./AddItemForm.css";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import InputTitleError from "../InputTitleError/InputTitleError";
import { Button } from "@mui/material";
import { createSvgIcon } from "@mui/material/utils";
import TextField from "@mui/material/TextField";

// Material UI
const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com/
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  "Plus"
);

// Type
type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

const AddItemForm = (props: AddItemFormPropsType) => {
  // State
  const [error, setError] = useState<boolean>(false);
  const [titleInputValue, setTitleInputValue] = useState("");

  // Class
  const classForInput = "todo-input";

  // Function-callback
  function addTaskInside() {
    if (titleInputValue.trim() !== "") {
      props.addItem(titleInputValue.trim());
      setTitleInputValue("");
    } else {
      setTitleInputValue("");
      setError(true);
    }
  }

  function onInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitleInputValue(e.currentTarget.value);
  }

  function onKeyPressHandler(e: KeyboardEvent<HTMLInputElement>) {
    setError(false);
    if (e.key === "Enter") {
      addTaskInside();
    }
  }

  return (
    <div className="container">
      {/* <input
        className={error ? "error " + classForInput : classForInput}
        type="text"
        placeholder="new task..."
        value={titleInputValue}
        onChange={onInputChangeHandler}
        onKeyPress={onKeyPressHandler}
      /> */}
      <TextField
        className={error ? "error " + classForInput : classForInput}
        type="text"
        placeholder="new task..."
        title="Что вы хотите запланировать?"
        value={titleInputValue}
        onChange={onInputChangeHandler}
        onKeyPress={onKeyPressHandler}
        variant={"outlined"}
        size="small"
        color="success"
      />
      <Button
        className="todo-btn"
        onClick={addTaskInside}
        variant="contained"
        color="success"
        endIcon={<PlusIcon />}
      >
        Добавить
      </Button>
      {error && <InputTitleError />}
    </div>
  );
};

export default AddItemForm;
