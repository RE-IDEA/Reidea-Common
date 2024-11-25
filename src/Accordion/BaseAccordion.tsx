
        
import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack, Snackbar, Accordion, AccordionSummary, AccordionDetails, Collapse } from '@mui/material';
import { useSwipeable } from 'react-swipeable';
import { BaseAccordionProps } from './interface/base';


export const BaseAccordion: React.FC<BaseAccordionProps> = (props) => {
    
    const [open, setOpen] = useState<boolean>(props.open ?? false);
    const [showPreview, setShowPreview] = useState(!open);

    // Accordionが開くときはすぐにプレビューを非表示に
    // 閉じるときは遅延させてプレビューを表示
    useEffect(() => {
        if (open) {
            setShowPreview(false);
        } else {
            // AccordionDetailsのトランジション時間に合わせて遅延を設定
            const timer = setTimeout(() => {
                setShowPreview(true);
            }, 200); // MUIのデフォルトトランジション時間は200ms
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Accordion expanded={open} sx={{borderRadius: 0, boxShadow: "none",  padding: 0, margin:0,
            '&:first-of-type': {borderTopLeftRadius: 0,},
            '&:last-of-type': {borderBottomLeftRadius: 0,},
            '&::before': { display: 'none' },
            '&.Mui-expanded': { margin: 0 },
            ...props.style_whole
        }} >
            <AccordionSummary
                sx={{
                margin:0, minHeight:10, padding:0, borderRadius: 0, border:"none",
                '& .MuiAccordionSummary-content': {margin: '0',  minHeight:0,},
                '&.Mui-expanded': { minHeight: 'unset'},
                // contentのマージンも合わせて調整すると良いでしょう
                '& .MuiAccordionSummary-content.Mui-expanded': {
                    margin: '0',
                },
                ...props.style_summary
            }} onClick={()=>{setOpen(!open)}} >
                <Stack width={"100%"}>
                    {props.summary}
                                
                    <Collapse in={showPreview && !open} timeout={{
                                enter: 225, // デフォルトの表示アニメーション
                                exit: 0    // 即時非表示
                            }}>
                        {props.preview && (
                            <AccordionDetails sx={{borderRadius:0, padding:0, margin:0,
                                ...props.style_preview
                            }}>
                                {props.preview}
                            </AccordionDetails>
                        )}
                    </Collapse>
                </Stack>
            </AccordionSummary>




            <AccordionDetails sx={{borderRadius:0, padding:0, margin:0,
                ...props.style_details
            }}>
                {props.details}
            </AccordionDetails>
        </Accordion>
    );
};
