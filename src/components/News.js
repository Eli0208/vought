import { Box, Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import sevenNews from '../assets/The_Seven_Infobox.webp'

export default function News() {
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
                    bgImage={sevenNews}
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
                    >News</Text>
                    <Text
                    mx='5'
                    fontSize='1rem'
                    >Welcome to our website dedicated to all the latest news and updates about The Seven and Vought! As your trusted source for everything related to the dynamic world of superheroes, we bring you exclusive coverage on the thrilling exploits of The Seven, the elite group of super-powered individuals managed by the renowned corporation Vought International. Stay up-to-date with breaking stories on their heroic missions, jaw-dropping confrontations, and the intricate webs of intrigue that surround them. With our in-depth analysis and behind-the-scenes glimpses into the lives of these extraordinary individuals, we strive to provide you with an immersive experience that explores the darker side of heroism. Join us as we unravel the secrets, unveil the scandals, and uncover the truth behind The Seven and Vought's captivating universe.</Text>
                </Box>
            </Flex>
        </Flex>
    </Box>
  )
}
