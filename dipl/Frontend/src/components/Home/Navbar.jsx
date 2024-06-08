import React from 'react'
import { NavLink } from "react-router-dom";



const Navbar = () => {
    return (
        <>

            <div className="container mx-auto">
                <div className="flex justify-between h-16 px-4 lg:px-10 items-center">
                    <div className="flex items-center space-x-8">
                        <h1 className="text-xl lg:text-2xl font-bold text-white cursor-pointer">DIPL</h1>
                    </div>
                    <div className="flex space-x-4 items-center">

                        <NavLink to="/login" activeStyle>
                            <p className='text-xl lg:text-xl  text-white cursor-pointer'>LOGIN</p>
                        </NavLink>


                    </div>
                </div>
            </div>


        </>
    )
}

export default Navbar
