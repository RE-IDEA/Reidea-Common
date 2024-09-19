import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { BaseButtonProps } from '../interface/base';

// GridLayout: widthプロパティを自動調整してGridを形成。
export const BaseGrid: React.FC<BaseButtonProps> = (props) => {

    const stackRef = useRef<HTMLDivElement>(null);
    const [updatedItems, setUpdatedItems] = useState<React.ReactElement[]>(props.items);

    const updateItemsWidth = () => {
        const component_width = ((stackRef.current?.offsetWidth ?? 100) - (props.spacingX ? props.spacingX*8 : 8) * (props.cols - 1)) / props.cols;
        const newItems = props.items.map(item => 
          React.cloneElement(item, { width: component_width })
        );
        
        setUpdatedItems(newItems);
    };
    
    useLayoutEffect(() => {
        updateItemsWidth();
        window.addEventListener('resize', updateItemsWidth);
        
        return () => window.removeEventListener('resize', updateItemsWidth);
    }, [props.items, stackRef.current, props.spacingX, props.cols]);


    return (
        <Stack ref={stackRef} width={"100%"} justifyContent={"space-between"}>
            <Stack width={"100%"} spacing={props.spacingY ?? 1}>
                {Array.from({ length: Math.ceil(updatedItems.length / props.cols) }, (_, index) => index).map((row:number) => {
                    const isLast : boolean = (row+1)*props.cols >= updatedItems.length
                    return (
                        <Stack direction={"row"} spacing={props.spacingX ?? 1} width={"100%"} justifyContent={isLast ? "flex-start" : "space-between"}>
                            {updatedItems.slice(row*props.cols, isLast ? updatedItems.length : (row+1)*props.cols).map((item:ReactElement) => (
                                item
                            ))}
                        </Stack>
                    )
                })}
            </Stack>
        </Stack>
    );
};
