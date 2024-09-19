import { Box, Typography, Card, Stack, Avatar, Badge } from "@mui/material";
import React from "react";
import { Theme } from '@mui/material/styles';
import { BaseIconProps } from "./interface/base";
import { styled } from '@mui/material/styles';


const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: -1,
        left: -1,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(1.3)',
        opacity: 0,
      },
    },
}));


export const UserIcon: React.FC<BaseIconProps> = (props: BaseIconProps) => {

    const imageStyles = {
        borderRadius: props.size /2,
        width: props.size,
        height: props.size,
        cursor: "pointer",
        objectFit: "cover" as React.CSSProperties['objectFit'], // Correct type assignment
        objectPosition: "center" as React.CSSProperties['objectPosition'], // Correct type assignment    
    };

    return (
        props.online ? (
            <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                onClick={()=>{if(props.onClick) props.onClick()}}
            >
                {props.image_name_path ? (
                    <img
                        src={props.image_name_path ?? ""}
                        alt="user_profile_image"
                        style={imageStyles}
                    />
                ) : props.image_uri ? (
                    <img
                        src={props.image_uri}
                        alt="user_profile_image"
                        style={imageStyles}
                    />
                ) : (
                    <Avatar
                        sx={{
                            cursor: imageStyles.cursor,
                            width: imageStyles.width,
                            height: imageStyles.height,
                            fontSize: props.size / 2,
                        }}
                    >
                        {props.user_name ? props.user_name[0] : null}
                    </Avatar>
                )}
            </StyledBadge>
        ) : (
            <>
                {props.image_name_path ? (
                    <img
                        src={props.image_name_path}
                        alt="user_profile_image"
                        style={imageStyles}
                        onClick={()=>{if(props.onClick) props.onClick()}}
                    />
                ) : props.image_uri ? (
                    <img
                        src={props.image_uri}
                        alt="user_profile_image"
                        style={imageStyles}
                        onClick={()=>{if(props.onClick) props.onClick()}}
                    />
                ) : (
                    <Avatar
                        sx={{
                            cursor: imageStyles.cursor,
                            width: imageStyles.width,
                            height: imageStyles.height,
                            fontSize: props.size / 2,
                        }}
                        onClick={()=>{if(props.onClick) props.onClick()}}
                    >
                        {props.user_name ? props.user_name[0] : null}
                    </Avatar>
                )}
            </>
        )
    );
};
