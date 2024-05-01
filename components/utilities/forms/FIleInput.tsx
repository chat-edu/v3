import React, {useCallback, useEffect, useRef, useState} from 'react';

import {Box, Button, Icon, Text, useColorModeValue, useToast, VStack} from "@chakra-ui/react";

import {FileRejection, useDropzone} from "react-dropzone";
import {IconType} from "react-icons";

interface Props {
    accept?: string;
    setFile: (file: File) => void;
    text: string;
    icon: IconType,
    isDisabled?: boolean;
}

const FileInput: React.FC<Props> = ({ accept, setFile, text, icon, isDisabled }) => {

    const toast = useToast();

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles.length === 0) return;
        setFile(acceptedFiles[0]);
    }, [setFile]);

    const onError = useCallback((fileRejections: FileRejection[]) => {
        toast({
            title: 'Error',
            description: fileRejections[0].errors[0].message,
            status: 'error',
            duration: 2000,
            isClosable: true,
        })
    }, [toast])

    const {getRootProps} = useDropzone({
        onDrop,
        onDropRejected: onError,
        accept: {
            'application/pdf': ['.pdf'],
        },
        multiple: false,
    });

    const [isDragOver, setIsDragOver] = useState(false);

    useEffect(() => {
        const handleDragOver = (e: DragEvent) => {
            e.preventDefault();
            setIsDragOver(true);
        };

        const handleDragLeave = (e: DragEvent) => {
            e.preventDefault();
            setIsDragOver(false);
        };

        window.addEventListener('dragover', handleDragOver);
        window.addEventListener('dragleave', handleDragLeave);
        window.addEventListener('drop', handleDragLeave);

        return () => {
            window.removeEventListener('dragover', handleDragOver);
            window.removeEventListener('dragleave', handleDragLeave);
            window.removeEventListener('drop', handleDragLeave);
        };
    }, []);

    const dragBg = useColorModeValue('blackAlpha.200', 'whiteAlpha.400')

    const handleClick = () => inputRef.current?.click();

    return (
        <>
            {isDragOver && (
                <Box
                    {...getRootProps()}
                    position={'fixed'}
                    top={0}
                    bottom={0}
                    left={0}
                    right={0}
                    bg={dragBg}
                    zIndex={1000}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    <VStack>
                        <Icon
                            as={icon}
                            boxSize={16}
                        />
                        <Text
                            fontWeight={'bold'}
                            fontSize={'xl'}
                        >
                            Drop your file here...
                        </Text>
                    </VStack>
                </Box>
            )}
            <input
                type={'file'}
                hidden
                accept={accept}
                ref={inputRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0])
                    }
                }}
            />
            <Button
                onClick={handleClick}
                leftIcon={
                    <Icon as={icon} />
                }
                w={'100%'}
                variant={'outline'}
                border={'dashed'}
                whiteSpace={'nowrap'}
                overflow={'hidden'}
                textOverflow={'ellipsis'}
                isDisabled={isDisabled}
            >
                {text}
            </Button>
        </>
    );
};

export default FileInput;
