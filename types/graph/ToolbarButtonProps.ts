import {IconType} from "react-icons";

export interface ToolbarButtonProps {
    icon: IconType,
    onClick: () => void,
    tooltip: string,
    isLoading?: boolean
    isDisabled?: boolean
}