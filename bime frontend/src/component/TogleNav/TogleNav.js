import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Label from '../Label/Label'
import HomeIcon from '@mui/icons-material/Home';
import DetailsIcon from '@mui/icons-material/Details';
import InventoryIcon from '@mui/icons-material/Inventory';
import PasswordIcon from '@mui/icons-material/Password';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import ListItemButton from '@mui/material/ListItemButton';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';

import { Link } from "react-router-dom";


export default function TemporaryDrawer({state,setState,loggedUser,isLoading,userType}) {
//   const [state, setState] = React.useState({
//     left: false,
//   });
const style = {textDecoration: 'none', color: 'black'}

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250, display: 'flex', flexDirection: 'column',}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Label loggedUser={loggedUser} isLoading={isLoading}/>
      <List>
        {userType === 'company' && <Link to='/dashboard'style={{...style}} >
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon   >
                            <HomeIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </Link> }

            {userType === 'staff'? <Link to='/dashboard' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <InventoryIcon />
                        </ListItemIcon>
                        <ListItemText primary="Invoice" />
                    </ListItemButton>
                </ListItem>
            </Link>
            : <Link to='/dashboard/sales-record' style={{...style}}>
            <ListItem disablePadding>
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
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <DetailsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Details" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to='/dashboard/profile' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ManageAccountsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to='/dashboard/summary' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LeaderboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Summary" />
                    </ListItemButton>
                </ListItem>
            </Link>

            
            {/* <Link to='/dashboard/forget-password' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PasswordIcon />
                        </ListItemIcon>
                        <ListItemText primary="Password" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to='/dashboard/register' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AppRegistrationIcon />
                        </ListItemIcon>
                        <ListItemText primary="Register" />
                    </ListItemButton>
                </ListItem>
            </Link>

            <Link to='/dashboard/login' style={{...style}}>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <LoginIcon />
                        </ListItemIcon>
                        <ListItemText primary="Login" />
                    </ListItemButton>
                </ListItem>
            </Link> */}
      </List>
    </Box>
  );

  return (
    <div>
        <React.Fragment key='left'>
          <Drawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
          >
            {list('left')}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
