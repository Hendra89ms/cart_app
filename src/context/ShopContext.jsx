import React, { createContext, useEffect, useState } from 'react'
// import { getData, addDataToCart, getDataCart } from '../../service_firebase';
import { db } from '../firebase_config/firrebase_config';
import { getDocs, collection, addDoc } from 'firebase/firestore'
import { auth } from '../firebase_config/firrebase_config'
import { onAuthStateChanged } from 'firebase/auth';


export const ShopContext = createContext(null);

function ShopContextProvider({ children }) {

    const [datas, setDatas] = useState([])
    // STATE UNTUK MENANGKAP USER YANG LOGIN SAAT INI
    const [userLogin, setUserLogin] = useState(false);

    // GET CART DATA
    const [cartData, setCartData] = useState([])
    const [username, setUserName] = useState(null)

    // const [userId, setUserId] = useState(null)

    useEffect(() => {
        api()
        handleAuthStateChange()
    }, [])

    // GET DATA API PRODUCT
    const api = async () => {
        const collRef = collection(db, "products");
        try {
            const response = await getDocs(collRef);
            const allData = response.docs.map((item, index) => {
                let data = { ...item.data(), id: item.id };
                return data;
            })

            setDatas(allData)
        } catch (error) {
            console.log(error)
        }
    }

    // DAPATKAN USER ID 
    const handleAuthStateChange = () => {
        onAuthStateChanged(auth, async (user) => {

            if (user) {
                // Pengguna sedang masuk, lakukan tindakan yang sesuai
                setUserLogin(true)
                setUserName(user.email)

            } else {
                // Pengguna tidak masuk, lakukan tindakan yang sesuai
                setUserLogin(false)
            }
        });
    }

    // FORMAT ANGKA MENJADI RUPIAH
    const formatToRupiah = (value) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        const formattedValue = formatter.format(value);
        return formattedValue.replace('Rp', '');
    };

    const [loadingAddCart, setLoadingAddCart] = useState(false)
    // const [incremenButton, setIncrementButton] = useState(false)

    // HANDLE ADD TO CART
    const addToCart = async (product) => {
        setLoadingAddCart(true)

        try {
            const userId = auth.currentUser.uid

            if (userId !== null) {
                setLoadingAddCart(false)
                console.log("product : ", product)
                // TAMBAHKAN PROPERTY QUANTITY
                product['qty'] = 1;

                // TAMBAHKAN PROPERTY TOTAL PRODUCT
                product['totalProductPrice'] = product.qty * product.harga;

                // BUAT COLLECTION CART BERDASARKAN ID
                const colRef = collection(db, 'CartProduct' + ' ' + userId)
                await addDoc(colRef, product)

                alert('Data ditambahkan KeCart')
                // ATUR KE TRUE UNTUK MENAMPILKAN BUTTON DI DETAIL
            }

        } catch (error) {
            alert('Kamu Harus Login Dulu !')
            window.location.href = '/login'
        }
    }


    const valueContex = {
        datas,
        userLogin,
        setUserLogin,
        username,
        setUserName,
        // userId,
        cartData,
        formatToRupiah,
        loadingAddCart,
        addToCart
    }

    return (
        <ShopContext.Provider value={valueContex}>
            {children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;