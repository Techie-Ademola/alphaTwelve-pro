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
  Modal,
  Typography,
} from "@mui/material";
import { columns, rows as initialRows } from "../internals/data/gridData";
import { saveAs } from "file-saver";
import CustomDatePicker from "./CustomDatePicker";
import dayjs from "dayjs";
import bus from "../bus";

// Styling for the Modal
const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  maxWidth: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  borderRadius: 0,
};

export default function CustomizedDataGrid() {
  const [searchText, setSearchText] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("");
  const [nameFilter, setNameFilter] = React.useState("");
  const [sortOrder, setSortOrder] = React.useState("asc");
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(0);
  const [mui_mode, setMuiMode] = useState(localStorage.getItem("mui-mode"));
  const [modeStatus, setModeStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (params) => {
    setSelectedRow(params.row);
    setOpen(true);
    // console.log("params.row:", params.row);
  };

  const handleClose = () => setOpen(false);
  let is_collapsed = localStorage.getItem("is_collapsed");
  const parsedIsCollapsed = is_collapsed ? JSON.parse(is_collapsed) : false;

  useEffect(() => {
    // console.log("mui_mode", mui_mode);
    if (mui_mode) setModeStatus(mui_mode);
  }, []);

  useEffect(() => {
    bus.on("emit_mode_status", (val) => {
      // console.log("val:", val);

      if (val !== null && (val === "light" || val === "dark")) {
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
    setTimeout(() => {
      // console.log("sortedRows:", sortedRows);
    }, 1000);
  };

  // Handle page change
  const handlePageChange = (_event, newPage) => {
    setCurrentPage(newPage);
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
    <>
      <Box sx={{ height: "auto", width: "100%", pb: 5 }}>
        {/* Filters and Sorting Section */}
        <Box
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            mb: 2,
          }}
          className="d-md-flex align-items-center"
        >
          {/* Search Input */}
          <Box
            sx={{ alignItems: "center", gap: 1, mb: 2 }}
            className="d-md-flex"
          >
            <div className="position-relative search_input_wrap mb-2 mb-md-0">
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

            <div className=" d-block d-md-none">
              <div className="row">
                {/* Date Filter */}
                <div className="col-12 mb-2 ">
                  <CustomDatePicker
                    value={dateFilter ? dayjs(dateFilter) : null}
                    onChange={(newValue) => {
                      setDateFilter(
                        newValue ? newValue.format("YYYY-MM-DD") : ""
                      );
                    }}
                  />
                </div>
                <div className="col-12 pl-">
                  {/* Status Filter */}
                  <FormControl
                    size="small"
                    sx={{ minWidth: 120 }}
                    className="status_Filter  mx-md-0 w-100"
                  >
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
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
                </div>
              </div>
            </div>

            {/* Date Filter */}
            <div className="d-none d-md-block">
              <CustomDatePicker
                value={dateFilter ? dayjs(dateFilter) : null}
                onChange={(newValue) => {
                  setDateFilter(newValue ? newValue.format("YYYY-MM-DD") : "");
                }}
              />
            </div>

            {/* Status Filter */}
            <FormControl
              size="small"
              sx={{ minWidth: 120 }}
              className="status_Filter mx-2 mx-md-0 d-none d-md-block position-relative"
            >
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
            <Box
              sx={{ mb: 0, fontWeight: "500", fontSize: "14px" }}
              className="mt-3 mt-md-0"
            >
              Displaying {paginatedRows.length} results
            </Box>
          </Box>

          <Box
            sx={{ alignItems: "center", gap: 1, mb: 2 }}
            className={`d-md-flex status_Filter_right`}
          >
            {/* Sort Order */}

            <Box sx={{ mb: 0, fontSize: "14px" }} className="d-none d-md-block">
              Sort:
            </Box>
            <FormControl
              size="small"
              sx={{ minWidth: 120 }}
              className="d-none d-md-block"
            >
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
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <Select
                value={sortOrder}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value="desc">Most Recent</MenuItem>
                <MenuItem value="asc">Oldest</MenuItem>
              </Select>
            </FormControl>

            <div className="d-block d-md-none">
              <div className="d-flex justify-content-between align-items-center">
                <Box sx={{ mb: 0, fontSize: "14px" }}>Sort:</Box>
                <FormControl size="small" sx={{ minWidth: 120 }}>
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
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <Select
                    value={sortOrder}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value="desc">Most Recent</MenuItem>
                    <MenuItem value="asc">Oldest</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <div className="d-block d-md-none mt-3">
              <div className="d-flex justify-content-between align-items-center">
                <Button
                  variant="outlined"
                  color="primary"
                  className="rounded-0 px-0 fit-content "
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
                      stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                    />
                    <path
                      d="M10.4166 10C10.4166 10.2301 10.2301 10.4167 9.99998 10.4167C9.76986 10.4167 9.58331 10.2301 9.58331 10C9.58331 9.76988 9.76986 9.58333 9.99998 9.58333C10.2301 9.58333 10.4166 9.76988 10.4166 10Z"
                      stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                    />
                    <path
                      d="M10.4166 14.1667C10.4166 14.3968 10.2301 14.5833 9.99998 14.5833C9.76986 14.5833 9.58331 14.3968 9.58331 14.1667C9.58331 13.9365 9.76986 13.75 9.99998 13.75C10.2301 13.75 10.4166 13.9365 10.4166 14.1667Z"
                      stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
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
                      stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Export
                </Button>
              </div>
            </div>

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
                  stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                />
                <path
                  d="M10.4166 10C10.4166 10.2301 10.2301 10.4167 9.99998 10.4167C9.76986 10.4167 9.58331 10.2301 9.58331 10C9.58331 9.76988 9.76986 9.58333 9.99998 9.58333C10.2301 9.58333 10.4166 9.76988 10.4166 10Z"
                  stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                />
                <path
                  d="M10.4166 14.1667C10.4166 14.3968 10.2301 14.5833 9.99998 14.5833C9.76986 14.5833 9.58331 14.3968 9.58331 14.1667C9.58331 13.9365 9.76986 13.75 9.99998 13.75C10.2301 13.75 10.4166 13.9365 10.4166 14.1667Z"
                  stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                />
              </svg>
            </Button>

            <Button
              variant="outlined"
              color="primary"
              className="rounded-0 d-none d-md-block"
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
                  stroke={`${modeStatus === "light" ? "#141414" : "#fff"}`}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Export
            </Button>
          </Box>
        </Box>

        {/* DataGrid */}
        <div className="position-relative w-100" style={{ overflowX: "auto", overflowY: 'hidden' }}>
          <DataGrid
            autoHeight
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
            disableColumnResize
            style={{ minWidth: "60em", cursor: "pointer", minHeight: '100px' }}
            onRowClick={handleRowClick}
            pageSizeOptions={[10, 20, 50]}
            // density="compact"
            // pagination
            hideFooterPagination={true}
          />

          {/*             
                        // rowsPerPageOptions={[5, 10, 20, 50]}
                        // pageSizeOptions={[10, 20, 50]}
                        // density="compact"
                        // pagination={false}
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
                        // }} */}

          {/* Pagination Controls */}
          {/* <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              bottom: "13px",
              left: "18px",
            }}
            className="position-absolute"
          >
            {[...Array(Math.ceil(filteredRows.length / pageSize))].map(
              (_, i) => (
                <Button
                  key={i}
                  variant={i === currentPage ? "contained" : "outlined"}
                  onClick={(event) => handlePageChange(event, i + 1)}
                  sx={{ mx: 0.4, px: 2 }}
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    minWidth: "fit-content",
                    height: "auto",
                  }}
                >
                  {i + 1}
                </Button>
              )
            )}
          </Box> */}

          {/* Pagination Controls */}
          <div
            className="w-100 d-md-flex bottom_footer px-4"
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              bottom: "-2px",
              // left: "18px",
            }}
          >
            <div >
              <Box
                sx={{
                  // mt: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  bottom: "13px",
                  left: "18px",
                }}
              >
                {/* Previous Button */}
                <Button
                  variant="outlined"
                  onClick={() => handlePageChange(null, currentPage - 1)}
                  disabled={currentPage === 0}
                  sx={{ mx: 0.4, px: 1 }}
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    minWidth: "fit-content",
                    height: "auto",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0417 7.29169L8.125 10L11.0417 12.7084"
                      stroke="#64748B"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>

                {/* Page Numbers */}
                {[...Array(Math.ceil(filteredRows.length / pageSize))].map(
                  (_, i) => (
                    <Button
                      key={i}
                      variant={i === currentPage ? "contained" : "outlined"}
                      onClick={(event) => handlePageChange(event, i)}
                      sx={{ mx: 0.4 }}
                      className="border-0 outline-0"
                      style={{
                        boxShadow: "none",
                        paddingTop: "5px",
                        paddingBottom: "5px",
                        minWidth: "fit-content",
                        height: "auto",
                        borderRadius: "50%",
                        width: "27px",
                        minWidth: "27px",
                        height: "30px",
                        minHeight: "30px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: `${
                          modeStatus === "dark" && i !== currentPage
                            ? "white"
                            : modeStatus === "light" && i !== currentPage
                            ? "black"
                            : (i === currentPage && modeStatus === "dark") ||
                              modeStatus === "white"
                            ? "white"
                            : i === currentPage &&
                              modeStatus === "light" &&
                              modeStatus !== "dark"
                            ? "white"
                            : ""
                        }`,
                        background: `${
                          i === currentPage
                            ? "rgba(133, 118, 255, 1)"
                            : "transparent"
                        }`,
                      }}
                    >
                      {i + 1}
                    </Button>
                  )
                )}

                {/* Next Button */}
                <Button
                  variant="outlined"
                  onClick={() => handlePageChange(null, currentPage + 1)}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredRows.length / pageSize) - 1
                  }
                  sx={{ mx: 0.4, px: 1 }}
                  style={{
                    paddingTop: "5px",
                    paddingBottom: "5px",
                    minWidth: "fit-content",
                    height: "auto",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.95833 7.29169L11.875 10L8.95833 12.7084"
                      stroke="#334155"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Button>
              </Box>
            </div>

            <Box
              sx={{
                // display: "flex",
                // justifyContent: "flex-end",
                padding: "10px",
              }}
              className="d-flex align-items-center d-block fit-content show_rowcount"
            >
              <Box sx={{ mb: 0, fontSize: "14px" }} className=" mr-2">
              Show:
            </Box>
              {/* Show only Page Size Selector */}
              <FormControl
                size="small"
                sx={{ minWidth: 80 }}
                className="status_Filter"
              >
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
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <Select
                  value={pageSize}
                  onChange={(event) => setPageSize(event.target.value)}
                >
                  <MenuItem value={10}>10 Rows</MenuItem>
                  <MenuItem value={20}>20 Rows</MenuItem>
                  <MenuItem value={50}>50 Rows</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </Box>

      {/* Modal for selected event details */}
      {selectedRow && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyles}>
            <div className="px-4 py-4 position-relative">
              <span
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={handleClose}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="11.5"
                    fill="white"
                  />
                  <rect
                    x="0.5"
                    y="0.5"
                    width="23"
                    height="23"
                    rx="11.5"
                    stroke="#E2E8F0"
                  />
                  <path
                    d="M14.625 9.375L9.375 14.625"
                    stroke="#334155"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.375 9.375L14.625 14.625"
                    stroke="#334155"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>

              <Typography
                component="h3"
                variant="h5"
                sx={{ mb: 1, mt: 0, fontWeight: "500" }}
                className="eventName"
              >
                {selectedRow.eventName}
              </Typography>
              {/* <h2></h2> */}
              <Box
                sx={{ mb: 0, fontWeight: "400", fontSize: "13px" }}
                className="mt-3 mt-md-0"
              >
                {selectedRow.date}
              </Box>

              <Box
                sx={{ mb: 0, fontWeight: "400", fontSize: "13px" }}
                className="pt-4 pb-5 d-block mt-md-0"
              >
                Event description
              </Box>

              {/* <p>{selectedRow.description}</p> */}
              <div className="speakerAvatars">
                {selectedRow.speakerAvatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Speaker ${index + 1}`}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                  />
                ))}

                <Box
                  sx={{ mb: 0, fontWeight: "400", fontSize: "14px" }}
                  className=" d-block mt-md-0"
                >
                  {`3 Guest Speakers: ${selectedRow.speakers.join(", ")}`}
                </Box>

                <Box
                  sx={{ mb: 0, fontWeight: "400", fontSize: "14px" }}
                  className=" d-block mt-md-0"
                >
                  {`${selectedRow.attendees} Attendees`}
                </Box>
              </div>
            </div>
            <div
              className="footer_wrap d-sm-flex justify-content-between p-4"
              style={{
                background: `${
                  modeStatus === "light"
                    ? "rgba(248, 250, 252, 1)"
                    : "rgba(173, 169, 187, 1)"
                }`,
              }}
            >
              <Button
                className="rounded-0 border-0 outline-0"
                variant="contained"
                style={{
                  background: `${modeStatus === "dark" ? "white" : "white"}`,
                  color: `${modeStatus === "dark" ? "black" : "black"}`,
                  boxShadow: "none",
                }}
              >
                Edit
              </Button>

              <div className="fit-content">
                <Button
                  className="rounded-0 border-0 outline-0 mr-sm-2"
                  variant="contained"
                  style={{
                    background: `${
                      modeStatus === "dark"
                        ? "rgba(244, 63, 94, 1)"
                        : "rgba(244, 63, 94, 1)"
                    }`,
                    color: `${modeStatus === "dark" ? "white" : "white"}`,
                    boxShadow: "none",
                  }}
                >
                  Delete
                </Button>
                <Button
                  className="rounded-0 border-0 outline-0"
                  variant="contained"
                  style={{
                    background: `${
                      modeStatus === "dark"
                        ? "rgba(133, 118, 255, 1)"
                        : "rgba(133, 118, 255, 1)"
                    }`,
                    color: `${modeStatus === "dark" ? "white" : "white"}`,
                    boxShadow: "none",
                  }}
                >
                  Mark as completed
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </>
  );
}
