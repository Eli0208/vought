import { Box, Flex, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';
import { FaStepBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
  return (
    <Box
      h='85%'
    >
      <Flex
                justifyContent='space-between'
                alignContent='center'
                width='100%'
            >
                <Box
                    width='33.33%'
                    paddingLeft='1rem'
                >
                    <FaStepBackward size='2rem' onClick={() => navigate('/')}/>
                </Box>
                <Flex
                    width='33.33%'
                    justifyContent='center'
                >
                    <Text
                    fontSize='2rem'
                    >
                        Products
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
      </Flex>
      <Flex
        justifyContent='space-between'
        m='5'
        padding='5'
        wrap='wrap'
        height='85%'
        overflowY='auto'
        sx={{
            '&::-webkit-scrollbar': {
              width: '.5rem',
            },
            '&::-webkit-scrollbar-track': {
              background: '#333333',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#001A3D',
              borderRadius: '3px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: '#555',
            },
          }}
    >
        {products != null ?
            products.map(product => (
            <Box
                width='22vw'
                my='5'
                key={product._id}
            >
                <ProductCard product={product}/>
            </Box>))
        : 'no product available'}
      </Flex>
    </Box>
  )
}
