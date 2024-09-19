import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { BaseSlideAnimation, slide_variants } from './interface/base';
import { motion, AnimatePresence } from 'framer-motion'; 



// SlideComponent: inがtrueの時に指定のdirectionからスライドインしてくれるコンポーネント
export const SlideComponent: React.FC<BaseSlideAnimation> = (props) => {

    return (
      props.display && 
        <motion.div
          key={props.key}
          initial={props.initial ?? "left"}
          animate={props.animate ?? "center"}
          exit={props.exit ?? "right"}
          variants={slide_variants}
          transition={{ duration: props.duration ?? 0.3 }}
          style={{width:"100%", display: "flex", justifyContent:"center"}}
        >
          {props.children}
        </motion.div>
      
    );
};
