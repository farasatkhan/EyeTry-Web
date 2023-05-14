import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/ui/navbar";
import Footer from "../components/ui/Footer";
import Sidebar from "../components/ui/Sidebar";
import { FaBookOpen } from "react-icons/fa";



export default function Home() {
  return (
<div className="flex flex-col min-h-screen">
  {/* <Sidebar/> */}
  {/* <Navbar /> */}
  <h2>Home</h2>
  <Link to="/signin">Sign In</Link>
  <div className="flex-grow"></div> 

</div>


  );
}

