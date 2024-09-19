import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { BaseSwipableComponentProps } from './interface/base';


// SwipableStack: Swipeすると関数を実行してくれるありがたいStackです。
export const SwipableStack: React.FC<BaseSwipableComponentProps> = (props) => {
    const { onSwipedLeft, onSwipedRight, children, ...rest } = props;

    const handlers = useSwipeable({
        onSwipedLeft: async () => {
            if(onSwipedLeft) onSwipedLeft()
        },
        onSwipedRight: async () => {
            if(onSwipedRight) onSwipedRight()
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
      });

    return (
        <Stack width={"100%"} {...handlers} {...rest}>
            {props.children}
        </Stack>
    );
};
