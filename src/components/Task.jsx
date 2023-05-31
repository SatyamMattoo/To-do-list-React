import React from 'react'

function Task({completed,title, description, deleteTask, index,id}) {
  return (
    (!completed)?
    <div className="task">
        <div className="output">
            <p>{title}</p>
            <span>{description}</span>
        </div>
        <button onClick={() => deleteTask(id)}>-</button>
    </div>:
    <></>
  )
}

export default Task