import { ReactElement } from "react";

export interface BaseButtonProps {
    cols: number;
    items: ReactElement[]
    
    spacingX?: number;
    spacingY?: number;
}
