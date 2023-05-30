import { 
        Box, 
        Button, 
        Flex, 
        Image, 
        Modal, 
        ModalBody, 
        ModalContent, 
        ModalFooter, 
        ModalHeader, 
        ModalOverlay, 
        Text,
        useDisclosure
    } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ph from '../assets/placeholder.jpg'
import { FaCartPlus, FaStepBackward } from 'react-icons/fa';
import Swal from 'sweetalert2';

export default function ViewItem({token}) {
    const {productId} = useParams();
    const [item, setItem] = useState();
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setItem(data));
    },[])

    const addToCart = () => {
        fetch(`${process.env.REACT_APP_API_URL}/cart/`,{
            method: 'POST',
            headers : {
                Authorization : `Bearer ${token}`,
                "Content-type" : "application/json"
            },
            body: JSON.stringify({
                productId: item._id,
                productName: item.name,
                price: item.price,
                quantity: 1,
                subTotal: item.price,
                image: item.image
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data){
                onOpen()
            }
        })
    }
  return (
    <Box
        w='100%'
        h='80%'
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
                    <FaStepBackward size='2rem' onClick={() => navigate('/products')}/>
                </Box>
                <Flex
                    width='33.33%'
                    justifyContent='center'
                >
                    <Text
                    fontSize='2rem'
                    >
                        {item && item.name}
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
      </Flex>
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
                    align='center'
                    h='75%'
                    >
                        <Image 
                            src={item.image ? `${process.env.REACT_APP_API_URL}/${item.image}` : ph}
                            height='100%'
                        />
                        <Flex
                            justifyContent='center'
                        >
                            <Button
                                width='25%'
                                m='5'
                                bgColor='#FF0000'
                                onClick={() =>{ 
                                    token != null ?
                                    navigate(`/checkout/${productId}`):
                                    Swal.fire({
                                        icon: 'error',
                                        title: 'Check out is only available for registered user',
                                        text: 'Please Sign in to check items out',
                                        confirmButtonText: 'Proceed to sign in!',
                                        showCancelButton: true,
                                    }).then((result) => {
                                    if (result.isConfirmed) {
                                        navigate('/signin')
                                    }
                                    }) 
                                }}
                            >Check out</Button>
                            <Button
                                width='25%'
                                m='5'
                                bgColor='#FF0000'
                                onClick={() => addToCart()}
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
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent >
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>
            Added item to your cart
          </ModalBody>

          <ModalFooter>
            <Button 
                bgColor='#FF0000'
                mr={3} 
                onClick={() =>{
                    onClose();
                    navigate('/products')
                }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    
  )
}
