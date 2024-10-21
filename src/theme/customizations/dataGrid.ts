import { paperClasses } from '@mui/material/Paper';
import { alpha, Theme } from '@mui/material/styles';
import type { DataGridProComponents } from '@mui/x-data-grid-pro/themeAugmentation';
import type { DataGridComponents } from '@mui/x-data-grid/themeAugmentation';
import { menuItemClasses } from '@mui/material/MenuItem';
import { listItemIconClasses } from '@mui/material/ListItemIcon';
import { iconButtonClasses } from '@mui/material/IconButton';
import { checkboxClasses } from '@mui/material/Checkbox';
import { listClasses } from '@mui/material/List';
import { gridClasses } from '@mui/x-data-grid';
import { tablePaginationClasses } from '@mui/material/TablePagination';
import { gray } from '../themePrimitives';

export const dataGridCustomizations: DataGridProComponents<Theme> & DataGridComponents<Theme> = {
  MuiDataGrid: {
    styleOverrides: {
      root: ({ theme }) => ({
        '--DataGrid-overlayHeight': '300px',
        overflow: 'clip',
        borderColor: theme.palette.divider, // Refactored
        backgroundColor: theme.palette.background.default, // Refactored
        [`& .${gridClasses.columnHeader}`]: {
          backgroundColor: theme.palette.background.paper, // Refactored
        },
        [`& .${gridClasses.footerContainer}`]: {
          backgroundColor: theme.palette.background.paper, // Refactored
        },
        [`& .${checkboxClasses.root}`]: {
          padding: theme.spacing(0.5),
          '& > svg': {
            fontSize: '1rem',
          },
        },
        [`& .${tablePaginationClasses.root}`]: {
          marginRight: theme.spacing(1),
          '& .MuiIconButton-root': {
            maxHeight: 32,
            maxWidth: 32,
            '& > svg': {
              fontSize: '1rem',
            },
          },
        },
      }),
      cell: ({ theme }) => ({
        borderTopColor: theme.palette.divider, // Refactored
      }),
      menu: ({ theme }) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundImage: 'none',
        [`& .${paperClasses.root}`]: {
          border: `1px solid ${theme.palette.divider}`, // Refactored
        },
        [`& .${menuItemClasses.root}`]: {
          margin: '0 4px',
        },
        [`& .${listItemIconClasses.root}`]: {
          marginRight: 0,
        },
        [`& .${listClasses.root}`]: {
          paddingLeft: 0,
          paddingRight: 0,
        },
      }),
      row: ({ theme }) => ({
        '&:last-of-type': { borderBottom: `1px solid ${theme.palette.divider}` }, // Refactored
        '&:hover': {
          backgroundColor: theme.palette.action.hover, // Refactored
        },
        '&.Mui-selected': {
          background: theme.palette.action.selected, // Refactored
          '&:hover': {
            backgroundColor: theme.palette.action.hover, // Refactored
          },
        },
      }),
      iconButtonContainer: ({ theme }) => ({
        [`& .${iconButtonClasses.root}`]: {
          border: 'none',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
          '&:active': {
            backgroundColor: gray[200],
          },
          ...theme.applyStyles?.('dark', {
            color: gray[50],
            '&:hover': {
              backgroundColor: gray[800],
            },
            '&:active': {
              backgroundColor: gray[900],
            },
          }),
        },
      }),
      menuIconButton: ({ theme }) => ({
        border: 'none',
        backgroundColor: 'transparent',
        '&:hover': {
          backgroundColor: gray[100],
        },
        '&:active': {
          backgroundColor: gray[200],
        },
        ...theme.applyStyles?.('dark', {
          color: gray[50],
          '&:hover': {
            backgroundColor: gray[800],
          },
          '&:active': {
            backgroundColor: gray[900],
          },
        }),
      }),
      filterForm: ({ theme }) => ({
        gap: theme.spacing(1),
        alignItems: 'flex-end',
      }),
      columnsManagementHeader: ({ theme }) => ({
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
      }),
      columnHeaderTitleContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
      },
      columnHeaderDraggableContainer: { paddingRight: 2 },
    },
  },
};
