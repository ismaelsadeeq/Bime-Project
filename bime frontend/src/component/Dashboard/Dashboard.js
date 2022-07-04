import {useState, useEffect} from 'react';
import TogleNav from '../TogleNav/TogleNav'
import Header from '../Header/Header'
import Home from '../Home/Home'
import Registration from '../Registration/Registration'
import Login from '../Login/Login'
import ForgetPassword from '../ForgetPassword/ForgetPassword'
import SalesRecord from '../SalesRecord/SalesRecord'
import ViewData from '../ViewData/ViewData'
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'
import Loader from '../shared/Loader'
import Modal from '@mui/material/Modal';
import Profile from '../Profile/Profile';
import Summary from '../Summary/Summary';



import {Routes, Route, useNavigate} from 'react-router-dom'


const Dashboard = () => {
 
    const navigate = useNavigate()
    const SINGLE_COMPANY = process.env.REACT_APP_SINGLE_COMPANY;
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const SINGLE_STAFF = process.env.REACT_APP_SINGLE_STAFF;

    const userId = window.localStorage.getItem('userId');
    const userToken = window.localStorage.getItem('userToken');
    const userType = window.localStorage.getItem('userType');

  
    const [state, setState] = useState({
        left: false,
    });
    const [user, setUser] = useState({
        userId,
        userToken,
        userType
    })  
    const [isLoading, setIsLoading] = useState(true)
    const [loggedUser, setLoggedUser] = useState(null)
    const [companyId, setCompanyId] = useState(null)

    useEffect(()=>{
      if(user.userId === null || user.userToken === null || user.userType === null) navigate('/login')

      if(user.userType === 'company'){

        fetch(`${BASE_URL}${SINGLE_COMPANY}?username=${user.userId}`)
          .then(res => res.json())
          .then(data => {
            if(data.success === true){
              setIsLoading(false)
              setLoggedUser(data.message)
              setCompanyId(data.message.username)
            }
          }).catch(error => {
            setIsLoading(false)
            console.error('Error:', error);
        })
      }else if (user.userType === 'staff'){
        fetch(`${BASE_URL}${SINGLE_STAFF}?staffId=${user.userId}`)
          .then(res => res.json())
          .then(data => {
            if(data.success === true){
              setCompanyId(data.message.username)
              setLoggedUser(data.message)
              setIsLoading(false)
            }
            
          }).catch(error => {
            setIsLoading(false)
            console.error('Error:', error);
        })
      }
    },[])

    return (
        <div>

             
             <Modal
              open={isLoading}
              onClose={!isLoading}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                background: '#3456d1',
                opacity: 0.95,
                alignItems: 'center',
                color: 'white'
              }}
            >
                <Loader></Loader>
          </Modal>
            <TogleNav setState={setState} state={state} loggedUser={loggedUser} isLoading={isLoading} userType={user.userType}/> 
            <Nav className="nav" loggedUser={loggedUser} isLoading={isLoading} userType={user.userType}/> 

            { <div className="right-con">
              <Header setState={setState} state={state} loggedUser={loggedUser} isLoading={isLoading} userType={user.userType}/>

              <Routes>
                {user.userType === 'company' && <Route index  element={<Home isLoading={isLoading} companyId={companyId}/>} /> }

                <Route path='register' element={<Registration />}/>
                <Route path='login' element={<Login /> }/>
                <Route path='forget-password' element={<ForgetPassword /> }/>
                {user.userType === 'staff'?
                <Route index  element={<SalesRecord />  }/>
                :<Route path='sales-record' element={<SalesRecord companyId={companyId} loggedUser={loggedUser}/>  }/>}

                <Route path='view-data' element={<ViewData companyId={companyId}/>  }/>
                <Route path='profile' element={<Profile user={user}/>}/>
                <Route path='summary' element={<Summary companyId={companyId}/>}/>

              </Routes>
              
              <Footer />
            </div> }

          </div>
    );
}
 
export default Dashboard;