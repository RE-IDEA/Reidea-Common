import { CSSProperties, ReactNode } from "react";

export interface BasePopupProps {
    handleClose: () => void;
    open: boolean;
    isMobile?: boolean;
    children?: ReactNode;

    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
    style?: CSSProperties;
}