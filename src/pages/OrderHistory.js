import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
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
        align='center'
        width='100%'
        justifyContent='center'
    >
        <Flex
        width='100%'
        justifyContent='center'
        >
            <Text
                fontSize='2rem'
            >Order History</Text>
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
