import React from 'react'
import Sidebar from '../components/Common/Sidebar'
import AdminPannelGrid from '../../src/components/Admin/AdminPannelGrid'

const Userpanel = () => {
    return (
        <>

            <div className='flex h-screen overflow-hidden'>
                <Sidebar />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>

                    <main>
                        <p></p>

                        <AdminPannelGrid />
                    </main>

                </div>
            </div>
        </>
    )
}

export default Userpanel
