import React, { ReactElement, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress, Stack } from '@mui/material';
import { BaseMessageProps } from '../interface/base';
import { UserIcon } from '../../Icon/UserIcon';
import IMG from "./../image/test.png"

// GridLayout: widthプロパティを自動調整してGridを形成。
export const BaseMessage: React.FC<BaseMessageProps> = (props) => {

    const stackRef = useRef<HTMLDivElement>(null);
    const fontSize = props.fontSize ?? 14
    const left = props.left === undefined ? true : props.left
    const borderRadius = fontSize


    return (
        <Stack spacing={fontSize/15} direction={left ? "row" : "row-reverse"} width={"100%"} alignItems={"flex-end"} justifyContent={left ? "flex-start" : "flex-end"}>
            {/* ユーザーアイコン */}
            {props.display_user !== false &&
                <UserIcon size={fontSize*2.5} user_name={props.user_name} onClick={()=>{if(props.onClick_user) props.onClick_user()}}
                    image_name_path={props.profile_image_name_path} image_uri={props.profile_image_uri}
                    online={props.isOnline}
                 />
            }

            {/* 画像かメッセージか 同時はなし */}
            {props.image_name ?
                <Stack width={"100%"} spacing={1} paddingBottom={fontSize/2+"px"} direction={left ? "row" : "row-reverse"} alignItems={"flex-end"}>
                    <img src={props.image_name} style={{borderRadius:"10px", maxWidth:props.image_maxWidth, objectFit:"cover"}}></img>
                    <Stack height={"100%"} justifyContent={"center"} alignItems={left ? "flex-start" : "flex-end"}>
                        {props.viewed &&
                            <Typography textAlign={left ? "left" : "right"}  sx={{ color:"grey",fontSize: fontSize-2}}>
                                {"既読"}
                            </Typography>
                        }
                        <Typography textAlign={left ? "left" : "right"}  sx={{ color:"grey",fontSize: fontSize-2}}>
                            {props.createdAtString}
                        </Typography>
                    </Stack>
                </Stack>
            :
                <Stack width={"100%"} spacing={1} paddingBottom={fontSize/2+"px"} direction={left ? "row" : "row-reverse"} alignItems={"flex-end"}>
                    <Typography maxWidth={props.message_max_width}  textAlign={left ? "left" : "left"} padding={`${fontSize/2.2}px ${fontSize/1.2}px`} borderRadius={borderRadius+"px"}  sx={{ 
                        borderBottomLeftRadius: left ? "0px" : borderRadius, borderBottomRightRadius: left ? borderRadius+"px" : "0px", 
                        fontSize:fontSize, bgcolor:props.bgColor ?? "#383E86", color:props.color ?? "white",
                        whiteSpace:"pre-wrap",
                        }}>
                        {props.message}
                    </Typography>
                    <Stack height={"100%"} justifyContent={"center"} alignItems={left ? "flex-start" : "flex-end"}>
                        {props.viewed &&
                            <Typography textAlign={left ? "left" : "right"}  sx={{ color:"grey",fontSize: fontSize-2}}>
                                {"既読"}
                            </Typography>
                        }
                        <Typography textAlign={left ? "left" : "right"}  sx={{ color:"grey",fontSize: fontSize-2}}>
                            {props.createdAtString}
                        </Typography>
                    </Stack>
                </Stack>
            }
            

        </Stack>
    );
};
