import { useEffect, useState } from 'react'
import './App.css'
import AddTask from './components/addTask';
import ToDo from './components/todo';
import ToastLayout from './assets/ToastLayout';
import DelEditTask from './components/delEditTask';

function App() {
  const [previewMode, setPreviewMode] = useState(true);
  const [addMode, setAddMode] = useState(false);
  const [delMode, setDelMode] = useState(false);

  // Toggle Preview Mode
  const togglePrev = () => {
    setPreviewMode(true);
    setAddMode(false);
    setDelMode(false);
  };

  // Toggle Add Mode
  const toggleAdd = () => {
    setPreviewMode(false);
    setAddMode(true);
    setDelMode(false);
  };

  // Toggle Delete Mode
  const toggleDel = () => {
    setPreviewMode(false);
    setAddMode(false);
    setDelMode(true);
  }

  const checkLocalStorage = () => {
    if(!localStorage.getItem('')){
      console.log('No data');
    };
  };

  useEffect(() => {
    checkLocalStorage();
  },[])

  return (
    <ToastLayout>
      <div className='d-flex align-items-center justify-content-center vh-100 vw-100 p-3'>
        <div className='d-flex flex-column align-items-center lexPurple w-100 h-100 rounded-3 p-4'>
          <h1 className='fs-4'>Interns: To Do</h1>
          <div className='d-flex justify-content-between border-1 border-black w-100'>
            <button onClick={togglePrev} className='w-100 lexOrangePurple rounded-2 text-black m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bar-chart-2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>   
            </button>
            <button onClick={toggleAdd} className='w-100 lexOrangePurple rounded-2 text-black m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <button onClick={toggleDel} className='w-100 lexOrangePurple rounded-2 text-black m-1'>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-minus"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>
          {previewMode && !addMode && !delMode && (
            <div className='d-flex w-100 h-100 justify-content-center overflow-hidden'>
              <div className='d-flex flex-column w-100 h-100'>
                <div className='d-flex lexOrange w-100 h-100 rounded-2 overflow-auto'>
                  <ToDo />
                </div>
              </div>
            </div>
          )}
          {!previewMode && addMode && !delMode && (
            <>
              <div className='d-flex w-100 h-100 justify-content-center overflow-hidden'>
                <div className='d-flex flex-column w-100 h-100'>
                  <div className='d-flex lexOrange w-100 h-100 rounded-2 overflow-auto'>
                    <AddTask/>
                  </div>
                </div>
              </div>
            </>
          )}
          {!previewMode && !addMode && delMode && (
            <>
              <div className='d-flex w-100 h-100 justify-content-center overflow-hidden'>
                <div className='d-flex flex-column w-100 h-100'>
                  <div className='d-flex lexOrange w-100 h-100 rounded-2 overflow-auto'>
                    <DelEditTask/>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ToastLayout>
  )
}

export default App
