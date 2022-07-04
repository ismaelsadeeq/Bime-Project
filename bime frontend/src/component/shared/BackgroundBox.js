import Box from '@mui/material/Box';
import Image from '../../images/buss4.jpg'

const BackgroundBox = ({children}) => {
    return (
        <Box sx={{
            borderRight: '1px solid blue',
            width: '70%',
            height: '83vh',
            backgroundImage: `url(${Image})`,
            backgroundSize: '120% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            '@media (max-width: 600px)': {
                border: 'none',
                width: '100%',
                height: '80vh'

            },
        }}>{children}</Box>
    );
}
 
export default BackgroundBox;