import { 
    Box, 
    Button, 
    Flex, 
    Image, 
    useMediaQuery,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Text
} from '@chakra-ui/react'
import React from 'react'
import voughtLogo from '../assets/vought.png'
import { useNavigate } from 'react-router-dom'
import { FaCartArrowDown, FaHamburger } from 'react-icons/fa'


export default function Header({setToken, token}) {
    const [isLargerThan800] = useMediaQuery('(min-width: 800px)')
    const navigate = useNavigate();
  return (
    <Flex
        p='3'
        width='100%'
        height='10vh'
        justifyContent='space-between'
        alignContent='center'
        
    >
        <Flex
            display='flex'
            width='60%'
            alignContent='center'
            height='100%'
            wrap='wrap'
            cursor={'pointer'}
            onClick={()=>navigate('/')}
            >
            <Flex height='100%' align='center' wrap='wrap'>
                <Image 
                height='5vh'
                width='auto'
                src={voughtLogo}
                />
                <Box
                    fontWeight='900'
                    fontSize='3vh'
                    display={isLargerThan800 ? true : 'none'}
                >
                    Vought International
                </Box>
            </Flex>
        </Flex>
        {isLargerThan800 ?
        <Flex
            width='40%'
            justifyContent='space-between'
        >
            <Box
                alignContent='center'
                display='grid'
                onClick={()=>navigate('/products')}
            >Products</Box>
            <Box
                alignContent='center'
                display='grid'
            >Want to be a Seller?</Box>
            <Flex
                alignContent='center'
                display='grid'
                onClick={()=>navigate('/orderhistory')}
            >
               Order History        
            </Flex>
            <Box
                alignContent='center'
                display='grid'
            >
                {token == null ?
                <Button
                bgColor='#FF0000'
                onClick={()=>navigate('/signin')}
                >
                    Sign In
                </Button>
                : <Button
                bgColor='#FF0000'
                onClick={()=>{
                    setToken(null)
                    localStorage.removeItem('token')
                    navigate('/')
                    window.location.reload();
                }}
                >
                    Sign Out
                </Button>}
            </Box>
        </Flex> :
        <Box
            alignContent='center'
            display='grid'
         >
        <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<FaHamburger />}
          variant='outline'
        />
        <MenuList>
          <MenuItem>
            Products
          </MenuItem>
          <MenuItem >
            Want to be a Seller?
          </MenuItem>
          <MenuItem >
            Want to be a Supe?
          </MenuItem>
          
          {token == null ?
                <MenuItem
                bgColor='#FF0000'
                onClick={()=>navigate('/signin')}
                >
                    Sign In
                </MenuItem>
                : <MenuItem
                bgColor='#FF0000'
                onClick={()=>{
                    setToken(null)
                    localStorage.removeItem('token')
                    navigate('/')
                }}
                >
                    Sign Out
                </MenuItem>}
          
        </MenuList>
      </Menu>
      </Box>
        }
    </Flex>
  )
}
