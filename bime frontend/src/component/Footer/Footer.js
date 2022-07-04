import './Footer.css'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

const Footer = () => {
    return (
        <Box sx={{
            marginTop: '2.3rem',
            width: '97%',
            paddingTop: '1rem',
            paddingBottom: '1rem',
        }}>
            <Typography sx={{fontSize: 12, color: '#828bb2'}}>2022 © Influence - A Product of Nutcoders</Typography>
        </Box>
    );
}
 
export default Footer;