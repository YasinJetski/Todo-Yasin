import { IoMdCheckmark } from "react-icons/io";

const Task = ( {task, onDelete, onPin, onToggle} ) => {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''} ${task.pinned ? 'pinned' : ''}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <div class="cssBoxFix">
        <h3>{task.text}</h3>

        <div className="icons">
          {!task.pinned && (
            <IoMdCheckmark
              className="deleteIcon"
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => onDelete(task.id)}
            />

          )}
        </div>
      </div>
      <p className="dateText">{task.day}</p>
    </div>
  );
  
}

export default Task
