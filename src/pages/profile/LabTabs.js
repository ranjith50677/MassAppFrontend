/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
// import Allvideos from '../video';
import { useEffect } from 'react';
import { UserVideos } from '../../api service/api';
import RowAndColumnSpacing from './myvideo';


export default function LabTabs({pronalid}) {
  const [value, setValue] =useState('1');
  const [data1,setData1]=useState([])
  const [account,setAccount]=useState(false)
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

 
  useEffect(()=>{
    const handel=async()=>{
      let respos = await UserVideos();
      setData1(respos?.data?.videos)
      setAccount(!account)
    }
    handel()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="list of vidoe" value="1" style={{backgroundColor:"#afafaf33"}} />
          </TabList>
        </Box>
        <TabPanel value="1"><RowAndColumnSpacing prosnalid={pronalid}  /></TabPanel>
      </TabContext>
    </Box>
  );
}