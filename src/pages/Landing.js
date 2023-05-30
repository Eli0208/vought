import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import seven from '../assets/the_seven.jpg'
import { useNavigate } from 'react-router-dom'
import News from '../components/News';
import About from '../components/About';
import Supe from '../components/Supe';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <Box
      h='100%'
    >
      <About/>
      <News/>
      <Flex
      h='85%'
      >
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
            >Support your heroes!</Text>
            <Text
            mx='5'
              fontSize='1rem'
            >Introducing Vought Merch: Join the elite and power up your wardrobe with our exclusive line of merchandise that celebrates The Seven! Show your unwavering support for the mightiest superheroes with stylish t-shirts, trendy hoodies, fashionable accessories, and more. By owning Vought merch, you become part of an exclusive community, displaying your allegiance proudly and connecting with fellow fans. Crafted with top-notch quality, our merchandise combines fashion and superpowers, ensuring exceptional comfort and durability. Not only will you look great, but your purchase also directly supports The Seven and their mission to protect the world. Don't miss out on limited editions and rare designs that make for collectible treasures. Visit our website or Vought store today and be part of something extraordinary – support The Seven and showcase your devotion in style.</Text>
          </Box>
        </Flex>
        <Flex
          w='50%'
          h='100%'
          align='center'
          justifyContent='center'
        >
            <Flex
              w='90%'
              bgImage={seven}
              h='50%'
              backgroundSize='cover'
              align='end'
              justifyContent='center'
            >
              <Button
                mb='5'
                bgColor='#FF0000'
                onClick={() => navigate('/products')}
              >
                Shop Now!
              </Button>
            </Flex>
        </Flex>
      </Flex>
      <Supe/>
    </Box>
  )
}
