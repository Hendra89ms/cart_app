import React from 'react'
import { Link } from 'react-router-dom';


function Product({ data, addTocart }) {

    const { harga, name, url, id } = data;

    const handleAddTocart = () => {
        addTocart(data)
    }

    return (

        <div className='w-[300px] h-[500px] flex flex-col gap-3 justify-center items-center shadow-xl px-4 py-1'>
            <Link to={`/detailProduct/${id}`} >
                <div className='relative duration-300'>
                    <div className='absolute inset-0  font-bold flex justify-center items-center opacity-0 hover:opacity-100 bg-slate-200  bg-opacity-50 duration-300'>
                        <h1>Detail</h1>
                    </div>
                    <img src={url} alt="img1" />
                </div>
            </Link>
            <b >{name}</b>
            <p >${harga}</p>
            <button className='hover:bg-black hover:text-white border-[2px] border-black rounded-md px-4 py-1 duration-300' onClick={handleAddTocart}>Add To Cart</button>
        </div>

    )
}

export default Product