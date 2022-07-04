import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TabPanel from './TabPanel'



TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


export default function BasicTabs({labels,children,value,handleChange}) {
  
// console.log(children)
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          {children[0]}
      </Box>
      <Box sx={{width: '100%', backgroundColor: 'white'}}>
       {children[1]}
      </Box>
     
    </Box>
  );
}
