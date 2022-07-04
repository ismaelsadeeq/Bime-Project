import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const FormContainer = ({children}) => {
    return (
        <Box sx={{
            border: '1px solid #D0D5DA',
            borderRadius: 1,
            width: '30%',
            margin: 'auto',
            backgroundColor: 'white',
            '@media (max-width: 600px)': {
                width: '90%',

            },
        }}>
            <Typography sx={{
                paddingTop: '1.2rem',
                paddingLeft: '1.9rem',
                textAlign: 'left',
                height: '4rem',
                backgroundColor: '#f7faff',
                fontSize: 22
                
            }}>{children[0]}</Typography>
            {children[1]}
        </Box>
    );
}
 
export default FormContainer;