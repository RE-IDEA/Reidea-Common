import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Typography, Button, CircularProgress } from '@mui/material';
import { BaseButtonProps } from '../interface/base';

// 投稿ボタン
export const BaseButton: React.FC<BaseButtonProps> = (props) => {
    const {
        onClick,
        text="text",
        width,
        height,
        px=0.5, py=0.5,
        position, top, right, bottom, left,
        border,
        borderTop,
        selectedBorderTop,
        color,
        autoAdjustFontSize,
        fontSize,
        textLineHeight=1.2,
        borderRadius,
        boxShadow='none',
        backgroundColor="#383E86",
        loading,
        disabled,
        bold,
        loadingSize,
        selected,
        selectedBackGroundColor="#383E86",
        selectedColor,
        selectedBorder,
        fontSizeOffset
    } = props;

    const [local_fontSize, setLocalFontSize] = useState<number>(14);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        // フォントサイズの自動調整機能の実装
        if(autoAdjustFontSize){
            const handleResize = () => {
                if (buttonRef.current) {
                    const height = buttonRef.current.offsetHeight;
                    setLocalFontSize((height - py*8*2 -2));
                }
            };
            handleResize(); // 初回実行
            window.addEventListener('resize', handleResize); // ウィンドウサイズ変更時にも実行
        
            return () => {
                window.removeEventListener('resize', handleResize); // クリーンアップ
            };
        }
    }, [buttonRef, autoAdjustFontSize, py, text]);

    return (
        <>
            {/* 「もっと見る」ボタン */}
            <Button ref={buttonRef} variant='contained' disabled={disabled === true} size='large' sx={{ 
                position: position,
                top: top, right: right, bottom: bottom, left:left,
                padding: `${py*8}px ${px*8}px`,
                backgroundColor: selected ? (selectedBackGroundColor) : (backgroundColor ),
                width: width,
                height: height ?? "",
                border: selected ? (selectedBorder ?? undefined) : (border ?? undefined),
                borderTop: selected ? (selectedBorderTop ?? undefined) : (borderTop ?? undefined),
                borderRadius: borderRadius ?? '8px',
                boxShadow: boxShadow,
                '&:active': {
                    backgroundColor: selected ? (selectedBackGroundColor) : (backgroundColor ), // 押したときの色を変更
                    opacity: 0.9,
                    boxShadow: boxShadow,
                },
                '&:hover': {
                    backgroundColor: selected ? (selectedBackGroundColor) : (backgroundColor ), // hover時の色を変更
                    opacity: 0.9,
                    boxShadow: boxShadow,
                }
            }}
                onClick={() => { if(onClick) onClick() }}>
                {loading &&
                    <CircularProgress size={loadingSize} sx={{ marginRight: "10px", color: selected ? (selectedColor ?? "white") : (color ?? "white") }} color="inherit" />
                }
                <Typography sx={{ textTransform: "none", whiteSpace:"pre-wrap", lineHeight:textLineHeight, fontSize: (fontSize ?? local_fontSize) + (fontSizeOffset ?? 0), fontWeight: bold ? "bold" : undefined, color: selected ? (selectedColor ?? "white") : (color ?? "white") }}>
                    {text}
                </Typography>
            </Button>
        </>
    );
};
