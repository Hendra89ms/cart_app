import React, { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Shop, Cart, Navbar } from './pages'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import AddProducts from './pages/addProducts/AddProducts'
import { ShopContext } from './context/ShopContext'
import Coba from './pages/coba/Coba'
import DetailProduct from './pages/detailProduct/DetailProduct'

function App() {

  const { userLogin } = useContext(ShopContext)

  return (
    <div className='w-full'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/addProduct' element={<AddProducts />} />
        <Route path='/detailProduct/:id' element={<DetailProduct />} />

        {/* PENGGUNA HARUS LOGIN UNTUK MEMUNCUL KAN CART */}
        {userLogin && <Route path='/cart' element={<Cart />} />}
        <Route path='*' element={<h1>PAGE NOT FOUND</h1>} />
        <Route path='/coba' element={<Coba />} />
      </Routes>
    </div>
  )
}

export default App