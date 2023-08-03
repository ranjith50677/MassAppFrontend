/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { CiCircleRemove } from "react-icons/ci";
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
import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { getgroupchatId, groupchatCreate } from "../../api service/api";

import { toast } from "react-toastify";

const animatedComponents = makeAnimated();
export default function GroupChat({
  data,
  basicModal,
  setBasicModal,
  reload,
  setReload,
  action,
  chatId,
  id,
}) {
  const [selectuser, setselectuser] = useState([]);
  // const [editselectuser, setEditselectuser] = useState([]);
  const [users, setUsers] = useState([]);
  const [editUsers, setEditUsers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const groupCreate = async () => {
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
    let arr=[]
    let res = await getgroupchatId(chatId);
    res?.data?.users?.map((i) => {
      if(i?._id !== id) { 
        arr.push(i)
    }
  })
  setEditUsers(arr)
  };

  // const remove=()=>{

  // }

console.log(editUsers);

  useEffect(() => {
    getChat()
    adduser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectuser]);


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
                  {editUsers?.map((i)=>(
                    <div>
                    <MDBRow>
                     <MDBCol size="md">
                    <Box>
                      <div
                        style={{
                          maxWidth: "75%",
                          width: "fit-content",
                          minWidth: "fit-content",
                          background: "#13b1d799",
                          padding: "10px",
                          wordBreak: "break-word",
                          marginBottom: "10px",
                          borderRadius: "5px",
                        }}
                        >
                        <div style={{ display: "flex",alignItems: "center"}}>
                         <Avatar src={i?.profilePicture}/>
                         <Typography>{i?.username}</Typography>
                        <CiCircleRemove />
                        </div>
                      </div>
                    </Box>
                    </MDBCol>
                   </MDBRow>
                  </div>
                  )
                 )}
                </>
              )}
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    </div>
  );
}
