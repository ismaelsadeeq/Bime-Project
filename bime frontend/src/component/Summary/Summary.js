import {useState,useEffect} from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import './Summary.css'
import Invoice from '../../images/invoice.png'
import Expenses from '../../images/expenses2.png'



const Summary = ({companyId}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const STATISTICS = process.env.REACT_APP_STATISTICS ;

    const [statIsLoading, setStatIsLoading] = useState(true)
    const [statis, setStatis] = useState(null)
    


    useEffect(()=>{
  
  
          fetch(`${BASE_URL}${STATISTICS}?companyId=${companyId}`)
            .then(res => res.json())
            .then(data => {
                if(data.success === true){
                    setStatIsLoading(false)

                    console.log(data)
                    // tt = data.dailyInvoice
                    setStatis(data)
                }
                
                // console.log(statis)
            }).catch(error => {
                setStatIsLoading(false)
                console.error('Error:', error);
            })
    },[companyId])    
       
    

    return (
        <Stack spacing={2} direction='row' sx={{
            width: '97.2%',
            backgroundColor: 'white',
            marginTop: '3rem',
            paddingTop: '4rem',
            '@media (max-width: 600px)': {
                marginTop: 0,
                paddingTop: 0,
                flexDirection: 'column',
                alignItems : 'center',
                gap: '3rem',
                width: '98%'
              },
        }}>
            

            <div className = 'container'>
            {!statIsLoading && <div className = 'card'>
                <div className = 'image'>
                    <img src ={Invoice}/>
                </div>
                <div className = 'content'>
                    <h3>Total Income: {statis.dailyInvoice[0] === undefined ? 0 : statis.dailyInvoice[0].total}</h3>
                    <p> No. Of Sales: {statis.dailyInvoice[0] === undefined ? 0 : statis.dailyInvoice[0].totalNumberOfInvoice}</p>
                </div>
                </div>}
            {statIsLoading && <CircularProgress /> }
            </div>

            <div className = 'container'>
            {!statIsLoading && <div className = 'card'>
                <div className = 'image'>
                    <img src ={Expenses}/>
                </div>
                <div className = 'content'>
                    <h3>Total Expeneses: {statis.dailyExpenses[0] === undefined ? 0 : statis.dailyExpenses[0].total}</h3>
                    <p>No. Of Voucher: {statis.dailyExpenses[0] === undefined ? 0 : statis.dailyExpenses[0].totalNumberOfExpenses}</p>
                </div>
                </div> }   
                {statIsLoading && <CircularProgress /> }
            </div>
        </Stack>

    );
}
 
export default Summary;