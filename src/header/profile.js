import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import { profile } from '../api service/api';
import { useNavigate } from 'react-router-dom';

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [pic, setPic] = React.useState(null);
  const [logout, setLogout] = React.useState(false);
  const nav=useNavigate()

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handle= () => {
    localStorage.removeItem('token')
    setLogout(!logout)
    nav('/')
    setAnchorEl(null);
  };

const Profile=async()=>{
let res=await profile()
setPic(res?.data?.data?.profilePicture); 
}
React.useEffect(()=>{
  Profile()
},[])
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
         <Avatar src={pic}></Avatar>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>nav("/MyAccount")}>My account</MenuItem>
        <MenuItem onClick={handle}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
