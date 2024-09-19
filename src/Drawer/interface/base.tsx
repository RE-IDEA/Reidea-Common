import React, { ReactNode } from "react";


export interface BaseDrawerProps {

    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    anchor?: "left" | "top" | "right" | "bottom";
    width?: string;
    height?: string;
    invisible?: boolean;
    boxShadow?: string;
    children?: ReactNode;
    disableSwipe?: boolean;
}