import React from 'react'

import {Card, Flex, Heading, HStack, Image} from '@chakra-ui/react'

import Link from "next/link";

import AuthButton from '@/components/layout/navbar/AuthButton'
import ColorModeToggle from "@/components/layout/navbar/ColorModeToggle";

export const navbarHeight = 80;
export const mobileNavbarHeight = 60;

const Navbar: React.FC = () => {
  return (
      <Card
        p={2}
        rounded={'none'}
        h={{
            base: `${mobileNavbarHeight}px`,
            md: `${navbarHeight}px`
        }}
        display={'flex'}
        justifyContent={'center'}
      >
        <Flex
            alignItems="center"
            w='100%'
            bg='navbar.500'
            rounded='md'
            px={{
                base: 2,
                md: 4
            }}
            gap={8}
            justifyContent={'space-between'}
        >
            <Link href={'/'}>
                <HStack
                    spacing={4}
                >
                    <Image
                        src={"/logo.png"}
                        boxSize={10}
                        alt={"Rabbithole Logo"}
                    />
                    <Heading
                        size='md'
                        color='brand.500'
                    >
                        Rabbithole
                    </Heading>
                </HStack>
            </Link>
            <HStack>
                <AuthButton />
                <ColorModeToggle />
            </HStack>
        </Flex>
      </Card>
  )
}

export default Navbar