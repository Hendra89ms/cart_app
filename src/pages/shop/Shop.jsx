import React, { useContext, useEffect, useState } from 'react'
import Product from '../../components/product/Product';
import { ShopContext } from '../../context/ShopContext';
import Loading from '../../components/loading/Loading';

function Shop() {

    const { datas, loadingAddCart, addToCart } = useContext(ShopContext);

    return (
        <>
            {
                loadingAddCart ? <Loading /> :
                    <div className='w-full flex justify-center items-center'>
                        <div className='w-[1080px] '>
                            <h1 className='text-4xl font-semibold my-8 text-center'>PetroTech Shop</h1>

                            <div className='flex flex-wrap justify-around w-full md:mt-8 '>
                                {
                                    datas.length === 0 ? <h1>PLEASE WAIT....</h1> :
                                        datas.map((item, index) => {
                                            return (
                                                <Product data={item} key={index} addTocart={addToCart} />
                                            )
                                        })
                                }
                            </div>

                        </div>
                    </div>
            }
        </>
    )
}

export default Shop