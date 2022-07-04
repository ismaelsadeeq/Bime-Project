import * as React from 'react';
import './App.css';
import Header from './component/Header/Header';
import Nav from './component/Nav/Nav'
import TogleNav from './component/TogleNav/TogleNav'
import Footer from './component/Footer/Footer'
import Registration from './component/Registration/Registration'
import Login from './component/Login/Login'
import ForgetPassword from './component/ForgetPassword/ForgetPassword'
import SalesRecord from './component/SalesRecord/SalesRecord'
import Viewdata from './component/ViewData/ViewData'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './component/Home/Home'
import Dashboard from './component/Dashboard/Dashboard';




function App() {
  // const navigate = useNavigate()
 

  
  
  return (
    <BrowserRouter>
    
      <div className="App">

     

        <Routes>
          <Route index element={<Registration />}/>

          <Route path='login' element={<Login /> }/>

          <Route path='dashboard/*' element={<Dashboard />}/>
        </Routes>

          
      </div>

    </BrowserRouter> 
    
  );
}


export default App;
