import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function DelEditTask() {
    const [delMode, setDelMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [taskIdValue, setTaskIdValue] = useState(null);
    const [currentTask, setCurrentTask] = useState(null);
    const [newName, setNewName] = useState(null);

    // Generate an ID for each task
    function generateRandomID() {
        return Math.random().toString(36).substr(2, 9);
    };

    // Find the current task to be edited
    const getCurrentTask = (targetId, storageObject) => {
        // Define the unique ID you want to target

        // Find the object in the array
        let targetObject = storageObject.find(storageObject => storageObject.taskID === targetId);

        setCurrentTask(targetObject);
    };

    // Get tasks from local storage
    const getTasks = () => {
        if(!localStorage.getItem('tasks')){
        };
        if(localStorage.getItem('tasks')){
            if(localStorage.getItem('currentId')){
                const currentID = localStorage.getItem('currentId');
                const storageObject = JSON.parse(localStorage.getItem('tasks'));
                setTaskIdValue(currentID);
                getCurrentTask(currentID, storageObject);
                console.log(storageObject);
                setTasks(storageObject);
            };
        };
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
            if(currentTask.taskName !== newName){
            // Find the object in the array
            let targetObject = tasks.find(tasks => tasks.taskID === taskIdValue);

            const dateToday = new Date();
            const year = dateToday.getFullYear();
            const month = dateToday.getMonth() + 1;
            const day = dateToday.getDate();
            var hour = dateToday.getHours();
            const minute = String(dateToday.getMinutes()).padStart(2,'0');
            var dateString;
            if(hour > 12){
            hour -= 12;
            dateString = `${month}/${day}/${year} - Edited: ${hour}:${minute} PM`
            }
            else if(hour < 12){
            dateString = `${month}/${day}/${year} - Edited: ${hour}:${minute} AM`
            };

            console.log(targetObject);

            if (targetObject) {
                // Edit the key-value pairs
                targetObject.taskDateAdded = dateString;
                targetObject.taskName = newName;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                window.location.reload();
            };
            }else{
                toast.error('That is the same name.')
            }
        }
        else{
            toast.error('Please put in a new name.');
        };
    };

    useEffect(() => {
        getTasks();
    },[])
  return (
    <>
        <div className='d-flex vw-100 vh-100 p-3'>
            <div className='d-flex flex-column align-items-center w-100 h-100'>
                {!delMode && (
                    <>
                    {currentTask && (
                        <>
                        <h1 className='fs-1 text-white'>Edit: {currentTask.taskName}</h1>
                        <div className='d-flex flex-column lexPurple w-50 h-25 p-2 rounded-2'>
                            <div className='w-100 d-flex flex-column align-items-center m-1'>
                                    <div className='d-flex flex-column w-100'>
                                        <label className='fs-2 text-white' htmlFor="name">Name:</label>
                                        <input onChange={newNameFunc} type="text" placeholder={currentTask.taskName}/>
                                    </div>
                                <button onClick={editTaskBtn} className='lexOrange border-1 border-black w-50 m-2 text-black rounded-1'>Edit Task</button>
                            </div>
                        </div>
                        </>
                    )}
                    </>
                )}
            </div>
        </div>
    </>
  )
}
