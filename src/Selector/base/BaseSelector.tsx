import React, { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { BaseSelectorProps } from '../interface/base';

export const BaseSelector: React.FC<BaseSelectorProps> = (props) => {
    const { labels, values, value, setValue, fontSize } = props;


    // カスタムスタイルのPaperコンポーネント
    const menuProps = {
        PaperProps: {
            sx: {
                borderRadius: props.borderRadius ?? 1,
                minWidth: props.width,
                marginTop: '10px',
            },
        },
    };

    return(
        <FormControl variant={"standard"} sx={{ width: props.width}}>
            {props.title && <InputLabel sx={{ fontSize: fontSize }}>{props.title}</InputLabel>}
            <Select disabled={props.disabled} value={labels[values.indexOf(value)]} onChange={(e) => {
                setValue(values[labels.indexOf(e.target.value)])
            }} sx={{
                fontSize: fontSize +"px", fontWeight: props.bold ? "bold" : "medium", textDecoration: 'none' }}
                MenuProps={menuProps}
            >
                {labels.map((label:string, index:number) => {
                    return (
                        <MenuItem value={label} sx={{ 
                            padding: "10px", fontSize: fontSize +"px", minHeight: props.height}}>{label}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    )
}