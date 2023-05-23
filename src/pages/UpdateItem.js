import {
    Box,
    Flex, 
    Text, 
    Input, 
    Textarea, 
    Image,
    Button,
    Select
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import ph from '../assets/placeholder.jpg'
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';

export default function UpdateItem({token, sellerId}) {
    const { productId } = useParams();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [stocks, setStocks] = useState('')
    const [item, setItem] = useState()
    const nameRef = useRef();
    const descRef = useRef();
    const pricRef = useRef();
    const stocRef = useRef();
    const actiRef = useRef();



    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`)
        .then(res => res.json())
        .then(data => setItem(data))
    },[])


    const updateItem = () => {
        if(nameRef.current.value == '' || descRef.current.value == '' || pricRef.current.value == '' || stocRef.current.value == ''){
            Swal.fire({
                icon: 'error',
                title: 'Please fill all fields',
                text: 'Please double check entries',
            })
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                method: "PUT",
                headers: {
                    Authorization : `Bearer ${token}`,
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    name: nameRef.current.value,
                    description: descRef.current.value,
                    price: pricRef.current.value,
                    quantity: stocRef.current.value,
                    isActive: actiRef.current.value
                })
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully added an Item!',
                    text: 'Item is now saved',
                    confirmButtonText: 'OKAY!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        
                    }
                }
                )
            })
        }
    }

  return (
    <Flex
        width ='100%'
        justifyContent='center'
        alignContent='center'
        mt='5%'
    >   
    {item &&
    <>
        <Flex
            width='50%'
            justifyContent='center'
        >
            <Box 
                width='80%'
                >
                    <Image src={ph} w='100%'/>
                    <Box
                        mt='1rem'
                    >
                        <Button
                            w='100%'
                            bgColor='#FF0000'
                        >Choose File</Button>
                    </Box>
            </Box>
        </Flex>
        <Flex
            width='50%'
            alignContent='center'
            justifyContent='center'
        >
            <Box
                width='80%'
            >
                <Flex>
                    <Text
                        fontSize='2rem'
                    >
                        Add an Item
                    </Text>
                </Flex>
                <Box>
                    <Box>
                        Product name:
                    </Box>
                    <Input 
                        type='text'
                        defaultValue={item.name}
                        ref = {nameRef}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Description:
                    </Box>
                    <Textarea 
                    defaultValue={item.description}
                    type='text'
                    ref = {descRef}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Price:
                    </Box>
                    <Input 
                        type='number'
                        ref = {pricRef}
                        defaultValue={item.price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Stocks:
                    </Box>
                    <Input 
                        defaultValue={item.quantity}
                        type='number'
                        ref = {stocRef}
                        onChange={(e) => setStocks(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Stocks:
                    </Box>
                    <Select 
                        defaultValue={item.isActive}
                        ref = {actiRef}
                        >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </Select>
                </Box>
                    <Box
                        mt='1rem'
                    >
                        <Button
                            w='100%'
                            bgColor='#FF0000'
                            onClick={() => updateItem()}
                        >Update</Button>
                </Box>
            </Box>
        </Flex>
    </>}
    </Flex>
  )
}
