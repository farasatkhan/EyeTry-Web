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
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


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

function createData(name, dateIssued, ticketType, ticketPriority, status) {
    return { name, dateIssued, ticketType, ticketPriority, status };
}

const initialRows = [
    createData('John Doe', '2023-09-01', 'Support', 'High', 'Open'),
    createData('Jane Smith', '2023-09-02', 'Bug', 'Medium', 'In Progress'),
    createData('Bob Johnson', '2023-09-03', 'Feature Request', 'Low', 'Resolved'),
    createData('Alice Brown', '2023-09-04', 'Support', 'High', 'Open'),
    createData('Eve Wilson', '2023-09-05', 'Bug', 'Medium', 'In Progress'),
    createData('Charlie Davis', '2023-09-06', 'Feature Request', 'Low', 'Resolved'),
    createData('Grace Lee', '2023-09-07', 'Support', 'High', 'Open'),
    // Add more rows here
].sort((a, b) => (a.dateIssued < b.dateIssued ? -1 : 1)); // Corrected sorting function based on dateIssued


export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchAttribute, setSearchAttribute] = React.useState('name');

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - initialRows.length) : 0;

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
        ? filterRows(initialRows, searchAttribute, searchQuery)
        : initialRows;

    return (
        <div>
            <div className='space-x-4 mb-5'>
                            {/* Search input field */}
            <TextField
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                id="outlined-basic"
                label="Search"
                variant="outlined"
                size= "small"
                />

            {/* Attribute selection dropdown */}
            <Select
                value={searchAttribute}
                onChange={handleAttributeChange}
                size="small"
            >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="dateIssued">Date Issued</MenuItem>
                <MenuItem value="ticketType">Ticket Type</MenuItem>
                <MenuItem value="ticketPriority">Ticket Priority</MenuItem>
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
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>{row.dateIssued}</TableCell>
                                <TableCell style={{ width: 160 }}>{row.ticketType}</TableCell>
                                <TableCell style={{ width: 160 }}>{row.ticketPriority}</TableCell>
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
