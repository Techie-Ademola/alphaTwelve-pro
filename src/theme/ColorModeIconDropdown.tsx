import React, { useState, useMemo, useEffect } from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useColorScheme } from '@mui/material/styles';
import styled from "styled-components";
import ListItemButton from '@mui/material/ListItemButton';
import bus from "../bus";

// Custom styled switch component
const StyledWrapper = styled.div`
  /* Hide the checkbox input */
  #checkboxInput {
    display: none;
  }

  /* Styling for the switch */
  .toggleSwitch {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 22px;
    height: 15px;
    background-color: rgba(226, 232, 240, 1);
    border-radius: 20px;
    cursor: pointer;
    transition-duration: 0.2s;
    transform: translateY(4px);
  }

  .toggleSwitch::after {
    content: '';
    position: absolute;
    height: 10px;
    width: 10px;
    left: 3px;
    background-color: transparent;
    border-radius: 50%;
    transition-duration: 0.2s;
    box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
    border: 5px solid white;
  }

  /* Move the circle and change background when checked */
  #checkboxInput:checked + .toggleSwitch::after {
    transform: translateX(65%);
    transition-duration: 0.2s;
    background-color: white !important;
  }

  /* Change background color when switch is checked */
  #checkboxInput:checked + .toggleSwitch {
    background-color: rgba(133, 118, 255, 1) !important;
    transition-duration: 0.2s;
  }
`;

interface ColorModeSwitchProps {
  iscollapsed: boolean;
}

export default function ColorModeSwitch({ iscollapsed }: ColorModeSwitchProps) {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null; // or return a loading state
  }

  const handleChange = () => {
    setMode(mode === 'dark' ? 'light' : 'dark'); // Toggle between light and dark mode
    bus.emit("emit_mode_status", mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block', cursor: 'pointer', px: 0 }} onClick={handleChange} className="mode_toggler">
        <ListItemButton sx={{ px: 0, mx: 0 }}>
          <div className="" style={{ padding: '7px 6px', display: 'flex', alignItems: 'center' }}>
            {!iscollapsed ? (
              <span></span>
            ) : (
              <ListItemText primary={`a`} className="no_show" style={{ opacity: '0', width: '0px', padding: '0px 5px' }} />
            )}

            <StyledWrapper
                style={{
                  transform: 'translateY(1px)',
                }}>
              <input
                type="checkbox"
                id="checkboxInput"
                className="checkboxInput"
                checked={mode === 'dark' || mode === 'system'}
                value={mode}
                onChange={handleChange}
              />
              <label htmlFor="checkboxInput" className="toggleSwitch"></label>
            </StyledWrapper>

            {!iscollapsed ? (
              <ListItemText primary={`${mode === 'dark' || mode === 'system' ? 'Dark' : 'Light'} mode`} sx={{ mx: 1 }} />
            ) : (
              <ListItemText primary={`a`} className="no_show" style={{ opacity: '0', width: '0px', padding: '0px 1px' }} />
            )}
          </div>
        </ListItemButton>
      </ListItem>
    </>
  );
}



// import * as React from 'react';
// import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
// import LightModeIcon from '@mui/icons-material/LightModeOutlined';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import { useColorScheme } from '@mui/material/styles';

// export default function ColorModeIconDropdown() {
//   const { mode, systemMode, setMode } = useColorScheme();
//   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };
//   const handleMode = (targetMode: 'system' | 'light' | 'dark') => () => {
//     setMode(targetMode);
//     handleClose();
//   };
//   if (!mode) {
//     return (
//       <Box
//         data-screenshot="toggle-mode"
//         sx={(theme) => ({
//           verticalAlign: 'bottom',
//           display: 'inline-flex',
//           width: '2.25rem',
//           height: '2.25rem',
//           borderRadius: theme.shape.borderRadius,
//           border: '1px solid',
//           borderColor: theme.palette.divider,
//         })}
//       />
//     );
//   }
//   const resolvedMode = (systemMode || mode) as 'light' | 'dark';
//   const icon = {
//     light: <LightModeIcon />,
//     dark: <DarkModeIcon />,
//   }[resolvedMode];
//   return (
//     <React.Fragment>
//       <IconButton
//         data-screenshot="toggle-mode"
//         onClick={handleClick}
//         disableRipple
//         size="small"
//         aria-controls={open ? 'color-scheme-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//       >
//         {icon}
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         id="account-menu"
//         open={open}
//         onClose={handleClose}
//         onClick={handleClose}
//         slotProps={{
//           paper: {
//             variant: 'outlined',
//             sx: {
//               my: '4px',
//             },
//           },
//         }}
//         transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//         anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//       >
//         <MenuItem selected={mode === 'system'} onClick={handleMode('system')}>
//           System
//         </MenuItem>
//         <MenuItem selected={mode === 'light'} onClick={handleMode('light')}>
//           Light
//         </MenuItem>
//         <MenuItem selected={mode === 'dark'} onClick={handleMode('dark')}>
//           Dark
//         </MenuItem>
//       </Menu>
//     </React.Fragment>
//   );
// }
