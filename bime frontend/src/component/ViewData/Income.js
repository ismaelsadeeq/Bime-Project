import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const Income = () => {
    return (
        <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right">Reciept Number</TableCell>
            <TableCell align="right">Date</TableCell>

        </TableRow>
    );
}
 
export default Income;