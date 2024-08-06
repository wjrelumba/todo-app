import React, { useEffect, useState } from 'react'

export default function ToDo() {
  const [tasks, setTasks] = useState(null);
  const [tempTasks, setTempTasks] = useState(null);

  // Generate an ID for each task
  function generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  };

  const getTasks = () => {
    if(!localStorage.getItem('tasks')){
      const tempObject = [{
        taskID: generateRandomID(),
        taskName: 'No Task',
        taskDateAdded: "No Data",
        isDone: false,
      }];
      setTempTasks(tempObject);
    };
    if(localStorage.getItem('tasks')){
      const storageObject = JSON.parse(localStorage.getItem('tasks'));
      console.log(storageObject);
      setTasks(storageObject);
    };
  };

  // Mark the task done
  const markDoneBtn = (targetId) => {
    // Define the unique ID you want to target

    // Find the object in the array
    let targetObject = tasks.find(tasks => tasks.taskID === targetId);

    console.log(targetObject);

    if (targetObject) {
        // Edit the key-value pairs
        targetObject.isDone = true;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        getTasks();
    };
  };

  // Mark the task undone
  const markUndoneBtn = (targetId) => {
    // Define the unique ID you want to target

    // Find the object in the array
    let targetObject = tasks.find(tasks => tasks.taskID === targetId);

    console.log(targetObject);

    if (targetObject) {
        // Edit the key-value pairs
        targetObject.isDone = false;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        getTasks();
    };
  };

  useEffect(() => {
    getTasks();
  },[]);

  useEffect(() => {
  },[tasks]);
  return (
    <div className='w-100 h-75 p-2'>
      <h1>Tasks:</h1>
      {tasks && (
        <div className='d-flex flex-column h-100 overflow-auto'>
          {tasks.map((task) => (
            <div className='d-flex flex-column w-75 h-auto rounded-1 m-1 bg-white p-2' key={task.taskID}>
              {task.isDone && (
                <>
                <h1 className='fs-3 text-decoration-line-through'>{task.taskName}</h1>
                <div className='d-flex justify-content-between'>
                  <h1 className='fs-6'>{task.taskDateAdded}</h1>
                  <button onClick={() => {markUndoneBtn(task.taskID)}} className='lexPurple text-white'>Mark as Undone</button>
                </div>
                </>
              )}
              {!task.isDone && (
                <>
                <h1 className='fs-3'>{task.taskName}</h1>
                <div className='d-flex justify-content-between'>
                  <h1 className='fs-6'>{task.taskDateAdded}</h1>
                  <button onClick={() => {markDoneBtn(task.taskID)}} className='lexOrangePurple text-white'>Mark as Done</button>
                </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      {tempTasks && (
        <div className='d-flex flex-column h-100 overflow-auto'>
          {tempTasks.map((task) => (
            <div className='d-flex flex-column w-75 h-auto rounded-1 m-1 bg-white p-2' key={task.taskID}>
              {task.isDone && (
                <>
                <h1 className='fs-3 text-decoration-line-through'>{task.taskName}</h1>
                </>
              )}
              {!task.isDone && (
                <>
                <h1 className='fs-3'>{task.taskName}</h1>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
