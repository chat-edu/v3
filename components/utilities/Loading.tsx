import React from 'react';

import {Skeleton, SkeletonProps} from "@chakra-ui/react";

interface Props extends SkeletonProps {
    loading: boolean;
    children: React.ReactNode | React.ReactNode[];
}
const Loading: React.FC<Props> = ({ loading, children, ...rest}) => {
    if(loading) {
        return (
            <Skeleton {...rest} />
        )
    }

    return (children);
};

export default Loading;
