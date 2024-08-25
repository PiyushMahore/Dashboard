import wedgits from '../../public/data/dashboard_config.json'
import React, { useRef } from 'react'

const AddWedgit = ({ destination, isOpen, setAddMenu }) => {
    const titleRef = useRef();
    const labelsTypeRef = useRef();
    const labelsRef = useRef();
    const dataRef = useRef();

    const add = (path) => {
        path.push(
            {
                "id": `widget_${destination?.length + 1}`,
                "title": titleRef.current?.value,
                "data": {
                    "labels": labelsRef.current?.value.split(","),
                    "datasets": [{
                        "label": labelsTypeRef.current?.value,
                        "data": dataRef.current?.value.split(",")
                    }]
                }
            }
        )
        setAddMenu(false)
    }

    const closeMenu = () => {
        setAddMenu(false)
    }

    const changeDestination = (path) => {
        destination = path
    }

    return (
        <div className={`${isOpen ? "translate-x-0" : "translate-x-full"} flex flex-col w-[90%] sm:w-[40%] h-screen bg-white shadow-2xl shadow-black duration-300 ease-in-out fixed top-0 right-0`}>
            <div className='flex justify-between bg-blue-950 p-2 text-white'>
                <p>Add Width</p>
                <p className='cursor-pointer' onClick={closeMenu}>X</p>
            </div>

            <p className='pl-3'>Personalize your dashboard by adding wedgits</p>

            <div className='pl-4 mt-1.5 w-fit flex gap-2'>
                {
                    wedgits && wedgits.dashboard.categories.map((data) => (
                        <button key={data.id} onClick={() => changeDestination(data.widgets)}>{data.title?.split(" ")[0]}</button>
                    ))
                }
            </div>

            <div className='flex flex-col pl-5 p-1.5'>
                <label htmlFor="title">Enter Wedgit title</label>
                <input ref={titleRef} placeholder='Enter Wedgit title' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                <label htmlFor="wedgitlbl">Enter Wedgit labels</label>
                <input ref={labelsRef} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="wedgitlbl" placeholder='Seprate labels by ","' />
                <label htmlFor="labletitle">Enter lable title</label>
                <input ref={labelsTypeRef} type="text" placeholder='Enter lable title' className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="labletitle" />
                <label htmlFor="wedgitdata">Enter Wedgit data</label>
                <input ref={dataRef} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="wedgitdata" placeholder='Seprate data by ","' />
            </div>

            <div className='flex justify-end gap-1 px-2 mt-auto mb-1'>
                <button className='py-1 px-6 hover:bg-slate-700 border-2 border-gray-700 hover:text-white rounded-lg' onClick={closeMenu}>Cancel</button>
                <button className='py-1 px-6 hover:bg-slate-700 border-2 border-gray-700 hover:text-white rounded-lg' onClick={() => destination ? add(destination) : ""}>Confirm</button>
            </div>

        </div>
    )
}

export default AddWedgit
