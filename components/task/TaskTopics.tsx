import React from 'react';
import {Topic} from "@/types/graph/Topic";
import {Box, HStack, Text, VStack} from "@chakra-ui/react";

interface Props {
    topics: Topic[]
}

const TaskTopics: React.FC<Props> = ({ topics}) => {
    return (
       <VStack>
           {
                topics.map((topic, index) => (
                     <HStack
                        key={topic.id}
                        w={'100%'}
                        justifyContent={'space-between'}
                     >
                         <Text>
                            {index + 1}) {topic.name}
                         </Text>
                         <Box
                            boxSize={8}
                            rounded={'full'}
                            bg={'brand.500'}
                         />
                     </HStack>
                ))
           }
       </VStack>
    );
};

export default TaskTopics;
