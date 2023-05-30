import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { FaBackward, FaStepBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function RetrieveAllProducts({token}) {
    const [items , setItems] = useState();
    const navigate = useNavigate();
    useEffect(()=>{
          fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
            method: "GET",
            headers: {
                Authorization : `Bearer ${token}`
            }
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setItems(data)
          })
      },[])
  return (
    <Flex
        width='100%'
        justifyContent='center'
        h='75%'
    >
        <Box
            my='1rem'
            h='100%'
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
                        Your Product Listings
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
            </Flex>
            
            <Flex
                justifyContent='center'
                h='94%'
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
                { items ?
                    <Table variant="striped" colorScheme='#FF0000'>
                        <Thead>
                            <Tr>
                                <Th>Product ID</Th>
                                <Th>Product Name</Th>
                                <Th>Description</Th>
                                <Th>Price</Th>
                                <Th>Quantity</Th>
                                <Th>Availability</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {items.map(item => (
                            <Tr key={item._id}>
                                <Td>{item._id}</Td>
                                <Td>{item.name}</Td>
                                <Td>{item.description}</Td>
                                <Td>{item.price}</Td>
                                <Td>{item.quantity}</Td>
                                <Td>{item.isActive ? 'Available' : 'Unavailable'}</Td>
                                <Td>
                                    <Button
                                        bgColor='#FF0000'
                                        onClick={() => navigate(`/updateitem/${item._id}`)}
                                        >View</Button>
                                </Td>
                            </Tr>
                        ))}
                            
                        </Tbody>
                        </Table> :
                        <Text>No Product Listings available</Text>
                    }
            </Flex>
        </Box>
    </Flex>
  )
}
