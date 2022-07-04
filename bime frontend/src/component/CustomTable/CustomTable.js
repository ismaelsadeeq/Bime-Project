import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';


export default function BasicTable({children}) {
  return (
    <TableContainer component={Paper} sx={{boxShadow: 'none'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
         {children[0]}
        </TableHead>
        {children[1]}
      </Table>
    </TableContainer>
  );
}
