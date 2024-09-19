import React, { ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { BaseSlideAnimation, slide_variants } from './interface/base';
import { motion, AnimatePresence } from 'framer-motion'; 



// SlideInOut: SlideComponentが複数あるときは、それぞれのコンポーネントが干渉してしまうため、それを制御する。
export const SlideInOut: React.FC<{children?: ReactNode}> = (props) => {

    return (
        <AnimatePresence mode='wait'>
            {props.children}
        </AnimatePresence>
    );
};
