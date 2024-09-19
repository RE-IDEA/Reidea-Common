
export interface BaseButtonProps {
    onClick?: () => void;
    text?: string;
    autoAdjustFontSize?: boolean;
    fontSize?: number;
    textLineHeight?: number;
    bold?:boolean;
    fontSizeOffset?: number;

    isMobile?: boolean;

    width?: string;
    height?: string;
    color?: string;
    px?: number;
    py?: number;
    boxShadow?:string;

    position?: "relative" | "absolute" | "fixed" | "static" | "sticky"
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;

    border?: string;
    borderRadius?: string;
    backgroundColor?:string;
    borderTop?: string;
    selectedBorder?: string;
    selectedBorderTop?: string;

    selected?: boolean;
    selectedBackGroundColor?: string;
    selectedColor?: string;

    disabled?: boolean;
    loading?: boolean;
    loadingSize?: number;
}
