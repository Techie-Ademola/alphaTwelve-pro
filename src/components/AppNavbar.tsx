import React, { useState, useMemo, useEffect } from "react";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MuiToolbar from '@mui/material/Toolbar';
import { tabsClasses } from '@mui/material/Tabs';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import SideMenuMobile from './SideMenuMobile';
import MenuButton from './MenuButton';
import Applogo from "../theme/assets/event-logo.png";
import bus from "../bus";

const Toolbar = styled(MuiToolbar)({
  width: '100%',
  padding: '12px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  gap: '12px',
  flexShrink: 0,
  [`& ${tabsClasses.flexContainer}`]: {
    gap: '8px',
    p: '8px',
    pb: 0,
  },
});

export default function AppNavbar() {
  const [open, setOpen] = React.useState(false);
  const [IsCollapsed, setIsCollapsed] = useState(false);
  const [mui_mode, setMuiMode] = useState(localStorage.getItem("mui-mode"));
  const [modeStatus, setModeStatus] = useState('');

  let is_collapsed = localStorage.getItem("is_collapsed");
  const parsedIsCollapsed = is_collapsed ? JSON.parse(is_collapsed) : false;

  const handleToggleCollapse = () => {
    // console.log('IsCollapsed:', IsCollapsed);

    if (IsCollapsed && IsCollapsed === true) {
    } else {
      setIsCollapsed(true);
      localStorage.setItem("is_collapsed", JSON.stringify(true));
      bus.emit("notify_collapse", 'true');
    }
  }

  useEffect(() => {
    // console.log('mui_mode', mui_mode);
    if (mui_mode)
      setModeStatus(mui_mode);

    if (parsedIsCollapsed !== null) {
      // console.log('parsedIsCollapsed:', parsedIsCollapsed);
      setIsCollapsed(parsedIsCollapsed);
    }
  }, []);

  const toggleDrawer = (newOpen: boolean) => () => {
    setIsCollapsed(false);
    localStorage.setItem("is_collapsed", JSON.stringify(false));
    bus.emit("notify_collapse", 'false');

    setOpen(newOpen);
  };

  useEffect(() => {
    bus.on("emit_mode_status", (val) => {

      if (val !== null) {
        setOpen(false);
      }
    });
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        display: { xs: 'auto', md: 'none' },
        boxShadow: 0,
        bgcolor: 'background.paper',
        backgroundImage: 'none',
        borderBottom: '1px solid',
        borderColor: 'divider',
        top: 'var(--template-frame-height, 0px)',
      }}
    >
      <Toolbar variant="regular">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexGrow: 1,
            width: '100%',
          }}
        >
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
            {/* <CustomIcon />
            <Typography variant="h4" component="h1" sx={{ color: 'text.primary' }}>
              Dashboard
            </Typography> */}
            <img
              src={`${Applogo}`}
              alt="App Logo"
              width={`${100}`}
              style={{
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Stack>
          <MenuButton aria-label="menu" onClick={toggleDrawer(true)}>
            {/* <MenuRoundedIcon /> */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 7H7M20 7H11M20 17H17M4 17H13M4 12H20" stroke="#64748B" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </MenuButton>

          <SideMenuMobile open={open} toggleDrawer={toggleDrawer} />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export function CustomIcon() {
  return (
    <Box
      sx={{
        width: '1.5rem',
        height: '1.5rem',
        bgcolor: 'black',
        borderRadius: '999px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundImage:
          'linear-gradient(135deg, hsl(210, 98%, 60%) 0%, hsl(210, 100%, 35%) 100%)',
        color: 'hsla(210, 100%, 95%, 0.9)',
        border: '1px solid',
        borderColor: 'hsl(210, 100%, 55%)',
        boxShadow: 'inset 0 2px 5px rgba(255, 255, 255, 0.3)',
      }}
    >
      <DashboardRoundedIcon color="inherit" sx={{ fontSize: '1rem' }} />
    </Box>
  );
}
