import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';

import { getSupportTickets } from '../../../services/SupportTickets/supportTickets';



function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};




export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchAttribute, setSearchAttribute] = React.useState('customerName');
    const [supportTickets, setSupportTickets] = React.useState([]);

    // Function to fetch support ticket data from the server
    const fetchSupportTickets = async () => {
        try {
            const data = await getSupportTickets();
            setSupportTickets(data);
        } catch (error) {
            console.error('Error fetching support tickets:', error);
        }
    };

    React.useEffect(() => {
        fetchSupportTickets();
    }, []);


    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - supportTickets.length) : 0;

    const filterRows = (rows, attribute, query) => {
        return rows.filter((row) => {
            const value = row[attribute].toString().toLowerCase();
            return value.includes(query.toLowerCase());
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAttributeChange = (event) => {
        setSearchAttribute(event.target.value);
    };

    const filteredRows = searchQuery
        ? filterRows(supportTickets, searchAttribute, searchQuery)
        : supportTickets;

    return (
        <div>
            <div className='space-x-4 mb-5'>
                {/* Search input field */}
                {console.log("Filtered ROws",filteredRows)}
                <TextField
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size='small'
                />

                {/* Attribute selection dropdown */}
                <Select
                    value={searchAttribute}
                    onChange={handleAttributeChange}
                    size='small'
                >
                    <MenuItem value="customerName">Name</MenuItem>
                    <MenuItem value="dateIssued">Date Issued</MenuItem>
                    <MenuItem value="type">Ticket Type</MenuItem>
                    <MenuItem value="priority">Ticket Priority</MenuItem>
                    <MenuItem value="status">Status</MenuItem>

                </Select>
            </div>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead className='bg-gray-800'>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>Name</TableCell>
                            <TableCell style={{ color: "white" }}>Date Issued</TableCell>
                            <TableCell style={{ color: "white" }}>Ticket Type</TableCell>
                            <TableCell style={{ color: "white" }}>Ticket Priority</TableCell>
                            <TableCell style={{ color: "white" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            : filteredRows
                        ).map((row) => (
                            <TableRow key={row._id}>
                                <TableCell component="th" className='hover:scale-105 transform transition-transform duration-300 ease-in-out' scope="row" style={{ width: 160 }} >
                                    <Link to={`/view_tickets/${row._id}`}>
                                        <span className=' cursor-pointer hover:text-blue-800 underline' >    {row.customerName}</span>
                                    </Link>
                                </TableCell>
                                <TableCell style={{ width: 160 }}>{(row.dateIssued + '').split("T")[0]}</TableCell>
                                <TableCell style={{ width: 160 }}>{row.type}</TableCell>
                                <TableCell style={{ width: 160 }}>{row.priority}</TableCell>
                                <TableCell style={{ width: 160 }}>{row.status}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={5} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={5}
                                count={filteredRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    );
}
