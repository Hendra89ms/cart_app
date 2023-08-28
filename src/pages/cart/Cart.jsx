import React, { useContext, useEffect, useState } from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { ShopContext } from '../../context/ShopContext'
import { db } from '../../firebase_config/firrebase_config'
import { query, deleteDoc, collection, getDocs, doc } from 'firebase/firestore'
import { auth } from '../../firebase_config/firrebase_config'
import Loading from '../../components/loading/Loading'


function Cart() {

    const [cart, setCart] = useState([])
    const { formatToRupiah } = useContext(ShopContext)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getCartData()
    }, [])

    const getCartData = async () => {
        setLoading(true)
        const userId = auth.currentUser.uid

        const colRef = collection(db, 'CartProduct' + ' ' + userId)
        const cartQuery = query(colRef)

        try {
            const cartData = await getDocs(cartQuery);

            setLoading(false)
            const cartDataApi = cartData.docs.map(item => {
                let data = { ...item.data(), id: item.id }
                return data
            })
            setCart(cartDataApi)

        } catch (error) {
            console.log(error)
        }
    }

    if (cart.length === 0) {
        return (
            <div className='w-full h-screen flex justify-center items-center '>
                <div className='bg-black text-white '>
                    <h1 className='text-xl'>ADD YOUR CART !</h1>
                </div>
            </div>
        )
    }

    const deleteCart = async (id) => {

        try {
            // Mendapatkan referensi dokumen yang ingin dihapus berdasarkan ID
            const userId = auth.currentUser.uid
            const cartDocRef = doc(db, 'CartProduct' + ' ' + userId, id)

            // Menghapus dokumen dari koleksi CartProduct
            await deleteDoc(cartDocRef);
            alert('Document Dihapus!')
            getCartData()

        } catch (error) {
            alert('Document gagal dihapus')
            console.log(error.message)
        }
    }



    return (
        <div className='w-full flex justify-center items-center'>
            {
                loading ? <Loading /> :
                    <>
                        <div className='w-[1080px] mt-36'>
                            <div className="overflow-x-auto mt-8">
                                <table className="w-full border-[1px] border-slate-400">
                                    <thead>
                                        <tr className="border-b-slate-400 border-b-[1px]">
                                            <th className="px-4 py-2">s/n</th>
                                            <th className="px-4 py-2">Product</th>
                                            <th className="px-4 py-2">Price</th>
                                            <th className="px-4 py-2">Quantity</th>
                                            <th className="px-4 py-2">Total</th>
                                            <th className="px-4 py-2">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            cart.map((item, index) => {

                                                return (
                                                    <tr key={index} className="my-5 border-b-[1px] border-b-slate-400">
                                                        <td className="px-4 py-2 text-center">{index + 1}</td>
                                                        <td className="px-4 py-2 text-center">
                                                            <div className="flex flex-col gap-2 justify-center items-center">
                                                                <div>{item.name}</div>
                                                                <img
                                                                    className="w-[80px] h-[80px]"
                                                                    src={item.url}
                                                                    alt={item.name} />
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-2 text-center">Rp {formatToRupiah(item.harga)}</td>
                                                        <td className='text-center flex justify-center items-center px-4 pt-12 '>
                                                            <button className='w-[30px] h-[30px] bg-slate-200 rounded-md text-xl'>-</button>
                                                            <td className="px-4 py-2 text-center">{item.qty}</td>
                                                            <button className='w-[30px] h-[30px] bg-slate-200 rounded-md text-xl'>+</button>
                                                        </td>
                                                        <td className="px-4 py-2 text-center">Rp {formatToRupiah(item.totalProductPrice
                                                        )}</td>

                                                        <td onClick={() => deleteCart(item.id)} className="px-4 py-2 text-center cursor-pointer text-red-500">
                                                            <AiFillDelete size={20} />
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default Cart