import React from 'react';
import { Button, SvgIcon, Typography } from '@mui/material';
import { BaseSNSButtonProps } from '../interface/base';
const X = require("./img/x_icon.png");

export const XLoginButton: React.FC<BaseSNSButtonProps> = ({ onClick, text, width, height, fontSize }) => {
  
    const _height = (height ?? (width / 6))
  
    return (
        <Button
            variant="contained"
            style={{
                backgroundColor: '#000000',
                width: width,
                height: _height,
                color: '#ffffff',
                textTransform: 'none',
                fontWeight: 'bold',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onClick={()=>{onClick()}}>
            <img height={_height/2+"px"} src={X} style={{ 
                marginRight: '8px',
                position: 'absolute',
                left: '15px'
                }}  
            />
            <Typography marginLeft={"25px"} fontSize={fontSize ?? 14}>
                {text ?? "X でログイン"}
            </Typography>
            
        </Button>
  );
};

export default XLoginButton;