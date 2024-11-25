export interface LoadingImageProps {
    loading: boolean;
    image_base64?: string;
    image_name?: string;
    display_progress?: boolean;
    progress?: number;
    progressText?: string;
    display_close?: boolean;
    onClose?: () => void;
    
    width?: number;
    height?: number;
    bgcolor?: string;
    borderRadius?: number;
    border?: string;
    fontSize?: number;
    loadingColor?: string;
    loadingSize?: number;
    closeFontSize?: number;
    closeBgcolor?: string;
    closeColor?: string;
}