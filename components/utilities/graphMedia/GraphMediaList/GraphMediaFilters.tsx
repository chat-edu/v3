import React from 'react';
import {HStack, Tag, TagLabel, TagRightIcon} from "@chakra-ui/react";

import graphMediaFilters from "@/components/utilities/graphMedia/GraphMediaList/filters";

interface Props {
    currentFilter: string
    setFilter: (filter: string) => void
}


const GraphMediaFilters: React.FC<Props> = ({ currentFilter, setFilter}) => {
    return (
        <HStack>
            {
                graphMediaFilters.map((filter) => (
                    <Tag
                        size={'sm'}
                        key={filter.value}
                        variant={filter.value === currentFilter ? 'solid' : 'outline'}
                        colorScheme='brand'
                        cursor={'pointer'}
                        onClick={() => setFilter(filter.value)}
                        _hover={{
                            bg: 'brand.500',
                            color: 'white'
                        }}
                        transition={'all 0.2s ease-in-out'}
                    >
                        <TagLabel>{filter.text}</TagLabel>
                        {
                            filter.icon ? <TagRightIcon as={filter.icon} /> : null
                        }
                    </Tag>
                ))
            }
        </HStack>
    );
};

export default GraphMediaFilters;
