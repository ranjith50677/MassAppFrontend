import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Avatar,
  // Divider,
  FormControl,
  FormLabel,
  // IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
// import { ListItemDecorator, Textarea } from "@mui/joy";
import { Textarea } from "@mui/joy";
import EmojiPicker from "emoji-picker-react";
import moment from "moment";
import { EmojiStyle } from "emoji-picker-react";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
// import { BeachAccess, FormatItalic, Image, Work } from "@mui/icons-material";
// import { Image } from "@mui/icons-material";
import { List } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import { Comment, deleteComment, editComment } from "../../api service/api";
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  minWidth: "280px",
  maxWidth: "700px",
  maxHeight: "75vh",
  minHeight: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CommentModal({
  setComment,
  comment,
  i,
  index,
  setRefresh,
  refresh,
  zIndex,
  userId
}) {
  const [text, setText] = useState("");
  const [edit,setEdit]=useState(false)
  const [editdata,setEditdata]=useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
  console.log(i);
console.log(refresh);
  const viewcommet = async (i) => {
    if (text === "") return toast.error("epmty comment");
    if (text !== "") {
      let res = await Comment(i._id,{ text });
      setRefresh(!refresh);
      setText("");
      if (res?.ok) {
        return toast.success("comment added")
      }
    }
  };

const removeCommment=async(i,j)=>{
  let res =await deleteComment(i?._id,{commentId:j?._id})
  console.log(res);
  setRefresh(!refresh);
  toast.success("delete sucessfully")
}

const Editcomment=async(i)=>{
  console.log(i);
  try {
    if (text === "") return toast.error("epmty comment");
    let res=await editComment(i?._id,editdata?._id,{text})
    setRefresh(!refresh); 
    setText("")
    if(res?.ok)return toast.success("sucessfully")
  } catch (error) {
    console.log(error.message);
  }
  console.log(!refresh);
}

  const onEmojiClick = (e) => {
    const sym = e.unified.split("_");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (text) {
      setText(text + emoji);
    } else {
      setText(emoji);
    }
  };
  const handleClose = () => setComment(false);
 
  return (
    <div>
      <Modal
        open={comment}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {i?.comments.length <= 0 ? <center><h1>NO COMMENTS</h1></center> : (
            <Box
              sx={{
                backgroundColor: "rgb(5 30 53)",
                color: "white",
                borderRadius: "14px",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: "15px",
                minHeight: "20vh",
                maxHeight: "50vh",
                overflow: "auto",
              }}
            >
              <Typography>COMMENTS :</Typography>
              {i?.comments?.map((j,index)=>(
                <List
                  key={index} 
                  style={{
                    width: "100%",
                    backgroundColor: "background.paper",
                  }}
                > 
                <ListItem sx={{ paddingTop: 0, paddingBottom: 0 }}>
                  <ListItemAvatar>
                    <Avatar src={j?.postedBy?.profilePicture}>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={<span style={{fontFamily: "serif"}}>{j?.postedBy?.username?.toUpperCase()}</span>}
                    secondary={
                      <div style={{display: "flex", justifyContent: "space-between"}}> 
                        <p
                          style={{
                            margin: 0,
                            wordBreak: "break-all",
                            color: "white",
                          }}
                        >
                        {j?.text}
                        <span style={{ color: "#5f6f7d" }}>({moment(i?.createdAt).format("MMMM Do YYYY")})</span>
                        </p>
                        <div>
                        {userId===j.postedBy?._id ? <FaEdit style={{color:"skyblue",cursor:"pointer",fontSize:"18px"}} onClick={()=>{ 
                          setEditdata(j) 
                          setText(j.text)
                          setEdit(true)
                          }}/>:null}
                        {userId===j?.postedBy?._id ? (<MdDeleteForever style={{color:"red",cursor:"pointer",fontSize:"20px"}} onClick={()=>removeCommment(i,j)}/>):null}
                        </div>
                      </div>
                    }
                  />
                </ListItem>
                <hr style={{ margin: 0, backgroundColor: "white" }} />
              </List>))}
            </Box>
          )}
          {comment && index === zIndex ? (
            <>
              <FormControl sx={{ width: "100%" }}>
                <FormLabel sx={{ color: "white" }}>Your comment</FormLabel>
                <Textarea
                  placeholder="Type something here…"
                  minRows={3}
                  maxRows={4}
                  onChange={(e) =>setText(e.target.value)}
                  value={text}
                  endDecorator={
                    <Box
                      sx={{
                        display: "flex",
                        gap: "var(--Textarea-paddingBlock)",
                        pt: "var(--Textarea-paddingBlock)",
                        borderTop: "1px solid",
                        borderColor: "divider",
                        flex: "auto",
                        justifyContent: "flex-end",
                      }}
                    >
                      <div>
                        <Tooltip title="Account settings">
                           <SentimentSatisfiedAltIcon style={{cursor:"pointer"}}  onClick={handleClick}/>
                        </Tooltip>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleClose1}
                          onClick={handleClose1}
                          style={{top:"-300px",left:"100px"}}
                        
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                        <EmojiPicker height={350} width={300} 
                        onEmojiClick={onEmojiClick}
                        autoFocusSearch={false}
                        emojiStyle={EmojiStyle.NATIVE}
                      />
                        </Menu>
                        <Button
                          sx={{ ml: "auto" }}
                          onClick={() => !edit ? viewcommet(i):Editcomment(i)}
                        >
                          Send
                        </Button>
                      </div>
                    </Box>
                  }

                />
              </FormControl>
            </>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
}
