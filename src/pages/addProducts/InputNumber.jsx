import React, { useState } from 'react';

function InputNumber({ value, setValue }) {

    const handleChange = (event) => {
        const rawValue = event.target.value;
        const numericValue = parseNumericValue(rawValue);
        const formattedValue = formatToRupiah(numericValue);
        setValue(numericValue);
    };

    const parseNumericValue = (value) => {
        const numericString = value.replace(/[^\d]/g, ''); // Menghapus semua karakter non-digit
        const numericValue = numericString !== '' ? parseInt(numericString, 10) : 0; // Mengonversi string menjadi angka, jika string kosong, set nilai menjadi 0
        return numericValue;
    };

    const formatToRupiah = (value) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        const formattedValue = formatter.format(value);
        return formattedValue.replace('Rp', '');
    };


    return (
        <div>
            <input
                type="text"
                value={formatToRupiah(value)}
                onChange={handleChange}
                className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full text-black'
            />
        </div>
    );
}

export default InputNumber;