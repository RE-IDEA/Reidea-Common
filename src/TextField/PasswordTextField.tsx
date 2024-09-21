import React, { useEffect, useState } from 'react'; // React を明示的にインポートする
import { BaseTextField } from "./base/BaseTextField";
import { BaseTextFieldProps } from "./interface/base";

// BaseTextFieldProps を拡張して新しい prop を追加
interface PasswordTextFieldProps extends BaseTextFieldProps {
    isValidPassword?: (password: string) => boolean;
}

// パスワードの強度を判定する（特殊文字は不要）
const isStrongPassword = (password: string): boolean => {
    // 少なくとも8文字で、大文字、小文字、数字を含む
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return strongPasswordRegex.test(password);
};

export const PasswordTextField: React.FC<PasswordTextFieldProps> = (props) => {
    useEffect(() => {
        const password = (props.value ?? "") as string;
        if (password.trim() === "") {
            if (props.setError) props.setError(false);
        } else {
            if (props.setError){
                if(props.isValidPassword) props.setError(props.isValidPassword(password));
                else props.setError(!isStrongPassword(password));
            }
        }
    }, [props.value, props.setError]);

    return (
        <BaseTextField 
            {...props} 
            type="password"
            error={props.error} 
            errorText={props.errorText ?? 'パスワードは8文字以上で、大文字、小文字、数字を含む必要があります。'} 
        />
    );
};