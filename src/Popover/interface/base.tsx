import { CSSProperties, ReactNode } from "react";

export interface BasePopoverProps {
    anchorOriginVertical?: 'top' | 'center' | 'bottom' | number;
    anchorOriginHorizontal?: 'left' | 'center' | 'right' | number;
    transformOriginVertical?: 'top' | 'center' | 'bottom' | number;
    transformOriginHorizontal?: 'left' | 'center' | 'right' | number;
    parent?: ReactNode;
    children?: ReactNode;
}