import { ReactElement } from "react";

export interface BaseButtonProps {
    cols: number;
    items: ReactElement[]
    
    height?: number;
    spacingX?: number;
    spacingY?: number;
    firstRowObserve?: boolean;
    lastRowObserve?: boolean;
    rowViewed?: boolean;
    setRowViewed?: React.Dispatch<React.SetStateAction<boolean>>;
    enableAnimation?: boolean;

    addDirection?: "top" | "bottom";

    animation?: boolean;
    animationDuration?: number;
    animationDelay?: number;
    animationOffsetY?: number;
    animationInitialDisplay?: boolean;
    animationDirection?: 'bottom-up' | "top-down"
}
