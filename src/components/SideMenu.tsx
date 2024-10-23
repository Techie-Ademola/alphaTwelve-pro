import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import bus from "../bus";
import { alpha } from '@mui/material/styles';

const drawerWidth = 240;
const iconDrawerWidth = 80;

// Custom drawer styled with the iscollapsed prop
const Drawer = styled(MuiDrawer)<{ iscollapsed: boolean }>`
  width: ${(props) => (props.iscollapsed ? `${iconDrawerWidth}px` : `${drawerWidth}px`)};
  flex-shrink: 0;
  box-sizing: border-box;
  margin-top: 10px;
  transition: .2s ease;

  & .MuiDrawer-paper {
    width: ${(props) => (props.iscollapsed ? `${iconDrawerWidth}px` : `${drawerWidth}px`)};
    box-sizing: border-box;
  }
`;

export default function SideMenu() {
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


  return (
    <Drawer
      variant="permanent"
      iscollapsed={IsCollapsed} // Pass iscollapsed as a custom prop to the styled component
      sx={(theme) => ({
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: alpha(theme.palette.background.default, 1),
          // backgroundColor: 'background.paper',
        },
        // backgroundColor: theme.vars
        //   ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
        //   : alpha(theme.palette.background.default, 1),
        overflow: 'auto',
      })}
      className="sidebar_drawer"
    >
      <Box
        sx={{
          display: 'flex',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
        }}
      >
        <SelectContent />
      </Box>
      <Divider />
      <MenuContent />
      {/* <CardAlert />
      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Avatar
          sizes="small"
          alt="Rudra Devi"
          src="/static/images/avatar/7.jpg"
          sx={{ width: 36, height: 36 }}
        />
        <Box sx={{ mr: 'auto' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
            Rudra Devi
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            riley@email.com
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack> */}
    </Drawer>
  );
}
