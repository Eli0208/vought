import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { FaStepBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory({token}) {
    const [orders, setOrders] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/orders`,{
            method: 'POST',
            headers:{
                Authorization : `Bearer ${token}`
            }
        })
        .then(res=>res.json())
        .then(data=>setOrders(data))
    },[])
  return (
    <Box
        height='90%'
        width='100%'
        justifyContent='center'
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
                        Orders
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
        </Flex>
        <Box
        h='90%'
        overflowY='auto'
        >
        { orders ?
                    <Table variant="striped" colorScheme='#FF0000'>
                        <Thead>
                            <Tr>
                                <Th>Order ID</Th>
                                <Th>ordered Date</Th>
                                <Th>Orders</Th>
                                <Th>Order Amount</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {orders.map(order => (
                            <Tr key={order._id}>
                                <Td>{order._id}</Td>
                                <Td>{order.purchasedOn}</Td>
                                <Td>
                                    <Thead>
                                        <Tr>
                                            <Th>Product ID</Th>
                                            <Th>Roduct name</Th>
                                            <Th>Quantity</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {order.product.map(product => (
                                            <Tr>
                                                <Td>{product.productId}</Td>
                                                <Td>{product.productName}</Td>
                                                <Td>{product.quantity}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Td>
                                <Td>{order.totalAmount}</Td>
                                
                            </Tr>
                        ))}
                            
                        </Tbody>
                        </Table> :
                        <Text>No Product Listings available</Text>
                    }
        </Box>
    </Box>
  )
}
