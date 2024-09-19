import { StackProps } from "@mui/material";
import { ReactNode } from "react";


// アニメーションの定義
export const slide_variants = {
    exit: {x:0, opacity: 0 },
    center: {x:0, opacity: 1 },
    left: { x: "-100%", opacity: 1 },
    right: { x: "100%", opacity: 1 },
};


export interface BaseSlideAnimation {
    key:string
    display: boolean;
    duration?: number;
    children?: ReactNode;
    // 初期状態をどこにしておくか
    initial?: keyof typeof slide_variants;
    // enterの時のアニメーションをどうするか
    animate?: keyof typeof slide_variants;
    // exitの時のアニメーションをどうするか
    exit?: keyof typeof slide_variants;
}

