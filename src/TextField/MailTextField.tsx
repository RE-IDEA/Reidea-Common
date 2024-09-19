import React, { useEffect, useState } from 'react'; // React を明示的にインポートする
import { BaseTextField } from "./base/BaseTextField";
import { BaseTextFieldProps } from "./interface/base";


// メールアドレスの整合性を判定する。
const isValidEmail = (email: string): boolean => {
    // 簡単なメールアドレスの正規表現（簡易版）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const MailTextField: React.FC<BaseTextFieldProps> = (props) => {

    useEffect(() => {
        if(((props.value ?? "") as string).trim() === ""){
            if(props.setError) props.setError(false)
        }else{
            if(props.setError) props.setError(!isValidEmail(((props.value ?? "") as string)))
        }
    }, [props.value]);


    return(
        <BaseTextField {...props} error={props.error} errorText={props.errorText ?? 'メールアドレスの形式が正しくありません。例.example@domain.com'} />
    )
}