import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';

import MenuButton from './MenuButton';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import Applogo from "../theme/assets/event-logo.png";

interface SideMenuMobileProps {
  open: boolean | undefined;
  toggleDrawer: (newOpen: boolean) => () => void;
}

export default function SideMenuMobile({ open, toggleDrawer }: SideMenuMobileProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          backgroundImage: 'none',
          backgroundColor: 'background.paper',
          width: '100%',
        },
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxWidth: '100%',
          height: '100%',
        }}
      >
        <Stack direction="row" sx={{ py: 2, pl: 2, pr: 1, pb: 0, gap: 1, justifyContent: 'space-between', alignItems: 'start', }}>
          <Stack
            direction="row"
            sx={{ gap: 1, justifyContent: 'start', alignItems: 'center',  px: 1, pb: 1 }}
          >

            <img
              src={`${Applogo}`}
              alt="App Logo"
              width={`${100}`}
              style={{
                display: 'block',
                margin: '0 auto'
              }}
            />
            {/* <Avatar
              sizes="small"
              alt="Rudra Devi"
              src="/static/images/avatar/7.jpg"
              sx={{ width: 24, height: 24 }}
            />
            <Typography component="p" variant="h6">
              Rudra Devi
            </Typography> */}
          </Stack>
          {/* <MenuButton showBadge>
            <NotificationsRoundedIcon />
          </MenuButton> */}
          <span className="btn" onClick={toggleDrawer(false)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" fill="white" />
              <rect x="0.5" y="0.5" width="23" height="23" rx="11.5" stroke="#E2E8F0" />
              <path d="M14.625 9.375L9.375 14.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.375 9.375L14.625 14.625" stroke="#334155" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
        </Stack>
        <Divider />
        <Stack sx={{ flexGrow: 1 }}>
          <MenuContent />
          <Divider />
        </Stack>
        {/* <CardAlert /> */}
        {/* <Stack sx={{ p: 2 }}>
          <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
            Logout
          </Button>
        </Stack> */}
      </Stack>
    </Drawer>
  );
}
