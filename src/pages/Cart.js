import { 
    Box, 
    Flex,
    Button, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay, 
    Text,
    useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import CartCard from '../components/CartCard'
import { FaStepBackward } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Cart({token}) {
    const [cart, setCart] = useState([]);
    const [id, setId] = useState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [message, setMessage] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/cart`,{
            method:"GET",
            headers: {
                Authorization : `Bearer ${token}`,
            }
        })
        .then(res => res.json())
        .then(data =>{
            setCart(data)
        })
    },[id])

    useEffect(() => {
        if(id != null){
            fetch(`${process.env.REACT_APP_API_URL}/cart/${id}`, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                setMessage('Successfully removed item from your cart')
                onOpen();
            })
        }
    },[id])
  return (
    <Box
    h='85%'
    w='100%'
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
                        Cart
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
      </Flex>
        <Flex
            mt='3'
            w='100%'
            h='85%'
            justifyContent='space-around'
        >   
            <Box
                width='85%'
                h='100%'
            >
                {
                cart.length != 0 ?
                cart.map(item => (
                   <CartCard key={item._id} item={item} setId={setId}/> 
                )):
                <Flex
                    w='100%'
                    justifyContent='center'
                >
                    <Text>
                        No items added to cart
                    </Text>
                </Flex>
                }   
                <Flex
                    w='100%'
                    justifyContent='end'
                    p='1rem'
                >   
                    {cart.length != 0 &&
                    <Button
                        bgColor='#FF0000'
                    >Check Out</Button>}
                </Flex>
            </Box>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent >
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>
            {message}
          </ModalBody>

          <ModalFooter>
            <Button 
                bgColor='#FF0000'
                mr={3} 
                onClick={() =>{
                    onClose();
                }}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
