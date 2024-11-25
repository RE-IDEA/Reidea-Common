import { ReactElement } from "react";

export interface BaseMessageProps {
    user_id?: string
    user_name?: string;
    profile_image_name_path?: string;
    profile_image_uri?: string;
    isOnline?: boolean;
    display_user?: boolean;
    onClick_user?: () => void;
    image_name?: string;
    image_maxWidth?: string | number;

    message?:string;
    message_max_width: number;
    createdAtString?: string;
    viewed?: boolean;
    left?: boolean;
    

    fontSize?: number;
    bgColor?: string;
    color?: string;

}
