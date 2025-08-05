import React, {useEffect, useState} from 'react'

export const ToDo = () => {
  const[task, setTask] = useState('');
  const[todos, setTodos] = useState([]);

  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos))
  },[todos])

  const handleAdd = (e) =>{
    e.preventDefault();
    if(!task.trim()) return;
    setTodos([...todos, task]);
    setTask('');
  }
  const deleteTask = (index) =>{
    const updated = todos.filter((_,i)=> i !== index);
    setTodos(updated);
  }
  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>📝 To-Do List</h2>
      <form className='d-flex mb-3' onSubmit={handleAdd}>
        <input type='text' className='form-control me-2' placeholder='Enter a task...' value={task} onChange={(e)=>setTask(e.target.value)}/>
        <button className='btn btn-primary' type='submit'>Add</button>
      </form>
      {todos.length === 0 ? (
        <p className='text-muted text-center'>No tasks yet.</p>
      ):(
        <ul className='list-group'>
          {todos.map((todo, index)=>(
            <li key={index} className={`list-group-item d-flex justify-content-between align-items-center`}>
              <span>
                {todo}
              </span>
              <button className='btn btn-sm btn-danger' onClick={()=>deleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
