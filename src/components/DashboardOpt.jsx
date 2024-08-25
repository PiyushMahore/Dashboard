import React, { useEffect, useState } from 'react'
import { LuRefreshCcw } from "react-icons/lu";
import { IoIosMenu } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";

function DashboardOpt({ addWedgit, addMenu }) {
    const [mobile, setMobile] = useState(window.innerWidth <= 768);
    const [nav, setNav] = useState(false)

    const toggleNav = () => {
        setNav(!nav)
    }

    const toggleMenu = () => {
        setNav(false)
        addWedgit(!addMenu)
    }

    useEffect(() => {
        const handleResize = () => {
            setMobile(window.innerWidth <= 768)
        }
        window.addEventListener('resize', handleResize);
        handleResize()
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return (
        <div>

            {/* web */}
            <div className={`${mobile ? "hidden" : "flex"} items-start justify-between`}>
                <h3 className='text-2xl'>CNAPP Dashboard</h3>
                <div className='flex gap-3 pt-1'>
                    <button onClick={toggleMenu} className='border-2 border-gray-400 px-2 py-1 rounded-md'>Add Width +</button>
                    <button className='border-2 border-gray-400 px-2 py-1 rounded-md' onClick={() => location.reload()}><LuRefreshCcw /></button>
                </div>
            </div >

            {/* mobile */}
            {mobile ?
                <div className='flex justify-end'>
                    {nav ? <IoCloseCircleOutline onClick={toggleNav} size={30} /> : <IoIosMenu onClick={toggleNav} size={30} />}
                </div> : ""
            }
            <div
                className={`${nav ? 'max-h-screen' : 'max-h-0'} absolute right-0 overflow-hidden duration-500 ease-in-out bg-slate-400 max-w-fit rounded-md z-10`}>
                <ul className="flex flex-col p-4 items-center">
                    <li className="py-2">
                        <button onClick={toggleMenu} className='px-2 py-1 rounded-md'>Add Width +</button>
                    </li>
                    <li className="py-2">
                        <button className='px-2 py-1 rounded-md' onClick={() => location.reload()}><LuRefreshCcw size={20} /></button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardOpt
