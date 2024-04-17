import React from 'react';

import {
    HStack,
    Image, Skeleton,
    Text,
    TextProps,
    Tooltip,
    useColorModeValue,
    VStack
} from "@chakra-ui/react";

import useUser from "@/hooks/queries/users/useUser";

import {User} from "@/types/User";

interface Props extends TextProps {
    id: User['id']
}

const UsernameText: React.FC<Props> = ({ id,  ...rest }) => {

    const { user, loading } = useUser(id);

    const hoverColor = useColorModeValue('blackAlpha.200', 'whiteAlpha.200');

    const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.stopPropagation();
    }

    if(loading || !user) {
        return (
            <Skeleton
                rounded={'md'}
                h={6}
                w={20}
            />
        )
    }

    return (
        <HStack
            spacing={1}
        >
            <Tooltip
                label={
                    <UsernameTooltip
                        user={user}
                    />
                }
            >
                <Text
                    fontWeight={'semibold'}
                    px={0.5}
                    as={'span'}
                    _hover={{
                        bg: hoverColor
                    }}
                    {...rest}
                    onClick={onClick}
                    rounded={'md'}
                    cursor={'pointer'}
                    transition={'all 0.2s ease-in-out'}
                    fontSize={{
                        base: 'sm',
                        md: 'md'
                    }}
                >
                    @{user.username}
                </Text>
            </Tooltip>
        </HStack>
    );
};

interface UsernameTooltipProps {
    user: User
}

const UsernameTooltip: React.FC<UsernameTooltipProps> = ({ user }) => {

        return (
            <HStack>
                <Image
                    src={user.profilePictureUrl}
                    boxSize={12}
                    alt={user.username}
                />
                <VStack
                    alignItems={'flex-start'}
                    spacing={0}
                >
                    <Text
                        fontWeight={'bold'}
                        fontSize={'lg'}
                    >
                        {user.name}
                    </Text>
                    <Text
                        opacity={0.75}
                        fontSize={'sm'}
                    >
                        @{user.username}
                    </Text>
                </VStack>
            </HStack>
        )
}

export default UsernameText;
