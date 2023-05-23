import { Box, Button, Flex, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ph from '../assets/placeholder.jpg'
import { FaCartPlus } from 'react-icons/fa';

export default function ViewItem() {
    const {productId} = useParams();
    const [item, setItem] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setItem(data));
    },[])
  return (
    <Flex
        height='80%'
        alignContent='center'
    >
        {item &&
        <>
            <Flex
                width='50%'
                justifyContent='center'
                align='center'
                height='100%'
            >
                <Box
                width='80%'
                >
                    <Image 
                        src={ph}
                        width='100%'
                    />
                    <Flex
                        justifyContent='center'
                    >
                        <Button
                            width='25%'
                            m='5'
                            bgColor='#FF0000'
                            onClick={() => navigate(`/checkout/${productId}`)}
                        >Check out</Button>
                        <Button
                            width='25%'
                            m='5'
                            bgColor='#FF0000'
                        ><FaCartPlus/>Add to cart</Button>
                    </Flex>
                </Box>
            </Flex>
            <Flex
                width='50%'
                alignItems='center'
                justifyContent='center'
            >
                <Box
                    width='80%'
                    fontSize='1.3rem'
                >
                    <Flex
                        width='100%'
                    >
                        <Box
                            width='50%'
                        >
                            <Text>Product ID:</Text>
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Text>{item._id}</Text>
                        </Box>
                    </Flex>
                    <Flex
                        width='100%'
                    >
                        <Box
                            width='50%'
                        >
                            <Text>Product Name:</Text>
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Text>{item.name}</Text>
                        </Box>
                    </Flex>
                    <Flex
                        width='100%'
                    >
                        <Box
                            width='50%'
                        >
                            <Text>Product Price:</Text>
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Text>{item.price}</Text>
                        </Box>
                    </Flex>
                    <Flex
                        width='100%'
                    >
                        <Box
                            width='50%'
                        >
                            <Text>Stocks:</Text>
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Text>{item.quantity}</Text>
                        </Box>
                    </Flex>
                    <Flex
                        width='100%'
                    >
                        <Box
                            width='50%'
                        >
                            <Text>Description:</Text>
                        </Box>
                        <Box
                            width='50%'
                        >
                            <Text>{item.description}</Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        </>
        }
    </Flex>
  )
}
