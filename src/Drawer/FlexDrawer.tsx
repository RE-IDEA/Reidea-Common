import { Box, Typography, Card, Stack, Avatar, Badge, SwipeableDrawer, Drawer } from "@mui/material";
import React from "react";
import { BaseDrawerProps } from "./interface/base";


export const FlexDrawer: React.FC<BaseDrawerProps> = (props: BaseDrawerProps) => {
    const commonProps = {
        anchor: props.anchor ?? "right",
        open: props.open,
        onClose: () => {
            props.setOpen(false);
            if(props.handleClose) props.handleClose();
        },
        PaperProps: {
          sx: { height: props.height ?? '100%', width: props.width ?? "100%", boxShadow: props.boxShadow, zIndex: 1 }
        },
        sx: { zIndex: 10, position: "relative" },
        variant: "temporary" as const,
        ModalProps: {
          keepMounted: true,
          BackdropProps: {
            invisible: props.invisible,
          },
        }
    };

    if (props.disableSwipe) {
        return (
            <Drawer {...commonProps}>
                {props.children}
            </Drawer>
        );
    }

    return (
        <SwipeableDrawer
            {...commonProps}
            onOpen={() => props.setOpen(true)}
        >
            {props.children}
        </SwipeableDrawer>
    );
};
