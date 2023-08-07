/* eslint-disable array-callback-return */
import React, { Fragment, useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CiCircleRemove } from "react-icons/ci";
import { GrAddCircle } from "react-icons/gr";
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import {
  addGroupUser,
  getgroupchatId,
  groupchatCreate,
  removeGroupUser,
} from "../../api service/api";

import { toast } from "react-toastify";

const animatedComponents = makeAnimated();
export default function GroupChat({
  data,
  allData,
  basicModal,
  setBasicModal,
  reload,
  setReload,
  action,
  chatId,
  id,
}) {
  const [selectuser, setselectuser] = useState([]);
  const [demo, setDemo] = useState([
    {
      username:"demo",
      profilePicture:"https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?pid=ImgDet&rs=1"
    }
  ]);
  const [demo1, setDemo1] = useState([
    {
      username:"demo1",
      profilePicture:"https://th.bing.com/th/id/OIP.bpJTixcJ9eRwEFjKsApJ8QHaEo?pid=ImgDet&rs=1"
    }
  ]);
  const [add,setAdd] = useState([]);
  const [users, setUsers] = useState([])
  const [reloadData, setReloadData] = useState(false)
  const [editUsers, setEditUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const groupCreate = async () => {
    if(groupName==="") return toast.error("please enter GroupName")
      let res = await groupchatCreate({ groupName, users });
      if (res?.ok) {
        toast.success(res.data.message);
        setBasicModal(!basicModal);
        setReload(!reload);
      }
      if (!res?.ok) return toast.error(res.data.message);
  };

  const adduser = () => {
    let array = [];
    selectuser.map((i) => {
      array.push(i.id);
    });
    setUsers(array);
  };

  const getChat = async () => {
    let arr = [];
    let filterdata=[]
    let res = await getgroupchatId(chatId);
    res?.data?.map((i) => {
      i.users.map((j) => {
        if (j?._id !== id) return arr.push(j);
      });
    })   
    setEditUsers(arr);
    allData?.map((item)=>{
      let found=arr.some(j => item._id == j._id)
      if(!found && item._id !== id){
        filterdata.push(item)
      }
    })
    setAdd(filterdata);
    // setAdd(filterdata)
  };

  
  const remove = async (i) => {
    let res = await removeGroupUser(chatId, {
      userId: i._id,
    });
    if (res.ok){
      toast.success(res.data.message)
      setReload(!reload)
      setReloadData(!reloadData)
    }
  };
  
  const adduserdata=async(i)=>{
   let response=await addGroupUser(chatId,{
    userId:i._id
   })
   console.log(response)
  }

  const demohandel=(i,index)=>{
    console.log(index)
  let a=[...editUsers,i]
  add.splice(index,1)
  setEditUsers(a)
  }
  const removedemohandel=(i,index)=>{
  let a=[...add,i]
  editUsers.splice(index,1)
  setAdd(a)
  }

  useEffect(() => {
    getChat();
    adduser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectuser,reloadData]);

  return (
    <div style={{ width: "100%" }}>
      <>
        <MDBModal show={basicModal} setShow={setBasicModal} tabIndex="-1">
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>GroupChat Create</MDBModalTitle>
              </MDBModalHeader>
              {action === "new" ? (
                <>
                  <MDBModalBody>
                    <div style={{ position: "inherit", zIndex: 50 }}>
                      <Select
                        closeMenuOnSelect={false}
                        components={animatedComponents}
                        isMulti
                        options={data}
                        onChange={setselectuser}
                      />
                    </div>
                    <TextField
                      id="outlined-basic"
                      label="GroupName"
                      variant="outlined"
                      style={{ width: "100%", marginTop: "10px" }}
                      onChange={(e) => setGroupName(e.target.value)}
                    />
                  </MDBModalBody>
                  <MDBModalFooter>
                    <Button variant="contained" onClick={groupCreate}>
                      submit
                    </Button>
                  </MDBModalFooter>
                </>
              ) : (
                <>
              
                  <MDBModalTitle>Remove User</MDBModalTitle>
                  <hr
                    style={{
                      margin: 0,
                      backgroundColor: "#1c1414",
                      width: "125px",
                      marginBottom: "10px",
                    }}
                  />
                  <MDBRow>
                    {editUsers?.map((i, index) => (
                      <Fragment key={index}>
                        <MDBCol size="md">
                          <Box style={{cursor:"pointer"}} onClick={()=>removedemohandel(i,index)}>
                            <div
                              style={{
                                maxWidth: "75%",
                                width: "fit-content",
                                minWidth: "fit-content",
                                background: "#13b1d799",
                                padding: "10px",
                                wordBreak: "break-word",
                                marginBottom: "1px",
                                borderRadius: "40px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={i?.profilePicture} />
                                <Typography>{i?.username}</Typography>
                                <CiCircleRemove
                                  style={{ cursor: "pointer" }}
                                  onClick={() => remove(i)}
                                />
                              </div>
                            </div>
                          </Box>
                          <br />
                        </MDBCol>
                      </Fragment>
                    ))}
                   
                  </MDBRow>
                  <Card variant="outlined">
                      <Divider />
                     <div>
                     <MDBModalTitle>ADD User</MDBModalTitle>
                     <Button variant="contained"><GrAddCircle /></Button>
                      </div> 
                      <hr
                        style={{
                          margin: 0,
                          backgroundColor: "#1c1414",
                          width: "95px",
                          marginBottom: "10px",
                        }}
                      />
                      <MDBRow>
                       
                        {add?.map((i,index)=> 
                         <Fragment key={index}>
                        <MDBCol size="md">
                          <Box style={{ cursor: "pointer" }} onClick={()=>demohandel(i,index)}>
                            <div
                              style={{
                                maxWidth: "75%",
                                width: "fit-content",
                                minWidth: "fit-content",
                                background: "#13b1d799",
                                padding: "10px",
                                wordBreak: "break-word",
                                marginBottom: "1px",
                                borderRadius: "40px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar src={i?.profilePicture}/>
                                <Typography>{i?.username}</Typography>
                                <GrAddCircle />
                              </div>
                            </div>
                          </Box>
                        </MDBCol>
                        </Fragment>)}
                      </MDBRow>
                      <br />
                 
                  </Card>
                </>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
