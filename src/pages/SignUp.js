import { Box, Button, Checkbox, Flex, Input, Text, useMediaQuery } from '@chakra-ui/react'
import React, { useState } from 'react'
import SignInCarousel from '../components/SignInCarousel'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if(password != confirmPassword){
            Swal.fire({
                icon: 'error',
                title: 'Password does not match',
                text: 'Please Check Password',
              })
        } else if(firstName == '' || lastName == '' || mobileNo == '' || email == '' || password == '' || confirmPassword == ''){
            Swal.fire({
                icon: 'error',
                title: 'Missing field/s',
                text: 'Please fill all fields',
              })
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    mobileNo : mobileNo,
                    password : password 
                })
            })
            .then(
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'Please sign in!',
                    confirmButtonText: 'Proceed to sign in!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/signin')
                    }
                }
                ) 
            )
        }
    }

  return (
    <Flex
    width='100%'
    height='90%'
    >
        <Flex
         display={isLargerThan800 ? 'flex' : 'none'}
         width='50%'
         height='100%'
         justifyContent='end'
         alignContent='center'
         wrap='wrap'
        >
            <Box
            width='90%'
            >
                <SignInCarousel />
            </Box>
        </Flex>
        <Flex
         width={isLargerThan800 ? '50%' : '100%'}
         height='100%'
         justifyContent='center'
         align={isLargerThan800 ? 'center' : 'start'}
        >
            <Box
                width='60%'
            >
                <Box 
                    my='2'>
                    <Text my='0'>
                        First Name:
                    </Text>
                    <Box>
                        <Input
                        type='text'
                        onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box 
                    my='2'>
                    <Text my='0'>
                        Last Name:
                    </Text>
                    <Box>
                        <Input
                            type='text'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box 
                    my='2'>
                    <Text my='0'>
                        EMAIL:
                    </Text>
                    <Box>
                        <Input
                        type='email'
                        onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box
                    my='2'
                >
                    <Text my='0'>
                    PASSWORD:
                    </Text>
                    <Box>
                        <Input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box
                    my='2'
                >
                    <Text my='0'>
                    CONFIRM PASSWORD:
                    </Text>
                    <Box>
                        <Input
                        type='password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box 
                    my='2'>
                    <Text my='0'>
                        Mobile No:
                    </Text>
                    <Box
                        type='text'
                        onChange={(e) => setMobileNo(e.target.value)}
                    >
                        <Input/>
                    </Box>
                </Box>
                <Flex
                    my='2'
                    wrap='wrap'
                    align='center'
                    
                >
                    <Checkbox/>
                    <Box
                    pl='1'
                    >Keep me signed in</Box>
                </Flex>
                <Flex
                    width='100%'
                    justifyContent='center'
                    my='2'
                >
                    <Button
                        width='100%'
                        bgColor='#FF0000'
                        onClick={() => handleRegister()}
                    >Register</Button>
                </Flex>
            </Box>
        </Flex>
    </Flex>
  )
}
