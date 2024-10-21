import React, { useState, useMemo, useEffect } from "react";
import MuiAvatar from '@mui/material/Avatar';
import MuiListItemAvatar from '@mui/material/ListItemAvatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListSubheader from '@mui/material/ListSubheader';
import Select, { SelectChangeEvent, selectClasses } from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import SmartphoneRoundedIcon from '@mui/icons-material/SmartphoneRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import Applogo from '../theme/assets/event-logo.png';
import ApplogoSmall from '../theme/assets/event-logo-small.png';
import bus from "../bus";

const Avatar = styled(MuiAvatar)(({ theme }) => ({
  width: 28,
  height: 28,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.divider}`,
}));

const ListItemAvatar = styled(MuiListItemAvatar)({
  minWidth: 0,
  marginRight: 12,
});

export default function SelectContent() {
  const [company, setCompany] = React.useState('');
  const [IsCollapsed, setIsCollapsed] = useState(false);
  let is_collapsed = localStorage.getItem("is_collapsed");
  const parsedIsCollapsed = is_collapsed ? JSON.parse(is_collapsed) : false;

  useEffect(() => {
    if (parsedIsCollapsed !== null) {
      console.log('parsedIsCollapsed:', parsedIsCollapsed);
      setIsCollapsed(parsedIsCollapsed);
    }

    bus.on("notify_collapse", (val) => {
      if (val) {
        console.log('setIsCollapsed val:', val);
        if (val === 'true') {
          setIsCollapsed(true);
        } 
        if (val === 'false') {
          setIsCollapsed(false);
        }
      }
    });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCompany(event.target.value as string);
  };

  return (
    <>
    <div className="w-100">
      {/* <img src={`https://www.kindpng.com/picc/m/192-1926933_events-logo-png-event-management-transparent-png.png`} alt="App Logo" className="d-block mx-auto" width="120" /> */}
      <img src={`${IsCollapsed ? ApplogoSmall : Applogo}`} alt="App Logo" className="d-block mx-auto" width={`${IsCollapsed ? 30 : 120}`} />
    </div>
    </>
    // <Select
    //   labelId="company-select"
    //   id="company-simple-select"
    //   value={company}
    //   onChange={handleChange}
    //   displayEmpty
    //   inputProps={{ 'aria-label': 'Select company' }}
    //   fullWidth
    //   sx={{
    //     maxHeight: 56,
    //     width: 215,
    //     '&.MuiList-root': {
    //       p: '8px',
    //     },
    //     [`& .${selectClasses.select}`]: {
    //       display: 'flex',
    //       alignItems: 'center',
    //       gap: '2px',
    //       pl: 1,
    //     },
    //   }}
    // >
    //   <ListSubheader sx={{ pt: 0 }}>Production</ListSubheader>
    //   <MenuItem value="">
    //     <ListItemAvatar>
    //       <Avatar alt="Sitemark web">
    //         <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Sitemark-web" secondary="Web app" />
    //   </MenuItem>
    //   <MenuItem value={10}>
    //     <ListItemAvatar>
    //       <Avatar alt="Sitemark App">
    //         <SmartphoneRoundedIcon sx={{ fontSize: '1rem' }} />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Sitemark-app" secondary="Mobile application" />
    //   </MenuItem>
    //   <MenuItem value={20}>
    //     <ListItemAvatar>
    //       <Avatar alt="Sitemark Store">
    //         <DevicesRoundedIcon sx={{ fontSize: '1rem' }} />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Sitemark-Store" secondary="Web app" />
    //   </MenuItem>
    //   <ListSubheader>Development</ListSubheader>
    //   <MenuItem value={30}>
    //     <ListItemAvatar>
    //       <Avatar alt="Sitemark Store">
    //         <ConstructionRoundedIcon sx={{ fontSize: '1rem' }} />
    //       </Avatar>
    //     </ListItemAvatar>
    //     <ListItemText primary="Sitemark-Admin" secondary="Web app" />
    //   </MenuItem>
    //   <Divider sx={{ mx: -1 }} />
    //   <MenuItem value={40}>
    //     <ListItemIcon>
    //       <AddRoundedIcon />
    //     </ListItemIcon>
    //     <ListItemText primary="Add product" secondary="Web app" />
    //   </MenuItem>
    // </Select>
  );
}
