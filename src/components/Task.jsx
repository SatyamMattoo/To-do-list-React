import React from 'react'

function Task({title, description, deleteTask2, index}) {
  return (
    <div className="task">
        <div className="output">
            <p>{title}</p>
            <span>{description}</span>
        </div>
        <button onClick={() => deleteTask2(index)}>-</button>
    </div>
  )
}

export default Task