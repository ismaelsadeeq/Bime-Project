import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Expenses = () => {
    return (
        <TableRow>
            <TableCell>Collectors Name</TableCell>
            <TableCell align="right">Purpose</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Reciept</TableCell>
            <TableCell align="right">Date</TableCell>
        </TableRow>
    );
}
 
export default Expenses;