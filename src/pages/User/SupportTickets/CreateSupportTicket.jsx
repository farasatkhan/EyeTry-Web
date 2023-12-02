import React from "react";
import { Link } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDataFromLocalStorage } from "../../../utils/LocalStorage";
import { useNavigate } from 'react-router-dom';
import { createSupportTicket } from "../../../services/SupportTickets/supportTickets";


export default function CreateSupportTicket() {
   

    const navigate = useNavigate();


    const [ticketType, setTicketType] = React.useState('Product Inquiry');
    const [ticketPriority, setTicketPriority] = React.useState('Low');
    const [description, setdescription] = React.useState('');
    const [orderNumber, setOrderNumber] = React.useState('');

    
    const handleTicketCreation = async () => {
        const ticketData = {
            type: ticketType,
            priority: ticketPriority,
            description: description,
            orderNumber: orderNumber,
        }
        try{
            const res = await createSupportTicket(ticketData)
            console.log(res)
            console.log("Ticket Created")
            alert("Your Ticket Has Been Created Successfully")
        }
        catch(error){
            console.log(error)
        }
        
    }


    return (
        <div className="flex flex-col h-screen">
            <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto  ">
                <div className=" bg-white border border-gray-200 rounded-lg shadow  mt-5  mx-auto mb-5">
                    <div className="flex flex-row mt-3">
                        <h4 className="ml-5  text-xl font-semibold tracking-tight text-gray-900 font-sans">Create Support Ticket</h4>
                    </div>
                    <hr className="border-3 border-gray-300 my-4" />
                    <div className="p-5 text-base ">
                        <div className="flex flex-row justify-between items-baseline p-0.5 mb-3 ">
                            <p className="font-semibold w-[50%] ">Order Number</p>
                            <input type="text" style={{borderWidth:'1px',}} className="  w-[50%] h-8 text-left overflow-hidden  border-gray-500 rounded  placeholder:text-xs pl-2" placeholder="Enter order number if applicable" value={orderNumber}  onChange={(e)=> setOrderNumber(e.target.value)}/>
                        </div>

                       <div className="flex flex-row justify-between items-baseline p-0.5 mb-3 ">
                            <p className="font-semibold w-[50%]">Ticket Type</p>
                            <div className="w-[50%]">
                                <Select
                                    value={ ticketType || ''}
                                    onChange={(e)=> setTicketType(e.target.value)}
                                    sx={{
                                        height: '32px',

                                    }}
                                >
                                    <MenuItem value="Product Return">Product Return</MenuItem>
                                    <MenuItem value="Product Inquiry">Product Inquiry</MenuItem>
                                    <MenuItem value="Order Inquiry">Order Inquiry</MenuItem>
                                </Select>

                            </div>
                        </div>
                        <div className="flex flex-row justify-between items-baseline p-0.5 mb-3">
                            <p className="font-semibold w-[50%]">Ticket Priority</p>
                            <div className="w-[50%]">
                                <Select
                                    value={ ticketPriority}
                                    onChange={(e)=>{setTicketPriority(e.target.value)}}
                                    sx={{
                                        height: '32px',

                                    }}
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>

                            </div>
                        </div>
                        <div className="px-2 mx-auto">
                            <p className="font-semibold">Issue Description</p>
                            <textarea className="block w-full p-2 pr-3 borderblock px-4 py-2.5 mt-2  bg-white rounded-md
                                    focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 
                                    sm:text-sm transition duration-150 ease-in-out border-2" placeholder="Enter Detailed Description"  value={description} onChange={(e)=>{setdescription(e.target.value)}} id="desc" rows="4" cols="50"></textarea>
                            
                            <div className="flex justify-end space-x-4 mt-4">
                                <div className="flex">
                                    <button onClick={handleTicketCreation} className="py-1 px-4 rounded inline-flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent">
                                    <span>Create Ticket</span>
                                    </button>
                                </div>
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

