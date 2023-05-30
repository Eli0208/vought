import { Box, Flex, Button, Text } from '@chakra-ui/react'
import React from 'react'
import cv from '../assets/compoundV.jpg'

export default function Supe() {
  return (
    <Box
        h='85%'
        w='100%'
    >
        <Flex
            w='100%'
            h='100%'
        >
            <Flex
                w='50%'
                h='100%'
                align='center'
                justifyContent='center'
            >
                <Flex
                    w='90%'
                    bgImage={cv}
                    h='50%'
                    backgroundSize='cover'
                    align='end'
                    justifyContent='center'
                >
                    <Button
                        bgColor='#FF0000'
                        my='5'
                    >
                        Read more
                    </Button>
                </Flex>
            </Flex>
            <Flex
                h='100%'
                w='50%'
                justifyContent='center'
                align='center'
                >
                <Box
                    textAlign='justify'
                >
                    <Text
                    fontSize='2rem'
                    textAlign='start'
                    mx='5'
                    >Want to be a supe?</Text>
                    <Text
                    mx='5'
                    fontSize='1rem'
                    >Welcome to Vought, where ordinary individuals transcend the boundaries of human limitations to become extraordinary superheroes. Our mission is to empower those with exceptional abilities, harness their potential, and guide them towards a brighter, safer world. With cutting-edge technology, rigorous training programs, and unparalleled support, we are the driving force behind the evolution of superhuman capabilities. Join us in shaping the future of heroism, as we unlock the extraordinary within and pave the way for a new generation of superheroes.</Text>
                </Box>
            </Flex>
        </Flex>
    </Box>
  )
}
