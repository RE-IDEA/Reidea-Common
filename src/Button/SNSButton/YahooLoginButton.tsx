import { Stack, Typography } from '@mui/material';
import React from 'react';
import { BaseSNSButtonProps } from '../interface/base';
const yahoo = require("./img/yahoo_icon.png")

// ボタンの周囲10pxは空白でないといけないので、注意。
export const YahooLoginButton: React.FC<BaseSNSButtonProps> = ({ onClick, width, text, height, padding }) => {
    
    const _height = (height ?? (width / 6))-4
    const image_ratio = 0.26

    return (
        <Stack width={width} padding={padding ?? "10px"}>
            <Stack height={_height} direction={"row"} border={"2px solid #ff0033"} borderRadius={width / 25 +"px"} sx={{cursor:"pointer", ":hover":{boxShadow: "0 4px 4px rgba(0, 0, 0, 0.1)"}}} onClick={()=>{onClick();}}>
                <Stack sx={{borderTopLeftRadius:width / 35, borderBottomLeftRadius:width / 35}}  bgcolor={"#ffffff"} paddingX={width * image_ratio /5+"px"} paddingY={_height/5+"px"} width={100*image_ratio+"%"}alignItems={"center"} justifyContent={"center"}>
                    <img src={yahoo} style={{height:_height * 2.7/5, objectFit:"cover"}} />
                </Stack>
                <Stack sx={{borderTopRightRadius:width / 55, borderBottomRightRadius:width / 55}} bgcolor={"#ff0033"} width={100*(1-image_ratio)+"%"} paddingY={_height/5+"px"} alignItems={"center"} justifyContent={"center"}>
                    <Typography fontSize={_height/2.5} fontWeight={"bold"} color={"#ffffff"} sx={{fontFamily: '"Zen Kaku Gothic New", "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif',}}>
                        {text ?? "ログイン"}
                    </Typography>
                </Stack>
            </Stack>
        </Stack>
    );
};

  
export default YahooLoginButton;