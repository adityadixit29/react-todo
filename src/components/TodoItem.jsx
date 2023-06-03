import React from 'react'

const TodoItem = ({title,description,isCompleted, id, updateHandlers,deleteHandler}) => {
  return (
    <div className='todo'>
        <div>
            <h4>{title}</h4>
            <p>{description}</p>
        </div>
        <div>
            <input onChange ={()=>updateHandlers(id)} type="checkbox" checked={isCompleted}/>
            <button onClick={()=>deleteHandler(id)} className="btn">Delete</button>
        </div>
    </div>
  )
}

export default TodoItem