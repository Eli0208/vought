import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FaCartPlus, FaHistory, FaStore } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

export default function SellerDashboard() {
    const navigate = useNavigate()
  return (
    <Flex
        justifyContent='center'
        width='100%'
        height='90%'
    >
        <Box
            mt='5'
        >
            <Flex
                justifyContent='center'
            >
                <Text
                    fontSize='2rem'
                > 
                    Seller's Dashboard
                </Text>
            </Flex>
            <Flex
                mt = '10%'
            >
                <Box
                    mx='20'
                    onClick = {()=> navigate('/additem')}
                >
                    <FaCartPlus size='15rem' />
                    <Flex
                        justifyContent='center'
                    >
                        <Text>Add Item</Text>
                    </Flex>
                </Box>
                <Box
                    mx='20'
                    onClick = {()=> navigate('/viewproducts')}
                >
                    <FaStore size='15rem'/>
                    <Flex
                        justifyContent='center'
                    >
                        <Text>View Item</Text>
                    </Flex>
                </Box>
                <Box
                    mx='20'
                    onClick = {()=> navigate('/orderhistory')}
                >
                    <FaHistory size='15rem'/>
                    <Flex
                        justifyContent='center'
                    >
                        <Text>Orders</Text>
                    </Flex>
                </Box>
            </Flex>
            
        </Box>
    </Flex>
  )
}
