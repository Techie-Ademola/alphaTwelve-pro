import React, { useState, useMemo, useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ColorModeIconDropdown from '.././theme/ColorModeIconDropdown';
import bus from "../bus";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

// import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import styled from "styled-components";

// const mainListItems = [
//   { text: 'Home', icon: <i className="bi bi-house-door" /> },
//   { text: 'Events', icon: <i className="bi bi-calendar-c" /> },
//   { text: 'Speakers', icon: <PeopleRoundedIcon /> },
//   { text: 'Reports', icon: <AssignmentRoundedIcon /> },
//   { text: 'Notifications', icon: <AssignmentRoundedIcon /> },
//   { text: 'Messages', icon: <AssignmentRoundedIcon /> },
//   { text: 'Settings', icon: <AssignmentRoundedIcon /> },
//   { text: 'Collapse', icon: <AssignmentRoundedIcon /> },
//   { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
// ];

const notifications = [
  {
    message: 'Hi AlphaTwelve Team, this is Techiescript version of the proposed test code'
  },
  {
    message: 'Hi AlphaTwelve Team, this is Techiescript version of the proposed test code'
  },
  {
    message: 'Hi AlphaTwelve Team, this is Techiescript version of the proposed test code'
  },
];

const mainListItems = [
  {
    text: 'Home',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.62516 16.0419H14.3752C15.2956 16.0419 16.0418 15.2957 16.0418 14.3752V8.12519L10.0002 3.95853L3.9585 8.12519V14.3752C3.9585 15.2957 4.70469 16.0419 5.62516 16.0419Z" stroke="#8576FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.12465 13.1244C8.12465 12.2039 8.87085 11.4577 9.79132 11.4577H10.208C11.1285 11.4577 11.8747 12.2039 11.8747 13.1244V16.0411H8.12465V13.1244Z" stroke="#8576FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.62516 16.0419H14.3752C15.2956 16.0419 16.0418 15.2957 16.0418 14.3752V8.12519L10.0002 3.95853L3.9585 8.12519V14.3752C3.9585 15.2957 4.70469 16.0419 5.62516 16.0419Z" stroke="#FCF7FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M8.12465 13.1244C8.12465 12.2039 8.87085 11.4577 9.79132 11.4577H10.208C11.1285 11.4577 11.8747 12.2039 11.8747 13.1244V16.0411H8.12465V13.1244Z" stroke="#FCF7FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  },
  {
    text: 'Events',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66666 10C1.66666 6.85751 1.66666 5.28584 2.64332 4.31001C3.61999 3.33418 5.19082 3.33334 8.33332 3.33334H11.6667C14.8092 3.33334 16.3808 3.33334 17.3567 4.31001C18.3325 5.28668 18.3333 6.85751 18.3333 10V11.6667C18.3333 14.8092 18.3333 16.3808 17.3567 17.3567C16.38 18.3325 14.8092 18.3333 11.6667 18.3333H8.33332C5.19082 18.3333 3.61916 18.3333 2.64332 17.3567C1.66749 16.38 1.66666 14.8092 1.66666 11.6667V10Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M5.83331 3.33334V2.08334M14.1666 3.33334V2.08334M2.08331 7.50001H17.9166" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
      <path d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 11.0543 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z" fill="#ADA9BB" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.66666 10C1.66666 6.85751 1.66666 5.28584 2.64332 4.31001C3.61999 3.33418 5.19082 3.33334 8.33332 3.33334H11.6667C14.8092 3.33334 16.3808 3.33334 17.3567 4.31001C18.3325 5.28668 18.3333 6.85751 18.3333 10V11.6667C18.3333 14.8092 18.3333 16.3808 17.3567 17.3567C16.38 18.3325 14.8092 18.3333 11.6667 18.3333H8.33332C5.19082 18.3333 3.61916 18.3333 2.64332 17.3567C1.66749 16.38 1.66666 14.8092 1.66666 11.6667V10Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M5.83331 3.33334V2.08334M14.1666 3.33334V2.08334M2.08331 7.50001H17.9166" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
      <path d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 11.0543 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z" fill="#ADA9BB" />
    </svg>,
  },
  {
    text: 'Speakers',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33333 8.33332C10.1743 8.33332 11.6667 6.84094 11.6667 4.99999C11.6667 3.15904 10.1743 1.66666 8.33333 1.66666C6.49238 1.66666 5 3.15904 5 4.99999C5 6.84094 6.49238 8.33332 8.33333 8.33332Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M8.33333 17.5C11.555 17.5 14.1667 16.0076 14.1667 14.1666C14.1667 12.3257 11.555 10.8333 8.33333 10.8333C5.11167 10.8333 2.5 12.3257 2.5 14.1666C2.5 16.0076 5.11167 17.5 8.33333 17.5Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M15.8333 1.66666C15.8333 1.66666 17.5 2.66666 17.5 4.99999C17.5 7.33332 15.8333 8.33332 15.8333 8.33332M14.1667 3.33332C14.1667 3.33332 15 3.83332 15 4.99999C15 6.16666 14.1667 6.66666 14.1667 6.66666" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33333 8.33332C10.1743 8.33332 11.6667 6.84094 11.6667 4.99999C11.6667 3.15904 10.1743 1.66666 8.33333 1.66666C6.49238 1.66666 5 3.15904 5 4.99999C5 6.84094 6.49238 8.33332 8.33333 8.33332Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M8.33333 17.5C11.555 17.5 14.1667 16.0076 14.1667 14.1666C14.1667 12.3257 11.555 10.8333 8.33333 10.8333C5.11167 10.8333 2.5 12.3257 2.5 14.1666C2.5 16.0076 5.11167 17.5 8.33333 17.5Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M15.8333 1.66666C15.8333 1.66666 17.5 2.66666 17.5 4.99999C17.5 7.33332 15.8333 8.33332 15.8333 8.33332M14.1667 3.33332C14.1667 3.33332 15 3.83332 15 4.99999C15 6.16666 14.1667 6.66666 14.1667 6.66666" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
    </svg>,
  },
  {
    text: 'Reports',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 8.33332C2.5 5.19082 2.5 3.61916 3.47667 2.64332C4.45333 1.66749 6.02417 1.66666 9.16667 1.66666H10.8333C13.9758 1.66666 15.5475 1.66666 16.5233 2.64332C17.4992 3.61999 17.5 5.19082 17.5 8.33332V11.6667C17.5 14.8092 17.5 16.3808 16.5233 17.3567C15.5467 18.3325 13.9758 18.3333 10.8333 18.3333H9.16667C6.02417 18.3333 4.4525 18.3333 3.47667 17.3567C2.50083 16.38 2.5 14.8092 2.5 11.6667V8.33332Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M6.66666 8.33331H13.3333M6.66666 11.6666H10.8333" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 8.33332C2.5 5.19082 2.5 3.61916 3.47667 2.64332C4.45333 1.66749 6.02417 1.66666 9.16667 1.66666H10.8333C13.9758 1.66666 15.5475 1.66666 16.5233 2.64332C17.4992 3.61999 17.5 5.19082 17.5 8.33332V11.6667C17.5 14.8092 17.5 16.3808 16.5233 17.3567C15.5467 18.3325 13.9758 18.3333 10.8333 18.3333H9.16667C6.02417 18.3333 4.4525 18.3333 3.47667 17.3567C2.50083 16.38 2.5 14.8092 2.5 11.6667V8.33332Z" stroke="#ADA9BB" stroke-width="1.5" />
      <path d="M6.66666 8.33331H13.3333M6.66666 11.6666H10.8333" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" />
    </svg>,
  },
  {
    text: 'Notifications',
    badgeCount: notifications.length,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.50001 13.9583C7.50001 13.9583 7.50001 16.0417 10 16.0417C12.5 16.0417 12.5 13.9583 12.5 13.9583M14.375 8.33333V9.99999L16.0417 13.5417H3.95834L5.62501 9.99999V8.33333C5.62501 5.91708 7.58376 3.95833 10 3.95833C12.4163 3.95833 14.375 5.91708 14.375 8.33333Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.50001 13.9583C7.50001 13.9583 7.50001 16.0417 10 16.0417C12.5 16.0417 12.5 13.9583 12.5 13.9583M14.375 8.33333V9.99999L16.0417 13.5417H3.95834L5.62501 9.99999V8.33333C5.62501 5.91708 7.58376 3.95833 10 3.95833C12.4163 3.95833 14.375 5.91708 14.375 8.33333Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
  },
  {
    text: 'Messages',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1894 8.74999C15.7127 9.39269 16.0274 10.2565 16.0274 11.3584C16.0274 12.3885 15.7524 13.2105 15.2889 13.8383C15.1208 14.0661 15.1562 14.5969 15.2906 14.8461C15.6121 15.4424 15.0046 16.0958 14.3443 15.9444C13.85 15.8311 13.3315 15.6778 12.8778 15.4722C12.7117 15.3969 12.5283 15.3665 12.3471 15.387C12.1219 15.4125 11.8922 15.425 11.6595 15.425C10.5797 15.425 9.56229 15.1538 8.78151 14.5833M12.6942 8.02502C12.6942 10.8296 10.6554 12.0917 8.32624 12.0917C8.09357 12.0917 7.86379 12.0791 7.63865 12.0536C7.45742 12.0331 7.27401 12.0635 7.10789 12.1388C6.65418 12.3445 6.13573 12.4978 5.64146 12.6111C4.98113 12.7625 4.37362 12.109 4.69515 11.5127C4.82951 11.2636 4.86493 10.7327 4.69681 10.505C4.23336 9.87717 3.95831 9.05515 3.95831 8.02502C3.95831 5.22041 5.99709 3.95833 8.32624 3.95833C10.6554 3.95833 12.6942 5.22041 12.6942 8.02502Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1894 8.74999C15.7127 9.39269 16.0274 10.2565 16.0274 11.3584C16.0274 12.3885 15.7524 13.2105 15.2889 13.8383C15.1208 14.0661 15.1562 14.5969 15.2906 14.8461C15.6121 15.4424 15.0046 16.0958 14.3443 15.9444C13.85 15.8311 13.3315 15.6778 12.8778 15.4722C12.7117 15.3969 12.5283 15.3665 12.3471 15.387C12.1219 15.4125 11.8922 15.425 11.6595 15.425C10.5797 15.425 9.56229 15.1538 8.78151 14.5833M12.6942 8.02502C12.6942 10.8296 10.6554 12.0917 8.32624 12.0917C8.09357 12.0917 7.86379 12.0791 7.63865 12.0536C7.45742 12.0331 7.27401 12.0635 7.10789 12.1388C6.65418 12.3445 6.13573 12.4978 5.64146 12.6111C4.98113 12.7625 4.37362 12.109 4.69515 11.5127C4.82951 11.2636 4.86493 10.7327 4.69681 10.505C4.23336 9.87717 3.95831 9.05515 3.95831 8.02502C3.95831 5.22041 5.99709 3.95833 8.32624 3.95833C10.6554 3.95833 12.6942 5.22041 12.6942 8.02502Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
  },
  {
    text: 'Settings',
    badgeCount: null,
    icon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.68432 12.4689L5.60165 12.6126C6.27883 12.7186 6.76243 13.3388 6.71256 14.0376L6.64498 14.9847C6.62529 15.2606 6.77228 15.5203 7.01572 15.6405L7.6942 15.9748C7.93765 16.0949 8.22833 16.05 8.42715 15.8627L9.10892 15.2183C9.61155 14.7431 10.3872 14.7431 10.8904 15.2183L11.5722 15.8627C11.771 16.0506 12.0611 16.0949 12.3052 15.9748L12.985 15.6398C13.2277 15.5203 13.3741 15.2613 13.3544 14.986L13.2868 14.0376C13.2369 13.3388 13.7205 12.7186 14.3977 12.6126L15.315 12.4689C15.5821 12.4273 15.7973 12.2226 15.8577 11.9527L16.025 11.2023C16.0854 10.9325 15.9784 10.6526 15.7553 10.4968L14.9896 9.96051C14.4246 9.56448 14.252 8.79122 14.5932 8.18375L15.0559 7.36082C15.1904 7.12119 15.1681 6.82115 14.9994 6.60501L14.5303 6.00291C14.3616 5.78677 14.0808 5.6975 13.8222 5.77872L12.9351 6.05661C12.2796 6.26201 11.5807 5.91766 11.3288 5.2659L10.9889 4.38456C10.8891 4.12681 10.6457 3.95766 10.3747 3.95833L9.62271 3.96034C9.35171 3.96102 9.10892 4.13151 9.0105 4.38993L8.67913 5.2612C8.42978 5.91699 7.72767 6.26402 7.07018 6.05728L6.14628 5.76731C5.88709 5.68542 5.60494 5.77536 5.4363 5.99284L4.97041 6.59561C4.80178 6.81376 4.78143 7.11448 4.91857 7.35411L5.39168 8.17905C5.74011 8.78719 5.5695 9.56784 5.00125 9.96588L4.24468 10.4962C4.02158 10.6526 3.91462 10.9325 3.97499 11.2016L4.14232 11.9521C4.20203 12.2226 4.41726 12.4273 4.68432 12.4689Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.3259 8.6741C12.058 9.40625 12.058 10.5937 11.3259 11.3259C10.5938 12.058 9.40627 12.058 8.67412 11.3259C7.94197 10.5937 7.94197 9.40625 8.67412 8.6741C9.40627 7.94196 10.5938 7.94196 11.3259 8.6741Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    activeIcon: <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.68432 12.4689L5.60165 12.6126C6.27883 12.7186 6.76243 13.3388 6.71256 14.0376L6.64498 14.9847C6.62529 15.2606 6.77228 15.5203 7.01572 15.6405L7.6942 15.9748C7.93765 16.0949 8.22833 16.05 8.42715 15.8627L9.10892 15.2183C9.61155 14.7431 10.3872 14.7431 10.8904 15.2183L11.5722 15.8627C11.771 16.0506 12.0611 16.0949 12.3052 15.9748L12.985 15.6398C13.2277 15.5203 13.3741 15.2613 13.3544 14.986L13.2868 14.0376C13.2369 13.3388 13.7205 12.7186 14.3977 12.6126L15.315 12.4689C15.5821 12.4273 15.7973 12.2226 15.8577 11.9527L16.025 11.2023C16.0854 10.9325 15.9784 10.6526 15.7553 10.4968L14.9896 9.96051C14.4246 9.56448 14.252 8.79122 14.5932 8.18375L15.0559 7.36082C15.1904 7.12119 15.1681 6.82115 14.9994 6.60501L14.5303 6.00291C14.3616 5.78677 14.0808 5.6975 13.8222 5.77872L12.9351 6.05661C12.2796 6.26201 11.5807 5.91766 11.3288 5.2659L10.9889 4.38456C10.8891 4.12681 10.6457 3.95766 10.3747 3.95833L9.62271 3.96034C9.35171 3.96102 9.10892 4.13151 9.0105 4.38993L8.67913 5.2612C8.42978 5.91699 7.72767 6.26402 7.07018 6.05728L6.14628 5.76731C5.88709 5.68542 5.60494 5.77536 5.4363 5.99284L4.97041 6.59561C4.80178 6.81376 4.78143 7.11448 4.91857 7.35411L5.39168 8.17905C5.74011 8.78719 5.5695 9.56784 5.00125 9.96588L4.24468 10.4962C4.02158 10.6526 3.91462 10.9325 3.97499 11.2016L4.14232 11.9521C4.20203 12.2226 4.41726 12.4273 4.68432 12.4689Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.3259 8.6741C12.058 9.40625 12.058 10.5937 11.3259 11.3259C10.5938 12.058 9.40627 12.058 8.67412 11.3259C7.94197 10.5937 7.94197 9.40625 8.67412 8.6741C9.40627 7.94196 10.5938 7.94196 11.3259 8.6741Z" stroke="#ADA9BB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
  },
  // { text: 'Collapse', icon: <AssignmentRoundedIcon /> },
  // { text: 'Tasks', icon: <AssignmentRoundedIcon /> },
];

const secondaryListItems = [
  { text: 'Settings', icon: <SettingsRoundedIcon /> },
  { text: 'About', icon: <InfoRoundedIcon /> },
  { text: 'Feedback', icon: <HelpRoundedIcon /> },
];

const StyledWrapper = styled.div`
  /* To hide the checkbox */
#checkboxInput {
  display: none;
}

.toggleSwitch {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 22px;
  height: 15px;
  background-color: rgb(82, 82, 82);
  border-radius: 20px;
  cursor: pointer;
  transition-duration: .2s;
  transform: translateY(4px)
}

.toggleSwitch::after {
  content: "";
  position: absolute;
  height: 10px;
  width: 10px;
  left: 3px;
  background-color: transparent;
  border-radius: 50%;
  transition-duration: .2s;
  box-shadow: 5px 2px 7px rgba(8, 8, 8, 0.26);
  border: 5px solid white;
}

#checkboxInput:checked+.toggleSwitch::after {
  transform: translateX(65%);
  transition-duration: .2s;
  background-color: white;
}
/* Switch background change */
#checkboxInput:checked+.toggleSwitch {
  background-color: rgb(148, 118, 255);
  transition-duration: .2s;
}

`;



export default function MenuContent() {
  const [IsCollapsed, setIsCollapsed] = useState(false);
  const [mui_mode, setMuiMode] = useState(localStorage.getItem("mui-mode"));
  const [modeStatus, setModeStatus] = useState('');

  let is_collapsed = localStorage.getItem("is_collapsed");
  const parsedIsCollapsed = is_collapsed ? JSON.parse(is_collapsed) : false;

  const handleToggleCollapse = () => {
    console.log('IsCollapsed:', IsCollapsed);

    if (IsCollapsed && IsCollapsed === true) {
      setIsCollapsed(false);
      localStorage.setItem("is_collapsed", JSON.stringify(false));
      bus.emit("notify_collapse", 'false');
    } else {
      setIsCollapsed(true);
      localStorage.setItem("is_collapsed", JSON.stringify(true));
      bus.emit("notify_collapse", 'true');
    }
  }

  useEffect(() => {
    console.log('mui_mode', mui_mode);
    if (mui_mode)
      setModeStatus(mui_mode);

    if (parsedIsCollapsed !== null) {
      console.log('parsedIsCollapsed:', parsedIsCollapsed);
      setIsCollapsed(parsedIsCollapsed);
    }
  }, []);


  useEffect(() => {
    bus.on("emit_mode_status", (val) => {
      console.log('val:', val);

      if (val !== null && (val === 'light' || val === 'dark')) {
        setModeStatus(val);
      }
    });
  }, []);



  return (
    <Stack className='sidebar_wrap' sx={{ flexGrow: 1, py: 1, px: !IsCollapsed ? 1 : 0, justifyContent: 'space-between' }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block', mb: 0.5, }}>
            <ListItemButton selected={index === 0} >
              {!IsCollapsed ?
                <span></span> :
                <ListItemText primary={`a`} style={{ opacity: '0', width: '0px', padding: '5px 0' }} />
              }
              <ListItemIcon style={{ transform: 'scale(1.1)', marginLeft: `${!IsCollapsed ? '0px' : '5px'}` }}>{(modeStatus === 'light') ? item.icon : item.activeIcon}</ListItemIcon>
              <ListItemText primary={item.text} style={{ padding: '5px 0', opacity: `${IsCollapsed ? '0' : '1'}` }} />
              {/* {!IsCollapsed ?
                //  :
                // <ListItemText primary={`a`} style={{ opacity: '0', width: '0px', padding: '5px 1px' }} />
              } */}
              {item.badgeCount &&
              <span className="notification_badge" style={{transform: `${!IsCollapsed ? 'translate(0, 0)' : 'translate(-20px, -10px)'}`}}>{item.badgeCount}</span>
              }
            </ListItemButton>
          </ListItem>
        ))}

        <ListItem disablePadding sx={{ display: 'block', mb: 0.5 }} className="collapse_navitem">
          <ListItemButton onClick={handleToggleCollapse}>
            {!IsCollapsed ?
              <span></span> :
              <ListItemText primary={`a`} style={{ opacity: '0', width: '0px', padding: '5px 0' }} />
            }
            {!IsCollapsed ?
              <ListItemIcon style={{ transform: 'scale(1.4)' }}>
                <KeyboardDoubleArrowLeftIcon />
              </ListItemIcon>
              :
              <ListItemIcon style={{ transform: 'scale(1.4)' }}>
                <KeyboardDoubleArrowRightIcon />
              </ListItemIcon>
            }

            {!IsCollapsed ?
              <ListItemText style={{ padding: '5px 0' }} primary={`${IsCollapsed ? 'Expand' : 'Collapse'}`} /> :
              <ListItemText primary={`a`} style={{ opacity: '0', width: '0px', padding: '5px 1px' }} />
            }
          </ListItemButton>
        </ListItem>

        <ColorModeIconDropdown iscollapsed={IsCollapsed} />

        {/* <ListItem disablePadding sx={{ display: 'block' }}>
          <div className="d-flex align-items-center pl-1">
            <StyledWrapper>
              <>
                <input type="checkbox" id="checkboxInput" />
                <label htmlFor="checkboxInput" className="toggleSwitch"></label>
              </>
            </StyledWrapper>
          <ListItemText primary={'Dark mode'} sx={{mx: 1}} />
          </div>
        </ListItem> */}

        <Stack
          direction="row"
          sx={{
            py: 2,
            gap: 1,
            mt: 2,
            alignItems: 'center',
            borderTop: '1px solid',
            borderColor: 'divider',
            cursor: 'pointer',
          }}
        >
          {/* <Avatar
            sizes="small"
            alt="Rudra Devi"
            src="/static/images/avatar/7.jpg"
            sx={{ width: 36, height: 36 }}
          /> */}
          <div style={{
            width: '34px',
            minWidth: '34px',
            height: '34px',
            minHeight: '34px',
            marginLeft: `${!IsCollapsed ? '0px' : '15px'}`,
            cursor: 'pointer',
          }}>
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_5744_3362)">
              <rect x="1" y="1" width="32" height="32" rx="16" fill={`${modeStatus === 'light' ? '#F3F4F6' : '#111'}`} />
              <mask id="mask0_5744_3362" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="1" y="1" width="32" height="32">
                <circle cx="17" cy="17" r="16" fill="#F1F5F9" />
              </mask>
              <g mask="url(#mask0_5744_3362)">
                <path d="M33 28.992V33.0013H1V29.0066C2.86127 26.5192 5.27721 24.5004 8.05572 23.1107C10.8342 21.721 13.8987 20.9987 17.0053 21.0013C23.544 21.0013 29.352 24.14 33 28.992ZM22.336 13C22.336 14.4144 21.7741 15.771 20.7739 16.7712C19.7737 17.7714 18.4172 18.3333 17.0027 18.3333C15.5882 18.3333 14.2316 17.7714 13.2314 16.7712C12.2312 15.771 11.6693 14.4144 11.6693 13C11.6693 11.5855 12.2312 10.2289 13.2314 9.22872C14.2316 8.22853 15.5882 7.66663 17.0027 7.66663C18.4172 7.66663 19.7737 8.22853 20.7739 9.22872C21.7741 10.2289 22.336 11.5855 22.336 13Z" fill="#CBD5E1" />
              </g>
            </g>
            <rect x="0.5" y="0.5" width="33" height="33" rx="16.5" stroke="#E2E8F0" />
            <defs>
              <clipPath id="clip0_5744_3362">
                <rect x="1" y="1" width="32" height="32" rx="16" fill="white" />
              </clipPath>
            </defs>
          </svg>
          </div>

          {!IsCollapsed ?
          <Box sx={{ mr: 'auto' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: '16px' }}>
              Rudra Devi
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              rudra.devi@gmail.com
            </Typography>
          </Box> : <span></span>
}
          {/* <OptionsMenu /> */}
        </Stack>

      </List>

      {/* <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <ListItemButton>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Stack>
  );
}
