import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #3456d1',
  boxShadow: 24,
  p: 4,
  '@media (max-width: 600px)':{
    width: '70%'
  }
};

export default function BasicModal({openDetailModal, detailValue, setOpenDetailModal}) {

  return (
    <div>
      {console.log(detailValue)}
      <Modal
        open={openDetailModal}
        onClose={()=>setOpenDetailModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
        <Stack flexDirection='column' spacing={1} sx={style}>
        
          <IconButton onClick={()=>setOpenDetailModal(false)}><CloseIcon /></IconButton>

          <Stack flexDirection='column' spacing={1}>
            <LabelAndText label={'Receipt Number'} text={detailValue.receiptNumber}/>
            <LabelAndText label={'Customer Name'} text={detailValue.customerName}/>
            <LabelAndText label={'Date Of Purchase'} text={detailValue.date}/>
            <LabelAndText label={'Grand Total'} text={detailValue.grandTotal}/>
          </Stack> 

          <Divider />
            {detailValue.product.map(prd => (
              <Stack flexDirection='column' spacing={1}>
                <LabelAndText label={'Product Name'} text={prd.productName}/>
                <LabelAndText label={'Price'} text={prd.price}/>
                <LabelAndText label={'Quantity'} text={prd.quantity}/>
                <LabelAndText label={'Total Price'} text={prd.totalPrice}/>
                <Divider />
              </Stack> 

            ))}

        </Stack>
      </Modal>
    </div>
  );
}

const LabelAndText = ({label,text}) => {
  return (
    <Stack flexDirection='row' alignItems='flex-end' sx={{
      gap: 2

    }}>
      <Typography color='#3F3C3C' sx={{
        fontSize: '0.9rem',
        '@media (max-width: 600px)': {
          fontSize: '0.8rem',

        },
        }}>
        {label}:
      </Typography>
      <Typography sx={{'@media (max-width: 600px)':{fontSize: '0.9rem',}}}>
        {text}
      </Typography>
    </Stack>
  );
}
 