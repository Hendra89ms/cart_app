import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase_config/firrebase_config'
import Loading from '../../components/loading/Loading'
import { Link } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'
import { ShopContext } from '../../context/ShopContext'

function DetailProduct() {

    const { id } = useParams()
    const [detail, setDetail] = useState({})
    const [loading, setLoading] = useState(false)


    const { addToCart } = useContext(ShopContext)

    useEffect(() => {
        getDataDetail()
    }, [])

    const getDataDetail = async () => {
        setLoading(true)

        const colRef = doc(db, 'products', id)
        const data = await getDoc(colRef)

        if (data) {
            setLoading(false)
            const docData = data.data()
            console.log('data : ', docData)
            setDetail(docData)
        }
        else {
            alert('DATA TIDAK ADA!')
        }
    }

    return (
        <div className='mt-36'>
            {
                loading ? <Loading /> :
                    (
                        <div className='w-full flex justify-center items-center'>
                            <div className='w-[1000px] flex flex-col'>
                                <div>
                                    <h1 className='text-3xl font-semibold'>Product Details</h1>

                                    <div className='flex gap-3 items-center'>
                                        <BsArrowLeft />
                                        <Link to='/' className='hover:shadow-slate-200 hover:shadow-md'>Back To Product</Link>
                                    </div>
                                </div>

                                <div className='w-full flex gap-4 mt-6'>
                                    <div className='shadow-md w-[500px] h-[400px] p-4 flex justify-center items-center'>
                                        <img
                                            src={detail.url}
                                            alt=""
                                            className='bg-cover w-[300px] h-[300px]'
                                        />
                                    </div>

                                    <div className='flex flex-col w-full gap-3'>
                                        <h1 className='font-semibold'>{detail.name}</h1>
                                        <h2 className='text-orange-500'>RP {detail.harga}</h2>

                                        {/* <p>
                                            {detail.description}
                                        </p> */}
                                        <div className='flex flex-col gap-2'>
                                            <h1 ><span className='font-semibold'>SKU : </span>{id}</h1>
                                            <h1><span className='font-semibold'>Brand : </span>{detail.brand}</h1>
                                        </div>

                                        <div className='flex items-center gap-3'>
                                            <button className='bg-slate-200 hover:bg-slate-300 duration-300 px-3 py-1.5'> - </button>
                                            <p>1</p>
                                            <button className='bg-slate-200 hover:bg-slate-300 duration-300 px-3 py-1.5'> + </button>
                                        </div>


                                        <div onClick={() => addToCart(detail)}>
                                            <button className='w-[150px] bg-orange-500 hover:bg-orange-700 duration-300 text-white p-2 rounded-md mt-5'>
                                                ADD TO CART
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default DetailProduct