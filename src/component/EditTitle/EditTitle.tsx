import { useState, ChangeEvent } from "react";
import "./EditTitle.css";

type EditTitlePropsType = {
  title: string;
  isDone?: boolean;
  onChangeTitle: (newValue: string) => void;
};

const EditTitle = (props: EditTitlePropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  function activateEditMode() {
    setEditMode(true);
    setTitle(props.title);
  }
  function activateViewMode() {
    setEditMode(false);
    props.onChangeTitle(title);
  }
  function onChangeTitleHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  return editMode ? (
    <input
      className={props.isDone === true ? "isDone" : ""}
      value={title}
      onChange={onChangeTitleHandler}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span
      className={props.isDone === true ? "isDone" : ""}
      onDoubleClick={activateEditMode}
    >
      {props.title}
    </span>
  );
};

export default EditTitle;
