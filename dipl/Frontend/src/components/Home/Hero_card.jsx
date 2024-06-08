import React from 'react'

const Hero_card = () => {
    return (
        <>


            <div className="max-w-sm h-auto md:h-100 bg-white border border-gray-200 rounded-lg absolute top-40 md:right-40">
                <div className="m-5 bg-gray-300 w-20 h-20 rounded-full"></div>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-3 text-xl md:text-2xl font-bold tracking-tight text-black">Dudhat Business Management Solution.</h5>
                    </a>
                    <p className="mb-3 font-semibold text-black">"Navigate Your Business to Success: Where Innovation Meets Management"</p>
                    <a href="#" className="inline-flex items-center px-3 py-2 mb-3 mt-4 text-sm md:text-base font-medium text-center tex-black bg-gray-300 rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-300 dark:hover:bg-gray-500 dark:focus:ring-gray-600">
                        Learn more
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>



        </>
    )
}

export default Hero_card
