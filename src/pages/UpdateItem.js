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
import { useNavigate, useParams } from 'react-router-dom';
import { FaStepBackward } from 'react-icons/fa';

export default function UpdateItem({token, sellerId}) {
    const { productId } = useParams();
    const navigate = useNavigate();
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
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const fileInputRef = useRef(null);


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        const fileUrl = URL.createObjectURL(file);
        setImageUrl(fileUrl);
        const formData = new FormData();
        formData.append("image", selectedFile);
        console.log(selectedFile)
    };

    const handleUpload = () => {
        fileInputRef.current.click();
    }

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
            const formData = new FormData();
            formData.append("name", nameRef.current.value);
            formData.append("description", descRef.current.value);
            formData.append('price', pricRef.current.value);
            formData.append('quantity', stocRef.current.value);
            formData.append("image", selectedFile);
            console.log(formData);
            fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
                method: "PUT",
                headers: {
                    Authorization : `Bearer ${token}`,
                },
                body: formData,
            })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Successfully updated Item!',
                    text: 'Item is now updated',
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
    <Box
        height='85%'
        mt='1rem'
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
                    <FaStepBackward size='2rem' onClick={() => navigate('/viewproducts')}/>
                </Box>
                <Flex
                    width='33.33%'
                    justifyContent='center'
                >
                    <Text
                    fontSize='2rem'
                    >
                        Item information
                    </Text>
                </Flex>
                <Box
                    width='33.33%'
                >
                </Box>
        </Flex>
        <Flex
            width ='100%'
            justifyContent='center'
            alignContent='center'
            height='80%'
            mt='1rem'
        >   
        {item &&
        <>
            <Flex
                width='50%'
                alignContent='center'
                justifyContent='center'
            >
                <Box
                    width='80%'
                >
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
            <Flex
                width='50%'
                justifyContent='center'
                height='100%'
            >
                <Box 
                    width='80%'
                    align='center'
                    height='100%'
                    >
                        <Image 
                        src={imageUrl ? imageUrl : item.image ? `${process.env.REACT_APP_API_URL}/${item.image}`: ph} 
                        height='75%'
                        />
                        <Box
                            mt='1rem'
                            
                        >
                            <Input 
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                />
                            <Button
                                onClick={() => handleUpload()}
                                w='100%'
                                bgColor='#FF0000'
                            >Choose File</Button>
                        </Box>
                </Box>
            </Flex>
        </>}
        </Flex>
    </Box>
  )
}
