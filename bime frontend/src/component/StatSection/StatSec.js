import './StatSec.css'
import Box from '@mui/material/Box'
import LineChart from '../../chart/LineChart'
import DualAxesChart from '../../chart/DualAxes'
import CircularProgress from '@mui/material/CircularProgress';
import {useState, useEffect} from 'react';


const StatSection = ({companyId}) => {
    const [statIsLoading, setStatIsLoading] = useState(true)
    const [statis, setStatis] = useState(null)

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const CHAT_STATISTICS = process.env.REACT_APP_CHAT_STATISTICS;
    
    const rearrange = (data,status) => {
        return data.map(data=>{
            if(status === 'day'){

                return {
                    time: data._id.date,
                    total: data.dailyTotal,
                    invoice: data.totalNumberOfInvoice
                }
            }else if(status === 'week'){

                return {
                    week: `week ${data._id.week}`,
                    total: data.dailyTotal,
                    invoice: data.totalNumberOfInvoice
                }
            }else if(status === 'month'){

                return {
                    month: `month ${data._id.month} ${data._id.year}`,
                    total: data.dailyTotal,
                    invoice: data.totalNumberOfInvoice
                }
            }
        })
    }

    useEffect(()=>{
  
  
          fetch(`${BASE_URL}${CHAT_STATISTICS}?companyId=${companyId}`)
            .then(res => res.json())
            .then(data => {
                if(data.success === true){
                    setStatIsLoading(false)

                    // console.log(statis)
                    // tt = data.dailyInvoice
                    setStatis(data)
                }
                
                console.log(data)
            }).catch(error => {
                setStatIsLoading(false)
                console.error('Error:', error);
            })
    },[])      
   
    return (
        <Box className='main-box' sx={{
            marginTop: '3rem',
            display:'flex', 
            gap: '2rem', 
            width:'97%',
            flexWrap: 'wrap',
            backgroundColor: 'white',
            borderRadius:'2px',
            paddingTop:'2rem',
            paddingBottom: '2rem',
            justifyContent:'center',
            '@media (max-width: 600px)': {
                marginTop: 0
              },
           
            }}>
            {!statIsLoading && <DualAxesChart data={rearrange(statis.daily,'day').reverse()} values={['time','total','invoice']}/> }
            {statIsLoading && <CircularProgress /> }

            {!statIsLoading && <DualAxesChart data={rearrange(statis.weekly,'week').reverse()} values={['week','total','invoice']}/> }
            {statIsLoading && <CircularProgress /> }

            {!statIsLoading && <DualAxesChart data={rearrange(statis.monthly,'month').reverse()} values={['month','total','invoice']}/> }
            {statIsLoading && <CircularProgress /> }
            {/* {!statIsLoading && <LineChart /> } */}

        </Box>
    );
}
 
export default StatSection;