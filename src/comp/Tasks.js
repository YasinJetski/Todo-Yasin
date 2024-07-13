import Task from "./Task"

const Tasks = ( { tasks, onDelete, onPin, onToggle }) => {
  return (
    <>
    {tasks.map((task) =>(
    <Task key = {task.id} task = {task} onDelete={onDelete} onPin={onPin} onToggle={onToggle}/>))}
    </>
  )
}

export default Tasks
