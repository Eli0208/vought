import { Box, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard';

export default function Products() {
    const [products, setProducts] = useState();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/`)
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
  return (
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
  )
}
