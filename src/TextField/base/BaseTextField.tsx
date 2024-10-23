import React, { useState, useEffect, useRef } from 'react';
import { InputAdornment, Grid, IconButton, Typography, Button, Stack, TextField, Card, Avatar, styled } from '@mui/material';
import { BaseTextFieldProps } from '../interface/base';



export const BaseTextField: React.FC<BaseTextFieldProps> = (props) => {
    const { 
        value, 
        setValue, 
        setValueNum, 
        lineHeight, 
        letterSpacing, 
        rows, 
        max, 
        maxFontSize, 
        maxdisplay, 
        placeholder, 
        error, 
        border, 
        padding, 
        backgroundColor, 
        fontSize, 
        disabled, 
        errorBorder, 
        width, 
        maxRows, 
        textAlign, 
        borderBottom, 
        bold, 
        italic, 
        borderRadius, 
        hovered_backgroundColor, 
        color, 
        readOnly, 
        vertical, 
        errorText, 
        type, 
        unit, 
        customInputProps, 
        onKeyEnterAndMeta,
        endAdormentComponent,
        startAdormentComponent
    } = props;


    const [hovered, setIsHovered] = useState<boolean>(false)

    
    return(
        <Stack direction={"column"} sx={{width:width, height: vertical ? "100%" : undefined}} >
            <Stack width={"100%"} sx={{height:"100%"}} alignItems={"center"} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            <TextField type={type ?? undefined} multiline={maxRows ? maxRows > 1 : false} maxRows={maxRows ?? 1} variant="outlined" rows={rows ?? undefined} disabled={disabled ? disabled : false} sx={{ width:"100%",
                border: error ? (errorBorder ?? "1px solid red") : border ?? undefined,
                height:"100%",
                borderRadius: borderRadius ?? '10px',
                borderBottom:border ? undefined : borderBottom ?? undefined, 
                backgroundColor: hovered ? (hovered_backgroundColor ?? "#F6F6F6") : backgroundColor ?? "#F6F6F6",
                '& .MuiOutlinedInput-root': {
                    paddingRight: "0px",
                    '& fieldset': {
                        border:"none",
                        borderRadius: borderRadius ?? '10px',
                    },
                },
                '& .MuiInputBase-root': {
                    writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
                    textOrientation: vertical ? 'upright' : 'mixed',
                  },
                '& .MuiInputBase-input': {
                    writingMode: vertical ? 'vertical-rl' : 'horizontal-tb',
                    textOrientation: vertical ? 'upright' : 'mixed',
                    height:vertical ? "100%" : undefined,
                },

                "& .MuiInputBase-multiline ":{
                    display: 'flex',
                    alignItems: 'center', // Center align items vertically
                    padding: "0px 0px", // マルチラインの場合、余白をリセットする
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {border: "none", },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': { border: "none",},
                }}
                InputProps={{
                    startAdornment: startAdormentComponent ?? undefined,
                    endAdornment: endAdormentComponent ?? (unit ? <InputAdornment position="end" sx={{paddingRight: "20px", fontSize:fontSize ?? 16}}>{unit}</InputAdornment> : undefined),
                    ...customInputProps, // Spread custom InputProps here
                }}
                inputProps={{
                    
                    readOnly: readOnly ?? false,
                    style: { 
                        fontWeight: bold ? "bold" : undefined,
                        textAlign:textAlign ?? "left", 
                        color: color ?? undefined,
                        fontSize: fontSize ? fontSize : 16, 
                        fontStyle: italic ? "italic" : undefined,
                        letterSpacing: letterSpacing ?? 1,
                        padding: padding ? padding : "8px 14px",
                        lineHeight: lineHeight ?? (fontSize ? parseInt(fontSize as string, 10)+10+"px" : 20 + 'px') // Add or update this line
                    },
                }}
                onKeyDown={(e)=>{
                    if( e.key === "Enter" && e.metaKey){
                     if(onKeyEnterAndMeta) onKeyEnterAndMeta()
                    }
                }}
                
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    if(max && e.target.value.length > max){
                        if(setValue) setValue(e.target.value.substring(0, max))
                        if(setValueNum) setValueNum(Number(e.target.value))
                    }else{
                        if(setValue) setValue(e.target.value)
                        if(setValueNum) setValueNum(Number(e.target.value))
                    }
                }}
            />
            {(error || maxdisplay) &&
                <Stack width={"100%"} direction={"row"} justifyContent={error ? (maxdisplay ? "space-between" : "flex-end") : "flex-end"}>
                    {error &&
                        <Typography sx={{fontSize: maxFontSize ?? (fontSize ? Number(fontSize)-3 : fontSize), color: "red"}}>
                            {errorText}
                        </Typography>
                    }
                    {max && maxdisplay &&  typeof(value) === "string" &&
                        <Typography sx={{fontSize: maxFontSize ?? (fontSize ? Number(fontSize)-3 : fontSize), color: value?.length ? value?.length >= max ? "#e60000" : "grey" : "grey"}}>
                            {value?.length ?? 0} / {max}
                        </Typography>
                    }
                </Stack>
            }
            </Stack>
        </Stack>
    )
    
}

