import * as React from 'react';
import CustomTabs from '../CustomTabs/CustomTabs'
import TabPanel from '../CustomTabs/TabPanel'
import Income from './Income'
import Expences from './Expences';
import HeadTab from '../CustomTabs/HeadTab'
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
// import postReq from './usePost'
import Box from '@mui/material/Box';
import MessageModal from './MessageModal'

const SalesRecord = ({companyId,loggedUser}) => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const CREATE_INVOICE = process.env.REACT_APP_CREATE_INVOICE 
    const CREATE_EXPENSES = process.env.REACT_APP_CREATE_EXPENSES 

    const [isPending, setIsPending] = React.useState(false)
    const [msg, setMsg] = React.useState('')
    const [showError, setShowError] = React.useState(false)
    const [showSuccess, setShowSuccess] = React.useState(false)
    const [result, setResult] = React.useState(null)
    const [receiptType, setReceiptType] = React.useState('')


    const postReq = (url,data,type) => {
        setIsPending(true)
        setReceiptType(type)
        if(data){
            data.companyId = companyId
            try {
        
                fetch(url, {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                })
                    .then(response => {
                        if (response.ok == false) {
                            setIsPending(false)
                            throw Error('connection error retry again pls')
                        }
                        else return response.json()
                    })
                    .then(data => {
                        console.log(data);
                        setResult(data)
                        if (data.success) {
                            setIsPending(false)
                            setShowSuccess(true)
                        }
                        else {
                            setIsPending(false)
                            setMsg('something went wrong retry again')
                            setShowError(true)
                        }
        
                    }).catch(error => {
                        setIsPending(false)
                        setMsg('connection error retry again pls')
                        setShowError(true)
                        console.error('Error:', error);
                    })
            } catch (error) {
                setMsg('something went wrong retry again')
                setShowError(true)
                setIsPending(false)
        
            }
        }else{
            setMsg('You can send an empty invoice')
            setShowError(true)
            setIsPending(false)
        }
    }

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const labels = {
        itemOne: "Income",
        itemTwo: "Expenses"
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const HandleFormSubmitInvoice = (data)=>{
        postReq(`${BASE_URL}${CREATE_INVOICE}`,data,'invoice')
        
         

    }
    const HandleFormSubmitExpenses = (data) => {
        postReq(`${BASE_URL}${CREATE_EXPENSES}`,data, 'expenses')

    }

       
    return (

        <Box sx={{
            maxWidth: '97%',
            // border: '1px solid black',
            backgroundColor: 'white',
            marginTop: '2rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            '@media (max-width: 600px)': {
                marginTop: 0,
                maxWidth: '98%',

              },

        }}>
            <MessageModal
                loggedUser={loggedUser}
                msg={msg}
                showError={showError}
                showSuccess={showSuccess}
                result={result}
                setShowError={setShowError}
                setShowSuccess={setShowSuccess}
                receiptType={receiptType}
            />
            <Box sx={{
            width: '90%',
            backgroundColor: '#f7faff',
            margin: 'auto',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            '@media (max-width: 600px)': {
                paddingTop: '1rem',
                borderRadius: 2,
                paddingBottom: '1rem',

              },


        }}>
                <Box sx={{
                    border: '1px solid #D0D5DA',
                    borderRadius: 1,
                    width: '50%',
                    margin: 'auto',
                    backgroundColor: 'white',
                    '@media (max-width: 600px)': {
                        width: '90%',
                      },
                }}>
                    <Box sx={{
                        paddingTop: '1.2rem',
                        textAlign: 'left',
                        minHeight: '50vh',
                        backgroundColor: '#f7faff',
                        fontSize: 22,
                        // paddingBottom: '10rem'
                        
                    }}>
                        <CustomTabs >
                            <HeadTab labels={labels} value={value} handleChange={handleChange}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">

                                    <Tab label={labels.itemOne} {...a11yProps(0)} sx={{width:'50%'}}/>
                                    <Tab label={labels.itemTwo} {...a11yProps(1)} sx={{width:'50%'}}/>
                                </Tabs>
                            </HeadTab>
                            <Box>
                                <TabPanel value={value} index={0}>
                                    <Income HandleFormSubmitInvoice={HandleFormSubmitInvoice} isPending={isPending}/>
                                </TabPanel>

                                <TabPanel value={value} index={1}>
                                    <Expences HandleFormSubmitExpenses={HandleFormSubmitExpenses} isPending={isPending}/>
                                </TabPanel>
                            </Box>
                             
                        </CustomTabs>
                        
                    </Box>
                        
                </Box>
            </Box>
        </Box>
       
    );
}
 
export default SalesRecord;