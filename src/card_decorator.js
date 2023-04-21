import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// const backgroundColor = "#a7ce3b";
const backgroundColor = "#ffffff";


const Decorator = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : backgroundColor,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  export default Decorator