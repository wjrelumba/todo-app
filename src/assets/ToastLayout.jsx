import { ToastContainer } from "react-toastify";


export default function ({ children }){
    return (
      <>
        <ToastContainer />
        {children}
      </>
    );
  };