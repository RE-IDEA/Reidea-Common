import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, IconButton, Typography, Button, Modal, Stack, TextField, Card, Avatar } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { BasePopupProps } from './interface/base';


export const BasePopup: React.FC<BasePopupProps> = (props) => {
  const style = {
    position: 'absolute',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: props.width ?? "50%",
    height: props.height ?? "50%",
    overflowY: "auto",
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: props.borderRadius ?? 5,
    ...props.style
  };

  return (
    <Modal open={props.open} onClose={props.handleClose} sx={{ border: 'none' }}>
        <Fade in={props.open}>
            <Stack sx={style}>
              {props.children}
            </Stack>
        </Fade>
    </Modal>

  );
};

