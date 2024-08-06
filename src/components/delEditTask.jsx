import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function DelEditTask() {
    const [delMode, setDelMode] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [taskIdValue, setTaskIdValue] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [newName, setNewName] = useState(null);

    // Generate an ID for each task
    function generateRandomID() {
        return Math.random().toString(36).substr(2, 9);
    };

    // Switch modes
    const switchMode = () => {
        setCurrentTask(null);
        setTaskIdValue(null);
        setDelMode(!delMode);
    };

    const getTasks = () => {
        if(!localStorage.getItem('tasks')){
          const tempObject = [{
            taskID: generateRandomID(),
            taskName: 'No Task',
            taskDateAdded: "No Data",
            isDone: false,
          }];
          //setTasks(tempObject);
        };
        if(localStorage.getItem('tasks')){
          const storageObject = JSON.parse(localStorage.getItem('tasks'));
          console.log(storageObject);
          setTasks(storageObject);
        };
      };

      // Option handler function
      const optionHandler = (e) => {
        const {value} = e.target;
        console.log(value);
        let targetObject = tasks.find(tasks => tasks.taskID === value);
        setCurrentTask(targetObject);
        setTaskIdValue(value);
      }

    // Delete the task function
    const delTaskBtn = () => {
        if(taskIdValue){
            // Find the object in the array
            let targetObject = tasks.filter(tasks => tasks.taskID !== taskIdValue);

            console.log(targetObject);
            localStorage.setItem('tasks', JSON.stringify(targetObject));
            window.location.reload();
        }
        else{
            toast.error('Choose a task to delete.');
        }
    };

    // New name function
    const newNameFunc = (e) => {
        const {value} = e.target;
        console.log(value);
        setNewName(value);
    }
    // Edit the task function
    const editTaskBtn = () => {
        if(newName){
            // Find the object in the array
            let targetObject = tasks.find(tasks => tasks.taskID === taskIdValue);

            console.log(targetObject);

            if (targetObject) {
                // Edit the key-value pairs
                targetObject.taskName = newName;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                window.location.reload();
            };
        }
        else{
            toast.error('Please put in a new name.');
        };
    };

    // Delete all tasks
    const delAll = () => {
        localStorage.clear('tasks');
        window.location.reload();
    };

    useEffect(() => {
        getTasks();
    },[])
  return (
    <>
        <div className='d-flex vw-100 vh-100 p-3'>
            <div className='d-flex flex-column align-items-center w-100 h-100'>
                {delMode && (
                    <>
                        <h1>Delete Task</h1>
                        <div className='d-flex flex-column bg-white w-50 h-25 p-2 rounded-2'>
                            <label className='fs-6' htmlFor="title">Choose a task to Delete:</label>
                            <div className='w-100 d-flex flex-column align-items-center m-1'>
                                <select className='w-50 bg-white text-black border-3' onChange={optionHandler} name="" id="">
                                    <option value="">Choose task</option>
                                    {tasks && (
                                        <>
                                            {tasks.map((task) => (
                                                <option key={task.taskID} value={task.taskID}>{task.taskName}</option>
                                            ))}
                                        </>
                                    )}
                                </select>
                                <button onClick={delTaskBtn} className='lexOrangePurple border-1 border-black w-50 m-2 text-black rounded-1'>Delete Task</button>
                            </div>
                        </div>
                        <button onClick={switchMode} className='lexOrangePurple border-1 border-black w-50 m-1 text-black rounded-1'>Switch to Edit Mode</button>
                        <button onClick={delAll} className='lexRed border-1 border-black w-50 text-black rounded-1'>Delete all Tasks</button>
                    </>
                )}
                {!delMode && (
                    <>
                        <h1>Edit Task</h1>
                        <div className='d-flex flex-column bg-white w-50 h-25 p-2 rounded-2'>
                            <label className='fs-6' htmlFor="title">Choose a task to Edit:</label>
                            <div className='w-100 d-flex flex-column align-items-center m-1'>
                                <select className='w-50 bg-white text-black border-3' onChange={optionHandler} name="" id="">
                                    <option value="">Choose task</option>
                                    {tasks && (
                                        <>
                                            {tasks.map((task) => (
                                                <option key={task.taskID} value={task.taskID}>{task.taskName}</option>
                                            ))}
                                        </>
                                    )}
                                </select>
                                {currentTask && (
                                    <div className='d-flex flex-column w-100'>
                                        <label htmlFor="name">Task Name:</label>
                                        <input onChange={newNameFunc} type="text" placeholder={currentTask.taskName}/>
                                    </div>
                                )}
                                <button onClick={editTaskBtn} className='lexOrangePurple border-1 border-black w-50 m-2 text-black rounded-1'>Edit Task</button>
                            </div>
                        </div>
                        <button onClick={switchMode} className='lexOrangePurple border-1 border-black w-50 m-2 text-black rounded-1'>Switch to Delete Mode</button>
                    </>
                )}
            </div>
        </div>
    </>
  )
}
