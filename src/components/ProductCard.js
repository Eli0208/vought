import { Box, Button, Flex, Image, Modal, ModalContent, ModalFooter, ModalOverlay, Text, ModalBody, ModalHeader, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import ph from '../assets/placeholder.jpg'
import { Link, useNavigate } from 'react-router-dom'

function ProductCard({product}) {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      minW='22vw'
      
    >
      <Box
      minW='100%'
      >
        <Box
          height="200px"
        >
          <Image 
          onClick={()=>{
            onOpen();
          }}
          src={product.image == null ? ph : `${process.env.REACT_APP_API_URL}/${product.image}`} 
          alt='' 
          objectFit="cover"
            height="100%"
            width="100%"
          />
        </Box>
        <Flex
          width='100%'
          justifyContent='space-between'
        >
          <Text
           onClick = {() => navigate(`/viewitem/${product._id}`)}
          >
            {product.name}
          </Text>
          <Text>
            ${product.price}
          </Text>
        </Flex>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay 
            bg='blackAlpha.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
        <ModalContent >
          <ModalHeader>{product.name}</ModalHeader>
          <ModalBody>
          <Image 
            src={product.image == null ? ph : `${process.env.REACT_APP_API_URL}/${product.image}`} 
            alt='' 
            objectFit="cover"
            height="100%"
            width="100%"
          />
                              
          </ModalBody>

          <ModalFooter>
          <Button 
                bgColor='#FF0000'
                mr={3} 
                onClick={() =>{
                  navigate(`/viewitem/${product._id}`)
                }}>
              View Details
            </Button>
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

export default ProductCard
