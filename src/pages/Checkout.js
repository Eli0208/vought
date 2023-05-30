import { Box, Flex, Image, Text, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ph from '../assets/placeholder.jpg'
import Swal from 'sweetalert2'
import { FaStepBackward } from 'react-icons/fa'

export default function Checkout({token}) {
    const {productId} = useParams();
    const [item, setItem] = useState();
    const [quantity, setQuantity] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setItem(data));
    },[])

    const handleMinus = () => {
        if(quantity != 1){
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
    <Box
        height='90%'
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
        <Flex
                justifyContent='space-between'
                alignContent='center'
                width='100%'
            >
                <Box
                    width='33.33%'
                    paddingLeft='1rem'
                >
                    <FaStepBackward size='2rem' onClick={() => navigate(`/viewitem/${productId}`)}/>
                </Box>
                <Flex
                    width='33.33%'
                    justifyContent='center'
                >
                    <Text
                    fontSize='2rem'
                    >
                        Checkout
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
      </Flex>
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
                    bgColor='#333333'
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
                    bgColor='#333333'
                    >
                    <Flex
                        width='100%'
                        align='center'
                    >
                        
                        {item &&<>
                        <Image src={ `${process.env.REACT_APP_API_URL}/${item.image}`} width='25%' />
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
                        </Box>
                        </>
                        }
                        <Flex
                            align='center'
                        >
                            <Button
                                bgColor='#FF0000'
                                onClick={() => handleMinus()}
                            >-</Button>
                            <Text my={2} mx={4} alignItems='center'>{quantity}</Text>
                            <Button
                                bgColor='#FF0000'
                                onClick={() => setQuantity(quantity + 1)}
                            >+</Button>
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
                        bgColor='#333333'
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
    </Box>
  )
}
