import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import { styled } from '@mui/system';
import styled from "styled-components";


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

// const StyledWrapper = styled('div')({
//   position: 'relative',
//   display: 'inline-block',
//   width: '50px',
//   height: '25px',
//   input: {
//     opacity: 0,
//     width: 0,
//     height: 0,
//   },
//   label: {
//     position: 'absolute',
//     cursor: 'pointer',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: '#ccc',
//     transition: '.4s',
//     borderRadius: '25px',
//   },
//   label:after: {
//     content: '""',
//     position: 'absolute',
//     width: '21px',
//     height: '21px',
//     left: '4px',
//     bottom: '2px',
//     backgroundColor: 'white',
//     transition: '.4s',
//     borderRadius: '50%',
//   },
//   'input:checked + label': {
//     backgroundColor: '#1976d2',
//   },
//   'input:checked + label:after': {
//     transform: 'translateX(24px)',
//   },
// });

export default function ColorModeSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleChange = () => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <div className="d-flex align-items-center pl-1">
        <StyledWrapper>
          <>
            <input
              type="checkbox"
              id="checkboxInput"
              checked={mode === 'dark'}
              onChange={handleChange}
            />
            <label htmlFor="checkboxInput" className="toggleSwitch"></label>
          </>
        </StyledWrapper>
        <ListItemText primary="Dark mode" sx={{ mx: 1 }} />
      </div>
    </ListItem>
  );
}




// import * as React from 'react';
// import { useColorScheme } from '@mui/material/styles';
// import MenuItem from '@mui/material/MenuItem';
// import Select, { SelectProps } from '@mui/material/Select';

// export default function ColorModeSelect(props: SelectProps) {
//   const { mode, setMode } = useColorScheme();
//   if (!mode) {
//     return null;
//   }
//   return (
//     <Select
//       value={mode}
//       onChange={(event) =>
//         setMode(event.target.value as 'system' | 'light' | 'dark')
//       }
//       SelectDisplayProps={{
//         // @ts-ignore
//         'data-screenshot': 'toggle-mode',
//       }}
//       {...props}
//     >
//       <MenuItem value="system">System</MenuItem>
//       <MenuItem value="light">Light</MenuItem>
//       <MenuItem value="dark">Dark</MenuItem>
//     </Select>
//   );
// }
