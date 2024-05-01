import React from 'react';

import {Button} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

import useDeleteMedia from "@/hooks/graphMedia/useDeleteMedia";

import {GraphMedia} from "@/types/graph/GraphMedia";

interface Props {
    media: GraphMedia
}

const DeleteMediaButton: React.FC<Props> = ({ media }) => {

    const { onDelete } = useDeleteMedia(media);

    return (
        <Button
            colorScheme={'red'}
            onClick={onDelete}
            variant={'outline'}
            leftIcon={<DeleteIcon />}
        >
            Delete
        </Button>
    );
};

export default DeleteMediaButton;
