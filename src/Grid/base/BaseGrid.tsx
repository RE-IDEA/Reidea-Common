import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { BaseButtonProps } from '../interface/base';
import { motion, AnimatePresence } from 'framer-motion';

// GridLayout: widthプロパティを自動調整してGridを形成。
export const BaseGrid: React.FC<BaseButtonProps> = (props) => {
    const {
        addDirection = "bottom",
        enableAnimation = false,
        animation = false,
        animationDuration = 0.3,
        animationDelay = 0.1,
        animationOffsetY = 20,
        animationInitialDisplay = false,
        animationDirection = "top-down"
      } = props;


    const stackRef = useRef<HTMLDivElement>(null);
    const [updatedItems, setUpdatedItems] = useState<React.ReactElement[]>(props.items);

    const updateItemsWidth = () => {
        const component_width = ((stackRef.current?.offsetWidth ?? 100) - (props.spacingX ? props.spacingX*8 : 8) * (props.cols - 1)) / props.cols;
        const newItems = props.items.map(item => 
          React.cloneElement(item, { width: component_width })
        );
        setUpdatedItems(newItems);
    };
    const rowRef = useRef<HTMLDivElement | null>(null);


    // スクロールリロードを実装
    useEffect(() => {
        if(props.firstRowObserve || props.lastRowObserve){
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            if (props.setRowViewed) {
                                props.setRowViewed(true);
                            }
                            // 監視を解除する
                            if (entry.target) {
                                observer.unobserve(entry.target);
                            }
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
        }
    }, [updatedItems]);

    // 新しい追加Itemの個数
    const [newItemIndices, setNewItemIndices] = useState<number[]>([]);
    const isFirstRender = useRef(true);
    // 新しいアイテムを検知する
    useEffect(() => {
        if (isFirstRender.current) {
            // 初回マウント時
            if (animationInitialDisplay) {
                const initialIndices = Array.from(
                    { length: props.items.length },
                    (_, i) => i
                );
                setNewItemIndices(initialIndices);
            }
            isFirstRender.current = false;
        } else if (props.items.length > updatedItems.length) {
            // 追加アイテムの検知
            const newIndices = Array.from(
                { length: props.items.length - updatedItems.length },
                (_, i) => addDirection === "bottom" ? updatedItems.length + i : i
            );
            console.log(newIndices)
            setNewItemIndices(newIndices);
        }
    }, [props.items]);

    
    useLayoutEffect(() => {
        updateItemsWidth();
        window.addEventListener('resize', updateItemsWidth);
        
        return () => window.removeEventListener('resize', updateItemsWidth);
    }, [props.items, stackRef.current, props.spacingX, props.cols]);

    return (
        <Stack ref={stackRef} width={"100%"} 
            height={props.height !== undefined ? 
                props.height * Math.ceil(updatedItems.length / props.cols) + (props.spacingY ?? 1)*8 * (Math.ceil(updatedItems.length / props.cols)-1) : undefined} justifyContent={"space-between"}>
            <Stack width={"100%"} spacing={props.spacingY ?? 1}>
            {Array.from({ length: Math.ceil(updatedItems.length / props.cols) }, (_, index) => index).map((row) => {
          const isFirst = row === 0;
          const isLast = (row + 1) * props.cols >= updatedItems.length;
          return (
            <Stack
              key={row}
              direction="row"
              spacing={props.spacingX ?? 1}
              width="100%"
              justifyContent={isLast ? "flex-start" : "space-between"}
              ref={(props.firstRowObserve && isFirst) || (props.lastRowObserve && isLast) ? rowRef : undefined}
            >
                <AnimatePresence>
                    {enableAnimation === false ? 
                        updatedItems.slice(row * props.cols, isLast ? updatedItems.length : (row + 1) * props.cols)
                        .map((item, index) => (
                            item
                        ))
                    :
                        animationInitialDisplay === false && animation === false ? null
                        :
                        updatedItems.slice(row * props.cols, isLast ? updatedItems.length : (row + 1) * props.cols)
                            .map((item, index) => {
                                const globalIndex = row * props.cols + index;
                                const isNewItem = newItemIndices.includes(globalIndex);
                                const newItemIndex = newItemIndices.indexOf(globalIndex);
                                // 遅延の計算
                                let delay;
                                if (newItemIndices.length > 0) {
                                    // 新しいアイテムがある場合
                                    if (isNewItem) {
                                        // 新しいアイテムは順番に表示
                                        delay = animationDirection === "top-down" ?  newItemIndex * animationDelay : (newItemIndices.length - 1 - newItemIndex) * animationDelay;
                                    } else {
                                        // 既存のアイテムは通常の遅延
                                        delay = 0;
                                    }
                                } else {
                                    // 新しいアイテムがない場合は通常の遅延
                                    delay = animationDirection === "top-down" ? (props.cols * row + index) * animationDelay : ((updatedItems.length - 1 - row) * props.cols + index) * animationDelay;;
                                }
                                return(
                                    <motion.div 
                                    key={row+index}
                                    initial={animation ? { opacity: 0, y: animationOffsetY } : { opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={animation ? { opacity: 0, y: animationOffsetY } : { opacity: 0, y: 0 }}
                                    transition={{ 
                                        duration: animationDuration,
                                        delay: delay
                                    }}
                                    >
                                    {item}
                                    </motion.div>
                                )
                            })
                        }
                </AnimatePresence>
            </Stack>
          );
        })}
            </Stack>
        </Stack>
    );
};
