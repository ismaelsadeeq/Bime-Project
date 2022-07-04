import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Palette from '../../ThemeProvider';
import LoadingButton from '@mui/lab/LoadingButton';



const Income = ({HandleFormSubmitInvoice,isPending}) => {
    const inputLabels = {
        productLabel: "Product Name",
        priceLabel: "price",
        quantityLabel: "quantity",
        totalLabel: "total price"

    }
    const formatDate = (date) => {
        return date.toString().split(' ').splice(0,4).join(' ')
    }
       
    const [date, setDate] = React.useState(formatDate(new Date()));
    const [customerName, setCustomerName] = React.useState('')
    const [data, setData] = React.useState('')
    const [inputFields, setInputFields] = React.useState([
        {
            productName: "",
            price: 0,
            quantity: 1,
            totalPrice: 0,
        },
    ]);

    const handleAddNewForm = ()=>{
        setInputFields([...inputFields, {
            productName: "",
            price: 0,
            quantity: 1,
            totalPrice: 0,
        },])

        setData({
            customerName,
            date:date,
            grandTotal:[...inputFields, {
                productName: "",
                price: 0,
                quantity: 1,
                totalPrice: 0,
            },].reduce((a,b)=>a + b.totalPrice,0),
            product : inputFields
        })

       
    }
    const handleRemoveNewForm = ()=>{
        const values = [...inputFields]
        values.length>1 && values.pop()
        setInputFields(values)

        setData({
            customerName,
            date,
            grandTotal: values.reduce((a,b)=>a + b.totalPrice,0),
            product : values
        })
       
    }

    const handleChangeInput = (event,index,fieldName)=>{
        const values = [...inputFields]
        // console.log(event.target.value,index)
        values[index][fieldName] = event.target.value
        values[index]['totalPrice'] = values[index]['quantity'] * values[index]['price']
        // console.log(values[index])
        setInputFields(values) 

        setData({
            customerName,
            date,
            grandTotal: values.reduce((a,b)=>a + b.totalPrice,0),
            product : values
        })
                
    }

    const handleChangeDate = (newValue) => {
        setData({
            customerName,
            date:formatDate(newValue),
            grandTotal:[...inputFields].reduce((a,b)=>a + b.totalPrice,0),
            product : inputFields
        })
        setDate(formatDate(newValue))
    }
    
    const handleChangeName = (e) => {
        setData({
            customerName: e.target.value,
            date,
            grandTotal:[...inputFields].reduce((a,b)=>a + b.totalPrice,0),
            product : inputFields
        })
        setCustomerName(e.target.value)
    }
    

    return (

        <Stack direction="row">
            <Stack spacing={3} direction="column" sx={{
                padding: '2rem'
            }}>
                <TextField id="outlined-basic" label="Customer Name" variant="outlined" size='small'
                onChange={(e)=>handleChangeName(e)}
                value={customerName}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Change date"
                        value={date==null ? new Date() : date}
                        onChange={(newValue) => {
                        handleChangeDate(newValue);
                        }}
                        renderInput={(params) => <TextField size="small"{...params} />}
                    />
                </LocalizationProvider>

                {inputFields.map((form,index)=>(
                    <Stack key={index} spacing={2} direction="column">
                        <Divider />

                        <Stack spacing={2} direction="column">
                            <TextField id="outlined-basic" label={inputLabels.productLabel} variant="outlined" size='small' value={form.productName} onChange={(event)=>handleChangeInput(event,index,"productName")}/>

                            <Stack spacing={2} direction="row" >
                                <TextField id="outlined-basic" type="number" label={inputLabels.priceLabel} variant="outlined" size='small' InputProps={{
                                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                }}value={form.price} onChange={(event)=>handleChangeInput(event,index,"price")}/>
                                <TextField id="outlined-basic" type="number" label={inputLabels.quantityLabel} variant="outlined" size='small'value={form.quantity} onChange={(event)=>handleChangeInput(event,index,"quantity")}/>


                            </Stack>
                                <TextField id="outlined-basic" type="number" label={inputLabels.totalLabel} variant="outlined" size='small' InputProps={{
                                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                                }} value={form.totalPrice} onChange={(event)=>handleChangeInput(event,index,"totalPrice")}/ >
                        </Stack>

                    </Stack>
                ))}

                <Palette>
                    {!isPending && <Button variant="contained" onClick={()=> HandleFormSubmitInvoice(data)}><Typography>Submit</Typography></Button> }
                    {isPending && <LoadingButton variant="contained" loading >...loading</LoadingButton>}
                
                </Palette>
                
            </Stack>

            <Stack direction="column" spacing={1} sx={{
                position: 'absolute',
                alignSelf: 'flex-end',
                justifySelf: 'flex-end',
                marginLeft: '40.9%',
                marginBottom: '2rem',
                '@media (max-width: 600px)': {
                    marginLeft: '75.5%',
                  },

            }}>
                <Fab aria-label="add" size="medium" sx={{
                    borderRight: '1px solid #ABB5C5',
                    backgroundColor: 'white',
                    boxShadow: 'none',
                }}  onClick={handleAddNewForm}>
                    <Palette>

                        <AddIcon color="secondary"/>
                    </Palette>
                </Fab>
                <Fab aria-label="add" size="medium" sx={{
                    borderRight: '1px solid #ABB5C5',
                    backgroundColor: 'white',
                    boxShadow: 'none'
                }}onClick={handleRemoveNewForm}>
                    <Palette>
                        <RemoveIcon color="secondary"/>

                    </Palette>
                </Fab>
            </Stack>
        </Stack>

    );
}
 
export default Income;