import React, { useState, useMemo, useEffect } from "react";
import { DataGrid, GridToolbar, GridFilterModel } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { columns, rows as initialRows } from "../internals/data/gridData";
import { saveAs } from "file-saver";
import CustomDatePicker from "./CustomDatePicker";
import dayjs from "dayjs";
import bus from "../bus";

export default function CustomizedDataGrid() {
  const [searchText, setSearchText] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("");
  const [nameFilter, setNameFilter] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("desc");
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [mui_mode, setMuiMode] = useState(localStorage.getItem("mui-mode"));
  const [modeStatus, setModeStatus] = useState('');

  let is_collapsed = localStorage.getItem("is_collapsed");
  const parsedIsCollapsed = is_collapsed ? JSON.parse(is_collapsed) : false;


  useEffect(() => {
    console.log('mui_mode', mui_mode);
    if (mui_mode)
      setModeStatus(mui_mode);
  }, []);


  useEffect(() => {
    bus.on("emit_mode_status", (val) => {
      console.log('val:', val);

      if (val !== null && (val === 'light' || val === 'dark')) {
        setModeStatus(val);
      }
    });
  }, []);

  // Filtered Rows based on search, status, and date filters
  const filteredRows = initialRows.filter((row) => {
    const matchesSearch =
      row.eventName.toLowerCase().includes(searchText.toLowerCase()) ||
      row.speaker.toLowerCase().includes(searchText.toLowerCase()) ||
      row.date.includes(searchText);

    const matchesStatus =
      statusFilter && statusFilter !== "all"
        ? row.status === statusFilter
        : true;
    const matchesDate = dateFilter ? row.date === dateFilter : true; // Match date string

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Sorting rows based on date
  const sortedRows = [...filteredRows].sort((a, b) =>
    sortOrder === "desc"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Pagination logic
  const paginatedRows = sortedRows.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  // Handle status filter change
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  // Handle date filter change
  const handleDateChange = (event) => {
    setDateFilter(event.target.value);
  };

  // Handle sort order change
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Handle page change
  const handlePageChange = (_event, newPage) => {
    setCurrentPage(newPage - 1);
  };

  // Export to CSV functionality
  const handleExport = () => {
    const csvRows = [
      ["Event Name", "Date", "Speaker", "Status"],
      ...paginatedRows.map((row) => [
        row.eventName,
        row.date,
        row.speaker,
        row.status,
      ]),
    ];
    const csvContent = csvRows.map((e) => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Events History Table.csv");
  };

  return (
    <Box sx={{ height: "auto", width: "100%" }}>
      {/* Filters and Sorting Section */}
      <Box
        sx={{ justifyContent: "space-between", gap: 2, mb: 2 }}
        className="d-md-flex"
      >
        {/* Search Input */}
        <Box sx={{ alignItems: "center", gap: 1, mb: 2 }}
        className="d-md-flex"
        >
          <div className="position-relative search_input_wrap mb-2">
            <i className="bi bi-search"></i>
            <input
              placeholder="Search..."
              variant="outlined"
              size="small"
              value={searchText}
              onChange={handleSearchChange}
              className="rounded-0 search_input"
            />
          </div>

          {/* Date Filter */}
          {/* <TextField
          label="Date"
          variant="outlined"
          size="small"
          type="date"
          value={dateFilter}
          onChange={(event) => handleDateChange(event)}
          InputLabelProps={{
            shrink: true,
          }}
        /> */}

          {/* Date Filter */}
          {/* <CustomDatePicker /> */}
          <CustomDatePicker
            value={dateFilter ? dayjs(dateFilter) : null} // Convert string to Dayjs object
            onChange={(newValue) => {
              setDateFilter(newValue ? newValue.format("YYYY-MM-DD") : ""); // Format and update dateFilter state
            }}
          />

          {/* Status Filter */}
          <FormControl
            size="small"
            sx={{ minWidth: 120 }}
            className="status_Filter mx-2 mx-md-0"
          >
            {/* <InputLabel>Status</InputLabel> */}
            <Select
              value={statusFilter}
              label="Status"
              onChange={handleStatusChange}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
            </Select>
          </FormControl>
          {/* Display the number of results */}
          <Box sx={{ mb: 0, fontWeight: "500", fontSize: "14px" }} className="mt-3 mt-md-0">
            Displaying {paginatedRows.length} results
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {/* Sort Order */}
          <Box sx={{ mb: 0, fontSize: "14px" }}>Sort:</Box>
          <FormControl size="small" sx={{ minWidth: 120 }} >
            {/* <InputLabel>Sort By</InputLabel> */}
            <Select
              value={sortOrder}
              label="Sort By"
              onChange={handleSortChange}
            >
              <MenuItem value="desc">Most Recent</MenuItem>
              <MenuItem value="asc">Oldest</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            color="primary"
            className="rounded-0 px-0 fit-content d-none d-md-block"
            style={{ width: "fit-content" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4166 5.83333C10.4166 6.06345 10.2301 6.25 9.99998 6.25C9.76986 6.25 9.58331 6.06345 9.58331 5.83333C9.58331 5.60321 9.76986 5.41666 9.99998 5.41666C10.2301 5.41666 10.4166 5.60321 10.4166 5.83333Z"
                stroke={`${modeStatus === 'light' ? '#141414' : '#fff'}`}
              />
              <path
                d="M10.4166 10C10.4166 10.2301 10.2301 10.4167 9.99998 10.4167C9.76986 10.4167 9.58331 10.2301 9.58331 10C9.58331 9.76988 9.76986 9.58333 9.99998 9.58333C10.2301 9.58333 10.4166 9.76988 10.4166 10Z"
                stroke={`${modeStatus === 'light' ? '#141414' : '#fff'}`}
              />
              <path
                d="M10.4166 14.1667C10.4166 14.3968 10.2301 14.5833 9.99998 14.5833C9.76986 14.5833 9.58331 14.3968 9.58331 14.1667C9.58331 13.9365 9.76986 13.75 9.99998 13.75C10.2301 13.75 10.4166 13.9365 10.4166 14.1667Z"
                stroke={`${modeStatus === 'light' ? '#141414' : '#fff'}`}
              />
            </svg>
          </Button>

          <Button
            variant="outlined"
            color="primary"
            className="rounded-0"
            onClick={handleExport}
          >
            <svg
              className="mr-2"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.16663 9.83333V10.8333C3.16663 11.9379 4.06206 12.8333 5.16663 12.8333H10.8333C11.9379 12.8333 12.8333 11.9379 12.8333 10.8333V9.83333M7.99996 9.5V3.16666M7.99996 9.5L5.83329 7.16666M7.99996 9.5L10.1666 7.16666"
                stroke={`${modeStatus === 'light' ? '#141414' : '#fff'}`}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Export
          </Button>
        </Box>
      </Box>

      {/* DataGrid */}
      <div className="position-relative w-100" style={{overflowX: 'auto'}}>
        <DataGrid
          autoHeight
          // checkboxSelection
          rows={filteredRows}
          columns={columns}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "even" : "odd"
          }
          initialState={{
            pagination: { paginationModel: { page: currentPage, pageSize } },
          }}
          paginationModel={{ page: currentPage, pageSize }}
          onPaginationModelChange={(model) => {
            setCurrentPage(model.page);
            setPageSize(model.pageSize);
          }}
          // rowsPerPageOptions={[5, 10, 20, 50]}
          pageSizeOptions={[10, 20, 50]}
          disableColumnResize
          // density="compact"
          pagination
          style={{minWidth: '60em'}}
          // slotProps={{
          //   filterPanel: {
          //     filterFormProps: {
          //       logicOperatorInputProps: {
          //         variant: "outlined",
          //         size: "small",
          //       },
          //       columnInputProps: {
          //         variant: "outlined",
          //         size: "small",
          //         sx: { mt: "auto" },
          //       },
          //       operatorInputProps: {
          //         variant: "outlined",
          //         size: "small",
          //         sx: { mt: "auto" },
          //       },
          //       valueInputProps: {
          //         InputComponentProps: {
          //           variant: "outlined",
          //           size: "small",
          //         },
          //       },
          //     },
          //   },
          // }}
        />

        {/* Pagination Controls */}
        <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "center",
            bottom: "13px",
            left: "18px",
          }}
          className="position-absolute"
        >
          {[...Array(Math.ceil(filteredRows.length / pageSize))].map((_, i) => (
            <Button
              key={i}
              variant={i === currentPage ? "contained" : "outlined"}
              onClick={(event) => handlePageChange(event, i + 1)}
              sx={{ mx: 0.4, px: 2, }}
              style={{
                paddingTop: '5px',
                paddingBottom: '5px',
                minWidth: "fit-content",
                height: "auto",
              }}
            >
              {i + 1}
            </Button>
          ))}
        </Box>
      </div>
    </Box>
  );
}


// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { columns, rows } from '../internals/data/gridData';

// export default function CustomizedDataGrid() {
//   return (
//     <DataGrid
//       autoHeight
//       checkboxSelection
//       rows={rows}
//       columns={columns}
//       getRowClassName={(params) =>
//         params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
//       }
//       initialState={{
//         pagination: { paginationModel: { pageSize: 20 } },
//       }}
//       pageSizeOptions={[10, 20, 50]}
//       disableColumnResize
//       density="compact"
//       slotProps={{
//         filterPanel: {
//           filterFormProps: {
//             logicOperatorInputProps: {
//               variant: 'outlined',
//               size: 'small',
//             },
//             columnInputProps: {
//               variant: 'outlined',
//               size: 'small',
//               sx: { mt: 'auto' },
//             },
//             operatorInputProps: {
//               variant: 'outlined',
//               size: 'small',
//               sx: { mt: 'auto' },
//             },
//             valueInputProps: {
//               InputComponentProps: {
//                 variant: 'outlined',
//                 size: 'small',
//               },
//             },
//           },
//         },
//       }}
//     />
//   );
// }