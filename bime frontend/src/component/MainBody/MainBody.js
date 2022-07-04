import './MainBody.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';




const BasicCard = ({bg,invoice,expenses,day}) => {
    const style = { 
        height: '70%',
        display:"flex", 
        flexDirection: "column", 
        alignItems: "flex-start", 
        justifyContent: "space-between",
        marginTop: 2, marginBottom: 2,
        }
    return (<Card  sx={{
         minWidth: "25%", 
         backgroundColor: bg, 
         color:"white", boxShadow: 'none', 
         borderRadius:"0.7rem", 
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'flex-start',
         padding: '0 2rem',
         '@media (max-width: 600px)':{
             padding: '0 1rem'
         }
         }}>
                    <Typography sx={{marginLeft: 2, marginTop: 1}}>{day}</Typography>
                <CardContent  >
                    <Stack direction='row' spacing={6} alignItems='center' justifyContent='space-between' sx={{'@media (max-width: 600px)': {gap: 0}}}>
                        <Box sx={{...style}}>
                            <Typography className='basic-card-content-text' sx={{ fontSize: 16, '@media (max-width: 600px)': {fontSize: 14 }}} >
                            Total Income
                            </Typography>
                            <Typography className='basic-card-content-text' variant="h4" component="div" sx={{ fontWeight: "bold", '@media (max-width: 600px)': {fontSize: 20 } }}>
                                {invoice === undefined ? 0 : invoice.total}
                            </Typography>
                            <Typography className='basic-card-content-text' sx={{ fontSize: 14, '@media (max-width: 600px)': {fontSize: 12 }}} >
                                No. of sales {invoice === undefined ? 0 : invoice.totalNumberOfInvoice}
                            </Typography>
                        </Box>
                        <Divider sx={{backgroundColor: '#FFFFFF'}} orientation="vertical" variant="middle" flexItem />
                        <Box sx={{...style}}>
                            <Typography className='basic-card-content-text' sx={{ fontSize: 16,'@media (max-width: 600px)': {fontSize: 14 } }}  >
                            Total Expenses
                            </Typography>
                            <Typography className='basic-card-content-text' variant="h4" component="div" sx={{ fontWeight: "bold",'@media (max-width: 600px)': {fontSize: 20 } }}>
                                {expenses === undefined ? 0 : expenses.total}
                            </Typography>
                            <Typography className='basic-card-content-text' sx={{ fontSize: 14, '@media (max-width: 600px)': {fontSize: 12 } }} >
                                No. of voucher {expenses === undefined ? 0 : expenses.totalNumberOfExpenses}
                            </Typography>
                        </Box>
                    </Stack>    
                   
                </CardContent>
            </Card>)
}

const MainBody = ({companyId}) => {
    console.log(companyId)

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

                    // console.log(statis)
                    // tt = data.dailyInvoice
                    setStatis(data)
                }
                
                // console.log(statis)
            }).catch(error => {
                setStatIsLoading(false)
                console.error('Error:', error);
            })
    },[])      
    return (

        <div className="main-body">
            {!statIsLoading && <BasicCard bg={'#3b76ef'} day={'Daily'} invoice={statis.dailyInvoice[0]} expenses={statis.dailyExpenses[0]}/>}
            {statIsLoading && <CircularProgress /> }
            
            {!statIsLoading && <BasicCard bg={'#63c7ff'} day={'Weelky'} invoice={statis.weaklyInvoice[0]} expenses={statis.weaklyExpenses[0]}/>}
            {statIsLoading && <CircularProgress /> }
            
            {!statIsLoading && <BasicCard bg={'#a66dd4'} day={'Monthly'} invoice={statis.monthlyInvoice[0]} expenses={statis.monthlyExpenses[0]}/>}
            {statIsLoading && <CircularProgress /> }
            
            {!statIsLoading && <BasicCard bg={'#6dd4b1'} day={'Monthly'} invoice={statis.monthlyInvoice[0]} expenses={statis.monthlyExpenses[0]}/>}
            {statIsLoading && <CircularProgress /> }
            
        </div>
    );
}
 
export default MainBody;