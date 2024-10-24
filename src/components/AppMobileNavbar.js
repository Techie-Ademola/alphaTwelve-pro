import React, { useState, useMemo, useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Modal,
  Typography,
} from "@mui/material";
import bus from "../bus";

export default function CustomizedDataGrid() {
  const [mui_mode, setMuiMode] = useState(localStorage.getItem("mui-mode"));
  const [modeStatus, setModeStatus] = useState("");

  useEffect(() => {
    if (mui_mode) setModeStatus(mui_mode);
  }, []);

  useEffect(() => {
    bus.on("emit_mode_status", (val) => {

      if (val !== null && (val === "light" || val === "dark")) {
        setModeStatus(val);
      }
    });
  }, []);


  return (
    <>
      <div className="d-flex justify-content-between align-items-center bottom_navbar_wrapper">
        <div className="nav_items d-flex flex-column justify-content-center align-items-center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.8501 19.2502H17.3501C18.4547 19.2502 19.3501 18.3548 19.3501 17.2502V9.75025L12.1001 4.75024L4.8501 9.75025V17.2502C4.8501 18.3548 5.74553 19.2502 6.8501 19.2502Z"
              stroke="#8576FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.84949 15.7493C9.84949 14.6447 10.7449 13.7493 11.8495 13.7493H12.3495C13.4541 13.7493 14.3495 14.6447 14.3495 15.7493V19.2493H9.84949V15.7493Z"
              stroke="#8576FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Box
            sx={{ mb: 0, mt: 1, fontWeight: "400", fontSize: "13px" }}
            className=""
          >
            Home
          </Box>
        </div>

        <div className="nav_items d-flex flex-column justify-content-center align-items-center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.29993 12C2.29993 8.229 2.29993 6.343 3.47193 5.172C4.64393 4.001 6.52893 4 10.2999 4H14.2999C18.0709 4 19.9569 4 21.1279 5.172C22.2989 6.344 22.2999 8.229 22.2999 12V14C22.2999 17.771 22.2999 19.657 21.1279 20.828C19.9559 21.999 18.0709 22 14.2999 22H10.2999C6.52893 22 4.64293 22 3.47193 20.828C2.30093 19.656 2.29993 17.771 2.29993 14V12Z"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
            />
            <path
              d="M7.29993 4V2.5M17.2999 4V2.5M2.79993 9H21.7999"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M17.7999 17C17.7999 17.1326 17.7472 17.2598 17.6535 17.3536C17.5597 17.4473 17.4325 17.5 17.2999 17.5C17.1673 17.5 17.0401 17.4473 16.9464 17.3536C16.8526 17.2598 16.7999 17.1326 16.7999 17C16.7999 16.8674 16.8526 16.7402 16.9464 16.6464C17.0401 16.5527 17.1673 16.5 17.2999 16.5C17.4325 16.5 17.5597 16.5527 17.6535 16.6464C17.7472 16.7402 17.7999 16.8674 17.7999 17ZM17.7999 13C17.7999 13.1326 17.7472 13.2598 17.6535 13.3536C17.5597 13.4473 17.4325 13.5 17.2999 13.5C17.1673 13.5 17.0401 13.4473 16.9464 13.3536C16.8526 13.2598 16.7999 13.1326 16.7999 13C16.7999 12.8674 16.8526 12.7402 16.9464 12.6464C17.0401 12.5527 17.1673 12.5 17.2999 12.5C17.4325 12.5 17.5597 12.5527 17.6535 12.6464C17.7472 12.7402 17.7999 12.8674 17.7999 13ZM12.7999 17C12.7999 17.1326 12.7472 17.2598 12.6535 17.3536C12.5597 17.4473 12.4325 17.5 12.2999 17.5C12.1673 17.5 12.0401 17.4473 11.9464 17.3536C11.8526 17.2598 11.7999 17.1326 11.7999 17C11.7999 16.8674 11.8526 16.7402 11.9464 16.6464C12.0401 16.5527 12.1673 16.5 12.2999 16.5C12.4325 16.5 12.5597 16.5527 12.6535 16.6464C12.7472 16.7402 12.7999 16.8674 12.7999 17ZM12.7999 13C12.7999 13.1326 12.7472 13.2598 12.6535 13.3536C12.5597 13.4473 12.4325 13.5 12.2999 13.5C12.1673 13.5 12.0401 13.4473 11.9464 13.3536C11.8526 13.2598 11.7999 13.1326 11.7999 13C11.7999 12.8674 11.8526 12.7402 11.9464 12.6464C12.0401 12.5527 12.1673 12.5 12.2999 12.5C12.4325 12.5 12.5597 12.5527 12.6535 12.6464C12.7472 12.7402 12.7999 12.8674 12.7999 13ZM7.79993 17C7.79993 17.1326 7.74725 17.2598 7.65348 17.3536C7.55971 17.4473 7.43254 17.5 7.29993 17.5C7.16732 17.5 7.04014 17.4473 6.94637 17.3536C6.85261 17.2598 6.79993 17.1326 6.79993 17C6.79993 16.8674 6.85261 16.7402 6.94637 16.6464C7.04014 16.5527 7.16732 16.5 7.29993 16.5C7.43254 16.5 7.55971 16.5527 7.65348 16.6464C7.74725 16.7402 7.79993 16.8674 7.79993 17ZM7.79993 13C7.79993 13.1326 7.74725 13.2598 7.65348 13.3536C7.55971 13.4473 7.43253 13.5 7.29993 13.5C7.16732 13.5 7.04014 13.4473 6.94637 13.3536C6.85261 13.2598 6.79993 13.1326 6.79993 13C6.79993 12.8674 6.85261 12.7402 6.94637 12.6464C7.04014 12.5527 7.16732 12.5 7.29993 12.5C7.43253 12.5 7.55971 12.5527 7.65348 12.6464C7.74725 12.7402 7.79993 12.8674 7.79993 13Z"
              fill={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
            />
          </svg>

          <Box
            sx={{ mb: 0, mt: 1, fontWeight: "400", fontSize: "13px" }}
            className=""
          >
            Events
          </Box>
        </div>

        <div className="nav_items d-flex flex-column justify-content-center align-items-center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5 10C12.7091 10 14.5 8.20914 14.5 6C14.5 3.79086 12.7091 2 10.5 2C8.29086 2 6.5 3.79086 6.5 6C6.5 8.20914 8.29086 10 10.5 10Z"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
            />
            <path
              d="M10.5 21C14.366 21 17.5 19.2091 17.5 17C17.5 14.7909 14.366 13 10.5 13C6.63401 13 3.5 14.7909 3.5 17C3.5 19.2091 6.63401 21 10.5 21Z"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
            />
            <path
              d="M19.5 2C19.5 2 21.5 3.2 21.5 6C21.5 8.8 19.5 10 19.5 10M17.5 4C17.5 4 18.5 4.6 18.5 6C18.5 7.4 17.5 8 17.5 8"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <Box
            sx={{ mb: 0, mt: 1, fontWeight: "400", fontSize: "13px" }}
            className=""
          >
            Speakers
          </Box>
        </div>

        <div className="nav_items d-flex flex-column justify-content-center align-items-center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.69995 10C3.69995 6.229 3.69995 4.343 4.87195 3.172C6.04395 2.001 7.92895 2 11.7 2H13.7C17.471 2 19.357 2 20.528 3.172C21.699 4.344 21.7 6.229 21.7 10V14C21.7 17.771 21.7 19.657 20.528 20.828C19.356 21.999 17.471 22 13.7 22H11.7C7.92895 22 6.04295 22 4.87195 20.828C3.70095 19.656 3.69995 17.771 3.69995 14V10Z"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
            />
            <path
              d="M8.69995 10H16.7M8.69995 14H13.7"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <Box
            sx={{ mb: 0, mt: 1, fontWeight: "400", fontSize: "13px" }}
            className=""
          >
            Reports
          </Box>
        </div>

        <div className="nav_items d-flex flex-column justify-content-center align-items-center">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.09753 17C9.244 15.625 10.9699 14.75 12.9001 14.75C14.8303 14.75 16.5562 15.625 17.7026 17M20.15 12C20.15 16.0041 16.9041 19.25 12.9 19.25C8.89596 19.25 5.65002 16.0041 5.65002 12C5.65002 7.99594 8.89596 4.75 12.9 4.75C16.9041 4.75 20.15 7.99594 20.15 12ZM15.15 10C15.15 11.2426 14.1427 12.25 12.9 12.25C11.6574 12.25 10.65 11.2426 10.65 10C10.65 8.75736 11.6574 7.75 12.9 7.75C14.1427 7.75 15.15 8.75736 15.15 10Z"
              stroke={`${modeStatus === 'dark' ? '#FCF7FF' : 'rgba(72, 69, 84, 1)'}`}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <Box
            sx={{ mb: 0, mt: 1, fontWeight: "400", fontSize: "13px" }}
            className=""
          >
            Profile
          </Box>
        </div>
      </div>
    </>
  );
}
