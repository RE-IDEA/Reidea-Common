import { CSSProperties, ReactNode } from "react";

export type CellProps =  {
    value: ReactNode;
    align?:  "center" | "left" | "right" | "inherit" | "justify" | undefined,
    width?: string | number;
    height?: string | number;
}

export type RowProps =  {
    rowCSS?: CSSProperties;
    values: CellProps[];
}


export interface BaseTableProps {
    head: RowProps;
    bodies: RowProps[];
    tableCSS?: CSSProperties;

    animationDuration?: number;
    animationDelay?: number;
    enableAnimation?: boolean;
}