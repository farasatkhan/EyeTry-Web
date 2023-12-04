import React, { useEffect, useState } from 'react';
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
import { viewAllOrders } from '../../../../api/productsApi';

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

export default function CustomPaginationActionsTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchAttribute, setSearchAttribute] = React.useState('name');

    const [ordersData, setOrdersData] = useState([])
    // getting userId
    const userIdString = localStorage.getItem('userID')
    const userID = JSON.parse(userIdString)
    console.log(userID)

    // getting orders data 

    useEffect(() => {

        getOrders();

    }, [])

    const getOrders = async () => {
        try {
            const orders = await viewAllOrders(userID)
            setOrdersData(orders.data.orders)
            console.log("orders Data: ", orders.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ordersData.length) : 0;

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
        ? filterRows(ordersData, searchAttribute, searchQuery)
        : ordersData;

    // formating date 
    const formatDate = (date) => {
        const dateObject = new Date(date);

        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObject);
        return formattedDate
    }

    // formating time
    const formatTime = (time) => {
        const dateObject = new Date(time);

        const hours = dateObject.getHours();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';

        return `${hours % 12 || 12}:${dateObject.getMinutes()}:${dateObject.getSeconds()} ${amOrPm}`
    }

    return (
        <div>
            {/* <div className='space-x-4 mb-5'>
                <TextField
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    id="outlined-basic"
                    label="Search"
                    variant="outlined"
                    size="small"
                />

                <Select
                    value={searchAttribute}
                    onChange={handleAttributeChange}
                    size="small"
                >
                    <MenuItem value="name">No.</MenuItem>
                    <MenuItem value="dateIssued">Items</MenuItem>
                    <MenuItem value="ticketType">Order Date</MenuItem>
                    <MenuItem value="ticketPriority">Total Price</MenuItem>
                    <MenuItem value="status">Delivery Status</MenuItem>

                </Select>
            </div> */}

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead className='bg-gray-800'>
                        <TableRow>
                            <TableCell style={{ color: "white" }}>No.</TableCell>
                            <TableCell style={{ color: "white" }}>Items</TableCell>
                            <TableCell style={{ color: "white" }}>Order Date</TableCell>
                            <TableCell style={{ color: "white" }}>Order Time</TableCell>
                            <TableCell style={{ color: "white" }}>Total Price</TableCell>
                            <TableCell style={{ color: "white" , textAlign:'center' }}>Delivery Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? filteredRows.slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            : filteredRows
                        ).map((order, index) => (
                            <TableRow className='cursor-pointer' key={order._id}>
                                <TableCell style={{ width: 160 }} component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell style={{ width: 160 }}>{order.items.length}</TableCell>
                                <TableCell style={{ width: 160 }}>{formatDate(order.orderDate)}</TableCell>
                                <TableCell style={{ width: 160 }}>{formatTime(order.orderDate)}</TableCell>
                                <TableCell style={{ width: 160 }}>{order.totalPrice}</TableCell>
                                <TableCell style={{ width: 160, textAlign: 'center', }}>
                                    <p className={` justify-center items-center p-1 mr-5 ml-5 rounded-xl text-white ${order.deliveryStatus === 'Pending' ? 'bg-red-500' : 'bg-green-500'} `}>
                                        {order.deliveryStatus}
                                    </p>

                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
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
