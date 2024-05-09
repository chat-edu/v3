import React from 'react';

import {Button, Card, HStack, Input, Menu, MenuButton, MenuItem, MenuList, Skeleton, Text} from "@chakra-ui/react";
import {ChevronDownIcon} from "@chakra-ui/icons";

import useCreateTaskHome from "@/hooks/task/useCreateTaskHome";

const CreateTask = () => {

    const { task, setTask, selectedGraphId, setSelectedGraphId, onSubmit, graphs, graphsLoading, isSubmitting } = useCreateTaskHome();

    return (
        <Card
            w={'100%'}
            gap={4}
        >
            <Text
                fontSize={'xl'}
                fontWeight={'bold'}
            >
                Create Task
            </Text>
            {
                graphsLoading ? (
                    <Skeleton
                        h={'40px'}
                        w={'100%'}
                    />
                ) : (
                    <>
                        <HStack
                            w={'100%'}
                            alignItems={'end'}
                        >
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                    flexShrink={0}
                                >
                                    {
                                        selectedGraphId
                                            ? graphs.find(graph => graph.id === selectedGraphId)?.name
                                            : 'Select Subject'
                                    }
                                </MenuButton>
                                <MenuList>
                                    {
                                        graphs.map(graph => (
                                            <MenuItem
                                                key={graph.id}
                                                onClick={() => setSelectedGraphId(graph.id)}
                                            >
                                                {graph.name}
                                            </MenuItem>
                                        ))
                                    }
                                </MenuList>
                            </Menu>
                            <Input
                                placeholder={"What is your learning objective?"}
                                value={task}
                                onChange={(e) => setTask(e.target.value)}
                                focusBorderColor={'brand.500'}
                                variant={'outline'}
                            />
                        </HStack>
                        <Button
                            onClick={onSubmit}
                            isDisabled={selectedGraphId === null || task === ''}
                            isLoading={isSubmitting}
                            colorScheme={'brand'}
                            w={'100%'}
                        >
                            Create Task
                        </Button>
                    </>
                )
            }
        </Card>
    );
};

export default CreateTask;
