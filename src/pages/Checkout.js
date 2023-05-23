import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ph from '../assets/placeholder.jpg'
import Swal from 'sweetalert2'

export default function Checkout({token}) {
    const {productId} = useParams();
    const [item, setItem] = useState();
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setItem(data));
    },[])

    const handleMinus = () => {
        if(quantity != 0){
            setQuantity(quantity - 1);
        }
    }

    const placeOrder = () =>{
        fetch(`${process.env.REACT_APP_API_URL}/users/checkout`, {
            method: "POST",
            headers: {
                Authorization : `Bearer ${token}`,
                "Content-type" : "application/json"
            },
            body: JSON.stringify([{
                productId : productId,
                quantity: quantity
            }])
        })
        .then(res => res.json())
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: 'Successfully placed an order',
                text: 'Order is now placed, package will arrive in 2-3 days',
                confirmButtonText: 'OKAY!',
              }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/products')
                }
            })
        })
    }

  return (
    <Flex
        justifyContent='center'
        align='center'
        height='90%'
    >
        <Box
            width='60%'
        >
            <Box
                mx='5'
                padding='5'
                border='1px solid #C0C0C0'
                borderRadius='lg'
            >
                <Flex>
                    <Text
                        width='30%'
                    >
                        Customer's Name:
                    </Text>
                    <Text
                        width='70%'
                    >
                        placeholder
                    </Text>
                </Flex>
                <Flex>
                    <Text
                        width='30%'
                    >
                        Mobile number:
                    </Text>
                    <Text
                        width='70%'
                    >
                        12344567788
                    </Text>
                </Flex>
                <Flex>
                    <Text
                        width='30%'
                    >
                        Customer's Address:
                    </Text>
                    <Text
                        width='70%'
                    >
                        #666 placeholder st, brgy place, holder, placeholder, 66666
                    </Text>
                </Flex>
            </Box>
            <Box
                mt='5'
                mx='5'
                padding='5'
                border='1px solid #C0C0C0'
                borderRadius='lg'
                
                >
                <Flex
                    width='100%'
                    align='center'
                >
                    <Image src={ph} width='25%' />
                    {item &&
                    <Box
                        width='60%'
                    >
                        <Flex
                            m='1'
                        >
                            <Text
                                width='50%'
                            >
                                Product ID:
                            </Text>
                            <Text
                                width='50%'
                            >
                                {item._id}
                            </Text>
                        </Flex>
                        <Flex
                            m='1'
                        >
                            <Text
                                width='50%'
                            >
                                Product Name:
                            </Text>
                            <Text
                                width='50%'
                            >
                                {item.name}
                            </Text>
                        </Flex>
                    </Box>}
                    <Flex
                        align='center'
                    >
                        <Button
                            bgColor='#FF0000'
                            onClick={() => setQuantity(quantity + 1)}
                        >+</Button>
                        <Text my={2} mx={4} alignItems='center'>{quantity}</Text>
                        <Button
                            bgColor='#FF0000'
                            onClick={() => handleMinus()}
                        >-</Button>
                    </Flex>
                </Flex>
            </Box>
        </Box>
        {item &&
        <Box
            width='30%'
        >
            <Box
                    mx='5'
                    padding='5'
                    border='1px solid #C0C0C0'
                    borderRadius='lg'
                    width='100%'
            >
                <Box>
                    <Text fontSize='1.3rem'>
                        Order Summary:
                    </Text>
                </Box>
                <Flex>
                    <Box
                        width='50%'
                    >
                        <Text>
                            Price: 
                        </Text>
                    </Box>
                    <Box
                        width='50%'
                    >
                        <Text>
                            ${item.price}
                        </Text>
                    </Box>
                </Flex>
                <Flex>
                    <Box
                        width='50%'
                    >
                        <Text>
                            Quantity: 
                        </Text>
                    </Box>
                    <Box
                        width='50%'
                    >
                        <Text>
                            {quantity}
                        </Text>
                    </Box>
                </Flex>
                <Flex>
                    <Box
                        width='50%'
                    >
                        <Text>
                            Total: 
                        </Text>
                    </Box>
                    <Box
                        width='50%'
                    >
                        <Text>
                            ${item.price * quantity}
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Button
                mt='3'
                mx='5'
                width='100%'
                bgColor='#FF0000'
                onClick={() => placeOrder()}
            >Place Order</Button>
        </Box>}
    </Flex>
  )
}
