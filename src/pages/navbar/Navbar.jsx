import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart } from 'phosphor-react'
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase_config/firrebase_config';
import { ShopContext } from '../../context/ShopContext';


function Navbar() {

    const navigate = useNavigate()
    const { userLogin, setUserLogin, username, setUserName } = useContext(ShopContext)


    const handleLogOut = () => {
        signOut(auth).then(() => {
            alert('SignOut Success...')
            setUserLogin(false)
            setUserName(null)
            navigate('/login')

        }).catch((err) => {
            alert('SigOut Gagal !')
            console.log(err)
        })
    }


    return (
        <div className='w-full flex justify-center items-center fixed left-0 top-0 bg-black z-[99]'>
            <div className='w-[1080px]  flex justify-between h-[70px] items-center '>

                {
                    userLogin ? (
                        <div className=' flex gap-8 text-white text-xl'>
                            <h1>{username}</h1>
                            <Link to='/cart'>
                                <div className='relative'>
                                    <div className='cursor-pointer flex'>
                                        <h1>Cart</h1>
                                        <ShoppingCart size={32} /></div>
                                    <div className='absolute top-[-8px] right-[-24px] font-bold bg-orange-500 text-white w-[30px] h-[30px] rounded-full flex justify-center items-center text-sm'>1</div>
                                </div>

                            </Link>

                            <Link to='/' className='cursor-pointer'>Shop</Link>
                            <div onClick={handleLogOut} className='ml-8 cursor-pointer'>LogOut </div>

                        </div>
                    ) :
                        <div className='flex gap-4 text-white text-xl'>
                            <Link to='/' className='cursor-pointer'>Shop</Link>
                            <Link to='/login' >Login</Link>
                            <Link to='/register' >Register</Link>
                        </div>
                }
            </div>
        </div>
    )
}

export default Navbar