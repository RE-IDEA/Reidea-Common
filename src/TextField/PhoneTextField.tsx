import React, { useEffect, useState } from 'react'; // React を明示的にインポートする
import { BaseTextField } from "./base/BaseTextField";
import { BaseTextFieldProps } from "./interface/base";


// 電話番号の整合性を判定する
const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneNumberRegex = /^(\+?\d{1,4}[\s-])?(\(?\d{1,4}\)?[\s-]?)?\d{1,4}[\s-]?\d{1,4}[\s-]?\d{1,9}$/;
    return phoneNumberRegex.test(phoneNumber);
};

export const PhoneTextField: React.FC<BaseTextFieldProps> = (props) => {

    useEffect(() => {
        if(((props.value ?? "") as string).trim() === ""){
            if(props.setError) props.setError(false)
        }else{
            if(props.setError) props.setError(!isValidPhoneNumber(((props.value ?? "") as string)))
        }
    }, [props.value]);


    return(
        <BaseTextField {...props} error={props.error} errorText={props.errorText ?? '電話番号の形式が正しくありません。例.000-0000-0000'} />
    )
}