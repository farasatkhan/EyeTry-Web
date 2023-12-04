import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../../services/User/user";
import { API_PUBLIC_DIR_URL } from "../../../config/config";
import defaultProfilePic from '../../../assets/images/UserProfiling/profile_default.jfif'

const Conversation = ({ data, currentUser, online }) => {

  const [userData, setUserData] = useState(null) // Receiver of message


  useEffect(()=> {

    /*
    Getting id of the other user in chat , this user is the one whom current 
    logged in user is chatting to ... 
    */
    const userId = data.members.find((id)=>id!==currentUser) 

    const getUserData = async ()=> {
      try
      {
        const res =await getUser(userId)
         setUserData(res)
      }
      catch(error)
      {
        console.log(error)
      }
    }

    getUserData();
  }, [])
  return (
    <>
      <div className="follower conversation sm:p-0.5 md:p-2">
        <div className="justify-center">
          {online && <div className="online-dot"></div>}
          <img
            src={userData?.profilePicture? API_PUBLIC_DIR_URL + userData.profilePicture : defaultProfilePic }
            alt="Profile"
            style={{width: '2.5rem', height: '2.5rem'}}
            className="max-w-12  max-h-12 rounded-full "
          />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstName} {userData?.lastName}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr className="mt-1" style={{ width: "100%", border: "0.1px solid #ececec", }} />
    </>
  );
};

export default Conversation;
