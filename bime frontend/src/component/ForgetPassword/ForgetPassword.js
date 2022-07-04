import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Palette from '../../ThemeProvider';
import BackgroundBox from '../shared/BackgroundBox';
import FormContainer from '../shared/FormContainer';

import Box from '@mui/material/Box';

const ForgetPassword = () => {
    return (

        <Box sx={{
            width: '97%',
            backgroundColor: 'white',
            marginTop: '2rem',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            '@media (max-width: 600px)': {
                marginTop: 0,
                width: '100%',
                paddingTop: 0
              },

        }}>
            <Box sx={{
            width: '90%',
            backgroundColor: '#f7faff',
            margin: 'auto',
            paddingTop: '2rem',
            paddingBottom: '2rem',
            '@media (max-width: 600px)': {
                paddingTop: 0,
                borderRadius: 2,
                paddingBottom: '1rem',

              },


        }}>
             <Stack direction="row" sx={{
                    '@media (max-width: 600px)': {
                        flexDirection: 'column'
                    },
                }}>
                    <BackgroundBox>Hello</BackgroundBox>
                    <FormContainer>
                        <p>Forget Password</p>
                        <Stack spacing={2} direction="column" sx={{
                            padding: '2rem'
                        }}>

                            <TextField id="outlined-basic" size='small' label="Enter your mail" variant="outlined" />
                            <Palette>
                                <Button variant="contained">send</Button>
                            </Palette>
                            
                            
                        </Stack>

                    </FormContainer>
                </Stack>
            </Box>
        </Box>
       
    );
}
 
export default ForgetPassword;