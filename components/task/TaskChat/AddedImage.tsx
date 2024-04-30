import React from 'react';

import {Box, IconButton, Image} from "@chakra-ui/react";
import {CloseIcon} from "@chakra-ui/icons";

interface Props {
    image: string;
    removeImage: (image: string) => void;
}

const AddedImage: React.FC<Props> = ({ image, removeImage }) => {
    return (
        <Box
            boxSize={20}
            position={'relative'}
            rounded={'md'}
            borderWidth={1}
            borderColor={'gray.200'}
        >
            <Image
                src={image}
                alt={'Added Image'}
                objectFit={'cover'}
                w={'full'}
                h={'full'}
                rounded={'md'}
            />
            <IconButton
                aria-label={'Remove Image'}
                position={'absolute'}
                top={-2}
                right={-2}
                onClick={() => removeImage(image)}
                rounded={'full'}
                bg={'gray.100'}
                color={'gray.600'}
                size={'xs'}
                icon={
                    <CloseIcon
                        boxSize={2}
                    />
                }
            />
        </Box>
    );
};

export default AddedImage;
