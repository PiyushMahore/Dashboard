import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";

function Nav() {
    const [inoutVal, setInputVal] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        if (inputValue?.length > 0) {
            setInputVal(true)
        } else {
            setInputVal(false)
        }
    }, [inputValue])

    return (
        <div className='flex justify-between mb-1'>
            <div className='flex gap-1 text-sm'>
                <p className='text-gray-400'>Home &gt;</p>
                <p>Components v2</p>
            </div>
            <div className='flex items-center'>
                <IoSearchSharp color='gray' className={`relative -right-5 ${inoutVal ? "hidden" : ""}`} />
                <input className='focus:outline-none px-1 bg-gray-300 md:w-96 h-7' value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="search" name="" placeholder='     Search anything' />
            </div>
        </div>
    )
}

export default Nav
