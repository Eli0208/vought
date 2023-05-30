import { Box, Button, Flex, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaStepBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Orders({token}) {
    const [orders, setOrder] = useState();
    const [userOrders, setUserOrders] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/users/allorders`,{
            method: 'POST',
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setOrder(data))
    },[])

    console.log(orders)
  return (
    <Flex
        justifyContent='center'
    >
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
                    <Table variant="simple" colorScheme='#FF0000'>
                        <Thead>
                            <Tr>
                                <Th>User ID</Th>
                                <Th>Orders Quantity</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                        {orders.map(order => 
                            <Tr key={order.userId}>
                                <Td>{order.userId}</Td> 
                                <Td>{order.orders.length}</Td>
                                <Td>
                                    <Button
                                        bgColor='#FF0000'
                                        onClick={() => {
                                            onOpen();
                                            setUserOrders(order.orders);
                                        }}
                                    >
                                        View Orders
                                    </Button>
                                </Td>   
                            </Tr>
                        )}
                            
                        </Tbody>
                    </Table> :
                    <Text>No Product Listings available</Text>
                }
            </Box>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose} size='6xl'>
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent >
          <ModalHeader>Modal Title</ModalHeader>
          <ModalBody>
          { userOrders ?
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
                        {userOrders.map(order => (
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
                                <Td>${order.totalAmount}</Td>
                                
                            </Tr>
                        ))}
                            
                        </Tbody>
                        </Table> :
                        <Text>No Product Listings available</Text>
                    }
          </ModalBody>

          <ModalFooter>
            <Button 
                bgColor='#FF0000'
                mr={3} 
                onClick={() =>{
                    onClose();
                    setUserOrders([])
                }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
