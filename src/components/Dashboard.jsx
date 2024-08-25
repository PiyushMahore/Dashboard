import React, { useState } from 'react'
import wedgits from '../../public/data/dashboard_config.json'
import DashboardOpt from './DashboardOpt';
import BarChart from './Chart';
import AddWedgit from './AddWedgit';

function Dashboard() {
    const [addMenu, setAddMenu] = useState(false)
    const [path, setPath] = useState("")

    const toggleAddMenu = (wedgit) => {
        setAddMenu(!addMenu)
        setPath(wedgit)
    }

    return (
        <div className='bg-[#e4eff9]'>
            <DashboardOpt addWedgit={setAddMenu} addMenu={addMenu} />
            {
                wedgits && wedgits.dashboard.categories.map((categorie) => (
                    <div key={categorie.id} className='overflow-hidden sm:ml-1.5'>
                        <h3>{categorie.title}</h3>
                        <div className='flex flex-wrap gap-1 items-center'>
                            {
                                categorie.widgets && categorie.widgets.map((data) => (
                                    <div key={data.id} className='flex items-center h-[15.8rem] gap-16 w-[100%] sm:w-[32.5%] bg-white p-3 rounded-md sm:ml-1 pb-8'>
                                        <div className={`${data.data ? "w-[50%]" : "w-[100%]"}`}>
                                            <h3 className='w-72'>{data.title}</h3>
                                            <BarChart prop={data.data} />
                                        </div>
                                        {data.data ? <div className='w-[100%]'>
                                            {
                                                data.data && data.data.labels.map((label) => (
                                                    <p key={label}><span className='h- bg-black'></span> {label}</p>
                                                ))}
                                        </div> : ""}
                                    </div>
                                ))
                            }
                            <div className='flex items-center justify-center h-[15.8rem] w-[100%] sm:w-[32.5%] bg-white p-3 rounded-md sm:ml-1 pb-8'>
                                <button onClick={() => toggleAddMenu(categorie.widgets)} className='hover:bg-gray-200 border-2 border-gray-400 px-2 py-1 rounded-md'>Add Width +</button>
                            </div>
                        </div>
                    </div>
                ))
            }
            <AddWedgit isOpen={addMenu} destination={path} setAddMenu={setAddMenu} />
        </div>
    )
}

export default Dashboard
