import React, { useState, useEffect, useContext, useRef } from 'react';
import Box from '@mui/material/Box';
import { InputAdornment, IconButton, Typography, Button, Modal, Stack, TextField, Card, Avatar, Popover } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import { BasePopoverProps } from './interface/base';


export const BasePopover: React.FC<BasePopoverProps> = (props) => {
  const [anchorEL, setAnchorEL] = React.useState<HTMLElement | null>(null);
  return (
    <>
      <Stack onClick={(event: React.MouseEvent<HTMLElement>)=>{setAnchorEL(event.currentTarget)}}>
        {props.parent}
      </Stack>

      <Popover open={Boolean(anchorEL)}
        onClose={ () => {setAnchorEL(null)}}
        anchorEl={anchorEL}
        anchorOrigin={{
          vertical: props.anchorOriginVertical || 'bottom',
          horizontal: props.anchorOriginHorizontal || 'center',
        }}
        transformOrigin={{
          vertical: props.transformOriginVertical || 'top',
          horizontal: props.transformOriginHorizontal || 'right',
        }}
        disableRestoreFocus>
          {props.children}
      </Popover>
    </>
    

  );
};

