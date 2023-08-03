/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
import IconButton1 from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ReactPlayer from "react-player";
import { FcLike } from "react-icons/fc";
import CommentBankIcon from "@mui/icons-material/CommentBank";
import Box from "@mui/joy/Box";
// import Button from "@mui/joy/Button";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Textarea from "@mui/joy/Textarea";
// import IconButton from "@mui/joy/IconButton";
// import ListItemDecorator from "@mui/joy/ListItemDecorator";
// import FormatItalic from "@mui/icons-material/FormatItalic";
// import EmojiPicker, { EmojiStyle } from "emoji-picker-react";
// import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import "../Home/style.scss";
import { useEffect } from "react";
import {
  // Comment,
  DeleteVideo,
  UserByIdVideos,
  UserVideos,
  likes,
  profile,
  unlikes,
} from "../../api service/api";
import { Fragment } from "react";
import ShowMoreText from "react-show-more-text";
import moment from "moment/moment";
import { Menu, MenuItem } from "@mui/material";
import { toast } from "react-toastify";
import CommentModal from "../../components/model";



export default function RecipeReviewCard({prosnalid}) {
  // const [italic, setItalic] = useState(false);
  const [comment, setComment] = useState(false);
  const [allvideo, setAllvideo] = useState([]);
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(false);
  // const [fontWeight, setFontWeight] = useState("normal");
  const [text, setText] = useState("");
  const [zIndex, setZIndex] = useState(0);
  const [show, setShow] = useState({ like: false, id: 0 });
  // const [emoji, setEmoji] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);


  const showlike = async (i, index) => {
    console.log("hi");
    if (show.like === false && !i.likes.includes(id)) {
      console.log("uu");
      setShow({ like: true, id: i._id });
    }
    setTimeout(() => {
      setShow({ like: false, id: i._id });
    }, 1000);

    if (!i.likes.includes(id)) {
      let res = await likes(i._id);
      console.log(res);
      setRefresh(!refresh);
    }
    if (i.likes.includes(id)) {
      let response = await unlikes(i._id);
      console.log(response);
      setRefresh(!refresh);
    }
  };

  const viewcommentbox = (index) => {
    setZIndex(index);
    setComment(!comment);
  };

  const handle = async () => {
    try {
      let respos = await UserVideos();
      console.log(respos);
      let res= await UserByIdVideos(prosnalid)
      console.log(res);
     // eslint-disable-next-line no-lone-blocks
     {prosnalid ===undefined ? setAllvideo(respos?.data?.videos) : setAllvideo(res?.data?.videos)}
      let response = await profile();
      setId(response?.data?.data?._id);
    } catch (error) {
      console.log(error.message);
    }
  };
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletevideo = async (i) => {
    let res = await DeleteVideo(i._id);
    if (!res.ok) return toast.error("deleted fail");
    if (res?.ok) {
      toast.success("deleted sucess");
      setRefresh(!refresh)
      setAnchorEl(null);
    }
  };
  useEffect(() => {
    handle()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[id,refresh]);
console.log(text);
  return (
    <div style={{ backgroundColor: "gray" }}>
      <Box sx={{ flexGrow: 1 }}>
        <br/>
        <h1 style={{ fontFamily: "serif", color: "white", marginTop: "10px",  fontWeight: "bold",fontSize: "57px" }}>
          My Videos
        </h1>
        <Grid
          container
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 2, sm: 6, md: 8 }}
        >
          <>
            {allvideo?.map((i, index) => {
              return (
                <Grid xs={2} md={4} mt={4} style={{ marginBottom: "0px" }} key={index}>
                  <Fragment >
                  {comment && index === zIndex ? <CommentModal comment={comment} setComment={setComment} i={i} userId={id}  index={index}  zIndex={zIndex} setZIndex={setZIndex} setRefresh={setRefresh}  refresh={refresh} 
                  /> : null}
                    <Card
                      sx={{
                        maxWidth: 1065,
                        backgroundColor: "#2d3f4f",
                        marginTop: "20px",
                        marginLeft: "20px",
                      }}
                    >
                      <CardHeader
                        action={
                          <>
                            <IconButton1
                              aria-label="settings"
                              id="basic-button"
                              aria-controls={open ? "basic-menu" : undefined}
                              aria-haspopup="true"
                              aria-expanded={open ? "true" : undefined}
                              onClick={handleClick}
                            >
                              <MoreVertIcon />
                            </IconButton1>
                            {prosnalid===undefined ? <Menu
                              id="basic-menu"
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              MenuListProps={{
                                "aria-labelledby": "basic-button",
                              }}
                            >
                              <MenuItem onClick={() => deletevideo(i)}>
                                Delete
                              </MenuItem>
                            </Menu>:null}
                          </>
                        }
                        style={{ color: "white", fontFamily: "serif" }}
                      />
                      <CardMedia style={{ backgroundColor: "black",width:"100%" }}>
                        <div
                          style={{
                            alignItems: "center",
                            height: "400px",
                            position: "relative",
                            display: "flex",
                            alignItem: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "serif",
                              color: "red",
                              fontSize: "70px",
                              position: "absolute",
                              zIndex: 2,
                              top: "163px",
                            }}
                          >
                            {show.like === true &&
                            i.likes[index] !== id &&
                            show.id === i._id ? (
                              <FcLike
                                style={{
                                  display: "flex",
                                  alignSelf: "center",
                                  justifyContent: "center",
                                }}
                              />
                            ) : null}
                          </div>
                          <ReactPlayer
                            url={i.videoUrl}
                            controls={true}
                          />
                        </div>
                      </CardMedia>
                      <Typography
                        style={{
                          fontFamily: "serif",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          fontSize: "x-large",
                          margin: "6px",
                          marginLeft: "70px",
                        }}
                      >
                        Title:{i.title}
                      </Typography>
                      <Typography
                        style={{
                          fontFamily: "serif",
                          color: "white",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          fontSize: "large",
                          margin: "6px",
                          marginLeft: "70px",
                        }}
                      >
                        {moment(i.createdAt).format("MMMM Do YYYY")}
                      </Typography>
                      <CardContent>
                        <Box
                          style={{
                            backgroundColor: "rgb(5 30 53)",
                            color: "white",
                            borderRadius: "10px",
                            maxWidth: "1000px",
                            padding: "10px",
                          }}
                        >
                          <h1
                            style={{
                              fontFamily: "serif",
                              fontSize: "25px",
                              flexDirection: "column",
                              alignItems: "flex-start",
                              paddingLeft: "30px",
                              display: "flex",
                            }}
                          >
                            Description :
                          </h1>
                          <ShowMoreText
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              lines={1}
                              more="Show More"
                              less="Show Less"
                              className="content-css"
                              anchorClass="show-more-less-clickable"
                              expanded={false}
                              width={259}
                              truncatedEndingComponent={"... "}
                            >
                            <Typography>
                             {i.description} 
                            </Typography>
                            </ShowMoreText>
                        </Box>
                        <br />
                      </CardContent>
                      <Typography
                        sx={{ ml: 2, backgroundColor: "black", height: "4px" }}
                        color="text.secondary"
                        display="block"
                        variant="caption"
                      ></Typography>
                      <CardActions disableSpacing>
                        <div></div>
                        <div
                          className="button-container-1"
                          style={{ marginTop: "10px", marginLeft: "11px" }}
                        >
                          <>
                            {i.likes.map((item,index) => {
                              if (item === id) {
                                return (
                                  <span
                                    className="mas"
                                    style={{ marginTop: "10px" }}
                                    key={index}
                                  >
                                    <FavoriteIcon
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-5px",
                                        color: "red",
                                      }}
                                    />
                                  </span>
                                );
                              } else {
                                return (
                                  <span
                                    className="mas"
                                    style={{ marginTop: "10px" }}
                                    key={index}
                                  >
                                    <FavoriteIcon
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        marginTop: "-5px",
                                        color: "white",
                                      }}
                                    />
                                  </span>
                                );
                              }
                            })}
                            <span className="mas" style={{ marginTop: "10px" }}>
                              {i.likes?.includes(id) ? (
                                <FavoriteIcon
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                    color: "red",
                                  }}
                                />
                              ) : (
                                <FavoriteIcon
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                  }}
                                />
                              )}
                            </span>
                            <button
                              id="work"
                              type="button"
                              name="Hover"
                              onClick={() => showlike(i, index)}
                            >
                              {i.likes?.includes(id) ? (
                                <FavoriteIcon
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                    color: "red",
                                  }}
                                />
                              ) : (
                                <FavoriteIcon
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    marginTop: "-5px",
                                  }}
                                />
                              )}
                            </button>
                          </>
                        </div>
                        <div
                          className="button-container-2"
                          style={{ marginTop: "10px" }}
                        >
                          <span className="mas">COMMENT</span>
                          <button
                            type="button"
                            name="Hover"
                            onClick={() => viewcommentbox(index)}
                          >
                            <CommentBankIcon />
                          </button>
                        </div>
                      </CardActions>
                    </Card>
                    <br />
                    <br />
                  </Fragment>
                </Grid>
              );
            })}
          </>
        </Grid>
      </Box>
    </div>
  );
}
