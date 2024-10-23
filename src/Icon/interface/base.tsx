

export interface BaseIconProps {

    size: number;
    user_name?: string;
    onClick?: () => void;

    image_name_path?: string | null | undefined;
    image_uri?: string | null | undefined;
    online?: boolean;
}