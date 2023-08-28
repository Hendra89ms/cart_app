import React, { useState, useEffect } from 'react'
import InputNumber from './InputNumber'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebase_config/firrebase_config'

function AddProducts() {

    const [name, setName] = useState('')
    const [harga, setHarga] = useState(0)
    const [url, setUrl] = useState('')
    const [type, setType] = useState('')
    const [brand, setBrand] = useState('')
    const [isOnfocus, setIsOnfocus] = useState(false)

    const handleFocus = () => {
        setIsOnfocus(true);
    };

    const handleBlur = () => {
        setIsOnfocus(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name.length === 0 || harga.length === 0 || url.length === 0) {
            return alert('You MUst Input data')
        }

        const data = {
            name, harga, url, type, brand
        }

        try {
            const collectionRef = collection(db, "products");

            const response = await addDoc(collectionRef, data)

            console.log("add data : ", response)
            if (response) {
                alert('Data Sukses DiTambahkan!')
            }
        } catch (error) {
            console.error(error)
            alert('Gagal Add To Product ')
        }

        setName('')
        setHarga('')
        setUrl('')

    }


    return (
        <div className='h-screen flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='md:w-[400px] w-[350px] shadow-md p-6 rounded-md animate-slide-up duration-500 z-[90]'>

                <h1 className='text-center text-3xl mb-6 text-[orangered] font-semibold'>InputToFIrebase</h1>

                <div className='flex flex-col gap-3'>
                    <input
                        type="text"
                        autoFocus
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={name.toLocaleLowerCase()}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='name'
                        className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                    {name.length === 0 && isOnfocus ? (
                        <div className='text-red-500 text-sm'>You must input Data</div>
                    ) : ""}

                    <div className=' w-full'>
                        <InputNumber
                            value={harga}
                            setValue={setHarga}
                        />

                        {harga.length === 0 ? (
                            <div className='text-red-500 text-sm'>You must input Data</div>
                        ) : ""}
                    </div>

                    <div className=' w-full'>
                        <input
                            type='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='Link Image'
                            className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                        />
                    </div>

                    <div >
                        <h1 className='text-slate-400'>Type</h1>
                        <select
                            value={type}
                            onChange={e => setType(e.target.value)}
                            className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full cursor-pointer'>
                            <option value="laptop">laptop</option>
                            <option value="phone">phone</option>
                            <option value="electronics">electronics</option>
                            <option value="fashion">fashion</option>
                        </select>
                    </div>

                    <div>
                        <h1 className='text-slate-400'>Brand</h1>
                        <select
                            value={brand}
                            onChange={e => setBrand(e.target.value)}
                            className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full cursor-pointer'>

                            <option value="lenovo">Lenovo</option>
                            <option value="hp">Hp</option>
                            <option value="samsung">Samsung</option>
                            <option value="oppo">oppo</option>
                            <option value="techno">techno</option>
                            <option value="fashion">fashion</option>
                            <option value="electronics">electronics</option>
                        </select>
                    </div>



                    <button type='submit' className='bg-[#1f93ff] text-white p-1.5 rounded-md hover:bg-[#167dde] duration-300 '>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default AddProducts