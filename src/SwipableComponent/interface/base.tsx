import { StackProps } from "@mui/material";
import { ReactNode } from "react";


export interface BaseSwipableComponentProps extends StackProps {
    onSwipedLeft?: () => void;
    onSwipedRight?: () => void;
    children?: ReactNode;
}