import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {IoArrowBackCircle} from "react-icons/io5";
import MyAccount from "../../pages/profile/myAccount";
const Parsonal=({profiledata,open,setOpen})=>{
const[profileid,setProfileid]=useState("")
useEffect(()=>{
    setProfileid(profiledata?.postedBy)
},[])
    return(
       <>
       <div style={{marginTop:"30px"}}>
        <IoArrowBackCircle style={{fontSize:"50px",cursor:"pointer"}} onClick={()=>setOpen(!open)}/>
       </div>
      <MyAccount prosanalid={profileid}  />
       </>
    )
}

export default Parsonal;