import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Avatar, AvatarGroup, Box, CircularProgress, IconButton, LinearProgress, LinearProgressProps, Stack, Tooltip, Typography, linearProgressClasses } from '@mui/material';
import { LoadingImageProps } from './interface/base';

export const LoadingImage: React.FC<LoadingImageProps> = (props) => {

    const stackRef_images = useRef<HTMLDivElement>(null);
    const fontSize = (props.fontSize ?? 14 )

    const styleText1 ={
        fontSize : fontSize+'px',
        color : '#9D9D9D'
    }

    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
      return (
        <Box mb={2} mt={1} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '100%', mr: 1,  }}>
            <LinearProgress variant="determinate" {...props} sx={{height:"9px", borderRadius:"15px"}} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography sx={{fontSize: fontSize*1.3}} color="text.secondary">{`${Math.round(
              props.value,
            )}%`}</Typography>
          </Box>
        </Box>
      );
    }

  return(
    <Stack ref={stackRef_images} width={props.width ?? '100%'} style={{ position:"relative", height: props.height, maxWidth: '100%' }} alignItems={'center'} justifyContent={'center'} >
      {props.display_close &&
        <IconButton onClick={()=>{if(props.onClose) props.onClose()}} sx={{ width:(props.closeFontSize ?? 10)*1.8, height:(props.closeFontSize ?? 10)*1.8, bgcolor:"lightgrey", ":hover":{bgcolor:"lightgrey", opacity:0.95}, zIndex:3, position:"absolute", top:-(props.closeFontSize ?? 10)+5, right:-(props.closeFontSize ?? 10)}}>
          <Typography fontSize={props.closeFontSize} sx={{color:props.closeColor ?? "white"}}>×</Typography>
        </IconButton>
      }
      
      {props.loading ? 
          <Stack bgcolor={props.bgcolor ?? "white"} justifyContent={"center"} alignItems={"center"} style={{ borderRadius:props.borderRadius, border: props.border ?? "1px solid lightgrey", position: 'relative', width: '100%', height: '100%' }}>
            <Stack spacing={1}
              justifyContent={"center"} alignItems={"center"} 
              style={{
                position: 'absolute',
                width:"100%",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* ローディングサークル とロード中のテキスト */}
              <CircularProgress size={props.loadingSize} sx={{color:props.loadingColor ?? "lightgrey", }}/>
              <Typography textAlign={"center"} sx={{...styleText1, whiteSpace:"pre-wrap"}}>{props.progressText ?? "暫くお待ちください"}</Typography>
              
              {/* プログレスバー */}
              {(props.display_progress === true || props.progress) &&
                <Stack sx={{}} width={"70%"}>
                  <LinearProgressWithLabel value={props.progress ?? 0} />
                </Stack>
              }
            </Stack>
          </Stack>
        :
          // 画像が存在するならば
          (props.image_name || props.image_base64) ?
          <div style={{width:"100%", height:"100%", position:"relative"}}>
            <img src={props.image_base64 ?? process.env.REACT_APP_PUBLIC_URL+"/images/"+props.image_name} style={{borderRadius:"10px", verticalAlign: "top", objectFit: "cover", width:'100%', height: "100%",filter: props.loading ? 'brightness(50%)' : 'none', }}/>
          </div>
          :
          // 画像がまだない場合
          <Stack width={'100%'} height={"100%"} alignItems={'center'} justifyContent={'center'} sx={{borderRadius:"10px", border: "0.5px solid grey", position: 'relative',}}> 
            <Typography textAlign={"center"} sx={{...styleText1}}>画像がまだありません</Typography>
          </Stack>
        }
    </Stack>
  )
}

