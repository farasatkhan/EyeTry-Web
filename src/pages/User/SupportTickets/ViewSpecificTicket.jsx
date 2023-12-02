import React from "react";
import { Link } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { getDataFromLocalStorage } from "../../../utils/LocalStorage";
import { useParams,useNavigate } from 'react-router-dom';

import { getSupportTicketById } from "../../../services/SupportTickets/supportTickets";

import { createChat } from "../../../services/Chat/chat";

export default function ViewSpecificTicket() {
    const { ticketId } = useParams();

    const [ticketStatus, setTicketStatus] = React.useState('');

    const userId = localStorage.getItem('userID')

    const handleAttributeChange = (event) => {
        setTicketStatus(event.target.value);
    };

    const navigate = useNavigate();
    const [supportTicket, setSupportTicket] = React.useState({
        customerName: '',
        dateIssued: '',
        type: '',
        priority: '',
        description: '',
        orderNumber: '',
        status: '',
    });

    const [message, setMessage] = React.useState('');
    const fetchSupportTicket = async () => {
        try {
            const data = await getSupportTicketById(ticketId);
            setSupportTicket(data);
            console.log("Ticket",data)
        } catch (error) {
            console.error('Error fetching support ticket: ', error);
        }
    };


    React.useEffect(() => {
        fetchSupportTicket();
        
    }, [ticketId]);

    const Row = ({ heading, content }) => {
        return (
            <div className="flex flex-row justify-between items-baseline p-0.5 my-1 ">
                <p className="font-semibold w-[50%] ">{heading}</p>
                <p className="  w-[50%] text-left overflow-hidden">{content}</p>
            </div>
        )
    }

    const handleLiveChat =async () =>{
        try{
            if (supportTicket.supportAgentResponses.length === 0){
                alert("No agent has responded yet")
                return
            }
            const agentID = supportTicket?.supportAgentResponses[0]?.agentId;
            console.log("Agent ID",agentID)
            const data = {
                "senderId": userId, 
                "receiverId": agentID
            }
            const res = await createChat(data)
            if (res.status === 200){
                navigate('/chat')
            }
        }
        catch(e){
            if(e.response.status === 400 && e.response.data.message === "Chat already exists"){
                alert("Chat already exists")
                navigate('/chat')
            }
        }

    }

    return (
        <div className="flex flex-col h-screen">
            <div className="w-[90%] md:w-[70%] lg:w-[50%] mx-auto  ">
                <div className=" bg-white border border-gray-200 rounded-lg shadow  mt-10  mx-auto mb-10">
                    <div className="flex flex-row mt-3">
                        <h4 className="ml-5  text-xl font-semibold tracking-tight text-gray-900 font-sans">Support Ticket Details</h4>
                    </div>
                    <hr className="border-3 border-gray-300 my-4" />
                    <div className="p-5 text-base ">
                        <Row heading="Customer Name" content={supportTicket.customerName} />
                        <Row heading="Ticket Type" content={supportTicket.type} />
                        <Row heading="Ticket Priority" content={supportTicket.priority} />
                        <Row heading="Order Number" content={supportTicket?.orderNumber || "Not Provided"} />
                        <div className="flex flex-row justify-between items-baseline p-0.5 ">
                            <p className="font-semibold w-[50%]">Status</p>
                            <div className="w-[50%]">
                                <Select
                                    value={ticketStatus || supportTicket?.status || 'Open'}
                                    onChange={handleAttributeChange}
                                    sx={{
                                        height: '32px',

                                    }}
                                >
                                    <MenuItem value="In Progress">In Progress</MenuItem>
                                    <MenuItem value="Closed">Closed</MenuItem>
                                    <MenuItem value="Open">Open</MenuItem>
                                </Select>

                            </div>
                        </div>
                        <p className="font-semibold py-1">Issue Description :</p>
                        <p className="overflow-hidden shadow rounded p-4 my-1 ">{supportTicket?.description || "Not Provided "} </p>
                        <div className="p-0.5 mx-auto my-2   ">
                            <p className="font-semibold py-1">Support Agent Responses</p>
                            {
                                supportTicket?.supportAgentResponses?.map((response) => {
                                    return (<p className="p-1 border-l-2 shadow rounded border-slate-700 hover:scale-105 transform transition-transform duration-300 ease-in-out   m-1 my-2"><span className="  text-zinc-500 ">{(response.dateTime + '').split('T')[0]}</span><br />{response.message}</p>)
                                })
                            }
                        </div>
                    </div>
                </div>

                <div className="md:ml-auto md:text-right text-center mb-10">
                    <button type="button" onClick={handleLiveChat} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4
                             focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700
                              dark:focus:ring-red-900">Live Chat</button>
                    <Link >
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4
                         focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700
                          dark:focus:ring-gray-700 dark:border-gray-700">Mark as Resolved</button></Link>
                </div>
            </div>
        </div>
    );
}

