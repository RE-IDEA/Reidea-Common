
        
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack, Snackbar } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { BaseSnackbarProps } from './interface/base';


// SwipableStack: Swipeすると関数を実行してくれるありがたいStackです。
export const BaseSnackBar: React.FC<BaseSnackbarProps> = (props) => {

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={props.hideDuration ?? 4000}
            onClose={()=>{props.handleClose()}}
            sx={{
                '& .MuiSnackbarContent-root': {
                  fontSize: '12px', // ここでフォントサイズを指定
                  ...props.style
                },
              }}
            message={props.message}
        />
    );
};
