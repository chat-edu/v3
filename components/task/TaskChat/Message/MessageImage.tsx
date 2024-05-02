import React from 'react';
import {Image} from "@chakra-ui/react";

interface Props {
    src: string
}

const MessageImage: React.FC<Props> = ({ src }) => {
    return (
        <Image
            src={src}
            h={'100px'}
            rounded={'md'}
            bg={'white'}
            alt={'message image'}
        />
    );
};

export default MessageImage;
