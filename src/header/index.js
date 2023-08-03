import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon
} from 'mdb-react-ui-kit';
import Profile from './profile'

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IconButton } from '@mui/material';
import routes from '../rotue';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/joy';
import {BsFillChatDotsFill} from "react-icons/bs";
function TemporaryDrawer() {
  let navigate = useNavigate()
  console.log(routes);
  const [state, setState] = useState({
    left: true,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "300px" ,marginTop:"30%"}}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List >
          <IconButton >
          </IconButton>
        {routes.map((i, index) => (
          <>
          <ListItem>
            <ListItemButton onClick={()=>{navigate(i.path)}}>
              <ListItemIcon style={{fontSize:"31px"}} >
               <div style={{color:'white'}}>{i?.icon}</div>
              </ListItemIcon>
              <Typography style={{fontSize:"20px",fontWeight:500,color:'white'}}>{i?.name}</Typography>
            </ListItemButton>
          </ListItem>
          <Divider style={{backgroundColor:'white'}}/>
          </>
          ))}
      </List>
    </Box>
  );

  return (
    <div style={{backgroundColor:"black"}} 
    >
      {['left'].map((anchor,index) => (
        <React.Fragment key={index}  >
          <Drawer
           PaperProps={{
            sx: {
              backgroundColor: "#48494b"
            }
          }}
          style={{zIndex:0}}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  let navigate = useNavigate()
  return (
    <div className="shadow-2-strong" style={{position:'sticky',top:0,height:"70px",zIndex:74}}>
    <MDBNavbar expand='lg' light bgColor='#48494b' style={{backgroundColor:'#48494b'}}>
       <MDBContainer fluid>
       <MDBIcon icon='bars' fas style={{color:'black',cursor:'pointer'}} size='2x' onClick={() => setOpen(!open)} />
        <MDBNavbarBrand><h1 style={{ fontFamily: "serif", color: "white" ,marginTop:'10px' }}>Mass Media</h1></MDBNavbarBrand>
        <div style={{display:'flex',alignItems:"center"}}>
        <BsFillChatDotsFill style={{color:'white',fontSize: "35px",cursor:"pointer"}} onClick={()=>navigate('/chat')}/>    
        <Profile/>    
        </div>
      </MDBContainer>
    </MDBNavbar>
       {open ? <TemporaryDrawer style={{backgroundColor:"#48494b"}}/>:null}
    </div>
  );
}

