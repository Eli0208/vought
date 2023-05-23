import {
    Box,
    Flex, 
    Text, 
    Input, 
    Textarea, 
    Image,
    Button
} from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import ph from '../assets/placeholder.jpg'
import Swal from 'sweetalert2';

export default function AddItem({token, sellerId}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('')
    const [stocks, setStocks] = useState('')
    const nameRef = useRef();
    const descRef = useRef();
    const pricRef = useRef();
    const stocRef = useRef();

    const AddItem = () => {

        if(name == '' || description == '' || price == '' || stocks == ''){
            Swal.fire({
                icon: 'error',
                title: 'Please fill all fields',
                text: 'Please double check entries',
            })
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/products`, {
                method: "POST",
                headers: {
                    Authorization : `Bearer ${token}`,
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    description, description,
                    price: price,
                    quantity: stocks,
                    sellerId: sellerId
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
                        setName('');
                        setDescription('');
                        setPrice('');
                        setStocks('');
                        nameRef.current.value = ('')
                        descRef.current.value = ('')
                        pricRef.current.value = ('')
                        stocRef.current.value = ('')
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
                        ref = {nameRef}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Description:
                    </Box>
                    <Textarea 
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
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </Box>
                <Box>
                    <Box>
                        Stocks:
                    </Box>
                    <Input 
                        type='number'
                        ref = {stocRef}
                        onChange={(e) => setStocks(e.target.value)}
                    />
                </Box>
                    <Box
                        mt='1rem'
                    >
                        <Button
                            w='100%'
                            bgColor='#FF0000'
                            onClick={() => AddItem()}
                        >Add</Button>
                </Box>
            </Box>
        </Flex>

    </Flex>
  )
}
