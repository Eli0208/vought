import React, { useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  extendTheme
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Header from './components/Header';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import SellerDashboard from './pages/SellerDashboard';
import AddItem from './pages/AddItem';
import RetrieveAllProducts from './pages/RetrieveAllProducts';
import UpdateItem from './pages/UpdateItem';
import Products from './pages/Products';
import ViewItem from './pages/ViewItem';
import Checkout from './pages/Checkout';
import OrderHistory from './pages/OrderHistory';
import Orders from './pages/Orders';
import Cart from './pages/Cart';


const theme = extendTheme({
  components: {
    Modal: {
      baseStyle: {
        overlay: {
          bg: "rgba(0, 0, 0, 0.5)", // Change the color and opacity as per your requirement
        },
        dialog: {
          bg: "#333333", // Change the color to your desired background color
          color: "#C0C0C0", // Change the color to your desired text color
        },
      },
    },
  },
  fonts: {
    body: "'Roboto Condensed', sans-serif",
  },
});


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [userData, setUserData] = useState();
  const [role, setRole] = useState();

  useEffect(()=>{
    if (token != null) {
      fetch(`${process.env.REACT_APP_API_URL}/users/details`, {method: "POST",
        headers: {
            Authorization : `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        setUserData(data);
        setRole(data.role);
      })
    }
  },[token])

  return (
    <ChakraProvider theme={theme}>
      <Box
      bgColor='#001A3D'
      color='#C0C0C0'
      height='100vh'
      overflowY='auto'
      sx={{
        '&::-webkit-scrollbar': {
          width: '.5rem',
        },
        '&::-webkit-scrollbar-track': {
          background: '#333333',
        },
        '&::-webkit-scrollbar-thumb': {
          background: '#001A3D',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb:hover': {
          background: '#555',
        },
      }}
      >
        <Router>
          <Header token={token} setToken={setToken} role={role}/>
          {(token == null || role == 'user')&&
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/signin' element={<SignIn setToken={setToken}/>} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/products' element={<Products/>} />
            <Route path='/viewitem/:productId' element={<ViewItem token = {token}/>} />
            <Route path='/checkout/:productId' element={<Checkout token={token}/>} />
            <Route path='/orderhistory' element={<OrderHistory token={token}/>} />
            <Route path='/cart' element={<Cart token={token}/>} />
          </Routes>
          }
          {role == 'seller' &&
          <Routes>
            <Route path='/' element={<SellerDashboard />} />
            <Route path='/additem' element={<AddItem token={token} sellerId={userData._id} />} />
            <Route path='/viewproducts' element={<RetrieveAllProducts token={token}/>} />
            <Route path='/updateitem/:productId' element={<UpdateItem token={token}/>}/>
            <Route path='/orderhistory' element={<Orders token={token} />} />
          </Routes>
          }
        </Router>
      </Box>
    </ChakraProvider>
  );
}

export default App;
