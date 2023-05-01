import React from 'react'

function Task({title, description, deleteTask, index}) {
  return (
    <div className="task">
        <div className="output">
            <p>{title}</p>
            <span>{description}</span>
        </div>
        <button onClick={() => deleteTask(index)}>-</button>
    </div>
  )
}

export default Task