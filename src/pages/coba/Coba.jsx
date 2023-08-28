import React, { useState } from 'react'
import Loading from '../../components/loading/Loading'

function Coba() {
    const [loading, setLoading] = useState(false)

    if (loading) {
        return <Loading />
    }

    return (
        <div className='w-full'>
            {
                !loading && (
                    <div className='w-[400px] h-[400px] bg-red-500 text-white'>
                        <h1>HELLO WORODL</h1>
                    </div>
                )
            }
        </div >
    )
}

export default Coba;