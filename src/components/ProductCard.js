import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import ph from '../assets/placeholder.jpg'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard({product}) {
  const navigate = useNavigate();
  return (
    <Flex>
      <Box
      >
        <Box>
          <Image src={ph} alt='' />
        </Box>
        <Flex
          width='100%'
          justifyContent='space-between'
        >
          <Text
           onClick = {() => navigate(`/viewitem/${product._id}`)}
          >
            {product.name}
          </Text>
          <Text>
            ${product.price}
          </Text>
        </Flex>
      </Box>
    </Flex>
  ) 
}

export default ProductCard
