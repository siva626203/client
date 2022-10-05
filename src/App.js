import './App.css';
import Home from './pages/home';
import {Route, Routes} from'react-router-dom';
import Login from './pages/login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Fragment } from 'react';
function App() {
  return (<Fragment>
    <ToastContainer />
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/login' element={<Login/>}/>
     
    </Routes>
    </Fragment>
  );
}

export default App;
