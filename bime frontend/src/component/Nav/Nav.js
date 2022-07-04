import Label from '../Label/Label';
import './Nav.css'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import DetailsIcon from '@mui/icons-material/Details';
import InventoryIcon from '@mui/icons-material/Inventory';
import PasswordIcon from '@mui/icons-material/Password';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';


const Nav = ({loggedUser,isLoading,userType}) => {
    const style = {textDecoration: 'none', color: 'black'}
    const hoverStyle = {'&:hover': { backgroundColor: 'white',boxShadow:'1px 2px 5px #dfdbdb' }}
    return (
        <div className="nav">
            <Label loggedUser={loggedUser} isLoading={isLoading}/>
            <Box >
            <nav aria-label="main mailbox folders">
                    <List>
                        {userType === 'company' && <Link to='/dashboard' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon   >
                                        <HomeIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Home" />
                                </ListItemButton>
                            </ListItem>
                        </Link> }

                        {userType === 'staff'? <Link to='/dashboard' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <InventoryIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Invoice" />
                                </ListItemButton>
                            </ListItem>
                        </Link> 
                        : <Link to='/dashboard/sales-record' style={{...style}}>
                        <ListItem disablePadding sx={{...hoverStyle}}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <InventoryIcon />
                                </ListItemIcon>
                                <ListItemText primary="Invoice" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                         }
                        <Link to='/dashboard/view-data' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <DetailsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Details" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <Link to='/dashboard/profile' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <ManageAccountsIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <Link to='/dashboard/summary' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LeaderboardIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Summary" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

{/*                         
                        <Link to='/dashboard/forget-password' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <PasswordIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Password" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <Link to='/dashboard/register' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <AppRegistrationIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Register" />
                                </ListItemButton>
                            </ListItem>
                        </Link>

                        <Link to='/dashboard/login' style={{...style}}>
                            <ListItem disablePadding sx={{...hoverStyle}}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <LoginIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItemButton>
                            </ListItem>
                        </Link> */}
                    </List>
                   
            </nav>
            </Box>
            
        </div>
    );
}
 
export default Nav;