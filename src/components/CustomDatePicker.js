import React, { useState } from "react";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function ButtonField(props) {
  const {
    setOpen,
    label,
    onChange, // Parent's onChange handler
    id,
    disabled,
    InputProps = {},
    inputProps = {},
  } = props;

  const { ref } = InputProps;
  const { "aria-label": ariaLabel } = inputProps;

  // Prevents the span's click from triggering the date picker open/close
  const handleClearClick = (e) => {
    // Debugging: log the event to ensure it's being passed
    // console.log('Event:', e);
    if (e && e.stopPropagation) {
      e.stopPropagation(); // Prevents the button's onClick from firing
    }
    onChange(null); // Clear the date
  };

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={ref}
      aria-label={ariaLabel}
      size="small"
      onClick={() => setOpen?.((prev) => !prev)} // Toggle DatePicker
      startIcon={<CalendarTodayRoundedIcon fontSize="small" />}
      sx={{ minWidth: "fit-content" }}
      className="date_filterbutton"
    >
      {label ? label : "Date"}

      {/* Clear Button */}
      {label ? (
        <span
          className="px-2"
          onClick={() => onChange(null)} // Clear the date
          disabled={!label} // Disable if no date selected
          style={{transform: 'translateX(12px)', fontSize: '18px'}}
        >
          &times;
        </span>
      ) : (
        <svg
          className="drop_svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.1667 7.16666L8 9.5L5.83334 7.16666"
            stroke="#334155"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </Button>
  );
}

export default function CustomDatePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        label={value == null ? null : value.format("MMM DD, YYYY")}
        onChange={(newValue) => onChange(newValue)} // Trigger the parent's onChange handler
        slots={{ field: ButtonField }}
        slotProps={{
          field: { setOpen, onChange }, // Pass onChange to ButtonField
          nextIconButton: { size: "small" },
          previousIconButton: { size: "small" },
        }}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        views={["day", "month", "year"]}
        clearable="true"
        clearText="Clear"
        className="date_filterbutton date"
      />
    </LocalizationProvider>
  );
}
