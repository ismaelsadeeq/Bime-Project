import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import successImage from '../../images/success.gif'
import errorImage from '../../images/error.gif'
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import { useReactToPrint } from 'react-to-print';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({loggedUser,result, receiptType}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const stl = {
    color: 'gray'
  }

  const componentRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Print Receipt</Button>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, border: 'none'}}>
          <Box ref={componentRef}>
            <h2 id="child-modal-title">{loggedUser.companyName.toUpperCase()}</h2>
            {receiptType === 'invoice' && <p id="child-modal-description">
              <Stack flexDirection='column'>

                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>receipt number:</Typography> <Typography> {result.data.receiptNumber}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>Name:</Typography> <Typography> {result.data.customerName}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>date:</Typography> <Typography> {result.data.date}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>grand total:</Typography> <Typography> {result.data.grandTotal}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>time issued:</Typography> <Typography> {result.data.timeEntered}</Typography></Stack> 

                {result.data.product.map(prd => {
                  return (<>
                    <Divider sx={{marginTop: '0.5rem'}}/>
                    <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>product:</Typography> <Typography> {prd.productName}</Typography></Stack> 
                    <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>price:</Typography> <Typography> {prd.price}</Typography></Stack> 
                    <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>quantity:</Typography> <Typography> {prd.quantity}</Typography></Stack> 
                    <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>total:</Typography> <Typography> {prd.totalPrice}</Typography></Stack> 

                  </>)

                })}

              </Stack>            
            </p> }
            {receiptType === 'expenses' && <p id="child-modal-description">
              <Stack flexDirection='column'>

                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>receipt number:</Typography> <Typography> {result.data.receiptNumber}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>name:</Typography> <Typography> {result.data.collectorsName}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>purpose:</Typography> <Typography> {result.data.purpose}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>date:</Typography> <Typography> {result.data.date}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>amount:</Typography> <Typography> {result.data.amount}</Typography></Stack> 
                <Stack flexDirection='row' spacing={0.2} alignItems='flex-end'> <Typography sx={{...stl,marginRight: '0.5rem'}}>time issued:</Typography> <Typography> {result.data.timeEntered}</Typography></Stack> 
                
              </Stack>            
            </p> }

          </Box>
          <IconButton onClick={handleClose}><CloseIcon /></IconButton>
          <Button onClick={handlePrint}>Print</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function MessageModal({loggedUser, showError, showSuccess, msg, setShowError, setShowSuccess, result, receiptType}) {
  
  
  const handleClose = () => {
    setShowSuccess(false)
    setShowError(false)
  };

  return (
    <div>
      <Modal
        open={(showError || showSuccess)}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 200, border:'none' }}>
          <Box id="parent-modal-description" >
            {showSuccess && <img src={successImage} alt="success" width='100%' height='70%'/> }
            {showError && <img src={errorImage} alt="error" width='100%' height='70%'/> }
          </Box>
          <Stack alignItems='center' flexDirection='column' sx={{marginTop:'1rem'}}>
          {showSuccess && <Typography id="parent-modal-title" color='#6683ed'>SUCCESS</Typography>}
            {showError && <Typography sx={{textAlign: 'center'}} id="parent-modal-title" color='red'>{msg}</Typography>}

            {showSuccess && <ChildModal loggedUser={loggedUser} result={result} receiptType={receiptType}/> }
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>

          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
