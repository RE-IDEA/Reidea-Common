import { CSSProperties } from "react";

export interface BaseAccordionProps {
    open?: boolean;
    summary: React.ReactNode;
    preview?: React.ReactNode;
    details: React.ReactNode;
    style_whole?: CSSProperties;
    style_summary?: CSSProperties;
    style_preview?: CSSProperties;
    style_details?: CSSProperties;
}
