import { 
        Box, 
        Button, 
        Checkbox, 
        Flex, 
        Input, 
        Text,
        useMediaQuery
    } from '@chakra-ui/react'
import React, { useState } from 'react'
import SignInCarousel from '../components/SignInCarousel'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function SignIn({setToken}) {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate()

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
      };

    const handleLogin = () =>{
        if(email == '' || password == ''){
            Swal.fire({
                icon: 'error',
                title: 'Missing field/s',
                text: 'Please fill all fields',
            })
        }else{
            fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
                method: "POST",
                headers: {
                    "Content-type" : "application/json"
                },
                body: JSON.stringify({
                    email : email,
                    password: password
                })
            })
            .then(res => res.json())
            .then(data => {
                if(data == false){
                    Swal.fire({
                        icon: 'error',
                        title: 'Wrong Email/Password',
                        text: 'Please double check entries',
                    })
                }else{
                    if (isChecked) {
                        setToken(data.access);
                        localStorage.setItem('token', data.access)
                        navigate('/')
                    } else {
                        setToken(data.access);
                        navigate('/')
                    }
                }
            })
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
                    my='5'>
                    <Text>
                        EMAIL:
                    </Text>
                    <Box>
                        <Input
                            type='text'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box
                    my='5'
                >
                    <Text>
                    PASSWORD:
                    </Text>
                    <Box>
                        <Input
                        type='password'
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </Box>
                </Box>
                <Flex
                    my='5'
                    wrap='wrap'
                    align='center'
                    
                >
                    <Checkbox isChecked={isChecked} onChange={handleCheckboxChange} />
                    <Box
                    pl='1'
                    >Keep me signed in</Box>
                </Flex>
                <Flex
                    width='100%'
                    justifyContent='center'
                    my='5'
                >
                    <Button
                        width='100%'
                        bgColor='#FF0000'
                        onClick={()=>handleLogin()}
                    >Sign in</Button>
                </Flex>
                <Box
                    my='5'
                >
                    Don't have an account?&nbsp;<Link as={Link} to='/signup'>Click here to sign up!</Link>
                </Box>
            </Box>
        </Flex>
    </Flex>
  )
}
