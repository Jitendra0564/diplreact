import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import { styled } from '@mui/system';

const CustomSnackbarContent = styled(SnackbarContent)(({ theme, color }) => ({
  backgroundColor: color || theme.palette.primary.main,
  color: theme.palette.common.white,
}));

const CustomSnackbar = ({ message, color, ...props }) => {
  return (
    <Snackbar {...props}>
      <CustomSnackbarContent
        message={message}
        color={color}
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
