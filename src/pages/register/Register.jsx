import React, { useContext, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import { setDoc, doc, collection } from 'firebase/firestore'
import { db } from '../../firebase_config/firrebase_config'
import { auth } from '../../firebase_config/firrebase_config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ShopContext } from '../../context/ShopContext'
import Loading from '../../components/loading/Loading'
// import Loading from '../../components/loading/Loading'


function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowCpassw, setIsShowCpassw] = useState(false)
    const { setUserLogin } = useContext(ShopContext)

    // LOADING 
    const [loading, setLoading] = useState(false)


    const navigate = useNavigate('')

    // FUNCTION REGISTRASI MENGGUNAKAN FIREBASE
    const registrasiFb = async () => {

        try {
            await createUserWithEmailAndPassword(auth, email, password).then((res) => {
                setLoading(true)

                if (res) {
                    setUserLogin(false)
                    setLoading(false)

                    // CREATE DATABASE USER
                    const colRef = collection(db, "User")
                    setDoc(doc(colRef), {
                        email: email,
                        password: password
                    }).then(() => {
                        alert('Register Sukses..')
                        navigate('/login')
                        setEmail('')
                        setPassword('')
                    })
                }

            })
        } catch (error) {
            console.log(error)
        }
    }
    // END FUNCTION REGISTRASI MENGGUNAKAN FIREBASE

    const handleRegister = (e) => {
        e.preventDefault()

        if (email === '' || password === '' || cpassword === '') {
            return alert("You Must input data!")
        }

        if (password !== cpassword) {
            return alert("Password do not match")
        }

        if (password.length < 6 || cpassword < 6) {
            return alert("Password at least 6 character")
        }

        registrasiFb()

        setEmail('')
        setPassword('')
        setCPassword('')

    }

    const handleEye = () => {
        setIsShowPassword(!isShowPassword)
    }
    const handleEyeCPasw = () => {
        setIsShowCpassw(!isShowCpassw)
    }


    return (
        <div>
            {
                loading ? <Loading /> :
                    (
                        <>
                            <section className='w-full md:max-w-[900px] mx-auto bg-cover bg-center bg-opacity-50 bg-transparent h-[500px] relative mt-44'  >

                                <div className='flex justify-center md:justify-start items-center mt-[100px] '>


                                    <form
                                        onSubmit={handleRegister}
                                        className='md:w-[400px] w-[350px] shadow-md p-4 rounded-md animate-slide-up duration-500 z-[90]'>

                                        <h1 className='text-center text-3xl mb-6 text-[orangered] font-semibold'>Register</h1>

                                        <div className='flex flex-col gap-3'>
                                            <input
                                                type="email"
                                                autoFocus
                                                value={email}
                                                onChange={(e) => (setEmail(e.target.value))}
                                                placeholder='email'
                                                className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                                            <div className='relative w-full'>
                                                <input
                                                    type={isShowPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => (setPassword(e.target.value))}
                                                    placeholder='password'
                                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                                                />
                                                <div
                                                    onClick={handleEye}
                                                    className='absolute right-[10px] top-[12px] cursor-pointer'>
                                                    {
                                                        isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                                    }
                                                </div>
                                            </div>

                                            <div className='relative w-full'>
                                                <input
                                                    type={isShowCpassw ? "text" : "password"}
                                                    value={cpassword}
                                                    onChange={(e) => (setCPassword(e.target.value))}
                                                    placeholder='Confirm password'
                                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                                                />
                                                <div
                                                    onClick={handleEyeCPasw}
                                                    className='absolute right-[10px] top-[12px] cursor-pointer'>
                                                    {
                                                        isShowCpassw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                                    }
                                                </div>
                                            </div>

                                            <button type='submit' className='bg-[#1f93ff] text-white p-1.5 rounded-md hover:bg-[#167dde] duration-300 '>Register</button>
                                        </div>

                                        <div className='text-center mt-4'>Already an account?<Link to='/login' className='font-semibold hover:text-[orangered] duration-300'>Login</Link></div>

                                    </form>


                                </div>

                            </section>
                        </>
                    )
            }

        </div>
    )
}

export default Register;