import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  status: {
    danger: '#e53e3e',
  },
  palette: {
    primary: {
      main:  "#577590",
      contrastText: ""
    },
    neutral: {
      main: '#a7ce3b',
      contrastText: '#fff',
    },
  },
  
});

export default function MyAppBar(props) {
  function handleSignOut () {
    props.setUserToNull();
  };


  return (
    <ThemeProvider theme={theme}>
<Box sx={{ flexGrow: 1 }}>

<AppBar position="static">
  <Toolbar>
    {/* <IconButton
      size="large"
      edge="start"
      color='primary'
      aria-label="menu"
      sx={{ mr: 2 }}
    >
      <MenuIcon />
    </IconButton> */}
    <Typography variant="h4"  component="div" sx={{ flexGrow: 1 }}>
      Welcome to BucketList
    </Typography>
    <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
  </Toolbar>
</AppBar>
</Box>

    </ThemeProvider>
    
  );
}
