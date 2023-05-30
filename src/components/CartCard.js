import {
    Box, 
    Button, 
    Flex, 
    Image, 
    Input, 
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
import pl from '../assets/placeholder.jpg'

export default function CartCard({item, setId}) {
    const [quantity, setQuantity] = useState(item.quantity);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
            fetch(`${process.env.REACT_APP_API_URL}/cart/${item._id}`, {
                method: "PUT",
                headers:{
                    "Content-type" : "application/json"
                },
                body : JSON.stringify({
                    quantity : quantity,
                    subTotal: quantity * item.price
                })
            })
            .then(res => res.json())
            .then(data => {
                
            })
        
    },[quantity])

    return (
    <Flex
        mt='2'
        h='37%'
        w='100%'
        border='1px solid #C0C0C0'
        borderRadius='1rem'
        p='3'
        justifyContent='space-between'
    >
        <Flex
            h="100%"
        >
            <Image 
            mx='5'
            src={item.image ? `${process.env.REACT_APP_API_URL}/${item.image}`: pl }
            boxSize="10.5rem"
            objectFit="cover"
            borderRadius="0.5rem"
            />
            <Box>
                <Text>Product ID: {item.productId}</Text>
                <Text>Product name: {item.productName}</Text>
                <Text>Price: ${item.price}</Text>
                <Flex
                align='center'
                mt='3'
                >
                    <Text mr='3'>Quantity: </Text>
                <Button
                    bgColor='#FF0000'
                    onClick={() => {
                        if(quantity > 1){
                            setQuantity(quantity - 1)
                        }
                    }}
                    >-</Button>
                <Input
                    type='number'
                    value={quantity}
                    onChange={e => setQuantity(e.target.value)}
                    width='3.5rem'
                    textAlign='center'
                    mx='1'
                />
                <Button
                    bgColor='#FF0000'
                    onClick={() => setQuantity(quantity + 1)}
                    >+</Button>
            </Flex>
                
            </Box>
        </Flex>
        <Box
            width='10%'
        >
            <Text>
                Subtotal: ${quantity * item.price}
            </Text>
            <Button
                bgColor='#FF0000'
                onClick={() => setId(item._id)}
            >Remove</Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent >
          <ModalHeader>Success!</ModalHeader>
          <ModalBody>
            Cart updated!
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
    </Flex>
  )
}
