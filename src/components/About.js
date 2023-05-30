import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import tower from '../assets/voughttower.jpg'

export default function About() {
  return (
    <Box
        w='100%'
        h='85%'
    >
        <Flex
            my='5'
            w='100%'
            bgImage={tower}
            h='100%'
            backgroundSize='cover'
        >
            <Box
                bgColor='rgba(51, 51, 51, 0.8)'
                w='30%'
                h='35%'
                p='5'
                borderBottomRightRadius='1rem'
            >
                <Text
                    width='100%'
                    textAlign='justify'
                >
                Vought International is a prestigious and influential corporation at the forefront of the superhero industry. With a rich history spanning decades, Vought has played a pivotal role in managing and marketing some of the world's most renowned superheroes. Their commitment to innovation, public relations, and ensuring the safety of society has earned them a reputation as a powerhouse in the realm of superhuman abilities.
                </Text>
                <Button
                    bgColor='#FF0000'
                >
                    Learn more
                </Button>
            </Box>
        </Flex>
    </Box>
  )
}
