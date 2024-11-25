import React, { useState, useEffect, useRef } from 'react';
import { InputAdornment, Grid, IconButton, Typography, Button, Stack, TextField, Card, Avatar, styled, Box } from '@mui/material';
import { BaseTextFieldProps } from '../interface/base';


type Part = {
    type: string;
    content: string;
};

const splitTextWithTags = (text: string): Part[] => {
    // タグ全体を確実に取得するための正規表現
    const regex = /\[\[(\w+):([^\[\]]*)\]\]|([^\[\]]+)/g;
    const result: Part[] = [];
    
    let match;
    let lastIndex = 0;
    
    while ((match = regex.exec(text)) !== null) {
        // テキストの欠落がないか確認
        if (match.index > lastIndex) {
            // タグとタグの間にテキストがある場合
            result.push({
                type: 'text',
                content: text.slice(lastIndex, match.index)
            });
        }
        
        if (match[1] && match[2]) {
            // タグの場合
            result.push({
                type: match[1],
                content: match[2]
            });
        } else if (match[3]) {
            // テキストの場合
            result.push({
                type: 'text',
                content: match[3]
            });
        }
        
        lastIndex = regex.lastIndex;
    }
    
    // 最後にテキストが残っている場合
    if (lastIndex < text.length) {
        result.push({
            type: 'text',
            content: text.slice(lastIndex)
        });
    }
    
    return result;
};


// 特定のアイテムをドラッグ&ドロップで移動させることのできる特別なtextfield
export const BaseDragObjTextField: React.FC<any> = (props) => {
    const { } = props;


    const [text, setText] = useState<string>("hello[[img:{value: imbox, width: 100, height: 200}]]world")

    const object = <Box width={50} height={50} bgcolor={"black"} />
    const splitTextWithObj = (text: string) => {
        const regex = /(.*?)(\[\[obj:[^\]]*\]\])|(.+$)/g;
        const result: { type: 'text' | 'obj'; content: string; }[] = [];

        let match;
        while ((match = regex.exec(text)) !== null) {
            if (match[1]) {  // テキスト部分（オブジェクトの前）
                result.push({ type: 'text', content: match[1] });
            }
            if (match[2]) {  // [[obj:...]]部分
                result.push({ type: 'obj', content: match[2] });
            }
            if (match[3]) {  // 最後のテキスト部分
                result.push({ type: 'text', content: match[3] });
            }
        }
        
        return result;
    };
    console.log(splitTextWithObj(text))
    
    return(
        <Stack direction={"column"} sx={{}} >
            {text}
            object
        </Stack>
    )
    
}

