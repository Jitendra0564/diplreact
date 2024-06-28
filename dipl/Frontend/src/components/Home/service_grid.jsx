import React from 'react'
import grid_image_2 from "../../assets/grid_image_2.jpg"


const service_grid = () => {
    return (
        <>
            <div className="max-w-screen-xl mx-auto py-8 px-4 lg:py-16 lg:px-6">
                <div className="text-center mb-10">
                    <h5 className="text-3xl tracking-tight font-bold text-primary-800">Our Services</h5>
                </div>

                <div className="flex flex-col md:flex-row ">
                    {/* <!-- can help image --> */}
                    <div className="mr-0 md:mr-8 mb-6 md:mb-0">
                        <img className="min-h-full md:w-full mx-auto h-96 w-96" src={grid_image_2} alt="can_help_banner" />
                    </div>
                    {/* <!-- end can help image --> */}

                    <div className="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
                        <div className="w-full sm:w-1/2 mb-4 px-2  ">
                            <div className="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl  ">
                                <h3 className="text-2xl font-samibold text-md mb-6">Employee Management</h3>
                                <p className="text-sm"> Our website is designed with a mobile-first approach, offering a seamless browsing experience across all devices, including smartphones and tablets.</p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
                                <h3 className="text-2xl font-samibold text-md mb-6">Customer Management</h3>
                                <p className="text-sm"> Our website is designed with a mobile-first approach, offering a seamless browsing experience across all devices, including smartphones and tablets.</p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
                                <h3 className="text-2xl font-samibold text-md mb-6">Business Tools</h3>
                                <p className="text-sm">ur U.S.-based customer support team is available around the clock to answer any questions, resolve any issues, and provide helpful solutions. Whether it's through email, phone, or live chat, we're always here to support you.</p>
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2 mb-4 px-2 ">
                            <div className="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
                                <h3 className="text-2xl font-samibold text-md mb-6">Finance Management</h3>
                                <p className="text-sm">We use cutting-edge security measures to protect our customers' sensitive information and ensure the safety of all transactions made on our site.</p>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default service_grid
