import React, { ReactElement, ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack, StackProps } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { slide_variants } from './interface/base';
import { motion, AnimatePresence } from 'framer-motion'; 


interface Props extends StackProps {
    setObserved: React.Dispatch<React.SetStateAction<boolean>>;
    isOneTime?: boolean;
    children: ReactNode;
}



// SlideComponent: inがtrueの時に指定のdirectionからスライドインしてくれるコンポーネント
export const ObserverStack: React.FC<Props> = ({setObserved, isOneTime, children, ...stackProps}) => {

    const rowRef = useRef<HTMLDivElement | null>(null);

    // スクロールリロードを実装
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setObserved(true)
                        if (rowRef.current && isOneTime === true) {
                            observer.unobserve(rowRef.current);
                        }
                    }else{
                        setObserved(false)
                    }
                });
            },
            {
                root: null, // 親要素を指定。null はビューポートを意味する
                threshold: 0.1, // 要素が10%表示されたらコールバックを呼ぶ
            }
        );

        if (rowRef.current) {
            observer.observe(rowRef.current);
        }

        return () => {
            if (rowRef.current) {
                observer.unobserve(rowRef.current);
            }
        };
    }, []);

    return (
      <Stack ref={rowRef} {...stackProps}>
          {children}
      </Stack>
      
    );
};
