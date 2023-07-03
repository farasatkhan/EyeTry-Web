import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
<div className="flex flex-col min-h-screen">
  <h2>Home</h2>
  <Link to="/signin">Sign In</Link>
  <div className="flex-grow"></div> 
 
</div>


  );
}

