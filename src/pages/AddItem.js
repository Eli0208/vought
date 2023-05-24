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
    };

    const handleUpload = () => {
        fileInputRef.current.click();
    }

    const AddItem = () => {

        if(name == '' || description == '' || price == '' || stocks == ''){
            Swal.fire({
                icon: 'error',
                title: 'Please fill all fields',
                text: 'Please double check entries',
            })
        }else{
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append('price', price);
            formData.append('quantity', stocks);
            formData.append('sellerId', sellerId);
            formData.append("image", selectedFile);
            console.log(formData);
            fetch(`${process.env.REACT_APP_API_URL}/products`, {
                method: "POST",
                headers: {
                    Authorization : `Bearer ${token}`,
                },
                body: formData,
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
            height='100%'
        >
            <Box 
                width='80%'
                align='center'
                >
                    <Image src={imageUrl != '' ? imageUrl :ph} 
                    height='50%'/>
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
