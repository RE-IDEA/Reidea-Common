import { Dispatch, SetStateAction } from 'react';
import { InputProps as StandardInputProps } from '@mui/material/Input';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';

type TextAlign = "left" | "right" | "center" | "justify";


export interface BaseTextFieldProps {
    value?: string | number | null,
    placeholder: string,
    setValueNum?: Dispatch<SetStateAction<number | null>> | ((value:number | null) => void);
    setValue?: Dispatch<SetStateAction<string>> | ((value:string) => void);
    max?: number,
    rows?: number;
    maxdisplay?: boolean,
    maxFontSize?: number,
    error?: boolean,
    setError?: Dispatch<SetStateAction<boolean>> | ((value:boolean) => void);
    border?: string,
    padding?: string,
    backgroundColor?: string;
    hovered_backgroundColor?: string;
    letterSpacing?: number;
    fontSize?: number | string;
    disabled?: boolean;
    width?: string;
    height?: number;
    maxRows?:number;
    textAlign?: TextAlign;
    lineHeight?: number;
    borderBottom?:string;
    bold?: boolean;
    vertical?: boolean;
    color?: string;
    italic?: boolean;
    borderRadius?: number;
    readOnly?: boolean;
    errorCheck?: (text:string)=>boolean
    errorBorder?: string;
    errorText?:string;
    focus?: boolean
    setFocus?: Dispatch<SetStateAction<boolean>>
    focusTimeout?: number
    inputRef?: React.RefObject<HTMLInputElement>;
    type?: string;
    unit?: string;
    customInputProps?: Partial<StandardInputProps | OutlinedInputProps>;
    startAdormentComponent?: React.ReactNode;
    endAdormentComponent?: React.ReactNode;
    onKeyEnterAndMeta?: () => void;
}