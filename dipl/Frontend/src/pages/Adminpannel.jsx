import React from 'react'
import Sidebar from '../components/Common/Sidebar'

// import Header from '../components/Header'
import AdminPannelGrid from '../components/Admin/AdminPannelGrid'



const Adminpannel = () => {
    return (
        <>
            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>

                    <main>

                        <AdminPannelGrid />
                    </main>

                </div>
            </div>




            {/* <AdminPannelGrid /> */}
        </>
    )
}

export default Adminpannel
