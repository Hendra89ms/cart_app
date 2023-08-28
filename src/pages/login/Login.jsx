import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { ShopContext } from '../../context/ShopContext'
import { auth } from '../../firebase_config/firrebase_config'
import Loading from '../../components/loading/Loading'

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const [tangkapError, setTangkapError] = useState()
    const navigate = useNavigate('')

    // LOADING 
    const [loading, setLoading] = useState(false)


    // FUNCTION REGISTRASI MENGGUNAKAN FIREBASE
    const loginFb = async () => {

        await signInWithEmailAndPassword(auth, email, password).then(res => {
            setLoading(true)
            if (res) {
                setLoading(false)
                alert('LOGIN SUCCESS...')
                navigate('/')
            }

            else {
                alert('GAGAL LOGIN!')
            }

        }).catch(err => {
            console.log(err)
            setTangkapError(err.message)
        })

    }
    // END FUNCTION REGISTRASI MENGGUNAKAN FIREBASE


    const handleLogin = (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            return alert("You Must input data!")
        }

        if (!password && !email) {
            return alert("Password do not match")
        }

        loginFb()
    }

    const handleEye = () => {
        setIsShowPassword(!isShowPassword)
    }


    return (
        <>
            {
                loading ? <Loading /> :
                    (
                        <section className='w-full md:max-w-[900px] mx-auto bg-cover bg-center bg-opacity-50 bg-transparent h-[500px] relative mt-44'  >

                            <div className='flex justify-center md:justify-start items-center mt-[100px] '>


                                <form
                                    onSubmit={handleLogin}
                                    className='md:w-[400px] w-[350px] shadow-md p-4 rounded-md animate-slide-up duration-500 z-[90]'>

                                    <h1 className='text-center text-3xl mb-6 text-[orangered] font-semibold'>Login</h1>

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

                                        <button type='submit' className='bg-[#1f93ff] text-white p-1.5 rounded-md hover:bg-[#167dde] duration-300 '>Login</button>

                                        <div>

                                        </div>
                                    </div>

                                    <div className='text-center mt-4'>You Not Have Account?<Link to='/register' className='font-semibold hover:text-[orangered] duration-300'>Register</Link></div>

                                </form>


                            </div>

                        </section>
                    )
            }
        </>
    )
}

export default Login