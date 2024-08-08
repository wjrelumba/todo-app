import React, { useEffect, useState } from 'react'

export default function ToDo({setPreviewMode, setAddMode, setDelMode}) {
  const [tasks, setTasks] = useState(null);
  const [tempTasks, setTempTasks] = useState(null);

  // Generate an ID for each task
  function generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  };

  // Delete all tasks
  const delAll = () => {
    localStorage.clear('tasks');
    window.location.reload();
  };

  // Get tasks from localStorage
  const getTasks = () => {
    console.log('Get tasks run');
    if(!localStorage.getItem('tasks')){
      const tempObject = [{
        taskID: generateRandomID(),
        taskName: 'Please create a task',
        taskDateAdded: "No Data",
        isDone: false,
      }];
      setTasks(null);
      setTempTasks(tempObject);
    };
    if(localStorage.getItem('tasks')){
      const storageObject = JSON.parse(localStorage.getItem('tasks'));
      if(storageObject.length > 0){
        console.log(storageObject);
        setTasks(storageObject);
        setTempTasks(null);
      }
      if(storageObject.length < 1){
        localStorage.clear('tasks');
        getTasks();
      };
      
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

  // Delete the task function
  const delTaskBtn = (taskIdValue) => {
    if(taskIdValue){
        // Find the object in the array
        let targetObject = tasks.filter(tasks => tasks.taskID !== taskIdValue);

        console.log(targetObject);
        localStorage.setItem('tasks', JSON.stringify(targetObject));
        getTasks();
    }
    else{
        toast.error('Choose a task to delete.');
    }
  };

  // Switch to delete or edit mode
  const switchToDelEditMode = (targetId) => {
    localStorage.setItem('currentId', targetId)
    setPreviewMode(false);
    setAddMode(false);
    setDelMode(true);
  }

  useEffect(() => {
    getTasks();
  },[]);

  useEffect(() => {
  },[tasks]);
  return (
    <div className='w-100 h-75 p-2'>
      <h1 className='fs-1 text-white'>Tasks:</h1>
      {tasks && (
        <>
        <button onClick={delAll} className='lexOrange text-white rounded-1 m-1'>Delete all</button>
        <div className='d-flex flex-column h-100 overflow-auto'>
          {tasks.map((task) => (
            <div className='d-flex flex-column w-75 h-auto rounded-2 m-1 lexPurple text-white p-2' key={task.taskID}>
              {task.isDone && (
                <>
                <h1 className='fs-3 text-decoration-line-through'>{task.taskName}</h1>
                <div className='d-flex justify-content-between'>
                  <h1 className='fs-6'>{task.taskDateAdded}</h1>
                  <div className='d-flex justify-content-between'>
                    <button onClick={() => {delTaskBtn(task.taskID)}} className='lexGray edit-button text-white rounded-1'>Delete</button>
                    <button onClick={() => {markUndoneBtn(task.taskID)}} className='lexGray text-white rounded-1'>Mark as Undone</button>
                  </div>
                </div>
                </>
              )}
              {!task.isDone && (
                <>
                <h1 className='fs-3'>{task.taskName}</h1>
                <div className='d-flex justify-content-between'>
                  <h1 className='fs-6'>{task.taskDateAdded}</h1>
                  <div className='d-flex justify-content-between'>
                    <button onClick={() => {delTaskBtn(task.taskID)}} className='lexGray edit-button text-white rounded-1'>Delete</button>
                    <button onClick={() => {switchToDelEditMode(task.taskID)}} className='lexOrange edit-button text-white rounded-1'>Edit</button>
                    <button onClick={() => {markDoneBtn(task.taskID)}} className='lexOrange text-white rounded-1'>Mark as Done</button>
                  </div>
                </div>
                </>
              )}
            </div>
          ))}
        </div>
        </>
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
