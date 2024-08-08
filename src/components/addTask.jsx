import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask({setPreviewMode, setAddMode, setDelMode}) {
  const [taskName, setTaskName] = useState(null);

  function generateRandomID() {
    return Math.random().toString(36).substr(2, 9);
  };

  // Switch to delete or edit mode
  const switchToPrevMode = (targetId) => {
    localStorage.setItem('currentId', targetId)
    setPreviewMode(true);
    setAddMode(false);
    setDelMode(false);
  }

  const submitBtn = () => {
    if(taskName && taskName.length > 0){
      if(localStorage.getItem('tasks')){
        const existingKey = JSON.parse(localStorage.getItem('tasks'));
        var tasksArray = [];
        for(var i=0;i<existingKey.length;i++){
          tasksArray.push(existingKey[i]);
        };
        
        console.log(existingKey);
        const dateToday = new Date();
        const year = dateToday.getFullYear();
        const month = dateToday.getMonth() + 1;
        const day = dateToday.getDate();
        var hour = dateToday.getHours();
        const minute = String(dateToday.getMinutes()).padStart(2,'0');
        var dateString;
        console.log(dateString);
        console.log(hour);
        if(hour > 12){
          console.log('run');
          hour -= 12;
          dateString = `${month}/${day}/${year} - ${hour}:${minute} PM`
        }
        else if(hour < 12){
          dateString = `${month}/${day}/${year} - ${hour}:${minute} AM`
        }
        else if(hour == 12){
          dateString = `${month}/${day}/${year} - ${hour}:${minute} PM`
        };
    
        const randomId = generateRandomID();
    
        const taskObject = {
          taskID: randomId,
          taskName: taskName,
          taskDateAdded: dateString,
          isDone: false,
        };
        tasksArray.push(taskObject)
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        switchToPrevMode(); 
      }
      if(!localStorage.getItem('tasks')){
        const dateToday = new Date();
        const year = dateToday.getFullYear();
        const month = dateToday.getMonth() + 1;
        const day = dateToday.getDate();
        var hour = dateToday.getHours();
        const minute = String(dateToday.getMinutes()).padStart(2,'0');
        var dateString;
        console.log(dateString);
        if(hour > 12){
          console.log('run');
          hour -= 12;
          dateString = `${month}/${day}/${year} - ${hour}:${minute} PM`
        }
        else if(hour < 12){
          dateString = `${month}/${day}/${year} - ${hour}:${minute} AM`
        }
        else if(hour == 12){
          dateString = `${month}/${day}/${year} - ${hour}:${minute} PM`
        };
        
        console.log(dateString);
    
        const randomId = generateRandomID();
    
        const taskObject = [{
          taskID: randomId,
          taskName: taskName,
          taskDateAdded: dateString,
          isDone: false,
        }];
  
        localStorage.setItem('tasks', JSON.stringify(taskObject));
        toast.success(`Task Created: ${taskName}`)
        switchToPrevMode();
      };
    }
    else{
      toast.error('Please enter a name.');
    };
  };
  
  // Create input handler
  const inputHandler = (e) => {
    const {value, name} = e.target;
    switch (name){
      case 'taskName':
        console.log(value);
        setTaskName(value);
        break;
    }
  }

  return (
    <>
        <div className='d-flex vw-100 vh-100 p-3'>
            <div className='d-flex flex-column align-items-center w-100'>
                <h1 className='fs-1 text-white'>Add Task</h1>
                <div className='d-flex flex-column lexPurple w-50 h-25 p-2 rounded-2'>
                  <label className='fs-2 text-white' htmlFor="title">Task Name:</label>
                  <input className='lexGray rounded-1 text-white fs-4 border-0 p-2' placeholder='Task Name...' onChange={inputHandler} type="text" name="taskName" id="" />
                  <button className='lexOrange border-1 border-black w-100 rounded-1' onClick={submitBtn}>Create Task</button>
                </div>
            </div>
        </div>
    </>
  )
}
