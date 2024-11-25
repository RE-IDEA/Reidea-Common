import { Dispatch, SetStateAction } from "react";


export interface BaseSelectorProps {
    title?:string;
    values: string[];
    labels: string[];
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    disabled?: boolean;

    fontSize?: number;
    width?: number | string;
    height?: number | string;
    padding?: string;
    borderRadius?: number;
    bold?: boolean;
}