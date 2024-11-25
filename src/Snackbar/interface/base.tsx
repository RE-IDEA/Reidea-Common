import { CSSProperties, ReactNode } from "react";

export interface BaseSnackbarProps {
    open: boolean;
    handleClose: () => void;  
    message: string;
    hideDuration?: number;
    style?: CSSProperties;  
}